const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const song = document.getElementById('mySong');
const musicBtn = document.getElementById('musicToggle');
const heartContainer = document.getElementById('heart-container');

function typeWriter(element) {
    const text = element.getAttribute('data-text');
    element.innerHTML = '';
    let i = 0;
    if (element.typingInterval) clearInterval(element.typingInterval);
    element.typingInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else { clearInterval(element.typingInterval); }
    }, 40);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-drop');
    heart.innerHTML = ['❤️', '💖', '💝', '🌸'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 400);

function nextPage(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.style.display = 'none');
    
    const target = document.getElementById('step' + stepNumber);
    if (target) {
        target.style.display = 'flex'; // Changed to flex
        const img = target.querySelector('.animated-photo');
        if(img) {
            img.classList.remove('fade-in-scale');
            void img.offsetWidth;
            img.classList.add('fade-in-scale');
        }
        const typingElement = target.querySelector('.typing');
        if (typingElement) typeWriter(typingElement);
    }
}

yesBtn.addEventListener('click', () => {
    song.play();
    musicBtn.innerHTML = '🔊';
    nextPage(2);
});

musicBtn.addEventListener('click', () => {
    if (song.paused) { song.play(); musicBtn.innerHTML = '🔊'; }
    else { song.pause(); musicBtn.innerHTML = '🔇'; }
});

function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
}
noBtn.addEventListener('mouseover', moveButton);
    }
    window.scrollTo(0, 0);
}

// --- 5. No Button Dodge Logic ---
function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;
    const x = Math.max(10, Math.floor(Math.random() * maxX));
    const y = Math.max(10, Math.floor(Math.random() * maxY));
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

yesBtn.addEventListener('click', () => {
    song.play().catch(e => console.log("Music play error"));
    musicBtn.innerHTML = '🔊';
    nextPage(2);
});

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});
