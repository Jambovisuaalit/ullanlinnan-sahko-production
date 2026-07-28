export const brandAssets = {
  headerLogo: "/brand/USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg",
  headerLogoInverse: "/brand/USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg",
  faviconSvg: "/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_RGB_SVG.svg",
  faviconIco: "/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico",
  appleTouchIcon: "/brand/USOY_LOGO_APPLE_TOUCH_BLACK_ON_PAPER_PNG_180X180.png",
  socialPreview: "/opengraph-image"
} as const;

export type BrandAssetKey = keyof typeof brandAssets;
