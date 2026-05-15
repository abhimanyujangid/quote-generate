// UI Logic (Advanced Options, Address Copy, Stage Switching)

const planRadios = document.querySelectorAll('input[name="plan"]');
const adv = document.getElementById('advancedOptions');

function toggleAdvancedOptions() {
    const selected = document.querySelector('input[name="plan"]:checked');

    // Show/Hide Advanced Section
    if (selected && (selected.value === 'Advance' || selected.value === 'Pro')) {
        adv.classList.remove('hidden');
    } else {
        adv.classList.add('hidden');
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

const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const formStatus = document.getElementById('formStatus');
const previewCard = document.getElementById('previewCard');
const downloadStatus = document.getElementById('downloadStatus');

document.getElementById('editBtn').addEventListener('click', () => {
    stage2.classList.add('hidden');
    stage1.classList.remove('hidden');
    window.scrollTo(0, 0);
});

// Expose commonly used DOM references
window.UIRefs = {
    stage1,
    stage2,
    formStatus,
    previewCard,
    downloadStatus
};

