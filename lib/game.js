var Loop = require("./loop.js");
var Emitter = require('emitter');

function Game() {
    var that = this;

    this._systems = [];
    this._components = {}; //component factories
    this._objects = {}; //collections of related components of different types
    this._componentsByType = {}; //components indexed by component type
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
Game.prototype.add = function (objectID, componentID, options) {
    var component, obj;

    obj = this.get(objectID);
    if (obj === undefined) {
        console.error("Object '" + objectID + "' does not exist");
        return false;
    }

    if (obj.hasOwnProperty(componentID)) {
        console.error("Object already has component '" + componentID + "'");
        return false;
    }

    component = this._createComponent(componentID, options);

    if (component === false) {
        console.error("Component '" + componentID + "' does not exist");
        return false;
    }

    this._componentsByType[componentID][component]._object = objectID;
    obj[componentID] = component;

    if (!this._objectsByComponent[componentID]) {
        this._objectsByComponent[componentID] = [];
    }
    this._objectsByComponent[componentID].push(objectID);

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

        return this.getComponents(component)[obj[component]];
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
    return this._componentsByType[component] || [];
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

    if (system.init) {
        system.init(this);
    }

    this._systems.push(system);
    return true;
};



/**
 * Register component factories to the game
 */
Game.prototype._useComponent = function (id, component) {
    if (typeof component !== "function") {
        return false;
    }

    id = id || '';
    if (!id || typeof id !== "string") {
        return false;
    }

    if (this._components.hasOwnProperty(id)) {
        return false;
    }

    this._components[id] = component;
    return true;
};

/**
 * Create a new component instance
 */
Game.prototype._createComponent = function (id, options) {
    var instance, index;

    id = id.toString() || '';
    if (!this._components.hasOwnProperty(id)) {
        return false;
    }

    instance = this._components[id](options);

    if (!instance || typeof instance !== 'object') {
        console.error("Component factory '" + id + "' did not return a component");
        return false;
    }

    if (!this._componentsByType[id]) {
        this._componentsByType[id] = [];
    }

    index = this._componentsByType[id].length;
    instance._index = index;

    this._componentsByType[id].push(instance);
    this.emit('componentCreated', id, instance);

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
    var i;

    this.emit('updateBegin');

    for (i = 0; i < this._systems.length; ++i) {
        if (this._systems[i].update) {
            this._systems[i].update(dt);
        }
    }

    this.emit('updateEnd');
};

Game.prototype._render = function (dt) {
    var i;

    this.emit('renderBegin');

    for (i = 0; i < this._systems.length; ++i) {
        if (this._systems[i].render) {
            this._systems[i].render(dt);
        }
    }

    this.emit('renderEnd');
};

module.exports = Game;
