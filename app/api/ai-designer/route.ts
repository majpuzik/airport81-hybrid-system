import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// CSS vzory pro různé požadavky
const CSS_PATTERNS = {
  // Barvy pozadí
  'červené pozadí': `
    body {
      background: linear-gradient(135deg, #ff0000, #cc0000);
    }
  `,
  'modré pozadí': `
    body {
      background: linear-gradient(135deg, #0066cc, #003366);
    }
  `,
  'zelené pozadí': `
    body {
      background: linear-gradient(135deg, #00cc66, #006633);
    }
  `,
  
  // Velikosti textu
  'větší text': `
    body {
      font-size: 1.2em;
    }
    h1 { font-size: 3em; }
    h2 { font-size: 2.5em; }
  `,
  'menší text': `
    body {
      font-size: 0.9em;
    }
    h1 { font-size: 2em; }
    h2 { font-size: 1.5em; }
  `,
  
  // Styly
  'tmavý režim': `
    :root {
      --airport-primary: #1a1a1a;
      --airport-secondary: #2d2d2d;
      --airport-accent: #00ff88;
      --airport-dark: #000000;
      --airport-light: #ffffff;
    }
    body {
      background: #0a0a0a;
      color: #ffffff;
    }
    .dock-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
    }
  `,
  
  'světlý režim': `
    :root {
      --airport-primary: #ffffff;
      --airport-secondary: #f5f5f5;
      --airport-accent: #0066cc;
      --airport-dark: #333333;
      --airport-light: #ffffff;
    }
    body {
      background: #ffffff;
      color: #333333;
    }
  `,
  
  'neonové efekty': `
    .dock-card {
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
      border: 2px solid #00ffff;
    }
    h1, h2 {
      text-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
    }
    button:hover {
      box-shadow: 0 0 40px rgba(255, 255, 0, 0.8);
    }
  `,
  
  '3d efekty': `
    .dock-card {
      transform-style: preserve-3d;
      transform: perspective(1000px) rotateY(10deg);
      transition: all 0.5s ease;
    }
    .dock-card:hover {
      transform: perspective(1000px) rotateY(0deg) scale(1.1);
    }
  `,
  
  'animované pozadí': `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    body {
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
    }
  `,
  
  'zlatý luxusní styl': `
    :root {
      --airport-primary: #FFD700;
      --airport-secondary: #B8860B;
      --airport-accent: #FFA500;
    }
    body {
      background: linear-gradient(135deg, #1a1a1a, #2c2c2c);
    }
    h1, h2 {
      background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s infinite;
    }
    @keyframes shimmer {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  `,
  
  'kulaté rohy': `
    .dock-card {
      border-radius: 25px;
    }
    button {
      border-radius: 50px;
    }
    img {
      border-radius: 15px;
    }
  `,
  
  'ostré rohy': `
    .dock-card {
      border-radius: 0;
    }
    button {
      border-radius: 0;
    }
    img {
      border-radius: 0;
    }
  `,
  
  'stíny': `
    .dock-card {
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }
    button {
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }
    h1, h2 {
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
  `,
  
  'bez stínů': `
    .dock-card {
      box-shadow: none;
    }
    button {
      box-shadow: none;
    }
    h1, h2 {
      text-shadow: none;
    }
  `,
  
  'průhlednost': `
    .dock-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }
  `,
  
  'retro styl': `
    body {
      font-family: 'Courier New', monospace;
      background: #000;
      color: #00ff00;
    }
    .dock-card {
      border: 2px solid #00ff00;
      background: #000;
    }
    h1, h2 {
      color: #00ff00;
      text-transform: uppercase;
    }
  `,
  
  'minimalistický': `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #fafafa;
    }
    .dock-card {
      border: 1px solid #e0e0e0;
      box-shadow: none;
      background: white;
    }
  `,
  
  'futuristický': `
    body {
      background: linear-gradient(to bottom, #000428, #004e92);
      color: #fff;
    }
    .dock-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(20px);
    }
    h1, h2 {
      color: #00d4ff;
      text-shadow: 0 0 30px #00d4ff;
    }
  `
};

