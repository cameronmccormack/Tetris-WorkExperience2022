let score = 0;
const BLOCKS = [
    {
        matrix:[[0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]],
        colour:"red",
        name: "I-Piece"
    },{
        matrix:[[1,0,0],
                [1,1,1],
                [0,0,0]],
        colour:"orange",
        name: "J-Piece"
    },{
        matrix:[[0,0,1],
                [1,1,1],
                [0,0,0]],
        colour:"yellow",
        name: "L-Piece"
    },{
        matrix:[[1,1,0],
                [0,1,1],
                [0,0,0]],
        colour:"green",
        name: "Z-Piece"
    },{
        matrix:[[0,1,1],
                [1,1,0],
                [0,0,0]],
        colour:"blue",
        name: "S-Piece"
    },{
        matrix:[[0,1,0],
                [1,1,1],
                [0,0,0]],
        colour:"purple",
        name: "T-Piece"
    },{
        matrix:[[0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0]],
        colour: "brown",
        name: "O-Piece"
    }
    
]

// gridMatrix is represented as either 0 or the colour
let gridMatrix = [];
let numberofblocks = 0;
let isGameOver = false;
let block = generateBlock();
let nextBlock = generateBlock();
let raf = null;//lets us cancel whatever frame the game ends on
let timer = 0;
let counter = 0;
const mainGameCanvas = document.getElementById("grid"); //assuming they use a canvas for the grid 
const mainGameContext = mainGameCanvas.getContext('2d');
const mainGameBlockSize = 32;
let time = "";

//make an empty grid
for (let row = 0; row < 20; row++) {
    gridMatrix[row] = [];
    for (let col = 0; col < 10; col++) {
        gridMatrix[row][col] = 0;
    }
}


// rotate a block matrix 90deg
function rotateRight(matrix) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
}

// rotate a block matrix -90deg
function rotateLeft(matrix) {
    return matrix[0].map((val, index) => matrix.map(column => column[index]).reverse());
}

// generate colour and block randomly
// returns (blockMatrix, colour)
function generateBlock() {
    let randomBlockIndex = Math.round(Math.random() * 6);//random number from 0 to 6 to determine which block will be generated    
    let randomBlock = BLOCKS[randomBlockIndex];
    
    let startingRow = -1;//maybe change these depending on the type of block to make sure it is centred
    let startingColumn = 5;

    return {
        matrix: randomBlock.matrix,
        colour: randomBlock.colour,
        row: startingRow,
        col: startingColumn
    }
}


//checks whether the block will be outside grid bounds or whether it will collide with an occupied square
function isMoveValid(matrix, blockRow, blockCol) {//matrix is the block. the other two are the row and column values in the grid for the block
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && //if there is a 1
                (col + blockCol < 0 ||  //if the column is on the left edge
                col + blockCol >= gridMatrix[0].length || //if it is on the right edge
                blockRow + row >= gridMatrix.length || //if it is at the bottom
                gridMatrix[blockRow + row][blockCol + col])) {//if there is another occupied square
                return false;
            }
        }
    }
    return true;
}

function game() {
    // console.log("game called");
    raf = requestAnimationFrame(game);
    mainGameContext.clearRect(0,0,mainGameCanvas.width, mainGameCanvas.height);//clear canvas
    
    // draw the initial grid without the block that is currently in play
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (gridMatrix[row][col] != 0) {
                // if the cell is empty, 
                mainGameContext.fillStyle = gridMatrix[row][col];//drawing the grid
                //              (posx,      posy,       sizex, sizey)
                mainGameContext.fillRect(col * mainGameBlockSize, row * mainGameBlockSize, mainGameBlockSize - 0.5, mainGameBlockSize - 0.5);
                // console.log("drawn");
            }
        }
    }

    if (++counter > getFramesUntilMoveDown(numberofblocks)) {// every given frames, block to moves down. 
        counter = 0; 
        block.row++; 

        if (!isMoveValid(block.matrix, block.row, block.col)) {//if it has hit anything, we force it to be placed in that location. 
            block.row--;
            setBlock();
        }
    }

    // draw the block that is in play here. 
    mainGameContext.fillStyle = block.colour;

    for (let row = 0; row < block.matrix.length; row++) {
        for (let col = 0; col < block.matrix[row].length; col++) {
            if (block.matrix[row][col] != 0) {
                mainGameContext.fillRect(mainGameBlockSize * (col + block.col), mainGameBlockSize * (block.row + row), mainGameBlockSize - 0.5, mainGameBlockSize - 0.5);
            }
        }

    }
}

