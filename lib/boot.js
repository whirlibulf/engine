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
  var type, class, system;

  for (type in systems) {
    if (systems.hasOwnProperty(type)) {
      class = require(type);
      system = new class(systems[type]);

      game.use(system);
    }
  }
}

function bootComponents(game, components) {
  var type, component;

  for (type in components) {
    if (components.hasOwnProperty(type)) {
      component = require(components[type]);
      game.use(type, component);
    }
  }
}

module.exports = Boot;
