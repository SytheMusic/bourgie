/**
 * Creates products of a specific type.
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
    this.workers = 0;
    this.tempworkers = 0;
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
    if (this.workers > 0 && this.output.available() > 0) {
        this.progress += this.multiplier;
        if (this.progress >= this.mod) {
            this.progress = 0;
            this.output.give(this.workers);
            this.workers -= this.tempworkers;
            this.tempworkers = 0;
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
 * @returns {number} between 0 and 1
 */
Source.prototype.getProgress = function() {
    return Math.min(this.progress / this.mod, 1);
};

/**
 * Hire a new worker at this industry, increasing its speed.
 * @returns {Source} this
 */
Source.prototype.hire = function() {
    this.workers++;
    return this;
};

/**
 * Upgrade the equipment at this industry.
 * @returns {Source} this
 */
Source.prototype.upgrade = function() {
    this.output.capacity = Math.floor(this.output.capacity * 1.5);
    this.multiplier *= 1.1;
    return this;
};

/**
 * Manually operate this industry for one output.
 * @param {number} [n=1] number of workers to apply
 */
Source.prototype.work = function(n) {
    n = n || 1;
    if (this.tempworkers === 0) {
        this.tempworkers = n;
        this.workers += n;
    }
    return this;
};

/**
 * @returns {Source}
 */
Source.prototype.clone = function() {
    return $.extend({}, this);
};

/**
 * @returns {string}
 */
Source.prototype.toString = function() {
    return '[Source ' + this.name + ']';
};

/* Create different kinds of sources. */

Source.FOREST = Source("forest", Product.WOOD, 40);
Source.IRON_MINE = Source("iron mine", Product.IRON_ORE, 10);
