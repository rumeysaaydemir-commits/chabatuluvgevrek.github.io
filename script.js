const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const player = document.getElementById('player');
const music = document.getElementById('music');

let score = 0;
let isJumping = false;
let gameActive = false;

// Senin hazırladığın şarkı listesi
const playlist = [
    "pink.music", "love.bf.music", "joji.glimps.music", 
    "joji.gimme.music", "cry.music", "cant.take.music"
];
let currentTrack = 0;

startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameArea.style.display = 'block';
    document.body.style.backgroundColor = '#e1bee7'; // Pastel mor arka plan
    
    gameActive = true;
    playMusic();
    
    // Karakter önce giriş haliyle görünür, 1 saniye sonra yürümeye başlar
    setTimeout(() => {
        startSpawning();
        animatePlayer();
    }, 1000);
});

function playMusic() {
    music.src = playlist[currentTrack];
    music.play().catch(e => console.log("Müzik çalma hatası:", e));
    music.onended = () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        playMusic();
    };
}

// Yürüme ve Koşma değişimi
function animatePlayer() {
    setInterval(() => {
        if (gameActive && !isJumping) {
            // yuru.png ve erkek.kos.png arasında sürekli geçiş yapar
            player.src = player.src.includes("yuru.png") ? "erkek.kos.png" : "yuru.png";
        }
    }, 250);
}

// Zıplama Mantığı
function jump() {
    if (isJumping || !gameActive) return;
    isJumping = true;
    player.src = "erkek.kos.png"; // Zıplarken koşma görseli
    
    let pos = 50;
    let up = setInterval(() => {
        if (pos >= 200) {
            clearInterval(up);
            let down = setInterval(() => {
                if (pos <= 50) {
                    clearInterval(down);
                    isJumping = false;
                }
                pos -= 5;
                player.style.bottom = pos + "px";
            }, 20);
        }
        pos += 5;
        player.style.bottom = pos + "px";
    }, 20);
}

function startSpawning() {
    if (!gameActive) return;
    let time = Math.random() * (2500 - 1200) + 1200;
    
    setTimeout(() => {
        if (score < 100) {
            spawnObject();
            startSpawning();
        } else {
            finishGame();
        }
    }, time);
}

function spawnObject() {
    const type = Math.random() > 0.4 ? "kaktüs.png" : "kalp.png";
    const obj = document.createElement("img");
    obj.src = type;
    obj.style.position = "absolute";
    obj.style.right = "-100px";
    obj.style.bottom = "50px";
    obj.style.width = "50px";
    gameArea.appendChild(obj);

    let move = setInterval(() => {
        if (!gameActive) { clearInterval(move); obj.remove(); return; }
        
        let r = parseInt(obj.style.right);
        obj.style.right = (r + 6) + "px";

        let pRect = player.getBoundingClientRect();
        let oRect = obj.getBoundingClientRect();

        if (pRect.left < oRect.right && pRect.right > oRect.left &&
            pRect.top < oRect.bottom && pRect.bottom > oRect.top) {
            
            if (type === "kaktüs.png") {
                gameActive = false;
                alert("Baştan başlıyoruz...");
                location.reload();
            } else {
                score++;
                scoreElement.innerText = score.toString().padStart(3, '0');
                obj.style.opacity = "0"; // Kalp solarak yok olur
                clearInterval(move);
                setTimeout(() => obj.remove(), 200);
            }
        }
        if (r > window.innerWidth) { clearInterval(move); obj.remove(); }
    }, 20);
}

