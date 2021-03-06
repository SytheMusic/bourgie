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
