var oldUpAndDown = {};
var oldLeftAndRight = {};
var xValueToSendCorobot = 0;
var yValueToSendCorobot = 0;
var xStart;
var xCurrent;
var yCurrent;
var direction;
var scale;
var rotation;
var scaleValueToSendCorobot = 0;
var rotationValueToSendCorobot =0;
	
	//keeps track of pinching gesture.
	document.addEventListener('gesturechange', function(event)
	{
		//TO DO: Remove event listener so pinch doesn't pick up one figure swipes
		//document.removeEventListener('touchmove', function(event), false);
		
		touchPinch(event);
	
	}, false);
	
	document.addEventListener('touchstart', function(event) 
	{
		touchStart(event);
	
	}, false);
	
	document.addEventListener('touchmove', function(event) 
	{
		touchLeftAndRight(event);
							  
		if(xValueToSendCorobot >= 100)
			{
				xValueToSendCorobot = 100;
			}
							  
		touchUpAndDown(event);
		displayValues();
	
	}, false);

	function touchStart(event)
	{
		//xStart = event.touches[0].pageX; gives you the xaxis point the user touched
		console.log("*** STARTED A NEW SWIPE ***");
	}
	
	function touchUpAndDown(event)
	{
		xCurrent = event.touches[0].pageX;
		
		//dont hard code values to add and subtract .5...
		// base it off of some algorithm applied to xcurrent - oldupanddown and etc.
		
		if(xCurrent>oldUpAndDown[0])
		{
			//console.log("YOU'RE MOVING UP: " + (xCurrent-oldUpAndDown[0]) + "points.");
			xValueToSendCorobot = xValueToSendCorobot + .5
			direction = "RIGHT";
		}
		
		if(xCurrent < oldUpAndDown[0])
		{
			//console.log("YOU'RE MOVING DOWN: " + (oldUpAndDown[0] - xCurrent) + "points.");
			xValueToSendCorobot = xValueToSendCorobot - .5
			direction = "LEFT";
		}
		
		oldUpAndDown[0] = xCurrent;
	} 


function touchPinch(event)
{
	scale = Math.round(event.scale*Math.pow(10,2))/Math.pow(10,2);
	rotation = Math.round(event.rotation*Math.pow(10,2))/Math.pow(10,2);
	direction = "PINCH";
}

function touchLeftAndRight(event)
{
    yCurrent = event.touches[0].pageY;
	
	//dont hard code values to add and subtract .5...
	// base it off of some algorithm applied to ycurrent - oldleftandright and etc.
	
	if(yCurrent>oldLeftAndRight[0])
	{
		//console.log("YOU'RE MOVING RIGHT: " + (yCurrent-oldLeftAndRight[0]) + "points.");
		yValueToSendCorobot = yValueToSendCorobot + .5
		direction = "DOWN";
	}
	
	if(yCurrent < oldLeftAndRight[0])
	{
		//console.log("YOU'RE MOVING LEFT: " + (oldLeftAndRight[0] - yCurrent) + "points.");
		yValueToSendCorobot = yValueToSendCorobot - .5
		direction = "UP";
	}
	
	oldLeftAndRight[0] = yCurrent;
} 

//can be used to send the values instead of displaying them.
function displayValues(){
	var element = document.getElementById("tempValueDisplayTouches");
	
	//xvalue and yvalue are just increments of .5
	//can be manipulated to send whatever arm takes
	// original points moved are mentioned in comments above w/ xycurrent - old and vice versa
	// scale and rotation are raw points.  haven't formatted to what corobot takes either...
	
	element.innerHTML = 
		"<br/><h3>" + "Direction: " + direction +
		"</h3><br/>" + "X value: " + xValueToSendCorobot + 
		"<br/>" + "Y Value: " + yValueToSendCorobot + 
		"<br/>" + "Scale: " + scale + 
		"<br/>" + "Rotation: " + rotation;
}