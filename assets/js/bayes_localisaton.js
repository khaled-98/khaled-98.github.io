function moveRight(dir) {
    const line = document.getElementById('line');
    const line_width = parseFloat(getComputedStyle(line).width);

    const robot = document.getElementById("robot");
    let robot_pos = parseFloat(getComputedStyle(robot).left);
    
    const dist_to_move = line_width/10.5;
    if(dir == 0)
        robot_pos += dist_to_move;
    else if(dir == 1)
        robot_pos -= dist_to_move;

    const ratio = robot_pos/line_width;
    if((ratio > 0.95) || (ratio < 0.05))
        return;
    robot.style.left = robot_pos;
}