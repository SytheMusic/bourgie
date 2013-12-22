function Bind(thing, canvas) {
    this.thing = thing;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    if (thing.thingType === 'CONVEYOR') {
        this.mode = 'conveyor';
    } else if (thing.thingType === 'INDUSTRY') {
        this.mode = 'industry';
    } else {
        throw new Error('Unknown thing type.');
    }
}

Bind.prototype.thingType = 'BIND';

Bind.storeStyle = '#44f';

Bind.prototype.clear = function() {
    var w = this.canvas.width, h = this.canvas.height, c = this.ctx;
    c.fillStyle = this.thing.style || 'lightgray';
    c.fillRect(0, 0, w, h);
};

Bind.prototype.industry = function() {
    var w = this.canvas.width, h = this.canvas.height, c = this.ctx;
    var i = this.thing.input, o = this.thing.output;
    var storeW = 6;
    var p = 0;
    this.clear();
    c.fillStyle = Bind.storeStyle;
    if (i != null) {
        p = i.count() / i.capacity;
        c.fillRect(0, (1 - p) * h, w / storeW, h);
    }
    if (o != null) {
        p = o.count() / o.capacity;
        c.fillRect(w - w / storeW, (1 - p) * h, w / storeW, h);
    }

    c.fillStyle = 'black';
    c.font = 'bold 10pt sans-serif';
    var name = this.thing.name;
    var textW = c.measureText(name).width;
    c.fillText(name, w / 2 - textW / 2, h / 2 + 10 / 2);
};

Bind.prototype.conveyor = function() {
};

Bind.prototype.tick = function() {
    this[this.mode]();
};

Bind.industryCanvas = function(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || 96;
    canvas.height = height || 96;
    canvas.className = 'industry';
    return canvas;
};
