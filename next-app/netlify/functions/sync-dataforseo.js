// DataForSEO sync function - CommonJS format for Netlify compatibility

const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
    const domain = 'growth4u.io';

    console.log('=== DataForSEO Sync Started ===');
    console.log('Login:', login ? `${login.substring(0, 5)}...` : 'NOT SET');
    console.log('Password:', password ? 'SET' : 'NOT SET');

    if (!login || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Configura DATAFORSEO_LOGIN y DATAFORSEO_PASSWORD en Netlify → Site settings → Environment variables',
        }),
      };
    }

    // Create auth header
    const credentials = Buffer.from(`${login}:${password}`).toString('base64');
    const authHeader = `Basic ${credentials}`;

    console.log('Calling DataForSEO API...');

    // Call DataForSEO Backlinks API
    const response = await fetch('https://api.dataforseo.com/v3/backlinks/summary/live', {
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

    console.log('DataForSEO response status:', response.status);

    const responseText = await response.text();
    console.log('Response length:', responseText.length);

    if (!response.ok) {
      console.error('API Error:', responseText.substring(0, 500));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: `DataForSEO API error: ${response.status}`,
        }),
      };
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('JSON parse error:', e.message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid response from DataForSEO',
        }),
      };
    }

    if (data.status_code !== 20000) {
      console.error('DataForSEO error:', data.status_message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: data.status_message || 'DataForSEO API error',
        }),
      };
    }

    const result = data.tasks?.[0]?.result?.[0];
    if (!result) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'No data returned from DataForSEO',
        }),
      };
    }

    console.log('Data received successfully');

    const today = new Date().toISOString().split('T')[0];
    const metricsData = {
      domainRank: result.rank || 0,
      backlinks: result.backlinks || 0,
      referringDomains: result.referring_domains || 0,
      referringIps: result.referring_ips || 0,
      referringSubnets: result.referring_subnets || 0,
      dofollowBacklinks: result.backlinks_nofollow !== undefined
        ? (result.backlinks - result.backlinks_nofollow)
        : 0,
      nofollowBacklinks: result.backlinks_nofollow || 0,
      brokenBacklinks: result.broken_backlinks || 0,
      brokenPages: result.broken_pages || 0,
      referringPages: result.referring_pages || 0,
      date: today,
      source: 'DataForSEO',
      createdAt: new Date().toISOString(),
    };

    // Try to save to Firebase (optional - won't fail if it doesn't work)
    try {
      const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/landing-growth4u/databases/(default)/documents/dataforseo_metrics/latest';
      await fetch(firestoreUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            domainRank: { integerValue: String(metricsData.domainRank) },
            backlinks: { integerValue: String(metricsData.backlinks) },
            referringDomains: { integerValue: String(metricsData.referringDomains) },
            referringIps: { integerValue: String(metricsData.referringIps) },
            referringSubnets: { integerValue: String(metricsData.referringSubnets) },
            dofollowBacklinks: { integerValue: String(metricsData.dofollowBacklinks) },
            nofollowBacklinks: { integerValue: String(metricsData.nofollowBacklinks) },
            brokenBacklinks: { integerValue: String(metricsData.brokenBacklinks) },
            brokenPages: { integerValue: String(metricsData.brokenPages) },
            referringPages: { integerValue: String(metricsData.referringPages) },
            date: { stringValue: metricsData.date },
            source: { stringValue: metricsData.source },
            createdAt: { stringValue: metricsData.createdAt },
          },
        }),
      });
      console.log('Saved to Firebase');
    } catch (fbError) {
      console.log('Firebase save skipped:', fbError.message);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Datos sincronizados correctamente',
        data: metricsData,
      }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Error interno',
      }),
    };
  }
};

module.exports = { handler };
