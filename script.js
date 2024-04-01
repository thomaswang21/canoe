// 获取游戏画布和上下文
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const endGameBtn = document.getElementById("endGameBtn");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartGameBtn = document.getElementById("restartGameBtn");
const recordBtn = document.getElementById("recordBtn");
let isRecording = false; // Track the recording state

// 设置语音识别
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;

// 语音指令触发的移动距离
const MOVE_DISTANCE = 120;

recognition.onresult = function(event) {
  let last = event.results.length - 1;
  let command = event.results[last][0].transcript.trim().toLowerCase();

  if (command.includes("left")) {
    canoe.x = Math.max(canoe.width / 2, canoe.x - MOVE_DISTANCE); // 向左移动固定距离
  } else if (command.includes("right")) {
    canoe.x = Math.min(canvas.width - canoe.width / 2, canoe.x + MOVE_DISTANCE); // 向右移动固定距离
  }
};

recognition.start();

recognition.onerror = function(event) {
  console.error('Speech recognition error:', event.error);
};
recordBtn.addEventListener("click", function() {
  if (!isRecording) {
    recognition.start();
    recordBtn.textContent = "Stop Recording";
    isRecording = true;
  } else {
    recognition.stop();
    recordBtn.textContent = "Start Recording";
    isRecording = false;
  }
});

// 游戏配置
const config = {
  canoeImgSrc: "./images/boat.png",
  rockImgSrc: "./images/rock.png",
  canoeSpeed: 5, // 船只移动速度
  rockSpeed: 3, // 岩石下落速度
  riverMargin: 200, // 河岸边距
  canoeWidthMin: 80,
  canoeWidthMax: 200,
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.getElementById("gameHeader").offsetHeight;

let canoeImg = new Image();
canoeImg.src = config.canoeImgSrc;

let rockImg = new Image();
rockImg.src = config.rockImgSrc;

let backgroundImg1 = new Image();
backgroundImg1.src = "./images/background.png";

let backgroundImg2 = new Image();
backgroundImg2.src = "./images/background.png";

let score = 0;
let backgroundY1 = 0;
let backgroundY2 = -canvas.height;

let canoe = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: Math.max(config.canoeWidthMin, Math.min(config.canoeWidthMax, canvas.width / 10)),
  color: "blue",
  speed: config.canoeSpeed,
  dx: 0,
};

let rocks = [];
let gameInterval;
let elapsedTime = 0;
let rockAdditionInterval;

// 加入的更新岩石和分数逻辑
function updateRocks() {
  rocks.forEach((rock, index) => {
    rock.y += config.rockSpeed;
    if (rock.y + rock.height > canoe.y && !rock.passed) {
      if (rock.x + rock.width / 3.5 > canoe.x - 7 * canoe.width && rock.x - rock.width / 3.5 < canoe.x + 7 * canoe.width) {
        rock.passed = true; 
        score++; // 岩石成功越过，分数加一
      }
    }
    if (collisionDetection(canoe, rock)) {
      endGame(); // 直接调用结束游戏的函数
      return; // 由于游戏已经结束，不需要进一步处理剩余的岩石
    }
   
  });
  rocks = rocks.filter((rock) => rock.y < canvas.height);
}

function drawCanoe() {
ctx.drawImage(
canoeImg,
canoe.x - canoe.width / 2,
canoe.y - (canoe.width / 2) * (canoeImg.height / canoeImg.width),
canoe.width,
canoe.width * (canoeImg.height / canoeImg.width)
);
}

function addRock() {
let size = Math.max(canvas.width, canvas.height) / 10;
let rock = {
x: Math.random() * (canvas.width - size),
y: -size,
width: size,
height: size,
passed: false // 标记该岩石是否已经被计分
};
rocks.push(rock);
}

function drawRocks() {
rocks.forEach((rock) => {
ctx.drawImage(rockImg, rock.x, rock.y, rock.width, rock.height);
});
}

function collisionDetection(canoe, rock) {
return (
canoe.x - canoe.width / 2 < rock.x + rock.width &&
canoe.x + canoe.width / 2 > rock.x &&
canoe.y - (canoe.width / 2) * (canoeImg.height / canoeImg.width) < rock.y + rock.height &&
canoe.y + (canoe.width / 2) * (canoeImg.height / canoeImg.width) > rock.y
);
}

function endGame() {
clearInterval(gameInterval);
clearInterval(rockAdditionInterval);
gameOverScreen.classList.remove("hidden");
}

endGameBtn.addEventListener("click", endGame);
restartGameBtn.addEventListener("click", resetGame);

function resetGame() {
rocks = [];
canoe.x = canvas.width / 2;
elapsedTime = 0;
score = 0;
gameOverScreen.classList.add("hidden");
clearInterval(gameInterval); // Clear existing game loop interval
clearInterval(rockAdditionInterval);
startGame();
}

function displayScore() {
ctx.font = "40px Arial";
ctx.fillStyle = "black";
ctx.fillText("Score: " + score, 500, 30);
}

function updateGame() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Background scrolling logic
backgroundY1 += config.rockSpeed;
backgroundY2 += config.rockSpeed;
if (backgroundY1 >= canvas.height) backgroundY1 = -canvas.height;
if (backgroundY2 >= canvas.height) backgroundY2 = -canvas.height;
ctx.drawImage(backgroundImg1, 0, backgroundY1, canvas.width, canvas.height);
ctx.drawImage(backgroundImg2, 0, backgroundY2, canvas.width, canvas.height);

drawCanoe();
updateRocks(); // Use updated rocks function for drawing and logic
drawRocks(); // This could be integrated into updateRocks if preferred

displayScore();
}

document.addEventListener("keydown", function(event) {
if (event.key === "ArrowLeft" || event.key === "a") {
canoe.x = Math.max(canoe.width / 2, canoe.x - MOVE_DISTANCE);
} else if (event.key === "ArrowRight" || event.key === "d") {
canoe.x = Math.min(canvas.width - canoe.width / 2, canoe.x + MOVE_DISTANCE);
}
});

function startGame() {
rocks = [];
score = 0;
elapsedTime = 0;
gameInterval = setInterval(updateGame, 1000 / 60);
rockAdditionInterval = setInterval(addRock, 2000);
}

startGame();






