const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const song = document.getElementById('mySong');
const musicBtn = document.getElementById('musicToggle');

// --- Falling Hearts & Roses Logic (Fix) ---
function createFallingItem() {
    const item = document.createElement('div');
    const isHeart = Math.random() > 0.5;
    item.className = isHeart ? 'heart-drop' : 'rose-petal';
    item.innerHTML = isHeart ? ['❤️', '💖', '💝'][Math.floor(Math.random() * 3)] : ['🌹', '🌸'][Math.floor(Math.random() * 2)];
    
    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = (Math.random() * 10 + 15) + "px";
    item.style.animationDuration = (Math.random() * 3 + 3) + "s";
    
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 6000);
}
setInterval(createFallingItem, 400); // Har 0.4 sec mein girega

// --- Typing Effect ---
function typeWriter(element) {
    const text = element.getAttribute('data-text');
    element.innerHTML = '';
    let i = 0;
    if (element.typingInterval) clearInterval(element.typingInterval);
    element.typingInterval = setInterval(() => {
        if (i < text.length) { element.innerHTML += text.charAt(i); i++; }
        else { clearInterval(element.typingInterval); }
    }, 40);
}

// --- Navigation ---
function nextPage(stepNumber) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    const target = document.getElementById('step' + stepNumber);
    if (target) {
        target.style.display = 'block';
        if (stepNumber === 6) autoMagicExplosion();
        target.querySelectorAll('.typing').forEach(el => typeWriter(el));
    }
}

function autoMagicExplosion() {
    for(let i=0; i<50; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.innerHTML = ['❤️', '💖', '✨', '🌹'][Math.floor(Math.random() * 4)];
            el.style.position = 'fixed'; el.style.left = '50%'; el.style.top = '50%';
            el.style.fontSize = '2rem'; el.style.zIndex = '2000';
            el.animate([
                { transform: 'translate(0,0) scale(0)', opacity: 0 },
                { opacity: 1, offset: 0.2 },
                { transform: `translate(${(Math.random()-0.5)*600}px, ${(Math.random()-0.5)*600}px) scale(0)`, opacity: 0 }
            ], { duration: 2000 });
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 2000);
        }, i * 60);
    }
}

// --- Buttons ---
function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    noBtn.style.left = x + 'px'; noBtn.style.top = y + 'px';
}
noBtn.addEventListener('mouseover', moveButton);
yesBtn.addEventListener('click', () => { song.play(); musicBtn.innerHTML = '🔊'; nextPage(2); });
musicBtn.addEventListener('click', () => {
    if (song.paused) { song.play(); musicBtn.innerHTML = '🔊'; }
    else { song.pause(); musicBtn.innerHTML = '🔇'; }
});
