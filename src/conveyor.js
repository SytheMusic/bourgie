/**
 * @param {(Source|Factory)} source
 * @param {(Factory|Sink)} dest
 * @param {Product} type
 * @param {number} rate products picked up per minute
 * @param {number} time number of seconds products are in transit
 */
function Conveyor(source, dest, type, rate, time) {
    "use strict";
    if (this == null) {
        return new Conveyor(source, dest, type, rate, time);
    }
    this.source = source;
    this.dest = dest;
    this.rate = rate;
    this.time = time;
    this.mod = World.TICKS_PER_MINUTE / rate;
    this.pipeline = new Store(type, 1);

    this.progress = 0;
    this.timers = [];
    this.multiplier = 1;
    return this;
}

Conveyor.prototype.thingType = 'CONVEYOR';

/**
 * Called once every tick.
 */
Conveyor.prototype.tick = function() {
    /* Advance the pipeline first. */
    if (this.pipeline.count() > 0 && this.dest.input.available() > 0) {
        for (var i = 0; i < this.timers.length; i++) {
            this.timers[i]--;
        }
        while (this.timers.length > 0 && this.timers[0] <= 0) {
            this.timers.shift();
            this.pipeline.take(1);
            this.dest.input.give(1, this.type);
        }
    }
    /* Pick up from source */
    if (this.pipeline.available() > 0) {
        this.progress += this.multiplier;
    }
    if (this.progress >= this.mod) {
        var stuck = this.source.output.count() === 0 ||
                this.pipeline.available() === 0;
        if (stuck) {
            this.progress = this.mod;
        } else {
            this.progress -= this.mod;
            this.source.output.take(this.pipeline.give(1), this.type);
            this.timers.push(this.time * World.TICKS_PER_SECOND);
        }
    }
};

/**
 * @returns {string}
 */
Conveyor.prototype.toString = function() {
    return '[Conveyor ' + this.pipeline.type.name + ' '
        + this.pipeline.capacity + ']';
};

Conveyor.simple = function(source, dest) {
    if (source.output.type !== dest.input.type) {
        throw new Error('Type mismatch!');
    }
    return new Conveyor(source, dest, source.output.type, 60, 3);
};
