document.addEventListener('DOMContentLoaded', () => {
    const redeemButton = document.getElementById('redeem-button');
    const reloadButton = document.getElementById('reload-button');
    const redeemForm = document.getElementById('redeem-form');
    const reloadForm = document.getElementById('reload-form');

    redeemButton.addEventListener('click', () => {
        reloadForm.style.display = 'none'; // Hide reload form if visible
        redeemForm.style.display = 'block';
        redeemForm.classList.add('fade-in');
    });

    reloadButton.addEventListener('click', () => {
        redeemForm.style.display = 'none'; // Hide redeem form if visible
        reloadForm.style.display = 'block';
        reloadForm.classList.add('fade-in');
    });
});