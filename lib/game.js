var Loop = require("./loop.js");
var Emitter = require("emitter");
var SystemManager = require("./managers/system.js");
var ComponentManager = require("./managers/component.js");
var EntityManager = require("./managers/entity.js");

function Game() {
    var that = this;

    this.systems = new SystemManager();
    this.components = new ComponentManager();
    this.entities = new EntityManager();
    this._config = {};

    this.loop = new Loop();
    this.loop.on("update", this._update.bind(this));
    this.loop.on("render", this._render.bind(this));

    console.log("Engine loaded");
}

Emitter(Game.prototype);


/**
 * Easy function for adding both systems and components
 * One parameter = system
 * Two parameters = component
 */
Game.prototype.use = function () {
    if (arguments.length === 1) {
        var system = this.systems.use(arguments[0]);

        if (system) {
            if (system.init) {
                system.init(this);
            }
            return true;
        }
    } else if (arguments.length === 2) {
        return this.components.use(arguments[0], arguments[1]);
    }

    return false;
};


/**
 * Create an entity with the specified ID
 *
 * If template is supplied, an entity will be created with the requested components
 * Otherwise, an empty entity will be created
 */
Game.prototype.create = function (id, template) {
    var component;

    if (!this.entities.create(id)) {
        return false;
    }

    if (template) {
        for (component in template) {
            if (template.hasOwnProperty(component)) {
                this.add(id, component, template[component]);
            }
        }
    }

    return true;
};

/**
 * Add a new component instance to an entity
 */
Game.prototype.add = function (entityID, componentType, options) {
    var componentID;

    componentID = this.components.create(componentType, options);

    if (componentID === false) {
        console.error("Component '" + componentType + "' does not exist");
        return false;
    }

    if (!this.entities.add(componentType, componentID, entityID)) {
        //TODO: could not add component to entity, delete the just-created component
        return false;
    }

    this.components.setEntity(componentType, componentID, entityID);

    this.entities.updateIndex(entityID);
    this.emit("componentCreated", componentType, componentID);

    return true;
};

/**
 * Get an entity by its ID
 * Or get an entity's component
 */
Game.prototype.get = function (id, component) {
    var entity;

    //Get an entity
    if (arguments.length === 1) {
        return this.entities.get(id);
    }

    //Get an entity's component
    if (arguments.length === 2) {
        entity = this.entities.get(id);

        if (!entity || entity[component] === undefined) {
            return;
        }

        return this.components.get(component, entity[component]);
    }

    return undefined;
};

/**
 * Get all entities that have been indexed by components
 */
Game.prototype.getAll = function (components) {
    return this.entities.getAll(components);
};

/**
 * Remove an entity and all its components from the game
 */
Game.prototype.remove = function (id) {
};

Game.prototype.index = function (components) {
    this.entities.index(components);
};


Game.prototype.config = function (key, val) {
    if (arguments.length === 2) {
        this._config[key] = val;
        this.emit("config", key, val);
        return true;
    }

    if (arguments.length === 1 && typeof key === "string") {
        return this._config[key];
    }

    if (arguments.length === 1 && typeof key !== "object") {
        return false;
    }

    for (var name in key) {
        if (key.hasOwnProperty(name)) {
            this._config[name] = key[name];
            this.emit("config", name, key[name]);
        }
    }
    return true;
};





/**
 * Start the game loop
 * Supply an fps parameter to change the game update rate
 */
Game.prototype.start = function (fps) {
    this.emit('start');
    this.loop.start(fps);
};

Game.prototype._update = function (dt) {
    this.emit('updateBegin');
    this.systems.update(dt);
    this.emit('updateEnd');
};

Game.prototype._render = function (dt) {
    this.emit('renderBegin');
    this.systems.render();
    this.emit('renderEnd');
};

module.exports = Game;
