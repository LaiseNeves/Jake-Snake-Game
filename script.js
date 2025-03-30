const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20; // Tamanho de cada quadrado no grid

let snake = [{ x: 10, y: 10 }]; // Começa com um bloco
let direction = "RIGHT";
let food = { x: 5, y: 5 };
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);

    // Desenha a cobrinha
    ctx.fillStyle = "yellow";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);
    });

    document.getElementById("score").textContent = score;
}
function move() {
    let head = { ...snake[0] };

    if (direction === "RIGHT") head.x++;
    if (direction === "LEFT") head.x--;
    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;

    // Verifica se pegou comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = { x: Math.floor(Math.random() * (canvas.width / box)), y: Math.floor(Math.random() * (canvas.height / box)) };
    } else {
        snake.pop(); // Remove a cauda
    }

    // Verifica colisão com bordas ou com o próprio corpo
    if (head.x < 0 || head.x >= canvas.width / box || head.y < 0 || head.y >= canvas.height / box || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(game);
        alert("Game Over! Sua pontuação: " + score);
        location.reload();
    }

    snake.unshift(head); // Adiciona nova cabeça
}
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";

    if (event.key === "w" && direction !== "DOWN") direction = "UP";
    if (event.key === "s" && direction !== "UP") direction = "DOWN";
    if (event.key === "a" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "d" && direction !== "LEFT") direction = "RIGHT";
});
function gameLoop() {
    move();
    draw();
}

let game = setInterval(gameLoop, 150);
