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
    }
]

// gridMatrix is represented as either 0 or the colour
let gridMatrix = [];
let over = false;
let block = generateBlock();
let raf = null;
let counter = 0;
const canvas = document.getElementById("grid"); //assuming they use a canvas for the grid 
const context = canvas.getContext('2d');
const size = 64;


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
    let randomBlock = Math.round(Math.random() * 6);//random number from 0 to 6 to determine which block will be generated

    let startingRow = -1;//maybe change these depending on the type of block to make sure it is centred
    let startingColumn = 5;
    
    return {
        name: BLOCKS[randomBlock].name,
        matrix: BLOCKS[randomBlock].matrix,
        colour: BLOCKS[randomBlock].colour,
        row: startingRow,
        col: startingColumn
    }
}


//checks whether the block will be outside grid bounds or whether it will collide with an occupied square
function isMoveValid(matrix, blockRow, blockCol) {//matrix is the block. the other two are the row and column values in the grid for the block
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && //if there is a 1
                (col + blockCol < 0 || 
                col + blockCol >= gridMatrix[0].length || 
                blockRow + row >= gridMatrix.length || 
                gridMatrix[blockRow + row][blockCol + col])) {
                return false;
            }
        }
    }
    return true;
}

// Determine whether a move is valid on a given grid (alternative function)
// Parameters:
//  gridMatrix:  current grid matrix
//  blockMatrix: The current block matrix (with rotation transformation)
//  blockPosition: (x, y) coordinate of where the block is positioned
function isMoveValid2(blockMatrix, blockPosition) {
    for (var rowIndex = 0; rowIndex < blockMatrix.length; rowIndex++) {
        // rowIndex represents the relative x positioning of a cell
        // get actual row
        var row = blockMatrix[rowIndex];

        // for each cell:
        for (var cellIndex = 0; cellIndex < row.length; cellIndex++) {
            // cellIndex represents the relative y positioning of a cell
            // get actual cell
            var cell = row[cellIndex];

            if (cell != 0) {
                // find the position of the cell on the grid
                // based on the blockPosition paramater and its position relative
                // to the block
                var cellPos = [
                    blockPosition[0] + cellIndex,
                    blockPosition[1] + rowIndex
                ];

                // check if out of bounds
                if (
                    !(((0 >= cellPos[0] >= 10)) && (0 >= cellPos[1] >= 20))
                ) {
                    return false;
                }
                
                var cellOnGrid = gridMatrix[cellPos[0]][cellPos[1]];

                if (cellOnGrid != 0) {
                    return false;
                }
            }
        }
    }

    // if none of the true cells have a 1 there, the move is valid
    return true;
}
function game() {
    console.log("game called");
    raf = requestAnimationFrame(game);
    context.clearRect(0,0,canvas.width, canvas.height);//clear canvas
    
    // draw the initial grid without the block that is currently in play
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (gridMatrix[row][col] != 0) {
                // if the cell is empty, 
                context.fillStyle = gridMatrix[row][col];//TODO: finish making the code to draw the grid here. 
                //              (posx,      posy,       sizex, sizey)
                context.fillRect(col * size, row * size, grid, grid);
            }
        }
    }

    if (++counter > 25) {//every 25 frames we force the block to move down. 
        counter = 0; 
        block.row++;


        if (!isMoveValid(block.matrix, block.row, block.col)) {//if it has hit anything, we force it to be placed in that location. 
            block.row--;
            setBlock();
        }
    }

    //TODO: draw the block that is in play here. 
    context.fillStyle = block.colour;

    for (let row = 0; row < block.matrix.length; row++) {
        for (let col = 0; col < block.matrix[row].length; col++) {
            context.fillRect(grid * (col + block.col), grid * (block.row * row), grid, grid);
        }

    }
}

//checking if there is a full row of completed squares from the bottom up.
function checkForLines() {
    let lineCounter = 0;
    //we start checking from the bottom and work our way up
    for (let i = 19; i >= 0; i--) {
        var zeroPresent = false;
        for (let j = 0; j < 10; j++) {
            if (gridMatrix[i][j] == 0)
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
        case 0: break;
        case 1: score += 40; break;
        case 2: score += 100; break;
        case 3: score += 300; break;
        case 4: score += 1200; break;
    }
}

//when the block has collided, then the block is set onto the grid. the grid matrix of the game is altered and a new block is created ready for the next game loop.
function setBlock() {
    let matrix = block.matrix;
    let blockRow = block.row;
    let blockCol = block.col;
    for (var rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        // for each cell:
        for (var cellIndex = 0; cellIndex < matrix[rowIndex].length; cellIndex++) {
            // cellIndex represents the relative y positioning of a cell
            // get actual cell
            var cell = block[rowIndex][cellIndex];

            if (cell) {
                if (block.row + row < 0) {
                    return endGame();
                }
            }

            // set the cell at position to the grid's colour
            gridMatrix[rowIndex + blockRow][cellIndex + blockCol] = block.colour;
        }
    }
    checkForLines();
    block = generateBlock();
}

document.addEventListener('keydown', function(e) {
    if (over) return;

    if (e.code === 37) {//left
        const tempCol = block.col - 1;
        if (isMoveValid(block.matrix, block.row, tempCol)) {
            block.col = tempCol;
        }
    }

    if (e.code === 39) {//right
        const tempCol = block.col + 1;
        if (isMoveValid(block.matrix, block.row, tempCol)) {
            block.col = tempCol;
        }
    }

    if (e.code === 38) {//shift and up to rotate left, only up to rotate right.
        const tempMatrix = (e.shiftKey) ? rotateLeft(block.matrix) : rotateRight(block.matrix);
        if (isMoveValid(tempMatrix, block.row, block.col)) {
            block.matrix = tempMatrix;
        }
    }

    if (e.code === 40) {//down
        const tempRow = block.row + 1;
        if (!isMoveValid(block.matrix, tempRow, block.col)) {
            setBlock();
        } else {
            block.row = tempRow;
        }
    }
})

function endGame() {
    over = true;
    //TODO: api post request to send the final score (maybe time) and call to the game over page.
    window.location.href = "";
}

raf = requestAnimationFrame(game);