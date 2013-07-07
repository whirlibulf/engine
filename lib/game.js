var Loop = require("./loop.js");
var Emitter = require("emitter");
var SystemManager = require("./managers/system.js");
var ComponentManager = require("./managers/component.js");

function Game() {
    var that = this;

    this._systems = new SystemManager();
    this._components = new ComponentManager();
    this._objects = {}; //collections of related components of different types
    this._objectsByComponent = {}; //objects indexed by component type
    this._config = {};

    this.loop = new Loop();

    this.loop.on("update", function (dt) {
        that._update(dt);
    });
    this.loop.on("render", function (dt) {
        that._render(dt);
    });

    console.log("Engine loaded");
}

Emitter(Game.prototype);


/**
 * Easy function for adding both systems and components
 * One parameter = system
 * Two parameters = component
 */
Game.prototype.use = function (system, component) {
    if (arguments.length === 1) {
        return this._useSystem(arguments[0]);
    }

    if (arguments.length === 2) {
        return this._useComponent(arguments[0], arguments[1]);
    }

    return false;
};


/**
 * Create an object with the specified ID
 *
 * If template is supplied, an object will be created with the requested components
 * Otherwise, an empty object will be created
 */
Game.prototype.create = function (id, template) {
    if (!id) {
        console.error('create call is missing an object ID');
        return false;
    }

    if (this._objects.hasOwnProperty(id)) {
        console.error('An object with this id already exists');
        return false;
    }

    var obj, component;

    obj = {
        id: id
    };

    this._objects[id] = obj;

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
 * Add a new component instance to an object
 */
Game.prototype.add = function (objectID, componentType, options) {
    var componentID, component, obj;

    obj = this.get(objectID);
    if (obj === undefined) {
        console.error("Object '" + objectID + "' does not exist");
        return false;
    }

    if (obj.hasOwnProperty(componentType)) {
        console.error("Object already has component '" + componentType + "'");
        return false;
    }

    componentID = this._createComponent(componentType, options);

    if (componentID === false) {
        console.error("Component '" + componentType + "' does not exist");
        return false;
    }

    component = this._components.get(componentType, componentID);
    component._object = objectID;
    obj[componentType] = componentID;

    if (!this._objectsByComponent[componentType]) {
        this._objectsByComponent[componentType] = [];
    }
    this._objectsByComponent[componentType].push(objectID);

    return true;
};

/**
 * Get an object by its ID
 * Or get an object's component
 */
Game.prototype.get = function (id, component) {
    //Get an object
    if (arguments.length === 1) {
        return this._objects[id];
    }

    //Get an object's component
    if (arguments.length === 2) {
        var obj = this._objects[id];
        if (!obj || obj[component] === undefined) {
            return;
        }

        return this._components.get(component, obj[component]);
    }

    return undefined;
};

/**
 * Get all objects that have a particlar component type
 */
Game.prototype.getAll = function (componentType) {
    return this._objectsByComponent[componentType] || [];
};

/**
 * Remove an object and all its components from the game
 */
Game.prototype.remove = function (id) {
};

/**
 * Get all instances of a component
 */
Game.prototype.getComponents = function (component) {
    return this._components.get(component);
};



/**
 * Register an instance of a system to the game
 * Systems are updated in the order in which they are added to the game
 */
Game.prototype._useSystem = function (system) {
    if (typeof system !== "object" && typeof system !== "function") {
        console.error("Systems must be object instances");
        return false;
    }

    if (typeof system === "function") {
        system = new system();
    }

    if (this._systems.add(system)) {
        if (system.init) {
            system.init(this);
        }
        return true;
    } else {
        return false;
    }
};



/**
 * Register component factories to the game
 */
Game.prototype._useComponent = function (id, component) {
    return this._components.add(id, component);
};

/**
 * Create a new component instance
 */
Game.prototype._createComponent = function (id, options) {
    var index;
    index = this._components.create(id, options);
    if (index !== false) {
        this.emit("componentCreated", id);
    }
    return index;
};

Game.prototype.config = function (key, val) {
    if (arguments.length === 2) {
        this._config[key] = val;
        this.emit("config", key, val);
        return;
    }

    if (typeof key === "string") {
        return this._config[key];
    }

    for (var name in key) {
        if (key.hasOwnProperty(name)) {
            this._config[name] = key[name];
            this.emit("config", name, key[name]);
        }
    }
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
    this._systems.update(dt);
    this.emit('updateEnd');
};

Game.prototype._render = function (dt) {
    this.emit('renderBegin');
    this._systems.render();
    this.emit('renderEnd');
};

module.exports = Game;
