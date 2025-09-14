<?php
/**
 * Airport81 - Hlavní šablona
 * Hybridní řešení: WordPress + Elementor + Custom Code
 * 
 * @package Airport81
 */

get_header(); ?>

<main id="main" class="site-main">
    
    <?php if (is_front_page()): ?>
        
        <!-- HOMEPAGE - Kombinace statického HTML a Elementor -->
        <section class="airport-terminal">
            <div class="container">
                
                <!-- Statická část - Departure Board -->
                <div class="departure-board">
                    <h2 class="departure-title">DEPARTURES / ODLETY</h2>
                    <div class="time-display"><?php echo date('H:i'); ?> CET</div>
                    
                    <div class="gates-grid">
                        <a href="/drone-dock" class="gate-item">
                            <span class="gate-number">GATE A1</span>
                            <span class="gate-status boarding">BOARDING</span>
                            <span class="gate-destination">DRONE DOCK</span>
                        </a>
                        
                        <a href="/foto-dock" class="gate-item">
                            <span class="gate-number">GATE B1</span>
                            <span class="gate-status boarding">BOARDING</span>
                            <span class="gate-destination">FOTO DOCK</span>
                        </a>
                        
                        <a href="/online-dock" class="gate-item">
                            <span class="gate-number">GATE B2</span>
                            <span class="gate-status on-time">ON TIME</span>
                            <span class="gate-destination">ONLINE DOCK</span>
                        </a>
                        
                        <a href="/design-dock" class="gate-item">
                            <span class="gate-number">GATE C3</span>
                            <span class="gate-status check-in">CHECK-IN</span>
                            <span class="gate-destination">DESIGN DOCK</span>
                        </a>
                    </div>
                </div>
                
                <!-- Elementor oblast pro drag-and-drop editaci -->
                <?php if (function_exists('elementor_theme_do_location')): ?>
                    <?php elementor_theme_do_location('homepage-content'); ?>
                <?php endif; ?>
                
            </div>
        </section>
        
    <?php elseif (is_page()): ?>
        
        <!-- STRÁNKY - Plná Elementor kontrola -->
        <?php while (have_posts()): the_post(); ?>
            
            <?php if (\Elementor\Plugin::$instance->preview->is_preview_mode() || \Elementor\Plugin::$instance->editor->is_edit_mode()): ?>
                <!-- Elementor editační mód -->
                <?php the_content(); ?>
            <?php else: ?>
                <!-- Produkční mód - optimalizovaný výstup -->
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <?php the_content(); ?>
                </article>
            <?php endif; ?>
            
        <?php endwhile; ?>
        
    <?php else: ?>
        
        <!-- ARCHIV / BLOG - WordPress loop -->
        <div class="container">
            <div class="posts-grid">
                <?php if (have_posts()): ?>
                    <?php while (have_posts()): the_post(); ?>
                        
                        <article class="dock-card">
                            <?php if (has_post_thumbnail()): ?>
                                <div class="dock-card-image">
                                    <?php the_post_thumbnail('large'); ?>
                                </div>
                            <?php endif; ?>
                            
                            <div class="dock-card-content">
                                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <?php the_excerpt(); ?>
                                <a href="<?php the_permalink(); ?>" class="read-more">Více →</a>
                            </div>
                        </article>
                        
                    <?php endwhile; ?>
                    
                    <?php the_posts_pagination(); ?>
                    
                <?php else: ?>
                    
                    <p>Žádný obsah nebyl nalezen.</p>
                    
                <?php endif; ?>
            </div>
        </div>
        
    <?php endif; ?>
    
</main>

<!-- Statický JavaScript pro interaktivní prvky -->
<script>
// Animace departure board
document.addEventListener('DOMContentLoaded', function() {
    const gates = document.querySelectorAll('.gate-item');
    
    gates.forEach((gate, index) => {
        gate.style.animationDelay = `${index * 0.1}s`;
        gate.classList.add('fade-in-up');
    });
    
    // Aktualizace času
    setInterval(() => {
        const timeDisplay = document.querySelector('.time-display');
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} CET`;
        }
    }, 60000);
});
</script>

<?php get_footer(); ?>