// Pokročilá analýza češtiny a generování CSS
function analyzePrompt(prompt: string): {
  css: string;
  changes: string[];
  confidence: number;
} {
  const lowerPrompt = prompt.toLowerCase();
  let generatedCSS = '';
  const changes: string[] = [];
  let confidence = 0;
  
  // Rozpoznání barev v češtině
  const colorMap: { [key: string]: string } = {
    'červen': '#ff0000',
    'modr': '#0066cc',
    'zelen': '#00cc00',
    'žlut': '#ffff00',
    'fialov': '#a855f7',
    'růžov': '#ff69b4',
    'oranžov': '#ff8800',
    'čern': '#000000',
    'bíl': '#ffffff',
    'šed': '#808080',
    'hnědý': '#8B4513',
    'modrobíl': '#0066cc, #ffffff',
    'modrobile': '#0066cc, #ffffff',
    'zlatý': '#FFD700',
    'stříbrn': '#C0C0C0'
  };
  
  // Rozpoznání vzorů
  const patternMap: { [key: string]: string } = {
    'pruhovan': 'repeating-linear-gradient(45deg, $color1, $color1 10px, $color2 10px, $color2 20px)',
    'pruhy': 'repeating-linear-gradient(90deg, $color1, $color1 20px, $color2 20px, $color2 40px)',
    'gradient': 'linear-gradient(135deg, $color1, $color2)',
    'přechod': 'linear-gradient(135deg, $color1, $color2)',
    'šachovnic': 'repeating-conic-gradient($color1 0deg 90deg, $color2 90deg 180deg)',
    'tečky': 'radial-gradient(circle, $color1 30%, transparent 30%), radial-gradient(circle, $color2 30%, transparent 30%)',
    'vlnky': 'repeating-linear-gradient(45deg, transparent, transparent 35px, $color1 35px, $color1 70px)',
    'duhov': 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
  };
  
  // Rozpoznání elementů
  const elementMap: { [key: string]: string } = {
    'pozadí': 'body',
    'pozadi': 'body',
    'stránk': 'body',
    'domů': 'body',
    'domu': 'body',
    'hlavní': 'body',
    'kart': '.dock-card',
    'tlačítk': 'button',
    'nadpis': 'h1, h2',
    'text': 'p, span',
    'odkaz': 'a',
    'menu': '.nav',
    'navigac': '.nav'
  };
  
  // Analýza požadavku
  let targetElement = 'body';
  let colors: string[] = [];
  let pattern = '';
  
  // Najdeme element
  for (const [key, selector] of Object.entries(elementMap)) {
    if (lowerPrompt.includes(key)) {
      targetElement = selector;
      changes.push(`✓ Cílový element: ${key} → ${selector}`);
      confidence += 20;
      break;
    }
  }
  
  // Najdeme barvy
  for (const [key, color] of Object.entries(colorMap)) {
    if (lowerPrompt.includes(key)) {
      if (color.includes(',')) {
        colors.push(...color.split(',').map(c => c.trim()));
      } else {
        colors.push(color);
      }
      changes.push(`✓ Rozpoznána barva: ${key} → ${color}`);
      confidence += 20;
    }
  }
  
  // Pokud nejsou barvy, použijeme výchozí
  if (colors.length === 0) {
    colors = ['#3b82f6', '#a855f7'];
    changes.push('ℹ️ Použity výchozí barvy');
  } else if (colors.length === 1) {
    // Pokud je jen jedna barva, přidáme bílou pro kontrast
    if (lowerPrompt.includes('bíl') || lowerPrompt.includes('bile')) {
      colors.push('#ffffff');
    } else {
      colors.push('#ffffff');
    }
  }
  
  // Najdeme vzor
  for (const [key, cssPattern] of Object.entries(patternMap)) {
    if (lowerPrompt.includes(key)) {
      // Zajistíme, že máme dvě barvy pro vzor
      const color1 = colors[0] || '#0066cc';
      const color2 = colors[1] || (colors[0] ? '#ffffff' : '#ffffff');
      
      pattern = cssPattern
        .replace(/\$color1/g, color1)
        .replace(/\$color2/g, color2);
      changes.push(`✓ Aplikován vzor: ${key} (${color1} + ${color2})`);
      confidence += 30;
      break;
    }
  }
  
  // Pokud není vzor, použijeme gradient
  if (!pattern && colors.length > 0) {
    if (lowerPrompt.includes('pruh') || lowerPrompt.includes('pruhy')) {
      pattern = `repeating-linear-gradient(45deg, ${colors[0]}, ${colors[0]} 20px, ${colors[1] || '#ffffff'} 20px, ${colors[1] || '#ffffff'} 40px)`;
      changes.push('✓ Vytvořen pruhovaný vzor');
      confidence += 25;
    } else {
      pattern = `linear-gradient(135deg, ${colors.join(', ')})`;
      changes.push('✓ Vytvořen barevný přechod');
      confidence += 20;
    }
  }
  
  // Generujeme CSS
  if (pattern) {
    generatedCSS = `
/* AI Designer - Inteligentní zpracování požadavku */
/* Požadavek: "${prompt}" */

${targetElement} {
  background: ${pattern};
  background-size: ${lowerPrompt.includes('tečky') ? '50px 50px' : 'cover'};
  ${lowerPrompt.includes('animov') ? 'animation: backgroundMove 10s ease infinite;' : ''}
}

${lowerPrompt.includes('animov') ? `
@keyframes backgroundMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}` : ''}
`;
  }
  
  // Speciální případy
  if (lowerPrompt.includes('tmav')) {
    generatedCSS += CSS_PATTERNS['tmavý režim'];
    changes.push('✓ Aplikován tmavý režim');
    confidence += 20;
  }
  
  if (lowerPrompt.includes('neon')) {
    generatedCSS += CSS_PATTERNS['neonové efekty'];
    changes.push('✓ Přidány neonové efekty');
    confidence += 20;
  }
  
  if (lowerPrompt.includes('3d')) {
    generatedCSS += CSS_PATTERNS['3d efekty'];
    changes.push('✓ Přidány 3D efekty');
    confidence += 20;
  }
  
  // Pokud stále nemáme CSS, zkusíme pattern matching
  if (!generatedCSS) {
    for (const [pattern, css] of Object.entries(CSS_PATTERNS)) {
      const keywords = pattern.split(' ');
      const matches = keywords.filter(keyword => 
        lowerPrompt.includes(keyword)
      );
      
      if (matches.length > 0) {
        generatedCSS += css + '\n';
        changes.push(`✓ Aplikován styl: ${pattern}`);
        confidence += (matches.length / keywords.length) * 50;
      }
    }
  }
  
  // Finální fallback
  if (!generatedCSS) {
    generatedCSS = `
/* AI Designer - Experimentální CSS */
/* Požadavek: "${prompt}" */
/* Zkouším interpretovat váš požadavek... */

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
}
`;
    changes.push('⚠️ Vytvořen experimentální návrh - zkuste upřesnit požadavek');
    confidence = 30;
  }
  
  return {
    css: generatedCSS,
    changes,
    confidence: Math.min(100, confidence)
  };
}

