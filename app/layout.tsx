import "./../styles/globals.css";
import { ReactNode } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getWordPressStyles } from "../lib/wordpress-styles";

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Načtení WordPress/Elementor stylů (Božské přikázání č.6)
  const wpStyles = await getWordPressStyles();
  
  return (
    <html lang="cs">
      <head>
        {/* WordPress/Elementor dynamické CSS */}
        {wpStyles && (
          <style 
            id="wordpress-custom-css"
            dangerouslySetInnerHTML={{ __html: wpStyles }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
