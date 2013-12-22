function IndustryBind(thing, $div) {
    var _this = this;
    this.thing = thing;

    $div.addClass('industry');

    var canvas = IndustryBind.makeCanvas(),
        $canvas = $(canvas);
    $div.append($canvas);
    this.ctx = canvas.getContext('2d');

    var $hire = $('<div/>').attr({
        'class': 'button hire'
    }).text('Hire');
    $div.append($hire);

    var $upgrade = $('<div/>').attr({
        'class': 'button upgrade'
    }).text('Upgrade');
    $div.append($upgrade);

    $hire.on('click', function() {
        _this.hire();
    });
    $upgrade.on('click', function() {
        _this.upgrade();
    });
}

IndustryBind.prototype.thingType = 'BIND';

IndustryBind.storeStyle = '#44f';
IndustryBind.progressStyle = '#ddd';

IndustryBind.prototype.clear = function() {
    var w = this.ctx.canvas.width, h = this.ctx.canvas.height, c = this.ctx;
    c.fillStyle = this.thing.style || 'lightgray';
    c.fillRect(0, 0, w, h);
};

IndustryBind.prototype.render = function() {
    var w = this.ctx.canvas.width, h = this.ctx.canvas.height, c = this.ctx;
    var i = this.thing.input, o = this.thing.output;
    var storeW = 6;
    var p = 0;
    this.clear();

    /* Draw stores. */
    c.fillStyle = IndustryBind.storeStyle;
    if (i != null) {
        p = i.count() / i.capacity;
        c.fillRect(0, (1 - p) * h, w / storeW, h);
    }
    if (o != null) {
        p = o.count() / o.capacity;
        c.fillRect(w - w / storeW, (1 - p) * h, w / storeW, h);
    }

    /* Draw progress. */
    var pi = Math.PI, sin = Math.sin, pow = Math.pow;
    p = this.thing.getProgress();
    c.fillStyle = IndustryBind.progressStyle;
    c.beginPath();
    c.moveTo(w / 2, h / 2);
    var r = pow(sin(pi * p), 0.3) - sin(pi * p) * 0.45;
    c.arc(w / 2, h / 2, r * h / 2, 0, pi * 2 * p);
    c.fill();

    c.fillStyle = 'black';
    c.font = 'bold 10pt sans-serif';
    var name = this.thing.name;
    var textW = c.measureText(name).width;
    c.fillText(name, w / 2 - textW / 2, h / 2 + 10 / 2);
};

IndustryBind.prototype.tick = function() {
    this.render();
};

IndustryBind.prototype.hire = function() {
    this.thing.hire();
};

IndustryBind.prototype.upgrade = function() {
    this.thing.upgrade();
};

IndustryBind.makeCanvas = function(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || 96;
    canvas.height = height || 96;
    canvas.className = 'building';
    return canvas;
};
