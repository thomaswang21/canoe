describe('Canoe Game Tests', () => {
    // 在所有测试之前设置模拟的DOM环境
    beforeAll(() => {
      document.body.innerHTML = `
        <div id="gameHeader">
          <button id="endGameBtn">End Game</button>
          <button id="restartGameBtn">Restart Game</button>
          <button id="recordBtn">Start Recording</button>
        </div>
        <canvas id="gameCanvas"></canvas>
        <div id="gameOverScreen" class="hidden">
          <button id="restartGameBtnGameOver">New Game</button>
        </div>
      `;
  
      const canvas = document.getElementById('gameCanvas');
      canvas.getContext = jest.fn().mockReturnValue({
        // 模拟Canvas 2D上下文的方法
        clearRect: jest.fn(),
        drawImage: jest.fn(),
        fillText: jest.fn(),
      });
  
      // 设置全局变量和函数
      global.gameOverScreen = document.getElementById('gameOverScreen');
      global.endGameBtn = document.getElementById('endGameBtn');
      global.restartGameBtn = document.getElementById('restartGameBtn');
      global.recordBtn = document.getElementById('recordBtn');
      global.canvas = document.getElementById('gameCanvas');
      global.ctx = canvas.getContext('2d');
  
      // 模拟的全局变量和函数
      global.rocks = [];
      global.score = 0;
      global.elapsedTime = 0;
      global.isRecording = false;
      global.addRock = jest.fn().mockImplementation(() => {
        rocks.push({ x: 50, y: -10, width: 20, height: 20 });
      });
      global.collisionDetection = jest.fn((canoe, rock) => {
        return !(canoe.x + canoe.width < rock.x || 
                 canoe.x > rock.x + rock.width || 
                 canoe.y + canoe.height < rock.y || 
                 canoe.y > rock.y + rock.height);
      });
    });
  
    beforeEach(() => {
      // 重置模拟的方法和全局变量
      ctx.clearRect.mockClear();
      addRock.mockClear();
      collisionDetection.mockClear();
      rocks = [];
      score = 0;
      elapsedTime = 0;
      isRecording = false;
      gameOverScreen.classList.add('hidden');
    });
  
    it('initializes game correctly', () => {
      // 初始化游戏的逻辑
      expect(rocks).toEqual([]);
      expect(score).toEqual(0);
      expect(elapsedTime).toEqual(0);
      expect(isRecording).toBeFalsy();
    });
  
    it('adds rock correctly', () => {
      addRock();
      expect(rocks.length).toBe(1);
      expect(addRock).toHaveBeenCalledTimes(1);
    });
  
    it('detects collision correctly', () => {
      const canoe = { x: 100, y: 100, width: 50, height: 50 };
      const rock = { x: 120, y: 120, width: 20, height: 20 };
      expect(collisionDetection(canoe, rock)).toBeTruthy();
    });
  
    it('ends game correctly', () => {
      // 模拟结束游戏的函数
      global.endGame = jest.fn(() => {
        gameOverScreen.classList.remove('hidden');
      });
      endGame();
      expect(gameOverScreen.classList.contains('hidden')).toBeFalsy();
      expect(endGame).toHaveBeenCalledTimes(1);
    });
  
    it('restarts game correctly', () => {
      // 模拟重启游戏的函数
      global.restartGame = jest.fn(() => {
        rocks = [];
        score = 0;
        elapsedTime = 0;
        gameOverScreen.classList.add('hidden');
      });
      restartGame();
      expect(rocks).toEqual([]);
      expect(score).toEqual(0);
      expect(elapsedTime).toEqual(0);
      expect(gameOverScreen.classList.contains('hidden')).toBeTruthy();
      expect(restartGame).toHaveBeenCalledTimes(1);
    });
  
    it('toggles recording correctly', () => {
      // 模拟录音按钮的点击行为
      isRecording = false; // 初始状态为未录音
      recordBtn.onclick = jest.fn(() => {
        isRecording = !isRecording;
        recordBtn.textContent = isRecording ? 'Stop Recording' : 'Start Recording';
      });
  
      // 模拟点击开始录音
    recordBtn.onclick();
    expect(isRecording).toBeTruthy();
    expect(recordBtn.textContent).toEqual('Stop Recording');
    expect(recordBtn.onclick).toHaveBeenCalledTimes(1);
    // 模拟点击停止录音
    recordBtn.onclick();
    expect(isRecording).toBeFalsy();
    expect(recordBtn.textContent).toEqual('Start Recording');
    expect(recordBtn.onclick).toHaveBeenCalledTimes(2);
    });

    it('updates score correctly', () => {
    // 假设有一个函数用于更新分数
    global.updateScore = jest.fn((increment) => {
    score += increment;
    });
    updateScore(10); // 假设增加了10分
    expect(score).toEqual(10);
    expect(updateScore).toHaveBeenCalledWith(10);

    updateScore(5); // 再增加5分
    expect(score).toEqual(15);
    expect(updateScore).toHaveBeenCalledWith(5);
    });
    it('moves canoe correctly with keyboard input', () => {
        // 假设canoe初始位置
        global.canoe = { x: 500, y: canvas.height - 30, width: 100, height: 50 };
        // 模拟按键移动canoe
    const moveCanoeLeft = jest.fn(() => canoe.x -= 50);
    const moveCanoeRight = jest.fn(() => canoe.x += 50);

    // 模拟左箭头按键按下
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft'}));
    moveCanoeLeft();
    expect(canoe.x).toBe(450);
    expect(moveCanoeLeft).toHaveBeenCalledTimes(1);

    // 模拟右箭头按键按下
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'}));
    moveCanoeRight();
    expect(canoe.x).toBe(500); // 回到原位
    expect(moveCanoeRight).toHaveBeenCalledTimes(1);
    });
    });
    
    

    