// var drawSnake = function(snakeToDraw){
//     var drawableSnake = {color: "#FF5733", pixels: snake}; // creating another var named drawableSnake
//     var drawableObjs = [drawableSnake]; //creating yet another var named drawableObjs
//     CHUNK.draw(drawableObjs);
// }

var snakeColor = "#007124"

var draw =  function(snakeToDraw, apple){
  var drawableSnake  = {color: snakeColor, pixels: snakeToDraw};
  var drawableApple = {color: "red", pixels: [apple]};
  var drawableObjs = [drawableSnake, drawableApple];
  CHUNK.draw(drawableObjs);
}

var moveSeg = function(segment) {
    if (segment.direction === "down") {
      return {top: segment.top + 1, left: segment.left}
    } else if (segment.direction === "up") {
      return {top: segment.top - 1, left: segment.left}
    } else if (segment.direction === "right") {
      return {top: segment.top, left: segment.left + 1}
    } else if (segment.direction === "left") {
      return {top: segment.top, left: segment.left - 1}
    }
    return segment;
  }

var segFurtherForward = function(index, snake){
  if (snake[index - 1] === undefined){
    return snake[index];
  }else{
    return snake[index - 1];
  }
} 

var moveSnake = function(snake) {
    var newSnake = [];
    snake.forEach(function(oldSeg, segIndex){
      var newSeg = moveSeg(oldSeg);
      newSeg.direction = segFurtherForward(segIndex, snake).direction;
      newSnake.push(newSeg);
    })
    // var oldSeg = snake[0];
    // newSeg.direction = oldSeg.direction;
    // var newSnake = [newSeg];
    return newSnake;
  }  

  var growSnake = function(snake) {
    score += 1
    var indexOfLastSeg = snake.length - 1;
    var lastSeg = snake[indexOfLastSeg];
    snake.push({ top: lastSeg.top, left: lastSeg.left });
    return snake;
  }

var oops = function(snake, otherThing){
  var head = snake[0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}

var advanceGame = function(){
    var newSnake = moveSnake(snake);

    if(oops(newSnake, snake)){
      CHUNK.endGame();
      CHUNK.flashMessage("You ate yourself lol");
    }

    if(CHUNK.detectCollisionBetween([apple], snake)) {
      snake = growSnake(snake);
      apple = CHUNK.randomLocation();
    }

    if(CHUNK.detectCollisionBetween(snake,CHUNK.gameBoundaries())){
      CHUNK.endGame();
      CHUNK.flashMessage("Woah, you hit a wall w/ a score of " + score)
    }
    snake = newSnake;
    draw(snake, apple);
}

var changeDirection = function(direction){
  snake[0].direction = direction;
}

var snake = [{ top: 1, left: 0, direction: "down" }, { top: 0, left: 0, direction: "down" }];
var apple = {top: 8, left: 10};
var score = snake.length;

CHUNK.executeNTimesPerSecond(advanceGame, 7);
CHUNK.onArrowKey(changeDirection);