<?php
/**
 * Plugin Name: Airport81 CSS Manager
 * Description: Hybridní řešení - správa CSS pro Next.js frontend přes WordPress/Elementor
 * Version: 1.0.0
 * Author: Airport81
 * Text Domain: airport81-css
 */

// Zabezpečení
if (!defined('ABSPATH')) exit;

class Airport81_CSS_Manager {
    
    private static $instance = null;
    private $option_name = 'airport81_custom_styles';
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', [$this, 'init']);
        add_action('rest_api_init', [$this, 'register_api_routes']);
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('elementor/editor/before_enqueue_scripts', [$this, 'elementor_editor_scripts']);
        add_action('save_post', [$this, 'trigger_nextjs_revalidation']);
    }
    
    public function init() {
        // Registrace custom post type pro CSS pravidla
        register_post_type('airport81_css_rule', [
            'labels' => [
                'name' => 'CSS Pravidla',
                'singular_name' => 'CSS Pravidlo',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false,
            'supports' => ['title', 'editor'],
            'capability_type' => 'post',
        ]);
    }
    
    /**
     * REST API Endpoints pro Next.js
     */
    public function register_api_routes() {
        // GET /wp-json/airport81/v1/styles
        register_rest_route('airport81/v1', '/styles', [
            'methods' => 'GET',
            'callback' => [$this, 'get_styles'],
            'permission_callback' => '__return_true', // Veřejné API
        ]);
        
        // GET /wp-json/airport81/v1/styles/elementor
        register_rest_route('airport81/v1', '/styles/elementor', [
            'methods' => 'GET',
            'callback' => [$this, 'get_elementor_styles'],
            'permission_callback' => '__return_true',
        ]);
        
        // POST /wp-json/airport81/v1/styles (vyžaduje autentizaci)
        register_rest_route('airport81/v1', '/styles', [
            'methods' => 'POST',
            'callback' => [$this, 'update_styles'],
            'permission_callback' => function() {
                return current_user_can('edit_theme_options');
            },
        ]);
    }
    
    /**
     * Získat všechny custom styly
     */
    public function get_styles($request) {
        $styles = [];
        
        // 1. Globální custom CSS
        $global_css = get_option($this->option_name, '');
        if ($global_css) {
            $styles['global'] = $global_css;
        }
        
        // 2. Elementor globální styly
        if (class_exists('\Elementor\Plugin')) {
            $kit_id = \Elementor\Plugin::$instance->kits_manager->get_active_id();
            $kit_settings = get_post_meta($kit_id, '_elementor_page_settings', true);
            
            if ($kit_settings) {
                $styles['elementor'] = $this->process_elementor_settings($kit_settings);
            }
        }
        
        // 3. CSS pravidla z custom post type
        $rules = get_posts([
            'post_type' => 'airport81_css_rule',
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ]);
        
        $custom_rules = [];
        foreach ($rules as $rule) {
            $custom_rules[$rule->post_name] = $rule->post_content;
        }
        
        if (!empty($custom_rules)) {
            $styles['rules'] = $custom_rules;
        }
        
        // 4. Responsivní styly
        $styles['responsive'] = [
            'mobile' => get_option('airport81_mobile_css', ''),
            'tablet' => get_option('airport81_tablet_css', ''),
            'desktop' => get_option('airport81_desktop_css', ''),
        ];
        
        // 5. Kompilovať do finálního CSS
        $compiled_css = $this->compile_css($styles);
        
        return rest_ensure_response([
            'success' => true,
            'css' => $compiled_css,
            'raw' => $styles,
            'timestamp' => current_time('timestamp'),
            'cache_key' => md5($compiled_css),
        ]);
    }
    
    /**
     * Zpracovat Elementor nastavení do CSS
     */
    private function process_elementor_settings($settings) {
        $css = '';
        
        // Barvy
        if (isset($settings['system_colors'])) {
            $css .= ':root {' . PHP_EOL;
            foreach ($settings['system_colors'] as $color) {
                $css .= sprintf(
                    '  --airport-%s: %s;' . PHP_EOL,
                    $color['_id'],
                    $color['color']
                );
            }
            $css .= '}' . PHP_EOL;
        }
        
        // Typografie
        if (isset($settings['system_typography'])) {
            foreach ($settings['system_typography'] as $typo) {
                $css .= sprintf(
                    '.elementor-%s { font-family: %s; font-size: %s; font-weight: %s; }' . PHP_EOL,
                    $typo['_id'],
                    $typo['typography_font_family'] ?? 'inherit',
                    $typo['typography_font_size']['size'] . $typo['typography_font_size']['unit'] ?? '16px',
                    $typo['typography_font_weight'] ?? 'normal'
                );
            }
        }
        
        return $css;
    }
    
    /**
     * Kompilovat CSS z různých zdrojů
     */
    private function compile_css($styles) {
        $output = '';
        
        // Header komentář
        $output .= '/* Airport81 Hybrid CSS - Generated: ' . date('Y-m-d H:i:s') . ' */' . PHP_EOL;
        $output .= '/* This CSS is managed via WordPress/Elementor and served to Next.js */' . PHP_EOL . PHP_EOL;
        
        // Globální styly
        if (!empty($styles['global'])) {
            $output .= '/* Global Styles */' . PHP_EOL;
            $output .= $styles['global'] . PHP_EOL . PHP_EOL;
        }
        
        // Elementor styly
        if (!empty($styles['elementor'])) {
            $output .= '/* Elementor Styles */' . PHP_EOL;
            $output .= $styles['elementor'] . PHP_EOL . PHP_EOL;
        }
        
        // Custom pravidla
        if (!empty($styles['rules'])) {
            $output .= '/* Custom Rules */' . PHP_EOL;
            foreach ($styles['rules'] as $name => $rule) {
                $output .= '/* Rule: ' . $name . ' */' . PHP_EOL;
                $output .= $rule . PHP_EOL . PHP_EOL;
            }
        }
        
        // Responsivní styly
        if (!empty($styles['responsive']['mobile'])) {
            $output .= '@media (max-width: 767px) {' . PHP_EOL;
            $output .= $styles['responsive']['mobile'] . PHP_EOL;
            $output .= '}' . PHP_EOL . PHP_EOL;
        }
        
        if (!empty($styles['responsive']['tablet'])) {
            $output .= '@media (min-width: 768px) and (max-width: 1024px) {' . PHP_EOL;
            $output .= $styles['responsive']['tablet'] . PHP_EOL;
            $output .= '}' . PHP_EOL . PHP_EOL;
        }
        
        if (!empty($styles['responsive']['desktop'])) {
            $output .= '@media (min-width: 1025px) {' . PHP_EOL;
            $output .= $styles['responsive']['desktop'] . PHP_EOL;
            $output .= '}' . PHP_EOL;
        }
        
        // Minifikace (volitelné)
        if (get_option('airport81_minify_css', false)) {
            $output = $this->minify_css($output);
        }
        
        return $output;
    }
    
    /**
     * Minifikace CSS
     */
    private function minify_css($css) {
        $css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
        $css = str_replace(["\r\n", "\r", "\n", "\t", '  ', '    '], '', $css);
        $css = str_replace(['; ', ': ', ' {', '{ ', ' }', '} ', ': '], [';', ':', '{', '{', '}', '}', ':'], $css);
        return $css;
    }
    
    /**
     * Admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Airport81 CSS Manager',
            'Airport81 CSS',
            'edit_theme_options',
            'airport81-css',
            [$this, 'admin_page'],
            'dashicons-airplane',
            30
        );
        
        add_submenu_page(
            'airport81-css',
            'CSS Editor',
            'CSS Editor',
            'edit_theme_options',
            'airport81-css',
            [$this, 'admin_page']
        );
        
        add_submenu_page(
            'airport81-css',
            'Elementor Sync',
            'Elementor Sync',
            'edit_theme_options',
            'airport81-elementor-sync',
            [$this, 'elementor_sync_page']
        );
        
        add_submenu_page(
            'airport81-css',
            'Next.js Settings',
            'Next.js Settings',
            'manage_options',
            'airport81-nextjs',
            [$this, 'nextjs_settings_page']
        );
    }
    
    /**
     * Admin stránka pro editaci CSS
     */
    public function admin_page() {
        if (isset($_POST['airport81_css_nonce']) && wp_verify_nonce($_POST['airport81_css_nonce'], 'save_css')) {
            update_option($this->option_name, sanitize_textarea_field($_POST['custom_css']));
            update_option('airport81_mobile_css', sanitize_textarea_field($_POST['mobile_css']));
            update_option('airport81_tablet_css', sanitize_textarea_field($_POST['tablet_css']));
            update_option('airport81_desktop_css', sanitize_textarea_field($_POST['desktop_css']));
            
            // Trigger Next.js revalidation
            $this->trigger_nextjs_revalidation();
            
            echo '<div class="notice notice-success"><p>CSS uloženo a synchronizováno s Next.js!</p></div>';
        }
        
        $custom_css = get_option($this->option_name, '');
        $mobile_css = get_option('airport81_mobile_css', '');
        $tablet_css = get_option('airport81_tablet_css', '');
        $desktop_css = get_option('airport81_desktop_css', '');
        ?>
        <div class="wrap">
            <h1>✈️ Airport81 CSS Manager</h1>
            
            <div class="notice notice-info">
                <p>Tyto styly se automaticky aplikují na Next.js frontend. Změny se projeví do 60 sekund.</p>
            </div>
            
            <form method="post">
                <?php wp_nonce_field('save_css', 'airport81_css_nonce'); ?>
                
                <h2>Globální CSS</h2>
                <textarea name="custom_css" id="custom_css" rows="20" style="width: 100%; font-family: monospace;"><?php echo esc_textarea($custom_css); ?></textarea>
                
                <h2>Responsivní styly</h2>
                
                <details>
                    <summary>📱 Mobile CSS (max-width: 767px)</summary>
                    <textarea name="mobile_css" rows="10" style="width: 100%; font-family: monospace;"><?php echo esc_textarea($mobile_css); ?></textarea>
                </details>
                
                <details>
                    <summary>📱 Tablet CSS (768px - 1024px)</summary>
                    <textarea name="tablet_css" rows="10" style="width: 100%; font-family: monospace;"><?php echo esc_textarea($tablet_css); ?></textarea>
                </details>
                
                <details>
                    <summary>💻 Desktop CSS (min-width: 1025px)</summary>
                    <textarea name="desktop_css" rows="10" style="width: 100%; font-family: monospace;"><?php echo esc_textarea($desktop_css); ?></textarea>
                </details>
                
                <p class="submit">
                    <button type="submit" class="button button-primary">Uložit a synchronizovat</button>
                    <button type="button" class="button" onclick="previewCSS()">Náhled</button>
                </p>
            </form>
            
            <script>
            function previewCSS() {
                const css = document.getElementById('custom_css').value;
                const preview = window.open('<?php echo home_url(); ?>', 'preview');
                preview.addEventListener('load', () => {
                    const style = preview.document.createElement('style');
                    style.textContent = css;
                    preview.document.head.appendChild(style);
                });
            }
            
            // CodeMirror pro syntax highlighting (pokud je k dispozici)
            if (typeof wp !== 'undefined' && wp.codeEditor) {
                wp.codeEditor.initialize('custom_css', {
                    codemirror: {
                        mode: 'css',
                        lineNumbers: true,
                        theme: 'monokai'
                    }
                });
            }
            </script>
        </div>
        <?php
    }
    
    /**
     * Trigger Next.js revalidation při změně CSS
     */
    public function trigger_nextjs_revalidation($post_id = null) {
        $nextjs_url = get_option('airport81_nextjs_url', 'https://airport81.eu');
        $webhook_secret = get_option('airport81_webhook_secret', '');
        
        if (empty($webhook_secret)) {
            return;
        }
        
        // Webhook pro Next.js revalidaci
        wp_remote_post($nextjs_url . '/api/revalidate-css', [
            'headers' => [
                'Authorization' => 'Bearer ' . $webhook_secret,
                'Content-Type' => 'application/json',
            ],
            'body' => json_encode([
                'timestamp' => current_time('timestamp'),
                'source' => 'wordpress',
                'type' => 'css_update',
            ]),
            'timeout' => 5,
        ]);
    }
    
    /**
     * Next.js nastavení stránka
     */
    public function nextjs_settings_page() {
        if (isset($_POST['save_settings'])) {
            update_option('airport81_nextjs_url', sanitize_url($_POST['nextjs_url']));
            update_option('airport81_webhook_secret', sanitize_text_field($_POST['webhook_secret']));
            update_option('airport81_minify_css', isset($_POST['minify_css']));
            echo '<div class="notice notice-success"><p>Nastavení uloženo!</p></div>';
        }
        
        $nextjs_url = get_option('airport81_nextjs_url', 'https://airport81.eu');
        $webhook_secret = get_option('airport81_webhook_secret', '');
        $minify = get_option('airport81_minify_css', false);
        ?>
        <div class="wrap">
            <h1>Next.js Integrace</h1>
            
            <form method="post">
                <table class="form-table">
                    <tr>
                        <th>Next.js URL</th>
                        <td>
                            <input type="url" name="nextjs_url" value="<?php echo esc_attr($nextjs_url); ?>" class="regular-text" />
                            <p class="description">URL vašeho Next.js frontendu</p>
                        </td>
                    </tr>
                    <tr>
                        <th>Webhook Secret</th>
                        <td>
                            <input type="text" name="webhook_secret" value="<?php echo esc_attr($webhook_secret); ?>" class="regular-text" />
                            <p class="description">Tajný klíč pro autentizaci webhooků</p>
                        </td>
                    </tr>
                    <tr>
                        <th>Minifikace CSS</th>
                        <td>
                            <label>
                                <input type="checkbox" name="minify_css" <?php checked($minify); ?> />
                                Minifikovat CSS před odesláním
                            </label>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <button type="submit" name="save_settings" class="button button-primary">Uložit nastavení</button>
                    <button type="button" class="button" onclick="testConnection()">Test připojení</button>
                </p>
            </form>
            
            <script>
            function testConnection() {
                fetch('<?php echo admin_url('admin-ajax.php'); ?>?action=test_nextjs_connection')
                    .then(r => r.json())
                    .then(data => {
                        alert(data.success ? 'Připojení funguje!' : 'Připojení selhalo: ' + data.message);
                    });
            }
            </script>
        </div>
        <?php
    }
}

// Inicializace pluginu
Airport81_CSS_Manager::get_instance();