/**
 * WordPress CSS integrace pro hybridní řešení
 * Božské přikázání č.6: Editace CSS přes WordPress/Elementor
 */

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:8081';

/**
 * Načte CSS styly z WordPress
 */
export async function getWordPressStyles(): Promise<string> {
  try {
    const response = await fetch(`${WP_API_URL}/wp-json/airport81/v1/styles`, {
      next: { revalidate: 5 }, // Krátká cache pro rychlé změny v WordPress
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache', // Vynucení čerstvých dat
      }
    });

    if (!response.ok) {
      console.warn('WordPress CSS not available, using default styles');
      return '';
    }

    const data = await response.json();
    
    // Pokud je to nový plugin formát
    if (typeof data === 'string') {
      return data;
    }
    
    // Pokud je to starý formát s objektem
    if (data.css) {
      return data.css;
    }
    
    return '';
  } catch (error) {
    console.warn('Failed to fetch WordPress styles:', error);
    return '';
  }
}

/**
 * Vygeneruje style tag pro WordPress CSS
 */
export async function generateWordPressStyleTag(): Promise<string> {
  const styles = await getWordPressStyles();
  if (!styles) return '';
  
  return `<style id="wordpress-custom-css">${styles}</style>`;
}