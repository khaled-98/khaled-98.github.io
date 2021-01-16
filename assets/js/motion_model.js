var mousePosition;
var offset = [0,0];

var isBeforeDown = false;
var before_circle = document.getElementById('before');
before_circle.style.left = '0px'

var isAfterDown = false;
var after_circle = document.getElementById('after');
var after_circle_center = document.getElementById('after_center');
var after_circle_edge = document.getElementById('after_edge');
after_circle.style.left = '150px'

// var draw = SVG().addTo('body')


// draw pink square
// var line = draw.line(0, 0, 100, 150).stroke({ width: 1 })
// line.stroke({ color: 'black', width: 5, linecap: 'round'})
// line.plot(50, 50, 100, 100)

// var x1 = before_circle.style.left + (before_circle.style.width/2);
// var y1 = before_circle.style.offset.top + (before_circle.style.height/2);
// var x2 = after_circle.style.offset.left + (after_circle.style.width/2);
// var y2 = after_circle.style.offset.top + (after_circle.style.height/2);
// console.log(before_circle.contentDocument)

// before_circle.addEventListener('mousedown', function(e) {
//     isBeforeDown = true;
//     offset = [
//         before_circle.offsetLeft - e.clientX,
//         before_circle.offsetTop - e.clientY
//     ];
// }, true);

after_circle_center.addEventListener('mousedown', function(e) {
    isAfterDown = true;
    offset = [
        after_circle.offsetLeft - e.clientX,
        after_circle.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isBeforeDown = false;
    isAfterDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isBeforeDown) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        before_circle.style.left = (mousePosition.x + offset[0]) + 'px';
        before_circle.style.top  = (mousePosition.y + offset[1]) + 'px';
    }

    else if (isAfterDown) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        after_circle.style.left = (mousePosition.x + offset[0]) + 'px';
        after_circle.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);