function main(){
    const rulesBtn = document.getElementById('rules-btn');
    const closeBtn = document.getElementById('close-btn');
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const popup = document.getElementById('popup-container');
    const playAgainBtn = document.getElementById('play-button');
    const scoreSpan = document.getElementById('scoreSpan');

    const DEFAULT_BALL_DIFF = 4;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let playerDirection;
    let score;
    let isRunning = false;
    let player;
    let ball;
    let bricks = {};
    let brick;
    let bricksArr;
    let brickLength;

    function start() {
        init();
        requestAnimationFrame(game);
        startEventsListening();
    }

    function init() {
        initGameData();
        initBricks();
    }

    function initGameData() {
        isRunning = true;
        bricksArr = [];
        playerDirection = '';
        score = 0;
        player = {
            x: 270,
            y: 380,
            width: 75,
            height: 10,
            dx: 5, 
        };
        ball = {
            x: 305,
            y: 350,
            radius: 8,
            dx: DEFAULT_BALL_DIFF,
            dy: DEFAULT_BALL_DIFF,
        };
        bricks = {
            rows: 7,
            cols: 4,
        };
        brick = {
            width: 65,
            height: 20,
            padding: 10,
            offsetX: 30,
            offsetY: 30,
            visible: true,
        };
        brickLength = bricks.rows * bricks.cols;
    }

    function initBricks() {
        for(let i = 0; i < bricks.rows; i++){
            bricksArr[i] = [];

            for(let j = 0; j < bricks.cols; j++){
                const x = i * (brick.width + brick.padding) + brick.offsetX;
                const y = j * (brick.height + brick.padding) + brick.offsetY;
                bricksArr[i][j] = {
                    x,
                    y,
                    ...brick,
                };
            }
        }
    }  

    function game(){
        update();
        render();

        if(isRunning){
            requestAnimationFrame(game);
        }
    }

    function update(){
        movePlayer();
        moveBall();
        checkLoose();
        checkWin();
    }

    function movePlayer() {
        if(playerDirection === 'left') {
            if (player.x - player.dx > 0) {
                player.x -= player.dx;
            } else {
                player.x = 0;
            }
        } else if(playerDirection === 'right') {
            if(player.x + player.width + player.dx < 600) {
                player.x += player.dx;
            } else {
                player.x = 600 - player.width;
            }
        }
    }

    function moveBall() {
        ball.x += ball.dx;
        ball.y -= ball.dy;

        if(ball.x + ball.radius >= 600 || ball.x <= ball.radius) {
            ball.dx = -ball.dx;
        }

        if(ball.y <= ball.radius) {
            ball.dy = -DEFAULT_BALL_DIFF;
         } else if (
             ball.x - ball.radius > player.x
             && ball.x <= player.x + player.width
             && ball.y + ball.radius >= player.y
         ) {
             ball.dy = DEFAULT_BALL_DIFF;

             if (ball.x < player.x + (player.width / 3)) {
                ball.dx = -DEFAULT_BALL_DIFF;
             } else if (ball.x < player.x + player.width - (player.width / 3)) {
                ball.dx = 0;
             } else {
                ball.dx = DEFAULT_BALL_DIFF;
             }
         }

        bricksArr.forEach((col) => {
            col.forEach((brick) => {
                if(brick.visible === true && checkBricksCollision(brick)) {
                    ball.dy = -ball.dy;
                    brick.visible = false;
                    brickLength--;
                    updateScore();
                }
            })
        })
    }

    function checkLoose() {
        if(ball.y >= player.y + player.height) {
            isRunning = false;
            stopEventsListening();
            showPopup('Unfortunately you lost. 😕');
        }
    }

    function checkWin() {
        if(brickLength <= 0) {
            isRunning = false;
            stopEventsListening();
            showPopup('Congratulations! You won! 😃');
        }
    }

    function showPopup(text) {
        popup.classList.add('open');
        popupTitle.innerText = text;
    }

    playAgainBtn.addEventListener('click', () => {
        popup.classList.remove('open');
        start();
    });

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        renderPlayer();
        renderBall();
        renderBricks();
    }

    function renderPlayer() {
        context.beginPath();
        context.rect(player.x, player.y, player.width, player.height);
        context.fillStyle = 'aqua';
        context.fill();
        context.closePath();
    }

    function renderBall() {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        context.fillStyle = 'aqua';
        context.fill();
        context.closePath();
    }

    function renderBricks() {
        bricksArr.forEach((col) => {
            col.forEach((brick) => {
                context.beginPath();
                context.rect(brick.x, brick.y, brick.width, brick.height);
                context.fillStyle = brick.visible ? 'aqua' : 'transparent';
                context.fill();
                context.closePath();
            })
        })
    }

    function checkBricksCollision(brick) {
        return (
            ball.x >= brick.x
            && ball.x + ball.radius <= brick.x + brick.width
            && ball.y + ball.radius >= brick.y
            && ball.y <= brick.y + brick.height
        );
    }

    function updateScore() {
        score++;
        scoreSpan.innerHTML = score;
    }

    function handleKeydown(e) {
        if(e.code === 'ArrowLeft') {
            playerDirection = 'left';
        } else if(e.code === 'ArrowRight') {
            playerDirection = 'right';
        }
    }

    function handleKeyup(e) {
        if(e.code === 'ArrowLeft') {
            playerDirection = '';
        } else if(e.code === 'ArrowRight') {
            playerDirection = '';
        }
    }

    function startEventsListening() {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup);
    }

    function stopEventsListening() {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('keyup', handleKeyup);
    }

    function handleOpenBtn(){
        isRunning = false;
        rules.classList.add('show');
    }

    function handleCloseBtn(){
        rules.classList.remove('show');
        isRunning = true;

        setTimeout(() => {
            requestAnimationFrame(game);
        }, 500)
    }

    rulesBtn.addEventListener('click', handleOpenBtn);
    closeBtn.addEventListener('click', handleCloseBtn);

    start();
}

main();
