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
    var _this = this;
    canvas.addEventListener('click', function() {
        _this.click();
    });
}

Bind.prototype.thingType = 'BIND';

Bind.storeStyle = '#44f';
Bind.progressStyle = '#ddd';
Bind.conveyStyle = '#44f';

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

    /* Draw stores. */
    c.fillStyle = Bind.storeStyle;
    if (i != null) {
        p = i.count() / i.capacity;
        c.fillRect(0, (1 - p) * h, w / storeW, h);
    }
    if (o != null) {
        p = o.count() / o.capacity;
        c.fillRect(w - w / storeW, (1 - p) * h, w / storeW, h);
    }

    /* Draw progress. */
    p = this.thing.getProgress();
    c.fillStyle = Bind.progressStyle;
    c.beginPath();
    c.moveTo(w / 2, h / 2);
    c.arc(w / 2, h / 2, h / 4, 0, Math.PI * 2 * p);
    c.fill();

    c.fillStyle = 'black';
    c.font = 'bold 10pt sans-serif';
    var name = this.thing.name;
    var textW = c.measureText(name).width;
    c.fillText(name, w / 2 - textW / 2, h / 2 + 10 / 2);
};

Bind.prototype.conveyor = function() {
    var w = this.canvas.width, h = this.canvas.height, c = this.ctx;
    var i = this.thing.input, o = this.thing.output;
    c.clearRect(0, 0, w, h);
    c.fillStyle = Bind.conveyStyle;
    var total = this.thing.time;
    var radius = 5;
    var drawW = w - radius * 2;
    this.thing.timers.forEach(function(time) {
        var p = time / total;
        c.beginPath();
        c.arc(radius + (1 - p) * drawW, h / 2, radius, 0, Math.PI * 2);
        c.fill();
    });
    c.strokeStyle = 'gray';
    c.beginPath();
    c.rect(0, h / 2 - radius * 1.5, w, radius * 3);
    c.stroke();
};

Bind.prototype.tick = function() {
    this[this.mode]();
};

Bind.prototype.click = function() {
    if (this.mode === 'conveyor') {
        this.thing.pipeline.capacity++;
    } else if (this.mode === 'industry') {
        this.thing.multiplier++;
    }
};

Bind.industryCanvas = function(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || 96;
    canvas.height = height || 96;
    canvas.className = 'industry';
    return canvas;
};

Bind.conveyorCanvas = function(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || 128;
    canvas.height = height || 96;
    canvas.className = 'conveyor';
    return canvas;
};
