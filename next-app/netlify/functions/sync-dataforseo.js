// DataForSEO sync function
// Fetches domain metrics, backlinks, and ranking data

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Get credentials from environment
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
    const domain = 'growth4u.io';

    if (!login || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Configura DATAFORSEO_LOGIN y DATAFORSEO_PASSWORD en las variables de entorno de Netlify.',
        }),
      };
    }

    // Basic auth header
    const authHeader = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');

    // Fetch backlinks summary
    const backlinksResponse = await fetch('https://api.dataforseo.com/v3/backlinks/summary/live', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        target: domain,
        include_subdomains: true
      }]),
    });

    if (!backlinksResponse.ok) {
      const errorText = await backlinksResponse.text();
      throw new Error(`DataForSEO API error: ${backlinksResponse.status} - ${errorText}`);
    }

    const backlinksData = await backlinksResponse.json();

    // Check for API errors
    if (backlinksData.status_code !== 20000) {
      throw new Error(`DataForSEO error: ${backlinksData.status_message || 'Unknown error'}`);
    }

    // Extract backlinks data
    const result = backlinksData.tasks?.[0]?.result?.[0];

    if (!result) {
      throw new Error('No se obtuvieron datos de backlinks');
    }

    // Prepare data for Firebase
    const today = new Date().toISOString().split('T')[0];
    const metricsData = {
      // Domain metrics
      domainRank: result.rank || 0,
      backlinks: result.backlinks || 0,
      referringDomains: result.referring_domains || 0,
      referringIps: result.referring_ips || 0,
      referringSubnets: result.referring_subnets || 0,

      // Link types
      dofollowBacklinks: result.backlinks_nofollow !== undefined
        ? (result.backlinks - result.backlinks_nofollow)
        : 0,
      nofollowBacklinks: result.backlinks_nofollow || 0,

      // Additional metrics
      brokenBacklinks: result.broken_backlinks || 0,
      brokenPages: result.broken_pages || 0,
      referringPages: result.referring_pages || 0,

      // Meta
      date: today,
      source: 'DataForSEO',
      createdAt: new Date().toISOString(),
    };

    // Save to Firebase using REST API
    const firebaseProjectId = 'landing-growth4u';
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${firebaseProjectId}/databases/(default)/documents/dataforseo_metrics/latest`;

    // We'll save without auth for now and rely on Firestore rules
    // In production, you'd want to add Firebase auth here
    const firestoreResponse = await fetch(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          domainRank: { integerValue: metricsData.domainRank.toString() },
          backlinks: { integerValue: metricsData.backlinks.toString() },
          referringDomains: { integerValue: metricsData.referringDomains.toString() },
          referringIps: { integerValue: metricsData.referringIps.toString() },
          referringSubnets: { integerValue: metricsData.referringSubnets.toString() },
          dofollowBacklinks: { integerValue: metricsData.dofollowBacklinks.toString() },
          nofollowBacklinks: { integerValue: metricsData.nofollowBacklinks.toString() },
          brokenBacklinks: { integerValue: metricsData.brokenBacklinks.toString() },
          brokenPages: { integerValue: metricsData.brokenPages.toString() },
          referringPages: { integerValue: metricsData.referringPages.toString() },
          date: { stringValue: metricsData.date },
          source: { stringValue: metricsData.source },
          createdAt: { stringValue: metricsData.createdAt },
        },
      }),
    });

    // Even if Firestore save fails, return the data so the UI can display it
    const firestoreSaved = firestoreResponse.ok;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: firestoreSaved
          ? 'Datos de DataForSEO sincronizados correctamente'
          : 'Datos obtenidos (no guardados en Firebase - verifica permisos)',
        data: metricsData,
        raw: result, // Include raw data for debugging
      }),
    };
  } catch (error) {
    console.error('Error syncing DataForSEO:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};
