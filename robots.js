// Robots!


var robots = [];
var curStep = 0;
var moveSeq = "";
var world = new Map();

function Coord(x, y)
{
	return x.toString() + "," + y.toString();
}

function WorldPos()
{
	this.robots = new Set();
	this.presents = 0;
}

function Robot(id)
{
	this.id = id;
}

/* inputs: 
      numRobots: int - number of robots
	  moveSeq: string - sequence of move characters: <, >, ^, VV
*/
function createSimulation(numRobots, moveSeq)
{
	console.log("createSimulation");	
	console.log("numRobots: " + numRobots.toString());	
	console.log("moveSeq: " + moveSeq);	

	if (numRobots<=0) return false;
	
	// create the origin	
	origin = new WorldPos();
	
	// create the world and add origin to it
	world = new Map();
	world.set(Coord(0, 0), origin);

	// generate army of robots
	robots = [];
	for (var i=0; i<numRobots; i++)
	{
		var newRobot = new Robot(i);
		
		// add new robot to robot list
		robots.push(i);
		
		// add new robot to origin
		origin.robots.add(newRobot);
	}
	
	curStep = 0;
	this.moveSeq = moveSeq;
	
	return true;
}

function executeNextStep()
{
	console.log("executeNextStep");	
	return true;
}

function queryRobotPositions()
{
	console.log("queryRobotPositions");	
	return "test1\ntest2\ntest3\ntest4\ntest5\n";
}

function queryHouses(filterMinPresents)
{
	console.log("queryNumHouses");	
	console.log("filterMinPresents: " + filterMinPresents.toString());	
	return moveSeq;
}

function queryTotalPresents()
{
	console.log("queryTotalPresents");	
	return 0;
}

function runSimulation()
{
	console.log("runSimulation");
	return true;
}

