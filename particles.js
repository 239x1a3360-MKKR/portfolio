const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// PARTICLE CLASS
class Particle {
  constructor() {
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.r = Math.random()*2 + 1;
    this.dx = Math.random()*1 - 0.5;
    this.dy = Math.random()*1 - 0.5;
    this.color = `rgba(79,195,247,${Math.random()})`;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if(this.x < 0 || this.x > w) this.dx *= -1;
    if(this.y < 0 || this.y > h) this.dy *= -1;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let particles = [];
for(let i=0;i<100;i++){
  particles.push(new Particle());
}

function animate(){
  ctx.clearRect(0,0,w,h);
  // Gradient wave background
  let gradient = ctx.createLinearGradient(0,0,w,h);
  gradient.addColorStop(0,'#0d0d0d');
  gradient.addColorStop(0.5,'#1a237e');
  gradient.addColorStop(1,'#4fc3f7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,w,h);

  particles.forEach(p=>p.update());
  requestAnimationFrame(animate);
}
animate();
