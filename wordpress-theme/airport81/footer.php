    <!-- PATIČKA - Hybridní: struktura + Elementor widgety -->
    <footer id="colophon" class="site-footer">
        
        <!-- Elementor footer oblast -->
        <?php if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer')): ?>
            <!-- Elementor má kontrolu -->
        <?php else: ?>
            
            <!-- Fallback footer - statický -->
            <div class="footer-main">
                <div class="container">
                    <div class="footer-grid">
                        
                        <!-- O nás -->
                        <div class="footer-widget">
                            <h3>✈️ AIRPORT81</h3>
                            <p>Virtuální letiště pro vaše kreativní projekty. Profesionální video a foto produkce s moderními technologiemi.</p>
                            <div class="social-links">
                                <a href="#" aria-label="Facebook">📘</a>
                                <a href="#" aria-label="Instagram">📷</a>
                                <a href="#" aria-label="YouTube">📺</a>
                                <a href="#" aria-label="LinkedIn">💼</a>
                            </div>
                        </div>
                        
                        <!-- Naše doky -->
                        <div class="footer-widget">
                            <h3>Naše doky</h3>
                            <ul class="footer-menu">
                                <li><a href="/drone-dock">🚁 Drone Dock</a></li>
                                <li><a href="/foto-dock">📸 Foto Dock</a></li>
                                <li><a href="/online-dock">🌐 Online Dock</a></li>
                                <li><a href="/design-dock">🎨 Design Dock</a></li>
                            </ul>
                        </div>
                        
                        <!-- Rychlé odkazy -->
                        <div class="footer-widget">
                            <h3>Rychlé odkazy</h3>
                            <ul class="footer-menu">
                                <li><a href="/terminal">✈️ Letový plán</a></li>
                                <li><a href="/kontakt">📞 Kontakt</a></li>
                                <li><a href="/faq">❓ FAQ</a></li>
                                <li><a href="/o-nas">ℹ️ O nás</a></li>
                            </ul>
                        </div>
                        
                        <!-- Kontakt -->
                        <div class="footer-widget">
                            <h3>Kontakt</h3>
                            <ul class="contact-info">
                                <li>📧 info@airport81.eu</li>
                                <li>📱 +420 XXX XXX XXX</li>
                                <li>📍 Praha, Česká republika</li>
                                <li>🕐 Po-Pá 10:00 - 19:00</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        <?php endif; ?>
        
        <!-- Copyright - vždy statický -->
        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-content">
                    <p>&copy; <?php echo date('Y'); ?> Airport81. Všechna práva vyhrazena.</p>
                    <nav class="footer-legal">
                        <a href="/gdpr">GDPR</a>
                        <a href="/cookies">Cookies</a>
                        <a href="/pristupnost">Přístupnost</a>
                    </nav>
                </div>
            </div>
        </div>
        
    </footer>

</div><!-- #page -->

<!-- Plovoucí tlačítko pro rychlý kontakt -->
<div class="floating-cta">
    <a href="/kontakt" class="floating-button">
        <span class="icon">🛫</span>
        <span class="text">Vzlétnout</span>
    </a>
</div>

<!-- Custom JavaScript pro interaktivitu -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Scroll efekty
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const header = document.getElementById('masthead');
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
    
    // Ticker animace
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        const tickerContent = ticker.innerHTML;
        ticker.innerHTML = tickerContent + tickerContent;
    }
});
</script>

<?php wp_footer(); ?>

</body>
</html>