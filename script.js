// --- 1. UI Logic (Advanced Options & Address Copy) ---
const planRadios = document.querySelectorAll('input[name="plan"]');
const adv = document.getElementById('advancedOptions');

function toggleAdvancedOptions() {
    const selected = document.querySelector('input[name="plan"]:checked');

    // 1. Show/Hide Advanced Section
    if (selected && (selected.value === 'Advance' || selected.value === 'Pro')) {
        adv.classList.remove('hidden');
    } else {
        adv.classList.add('hidden');
    }

    // 2. Hide "Both" options if Advance is selected
    const bothWavelength = document.querySelector('input[name="wavelength"][value="Both"]')?.closest('.radio-label');
    const bothExtrusion = document.querySelector('input[name="extrusion"][value="Both"]')?.closest('.radio-label');

    if (selected && selected.value === 'Advance') {
        if (bothWavelength) bothWavelength.classList.add('hidden');
        if (bothExtrusion) bothExtrusion.classList.add('hidden');
    } else {
        // Show them for Pro (or others if they were visible, though parent blocks them)
        if (bothWavelength) bothWavelength.classList.remove('hidden');
        if (bothExtrusion) bothExtrusion.classList.remove('hidden');
    }
}

planRadios.forEach(r => r.addEventListener('change', toggleAdvancedOptions));
toggleAdvancedOptions(); // Init

document.getElementById('sameAsBilling').addEventListener('change', (e) => {
    if (e.target.checked) {
        document.getElementById('shippingAddress').value = document.getElementById('billingAddress').value;
        document.getElementById('shippingCountry').value = document.getElementById('billingCountry').value;
        document.getElementById('shippingState').value = document.getElementById('billingState').value;
        document.getElementById('shippingZip').value = document.getElementById('billingZip').value;
        document.getElementById('shippingGst').value = document.getElementById('billingGst').value;
    }
});

// --- 2. Stage Switching Logic ---

const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const formStatus = document.getElementById('formStatus');
const previewCard = document.getElementById('previewCard');
let currentData = {}; // Store data for PDF generation

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

document.getElementById('editBtn').addEventListener('click', () => {
    stage2.classList.add('hidden');
    stage1.classList.remove('hidden');
    window.scrollTo(0, 0);
});

// --- 3. PDF Generation ---

document.getElementById('downloadBtn').addEventListener('click', async () => {
    const status = document.getElementById('downloadStatus');
    status.textContent = 'Generating PDF...';

    const element = document.getElementById('previewCard');

    const opt = {
        margin: 15,
        filename: `${currentData.name.replace(/\s+/g, '_') || 'squyd'}_${currentData.plan}_Application.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
        status.textContent = 'PDF Downloaded successfully.';
        status.style.color = 'green';
    } catch (err) {
        console.error(err);
        status.textContent = 'Error generating PDF.';
        status.style.color = 'red';
    }
});

// Helpers
function escapeHtml(unsafe) {
    return (unsafe || '').replace(/[&<>"]+/g, function (match) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[match];
    });
}
function nl2br(str) { return (str || '').replace(/\n/g, '<br>'); }
