function World($div) {
    this.$div = $div;
    this.bank = new Bank();
    this.entities = [];
    this.bindings = [];
    this.timer = null;
    this.time = 0;
}

World.TICKS_PER_SECOND = 20;
World.TICKS_PER_MINUTE = World.TICKS_PER_SECOND * 60;

World.prototype.add = function(thing) {
    if (thing.thingType === 'BIND') {
        this.bindings.push(thing);
    } else {
        this.entities.push(thing);
    }
    return this;
};

World.prototype.tick = function() {
    this.entities.forEach(function(entity) {
        entity.tick();
    });
    this.bindings.forEach(function(binding) {
        binding.tick();
    });
    this.time++;
    this.bank.display();
};

World.prototype.bind = function(thing) {
    var canvas = null, binding = null;
    if (thing.thingType === 'INDUSTRY') {
        canvas = IndustryBind.makeCanvas();
        binding = new IndustryBind(thing, canvas);
    } else if (thing.thingType === 'CONVEYOR') {
        canvas = ConveyorBind.makeCanvas();
        binding = new ConveyorBind(thing, canvas);
    } else {
        throw new Error('Unknown thing type.');
    }
    this.add(binding).add(thing);
    if (this.$div != null) {
        this.$div.append(canvas);
    }
    return binding;
};

World.prototype.start = function() {
    if (this.timer == null) {
        var world = this;
        this.timer = window.setInterval(function() {
            world.tick();
        }, 1000 / World.TICKS_PER_SECOND);
    }
    return this;
};

World.prototype.stop = function() {
    window.clearInterval(this.timer);
    this.timer = null;
    return this;
};
