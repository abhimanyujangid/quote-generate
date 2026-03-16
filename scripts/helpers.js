// Shared helper functions

function escapeHtml(unsafe) {
    return (unsafe || '').replace(/[&<>"]+/g, function (match) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[match];
    });
}

function nl2br(str) {
    return (str || '').replace(/\n/g, '<br>');
}

// Expose on window for other scripts
window.escapeHtml = escapeHtml;
window.nl2br = nl2br;

