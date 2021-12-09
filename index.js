const { Engine, Render, Runner, World, Bodies } = Matter;

const cells = 3;
const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		wireframes : true,
		width,
		height,
	},
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls

const walls = [
	Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
	Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
	Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
	Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
];

World.add(world, walls);

// Maze generation

const shuffle = arr => {
	//* ['a', 'b', 'c', 'd']
	let counter = arr.length;
	while (counter > 0) {
		//* 4 (['a', 'b', 'c', 'd'])
		//** 3 (['a', 'b', 'd', 'c'])
		const index = Math.floor(Math.random() * counter);
		//* index = Math.floor(0.5 * 4) = 2
		//* index = Math.floor(0.7 * 3) = 2
		counter--;
		//* 3
		//** 2
		const temp = arr[counter];
		//* temp = arr[3] => 'd'
		//* * temp = arr[2]=> 'd'
		arr[counter] = arr[index];
		//* arr[3] ('d') becomes = arr[2] ('c') => ['a', 'b', 'c', 'c']
		//* * arr[2] ('d') becomes = arr[2] ('c') => ['a', 'b', 'd', 'c']
		arr[index] = temp;
		//*arr[0] = arr[1]
		//* arr[2] ('c') becomes = temp ('d') => ['a', 'b', 'd', 'c']
		//* * arr[2] ('d') becomes = temp ('d')
	}

	return arr;
	//* []['a', 'b', 'd', 'c']
	//** ['a', 'b', 'd', 'c']
};

/**  
[
	[1, 2, cells],  
	[4, 5, 6],
	[7, 8, 9]
]

**/
// const gridBad = Array(cells).fill([ false, false, false ]);
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
	//If I have visited the cell at [row, column] then return
	if (grid[row][column]) {
		return;
	}
	//mark this cell as being visited
	grid[row][column] = true;
	//Assemble randomly-ordered list of neighbors
	// prettier-ignore
	const neighbors = shuffle([
		[row - 1, column],
		[row, column + 1],
		[row + 1, column],
		[row, column - 1]
	]);
	console.log(neighbors);
	//For each neighbor...

	//See if that neighbor is out of bounds

	//If we have visited that neighbor, continue to next neighbor

	//remove wall from horizontals or verticals array

	// visit that next cell
};

stepThroughCell(1, 1);
console.log(grid);
