var oldUpAndDown;
var oldLeftAndRight;
var oldRotation;
var oldScale;

var xValueToSendCorobot = 90;
var yValueToSendCorobot = -70;

var rotationValueToSendCorobot = 0;
var scaleValueToSendCorobot = 0;

var scaleCurrent;
var rotationCurrent;
var xStart;
var xCurrent;
var yCurrent;
var direction;
	
	document.addEventListener('gesturechange', function(event)
	{
		touchScale(event);
		touchRotation(event);
		displayValues();
	
	}, false);

	document.addEventListener('touchstart', function(event) 
	{
		touchStart(event);
	
	}, false);
	
	document.addEventListener('touchmove', function(event) 
	{
		if(event.touches.length==1)
			{
				touchLeftAndRight(event);
				touchUpAndDown(event);
				displayValues();
			}
	
	}, false);

	function touchStart(event)
	{
		//xStart = event.touches[0].pageX; gives you the xaxis point the user touched
		console.log("*** STARTED A NEW SWIPE ***");
	}
	
	function touchLeftAndRight(event)
	{
		xCurrent = event.touches[0].pageX;
		
		//dont hard code values to add and subtract 1...
		// base it off of some algorithm applied to xcurrent - oldupanddown and etc.
		
		if(xCurrent<oldLeftAndRight)
		{
			//max value is 300 for X arm
			if(xValueToSendCorobot > 313.5){xValueToSendCorobot =315;}
			else{xValueToSendCorobot +=2.5;
				direction = "LEFT";}
		}
		//min value is 90 for X arm
		if(xCurrent > oldLeftAndRight)
		{
			if(xValueToSendCorobot < 92.5){xValueToSendCorobot = 90;}
			else{xValueToSendCorobot -= 2.5;
				direction = "RIGHT";}
		}
		
		oldLeftAndRight = xCurrent;
	} 

function touchRotation(event)
{
	rotationCurrent = Math.round(event.rotation*Math.pow(10,2))/Math.pow(10,2);
	
	if(rotationCurrent>oldRotation)
	{
		if(rotationValueToSendCorobot > 87.5){
			rotationValueToSendCorobot = 90;
		}
		else{
			rotationValueToSendCorobot+=2.5;
		}
	}
	
	if(rotationCurrent<oldRotation)
	{
		if(rotationValueToSendCorobot < -87.5){rotationValueToSendCorobot = -90;}
		else{rotationValueToSendCorobot -=2.5;}
	}
	
	oldRotation = rotationCurrent;
	
}

function touchScale(event)
{
	scaleCurrent = Math.round(event.scale*Math.pow(10,2))/Math.pow(10,2);
		
	if(scaleCurrent>oldScale)
	{
		if(scaleValueToSendCorobot > 251.5){scaleValueToSendCorobot = 254;}
		else{scaleValueToSendCorobot += 2.5;}
	}
	
	if(scaleCurrent<oldScale)
	{
		if(scaleValueToSendCorobot< 2.5){scaleValueToSendCorobot = 0;}
		else{scaleValueToSendCorobot -= 2.5;}
	}
	
	oldScale = scaleCurrent;
}

function touchUpAndDown(event)
{	
	/*
		NOTE:
				if you base it off of ycurrent - oldleftandright to get how many points the moved during the swipe
				and not hard code it to 2.5... then a faster swipe to the left/right/up/down will increase the valuetosendtocorobot
				faster and thus moving the claw faster....
	*/
	
	yCurrent = event.touches[0].pageY;
		
	if(yCurrent<oldUpAndDown)
	{
		if(yValueToSendCorobot > 298.5){yValueToSendCorobot = 300;}
		else{yValueToSendCorobot +=2.5;
			direction = "UP";}
	}
	
	if(yCurrent>oldUpAndDown)
	{
		if(yValueToSendCorobot < -72.5){yValueToSendCorobot = -75;}
		else{yValueToSendCorobot -= 2.5;
			direction = "DOWN";}
	}
	
	oldUpAndDown = yCurrent;
} 


//can be used to send the values instead of displaying them.
function displayValues(){
	
	$('#tempValueDisplayTouches').html(
									   "<br/><h3>" + "Direction: " + direction +
									   "</h3><br/>" + "X value: " + xValueToSendCorobot + 
									   "<br/>" + "Y Value: " + yValueToSendCorobot + 
									   "<br/>" + "Scale: " + scaleValueToSendCorobot + 
									   "<br/>" + "Rotation: " + rotationValueToSendCorobot);
}