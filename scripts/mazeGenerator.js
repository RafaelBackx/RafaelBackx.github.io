let clearMazebutton = document.querySelector('input[type="button"][value="reset maze generator"]');
clearMazebutton.addEventListener('click',clearmaze,false);
let canvas = document.getElementById("mazegenerator");
let ctx = canvas.getContext('2d');
let grid;
let size = 10;
let rows = Math.floor(canvas.width/size);
let columns = Math.floor(canvas.height/size);
gridsetup(10,10);
let current = grid[0][0];
drawMaze();
current.obstruction=false;
let loopid = setInterval(loop,50)

function gridsetup(){
    grid = []
    for (let r = 0;r<rows;r++){
        grid.push([])
        for (let c = 0; c<columns;c++){
            grid[r].push({'x':r*size,'y':c*size,'visited': false, 'obstruction':true,'color':'#000','parent': null})
        }
    }
}

function drawMaze(){
    for (let r = 0;r<rows;r++){
        for (let c = 0; c<columns;c++){
            let info = grid[r][c];
            let color = info.obstruction ? "#000" : '#FFF';
            if (grid[r][c] === current) color = '#f00';
            ctx.beginPath()
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000';
            ctx.strokeRect(info.x,info.y,size,size);
            ctx.fillStyle = color;
            ctx.fillRect(info.x,info.y,size,size);
            ctx.closePath();
        }
    }
}

function getNeighbours(row,col){
    neighbours = []
    if (row > 1) neighbours.push(grid[row-2][col])
    if (col > 1) neighbours.push(grid[row][col-2])
    if (row < rows -2) neighbours.push(grid[row+2][col])
    if (col < columns -2) neighbours.push(grid[row][col+2])
    return neighbours;
}

function getUnivisitedNeighbours(row,col){
    let neighbours = getNeighbours(row,col);
    let unvisited = [];
    for (let i =0;i<neighbours.length;i++){
        if (neighbours[i].visited === false){
            unvisited.push(neighbours[i]);
        }
    }
    return unvisited;
}

function loop(){
    current.visited = true;
    currentNeighbours = getUnivisitedNeighbours(current.x / size, current.y / size);
    if (currentNeighbours.length === 0){
        current = backTrack(current);
        currentNeighbours = getUnivisitedNeighbours(current.x / size, current.y / size);
    }
    let chosen = currentNeighbours[Math.floor(Math.random()*currentNeighbours.length)];
    removeWalls(current,chosen);
    chosen.parent = current;
    current = chosen;
}

function backTrack(current){
    let neighbours = getUnivisitedNeighbours(current.x/size,current.y/size);
    while (neighbours.length === 0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (current.parent == null){
            clearInterval(loopid);
        }
        drawMaze();
        current = current.parent;
        neighbours = getUnivisitedNeighbours(current.x/size,current.y/size);
    }
    return current;
}

function removeWalls(current,target){
    let x = current.x - target.x;
    let y = current.y - target.y;
    let wall;
    if (x === size*2){// target is on my left
        wall = grid[(current.x-size)/size][current.y/size];
    }
    if (x === -size*2){// target is on my right
        wall = grid[(current.x+size)/size][current.y/size];
    }
    if (y === size*2){// target is above me
        wall = grid[current.x/size][(current.y-size)/size];
    }
    if (y === -size*2){// target is beneath me
        wall = grid[current.x/size][(current.y+size)/size];
    }
    wall.visited = true;
    wall.obstruction = false;
    target.obstruction = false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawMaze();
}

function clearmaze(){
    for (let r=0;r<rows;r++){
        for (let c=0;c<columns;c++){
            grid[r][c] = {'x':r*size,'y':c*size,'visited': false, 'obstruction':true,'color':'#000','parent': null};
        }
    }
    drawMaze();
    loopid = setInterval(loop,50);
}