var offset = [0,0];
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
}, true);

function rotateElement(elem, deg)
{
    elem.style.webkitTransform = 'rotate('+deg+'deg)'; 
    elem.style.mozTransform    = 'rotate('+deg+'deg)';
    elem.style.msTransform     = 'rotate('+deg+'deg)';
    elem.style.oTransform      = 'rotate('+deg+'deg)';
    elem.style.transform       = 'rotate('+deg+'deg)';
}