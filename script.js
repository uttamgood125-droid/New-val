const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const song = document.getElementById('mySong');

function nextPage(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.style.display = 'none');
    const target = document.getElementById('step' + stepNumber);
    if (target) target.style.display = 'block';
    window.scrollTo(0, 0);
}

yesBtn.addEventListener('click', () => {
    if (song) song.play().catch(e => console.log("Music error"));
    nextPage(2);
});

function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;
    const x = Math.max(10, Math.floor(Math.random() * maxX));
    const y = Math.max(10, Math.floor(Math.random() * maxY));
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});
