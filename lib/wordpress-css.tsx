/**
 * WordPress CSS Integration for Next.js
 * Božské pravidlo č. 6: Hybridní řešení
 */

// WordPress API konfigurace
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://admin.airport81.eu';
const WP_API_KEY = process.env.WP_API_KEY || '';
const CACHE_DURATION = 60; // sekund

interface WordPressStyles {
  success: boolean;
  css: string;
  raw: {
    global?: string;
    elementor?: string;
    rules?: Record<string, string>;
    responsive?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
    };
  };
  timestamp: number;
  cache_key: string;
}

/**
 * Načíst CSS styly z WordPress
 */
export async function getWordPressStyles(): Promise<string> {
  try {
    const response = await fetch(`${WP_API_URL}/wp-json/airport81/v1/styles`, {
      headers: {
        'Authorization': WP_API_KEY ? `Bearer ${WP_API_KEY}` : '',
      },
      next: { 
        revalidate: CACHE_DURATION // Next.js 13+ cache
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch WordPress styles:', response.status);
      return getFallbackStyles();
    }

    const data: WordPressStyles = await response.json();
    
    if (data.success && data.css) {
      // Uložit do localStorage pro offline použití
      if (typeof window !== 'undefined') {
        localStorage.setItem('airport81_css_cache', data.css);
        localStorage.setItem('airport81_css_timestamp', data.timestamp.toString());
      }
      
      return data.css;
    }
    
    return getFallbackStyles();
  } catch (error) {
    console.error('Error fetching WordPress styles:', error);
    return getFallbackStyles();
  }
}

/**
 * Fallback styly když WordPress není dostupný
 */
function getFallbackStyles(): string {
  // Zkusit načíst z localStorage
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('airport81_css_cache');
    if (cached) {
      console.log('Using cached CSS styles');
      return cached;
    }
  }
  
  // Základní fallback styly
  return `
    /* Fallback Airport81 Styles */
    :root {
      --airport-primary: #3b82f6;
      --airport-secondary: #a855f7;
      --airport-accent: #10b981;
      --airport-dark: #1e293b;
      --airport-light: #f8fafc;
    }
    
    .departure-board {
      background: #000;
      color: #fbbf24;
      padding: 2rem;
      border-radius: 0.5rem;
      font-family: monospace;
    }
    
    .dock-card {
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    
    .dock-card:hover {
      transform: translateY(-5px);
    }
  `;
}

/**
 * Hook pro použití WordPress stylů v komponentách
 */
import { useEffect, useState } from 'react';

export function useWordPressStyles() {
  const [styles, setStyles] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWordPressStyles()
      .then(css => {
        setStyles(css);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setStyles(getFallbackStyles());
        setLoading(false);
      });
  }, []);

  return { styles, loading, error };
}

/**
 * Komponenta pro vložení WordPress stylů
 */
export function WordPressStylesheet() {
  const { styles, loading } = useWordPressStyles();
  
  if (loading) {
    return null;
  }
  
  return (
    <style 
      id="wordpress-styles"
      dangerouslySetInnerHTML={{ __html: styles }}
    />
  );
}

/**
 * Server-side načítání stylů pro SSR/SSG
 */
export async function getWordPressStylesSSR() {
  const styles = await getWordPressStyles();
  return {
    __html: `
      <style id="wordpress-styles-ssr">
        ${styles}
      </style>
    `
  };
}

/**
 * Webhook handler pro revalidaci
 */
export async function handleStyleRevalidation(secret: string): Promise<boolean> {
  const webhookSecret = process.env.WEBHOOK_SECRET;
  
  if (!webhookSecret || secret !== webhookSecret) {
    return false;
  }
  
  // Vyčistit cache
  if (typeof window !== 'undefined') {
    localStorage.removeItem('airport81_css_cache');
    localStorage.removeItem('airport81_css_timestamp');
  }
  
  // Trigger Next.js revalidation
  try {
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        path: '/',
        type: 'css_update' 
      }),
    });
    
    return true;
  } catch (error) {
    console.error('Revalidation failed:', error);
    return false;
  }
}

/**
 * Live preview pro Elementor
 */
export function enableLivePreview() {
  if (typeof window === 'undefined') return;
  
  // Poslouchat zprávy z WordPress iframe
  window.addEventListener('message', (event) => {
    if (event.origin !== WP_API_URL) return;
    
    if (event.data.type === 'elementor_css_update') {
      const styleEl = document.getElementById('wordpress-styles-live');
      
      if (styleEl) {
        styleEl.innerHTML = event.data.css;
      } else {
        const newStyle = document.createElement('style');
        newStyle.id = 'wordpress-styles-live';
        newStyle.innerHTML = event.data.css;
        document.head.appendChild(newStyle);
      }
    }
  });
}

/**
 * Utility pro parsování CSS proměnných
 */
export function parseWordPressCSSVariables(css: string): Record<string, string> {
  const variables: Record<string, string> = {};
  const regex = /--([\w-]+):\s*([^;]+);/g;
  let match;
  
  while ((match = regex.exec(css)) !== null) {
    variables[match[1]] = match[2].trim();
  }
  
  return variables;
}

/**
 * Aplikovat WordPress CSS proměnné na element
 */
export function applyWordPressVariables(element: HTMLElement, variables: Record<string, string>) {
  Object.entries(variables).forEach(([key, value]) => {
    element.style.setProperty(`--${key}`, value);
  });
}