var p_t_1 = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
var p_t = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
var doors = [false, false, false, false, true, false, false, false, false, false];

function updatePlot()
{
    var layout = {
        autosize: true,
        height: 200,
        margin: {
            l: 50,
            r: 50,
            b: 30,
            t: 20,
            pad: 4
        },
    };
    
    var data = [
        {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: p_t,
            type: 'bar',
        }
    ];
    
    PLOT = document.getElementById('plot');
    Plotly.newPlot(PLOT, data, layout);
}

function resetProbabilities()
{
    p_t_1 = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
    p_t = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
    updatePlot();
}

function move(dir)
{
    const line = document.getElementById('line');
    const line_width = parseFloat(getComputedStyle(line).width);

    const robot = document.getElementById("robot");
    let robot_pos = parseFloat(getComputedStyle(robot).left);
    
    const dist_to_move = line_width/10;
    if(dir == 0)
        robot_pos += dist_to_move;
    else if(dir == 1)
        robot_pos -= dist_to_move;

    const ratio = robot_pos/line_width;
    if((ratio > 0.95) || (ratio < 0))
        return;
    
    robot.style.left = robot_pos.toString() + "px";
    applyMotionModel(dir);
    if(document.getElementById("enable_measurement_checkbox").checked)
        applyMeasurementModel();
    normalise();
    p_t_1 = p_t;
    updatePlot()
}

function applyMotionModel(dir)
{
    let i;
    p_t = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    
    if(dir==0)
    {
        for(i = 1; i < p_t.length - 1; i++)
        {
            p_t[i-1] += 0.1*p_t_1[i-1];
            p_t[i] += 0.8*p_t_1[i-1]
            p_t[i+1] += 0.1*p_t_1[i-1];
        }
        p_t[p_t.length - 2] += 0.1*p_t_1[p_t_1.length - 2];
        p_t[p_t.length - 1] += 0.8*p_t_1[p_t_1.length - 2];
    }
    else if(dir==1)
    {
        for(i = 1; i < p_t.length - 1; i++)
        {
            p_t[i-1] += 0.1*p_t_1[i+1];
            p_t[i] += 0.8*p_t_1[i+1]
            p_t[i+1] += 0.1*p_t_1[i+1];
        }
        p_t[0] += 0.8*p_t_1[1];
        p_t[1] += 0.1*p_t_1[1];
    }
}

function applyMeasurementModel()
{
    const robot = document.getElementById("robot");
    let robot_pos = parseFloat(getComputedStyle(robot).left);

    const door = document.getElementById("door");
    let door_pos = parseFloat(getComputedStyle(door).left);

    const threshold = 5;
    let i;
    if(Math.abs(robot_pos-door_pos) < threshold)
    {
        // I see a door
        for(i = 0; i < p_t.length; i++)
        {
            if(doors[i])
                p_t[i] *= 0.9;
            else
                p_t[i] *= 0.1;
        }
    }
    else
    {
        // I see a wall
        for(i = 0; i < p_t.length; i++)
        {
            if(doors[i])
                p_t[i] *= 0.1;
            else
                p_t[i] *= 0.9;
        }
    }
}

function normalise()
{
    let i;
    let sum = 0.0;
    for(i = 0; i < p_t.length; i++)
        sum += p_t[i];
    
    for(i = 0; i < p_t.length; i++)
        p_t[i] /= sum;
}