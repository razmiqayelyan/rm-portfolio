// Typewriter Effect
const text = "Razmik Mikayelyan";
let i = 0;
const speed = 90;
const typewriter = document.getElementById("typewriter");

function typeEffect() {
  if (i < text.length) {
    typewriter.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, speed);
  }
}
document.addEventListener("DOMContentLoaded", typeEffect);

// Starry Background
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: Math.random() * 1.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.4,
  dy: (Math.random() - 0.5) * 0.4
}));

function animateStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";

  stars.forEach(star => {
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > width) star.dx *= -1;
    if (star.y < 0 || star.y > height) star.dy *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}
animateStars();

// Scroll Fade-Ins
const fadeSections = document.querySelectorAll(".scroll-fade");
const fadeInOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

fadeSections.forEach(section => {
  fadeInOnScroll.observe(section);
});

// 🔒 Resume Copy Protection
const resumeCard = document.getElementById("resumeCard");

// Block right-click
resumeCard.addEventListener("contextmenu", e => e.preventDefault());

// Block Ctrl+C or Cmd+C
document.addEventListener("keydown", e => {
  const isMac = navigator.platform.toUpperCase().includes("MAC");
  const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
  if (ctrlKey && e.key.toLowerCase() === "c") {
    if (document.activeElement.closest("#resumeCard")) {
      e.preventDefault();
    }
  }
});

// Block drag text
resumeCard.addEventListener("dragstart", e => e.preventDefault());
