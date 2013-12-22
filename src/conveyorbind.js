function ConveyorBind(thing, canvas) {
    this.thing = thing;
    this.$canvas = $(canvas);
    this.ctx = canvas.getContext('2d');
    if (thing.thingType === 'CONVEYOR') {
        this.mode = 'conveyor';
    } else if (thing.thingType === 'INDUSTRY') {
        this.mode = 'industry';
    } else {
        throw new Error('Unknown thing type.');
    }
    var _this = this;
    this.$canvas.on('click', function() {
        _this.click();
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

ConveyorBind.prototype.tick = function() {
    this.render();
};

ConveyorBind.prototype.click = function() {
    this.thing.pipeline.capacity++;
};

ConveyorBind.makeCanvas = function(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || 128;
    canvas.height = height || 96;
    canvas.className = 'conveyor';
    return canvas;
};
