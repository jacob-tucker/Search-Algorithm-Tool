/*RECURSIVE DIVISION ---
**VARIABLES -
**row1 - topmost row that is white (i.e not a wall row)
**row2 - bottommost row "                             "
**column1 - leftmost column "                            "
**column2 - rightmost column "                           "
**speed - speed at which to complete each loop
**lastRowIndex - index of bottommost row of entire grid
**lastColumnIndex - index of rightmost column "    "
*/
const recursiveDivision = (grid, row1, row2, column1, column2, lastRowIndex, lastColumnIndex) => {
		const rows = row2 - row1 + 1;
		const columns = column2 - column1 + 1;

		if (rows > columns && rows >= 3 && columns >= 2){ //draw horizontal lines (rows)

			let rowIndex = Math.floor(Math.random() * (rows-2)) + 1 + row1; //row at which the line will be drawn
			let openSpace = Math.floor(Math.random() * columns) + column1; //open space in that row for search algo to pass through

			for (let i = column1; i < column1 + columns; i++){
				if(i !== openSpace && grid[rowIndex][i] !== null){

					let goThrough = true;

					/*if this is the first square in the row being drawn and that square is not at the edge of the grid*/
					if (i === column1 && column1 !== 0){
            /*if the square to the left of the one being drawn is white, don't draw this square (or else the pass through will be blocked)*/
            if (!arrayMoves.includes(grid[rowIndex][i-1])) goThrough = false

					/*last square in the row being drawn and square not at edge of the grid*/
          } else if (i === (column1 + columns - 1) && (column1 + columns - 1) !== lastColumnIndex){
            /*if the square to the right of the one being drawn is white, don't draw this square (or else the pass through will be blocked)*/
            if (!arrayMoves.includes(grid[rowIndex][i+1])) goThrough = false

					}

					if (goThrough === true){
            arrayMoves.push(grid[rowIndex][i])
					}
				}
			}

			recursiveDivision(grid, row1, rowIndex-1, column1, column2, lastRowIndex, lastColumnIndex); //do this again for all space to the left
			recursiveDivision(grid, rowIndex+1, row2, column1, column2, lastRowIndex, lastColumnIndex); //do this again for all space to the right

		} else if (columns >= 3 && rows >= 2) { //draw vertical lines (columns)

			let columnIndex = Math.floor(Math.random() * (columns-2)) + 1 + column1; //column at which the line will be drawn
			let openSpace = Math.floor(Math.random() * rows) + row1; //open space in that column for search algo to pass through

			for (let i = row1; i < row1 + rows; i++){
				if(i !== openSpace && grid[i][columnIndex] !== null){

					let goThrough = true;

					/*if this is the first square in the column being drawn and that square is not at the edge of the grid*/
					if (i === row1 && row1 !== 0){
            /*if the square above the one being drawn is white, don't draw this square (or else the pass through will be blocked)*/
            if (!arrayMoves.includes(grid[i-1][columnIndex])) goThrough = false

					/*last square in the column being drawn and square not at edge of the grid*/
          } else if (i === (row1 + rows - 1) && (row1 + rows - 1) !== lastRowIndex){
            /*if the square below the one being drawn is white, don't draw this square (or else the pass through will be blocked)*/
            if (!arrayMoves.includes(grid[i+1][columnIndex])) goThrough = false

					}

					if (goThrough === true){
            arrayMoves.push(grid[i][columnIndex])
					}
				}
			}
			recursiveDivision(grid, row1, row2, column1, columnIndex-1, lastRowIndex, lastColumnIndex); //do this again for all space above
			recursiveDivision(grid, row1, row2, columnIndex+1, column2, lastRowIndex, lastColumnIndex); //do this again for all space below

		} else {
			return;
		}
}

let arrayMoves = []
export function exporter(grid) {
  arrayMoves = []
  for(let i = 0; i < 49; i++){
    arrayMoves.push(grid[0][i])
  }
  for(let i = 0; i < 19; i++){
    arrayMoves.push(grid[i][49])
  }
  for(let i = 49; i >= 1; i--){
    arrayMoves.push(grid[19][i])
  }
  for(let i = 19; i >= 1; i--){
    arrayMoves.push(grid[i][0])
  }
  recursiveDivision(grid, 1, 18, 1, 48, 18, 48)
  return arrayMoves
}
