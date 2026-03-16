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

    if (!name || !company || !email || !phone || !department || !designation ||
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

    // Generate Preview HTML
    const isAdvanced = data.plan === 'Advance' || data.plan === 'Pro';

    const html = `
        <div class="preview-header">
            <div>
                <h2 style="margin:0;">Application Summary</h2>
                <div style="font-size: 0.875rem; color:#6b7280; margin-top:4px;">${new Date().toLocaleDateString()}</div>
            </div>
            <span class="preview-plan-badge">${window.escapeHtml(data.plan)} Plan</span>
        </div>
        <div class="preview-body">
            
            <div class="preview-section-title">Contact Information</div>
            <div class="preview-row">
                <div class="preview-col">
                    <div class="preview-label">Name</div>
                    <div class="preview-value">${window.escapeHtml(data.name)}</div>
                </div>
                <div class="preview-col">
                    <div class="preview-label">Company</div>
                    <div class="preview-value">${window.escapeHtml(data.company)}</div>
                </div>
            </div>
            <div class="preview-row">
                <div class="preview-col">
                    <div class="preview-label">Email</div>
                    <div class="preview-value">${window.escapeHtml(data.email)}</div>
                </div>
                <div class="preview-col">
                    <div class="preview-label">Phone</div>
                    <div class="preview-value">${window.escapeHtml(data.phone)}</div>
                </div>
            </div>
            <div class="preview-row">
                <div class="preview-col">
                    <div class="preview-label">Department</div>
                    <div class="preview-value">${window.escapeHtml(data.department)}</div>
                </div>
                <div class="preview-col">
                    <div class="preview-label">Designation</div>
                    <div class="preview-value">${window.escapeHtml(data.designation)}</div>
                </div>
            </div>

            <div style="margin-top: 2rem;"></div>

            <div class="flex-between" style="align-items: flex-start; margin-bottom:0;">
                <div style="flex:1; padding-right: 1rem;">
                    <div class="preview-section-title">Billing Address</div>
                    <div class="preview-value" style="font-size: 0.95rem; line-height: 1.5;">
                        ${window.nl2br(window.escapeHtml(data.billingAddress))}<br>
                        ${window.escapeHtml(data.billingState)} ${window.escapeHtml(data.billingZip)}<br>
                        ${window.escapeHtml(data.billingCountry)}
                    </div>
                    ${data.billingGst ? `<div class="preview-label" style="margin-top:0.5rem;">GST</div><div class="preview-value" style="font-size:0.95rem;">${window.escapeHtml(data.billingGst)}</div>` : ''}
                </div>
                <div style="flex:1;">
                    <div class="preview-section-title">Shipping Address</div>
                    <div class="preview-value" style="font-size: 0.95rem; line-height: 1.5;">
                        ${window.nl2br(window.escapeHtml(data.shippingAddress))}<br>
                        ${window.escapeHtml(data.shippingState)} ${window.escapeHtml(data.shippingZip)}<br>
                        ${window.escapeHtml(data.shippingCountry)}
                    </div>
                    ${data.shippingGst ? `<div class="preview-label" style="margin-top:0.5rem;">GST</div><div class="preview-value" style="font-size:0.95rem;">${window.escapeHtml(data.shippingGst)}</div>` : ''}
                </div>
            </div>

            ${isAdvanced ? `
            <div style="margin-top: 2rem;">
                <div class="preview-section-title">Technical Specifications</div>
                 <div class="preview-row">
                    <div class="preview-col">
                        <div class="preview-label">Wavelength</div>
                        <div class="preview-value">${window.escapeHtml(data.wavelength)}</div>
                    </div>
                     <div class="preview-col">
                        <div class="preview-label">Extrusion System</div>
                        <div class="preview-value">${window.escapeHtml(data.extrusion)}</div>
                    </div>
                </div>
            </div>
            ` : ''}

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

    const element = uiPreviewCard;

    const data = window.currentData || {};

    const opt = {
        margin: 15,
        filename: `${(data.name || 'squyd').replace(/\s+/g, '_')}_${data.plan || 'Plan'}_Application.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
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

