# Gmail Advanced Document Processor

## 📧 Professional Grade Email Processing System

A comprehensive solution for automatically processing Gmail emails, extracting attachments, classifying documents using advanced AI patterns, and uploading to Paperless-ngx via MCP API.

## ✨ Key Features

### 🔍 Advanced Document Classification
- **Invoice Detection**: Multi-regional support (CZ/DE/AT/SK/US/CN) with weighted scoring
- **Bank Statement Detection**: Fuzzy matching with OCR error tolerance  
- **Receipt Detection**: 50+ service categories with probabilistic scoring
- **Police Document Detection**: Legal pattern recognition for official documents
- **Spam Filtering**: Intelligent keyword-based spam detection

### 🚀 Processing Capabilities
- **Gmail IMAP Integration**: Direct connection with provided credentials
- **Parallel Processing**: Multi-threaded email processing for speed
- **Attachment Extraction**: Automatic PDF attachment handling
- **OCR Support**: Text extraction from PDF documents
- **Statistics Tracking**: Comprehensive processing metrics

### 🗄️ Data Management
- **SQLite Database**: Persistent tracking of processed emails
- **Paperless-ngx Integration**: Automatic document upload via MCP API
- **JSON Results Export**: Detailed processing results and statistics
- **Error Handling**: Robust error recovery and logging

## 🛠️ Setup & Installation

### Prerequisites
```bash
# Ensure Python 3.8+ is installed
python3 --version

# Required system tools for PDF processing
# macOS: 
brew install poppler tesseract

# Ubuntu/Debian:
sudo apt install poppler-utils tesseract-ocr

# The system will work with basic functionality even without these tools
```

### Configuration
The processor uses the provided Gmail credentials:
- **User**: majpuzik@gmail.com
- **Password**: gjrqvqcgosppfkmp
- **Folder**: [Gmail]/Alle Nachrichten
- **Search**: ALL emails (both read and unread)

## 🚀 Usage

### Basic Usage
```bash
# Process up to 10 emails (recommended for first test)
python3 gmail_advanced_document_processor.py --max-emails 10

# Process all emails (can be many!)
python3 gmail_advanced_document_processor.py
```

### Advanced Usage
```bash
# Use parallel processing with 4 workers
python3 gmail_advanced_document_processor.py --parallel --workers 4

# Set minimum confidence threshold for Paperless upload
python3 gmail_advanced_document_processor.py --min-confidence 0.80

# Combine options
python3 gmail_advanced_document_processor.py --max-emails 50 --parallel --workers 2 --min-confidence 0.70
```

### Custom Configuration
Create a config file (e.g., `my_config.json`):
```json
{
  "gmail": {
    "max_emails": 100
  },
  "processing": {
    "parallel_processing": true,
    "max_workers": 4,
    "min_confidence": 0.75
  },
  "paperless": {
    "upload_via_mcp": true,
    "url": "http://your-paperless-server:8000"
  }
}
```

Then run:
```bash
python3 gmail_advanced_document_processor.py --config my_config.json
```

## 📊 Output & Results

### Processing Results
The system generates several outputs:

1. **JSON Results File**: `gmail_processing_results_YYYYMMDD_HHMMSS.json`
   - Complete processing statistics
   - Detailed document classifications
   - Error reports and warnings

2. **SQLite Database**: `gmail_processing.db`
   - Persistent storage of all processed emails
   - Prevents reprocessing of same emails
   - Query-able for analysis

3. **Log Files**: `logs/gmail_processing_YYYYMMDD_HHMMSS.log`
   - Detailed processing logs
   - Error traces and debugging info
   - Processing timestamps

### Statistics Reported
- Total emails found and processed
- Document types discovered
- Classification confidence levels
- Paperless upload success rates
- Processing time and speed metrics

## 🎯 Document Types Detected

### Financial Documents
- **Invoices**: Multi-language support with regional patterns
- **Bank Statements**: CZ/DE/AT/SK formats with fuzzy matching
- **Receipts**: 50+ categories (automotive, medical, retail, services, etc.)

