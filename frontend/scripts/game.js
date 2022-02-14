const BLOCKS = {
    1:[
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    2:[
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    3:[
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ],
    4:[
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    5:[
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    6:[
        [1,1],
        [1,1]
    ],
    7:[
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ]
}

const COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
];

var gridMatrix = [];

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
    let block = Math.floor(Math.random() * (BLOCKS.length)) + 1;
    let colour = Math.floor(Math.random() * (COLOURS.length)) + 1;

    let row = -1;
    let column = 5;
    
    return {
        name: block,
        matrix: BLOCKS.block,
        row: row,
        col: column,
        colour:colour
    }
}


//checks whether the block will be outside grid bounds or whether it will collide with an occupied square
function isMoveValid(matrix, blockRow, blockCol) {//matrix is the block. the other two are the row and column values in the grid for the block
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (col + blockCol < 0 || col + blockCol >= gridMatrix[0].length || blockRow + row >= gridMatrix.length || gridMatrix[blockRow + row][blockCol + col])) {
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

            if (cell == 1) {
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

                if (cellOnGrid == 1) {
                    return false;
                }
            }
        }
    }

    // if none of the true cells have a 1 there, the move is valid
    return true;
}

let over = false;
let block = generateBlock();
let raf = null;
let counter = 0;
const canvas = document.getElementById("grid"); //assuming they use a canvas for the grid 
const context = canvas.getContext('2d');


function game() {
    raf = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width, canvas.height);
    
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (gridMatrix[row][col]) {
                context.fillStyle = COLORS[block[colour]]//finish making the code to draw the grid here. 
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

    //draw the block here. 
}

//when the block has collided, then the block is set onto the grid. the grid matrix of the game is altered and a new block is created ready for the next game loop.
function setBlock(matrix, blockRow, blockCol) {
    for (var rowIndex = 0; rowIndex < blockMatrix.length; rowIndex++) {
        // rowIndex represents the relative x positioning of a cell
        // get actual row
        var row = blockMatrix[rowIndex];

        // for each cell:
        for (var cellIndex = 0; cellIndex < row.length; cellIndex++) {
            // cellIndex represents the relative y positioning of a cell
            // get actual cell
            var cell = row[cellIndex];

            if (cell == 1) {
                // find the position of the cell on the grid
                // based on the blockPosition paramater and its position relative
                // to the block
                var cellPos = [
                    blockPosition[0] + cellIndex,
                    blockPosition[1] + rowIndex
                ];

                // modify the cell on the matrix
                gridMatrix[cellPos[1]][cellPos[0]] = 1;
            }
        }
    }

    block = generateBlock();
}

document.addEventListener('keydown', function(e) {
    if (gameEnded) return;

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