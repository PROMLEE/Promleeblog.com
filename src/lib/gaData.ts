import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_API_CREDENTIALS!),
});

export async function totalViews() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.NEXT_PUBLIC_GOOGLE_API_PID}`,
    metrics: [{ name: "screenPageViews" }],
    dateRanges: [{ startDate: "2024-04-05", endDate: "today" }],
  });
  return Number(response!.rows![0].metricValues![0].value);
}

export async function todayViews() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.NEXT_PUBLIC_GOOGLE_API_PID}`,
    metrics: [{ name: "screenPageViews" }],
    dateRanges: [{ startDate: "2daysAgo", endDate: "today" }],
  });
  return Number(response!.rows![0].metricValues![0].value);
}
