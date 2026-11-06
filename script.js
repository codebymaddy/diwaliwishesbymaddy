
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let started = false;
let fireworkInterval;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// CREATE FIREWORKS

function createFirework(x, y) {

    const colors = [45, 38, 330, 280, 190, 55];

    const hue = colors[
        Math.floor(Math.random() * colors.length)
    ];

    const count = 40;

    for (let i = 0; i < count; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;

        particles.push({
            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 100,
            hue: hue,

            size: Math.random() * 2.5 + 1
        });
    }
}

// ANIMATE FIREWORKS

function animate() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.025;

        p.vx *= 0.99;
        p.vy *= 0.99;

        p.life -= 1.1;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `hsla(${p.hue}, 100%, 70%, ${p.life / 100})`;

        ctx.shadowBlur = 18;

        ctx.shadowColor =
            `hsl(${p.hue}, 100%, 60%)`;

        ctx.fill();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    ctx.shadowBlur = 0;

    requestAnimationFrame(animate);
}

animate();

// START CELEBRATION

startBtn.addEventListener("click", () => {

    intro.style.display = "none";
    mainContent.style.display = "block";

    if (!started) {

        started = true;

        // First grand fireworks

        createFirework(
            window.innerWidth * 0.5,
            window.innerHeight * 0.3
        );

        createFirework(
            window.innerWidth * 0.25,
            window.innerHeight * 0.4
        );

        createFirework(
            window.innerWidth * 0.75,
            window.innerHeight * 0.4
        );

        // Continuous celebration

        fireworkInterval = setInterval(() => {

            const x = Math.random() * window.innerWidth;

            const y = Math.random() * window.innerHeight * 0.55;

            createFirework(x, y);

        }, 2000);
    }
});


// ===== MAGICAL CURSOR TRAIL =====

document.addEventListener("pointermove", (event) => {

    if (event.pointerType !== "mouse") return;

    const sparkle = document.createElement("span");

    sparkle.className = "cursor-sparkle";

    sparkle.textContent = ["✦", "✧", "✨", "⋆"][
        Math.floor(Math.random() * 4)
    ];

    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";

    document.body.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {
        sparkle.remove();
    });

});


// ===== FLOATING GOLDEN PARTICLES =====

const particleContainer = document.createElement("div");

particleContainer.className = "magic-particles";

document.body.appendChild(particleContainer);

for (let i = 0; i < 30; i++) {

    const particle = document.createElement("span");

    particle.className = "magic-particle";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (5 + Math.random() * 8) + "s";

    particle.style.animationDelay =
        (Math.random() * 8) + "s";

    particle.style.opacity = Math.random();

    particleContainer.appendChild(particle);
}


// ===== SURPRISE CARD INTERACTION =====

const revealBtn = document.getElementById("revealBtn");

const hiddenMessage = document.getElementById("hiddenMessage");

revealBtn.addEventListener("click", () => {

    hiddenMessage.style.display = "block";

    revealBtn.textContent = "Surprise Opened! 💗";

    revealBtn.disabled = true;

});

/* ===== GRAND FINALE INTERACTION ===== */

const finaleBtn = document.getElementById("finaleBtn");
const finaleScreen = document.getElementById("finaleScreen");
const closeFinale = document.getElementById("closeFinale");

finaleBtn.addEventListener("click", () => {

    finaleScreen.classList.add("active");

    // Grand fireworks burst
    createFirework(
        window.innerWidth * 0.5,
        window.innerHeight * 0.25
    );

    createFirework(
        window.innerWidth * 0.2,
        window.innerHeight * 0.35
    );

    createFirework(
        window.innerWidth * 0.8,
        window.innerHeight * 0.35
    );

    createFirework(
        window.innerWidth * 0.35,
        window.innerHeight * 0.2
    );

    createFirework(
        window.innerWidth * 0.65,
        window.innerHeight * 0.2
    );

});

closeFinale.addEventListener("click", () => {

    finaleScreen.classList.remove("active");

});