function finishGame() {
    gameActive = false;
    player.src = "karsilasma.png";
    setTimeout(() => {
        gameArea.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
                <img src="kiz.png.bekle" style="width:80px; margin-bottom:10px;">
                <img src="kiss.png" style="width:150px;">
                <h1 style="color:white; font-family:sans-serif; margin-top:20px;">Seni Seviyorum!</h1>
            </div>
        `;
    }, 1500);
}

window.addEventListener("keydown", (e) => { if(e.code === "Space") jump(); });
window.addEventListener("touchstart", jump);
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const player = document.getElementById('player');
const music = document.getElementById('music');

let score = 0;
let isJumping = false;
let gameActive = false;

// Senin hazırladığın şarkı listesi
const playlist = [
    "pink.music", "love.bf.music", "joji.glimps.music", 
    "joji.gimme.music", "cry.music", "cant.take.music"
];
let currentTrack = 0;

startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameArea.style.display = 'block';
    document.body.style.backgroundColor = '#e1bee7'; // Pastel mor arka plan
    
    gameActive = true;
    playMusic();
    
    // Karakter önce giriş haliyle görünür, 1 saniye sonra yürümeye başlar
    setTimeout(() => {
        startSpawning();
        animatePlayer();
    }, 1000);
});

function playMusic() {
    music.src = playlist[currentTrack];
    music.play().catch(e => console.log("Müzik çalma hatası:", e));
    music.onended = () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        playMusic();
    };
}

// Yürüme ve Koşma değişimi
function animatePlayer() {
    setInterval(() => {
        if (gameActive && !isJumping) {
            // yuru.png ve erkek.kos.png arasında sürekli geçiş yapar
            player.src = player.src.includes("yuru.png") ? "erkek.kos.png" : "yuru.png";
        }
    }, 250);
}

// Zıplama Mantığı
function jump() {
    if (isJumping || !gameActive) return;
    isJumping = true;
    player.src = "erkek.kos.png"; // Zıplarken koşma görseli
    
    let pos = 50;
    let up = setInterval(() => {
        if (pos >= 200) {
            clearInterval(up);
            let down = setInterval(() => {
                if (pos <= 50) {
                    clearInterval(down);
                    isJumping = false;
                }
                pos -= 5;
                player.style.bottom = pos + "px";
            }, 20);
        }
        pos += 5;
        player.style.bottom = pos + "px";
    }, 20);
}

function startSpawning() {
    if (!gameActive) return;
    let time = Math.random() * (2500 - 1200) + 1200;
    
    setTimeout(() => {
        if (score < 100) {
            spawnObject();
            startSpawning();
        } else {
            finishGame();
        }
    }, time);
}

function spawnObject() {
    const type = Math.random() > 0.4 ? "kaktüs.png" : "kalp.png";
    const obj = document.createElement("img");
    obj.src = type;
    obj.style.position = "absolute";
    obj.style.right = "-100px";
    obj.style.bottom = "50px";
    obj.style.width = "50px";
    gameArea.appendChild(obj);

    let move = setInterval(() => {
        if (!gameActive) { clearInterval(move); obj.remove(); return; }
        
        let r = parseInt(obj.style.right);
        obj.style.right = (r + 6) + "px";

        let pRect = player.getBoundingClientRect();
        let oRect = obj.getBoundingClientRect();

        if (pRect.left < oRect.right && pRect.right > oRect.left &&
            pRect.top < oRect.bottom && pRect.bottom > oRect.top) {
            
            if (type === "kaktüs.png") {
                gameActive = false;
                alert("Baştan başlıyoruz...");
                location.reload();
            } else {
                score++;
                scoreElement.innerText = score.toString().padStart(3, '0');
                obj.style.opacity = "0"; // Kalp solarak yok olur
                clearInterval(move);
                setTimeout(() => obj.remove(), 200);
            }
        }
        if (r > window.innerWidth) { clearInterval(move); obj.remove(); }
    }, 20);
}

function finishGame() {
    gameActive = false;
    player.src = "karsilasma.png";
    setTimeout(() => {
        gameArea.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
                <img src="kiz.png.bekle" style="width:80px; margin-bottom:10px;">
                <img src="kiss.png" style="width:150px;">
                <h1 style="color:white; font-family:sans-serif; margin-top:20px;">Seni Seviyorum!</h1>
            </div>
        `;
    }, 1500);
}

