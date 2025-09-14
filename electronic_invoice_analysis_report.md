# Electronic Invoice Analysis Report
Generated: 2025-07-19

## Overview

This report analyzes the Paperless-NGX system to identify electronic invoices (labeled as "elektronicky") and their corresponding PDF versions. The system uses ISDOC format for electronic invoices.

## Key Findings

### 1. Electronic Invoice Identification

Based on the `electronic_documents_tags.json` file:
- **Tag ID**: 7572
- **Tag Name**: "Elektronická faktura ISDOC" 
- **Total Electronic Invoices**: 1,837 documents

The electronic invoices are identified by this specific tag and use the ISDOC (Information System Document) format, which is a Czech standard for electronic document exchange.

### 2. Document Analysis Statistics

From `document_analysis_results.json`:
- **Total Documents in System**: 31,503
- **Total Invoices Detected**: 5,538
- **Bank Statements Detected**: 2,438

### 3. Electronic Invoice Document IDs (First 100)

The following document IDs are tagged as electronic invoices:
4, 22, 30, 36, 42, 43, 46, 56, 72, 82, 88, 95, 101, 120, 121, 124, 129, 135, 137, 145, 151, 155, 158, 160, 165, 170, 181, 190, 195, 197, 204, 219, 224, 238, 239, 247, 265, 266, 283, 297, 298, 306, 325, 336, 341, 356, 360, 363, 379, 380, 390, 392, 402, 409, 411, 429, 434, 436, 438, 457, 459, 463, 468, 473, 477, 478, 481, 482, 491, 509, 520, 523, 524, 531, 548, 550, 554, 558, 559, 568, 580, 595, 596, 598, 602, 607, 611, 620, 627, 635, 641, 667, 670...

### 4. Pattern Analysis

#### ID Proximity Patterns
Electronic invoices often have corresponding PDF versions with document IDs that are close to each other. This suggests:
- Documents may be imported in batches
- Electronic and PDF versions might be uploaded around the same time

#### Common Characteristics of Electronic Invoices
- Format: ISDOC/ISDOCX
- Contains structured data (XML)
- Machine-readable format
- Includes metadata like:
  - Invoice number (číslo faktury)
  - Variable symbol (variabilní symbol)
  - Supplier ICO/DIČ
  - Amount and currency
  - Dates (issue date, due date)

## Recommended Matching Strategy

To find corresponding PDF versions for electronic invoices:

### 1. **Content-Based Matching**
- Extract invoice number from both electronic and PDF documents
- Compare variable symbols (VS)
- Match amounts and dates
- Compare supplier information (ICO/DIČ)

### 2. **Proximity-Based Matching**
- Look for PDF documents with IDs within ±10 of the electronic invoice ID
- Check documents created around the same time

### 3. **Metadata Matching**
- Compare document titles
- Look for similar correspondent/supplier tags
- Check for matching date ranges

## Example Matches (Based on ID Proximity)

Here are 10 examples of potential electronic invoice and PDF pairs based on document ID proximity:

1. **Electronic ID 4** → Potential PDF IDs: 1-14
2. **Electronic ID 22** → Potential PDF IDs: 12-32  
3. **Electronic ID 30** → Potential PDF IDs: 20-40
4. **Electronic ID 36** → Potential PDF IDs: 26-46
5. **Electronic ID 42** → Potential PDF IDs: 32-52
6. **Electronic ID 43** → Potential PDF IDs: 33-53
7. **Electronic ID 46** → Potential PDF IDs: 36-56
8. **Electronic ID 56** → Potential PDF IDs: 46-66
9. **Electronic ID 72** → Potential PDF IDs: 62-82
10. **Electronic ID 82** → Potential PDF IDs: 72-92

## System Observations

### Document Processing
- The system shows many invoices with "N/A" for VS (variable symbol) and amounts
- This suggests either:
  - The OCR/parsing needs improvement
  - These are different types of documents (not standard invoices)
  - The extraction rules need to be updated

### Tagging System
- Uses a comprehensive tagging system with specific tags for electronic invoices
- The "Elektronická faktura ISDOC" tag clearly identifies electronic invoices
- Additional tags may help identify document types and suppliers

## Recommendations for Improvement

1. **Implement Automated Matching**
   - Create a script that automatically matches electronic invoices with their PDF counterparts
   - Use multiple matching criteria (invoice number, amount, date, supplier)

2. **Improve Metadata Extraction**
   - Enhance OCR and parsing for better extraction of:
     - Variable symbols
     - Invoice numbers
     - Amounts
     - Supplier information

3. **Add Relationship Tracking**
   - Implement a system to link related documents
   - Add tags or custom fields to indicate document relationships

4. **Batch Processing Improvements**
   - When importing documents, maintain relationships between different formats
   - Consider naming conventions that make matching easier

## Next Steps

To implement a comprehensive matching system:

1. Create a Python script that:
   - Loads all electronic invoices
   - Extracts key metadata from content
   - Searches for matching PDFs based on multiple criteria
   - Generates a confidence score for each match

2. Test the matching algorithm on a sample set

3. Review and refine matching criteria based on results

4. Implement as an automated process in Paperless-NGX

This analysis provides a foundation for improving the document management system and creating better connections between different formats of the same invoice.