function getFramesUntilMoveDown(numberOfBlocks) {
    //you can edit the rate of speed increase here (increases as number of blocks increase)
    let maxframes = 40; //starting speed
    let minframes = 5; //fastest speed
    let multiplier = 0.5; //rate of speedup
    let newframes = Math.ceil(maxframes - (numberOfBlocks*numberOfBlocks*multiplier))
    if (newframes < minframes){
        console.log(newframes)
        return minframes;
    }
    
    return newframes; 

}

//checking if there is a full row of completed squares from the bottom up.
function checkForLines() {
    let lineCounter = 0;
    //we start checking from the bottom and work our way up
    for (let i = 19; i >= 0; i--) {
        let zeroPresent = false;
        for (let j = 0; j < 10; j++) {
            if (gridMatrix[i][j] === 0)
                zeroPresent = true;
        }
        if (!zeroPresent) {//shifting the rows down if there is a full line
            lineCounter++;
            for (let row = i; row > 0; row--) {
                for (let col = 0; col < 10; col++) {
                    gridMatrix[row][col] = gridMatrix[row - 1][col];
                }
            }
            for (let k = 0; k < 10; k++) {
                gridMatrix[0][k] = 0;
            }
            i++;
        }
    }
    scoring(lineCounter);
}

function scoring(count) {
    switch (count) {
        case 1: score += 40; break;
        case 2: score += 100; break;
        case 3: score += 300; break;
        case 4: score += 1200; break;
        default: break;
    }
}

//when the block has collided, then the block is set onto the grid. the grid matrix of the game is altered and a new block is created ready for the next game loop.
function setBlock() {
    let matrix = block.matrix;
    let blockRow = block.row;
    let blockCol = block.col;
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        // for each cell:
        for (let cellIndex = 0; cellIndex < matrix[rowIndex].length; cellIndex++) {
            // cellIndex represents the relative y positioning of a cell
            // get actual cell
            let cell = matrix[rowIndex][cellIndex];

            if (cell) {
                if (block.row + rowIndex < 0) {
                    return endGame();
                }
                // set the cell at position to the grid's colour
                gridMatrix[rowIndex + blockRow][cellIndex + blockCol] = block.colour;
            }
        }
    }
    numberofblocks++;
    checkForLines();
    console.log(score);
    block = nextBlock;
    nextBlock = generateBlock();
}

document.addEventListener( 'keydown' , e => {
    if (isGameOver) return;
    console.log("code", e.code);

    if (e.code === "ArrowLeft") {//left
        const tempCol = block.col - 1;
        if (isMoveValid(block.matrix, block.row, tempCol)) {
            block.col = tempCol;
        }
    }

    if (e.code === "ArrowRight") {//right
        const tempCol = block.col + 1;
        if (isMoveValid(block.matrix, block.row, tempCol)) {
            block.col = tempCol;
        }
    }

    if (e.code === "ArrowUp") {//shift and up to rotate left, only up to rotate right.
        const tempMatrix = (e.shiftKey) ? rotateLeft(block.matrix) : rotateRight(block.matrix);
        if (isMoveValid(tempMatrix, block.row, block.col)) {
            block.matrix = tempMatrix;
        }
    }

    if (e.code === "ArrowDown") {//down
        const tempRow = block.row + 1;
        if (!isMoveValid(block.matrix, tempRow, block.col)) {
            setBlock();
        } else {
            block.row = tempRow;
        }
    }

    //TODO implement hard drop
    // if (e.code === "Space") {//spacebar 
    //     const tempRow = block.row + 1;
    //     if (!isMoveValid(block.matrix, tempRow, block.col)) {
    //         setBlock();
    //     } else {
    //         block.row = tempRow;
    //     }
    // }
})

function endGame() {
    isGameOver = true;
    cancelAnimationFrame(raf);
    //TODO: api post request to send the final score (maybe time) and call to the game over page.
    fetch(
        "/submitScore", {
            method: 'POST',
            body: JSON.stringify({
                "score": score,
                "seconds": timer,
                "timeString": time,
            })
        }
    );
    window.open(`gameOver?score=${score}&seconds=${timer}&timeString=${time}`, "_self");
}

// loop to increment timer
function incrementTimer() {
    setTimeout(function() {
        timer++;
        time = formatTime(timer);
        console.log(time);
        incrementTimer();
    }, 1000);
}

// format time (in seconds) to a readable string
function formatTime(timer) {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    let minutes_s = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    let seconds_s = (seconds < 10) ? `0${seconds}` : `${seconds}`;
    
    return `${minutes_s}:${seconds_s}`;
}

//running the game.
raf = requestAnimationFrame(game);
incrementTimer();