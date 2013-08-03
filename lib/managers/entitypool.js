var INITIAL_POOL_SIZE = 1;

function EntityPool() {
    this.free = [];
    this.size = 0;

    this.expansion = INITIAL_POOL_SIZE;
    this.expand();
}

EntityPool.prototype.acquire = function () {
    if (this.free.length <= 0) {
        this.expand();
    }

    return this.free.pop();
};

EntityPool.prototype.release = function (obj) {
    this.free.push(obj);
};

EntityPool.prototype.expand = function () {
    var i;

    for (i = 0; i < this.expansion; ++i) {
        this.free.push({});
    }

    this.size += this.expansion;
    this.expansion = Math.round(this.expansion * 1.2) + 1;
};

module.exports = EntityPool;
