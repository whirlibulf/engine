var INITIAL_POOL_SIZE = 1;

function ComponentPool(constructor) {
    this.constructor = constructor;
    this.free = [];
    this.size = 0;

    this.expansion = INITIAL_POOL_SIZE;
    this.expand();
}

ComponentPool.prototype.acquire = function () {
    if (this.free.length <= 0) {
        this.expand();
    }

    return this.free.pop();
};

ComponentPool.prototype.release = function (obj) {
    this.free.push(obj);
};

ComponentPool.prototype.expand = function () {
    var i;

    for (i = 0; i < this.expansion; ++i) {
        this.free.push(new this.constructor({}));
    }

    this.size += this.expansion;
    this.expansion = Math.round(this.expansion * 1.2) + 1;
};

module.exports = ComponentPool;
