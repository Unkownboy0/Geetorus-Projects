const profiles = [
    {
        username: "Unkownboy0",
        description: "Cybersecurity enthusiast, ethical hacker, and open-source contributor. Loves breaking and building things.",
        link: "https://github.com/Unkownboy0"
    },
    {
        username: "chandhru4370",
        description: "Backend developer, automation wizard, and network explorer. Always learning and sharing knowledge.",
        link: "https://github.com/chandhru4370"
    },
    {
        username: "Geetorus",
        description: "Team profile: Security engineers, hackers, and developers. Building a safer digital world together.",
        link: "https://github.com/Geetorus"
    }
];

// Matrix Rain Animation
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.fontSize = 18;
        this.drops = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let x = 0; x < this.columns; x++) {
            this.drops[x] = Math.random() * this.canvas.height / this.fontSize;
        }
    }
    animate() {
        this.ctx.fillStyle = 'rgba(10, 15, 24, 0.13)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = this.fontSize + "px monospace";
        this.ctx.fillStyle = "#00ff9c";
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Typing animation for card description
function typeText(element, text, speed = 22, callback) {
    let i = 0;
    element.textContent = "";
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", () => {
    // Matrix Rain
    new MatrixRain("matrix-canvas");

    // Set year
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // Render profile cards
    const section = document.getElementById("profiles-section");
    profiles.forEach((profile, idx) => {
        const card = document.createElement("div");
        card.className = "profile-card interactive-glow-box";
        card.tabIndex = 0;
        card.onclick = () => window.open(profile.link, "_blank");

        // Make the username a clickable link
        const title = document.createElement("a");
        title.className = "profile-title";
        title.textContent = profile.username;
        title.href = profile.link;
        title.target = "_blank";
        title.rel = "noopener noreferrer";
        title.onclick = (e) => { e.stopPropagation(); }; // Prevent card click when clicking the link

        const desc = document.createElement("div");
        desc.className = "profile-description";
        // Typing animation for each card description
        setTimeout(() => typeText(desc, profile.description, 18), 400 + idx * 400);

        const link = document.createElement("a");
        link.href = profile.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "profile-link";
        link.textContent = "View Profile";
        link.onclick = (e) => { e.stopPropagation(); };

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(link);
        section.appendChild(card);
    });
});