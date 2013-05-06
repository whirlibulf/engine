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

game.systems.register(canvas);
game.systems.register(scripts);

game.components.register(require('transform'));
game.components.register(require('primitive-shape'));
game.components.register(require('script'));

//game.loop.start(30);
game.start(30);



//low level:
var obj = game.manager.createObject('object id');
game.manager.addComponentToObject('Transform', 'transform', {'x': 0, 'y': 0});
game.manager.addComponentToObject('Sprite', 'primitive-shape', {'shape': 'circle', 'radius': 5});
game.manager.addComponentToObject('ClickScript', 'script', scriptRef);



//data-driven:
var prefab = {
  'Position': {
    'component': 'position',
    'options': {
      'x': 0,
      'y': 0
    }
  },
  'Sprite': {
    'component': 'primitive-shape',
    'options': {
      'shape': 'circle',
      'radius': 5
    }
  },
  'ClickScript': {
    'component': 'script',
    'options': {
      'script': scriptRef
    }
  }
};

var obj1 = game.manager.createObject('obj1', prefab);
var obj2 = game.manager.createObject('obj2', prefab);
