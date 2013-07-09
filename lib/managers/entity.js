function EntityManager () {
    this.entities = {};
    this.indexData = {};
    this.indexMeta = {};
}

EntityManager.prototype.create = function (id) {
    if (!id) {
        console.error("create call is missing an object ID");
        return false;
    }

    if (this.entities.hasOwnProperty(id)) {
        console.error("An object with this id already exists");
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

EntityManager.prototype.add = function (componentType, componentID, entityID) {
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
    return true;
};

EntityManager.prototype.index = function (components) {
    var key,
        entityID;

    if (!components || !components.length) {
        return false;
    }

    key = components.sort().join(",");
    if (this.indexData.hasOwnProperty(key)) {
        return key;
    }

    this.indexData[key] = [];
    this.indexMeta[key] = components;

    for (entityID in this.entities) {
        if (this.entities.hasOwnProperty(entityID)) {
            this.match(entityID, key);
        }
    }

    return key;
};

EntityManager.prototype.updateIndex = function (entityID) {
    var key;

    if (!this.entities[entityID]) {
        return false;
    }

    //see if entity should be added to any of the existing indexes
    for (key in this.indexMeta) {
        if (this.indexMeta.hasOwnProperty(key)) {
            //entity is already in this index, skip this index
            if (this.indexData[key].indexOf(entityID) !== -1) {
                continue;
            }

            this.match(entityID, key);
        }
    }

    return true;
};

EntityManager.prototype.match = function (entityID, index) {
    var entity, i, match;

    entity = this.entities[entityID];

    //check if entity should be in this index
    for (i = 0; i < this.indexMeta[index].length; ++i) {
        if (!entity.hasOwnProperty(this.indexMeta[index][i])) {
            match = false;
            break;
        }

        match = true;
    }

    if (match === true) {
        this.indexData[index].push(entityID);
    }
};

EntityManager.prototype.getAll = function (key) {
    if (!key) {
        return null;
    }

    if (typeof key !== "string") {
        key = key.join(",");
    }
    return this.indexData[key] || null;
};


module.exports = EntityManager;
