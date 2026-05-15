// Legacy entry file. Logic has been moved into scripts/helpers.js, scripts/ui.js, scripts/previewPdf.js, and scripts/sheetsApi.js.

// Keeping data object here for backward compatibility if this file is still referenced.
let currentData = {}; // Store data for PDF generation

// --- 2. Stage Switching Logic & Preview (kept temporarily for compatibility) ---

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
        formStatus.textContent = 'Please fill all required fields.';
        formStatus.style.color = 'red';
        return;
    }
    formStatus.textContent = '';

    // Collect Data
    currentData = {
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

    // Generate Preview HTML
    const isAdvanced = currentData.plan === 'Advance' || currentData.plan === 'Pro';

    const html = `
        <div class="preview-header">
            <div>
                <h2 style="margin:0;">Application Summary</h2>
                <div style="font-size: 0.875rem; color:#6b7280; margin-top:4px;">${new Date().toLocaleDateString()}</div>
            </div>
            <span class="preview-plan-badge">${escapeHtml(currentData.plan)} Plan</span>
        </div>
        <div class="preview-body">
            
            <div class="preview-section-title">Contact Information</div>
            <div class="preview-row">
                <div class="preview-col">
                    <div class="preview-label">Name</div>
                    <div class="preview-value">${escapeHtml(currentData.name)}</div>
                </div>
                <div class="preview-col">
                    <div class="preview-label">Company</div>
                    <div class="preview-value">${escapeHtml(currentData.company)}</div>
                </div>
            </div>
            <div class="preview-row">
                <div class="preview-col">
                    <div class="preview-label">Email</div>
                    <div class="preview-value">${escapeHtml(currentData.email)}</div>
                </div>
                <div class="preview-col">
                    <div class="preview-label">Phone</div>
                    <div class="preview-value">${escapeHtml(currentData.phone)}</div>
                </div>
            </div>
            <div class="preview-row">
                <div class="preview-col">
                    <div class="preview-label">Department</div>
                    <div class="preview-value">${escapeHtml(currentData.department)}</div>
                </div>
                <div class="preview-col">
                    <div class="preview-label">Designation</div>
                    <div class="preview-value">${escapeHtml(currentData.designation)}</div>
                </div>
            </div>

            <div style="margin-top: 2rem;"></div>

            <div class="flex-between" style="align-items: flex-start; margin-bottom:0;">
                <div style="flex:1; padding-right: 1rem;">
                    <div class="preview-section-title">Billing Address</div>
                    <div class="preview-value" style="font-size: 0.95rem; line-height: 1.5;">
                        ${nl2br(escapeHtml(currentData.billingAddress))}<br>
                        ${escapeHtml(currentData.billingState)} ${escapeHtml(currentData.billingZip)}<br>
                        ${escapeHtml(currentData.billingCountry)}
                    </div>
                    ${currentData.billingGst ? `<div class="preview-label" style="margin-top:0.5rem;">GST</div><div class="preview-value" style="font-size:0.95rem;">${escapeHtml(currentData.billingGst)}</div>` : ''}
                </div>
                <div style="flex:1;">
                    <div class="preview-section-title">Shipping Address</div>
                    <div class="preview-value" style="font-size: 0.95rem; line-height: 1.5;">
                        ${nl2br(escapeHtml(currentData.shippingAddress))}<br>
                        ${escapeHtml(currentData.shippingState)} ${escapeHtml(currentData.shippingZip)}<br>
                        ${escapeHtml(currentData.shippingCountry)}
                    </div>
                    ${currentData.shippingGst ? `<div class="preview-label" style="margin-top:0.5rem;">GST</div><div class="preview-value" style="font-size:0.95rem;">${escapeHtml(currentData.shippingGst)}</div>` : ''}
                </div>
            </div>

            ${isAdvanced ? `
            <div style="margin-top: 2rem;">
                <div class="preview-section-title">Technical Specifications</div>
                 <div class="preview-row">
                    <div class="preview-col">
                        <div class="preview-label">Wavelength</div>
                        <div class="preview-value">${escapeHtml(currentData.wavelength)}</div>
                    </div>
                     <div class="preview-col">
                        <div class="preview-label">Extrusion System</div>
                        <div class="preview-value">${escapeHtml(currentData.extrusion)}</div>
                    </div>
                </div>
            </div>
            ` : ''}

        </div>
    `;

    previewCard.innerHTML = html;

    // Switch Views
    stage1.classList.add('hidden');
    stage2.classList.remove('hidden');
    window.scrollTo(0, 0);
});

