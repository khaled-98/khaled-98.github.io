var offset = [0,0];
var line;
class Robot
{
    constructor(robot_id, robot_center_id, robot_edge_id)
    {
        this.robot = document.getElementById(robot_id);
        this.robot_center = document.getElementById(robot_center_id);
        this.robot_edge = document.getElementById(robot_edge_id);
        this.is_robot_center_down = false;
        this.is_robot_edge_down = false;

        // Event listeners
        var self = this;
        this.robot_center.addEventListener('mousedown', function(e) {
            self.is_robot_center_down = true;
            offset = [
                self.robot.offsetLeft - e.clientX,
                self.robot.offsetTop - e.clientY
            ];
        }, true);

        this.robot_edge.addEventListener('mousedown', function(e) {
            self.is_robot_edge_down = true;
        }, true);
    }
}

let robot_before = new Robot("before", "before_center", "before_edge")
let robot_after = new Robot("after", "after_center", "after_edge");

document.addEventListener('mouseup', function() {
    robot_before.is_robot_center_down = false;
    robot_before.is_robot_edge_down = false;
    robot_after.is_robot_center_down = false;
    robot_after.is_robot_edge_down = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    const mousePosition = {
        x : event.clientX,
        y : event.clientY
    };
    if (robot_before.is_robot_center_down) 
    {  
        robot_before.robot.style.left = (mousePosition.x + offset[0]) + 'px';
        robot_before.robot.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
    else if (robot_before.is_robot_edge_down)
    {
        const box = robot_before.robot.getBoundingClientRect();
        const centerX = box.left + box.width/2 - window.pageXOffset;
        const centerY = box.top + box.height/2 - window.pageYOffset;
        const rad = Math.atan2(event.clientX-centerX, event.clientY-centerY);
        const deg = rad*(180/Math.PI)*-1 + 180;
        rotateElement(robot_before.robot, deg)
    }

    else if (robot_after.is_robot_center_down) 
    {
        robot_after.robot.style.left = (mousePosition.x + offset[0]) + 'px';
        robot_after.robot.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
    else if (robot_after.is_robot_edge_down)
    {
        const box = robot_after.robot.getBoundingClientRect();
        const centerX = box.left + box.width/2 - window.pageXOffset;
        const centerY = box.top + box.height/2 - window.pageYOffset;
        const rad = Math.atan2(event.clientX-centerX, event.clientY-centerY);
        const deg = rad*(180/Math.PI)*-1 + 180;
        rotateElement(robot_after.robot, deg)
    }
    
    const before_box = robot_before.robot.getBoundingClientRect()
    x1 = before_box.left + before_box.width/2 - 7.5;
    y1 = before_box.top + before_box.height/2 - 7.5;
    const after_box = robot_after.robot.getBoundingClientRect()
    x2 = after_box.left + after_box.width/2 - 7.5;
    y2 = after_box.top + after_box.height/2 - 7.5;
    line.plot(x1, y1, x2, y2);
}, true);

function rotateElement(elem, deg)
{
    elem.style.webkitTransform = 'rotate('+deg+'deg)'; 
    elem.style.mozTransform    = 'rotate('+deg+'deg)';
    elem.style.msTransform     = 'rotate('+deg+'deg)';
    elem.style.oTransform      = 'rotate('+deg+'deg)';
    elem.style.transform       = 'rotate('+deg+'deg)';
}

function drawLine()
{
    var draw = SVG().addTo('body').size(1000, 1000)
    line = draw.line(50, 51, 194, 51)
    line.stroke({ color: 'black', width: 2, linecap: 'round' })
    // arc = draw.path(f_svg_ellipse_arc([50,50],45,[-Math.PI/2,Math.PI/2],0));
    // arc.fill('none');
    // arc.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' });
}