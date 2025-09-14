<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Airport81 - Kreativní agentura specializující se na dronové natáčení, profesionální fotografii, web development a grafický design">
    
    <?php wp_head(); ?>
    
    <!-- Custom CSS pro rychlé úpravy v Elementoru -->
    <style id="airport81-dynamic-css">
        /* Zde může Elementor vkládat dynamické styly */
        <?php echo get_theme_mod('airport81_custom_css', ''); ?>
    </style>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    
    <!-- HLAVIČKA - Hybridní: Statická struktura + Elementor pro obsah -->
    <header id="masthead" class="site-header">
        
        <!-- Horní lišta - statická -->
        <div class="top-bar">
            <div class="container">
                <div class="ticker-wrap">
                    <div class="ticker">
                        <span>✈️ Otevřeno Po-Pá 10:00-19:00</span>
                        <span>• 🌡️ Perfektní podmínky pro let</span>
                        <span>• 📞 +420 XXX XXX XXX</span>
                        <span>• 📧 info@airport81.eu</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Hlavní navigace -->
        <nav class="main-navigation">
            <div class="container">
                <div class="nav-wrapper">
                    
                    <!-- Logo -->
                    <div class="site-branding">
                        <?php if (has_custom_logo()): ?>
                            <?php the_custom_logo(); ?>
                        <?php else: ?>
                            <a href="<?php echo esc_url(home_url('/')); ?>" class="site-title">
                                <span class="logo-icon">✈️</span>
                                <span class="logo-text">AIRPORT81</span>
                            </a>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Menu - WordPress menu nebo Elementor -->
                    <?php if (has_nav_menu('primary')): ?>
                        <?php wp_nav_menu(array(
                            'theme_location' => 'primary',
                            'menu_class' => 'nav-menu',
                            'container' => false,
                            'walker' => new Airport81_Menu_Walker(),
                        )); ?>
                    <?php else: ?>
                        <!-- Fallback menu -->
                        <ul class="nav-menu">
                            <li><a href="/drone-dock" class="nav-dock drone">🚁 Drone</a></li>
                            <li><a href="/foto-dock" class="nav-dock foto">📸 Foto</a></li>
                            <li><a href="/online-dock" class="nav-dock online">🌐 Online</a></li>
                            <li><a href="/design-dock" class="nav-dock design">🎨 Design</a></li>
                            <li><a href="/terminal" class="nav-special">✈️ Terminál</a></li>
                            <li><a href="/kontakt" class="nav-cta">Kontakt</a></li>
                        </ul>
                    <?php endif; ?>
                    
                    <!-- Mobile menu toggle -->
                    <button class="menu-toggle" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                </div>
            </div>
        </nav>
        
        <!-- Elementor header oblast -->
        <?php if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('header')): ?>
            <!-- Elementor převzal kontrolu -->
        <?php endif; ?>
        
    </header>

    <!-- Runway lights animace -->
    <div class="runway-lights">
        <span class="runway-light"></span>
        <span class="runway-light"></span>
        <span class="runway-light"></span>
        <span class="runway-light"></span>
        <span class="runway-light"></span>
    </div>