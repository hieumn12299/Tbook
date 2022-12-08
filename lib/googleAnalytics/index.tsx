declare global {
  interface Window {
    gtag: any;
  }
}

export const pageview = (url: string) => {
  console.log(window);

  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_location: url,
  });
};
