// Simple GA4 sync function using REST APIs
// Runs daily and on-demand to sync GA4 data to Firebase

const { GoogleAuth } = require('google-auth-library');

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
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT;
    const propertyId = process.env.GA4_PROPERTY_ID;
    const firebaseProjectId = 'landing-growth4u';

    if (!serviceAccountJson || !propertyId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing configuration. Set GOOGLE_SERVICE_ACCOUNT and GA4_PROPERTY_ID in Netlify environment variables.',
        }),
      };
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    // Get access token
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: [
        'https://www.googleapis.com/auth/analytics.readonly',
        'https://www.googleapis.com/auth/datastore',
      ],
    });
    const accessToken = await auth.getAccessToken();

    // Fetch GA4 data
    const ga4Response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
          metrics: [
            { name: 'sessions' },
            { name: 'totalUsers' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
          ],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        }),
      }
    );

    if (!ga4Response.ok) {
      const errorText = await ga4Response.text();
      throw new Error(`GA4 API error: ${errorText}`);
    }

    const ga4Data = await ga4Response.json();

    // Process data
    let totalSessions = 0;
    let totalUsers = 0;
    let totalPageviews = 0;
    let bounceRate = 0;
    let avgDuration = 0;
    let organicSessions = 0;

    if (ga4Data.rows) {
      for (const row of ga4Data.rows) {
        const channel = row.dimensionValues?.[0]?.value || '';
        const sessions = parseInt(row.metricValues?.[0]?.value || '0');
        const users = parseInt(row.metricValues?.[1]?.value || '0');
        const pageviews = parseInt(row.metricValues?.[2]?.value || '0');
        const bounce = parseFloat(row.metricValues?.[3]?.value || '0');
        const duration = parseFloat(row.metricValues?.[4]?.value || '0');

        totalSessions += sessions;
        totalUsers += users;
        totalPageviews += pageviews;
        bounceRate += bounce * sessions;
        avgDuration += duration * sessions;

        if (channel.toLowerCase().includes('organic')) {
          organicSessions += sessions;
        }
      }

      if (totalSessions > 0) {
        bounceRate = bounceRate / totalSessions;
        avgDuration = avgDuration / totalSessions;
      }
    }

    const organicPercent = totalSessions > 0 ? (organicSessions / totalSessions) * 100 : 0;
    const today = new Date().toISOString().split('T')[0];

    const analyticsData = {
      date: today,
      sessions: totalSessions,
      users: totalUsers,
      pageviews: totalPageviews,
      bounceRate: Math.round(bounceRate * 100) / 100,
      avgSessionDuration: Math.round(avgDuration),
      organicPercent: Math.round(organicPercent * 100) / 100,
      source: 'GA4 API (auto)',
      createdAt: new Date().toISOString(),
    };

    // Save to Firebase using REST API
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${firebaseProjectId}/databases/(default)/documents/analytics_metrics/ga4_${today}`;

    const firestoreResponse = await fetch(firestoreUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          date: { stringValue: analyticsData.date },
          sessions: { integerValue: analyticsData.sessions.toString() },
          users: { integerValue: analyticsData.users.toString() },
          pageviews: { integerValue: analyticsData.pageviews.toString() },
          bounceRate: { doubleValue: analyticsData.bounceRate },
          avgSessionDuration: { doubleValue: analyticsData.avgSessionDuration },
          organicPercent: { doubleValue: analyticsData.organicPercent },
          source: { stringValue: analyticsData.source },
          createdAt: { stringValue: analyticsData.createdAt },
        },
      }),
    });

    if (!firestoreResponse.ok) {
      const errorText = await firestoreResponse.text();
      throw new Error(`Firestore error: ${errorText}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'GA4 data synced successfully',
        data: analyticsData,
      }),
    };
  } catch (error) {
    console.error('Error syncing GA4:', error);
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

// For scheduled function (Netlify Scheduled Functions)
exports.schedule = '0 6 * * *'; // Run daily at 6 AM UTC
