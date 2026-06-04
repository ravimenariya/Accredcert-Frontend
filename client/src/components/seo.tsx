import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: SEOProps) {
  useEffect(() => {
    // Set formatted title
    const formattedTitle = `${title} | AccredCert`;
    document.title = formattedTitle;

    // Helper to select or create a meta tag
    const setMetaTag = (name: string, value: string, attr: "name" | "property" = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    // Set standard meta tags
    setMetaTag("description", description);
    if (keywords) {
      setMetaTag("keywords", keywords);
    }

    // Set Open Graph tags
    setMetaTag("og:title", ogTitle || formattedTitle, "property");
    setMetaTag("og:description", ogDescription || description, "property");
    setMetaTag("og:type", "website", "property");
    if (ogImage) {
      setMetaTag("og:image", ogImage, "property");
    }
    if (ogUrl) {
      setMetaTag("og:url", ogUrl, "property");
    }

    // Set Twitter tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", ogTitle || formattedTitle);
    setMetaTag("twitter:description", ogDescription || description);
    if (ogImage) {
      setMetaTag("twitter:image", ogImage);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl]);

  return null;
}
