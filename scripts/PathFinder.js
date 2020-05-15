let clearPathfinderbutton = document.querySelector('input[type="button"][value="reset pathfinder"]');
clearPathfinderbutton.addEventListener('click',clearpathfinder,false);
cnv = document.getElementById('pathfinder');
context = cnv.getContext('2d');
canvasboundings = cnv.getBoundingClientRect();
let opencolor = '#e94949';
let pathcolor = '#4744eb';
let obstructionColor = "#000";
let maze = []
let open =[]
let closed =[]
let mousedown = false;
let width = 10;
let rowz = Math.floor(cnv.height/width);
let cols = Math.floor(cnv.width/width);
mazeSetup();
let start = maze[0][0];
start.obstruction = false;
start.color = '#0f0';
let end = maze[rowz-1][cols-1];
end.obstruction = false;
end.color = '#f00'
draw();
open.push(start);
let astarid = setInterval(astar,50);

function mazeSetup(){
    for (r=0;r<rowz;r++){
        maze.push([])
        for (c=0;c<cols;c++){
            maze[r].push({'x':c*width,'y':r*width,'f':0,'g':0,'h':0,'obstruction':false,'color':'#FFF','parent':null})
        }
    }
    generateRandomObstruction(0.35);
}

function generateRandomObstruction(percentage){
    for (r=0;r<rowz;r++){
        for (c=0;c<cols;c++){
            let rnd = Math.random();
            if (rnd < percentage){
                maze[r][c].obstruction = true;
                maze[r][c].color = obstructionColor;
            }
        }
    }
}

function draw(){
    context.clearRect(0,0,cnv.width,cnv.height);
    for (r=0;r<rowz;r++){
        for (c=0;c<cols;c++){
            let tile = maze[r][c];
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = '#000';
            context.strokeRect(tile.x,tile.y,width,width);
            context.fillStyle = tile.color;
            context.fillRect(tile.x,tile.y,width,width);
            context.closePath();
        }
    }
}

function astar(){
    if (open.length > 0){
        let current = getmin(open);
        if (current === end){
            traceback(current);
            clearInterval(astarid);
        }
        closed.push(current);
        open = open.filter(elem => elem != current);
        let neighbours = getNeighboursAstar(current.y/width,current.x/width);
        for (let i = 0 ;i<neighbours.length;i++){
            let n = neighbours[i];
            if (!closed.includes(n) && !n.obstruction){
                let newGscore = n.g + 1;
                if (open.includes(n)){
                    if (newGscore < n.g){
                        n.parent = current;
                        n.g = newGscore;
                    }
                }else{
                    if (n.parent === null){
                        n.parent = current;
                    }
                    n.g = newGscore;
                    open.push(n);
                    if (n != end){
                        n.color = opencolor;
                    }
                }
                n.h = calculateDistance(n,end);
                n.f = n.h + n.g;
            }
        }
    }else{
        clearInterval(astarid)
    }
    draw()
}

function traceback(current){
    let path = [];
    while(current.parent != start){
        current.parent.color = pathcolor;
        path.push(current.parent);
        current = current.parent;
    }
    draw();
    return path;
}

function calculateDistance(target,end){
    let deltax = target.x - end.x;
    let deltay = target.y - end.y;
    return Math.sqrt((deltax*deltax) + (deltay*deltay))
}

function getmin(list){
    let index = 0;
	for (let i = 1; i < list.length; i++) {
		if (list[i].f < list[index].f) {
			index = i;
		}
	}
	return list[index];
}

function getNeighboursAstar(row,col){
    let astarneighbours = []
    for (let x = -1;x<2;x++){
        for (let y = -1;y<2;y++){
            if (col + x >= 0 && col + x < cols) {
				if (row + y >= 0 && row + y < rowz) {
					if (maze[row + y][col + x] != maze[row][col]) {
						astarneighbours.push(maze[row + y][col + x])
					}
				}
			}
        }
    }
    return astarneighbours;
}

function clearpathfinder(){
    clearInterval(astarid);
    for (r=0;r<rowz;r++){
        for (c=0;c<cols;c++){
            maze[r][c] = {'x':c*width,'y':r*width,'f':0,'g':0,'h':0,'obstruction':false,'color':'#FFF','parent':null};
        }
    }
    generateRandomObstruction(0.35);
    start = maze[0][0];
    start.obstruction = false;
    start.color = '#0f0';
    end = maze[rowz-1][cols-1];
    end.obstruction = false;
    end.color = '#f00'
    open = [];
    closed = [];
    open.push(start);
    draw();
    astarid = setInterval(astar,50);
}