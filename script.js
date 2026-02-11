const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const music = document.getElementById('music');
const player = document.getElementById('player');

let score = 0;

// Butona basınca her şeyi başlat
startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameArea.style.display = 'block';
    document.body.style.backgroundColor = '#e1bee7'; // Arka plan mor oldu
    music.play();
    spawnCactus(); // Kaktüsleri çıkarmaya başla
});

// Zıplama fonksiyonu
function jump() {
    if(!player.classList.contains("animate")){
        player.classList.add("animate");
        setTimeout(() => {
            player.classList.remove("animate");
        }, 500);
    }
}

// Klavye veya ekrana dokunma ile zıpla
window.addEventListener("keydown", jump);
window.addEventListener("touchstart", jump);
