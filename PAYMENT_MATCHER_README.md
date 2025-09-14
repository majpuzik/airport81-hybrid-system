# Paperless Payment Matcher for Proforma Invoices

Automated payment matching system that connects proforma invoices with bank payments in Paperless-ngx.

## Overview

This system automatically:
1. Detects proforma invoices and extracts variable symbols (VS)
2. Monitors bank statements for incoming payments
3. Matches payments to proforma invoices by VS
4. Updates document tags and creates tasks for issuing final invoices

## Features

- **Automatic Detection**: Identifies proforma invoices and bank statements
- **Variable Symbol Matching**: Extracts and matches VS from documents
- **Payment Tracking**: Updates proforma status when payment is received
- **Task Creation**: Generates tasks for issuing final invoices
- **Multi-Bank Support**: Works with major Czech banks (ČSOB, KB, ČS, Fio)
- **REST API**: Webhook integration with Paperless-ngx
- **Background Processing**: Queue-based document processing

## Installation

### Prerequisites

- Paperless-ngx installed and running
- Python 3.8+
- Paperless API token (create in Admin > Auth Tokens)

### Quick Setup

```bash
sudo ./setup_payment_matcher.sh
```

### Manual Setup

1. **Install dependencies:**
   ```bash
   pip3 install flask requests
   ```

2. **Copy files to Paperless directory:**
   ```bash
   sudo mkdir -p /opt/paperless/payment-matcher
   sudo cp payment_matcher.py paperless_webhook_handler.py /opt/paperless/payment-matcher/
   ```

3. **Set up systemd service:**
   ```bash
   sudo cp payment-matcher.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable payment-matcher
   sudo systemctl start payment-matcher
   ```

4. **Configure Paperless webhook:**
   
   Add to `paperless.conf`:
   ```
   PAPERLESS_POST_CONSUME_SCRIPT=/opt/paperless/payment-matcher/notify_webhook.sh
   ```

## Configuration

### Environment Variables

- `PAPERLESS_URL`: URL of your Paperless instance (default: http://localhost:8000)
- `PAPERLESS_TOKEN`: Your Paperless API token

### Paperless Tags

The system automatically creates these tags:
- **Proforma Invoice**: Orange - Identifies proforma documents
- **Awaiting Payment**: Tomato - Proforma waiting for payment
- **Payment Received**: Lime Green - Payment has been matched
- **Invoice Issued**: Forest Green - Final invoice created
- **Bank Statement**: Royal Blue - Bank statement documents
- **Matched Payment**: Medium Purple - Statements with matched payments

### Document Types

Automatically created:
- Proforma Invoice
- Invoice
- Bank Statement

## Usage

### Automatic Workflow

1. **Upload Proforma Invoice** to Paperless
   - System detects it's a proforma
   - Extracts variable symbol and amount
   - Tags as "Proforma Invoice" and "Awaiting Payment"

2. **Upload Bank Statement**
   - System scans for transactions
   - Matches payments by variable symbol
   - Updates proforma tags to "Payment Received"

3. **Task Creation**
   - Creates task to issue final invoice
   - Includes payment details and date

### Manual Operations

**Check Status:**
```bash
curl http://localhost:5000/status
```

**Scan for Pending Proformas:**
```bash
curl -X POST http://localhost:5000/scan_pending
```

**Process Specific Document:**
```bash
curl -X POST http://localhost:5000/process/123
```

## API Endpoints

- `GET /status` - View pending proformas and system status
- `POST /webhook/document_added` - Paperless webhook for new documents
- `POST /webhook/document_updated` - Paperless webhook for updates
- `POST /process/<doc_id>` - Manually process a document
- `POST /scan_pending` - Scan for all pending proformas
- `GET /health` - Health check endpoint

## Supported Document Formats

### Proforma Invoice Detection

Looks for these keywords:
- "proforma faktura"
- "zálohová faktura"
- "proforma invoice"
- "pro forma"

### Bank Statement Detection

Supports these Czech banks:
- ČSOB (Československá obchodní banka)
- KB (Komerční banka)
- ČS (Česká spořitelna)
- Fio banka
- And others

### Variable Symbol Patterns

Extracts VS from:
- "Variabilní symbol: 123456"
- "Var. symbol: 123456"
- "VS: 123456"
- "Variable Symbol: 123456"

## Monitoring

### View Logs
```bash
# Service logs
sudo journalctl -u payment-matcher -f

# Application logs
tail -f /var/log/payment-matcher/app.log
```

### Check Service Status
```bash
sudo systemctl status payment-matcher
```

## Troubleshooting

### Service Won't Start

1. Check API token:
   ```bash
   sudo grep PAPERLESS_TOKEN /etc/systemd/system/payment-matcher.service
   ```

2. Test Paperless connection:
   ```bash
   curl -H "Authorization: Token YOUR_TOKEN" http://localhost:8000/api/
   ```

### Documents Not Processing

1. Check webhook configuration:
   ```bash
   grep POST_CONSUME_SCRIPT /opt/paperless/paperless.conf
   ```

2. Test webhook manually:
   ```bash
   curl -X POST http://localhost:5000/webhook/document_added \
        -H "Content-Type: application/json" \
        -d '{"document_id": 123}'
   ```

### Payments Not Matching

1. Check VS extraction:
   - View document in Paperless
   - Check custom fields for extracted VS

2. Verify bank statement format:
   - Ensure VS is visible in statement
   - Check transaction format matches patterns

## Testing

Run the test suite:
```bash
cd /opt/paperless/payment-matcher
python3 test_payment_matcher.py
```

## Advanced Configuration

### Custom Bank Formats

Add new bank patterns in `payment_matcher.py`:

```python
BANK_PATTERNS = {
    'CUSTOM_BANK': {
        'name': 'Custom Bank Name',
        'patterns': [r'custom', r'patterns']
    }
}
```

### Custom Transaction Patterns

Add transaction regex patterns:

```python
transaction_patterns = [
    # Your custom pattern
    r'(\d{1,2}\.\d{1,2}\.\d{4})\s+(.+?)\s+VS:\s*(\d+)\s+([+-]?\d+[,.]?\d*)'
]
```

## Integration with Other Systems

### Email Notifications

Create a notification script:

```python
def send_payment_notification(proforma, payment):
    # Send email when payment is matched
    pass
```

### Automatic Invoice Generation

Integrate with invoice generation system:

```python
def create_final_invoice(proforma_id, payment_data):
    # Generate final invoice based on proforma
    pass
```

## Security Considerations

1. **API Token**: Keep Paperless token secure
2. **Network**: Run on localhost or secure network
3. **Permissions**: Service runs as paperless user
4. **Input Validation**: All inputs are validated

## Performance

- Processes documents asynchronously
- Queue-based to handle high loads
- Caches pending proformas in memory
- Efficient regex patterns for extraction

## Future Enhancements

- [ ] Partial payment support
- [ ] Multiple payment consolidation
- [ ] Email notifications
- [ ] Automatic invoice generation
- [ ] Payment deadline monitoring
- [ ] Currency conversion support
- [ ] Advanced reporting

## Support

For issues or questions:
1. Check logs: `journalctl -u payment-matcher -f`
2. Run tests: `python3 test_payment_matcher.py`
3. Check Paperless integration: `/api/documents/` endpoint

## License

This tool is part of the Paperless-ngx ecosystem and follows the same licensing terms.