var Bourgie = Bourgie || {};

var bourgie = null;
Bourgie.demo = function() {
    bourgie = new World($('#world'));
    var forest = Source.FOREST.clone();
    var lumber = Factory.LUMBER_MILL.clone();
    var truck = Sink.LUMBER_TRUCK.clone(bourgie.bank);
    var f2l = Conveyor.simple(forest, lumber);
    var l2t = Conveyor.simple(lumber, truck);

    bourgie.bind(forest);
    bourgie.bind(f2l);
    bourgie.bind(lumber);
    bourgie.bind(l2t);
    bourgie.bind(truck);

    bourgie.start();
};

$(document).ready(function() {
    Bourgie.demo();
});
