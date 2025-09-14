<?php
/**
 * Airport81 Hybridní WordPress Téma
 * Božské pravidlo č. 6: WordPress + Elementor + Custom Code
 * 
 * @package Airport81
 */

// Zabezpečení
if (!defined('ABSPATH')) {
    exit;
}

/**
 * ZÁKLADNÍ NASTAVENÍ TÉMATU
 */
function airport81_setup() {
    // Podpora pro různé WordPress funkce
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Elementor podpora
    add_theme_support('elementor');
    
    // Registrace menu
    register_nav_menus(array(
        'primary' => __('Hlavní menu', 'airport81'),
        'footer' => __('Patička menu', 'airport81'),
    ));
}
add_action('after_setup_theme', 'airport81_setup');

/**
 * NAČÍTÁNÍ STYLŮ A SKRIPTŮ
 */
function airport81_scripts() {
    // Hlavní styly tématu
    wp_enqueue_style('airport81-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Custom CSS pro Elementor úpravy
    wp_enqueue_style('airport81-elementor', get_template_directory_uri() . '/assets/css/elementor-custom.css', array(), '1.0.0');
    
    // Tailwind CSS (pro hybridní části)
    wp_enqueue_style('tailwind', 'https://cdn.tailwindcss.com', array(), '3.0.0');
    
    // Custom JavaScript
    wp_enqueue_script('airport81-scripts', get_template_directory_uri() . '/assets/js/airport81.js', array('jquery'), '1.0.0', true);
    
    // Lokalizace pro AJAX
    wp_localize_script('airport81-scripts', 'airport81_ajax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('airport81_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'airport81_scripts');

/**
 * ELEMENTOR INTEGRACE
 */
function airport81_elementor_init() {
    // Registrace custom Elementor kategorií
    \Elementor\Plugin::instance()->elements_manager->add_category(
        'airport81-widgets',
        [
            'title' => __('Airport81 Widgety', 'airport81'),
            'icon' => 'fa fa-plane',
        ]
    );
}
add_action('elementor/init', 'airport81_elementor_init');

/**
 * CUSTOM ELEMENTOR WIDGETY
 */
function airport81_register_elementor_widgets($widgets_manager) {
    // Registrace custom widgetů
    require_once(__DIR__ . '/elementor-widgets/departure-board-widget.php');
    require_once(__DIR__ . '/elementor-widgets/dock-card-widget.php');
    require_once(__DIR__ . '/elementor-widgets/ai-terminal-widget.php');
    require_once(__DIR__ . '/elementor-widgets/runway-lights-widget.php');
    
    $widgets_manager->register(new \Airport81_Departure_Board_Widget());
    $widgets_manager->register(new \Airport81_Dock_Card_Widget());
    $widgets_manager->register(new \Airport81_AI_Terminal_Widget());
    $widgets_manager->register(new \Airport81_Runway_Lights_Widget());
}
add_action('elementor/widgets/register', 'airport81_register_elementor_widgets');

/**
 * CUSTOM POST TYPES PRO DOKY
 */
function airport81_register_post_types() {
    // Drone Dock projekty
    register_post_type('drone_projects', array(
        'labels' => array(
            'name' => __('Drone projekty', 'airport81'),
            'singular_name' => __('Drone projekt', 'airport81'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-airplane',
        'show_in_rest' => true, // Pro Gutenberg
        'rewrite' => array('slug' => 'drone-dock'),
    ));
    
    // Foto Dock galerie
    register_post_type('foto_gallery', array(
        'labels' => array(
            'name' => __('Foto galerie', 'airport81'),
            'singular_name' => __('Fotografie', 'airport81'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-camera',
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'foto-dock'),
    ));
    
    // Online Dock projekty
    register_post_type('web_projects', array(
        'labels' => array(
            'name' => __('Web projekty', 'airport81'),
            'singular_name' => __('Web projekt', 'airport81'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-laptop',
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'online-dock'),
    ));
    
    // Design Dock portfolio
    register_post_type('design_portfolio', array(
        'labels' => array(
            'name' => __('Design portfolio', 'airport81'),
            'singular_name' => __('Design', 'airport81'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-art',
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'design-dock'),
    ));
}
add_action('init', 'airport81_register_post_types');

/**
 * AJAX HANDLER PRO AI TERMINAL
 */
function airport81_ai_terminal_process() {
    check_ajax_referer('airport81_nonce', 'nonce');
    
    $prompt = sanitize_text_field($_POST['prompt']);
    
    // Simulace AI odpovědi (nahradit skutečným API voláním)
    $responses = array(
        "Váš letový plán je připraven! 🚁 Drone Dock -> 📸 Foto Dock -> 🎬 Post-processing",
        "Doporučuji začít s průzkumným letem nad lokací. Optimální čas: zlatá hodina.",
        "Pro váš projekt navrhuji kompletní produkční pipeline s 4K RAW záznamy.",
        "Analyzuji požadavky... Ideální řešení: FPV průlet + stabilizované záběry.",
    );
    
    $response = $responses[array_rand($responses)];
    
    wp_send_json_success(array(
        'message' => $response,
        'timestamp' => current_time('H:i:s')
    ));
}
add_action('wp_ajax_airport81_ai_terminal', 'airport81_ai_terminal_process');
add_action('wp_ajax_nopriv_airport81_ai_terminal', 'airport81_ai_terminal_process');

/**
 * CUSTOM FIELDS PRO ELEMENTOR
 */
function airport81_add_custom_fields() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_airport81_settings',
            'title' => 'Airport81 Nastavení',
            'fields' => array(
                array(
                    'key' => 'field_gate_number',
                    'label' => 'Číslo brány (Gate)',
                    'name' => 'gate_number',
                    'type' => 'text',
                    'default_value' => 'A1',
                ),
                array(
                    'key' => 'field_service_status',
                    'label' => 'Status služby',
                    'name' => 'service_status',
                    'type' => 'select',
                    'choices' => array(
                        'boarding' => 'BOARDING',
                        'on_time' => 'ON TIME',
                        'check_in' => 'CHECK-IN',
                        'delayed' => 'DELAYED',
                    ),
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'page',
                    ),
                ),
            ),
        ));
    }
}
add_action('acf/init', 'airport81_add_custom_fields');

/**
 * SHORTCODES PRO HYBRIDNÍ OBSAH
 */

// [airport_departure_board]
function airport81_departure_board_shortcode($atts) {
    $atts = shortcode_atts(array(
        'gates' => '4',
    ), $atts);
    
    ob_start();
    ?>
    <div class="departure-board">
        <h2 style="color: #fbbf24; font-family: monospace;">DEPARTURES / ODLETY</h2>
        <div class="gates-grid">
            <div class="gate">
                <span class="gate-number">GATE A1</span>
                <span class="gate-status boarding">BOARDING</span>
                <span class="gate-service">DRONE DOCK</span>
            </div>
            <div class="gate">
                <span class="gate-number">GATE B1</span>
                <span class="gate-status boarding">BOARDING</span>
                <span class="gate-service">FOTO DOCK</span>
            </div>
            <div class="gate">
                <span class="gate-number">GATE B2</span>
                <span class="gate-status on-time">ON TIME</span>
                <span class="gate-service">ONLINE DOCK</span>
            </div>
            <div class="gate">
                <span class="gate-number">GATE C3</span>
                <span class="gate-status check-in">CHECK-IN</span>
                <span class="gate-service">DESIGN DOCK</span>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('airport_departure_board', 'airport81_departure_board_shortcode');

// [airport_dock_card dock="drone"]
function airport81_dock_card_shortcode($atts) {
    $atts = shortcode_atts(array(
        'dock' => 'drone',
        'title' => '',
        'description' => '',
        'image' => '',
    ), $atts);
    
    ob_start();
    ?>
    <div class="dock-card">
        <?php if ($atts['image']): ?>
            <div class="dock-card-image">
                <img src="<?php echo esc_url($atts['image']); ?>" alt="<?php echo esc_attr($atts['title']); ?>">
            </div>
        <?php endif; ?>
        <div class="dock-card-content">
            <span class="dock-card-badge"><?php echo esc_html($atts['dock']); ?> DOCK</span>
            <h3><?php echo esc_html($atts['title']); ?></h3>
            <p><?php echo esc_html($atts['description']); ?></p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('airport_dock_card', 'airport81_dock_card_shortcode');

/**
 * GUTENBERG BLOKY (pro hybridní editaci)
 */
function airport81_register_blocks() {
    wp_register_script(
        'airport81-blocks',
        get_template_directory_uri() . '/blocks/build/index.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        '1.0.0'
    );
    
    register_block_type('airport81/departure-board', array(
        'editor_script' => 'airport81-blocks',
    ));
}
add_action('init', 'airport81_register_blocks');

/**
 * OPTIMALIZACE PRO RYCHLOST
 */
function airport81_performance_optimizations() {
    // Lazy loading pro obrázky
    add_filter('wp_lazy_loading_enabled', '__return_true');
    
    // Odstranění zbytečných WordPress výstupů
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    
    // Minifikace HTML pro statické části
    if (!is_admin() && !is_user_logged_in()) {
        ob_start('airport81_minify_html');
    }
}
add_action('init', 'airport81_performance_optimizations');

function airport81_minify_html($buffer) {
    $search = array('/\>[^\S ]+/s', '/[^\S ]+\</s', '/(\s)+/s');
    $replace = array('>', '<', '\\1');
    $buffer = preg_replace($search, $replace, $buffer);
    return $buffer;
}

/**
 * ADMIN CUSTOMIZACE
 */
function airport81_admin_styles() {
    echo '<style>
        #adminmenu .wp-menu-image.dashicons-airplane:before { content: "\f15c"; }
        .wp-admin #wpadminbar { background: linear-gradient(90deg, #3b82f6, #a855f7); }
    </style>';
}
add_action('admin_head', 'airport81_admin_styles');