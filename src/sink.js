function Sink(name, type, rate, bank) {
    "use strict";
    if (this == null) {
        var sink = new Sink(name, type, rate);
        Sink.all[name] = sink;
        return sink;
    }
    this.name = name;
    this.input = new Store(type);
    this.rate = rate;
    this.mod = World.TICKS_PER_MINUTE / rate;
    this.deposit = bank != null ? bank : Bank.NULL;

    this.progress = 0;
    this.multiplier = 1;

    return this;
}

Sink.prototype.thingType = 'SINK';
Sink.prototype.style = 'lightred';

/** Collection of all known sinks. */
Sink.all = {};

Sink.prototype.tick = function() {
    if (this.input.count() > 0) {
        this.progress += this.multiplier;
        if (this.progress >= this.mod) {
            this.progress -= this.mod;
            this.input.take(1);
            this.bank.deposit(this.input.type.value);
        }
    }
};

/**
 * @param {number} count number of items to give
 * @param {Product} type the type to take (error checking)
 * @returns {number} the number of items accepted
 */
Sink.prototype.give = function(count, type) {
    return this.output.give(count, type);
};

/**
 * @returns {number} between 0 and 1
 */
Sink.prototype.getProgress = function() {
    return Math.min(this.progress / this.mod, 1);
};

/**
 * @returns {string}
 */
Sink.prototype.toString = function() {
    return '[Sink ' + this.name + ']';
};

/* Create different kinds of sinks. */

Sink.WOOD_TRUCK = Sink("wood trucks", Product.WOOD, 60);
Sink.LUMBER_TRUCK = Sink("lumber trucks", Product.LUMBER, 40);