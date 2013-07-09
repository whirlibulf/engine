var Game = require("./game.js");

function bootSystems(game, systems) {
    var i;

    for (i = 0; i < systems.length; ++i) {
        game.use(systems[i]);
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

function bootEntities(game, entities) {
    var id;

    for (id in entities) {
        if (entities.hasOwnProperty(id)) {
            game.create(id, entities[id]);
        }
    }
}

function Boot(options) {
    var game = new Game();

    if (options.config) {
        game.config(options.config);
    }

    if (options.systems) {
        bootSystems(game, options.systems);
    }

    if (options.components) {
        bootComponents(game, options.components);
    }

    if (options.entities) {
        bootEntities(game, options.entities);
    }

    return game;
}

module.exports = Boot;
