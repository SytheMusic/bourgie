/**
 * A product buffer.
 * @param {number} capacity the maximum volume this store can hold
 * @param {Product} type the product this store holds
 */
function Store(type, capacity) {
    this.type = type;
    this.capacity = capacity != null ? capacity : Store.DEFAULT_CAPACITY;
    this.fill = 0;
}

/** @const */
Store.DEFAULT_CAPACITY = 8;

/**
 * @returns {number} the available volume
 */
Store.prototype.available = function() {
    return this.capacity - this.fill;
};

/**
 * @returns {number} number of items in storage
 */
Store.prototype.count = function() {
    return this.fill;
};

/**
 * @param {Product} type throw an error when this doesn't match storage type
 */
Store.prototype.check = function(type) {
    if (type != null && type !== this.type) {
        throw new Error('Invalid storage type "' + type +
                        '": accepts "' + this.type + '"');
    }
};

/**
 * @param {number} count number of items to give
 * @param {Product} type the type to take (error checking)
 * @returns {number} the number of items accepted
 */
Store.prototype.give = function(count, type) {
    this.check(type);
    var canTake = this.available();
    this.fill += Math.min(canTake, count);
    return (canTake < count) ? canTake : count;
};

/**
 * @param {number} count number of items to take
 * @param {Product} type the type to take (error checking)
 * @returns {number} the number of items actually taken
 */
Store.prototype.take = function(count, type) {
    this.check(type);
    var canGive = this.fill;
    this.fill -= Math.min(canGive, count);
    return (canGive < count) ? canGive : count;
};

/**
 * @returns {string}
 */
Store.prototype.toString = function() {
    return '[Store ' + this.type + ']';
};
