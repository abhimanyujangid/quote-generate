### Google Sheets / Apps Script setup

Follow these steps to store each \"Confirm & Download PDF\" submission as a new row in a Google Sheet.

1. **Create a Google Sheet**
   - Go to Google Sheets and create a new spreadsheet.
   - In the first row, add headers for each field you want to store, for example:
     - A: `Timestamp`
     - B: `Plan`
     - C: `Name`
     - D: `Company`
     - E: `Email`
     - F: `Phone`
     - G: `Department`
     - H: `Designation`
     - I: `BillingAddress`
     - J: `BillingCountry`
     - K: `BillingState`
     - L: `BillingZip`
     - M: `BillingGst`
     - N: `ShippingAddress`
     - O: `ShippingCountry`
     - P: `ShippingState`
     - Q: `ShippingZip`
     - R: `ShippingGst`
     - S: `Wavelength`
     - T: `Extrusion`

2. **Open Apps Script**
   - In the Google Sheet, click **Extensions → Apps Script**.
   - Delete any default code and paste the script below.

```javascript
function doPost(e) {
  // Allow CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const body = JSON.parse(e.postData.contents || '{}');

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const row = [
      new Date(),                      // Timestamp
      body.plan || '',
      body.name || '',
      body.company || '',
      body.email || '',
      body.phone || '',
      body.department || '',
      body.designation || '',
      body.billingAddress || '',
      body.billingCountry || '',
      body.billingState || '',
      body.billingZip || '',
      body.billingGst || '',
      body.shippingAddress || '',
      body.shippingCountry || '',
      body.shippingState || '',
      body.shippingZip || '',
      body.shippingGst || '',
      body.wavelength || '',
      body.extrusion || ''
    ];

    sheet.appendRow(row);

    const result = JSON.stringify({ success: true });
    return ContentService
      .createTextOutput(result)
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  } catch (err) {
    const result = JSON.stringify({ success: false, error: err.toString() });
    return ContentService
      .createTextOutput(result)
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}
```

3. **Deploy as Web App**
   - In Apps Script, click **Deploy → New deployment**.
   - Choose **Web app**.
   - Set:
     - **Execute as**: *Me (your account)*.
     - **Who has access**: *Anyone* or *Anyone with the link*.
   - Click **Deploy**, then copy the Web App URL.

4. **Configure the frontend**
   - Open `scripts/sheetsApi.js`.
   - Replace the placeholder value of `SHEETS_ENDPOINT_URL` with your Web App URL, for example:

```javascript
const SHEETS_ENDPOINT_URL = 'https://script.google.com/macros/s/XXXXX/exec';
```

5. **Test the flow**
   - Open your form page.
   - Fill in the form, click **Preview Application**, then **Confirm & Download PDF**.
   - The PDF should download as before.
   - In your Google Sheet, you should see a new row added with all the submitted data.

