const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const song = document.getElementById('mySong');
const musicBtn = document.getElementById('musicToggle');
const heartContainer = document.getElementById('heart-container');

// --- 1. Typing Effect Logic ---
function typeWriter(element) {
    const text = element.getAttribute('data-text');
    element.innerHTML = '';
    let i = 0;
    
    // Previous interval clear karne ke liye (agar koi ho)
    if (element.typingInterval) clearInterval(element.typingInterval);
    
    element.typingInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(element.typingInterval);
        }
    }, 50); // Typing speed
}

// --- 2. Falling Hearts Logic ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-drop');
    heart.innerHTML = ['❤️', '💖', '💝', '🌸'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    heart.style.opacity = Math.random();
    heartContainer.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 400);

// --- 3. Music Toggle Logic ---
musicBtn.addEventListener('click', () => {
    if (song.paused) {
        song.play();
        musicBtn.innerHTML = '🔊';
    } else {
        song.pause();
        musicBtn.innerHTML = '🔇';
    }
});

// --- 4. Page Navigation ---
function nextPage(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.style.display = 'none');
    
    const target = document.getElementById('step' + stepNumber);
    if (target) {
        target.style.display = 'block';
        
        // Photo Animation Restart
        const img = target.querySelector('.animated-photo');
        if(img) {
            img.classList.remove('fade-in-scale');
            void img.offsetWidth;
            img.classList.add('fade-in-scale');
        }

        // Typing Effect Trigger
        const typingElement = target.querySelector('.typing');
        if (typingElement) {
            typeWriter(typingElement);
        }
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
