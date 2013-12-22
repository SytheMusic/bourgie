var Bourgie = Bourgie || {};

var bourgie = null;
Bourgie.demo = function() {
    bourgie = new World($('#world'));
    bourgie.bind(Source.FOREST);
    bourgie.bind(Factory.LUMBER_MILL);
    bourgie.add(Conveyor.simple(Source.FOREST, Factory.LUMBER_MILL));

    bourgie.start();
    bourgie.add({tick: function() {
        console.log('world -> tick');
    }});
};

$(document).ready(function() {
    Bourgie.demo();
});
