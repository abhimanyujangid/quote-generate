// Google Sheets integration via Apps Script Web App

// Replace this with your deployed Apps Script Web App URL
const SHEETS_ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbzoeZQbwjIr7kgj_rzo_ZqNEfEIrqyaNqPdpvDXWwfedLPmc2pYga4lttisETcvN_tH/exec';
async function sendToSheet(data) {
    if (!SHEETS_ENDPOINT_URL) {
        console.warn('SHEETS_ENDPOINT_URL is not configured. Skipping sheet logging.');
        return false;
    }

    try {
        const response = await fetch(SHEETS_ENDPOINT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "no-cors",
            body: JSON.stringify(data || {})
        });

        if (!response.ok) {
            console.error('Sheet logging failed with status', response.status);
            return false;
        }

        const result = await response.json().catch(() => ({}));
        if (result && result.success) {
            return true;
        }

        console.error('Sheet logging failed with response', result);
        return false;
    } catch (err) {
        console.error('Error sending data to sheet', err);
        return false;
    }
}

async function logToSheet(currentData) {
    const status = window.UIRefs?.downloadStatus;

    const ok = await sendToSheet(currentData || {});

    if (!status) return;

    if (ok) {
        status.textContent = (status.textContent || '') + ' Data saved to sheet.';
        status.style.color = 'green';
    } else {
        // Non-blocking message – PDF already handled separately
        if (!status.textContent) {
            status.textContent = 'Could not save data to sheet.';
        } else {
            status.textContent += ' Could not save data to sheet.';
        }
        status.style.color = 'orange';
    }
}

// Expose globally
window.sendToSheet = sendToSheet;
window.logToSheet = logToSheet;

