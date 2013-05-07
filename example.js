var engine = require("whirlibulf");
var game = new engine.Game();

var canvas = new CanvasSystem({
  "element": document.getElementById("game"),
  "width": 800,
  "height": 600,
  "renderableComponents": [
    "primitive-shape",
    "image"
  ]
});

var scripts = new ScriptSystem();



game.debug.on();

game.addSystem(canvas);
game.addSystem(scripts);

game.addComponent(require('transform'));
game.addComponent(require('primitive-shape'));
game.addComponent(require('script'));

//game.loop.start(30);
game.start(30);



//low level:
var obj = game.manager.createObject('object id');
game.addComponentToObject(obj, 'transform', {'x': 0, 'y': 0});
game.addComponentToObject(obj, 'primitive-shape', {'shape': 'circle', 'radius': 5});
game.addComponentToObject(obj, 'script', scriptRef);



//data-driven:
var prefab = {
  'Transform': {
    'x': 0,
    'y': 0
  },
  'Sprite': {
    'shape': 'circle',
    'radius': 5,
    'layer': 0
  },
  'ClickHandler': {
    'script': scriptRef
  }
};

var obj1 = game.manager.createObject('obj1', prefab);
var obj2 = game.manager.createObject('obj2', prefab);
