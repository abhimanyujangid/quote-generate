## Quote Generate – Signup + PDF + Google Sheet

This project is a single-page form for collecting SQUYD signup details, generating a nicely formatted PDF, and optionally logging each submission to a Google Sheet (Excel-compatible).

### Structure

- **HTML**: `index.html` – main form, preview, and buttons.
- **Styles**: `styles.css` – layout and visual styles.
- **Scripts folder**: `scripts/`
  - `helpers.js` – shared helpers (`escapeHtml`, `nl2br`) exposed on `window`.
  - `ui.js` – plan selection, advanced options toggle, “same as billing”, stage switching, and shared DOM references on `window.UIRefs`.
  - `previewPdf.js` – collects form data into `window.currentData`, builds the preview card, and generates the PDF on “Confirm & Download PDF”.
  - `sheetsApi.js` – sends `currentData` to a Google Apps Script Web App (`SHEETS_ENDPOINT_URL`) and updates the status message.

### Running locally

1. Serve the project with any static server (so `html2pdf` and fetch work correctly), for example:

```bash
cd quote-generate-1
python -m http.server 5500
```

2. Open the app in a browser:

```text
http://127.0.0.1:5500/index.html
```

3. Fill in the form, click **Preview Application**, review, then click **Confirm & Download PDF** to download the PDF.

### Google Sheets (Excel) logging

Each time you click **Confirm & Download PDF**, the same data can be written as a new row into a Google Sheet.

1. Follow the detailed instructions in `GOOGLE_SHEETS_SETUP.md` to:
   - Create a Google Sheet with the correct columns.
   - Create and deploy an Apps Script Web App with a `doPost` handler that appends a row.
   - Copy the Web App URL that ends with `/exec`.

2. Open `scripts/sheetsApi.js` and set:

```javascript
const SHEETS_ENDPOINT_URL = 'https://script.google.com/macros/s/XXXXX/exec';
```

3. Reload the page and submit the form. After **Confirm & Download PDF**, verify that:
   - The PDF downloads successfully.
   - A new row appears in the Google Sheet with all the submitted data.

> Note: The `/dev` Apps Script URLs are for in-editor testing only. The frontend must use the deployed `/exec` URL to actually write to the sheet.
