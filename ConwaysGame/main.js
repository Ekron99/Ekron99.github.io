let gridSize = 100;
let grid = new Array(gridSize);
let cellDimW, cellDimH;
let startButton, stopButton, mouseDown, clearButton;
window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

function setup() {
    createCanvas(1000, 800);
    frameRate(5);
    noLoop();
    cellDimW = width / gridSize;
    cellDimH = height / gridSize;
    background(255);
    createElement("br");
    startButton = createButton("Start");
    startButton.mousePressed(startGame);
    stopButton = createButton("Stop");
    stopButton.mousePressed(stopGame);
    clearButton = createButton("Clear Grid");
    clearButton.mousePressed(clearGrid);
    
    for (let i = 0; i < gridSize; i++) {
        grid[i] = new Array(gridSize);
        for (let n = 0; n < gridSize; n++) {
            grid[i][n] = new Cell(i, n);
        }
    }


}

function draw() {
    background(255);
    //need to optimize this if possible to one loop
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            grid[x][y].getNextUpdate();
        }
    }

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            grid[x][y].update();
            grid[x][y].draw();
        }
    }

}

function clearGrid() {
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            grid[x][y].alive = false;
            grid[x][y].newAliveStatus = false;
            grid[x][y].draw();
        }
    }
}

function startGame() {
    loop();
}

function stopGame() {
    noLoop();
}

function mousePressed() {
    if (mouseX <= width && mouseY <= height) {
        let cell = findCell(mouseX, mouseY);
        if (mouseButton == "left") {
            cell.alive = true;
        } else {
            cell.alive = false;
        }
        cell.draw();
    }
}

function mouseDragged() {
    if (mouseX <= width && mouseY <= height) {
        let cell = findCell(mouseX, mouseY);
        if (mouseButton == "left") {
            cell.alive = true;
        } else {
            cell.alive = false;
        }
        cell.draw();

    }
}

function findCell(inX, inY) {
    let gridX, gridY;
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (x * cellDimW <= inX &&
                x * cellDimW + cellDimW >= inX &&
                y * cellDimH <= inY &&
                y * cellDimH + cellDimH >= inY) {
                return grid[x][y];
            }
        }
    }   
}

class Cell {
    constructor(x, y, alive = false) {
        this.x = x;
        this.y = y;
        this.w = width / grid.length;
        this.h = height / grid.length;
        this.alive = alive;
        this.newAliveStatus = alive;
    }
    
    update() {
        this.alive = this.newAliveStatus;
    }

    getNextUpdate() {
        let neighbors = this.getNeighbors();
        if (this.alive) {
            //alive cell
            if (neighbors < 2) {
                //underpopulation
                this.newAliveStatus = false;
            } else if (neighbors === 2 || neighbors === 3) {
                this.newAliveStatus = true;
            } else {
                //overpopulation
                this.newAliveStatus = false;
            }
        } else {
            //dead cell
            if (neighbors === 3) {
                this.newAliveStatus = true;  
            }
        }
    }

    draw() {
        if (this.alive) {
            noStroke();
            fill(0);
            rect(this.x * this.w, this.y * this.h, this.w - 1, this.h - 1);
        } else {
            noStroke();
            fill(150);
            rect(this.x * this.w, this.y * this.h, this.w - 1, this.h - 1);
        }
    }

    getNeighbors() {
        let count = 0;

        if (this.x < grid.length - 1 && grid[this.x + 1][this.y].alive) {
            //east
            count++;
        } 
        if (this.x > 0 && grid[this.x - 1][this.y].alive) {
            //west
            count++;
        } 
        if (this.x < grid.length - 1 && this.y < grid.length - 1 && grid[this.x + 1][this.y + 1].alive) {
            //south east
            count++;
        } 
        if (this.x < grid.length - 1 && this.y > 0 && grid[this.x + 1][this.y - 1].alive) {
            //north east
            count++;
        } 
        if (this.y < grid.length - 1 && this.y < grid.length - 1 && grid[this.x][this.y + 1].alive) {
            //south
            count++;
        } 
        if (this.y > 0 && grid[this.x][this.y - 1].alive) {
            //north
            count++;
        } 
         if (this.x > 0 && this.y < grid.length - 1 && grid[this.x - 1][this.y + 1].alive) {
            //south west
            count++;
        } 
         if (this.x > 0 && this.y > 0 && grid[this.x - 1][this.y - 1].alive) {
            //north west
            count++;
        } 

        return count;
    }

}