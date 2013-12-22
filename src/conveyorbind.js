function ConveyorBind(thing, $div) {
    var _this = this;
    this.thing = thing;

    $div.addClass('conveyor');

    var canvas = ConveyorBind.makeCanvas(),
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

ConveyorBind.prototype.thingType = 'BIND';

ConveyorBind.conveyStyle = '#44f';

ConveyorBind.prototype.clear = function() {
    var w = this.ctx.canvas.width, h = this.ctx.canvas.height, c = this.ctx;
    c.clearRect(0, 0, w, h);
};

ConveyorBind.prototype.render = function() {
    var w = this.ctx.canvas.width, h = this.ctx.canvas.height, c = this.ctx;
    var i = this.thing.input, o = this.thing.output;
    c.clearRect(0, 0, w, h);
    c.fillStyle = ConveyorBind.conveyStyle;
    var total = this.thing.time;
    var radius = 5;
    var drawW = w + radius * 4;
    this.thing.timers.forEach(function(time) {
        var p = time / total;
        c.beginPath();
        c.arc((1 - p) * drawW - 2 * radius, h / 2, radius, 0, Math.PI * 2);
        c.fill();
    });
    c.strokeStyle = 'gray';
    c.beginPath();
    c.rect(0, h / 2 - radius * 1.5, w, radius * 3);
    c.stroke();
};

ConveyorBind.prototype.tick = function() {
    this.render();
};

ConveyorBind.prototype.hire = function() {
    this.thing.hire();
};

ConveyorBind.prototype.upgrade = function() {
    this.thing.upgrade();
};

ConveyorBind.makeCanvas = function(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || 128;
    canvas.height = height || 96;
    canvas.className = 'building';
    return canvas;
};
