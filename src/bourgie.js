function Bourgie(div) {
    this.world = new World(div == null ? $('#world') : div);
}

Bourgie.prototype.bind = function(thing, $div) {
    var canvas = null, binding = null;
    if (thing.thingType === 'INDUSTRY') {
        binding = new IndustryBind(thing, $div);
    } else if (thing.thingType === 'CONVEYOR') {
        binding = new ConveyorBind(thing, $div);
    } else {
        throw new Error('Unknown thing type.');
    }
    this.world.add(thing).add(binding);
    return binding;
};

Bourgie.prototype.start = function() {
    this.world.start();
    return this;
};

Bourgie.prototype.stop = function() {
    this.world.start();
    return this;
};

var bourgie = null;
Bourgie.demo = function() {
    bourgie = new Bourgie();
    var forest = Source.FOREST.clone();
    var lumber = Factory.LUMBER_MILL.clone();
    var truck = Sink.LUMBER_TRUCK.clone(bourgie.world.bank);
    var f2m = Conveyor.simple(forest, lumber);
    var m2t = Conveyor.simple(lumber, truck);

    bourgie.bind(forest, $('#forest'));
    bourgie.bind(f2m, $('#f2m'));
    bourgie.bind(lumber, $('#lumber-mill'));
    bourgie.bind(m2t, $('#m2t'));
    bourgie.bind(truck, $('#lumber-trucks'));

    bourgie.start();
};

$(document).ready(function() {
    Bourgie.demo();
});
