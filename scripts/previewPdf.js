// Preview generation and PDF download logic

const { stage1: uiStage1, stage2: uiStage2, formStatus: uiFormStatus, previewCard: uiPreviewCard } = window.UIRefs;

// Store data globally for other scripts (e.g., Sheets integration)
window.currentData = {};

document.getElementById('previewBtn').addEventListener('click', () => {
    // Validation — all required fields
    const name = document.getElementById('name').value.trim();
    const company = document.getElementById('company').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const department = document.getElementById('department').value.trim();
    const designation = document.getElementById('designation').value.trim();
    const billingAddress = document.getElementById('billingAddress').value.trim();
    const billingCountry = document.getElementById('billingCountry').value.trim();
    const billingState = document.getElementById('billingState').value.trim();
    const billingZip = document.getElementById('billingZip').value.trim();
    const shippingAddress = document.getElementById('shippingAddress').value.trim();
    const shippingCountry = document.getElementById('shippingCountry').value.trim();
    const shippingState = document.getElementById('shippingState').value.trim();
    const shippingZip = document.getElementById('shippingZip').value.trim();

    if (!name || !company || !email || !phone ||
        !billingAddress || !billingCountry || !billingState || !billingZip ||
        !shippingAddress || !shippingCountry || !shippingState || !shippingZip) {
        uiFormStatus.textContent = 'Please fill all required fields.';
        uiFormStatus.style.color = 'red';
        return;
    }
    uiFormStatus.textContent = '';

    // Collect Data
    window.currentData = {
        plan: document.querySelector('input[name=plan]:checked').value,
        name,
        company,
        email,
        phone,
        department,
        designation,
        billingAddress,
        billingCountry,
        billingState,
        billingZip,
        billingGst: document.getElementById('billingGst').value.trim(),
        shippingAddress,
        shippingCountry,
        shippingState,
        shippingZip,
        shippingGst: document.getElementById('shippingGst').value.trim(),
        wavelength: document.querySelector('input[name=wavelength]:checked')?.value || 'N/A',
        extrusion: document.querySelector('input[name=extrusion]:checked')?.value || 'N/A'
    };

    const data = window.currentData;
    const roleParts = [data.designation, data.department].filter(Boolean);
    const roleOfficeLine = roleParts.length ? roleParts.join(', ') : '';
    const billingGstLine = data.billingGst ? `<div>${window.escapeHtml(data.billingGst)}</div>` : '';
    const shippingGstLine = data.shippingGst ? `<div>${window.escapeHtml(data.shippingGst)}</div>` : '';

    // Generate quote-style Preview HTML
    const html = `
        <div class="quote-doc">
            <div class="quote-top">
                <div class="quote-company-block">
                    <img src="image/logo.png" alt="Pharma Alley" class="quote-logo" />
                    <div class="quote-company-text">
                        <div class="quote-company-name">Anirveda Engineering PVT LTD</div>
                        <div>5-H-12,</div>
                        <div>Mahaveer Nagar</div>
                        <div>3 Kota</div>
                        <div>Rajasthan</div>
                        <div>324005 India</div>
                        <div>GSTIN 08ABBCA1079L1ZJ</div>
                        <div>finance@designingalley.com</div>
                        <div>https://designingalley.com/</div>
                    </div>
                </div>
                <div class="quote-head-right">
                    <div class="quote-title">QUOTE</div>
                    <div class="quote-number"># QT-&lt;Number&gt;</div>
                </div>
            </div>

            <div class="quote-mid">
                <div class="quote-addresses">
                    <div class="quote-address-block">
                        <div class="quote-address-title">Bill To</div>
                        <div>${window.escapeHtml(data.name)}</div>
                        ${roleOfficeLine ? `<div>${window.escapeHtml(roleOfficeLine)}</div>` : ''}
                        <div>${window.escapeHtml(data.company)}</div>
                        <div>${window.escapeHtml(`${data.billingZip} , ${data.billingState}`)}</div>
                        <div>${window.escapeHtml(`${data.billingCountry}`)}</div>
                        ${billingGstLine}
                    </div>

                    <div class="quote-address-block">
                        <div class="quote-address-title">Ship To</div>
                        <div>${window.escapeHtml(data.name)}</div>
                        ${roleOfficeLine ? `<div>${window.escapeHtml(roleOfficeLine)}</div>` : ''}
                        <div>${window.escapeHtml(data.company)}</div>
                        <div>${window.escapeHtml(`${data.shippingZip} , ${data.shippingState}`)}</div>
                        <div>${window.escapeHtml(`${data.shippingCountry}`)}</div>
                        ${shippingGstLine}
                    </div>
                </div>

                <div class="quote-dates">
                    <div>Quote Date : &lt;Date&gt;</div>
                    <div>Expiry Date : &lt;Date&gt;</div>
                </div>
            </div>

            <div class="quote-subject-title">Subject :</div>
            <div class="quote-subject-value">3D Bioprinter Squyd &lt;Model&gt;</div>

            <div class="quote-divider"></div>

            <table class="quote-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item &amp; Description</th>
                        <th>HSN/SAC</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>IGST</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>&lt;Description&gt;</td>
                        <td>998112</td>
                        <td>&lt;Number&gt;</td>
                        <td>&lt;Price&gt;</td>
                        <td>&lt;Number&gt;</td>
                        <td>&lt;Number&gt;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                        <td>998112<br>&lt;Number&gt;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <div class="quote-divider quote-divider-spaced"></div>

            <div class="quote-total-wrap">
                <div class="quote-total-line"><span>Sub Total</span></div>
                <div class="quote-total-line"><span>IGST18 (18%)</span></div>
                <div class="quote-total-row">
                    <span>Total</span>
                    <span>&lt;Number&gt;</span>
                </div>
                <div class="quote-total-words">Total In Words: &lt;Amount in Words&gt;</div>
            </div>

            <div class="quote-footer">
                <div class="quote-notes-title">Notes</div>
                <div>Looking forward for your business.</div>
                <div class="quote-signature">Authorized Signature &lt;Digital Signature Statement&gt; _____________</div>
            </div>
        </div>
    `;

    uiPreviewCard.innerHTML = html;

    // Switch Views
    uiStage1.classList.add('hidden');
    uiStage2.classList.remove('hidden');
    window.scrollTo(0, 0);
});

document.getElementById('downloadBtn').addEventListener('click', async () => {
    const status = window.UIRefs.downloadStatus;
    status.textContent = 'Generating PDF...';
    status.style.color = '';

    // Export only the quote document so preview container styles are excluded.
    const element = uiPreviewCard.querySelector('.quote-doc');
    if (!element) {
        status.textContent = 'Nothing to export. Please preview first.';
        status.style.color = 'red';
        return;
    }

    const data = window.currentData || {};

    const opt = {
        margin: [8, 8, 8, 8],
        filename: `${(data.name || 'squyd').replace(/\s+/g, '_')}_${data.plan || 'Plan'}_Application.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
    };

    try {
        await html2pdf().set(opt).from(element).save();
        status.textContent = 'PDF Downloaded successfully.';
        status.style.color = 'green';

        // Also log to Google Sheets (non-blocking)
        if (typeof window.logToSheet === 'function') {
            window.logToSheet(window.currentData);
        }
    } catch (err) {
        console.error(err);
        status.textContent = 'Error generating PDF.';
        status.style.color = 'red';
    }
});

