const openModalBtn = document.getElementById('open-modal');
const modal = document.querySelector('sk-modal');
openModalBtn.addEventListener('click', () => {
    modal.open();
});

modal.addEventListener('cancel', (e) => {
    console.log(e.type);
});

modal.addEventListener('confirm', (e) => {
    console.log(e.type);
});
