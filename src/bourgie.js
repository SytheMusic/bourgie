var Bourgie = Bourgie || {};

var bourgie = null;
Bourgie.demo = function() {
    bourgie = new World($('#world'));
    var forest = Source.FOREST.clone();
    var lumber = Factory.LUMBER_MILL.clone();
    var truck = Sink.LUMBER_TRUCK.clone(bourgie.bank);

    bourgie.bind(forest);
    bourgie.bind(lumber);
    bourgie.add(Conveyor.simple(forest, lumber));

    bourgie.bind(truck);
    bourgie.add(Conveyor.simple(lumber, truck));

    bourgie.start();
    bourgie.add({tick: function() {
        console.log('world -> tick');
    }});
};

$(document).ready(function() {
    Bourgie.demo();
});