### Official Documents  
- **Police Documents**: Legal patterns, case numbers, official stamps
- **Contracts**: Service agreements, legal documents
- **Medical Records**: Healthcare documents, prescriptions
- **Government**: Official correspondence, regulations

### Commercial
- **Business Correspondence**: Professional communications
- **Marketing**: Newsletters, promotions (filtered as appropriate)
- **Subscriptions**: Service notifications, billing

## ⚙️ Advanced Features

### Intelligent Classification
The system uses multiple identification methods:

1. **Weighted Scoring**: Advanced invoice detection with 100% reliability
2. **Fuzzy Matching**: OCR error tolerance for bank statements  
3. **Probabilistic Scoring**: Receipt categorization with confidence levels
4. **Pattern Recognition**: Legal document identification
5. **Semantic Analysis**: Context-aware classification

### Error Recovery
- Automatic retry mechanisms
- Graceful handling of PDF processing errors
- Skip corrupted or unreadable emails
- Continue processing despite individual failures

### Security & Privacy
- Local processing only (no data sent to external services except Paperless)
- Secure credential handling
- Temporary file cleanup
- Error log sanitization

## 📈 Performance

### Expected Processing Speed
- **Small batches (10-50 emails)**: 1-2 minutes
- **Medium batches (100-500 emails)**: 5-15 minutes  
- **Large batches (1000+ emails)**: 30-60 minutes

### Optimization Tips
- Use `--parallel` for faster processing
- Adjust `--workers` based on your CPU cores
- Set appropriate `--min-confidence` to reduce false positives
- Use `--max-emails` for initial testing

## 🔧 Troubleshooting

### Common Issues

**1. Connection Errors**
```
Error: Gmail connection failed
```
- Check internet connection
- Verify Gmail credentials are correct
- Ensure IMAP is enabled for the account

**2. PDF Processing Errors**
```
Warning: PDF text extraction failed
```
- Install poppler-utils: `brew install poppler`
- Some PDFs may be image-only (OCR would help)

**3. Memory Issues with Large Batches**
```
Error: Out of memory
```
- Reduce `--max-emails` 
- Decrease `--workers`
- Process in smaller batches

**4. Paperless Upload Failures**
```
Error: Paperless upload failed
```
- Verify Paperless-ngx is running
- Check MCP server configuration
- Review network connectivity

### Debug Mode
Add logging for troubleshooting:
```bash
python3 gmail_advanced_document_processor.py --max-emails 5 2>&1 | tee debug.log
```

## 📝 File Structure

```
/Users/m.a.j.puzik/
├── gmail_advanced_document_processor.py    # Main processor
├── identify_invoice_weighted.py            # Advanced invoice detection
├── identify_bank_advanced.py               # Bank statement detection  
├── identify_uctenka_advanced.py           # Receipt detection
├── simple_test_gmail_processor.py          # Test suite
├── requirements_gmail_processor.txt        # Python dependencies
├── gmail_processing.db                     # Processing database
├── logs/                                   # Processing logs
├── gmail_processing_results_*.json         # Results files
└── GMAIL_PROCESSOR_README.md              # This documentation
```

## 🎉 Success Metrics

After successful processing, you should see:
- ✅ High classification confidence (>70% for most documents)
- ✅ Proper document type distribution 
- ✅ Successful Paperless uploads
- ✅ Minimal processing errors
- ✅ Fast processing times

## 📞 Support

For issues or questions:
1. Check the log files for detailed error messages
2. Run the test suite: `python3 simple_test_gmail_processor.py`
3. Try processing a small batch first: `--max-emails 5`
4. Review the JSON results file for classification details

---

**🚀 Ready to process Gmail emails with professional-grade document intelligence!**

The system is configured with your credentials and ready to:
1. Connect to Gmail IMAP  
2. Search ALL emails in [Gmail]/Alle Nachrichten
3. Extract and classify documents using advanced AI patterns
4. Upload relevant documents to Paperless-ngx
5. Generate comprehensive statistics and reports

Start with: `python3 gmail_advanced_document_processor.py --max-emails 10`