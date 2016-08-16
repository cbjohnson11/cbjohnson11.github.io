$(document).ready(function() {
	
	$('#startButton').click(function(){

		var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var time = 0;
        var move_time = 0;
        var keyhasbeenreleased = true;
        var direction = "right"
        var snakepieces = 3;
        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;
        var addon = false;

        var object = {
            height: canvas.height/14,
            width: canvas.width/14,
            movex: canvas.width/14,
            movey: canvas.height/14,
        };

        var food = {
            height: object.height,
            width: object.width,
            x: canvas.width/2,
            y: canvas.height/2,
        };

        var snakexarray = [object.width*2,object.width,0];
        var snakeyarray = [0, 0, 0];
        var historicxarray = [object.width*2,object.width,0];
        var historicyarray = [0, 0, 0];
    
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        function keyDownHandler(e) {
            if(e.keyCode == 39) {
                rightPressed = true;
            };
            if(e.keyCode == 37) {
                leftPressed = true;
            };
            if(e.keyCode == 38) {
                upPressed = true;
            };
            if(e.keyCode == 40) {
                downPressed = true;
            }};
        function keyUpHandler(e) {
            if(e.keyCode == 39) {
                rightPressed = false;
                keyhasbeenreleased = true;
            };
            if(e.keyCode == 37) {
                leftPressed = false;
                keyhasbeenreleased = true;
            };
            if(e.keyCode == 38) {
                upPressed = false;
                keyhasbeenreleased = true;
            };
            if(e.keyCode == 40) {
                downPressed = false;
                keyhasbeenreleased = true;
            }};

        function timer() {
            time = time + 10;
            move_time = move_time + 10;
        };

        function updateDirection() {
            if (keyhasbeenreleased == true) {
                if (upPressed == true) {
                    if (direction != "down") {
                        direction = "up";
                    };
                    keyhasbeenreleased = false;
                };
                if (downPressed == true) {
                    if (direction != "up") {
                        direction = "down";
                    };
                    keyhasbeenreleased = false;
                };
                if (rightPressed == true) {
                    if (direction != "left") {
                        direction = "right";
                    };
                    keyhasbeenreleased = false;
                };
                if (leftPressed == true) {
                    if (direction != "right") {
                        direction = "left";
                    };
                    keyhasbeenreleased = false;
                };
            };
        };

        function updateSnake() {
            if (move_time >= 150) {
                move_time = 0;
                if (direction == "up") {
                    snakexarray[0] = snakexarray[0]
                    snakeyarray[0] = snakeyarray[0] - object.movey; 
                };
                if (direction == "down") {
                    snakexarray[0] = snakexarray[0]
                    snakeyarray[0] = snakeyarray[0] + object.movey;
                };
                if (direction == "left") {
                    snakexarray[0] = snakexarray[0] - object.movex;
                    snakeyarray[0] = snakeyarray[0]
                };
                if (direction == "right") {
                    snakexarray[0] = snakexarray[0] + object.movex;
                    snakeyarray[0] = snakeyarray[0]
                };
                for (i = 1; i < snakepieces; i++) {
                    snakexarray[i] = historicxarray[i-1];
                    snakeyarray[i] = historicyarray[i-1];
                    if (addon == true && i == snakepieces - 1) {
                        snakexarray.push(historicxarray[i]);
                        snakeyarray.push(historicyarray[i]);
                        addon = false;
                        historicxarray.push(0);
                        historicyarray.push(0);
                    };
                };
                for (i = 0; i < snakepieces; i++) {
                historicxarray[i] = snakexarray[i];
                historicyarray[i] = snakeyarray[i];
                };
            };
        };

        function updateFood() {
            if ((Math.round(snakexarray[0]) == Math.round(food.x)) && (Math.round(snakeyarray[0]) == Math.round(food.y))) {
                addon = true;
                snakepieces = snakepieces + 1;
                food.x = (Math.floor(Math.random() * (13 - 0 + 1)) + 0)*object.width;
                food.y = (Math.floor(Math.random() * (13 - 0 + 1)) + 0)*object.height;
            };
            
        };

        function loseCondition() {
            for (i = 1; i < snakepieces; i++) {
                if (Math.round(snakexarray[0]) == Math.round(snakexarray[i]) && Math.round(snakeyarray[0]) == Math.round(snakeyarray[i])) {
                    clearInterval(interval);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    alert("You lose");
                };
            };
        };

        function renderSnake_and_Food() {
            for (i = 0; i < snakepieces; i++) {
                ctx.beginPath();
                ctx.rect(snakexarray[i],snakeyarray[i],object.width,object.height);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            };
            ctx.beginPath();
            ctx.rect(food.x,food.y,food.width,food.height);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        };

        function checkBounds() {
            if ((Math.round(snakexarray[0]) < 0) || (Math.round(snakexarray[0]) >= canvas.width)) {
                clearInterval(interval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                alert("You lose");
            };
            if ((Math.round(snakeyarray[0]) < 0) || (Math.round(snakeyarray[0]) >= canvas.height)) {
                clearInterval(interval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                alert("You lose");
            };
        };

        function gameLoop () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateDirection();  //see if snake direction should change
            updateSnake();  //use move_time to update snake position 
            updateFood();  //update food and also evaluate snake eat condition
            renderSnake_and_Food();
            loseCondition();  //see if snake touches itself
            checkBounds();  //lose condition if snake head goes beyond wall
            timer();
        };
        var interval = setInterval(gameLoop,10);






    });

});
