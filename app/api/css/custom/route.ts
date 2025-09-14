import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const CSS_FILE_PATH = path.join(process.cwd(), 'styles', 'custom.css');

// GET - Načtení custom.css obsahu
export async function GET() {
  try {
    const css = readFileSync(CSS_FILE_PATH, 'utf-8');
    return NextResponse.json({ 
      css,
      success: true,
      timestamp: new Date().toISOString(),
      path: '/styles/custom.css'
    });
  } catch (error) {
    console.error('Chyba při čtení custom.css:', error);
    return NextResponse.json({ 
      error: 'Chyba při čtení CSS souboru',
      success: false 
    }, { status: 500 });
  }
}

// POST - Uložení custom.css obsahu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { css } = body;

    if (typeof css !== 'string') {
      return NextResponse.json({ 
        error: 'Neplatný CSS obsah',
        success: false 
      }, { status: 400 });
    }

    // Přidání hlavičky s informací o editaci
    const header = `/*
 * CUSTOM CSS - Editováno přes web editor
 * Tyto styly přepíší výchozí Tailwind styly
 * Poslední úprava: ${new Date().toLocaleString('cs-CZ')}
 */

`;

    const finalCSS = header + css;
    
    writeFileSync(CSS_FILE_PATH, finalCSS, 'utf-8');
    
    return NextResponse.json({ 
      success: true,
      message: 'CSS úspěšně uloženo',
      timestamp: new Date().toISOString(),
      bytes: finalCSS.length
    });
  } catch (error) {
    console.error('Chyba při ukládání custom.css:', error);
    return NextResponse.json({ 
      error: 'Chyba při ukládání CSS souboru',
      success: false 
    }, { status: 500 });
  }
}