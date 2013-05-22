var Game = require("./game.js");

function Boot(options) {
  var game = new Game();

  if (options.systems) {
    bootSystems(game, options.systems);
  }

  if (options.components) {
    bootComponents(game, options.components);
  }

  return game;
}

function bootSystems(game, systems) {
  var i, cls;

  for (i = 0; i < systems.length; ++i) {
    cls = systems[i].system;
    game.use(new cls(systems[i].options));
  }
}

function bootComponents(game, components) {
  var type;

  for (type in components) {
    if (components.hasOwnProperty(type)) {
      game.use(type, components[type]);
    }
  }
}

module.exports = Boot;
