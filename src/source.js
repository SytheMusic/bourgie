/**
 * @param {string} name
 * @param {Product} type
 * @param {number} rate number of products per minute
 */

function Source(name, type, rate) {
    "use strict";
    if (this == null) {
        var source = new Source(name, type, rate);
        Source.all[name] = source;
        return source;
    }
    this.name = name;
    this.output = new Store(type);
    this.rate = rate;
    this.mod = World.TICKS_PER_MINUTE / rate;

    this.progress = 0;
    this.multiplier = 1;
    return this;
}

Source.prototype.thingType = 'INDUSTRY';
Source.prototype.style = 'lightgreen';

/** Collection of all known sources. */
Source.all = {};

/**
 * Called once per tick.
 */
Source.prototype.tick = function() {
    if (this.output.available() > 0) {
        this.progress += this.multiplier;
        if (this.progress >= this.mod) {
            this.progress -= this.mod;
            this.output.give(1);
        }
    }
};

/**
 * @param {number} count number of items to take
 * @param {Product} type the type to take (error checking)
 * @returns {number} the number of items actually taken
 */
Source.prototype.take = function(count, type) {
    return this.output.take(count, type);
};

/**
 * @returns {string}
 */
Source.prototype.toString = function() {
    return '[Source ' + this.name + ']';
};


/* Create different kinds of sources. */

Source.FOREST = Source("forest", Product.WOOD, 60);
Source.IRON_MINE = Source("iron mine", Product.IRON_ORE, 10);
