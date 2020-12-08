/**
 * @module gui
 * @author: Zhang Chao
 * @since: 2020-05-24 22:06:26
 */

'use strict';

var options = {
    Background: '#0A0A0A',
    Color1: '#FF3054',
    Color2: '#4614E9',
    Range: 50,
    Speed: 25,
    Counts: 1000,
    Size: 5,
    Direction: 'Center-Outward',

    Random: function () {
        var Color1 = random(['#3370ff', '#ff3389', '#27ff6e', '#27f7ff']);
        color1Control.setValue(Color1);

        var Color2 = random(['#3370ff', '#ff3389', '#27ff6e', '#27f7ff']);
        color2Control.setValue(Color2);

        var speed = random(10, 30);
        speedControl.setValue(speed);

        var range = random(100);
        RangeControl.setValue(range);

        var points = random(300, 2000);
        PointsControl.setValue(points);

        var Size = random(1, 10);
        SizeControl.setValue(Size);

        var Direction = random(['Center-Outward', 'Center-Inward', 'Left', 'Right', 'Up', 'Down']);
        DirControl.setValue(Direction);

    },

    Generate: function () {
        console.log(options);
        setup();
    },

    Add: function () {
        add();
    },

    Save: function () {
        saveFrames("Star-Emission", "png", 1, 1);
    }

}

var gui, BgControl, BgColor, color1Control, color2Control, speedControl, PointsControl, RangeControl,
    SizeControl, DirControl, RangeControl, RandomControl, GenerateControl, AddControl, SaveControl;
window.onload = function () {
    gui = new dat.GUI();

    let folder = gui.addFolder('Controls');

    BgControl = folder.addColor(options, 'Background');
    // BgControl.onChange(draw);

    color1Control = folder.addColor(options, 'Color1');
    // color1Control.onChange(draw);

    color2Control = folder.addColor(options, 'Color2');
    // color2Control.onChange(draw);

    RangeControl = folder.add(options, 'Range', 0, 400);
    // RangeControl.onChange(draw);

    speedControl = folder.add(options, 'Speed', 10, 40);
    // speedControl.onChange(setup);

    PointsControl = folder.add(options, 'Counts', 100, 4000);
    // PointsControl.onChange(setup);

    SizeControl = folder.add(options, 'Size', 1, 15);
    // SizeControl.onChange(setup);

    DirControl = folder.add(options, 'Direction', ['Center-Outward', 'Center-Inward', 'Left', 'Right', 'Up',
        'Down'
    ]);
    // DirControl.onChange(setup);

    RandomControl = folder.add(options, 'Random');

    GenerateControl = folder.add(options, 'Generate');

    AddControl = folder.add(options, 'Add')

    SaveControl = folder.add(options, 'Save');

    folder.open();
};

function add() {
    options.add = '#FF3054';
    let folder = gui.addFolder('Controls-1');
    folder.addColor(options, 'add');
}

function component2hex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgb2hex(r, g, b) {
    /**
     * Convert rgb to hex
     */
    return "#" + component2hex(r) + component2hex(g) + component2hex(b);
}

function hex2rgb(hex) {
    /**
     * Convert hex to rgb
     */
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}