window.addEventListener("keydown", (e) => { if(e.code === "Space") jump(); });
window.addEventListener("touchstart", jump);
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const player = document.getElementById('player');
const music = document.getElementById('music');

let score = 0;
let isJumping = false;
let gameActive = false;

// Senin hazırladığın şarkı listesi
const playlist = [
    "pink.music", "love.bf.music", "joji.glimps.music", 
    "joji.gimme.music", "cry.music", "cant.take.music"
];
let currentTrack = 0;

startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameArea.style.display = 'block';
    document.body.style.backgroundColor = '#e1bee7'; // Pastel mor arka plan
    
    gameActive = true;
    playMusic();
    
    // Karakter önce giriş haliyle görünür, 1 saniye sonra yürümeye başlar
    setTimeout(() => {
        startSpawning();
        animatePlayer();
    }, 1000);
});

function playMusic() {
    music.src = playlist[currentTrack];
    music.play().catch(e => console.log("Müzik çalma hatası:", e));
    music.onended = () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        playMusic();
    };
}

// Yürüme ve Koşma değişimi
function animatePlayer() {
    setInterval(() => {
        if (gameActive && !isJumping) {
            // yuru.png ve erkek.kos.png arasında sürekli geçiş yapar
            player.src = player.src.includes("yuru.png") ? "erkek.kos.png" : "yuru.png";
        }
    }, 250);
}

// Zıplama Mantığı
function jump() {
    if (isJumping || !gameActive) return;
    isJumping = true;
    player.src = "erkek.kos.png"; // Zıplarken koşma görseli
    
    let pos = 50;
    let up = setInterval(() => {
        if (pos >= 200) {
            clearInterval(up);
            let down = setInterval(() => {
                if (pos <= 50) {
                    clearInterval(down);
                    isJumping = false;
                }
                pos -= 5;
                player.style.bottom = pos + "px";
            }, 20);
        }
        pos += 5;
        player.style.bottom = pos + "px";
    }, 20);
}

function startSpawning() {
    if (!gameActive) return;
    let time = Math.random() * (2500 - 1200) + 1200;
    
    setTimeout(() => {
        if (score < 100) {
            spawnObject();
            startSpawning();
        } else {
            finishGame();
        }
    }, time);
}

function spawnObject() {
    const type = Math.random() > 0.4 ? "kaktüs.png" : "kalp.png";
    const obj = document.createElement("img");
    obj.src = type;
    obj.style.position = "absolute";
    obj.style.right = "-100px";
    obj.style.bottom = "50px";
    obj.style.width = "50px";
    gameArea.appendChild(obj);

    let move = setInterval(() => {
        if (!gameActive) { clearInterval(move); obj.remove(); return; }
        
        let r = parseInt(obj.style.right);
        obj.style.right = (r + 6) + "px";

        let pRect = player.getBoundingClientRect();
        let oRect = obj.getBoundingClientRect();

        if (pRect.left < oRect.right && pRect.right > oRect.left &&
            pRect.top < oRect.bottom && pRect.bottom > oRect.top) {
            
            if (type === "kaktüs.png") {
                gameActive = false;
                alert("Baştan başlıyoruz...");
                location.reload();
            } else {
                score++;
                scoreElement.innerText = score.toString().padStart(3, '0');
                obj.style.opacity = "0"; // Kalp solarak yok olur
                clearInterval(move);
                setTimeout(() => obj.remove(), 200);
            }
        }
        if (r > window.innerWidth) { clearInterval(move); obj.remove(); }
    }, 20);
}

function finishGame() {
    gameActive = false;
    player.src = "karsilasma.png";
    setTimeout(() => {
        gameArea.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
                <img src="kiz.png.bekle" style="width:80px; margin-bottom:10px;">
                <img src="kiss.png" style="width:150px;">
                <h1 style="color:white; font-family:sans-serif; margin-top:20px;">Seni Seviyorum!</h1>
            </div>
        `;
    }, 1500);
}

window.addEventListener("keydown", (e) => { if(e.code === "Space") jump(); });
window.addEventListener("touchstart", jump);
