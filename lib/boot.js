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
  var i, cls, system;

  for (i = 0; i < systems.length ++i) {
    cls = systems[i].class;
    system = new cls(systems[i].options);

    game.use(system);
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
