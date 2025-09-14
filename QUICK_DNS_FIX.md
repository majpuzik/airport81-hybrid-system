# Rychlá oprava DNS timeout problémů

## Problém:
DNS dotazy na `.local` domény způsobují timeouty a zpomalují systém.

## Okamžité řešení:

### 1. Vyčistit DNS cache (vyžaduje heslo):
```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### 2. Změnit DNS servery na rychlejší:
```bash
# Otevřete Systémové předvolby → Síť → Wi-Fi → Rozšířené → DNS
# Přidejte:
1.1.1.1
8.8.8.8
```

### 3. Vypnout mDNS ve problematických zařízeních:

#### Home Assistant:
- Přihlaste se do Home Assistant
- Configuration → General → Network
- Vypněte "mDNS" nebo "Zeroconf"

#### NAS4:
- Přihlaste se do administrace
- Network → Services → Bonjour/mDNS
- Vypněte službu

## Trvalé řešení:

### Filtrovat problematické dotazy:
Vytvořte soubor `/etc/hosts` záznamy:
```
127.0.0.1 Domov._home-assistant._tcp.local
127.0.0.1 NAS4._daap._tcp.local
127.0.0.1 MS-Softel\ HTTP._http._tcp.local
```

### OrbStack konfigurace:
1. Otevřete OrbStack nastavení
2. Network → DNS
3. Vypněte "mDNS resolution"

## Výsledek:
- Eliminuje DNS timeouty
- Zrychlí síťové operace
- Stabilizuje OrbStack