import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

const BASE_URL = "https://cle-kangah.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/clemence-kangah-og.jpg`;

const SEOHead = ({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta tags
    const metas: Record<string, string> = {
      description,
      "og:title": title,
      "og:description": description,
      "og:url": `${BASE_URL}${path}`,
      "og:image": image,
      "og:type": type,
      "og:locale": "fr_CI",
      "og:site_name": "Clémence KANGAH - CK Couture",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    };

    Object.entries(metas).forEach(([key, value]) => {
      const isOg = key.startsWith("og:");
      const isTwitter = key.startsWith("twitter:");
      const selector = isOg
        ? `meta[property="${key}"]`
        : isTwitter
        ? `meta[name="${key}"]`
        : `meta[name="${key}"]`;

      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (isOg) el.setAttribute("property", key);
        else el.setAttribute("name", key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    });

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path}`);
  }, [title, description, path, image, type]);

  return null;
};

export default SEOHead;
