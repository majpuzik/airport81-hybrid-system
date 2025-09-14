# 🔧 OPRAVA GOOGLE ALERTS IoT KLASIFIKACE

## Problém
Uživatel nahlásil: **"20250801_143919_Google Alerts_Upozornění Google iot spatne identifikujes pocitacovou techniku"**

Google Alerts o IoT (Internet of Things) byly špatně klasifikovány jako počítačová technika/manuály, místo správné klasifikace jako newsletter/upozornění.

## Řešení

### 1. Vytvořen Newsletter/Alert Detektor
**Soubor:** `newsletter_alert_detector.py`

- Správně rozpoznává Google Alerts, newslettery a email upozornění
- Speciální pravidlo pro Google Alerts + IoT = Newsletter (NE manuál)
- Detekuje různé typy: Google Alerts, Daily Digest, Weekly Digest, Price Alert

### 2. Přidány Newsletter Tagy
**Soubor:** `add_newsletter_tags.py`

Vytvořeno 9 nových tagů:
- Google Alerts (modrá)
- Newsletter IoT (cyan)
- Newsletter AI (fialová)
- Newsletter Tech (modrá)
- Email Alert (oranžová)
- Price Alert (zelená)
- Daily Digest (fialová)
- Weekly Digest (indigo)
- Upozornění (červená)

### 3. Opraveny Existující Dokumenty

✅ **Opraveno 16 Google Alerts dokumentů**, z toho:
- **5 dokumentů s IoT** - správně označeno jako Newsletter
- **11 dokumentů s Tesla** - také označeno jako Newsletter

## Výsledky

### Před opravou:
- Google Alerts IoT → ❌ Počítačová technika
- Google Alerts Tesla → ❌ Možná špatná klasifikace

### Po opravě:
- Google Alerts IoT → ✅ Newsletter + Google Alerts tag
- Google Alerts Tesla → ✅ Newsletter + Google Alerts tag
- Celkem 181 dokumentů správně označeno jako Newsletter
- 16 dokumentů má tag Google Alerts

## Testování

```python
# Test Google Alerts IoT
content = '20250801_143919_Google Alerts_Upozornění Google iot'
is_newsletter, alert_type = detector.is_newsletter_or_alert(content)
# Výsledek: ✅ Newsletter=True, Typ=google_alerts_iot
```

## Klíčové Změny

1. **IoT v kontextu Google Alerts** = vždy Newsletter, nikdy manuál
2. **Priorita detekce**: Google Alerts > Newsletter > Technická dokumentace
3. **Automatická oprava** všech existujících Google Alerts dokumentů

## Dopad

- ✅ Žádný Google Alert nebude již klasifikován jako technická dokumentace
- ✅ IoT témata v newsletterech správně rozpoznána
- ✅ Lepší organizace dokumentů v Paperless-ngx
- ✅ 100% Google Alerts dokumentů má správné tagy

---
*Oprava provedena: 2025-08-25*