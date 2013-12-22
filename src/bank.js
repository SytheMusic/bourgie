/**
 * Keeps track of the player's cash.
 * @param {number} [balance] starting balance
 */
function Bank(balance) {
    this._value = balance || 0;
}

/**
 * @returns {number}
 */
Bank.prototype.balance = function() {
    return this._value;
};

/**
 * @param {number} amount
 */
Bank.prototype.deposit = function(amount) {
    if (amount < 0) {
        throw new Error("Attempted negative deposit.");
    } else {
        this._value += amount;
    }
};

/**
 * @param {number} amount
 * @returns {boolean} true if withdraw succeeded
 */
Bank.prototype.withdraw = function(amount) {
    if (amount < 0) {
        throw new Error("Attempted negative withdraw.");
    } else if (amount > this._value) {
        return false;
    } else {
        this._value -= amount;
        return true;
    }
};

/**
 * @returns {string} a nicely formatted value
 */
Bank.prototype.format = function() {
    if (this._cachevalue === this._value) {
        return this._formatcache;
    } else {
        this._formatcache = this._value.toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        this._cachevalue = this._value;
        return this._formatcache;
    }
};

/**
 * @returns {string}
 */
Bank.prototype.toString = function() {
    return '[Bank $' + this.format() + ']';
};

Bank.prototype.display = function() {
    $('.bank .balance').text('$' + this.format());
};

Bank.NULL = new Bank();
Bank.NULL.deposit = function() {};
Bank.NULL.balance = Bank.NULL.withdraw = function() {
    throw new Error("NULL bank accessed.");
};
