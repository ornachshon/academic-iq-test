import { useEffect } from 'react';

const DEFAULT_IMAGE = 'https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/e94e8bcd8_image.png';

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export function useSEO({ title, description, ogImage, ogType = 'website' } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Academic IQ Test` : 'Academic IQ Test – Free Online IQ Assessment';
    document.title = fullTitle;
    setMeta('name', 'description', description || 'Take our free 30-question IQ test and discover your intelligence level. Get your IQ score, percentile ranking, personalized certificate, and detailed cognitive report.');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description || 'Take our free 30-question IQ test and discover your intelligence level.');
    setMeta('property', 'og:image', ogImage || DEFAULT_IMAGE);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', window.location.href);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description || 'Take our free 30-question IQ test and discover your intelligence level.');
    setMeta('name', 'twitter:image', ogImage || DEFAULT_IMAGE);
  }, [title, description, ogImage, ogType]);
}