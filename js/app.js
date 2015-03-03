var playerHeight = 80;
var playerWidth = 75;
var playerStartX = 200; //player starting position horizontal
var playerStartY = 400; //player starting position vertical
var stepX =95; // player moves horizontally 95 pix each step
var stepY = 80; // mplayer moves vertically 80 pix each step
var enemyCount = 4; //max number of enemy bugs 
var playerMaxRightX= 400; //limit of player movement to right
var playerMaxLeftX= 0;  //limit of player movement to left
var playerMaxUpY = 80; //limit of player movement up
var playerMaxDownY = 400;//limit of player movement down
var enemySpeeds = [100,150,200]; // array containing different enemy speeds
var enemyStartY = [65,145,225]; // array containing starting Y value for the bugs for different rows

var randomNumber = function(a) {// random number generator non inclusive of (a) 
    return Math.floor((Math.random() * a));
}

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here
    this.sprite = 'images/enemy-bug.png'; // The image/sprite for our enemies
    this.x=x;
    this.y=y;
    this.speed=speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x > ctx.canvas.width){ // Tests whether the Enemy is off screen to right side
        this.x = -100; // Reset Enemy outside canvas on the left
        var randomRow = randomNumber(3);
        this.y = enemyStartY[randomRow]; // Decides the Y value for the enemy randomly from enemyStartY array 
        var randomSpeed = randomNumber(3);
        this.speed = enemySpeeds[randomSpeed]; //Decides the speed of the enemy randomly from enemySpeeds array
    }
    this.x += this.speed *dt; // Multiply movement by the dt parameter will ensure that the game runs at the same speed for all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
}

// Writing the player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x=x;
    this.y=y;
}

//Check for collisions and win state
Player.prototype.update = function(dt) {
   for(var e=0;e<enemyCount;e++){ //Loop through all enemies
    //Detects collisons by checking the player and enemies distances from each other if collison detected game is reset
     //and player gets reset back to its initial start position  and score decrements by 1
        if(player.x <= (allEnemies[e].x + 70) && allEnemies[e].x <= (player.x + 50) && player.y <= (allEnemies[e].y + 70) && allEnemies[e].y <= (player.y + 60)) {
            this.x = 200;
            this.y = 400;
            score--;
            document.getElementById('score').innerHTML = 'Score ['+score+']';
        }
    }
    // Checking Win state - The player reaches win position and then reverts to initial start position  and scrore increments by 1

          Player.prototype.winReset = function () {
            player.x = 200;
            player.y = 400;
            score++;
            document.getElementById('score').innerHTML = 'Score ['+score+']';
         
    }
}


//Draw the Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
}

//Handling player input and keeping the player within bounds. 
Player.prototype.handleInput = function(key) {  
    var changedposition; 
    switch(key) {
        case "up":
            changedposition = this.y-stepY; // Moving up 80px
            if(changedposition>=80){  //Check if player is within bounds up(Should be >= 80)
                this.y=changedposition;
            }    
            else{
                this.y=80;
                player.winReset();
            }
            break;
        case "down": 
            changedposition = this.y + stepY; // Moving down 80px
            if(changedposition<=400){// Check if player is within bounds down(Should be <= 400)
                this.y = changedposition;
            }
            else{
                this.y = 400;
            }
            break;
        case "left": 
            changedposition = this.x - stepX; // Player moves left 95px
            if(changedposition>=0){ // Check if player is within bounds on the left side(Should be >= 0).
                this.x=changedposition;
            }
            else{
                this.x = 0;
            }
            break;
        case "right": 
            changedposition = this.x + stepX; // Player moves right 95px
            if(changedposition<=400){ // Check if player is within bounds on the right side(Should be <= 400).
                this.x=changedposition;
            }
            else{
                this.x = 400;
            }
            break;
        default: 
            return;
        
    }
        
    console.log(this.x, this.y);   //Used to locate coordinates on the board for future additions
}

// Instantiating the objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player = new Player(200, 400);

//Keeps score for display purposes
var score = 0;

// Creating enemies and pushing them in allEnemies array
var createBugs = function() {
    for(var i=0;i<enemyCount;i++){
        var randomx = randomNumber(300);
        var randomRow = randomNumber(3);
        var randomSpeed = randomNumber(3);
        var enemy = new Enemy(randomx,enemyStartY[randomRow],enemySpeeds[randomSpeed]);
        allEnemies.push(enemy);
    }
}
   
createBugs();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
