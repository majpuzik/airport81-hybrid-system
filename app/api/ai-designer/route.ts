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

// Funkce pro analýzu promptu a generování CSS
function analyzePrompt(prompt: string): {
  css: string;
  changes: string[];
  confidence: number;
} {
  const lowerPrompt = prompt.toLowerCase();
  let generatedCSS = '';
  const changes: string[] = [];
  let confidence = 0;
  
  // Hledáme shody s našimi vzory
  for (const [pattern, css] of Object.entries(CSS_PATTERNS)) {
    // Kontrola, zda prompt obsahuje klíčová slova ze vzoru
    const keywords = pattern.split(' ');
    const matches = keywords.filter(keyword => 
      lowerPrompt.includes(keyword)
    );
    
    if (matches.length > 0) {
      generatedCSS += css + '\n';
      changes.push(`✓ Aplikován styl: ${pattern}`);
      confidence += (matches.length / keywords.length) * 100;
    }
  }
  
  // Pokud nic nenajdeme, zkusíme obecné přístupy
  if (generatedCSS === '') {
    if (lowerPrompt.includes('modern')) {
      generatedCSS = CSS_PATTERNS['neonové efekty'] + CSS_PATTERNS['3d efekty'];
      changes.push('✓ Aplikován moderní styl s efekty');
      confidence = 70;
    } else if (lowerPrompt.includes('elegantní') || lowerPrompt.includes('luxus')) {
      generatedCSS = CSS_PATTERNS['zlatý luxusní styl'];
      changes.push('✓ Aplikován elegantní luxusní styl');
      confidence = 80;
    } else if (lowerPrompt.includes('jednoduch')) {
      generatedCSS = CSS_PATTERNS['minimalistický'];
      changes.push('✓ Aplikován minimalistický styl');
      confidence = 75;
    } else {
      // Výchozí fallback
      generatedCSS = `
        /* AI vygenerované CSS na základě: "${prompt}" */
        /* Nepodařilo se přesně interpretovat požadavek */
        body {
          transition: all 0.3s ease;
        }
      `;
      changes.push('⚠️ Požadavek nebyl jasně rozpoznán');
      confidence = 20;
    }
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