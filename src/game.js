define([
  './update',
  './draw',
  './boxData',
  'dojo/keys',
  'frozen/box2d/BoxGame',
  'frozen/box2d/Box',
  'frozen/box2d/RectangleEntity',
  'frozen/box2d/CircleEntity',
  'frozen/box2d/PolygonEntity'
], function(update, draw, boxData, keys, BoxGame, Box, Rectangle, Circle, Polygon){

  //setup a GameCore instance
  var game = new BoxGame({
    canvasId: 'canvas',
    gameAreaId: 'gameArea',
    canvasPercentage: 0.95,
    update: update,
    draw: draw,
    box: new Box({resolveCollisions: true}), //change any box defaults here
    initInput: function(im){
      //setup key mappings
      im.addKeyAction(keys.UP_ARROW);
    },
    handleInput: function(im, millis){
      //do something with key event
      if(im.keyActions[keys.UP_ARROW].isPressed()){
        //this.box.applyImpulseDegrees('ball', 0, 5);
      }
    }
  });




  //add everything to box from the boxData
  for (var i = 0; i < boxData.entities.length; i++) {
    var obj = boxData.entities[i];
    var ent;
    if(obj.type === 'Rectangle'){
      ent = new Rectangle(obj);
    }
    else if(obj.type === 'Polygon'){
      ent = new Polygon(obj);
    }
    else if(obj.type === 'Circle'){
      ent = new Circle(obj);
    }

    if(ent){
      game.addBody(ent);
    }
  }



  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});