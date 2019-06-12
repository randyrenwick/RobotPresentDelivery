// Robots!


var robots = [];
var curStep = 0;
var moveSeq = "";
var world = new Map();
var totalPresents = 0;

function Coord(x, y)
{
	return x.toString() + "," + y.toString();
}

function WorldPos()
{
	this.robots = new Set();
	this.presents = 0;
}

function Robot(id, x, y)
{
	this.id = id;
	this.x = x;
	this.y = y;
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
	var originRow = new Map();	
	world.set(0, originRow);
	originRow.set(0, origin);
	
	// generate army of robots
	robots = [];
	for (var i=0; i<numRobots; i++)
	{
		var newRobot = new Robot(i, 0, 0);
		
		// add new robot to robot list
		robots.push(newRobot);
		
		// add new robot to origin
		origin.robots.add(newRobot);
	}
	
	totalPresents = 0;
	curStep = 0;
	this.moveSeq = moveSeq;
	
	return true;
}

function moveRobot(robot, newX, newY)
{
	// remove robot for old position
	if (world.has(robot.x) && world.get(robot.x).has(robot.y))
	{
		var worldPos = world.get(robot.x).get(robot.y);
		worldPos.robots.delete(robot);
	}
	
	// make sure newX's row exists in the World
	if (!world.has(newX)) world.set(newX, new Map());
	var worldRow = world.get(newX);

	// make sure newY's position exists in the row
	if (!worldRow.has(newY)) worldRow.set(newY, new WorldPos());
	var worldPos = worldRow.get(newY);	
	
	// if there is no other robots here then deliver present
	if (worldPos.robots.size==0) 
	{
		worldPos.presents++;
		totalPresents++;
	}
	
	// add robot to this position
	worldPos.robots.add(robot);
	robot.x = newX;
	robot.y = newY;
}

function executeNextStep()
{
	console.log("executeNextStep");	
	
	if (curStep >= moveSeq.length) return false;
	
	// determine which robot to execute move on
	var robotIndex = curStep % robots.length;
	var robot = robots[robotIndex];
	
	// determine what the move is and validate it
	var move = moveSeq[curStep];

	// inrement step for next time (want to move on whether it succeeds or fails so we don't get stuck on one step)
	curStep++;	

	if (move==='^')
	{
		// move up
		moveRobot(robot, robot.x, robot.y+1);
	}
	else if (move==='V')
	{
		// move down
		moveRobot(robot, robot.x, robot.y-1);
	}
	else if (move==='<')
	{
		// move left
		moveRobot(robot, robot.x-1, robot.y);
	}
	else if (move==='>')
	{
		// move right
		moveRobot(robot, robot.x+1, robot.y);
	}
	else
	{
		// invalid move
		return false; 
	}
	
	return true;
}

function queryRobotPositions()
{
	console.log("queryRobotPositions");	
	
	var results = "";
	for (var i=0; i<robots.length; i++)
	{
		results += (i>0 ? "\n" : "") + "robot" + i.toString() + ".pos=" + robots[i].x.toString() + ", " + robots[i].y.toString();
	}
	return results;
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

