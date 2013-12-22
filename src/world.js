function World() {
    this.bank = new Bank();
    this.entities = [];
}

World.TICKS_PER_SECOND = 20;
World.TICKS_PER_MINUTE = World.TICKS_PER_SECOND * 60;

World.prototype.tick = function() {
    this.entities.forEach(function(entity) {
        entity.tick();
    });
};
