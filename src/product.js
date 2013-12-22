function Product(name, mass, value) {
    "use strict";
    if (this == null) {
        var product = new Product(name, mass, value);
        Product.all[name] = product;
        return product;
    }
    this.name = name;
    this.mass = mass;
    this.value = value;
    return this;
}

/** Collection of all know products. */
Product.all = {};

/**
 * @returns {string}
 */
Product.prototype.toString = function() {
    return '[Product ' + this.name + ']';
};

Product.WOOD   = Product("wood", 1, 1);
Product.LUMBER = Product("lumber", 1, 4);
Product.IRON_ORE = Product("iron ore", 8, 3);
Product.IRON = Product("iron", 8, 12);
