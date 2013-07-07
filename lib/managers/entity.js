function EntityManager (componentManager) {
    this.components = componentManager;
    this.entities = [];
    this.entitiesByComponent = {};
}

EntityManager.prototype.create = function (id, template) {
    if (!id) {
        console.error('create call is missing an object ID');
        return false;
    }

    if (this.entities.hasOwnProperty(id)) {
        console.error('An object with this id already exists');
        return false;
    }

    var entity;

    entity = {
        "id": id
    };

    this.entities[id] = entity;

    return true;
};

EntityManager.prototype.get = function (id) {
    return this.entities[id];
};

EntityManager.prototype.getAll = function (componentType) {
    return this.entitiesByComponent[componentType] || null;
};

EntityManager.prototype.addComponent = function (componentType, componentID, entityID) {
    var entity;

    entity = this.get(entityID);
    if (entity === undefined) {
        console.error("Object '" + entityID + "' does not exist");
        return false;
    }

    if (entity.hasOwnProperty(componentType)) {
        console.error("Object already has component '" + componentType + "'");
        return false;
    }

    entity[componentType] = componentID;

    if (!this.entitiesByComponent.hasOwnProperty(componentType)) {
        this.entitiesByComponent[componentType] = [];
    }
    this.entitiesByComponent[componentType].push(entityID);

    return true;
};

module.exports = EntityManager;
