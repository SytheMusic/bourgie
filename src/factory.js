/**
 * @param {string} name
 * @param {Product} inType
 * @param {Product} outType
 * @param {number} inRate count of input to consume per minute
 * @param {number} outRate count of output to produce per minute
 */
function Factory(name, inType, outType, inRate, outRate) {
    "use strict";
    if (this == null) {
        var factory = new Factory(name, inType, outType, inRate, outRate);
        Factory.all[name] = factory;
        return factory;
    }

    /* Static properties */
    this.name = name;
    this.input = new Store(inType);
    this.output = new Store(outType);
    this.inRate = inRate;
    this.outRate = outRate;
    this.inMod = World.TICKS_PER_MINUTE / inRate;
    this.outMod = World.TICKS_PER_MINUTE / outRate;

    /* Dynamic properties */
    this.inProgress = 0;
    this.outProgress = 0;
    this.multiplier = 1;
    return this;
}

/** Collection of all known factories. */
Factory.all = {};

/**
 * Called once every tick.
 */
Factory.prototype.tick = function() {
    if (this.input.count() > 0) {
        this.inProgress += this.multiplier;
        this.outProgress += this.multiplier;
        if (this.inProgress >= this.inMod) {
            this.input.take(1);
            this.inProgress -= this.inMod;
        }
        if (this.outProgress >= this.outMod) {
            this.output.give(1);
            this.outProgress -= this.outMod;
        }
    }
};

/**
 * @param {number} count number of items to give
 * @param {Product} type the type to take (error checking)
 * @returns {number} the number of items accepted
 */
Factory.prototype.give = function(count, type) {
    return this.input.give(count, type);
};

/**
 * @param {number} count number of items to take
 * @param {Product} type the type to take (error checking)
 * @returns {number} the number of items actually taken
 */
Factory.prototype.take = function(count, type) {
    return this.output.take(count, type);
};

/**
 * @returns {string}
 */
Factory.prototype.toString = function() {
    return '[Factory ' + this.name + ']';
};

/* Create different kinds of factories. */

Factory.LUMBER_MILL =
    Factory("lumber mill", Product.WOOD, Product.LUMBER, 60, 30);
Factory.IRON_SMELTER =
    Factory("iron smelter", Product.IRON_ORE, Product.IRON, 2, 1);