// GET - Získání aktuálního CSS
export async function GET() {
  try {
    const cssPath = path.join(process.cwd(), 'styles', 'custom.css');
    const css = await fs.readFile(cssPath, 'utf-8');
    
    return NextResponse.json({
      success: true,
      css,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to read CSS file' },
      { status: 500 }
    );
  }
}

// POST - AI generování CSS na základě promptu
export async function POST(request: NextRequest) {
  try {
    const { prompt, action, css } = await request.json();
    
    // Pokud je to akce "apply", uložíme CSS
    if (action === 'apply' && css) {
      const cssPath = path.join(process.cwd(), 'styles', 'custom.css');
      const currentCSS = await fs.readFile(cssPath, 'utf-8');
      const newCSS = currentCSS + '\n\n/* AI Generated - ' + new Date().toISOString() + ' */\n' + css;
      
      await fs.writeFile(cssPath, newCSS, 'utf-8');
      
      return NextResponse.json({
        success: true,
        message: 'CSS bylo úspěšně aplikováno',
        timestamp: new Date().toISOString()
      });
    }
    
    // Jinak generujeme návrh CSS
    if (prompt) {
      const result = analyzePrompt(prompt);
      
      return NextResponse.json({
        success: true,
        prompt,
        css: result.css,
        changes: result.changes,
        confidence: result.confidence,
        explanation: `Na základě vašeho požadavku "${prompt}" jsem připravil tyto změny.`,
        preview: true,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'No prompt or action provided' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// DELETE - Reset CSS na výchozí
export async function DELETE() {
  try {
    const cssPath = path.join(process.cwd(), 'styles', 'custom.css');
    const defaultCSS = `/* 
 * CUSTOM CSS - Airport81 Project
 * AI Designer Ready
 */

:root {
  --airport-primary: #3b82f6;
  --airport-secondary: #a855f7;
  --airport-accent: #10b981;
  --airport-dark: #1e293b;
  --airport-light: #f8fafc;
}
`;
    
    await fs.writeFile(cssPath, defaultCSS, 'utf-8');
    
    return NextResponse.json({
      success: true,
      message: 'CSS bylo resetováno na výchozí hodnoty',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to reset CSS' },
      { status: 500 }
    );
  }
}