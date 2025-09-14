# Synology OpenVPN Server - Rychlý průvodce nastavením

## 1. Příprava Synology DSM

### Instalace VPN Server balíčku
1. Otevřete DSM webové rozhraní: http://192.168.10.83:5000
2. Přejděte do **Package Center**
3. Vyhledejte **VPN Server**
4. Klikněte na **Install**

### Povolení SSH (pokud chcete použít automatizační skripty)
1. **Control Panel** → **Terminal & SNMP**
2. Zaškrtněte **Enable SSH service**
3. Port ponechte 22

## 2. Konfigurace OpenVPN serveru

### Manuální nastavení v DSM
1. Otevřete aplikaci **VPN Server**
2. V levém menu vyberte **OpenVPN**
3. Zaškrtněte **Enable OpenVPN server**
4. Nastavte následující parametry:
   - **Dynamic IP address**: `10.8.0.0`
   - **Mask**: `255.255.255.0`
   - **Maximum connection**: `10`
   - **Port**: `1194`
   - **Protocol**: `UDP`
   - **Encryption**: `AES-256-CBC`
   - **Authentication**: `SHA256`
   - **Enable compression**: ✓
   - **Allow clients to access server's LAN**: ✓
   - **Push global route**: ✓

### Automatické nastavení pomocí skriptu
```bash
# Spusťte setup skript
chmod +x synology_openvpn_setup.sh
./synology_openvpn_setup.sh

# Nebo použijte Python automatizaci
python3 synology_vpn_autoconfig.py
```

## 3. Nastavení firewallu

### V DSM
1. **Control Panel** → **Security** → **Firewall**
2. Klikněte na **Edit Rules**
3. **Create** → Vytvořte nové pravidlo:
   - **Ports**: Custom, UDP, 1194
   - **Source IP**: All
   - **Action**: Allow

### Na routeru
Nastavte port forwarding:
- **Externí port**: 1194 UDP
- **Interní IP**: 192.168.10.83
- **Interní port**: 1194 UDP

## 4. Export konfigurace a certifikátů

1. V **VPN Server** → **OpenVPN**
2. Klikněte na **Export configuration**
3. Stáhněte ZIP soubor obsahující:
   - ca.crt (CA certifikát)
   - openvpn.ovpn (vzorová konfigurace)
   - README.txt

## 5. Vytvoření uživatelů

### Metoda 1: Synology uživatelé
1. **Control Panel** → **User**
2. Vytvořte nového uživatele
3. V **VPN Server** → **Privilege**
4. Povolte OpenVPN pro daného uživatele

### Metoda 2: Certifikáty
1. Použijte vygenerovaný skript:
```bash
./generate_client_cert.sh jmeno_klienta
```

## 6. Konfigurace klientů

### Windows/Mac/Linux (OpenVPN Client)
1. Stáhněte a nainstalujte OpenVPN Client
2. Importujte .ovpn soubor
3. Přidejte uživatelské jméno a heslo

### Android/iOS
1. Nainstalujte OpenVPN Connect z obchodu
2. Importujte .ovpn soubor
3. Zadejte přihlašovací údaje

## 7. Testování připojení

```bash
# Ověření, že VPN server běží
ssh admin@192.168.10.83 "ps aux | grep openvpn"

# Test připojení z klienta
ping 10.8.0.1

# Ověření přístupu do LAN
ping 192.168.10.83
```

## Řešení problémů

### VPN se nepřipojuje
- Zkontrolujte port forwarding na routeru
- Ověřte firewall pravidla
- Zkontrolujte logy: `/var/log/openvpn.log`

### Klient se připojí, ale nemá přístup k internetu
- Zkontrolujte "Push global route" nastavení
- Ověřte NAT/masquerade pravidla

### Pomalé připojení
- Zkuste změnit MTU hodnotu
- Vypněte kompresi pokud máte rychlé připojení

## Bezpečnostní doporučení

1. **Používejte silné hesla** pro VPN uživatele
2. **Pravidelně aktualizujte** DSM a VPN Server
3. **Omezte přístup** pouze na potřebné uživatele
4. **Monitorujte logy** pro podezřelou aktivitu
5. **Zvažte použití 2FA** pro DSM přístup

## Užitečné příkazy

```bash
# Status OpenVPN serveru
sudo /var/packages/VPNCenter/target/scripts/openvpn.sh status

# Restart OpenVPN serveru
sudo /var/packages/VPNCenter/target/scripts/openvpn.sh restart

# Zobrazení připojených klientů
cat /var/log/openvpn-status.log

# Kontrola logů
tail -f /var/log/openvpn.log
```