import { clientEnv } from "@/config/env";

export const GA_MEASUREMENT_ID = clientEnv.gaMeasurementId;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const gtag = {
  pageview: (url: string) => {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  },

  event: (action: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
    window.gtag("event", action, params);
  },
};
