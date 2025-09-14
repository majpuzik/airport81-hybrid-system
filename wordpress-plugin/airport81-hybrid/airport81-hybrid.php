<?php
/**
 * Plugin Name: Airport81 Hybrid CSS
 * Description: Hybridní řešení - editace CSS přes WordPress pro Next.js (Božské přikázání č.6)
 * Version: 2.0.0
 * Author: Airport81
 */

if (!defined('ABSPATH')) {
    exit;
}

class Airport81_Hybrid_CSS {
    
    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('admin_bar_menu', [$this, 'add_admin_bar_link'], 100);
        add_action('admin_head', [$this, 'add_view_website_button']);
    }
    
    public function register_routes() {
        register_rest_route('airport81/v1', '/styles', [
            'methods' => 'GET',
            'callback' => [$this, 'get_styles'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    public function get_styles() {
        $css = get_option('airport81_hybrid_css', '
/* Airport81 Hybrid CSS */
/* Božské přikázání č.6 - Editujte CSS zde */
        ');
        
        return new WP_REST_Response($css, 200, [
            'Content-Type' => 'text/css',
            'Access-Control-Allow-Origin' => '*',
        ]);
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Airport81 Hybrid',
            'Airport81 CSS',
            'manage_options',
            'airport81-hybrid',
            [$this, 'admin_page'],
            'dashicons-airplane',
            30
        );
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>✈️ Airport81 Hybrid CSS Editor</h1>
            <p><strong>Božské přikázání č.6:</strong> Zde můžete upravovat CSS styly pro Next.js web.</p>
            
            <form method="post" action="options.php">
                <?php settings_fields('airport81_hybrid_settings'); ?>
                
                <h2>Custom CSS pro Next.js</h2>
                <textarea name="airport81_hybrid_css" rows="25" style="width: 100%; font-family: 'Monaco', 'Courier New', monospace; font-size: 14px;">
<?php echo esc_textarea(get_option('airport81_hybrid_css', '')); ?>
                </textarea>
                
                <div style="background: #f0f8ff; padding: 15px; margin: 20px 0; border-left: 4px solid #2196F3;">
                    <h3>🎨 Příklady CSS úprav:</h3>
                    <pre style="background: white; padding: 10px; overflow-x: auto;">
/* Změna hlavní barvy */
:root {
    --brand: #ff00ff;  /* Magenta */
}

/* Větší nadpisy */
h1 { 
    font-size: 5rem !important; 
}

/* Vlastní barva tlačítek */
.btn-primary { 
    background: linear-gradient(45deg, #ff00ff, #00ffff) !important;
}

/* Animace pro dock karty */
.dock-card:hover {
    transform: rotateY(10deg) scale(1.1) !important;
}
                    </pre>
                </div>
                
                <?php submit_button('✈️ Uložit a aplikovat na web'); ?>
            </form>
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-left: 4px solid #4caf50;">
                <h3>✅ Integrace funguje!</h3>
                <p>CSS se automaticky načítá do Next.js webu na <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
                <p>API endpoint: <code>http://localhost:8081/wp-json/airport81/v1/styles</code></p>
            </div>
        </div>
        <?php
    }
    
    public function register_settings() {
        register_setting('airport81_hybrid_settings', 'airport81_hybrid_css');
    }
    
    public function add_admin_bar_link($wp_admin_bar) {
        $wp_admin_bar->add_node([
            'id'    => 'airport81_view_website',
            'title' => '✈️ Zobrazit Airport81 Web',
            'href'  => 'http://localhost:3000',
            'meta'  => [
                'target' => '_blank',
                'title'  => 'Otevřít Airport81 web v nové záložce'
            ]
        ]);
    }
    
    public function add_view_website_button() {
        if (isset($_GET['page']) && $_GET['page'] === 'airport81-hybrid') {
            ?>
            <script>
            document.addEventListener('DOMContentLoaded', function() {
                const header = document.querySelector('h1');
                if (header) {
                    const button = document.createElement('a');
                    button.href = 'http://localhost:3000';
                    button.target = '_blank';
                    button.className = 'button button-primary';
                    button.style.marginLeft = '10px';
                    button.innerHTML = '✈️ Zobrazit web';
                    header.appendChild(button);
                }
            });
            </script>
            <?php
        }
    }
}

new Airport81_Hybrid_CSS();