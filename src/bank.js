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
 * @returns {string}
 */
Bank.prototype.toString = function() {
    return '[Bank $' + this.balance() + ']';
};

Bank.NULL = new Bank();
Bank.NULL.deposit = function() {};
Bank.NULL.balance = Bank.NULL.withdraw = function() {
    throw new Error("NULL bank accessed.");
};
