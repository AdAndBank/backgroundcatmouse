const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bats = [];
let cat = { x: canvas.width / 2, y: canvas.height / 2, size: 40, speed: 2 };

function drawCat() {
  ctx.beginPath();
  ctx.arc(cat.x, cat.y, cat.size, 0, Math.PI * 2);
  ctx.fillStyle = '#FFA500';
  ctx.fill();
  ctx.closePath();

  // Уши
  ctx.beginPath();
  ctx.moveTo(cat.x - cat.size, cat.y - cat.size / 2);
  ctx.lineTo(cat.x - cat.size / 2, cat.y - cat.size * 1.5);
  ctx.lineTo(cat.x, cat.y - cat.size / 2);
  ctx.fillStyle = '#FFA500';
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(cat.x + cat.size, cat.y - cat.size / 2);
  ctx.lineTo(cat.x + cat.size / 2, cat.y - cat.size * 1.5);
  ctx.lineTo(cat.x, cat.y - cat.size / 2);
  ctx.fillStyle = '#FFA500';
  ctx.fill();
  ctx.closePath();
}

function drawBat(bat) {
  ctx.beginPath();
  ctx.ellipse(bat.x, bat.y, 20, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();

  // Крылья
  ctx.beginPath();
  ctx.moveTo(bat.x - 20, bat.y);
  ctx.quadraticCurveTo(bat.x - 30, bat.y - 20, bat.x - 40, bat.y);
  ctx.moveTo(bat.x + 20, bat.y);
  ctx.quadraticCurveTo(bat.x + 30, bat.y - 20, bat.x + 40, bat.y);
  ctx.fill();
  ctx.closePath();
}

function createBat() {
  bats.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 2 + 1,
  });
}

function moveCat() {
  if (bats.length === 0) return; // Если нет летучих мышей, кот не двигается

  // Найдем ближайшую летучую мышь
  let closestBat = bats.reduce((closest, bat) => {
    const dist = Math.sqrt(Math.pow(cat.x - bat.x, 2) + Math.pow(cat.y - bat.y, 2));
    if (!closest || dist < closest.distance) {
      return { bat, distance: dist };
    }
    return closest;
  }, null);

  if (closestBat) {
    // Двигаемся к ближайшей летучей мыши
    const bat = closestBat.bat;
    const angle = Math.atan2(bat.y - cat.y, bat.x - cat.x);

    // Обновляем координаты кота
    cat.x += Math.cos(angle) * cat.speed;
    cat.y += Math.sin(angle) * cat.speed;

    // Проверяем, съел ли кот летучую мышь
    if (Math.abs(cat.x - bat.x) < 20 && Math.abs(cat.y - bat.y) < 20) {
      bats = bats.filter(b => b !== bat); // Удаляем съеденную летучую мышь
    }
  }
}

function updateBats() {
  bats.forEach((bat, index) => {
    bat.x -= bat.speed;
    if (bat.x < 0) {
      bats.splice(index, 1);
    }
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCat();
  bats.forEach(drawBat);
  moveCat();
  updateBats();

  requestAnimationFrame(animate);
}

setInterval(createBat, 500); // Создаем летучую мышь каждые 500 мс

animate();
