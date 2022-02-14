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

function placeBlock() {
    
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

// Determine whether a move is valid on a given grid
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
            
            console.log("cell at", cellIndex, rowIndex, "relative is", cell);

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
                    console.log("out of bounds");
                    return false;
                }

                console.log("true positioning at", cellPos[0], ",", cellPos[1]);
                
                var cellOnGrid = gridMatrix[cellPos[0]][cellPos[1]];

                console.log("cell at true pos is", cellOnGrid);

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
                context.fillStyle = COLORS[block[colour]]
            }
        }
    }
}

function setBlock() {
    
}