window.onload = function(){

    var canvas = document.getElementById("canvas"); //acess the canvas
    var context = canvas.getContext("2d");       //access the context of the canvas to draw
    var time = document.getElementById('time');  //access the block of time is over
    var yes = document.getElementById('yes');    //acess the yes button
    var close = document.getElementById('close'); //acess cloes button
    var counter = document.getElementById('counter'); //access the counter
    var tryAgain = document.getElementById('tryagain'); //acess the tryagain button
    var gameOver = document.getElementById('gameover'); //access the block of game over
    var bear = document.getElementById("bear");        //access to the bear
    var carot = document.getElementById("carot");       //access the carot
    var knife = document.getElementById('knife');     //access the knife
    var start =document.getElementById('start');      //access the start button
    var newGame = document.getElementById('new');  //access the start the game button
    let right = document.getElementById('right');  //access the right button in the page
    let left = document.getElementById('left');    //access the left button in the page
    let up = document.getElementById('up');        //access the up button in the page
    let down = document.getElementById('down');    //access the down button in the page
    //initial position of the bear
    var x = 250;
    var y = 200;

    var t = Date.now(); //calculate the initial time once the window is loaded

    //speed of the bear
    var speed = 500;

    var dir = 0;
    var score = 0;

    //random positions for carots
    var coinX = Math.random() * (600-50);
    var coinY = Math.random() * (500-50);
    

    //x-position of the knife which is constant and y-position (b) which is varaiable
    var a = 50;
    var b = Math.random() * (500-50);

    //y-coordinate for two knives which ara variables 
    var c = Math.random() * (500-50);
    var d = Math.random() * (500-50);

    //speed of the knife
    var s = 100;

    var ys = false;  // initial state of the yes button
    var clse = false;   //initial state of the close button

    var count = 0;   //initial state of the counter

    var interval;   //initial state of the interval variable which holds the setInterval function

    //initial state of the keyboard controlers 
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    var gameloop; //the variable to hold the requestAnimationFrame function
   
   
    //function exceutes when the tryagain button is clicked
    tryAgain.addEventListener('click',function(){         
        gameOver.animate([
            {
              top: '40%'
            },
            {
              top: '-200px'
            }],
            {
              duration: 1000
            });
            gameOver.style.top = '-200px';
        x = 250;
        y = 200;
        score = 0;
        count = 0;
        clearInterval(interval);
        interval = setInterval(increment,1000);
        cancelAnimationFrame(gameloop);
        gameloop = window.requestAnimationFrame(gameLoop);
    })


  
    //function excutes when the yes button is clicked
    yes.onclick = function(){
        ys = true;
        time.animate([
            {
              top: '50%'
            },
            {
              top: '-200px'
            }],
            {
              duration: 1000
            });
            time.style.top = '-200px';
           
    }

    //function excutes when the close button is clicked
    close.onclick = function(){
        clse = true;
        time.animate([
            {
              top: '50%'
            },
            {
              top: '-200px'
            }],
            {
              duration: 1000
            });
            time.style.top = '-200px';
    };
    
    
    //this function is to increment the counter and to check if the count is 60 to stop the increment
    //and to offer the (yes-close) block
    function increment(){
        counter.innerHTML = "Time: "+ count;
        count = count + 1;
        if(count === 61){
            cancelAnimationFrame(gameloop);
            clearInterval(interval);
            time.style.display = 'block';
            time.animate([
                {
                  top: '-200px'
                },
                {
                  top: '40%'
                }],
                {
                  duration: 1000
                });
                time.style.top = '40%';
        }
       
    }
    

    //function to check the state of yes and close buttons and to excute a specific code if yes is true or close is true
    function reset(){
        if(ys){
            gameloop =window.requestAnimationFrame(gameLoop);
            x = 250;
            y = 250;
            score = 0;
            count = 0;
            interval = setInterval(increment,1000);
            ys = false;
              
        }
        else if(clse){
            cancelAnimationFrame(gameloop);
            clse = false;
            start.style.display = 'block';
        }
    }
    setInterval(reset,1);   //call the reset function every 1ms to check the state of yes and close buttons

    //function excute when start a new game button is clicked
    start.onclick = function(){
        gameloop = window.requestAnimationFrame(gameLoop);
        score = 0;
        count = 0;
        interval = setInterval(increment,1000);
        start.style.display = 'none';
        x = 250;
        y = 200;
    }

    
    //funciton excutes when start the game button is clicked
    newGame.onclick = function(){
        gameloop = window.requestAnimationFrame(gameLoop);
        interval = setInterval(increment,1000);
        newGame.style.display = 'none';
        sun.style.display = 'block';

    }

   
  
    
    //change the state of the key to true if it is pressed
    function keyDownhandler(e){
        if(e.keyCode == 39 && count<=61){
            rightPressed = true;
        }
        else if (e.keyCode == 37 && count<=61){
            leftPressed = true;
        }
        else if (e.keyCode == 40 && count<=61){
            downPressed = true;
        }
        else if (e.keyCode == 38 && count<=61){
            upPressed = true;
        }
    }

    //change state of the key to false if it is not pressed
    function keyUphandler(e){
        if(e.keyCode == 39){
            rightPressed = false;
        }
        else if (e.keyCode == 37){
            leftPressed = false;
        }
        else if (e.keyCode == 40){
            downPressed = false;
        }
        else if (e.keyCode == 38){
            upPressed = false;
        }
    }
    //call the function keyDownhandler if any key pressed to check if it is one of arrows or not and if it is one of arrow it changes its state to true
    document.addEventListener('keydown',keyDownhandler,false);
    //call the function keyUphandler if no key is pressed , so it changes arrows values to false
    document.addEventListener('keyup',keyUphandler,false);

    

    //while the mouse down the function is excuted
    right.onmousedown = function(){if (count<=61){dir = 1}}
    left.onmousedown = function(){if (count<=61){dir = 2}}
    up.onmousedown = function(){if (count<=61){dir = 3}}
    down.onmousedown = function(){if (count<=61){dir = 4}}

    //while the mouse is up the function is excuted
    right.onmouseup = function(){dir = 0}
    left.onmouseup = function(){dir = 0}
    up.onmouseup = function(){dir = 0}
    down.onmouseup = function(){dir = 0}

    //optmize for mobile phones
    right.ontouchstart = function(){dir = 1}
    left.ontouchstart = function(){dir = 2}
    up.ontouchstart = function(){dir = 3}
    down.ontouchstart = function(){dir = 4}

    right.ontouchend = function(){dir = 0}
    left.ontouchend = function(){dir = 0}
    up.ontouchend = function(){dir = 0}
    down.ontouchend = function(){dir = 0}

    
    //the gameloop funciton
    function gameLoop(){
        //calculate the fps of the game
        var timePassed = (Date.now()-t)/1000;
        var fps = Math.round(1/timePassed);
        t = Date.now();

        //clear the canvas every frame 
        context.clearRect(0,0,600,600);

        context.beginPath();
        context.rect(0,0,600,40);
        context.fillStyle = 'lightpink';
        context.fill();

        /*context.beginPath();
        context.rect(x,y,100,100)
        context.fillStyle = "green";
        context.fill();*/

        //draw FPS text on the canvas to watch the FPS
        context.font = 'bold 20px Arial';
        context.fillStyle = "black";
        context.fillText("FPS: " +fps,20,30 );
        
        /*context.beginPath();
        context.rect(coinX,coinY,50,50);
        context.fillStyle = "blue";
        context.fill();*/

        //draw score text on the canvas
        context.font = 'bold 20px Arial';
        context.fillStyle = 'black';
        context.fillText("Score: " +score,500,30);

        //draw bear on the canvas
        context.drawImage(bear,x,y,80,80);

        //draw carot on the canvas
        context.drawImage(carot,coinX,coinY,50,50);

        //draw initial knife on the canvas
        context.drawImage(knife,a,b,50,50);

        //draw the counter on the canvas
        /*context.font = '25px Arial';
        context.fillStyle = 'blue';
        context.fillText('Counter: ' + count, 240,30);*/

        
        
        //make the knife penetrate the canvas from the right side and regenerated at the left side 
        if(a >= 600){
            a = -50;
            b = Math.random() * (500-50);
        }
        else{
            a = a + (s* timePassed);
        }

        //control the direction based on the key pressed or the button clicked
        if(dir === 1 || rightPressed == true){
            if(x < 520 ){
                x = x + (speed * timePassed);
            }
            
            
        }
        else if( dir === 2 || leftPressed == true){
            if(x > 0){
                x = x - (speed * timePassed);
            }
            
            
        }
        else if( dir === 3 || upPressed == true){
            if(y > 42){
                y = y - (speed * timePassed);
            }
            
        }
        else if( dir === 4 || downPressed == true){
            if(y < 420){
                y = y + (speed * timePassed);
            }
           
        }


        //increase the hardness of the game while the score increases
        if(score === 10){
            s = 200;
        }
        else if ( score >= 20 && score <30){
            s = 300;
            context.drawImage(knife,a,c,50,50);
        }
        else if ( score >= 30 && score < 40){
            s= 400;
            context.drawImage(knife,a,c,50,50);
        }
        else if( score >= 40){
            s = 500;
            context.drawImage(knife,a,c,50,50);
            context.drawImage(knife,a,d,50,50);
        }
        else if (score >= 50){
            s = 600;
            context.drawImage(knife,a,c,50,50);
            context.drawImage(knife,a,d,50,50);
        }

        else if(score === 0){
            s = 100;
        }

        if(coinY<40){coinY = 40;}
        if(b<40){b = 40;}
        if(c<40){c = 40;}
        if(d<40){d = 40;}

        //collision detection between the carot and the bear
        if(coinX <= x+100 && x <= coinX+50 && coinY <= y+100 && y <= coinY+50){
            score++;
            coinX = Math.random() * (600-50);
            coinY = Math.random() * (500-50);
        }

        //collision detection between the knife and the bear
        if(a <=x+70 && x <=a+50 && y <=b+40 && b <=y+70){
            gameOver.animate([
                {
                  top: '-200px'
                },
                {
                  top: '40%'
                }],
                {
                  duration: 1000
                });
            gameOver.style.top ='40%';   
            clearInterval(interval);
            gameOver.style.display = 'block';
            score = 0;
            count = 0;
            x = 250;
            y = 200;
            cancelAnimationFrame(gameloop);
            return; //to stop the function from continue.cause if it 
            //continues it will excute the animation frame again
        }
        
         gameloop = window.requestAnimationFrame(gameLoop);
       
        
        
        

    }

   
    
    
    
}














