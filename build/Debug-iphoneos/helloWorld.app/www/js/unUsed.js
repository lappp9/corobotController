/*
	Tried refactoring the huge touchService duplicate code into functions that could be used for it.
	Worked on just the Y value's max and min.  It was working off and on... running out of time to care.
 
	Was going to switch the actual min/max values to be a seperate function to determine what it's max/min were.
*/

The Code:  

function setMaxForSwipe(current, old, valueToSendCorobot){
	
	if(current<old)
	{
		if(valueToSendCorobot > 298.5){
			valueToSendCorobot = 300;
			return valueToSendCorobot;
		}
		else{
			valueToSendCorobot = valueToSendCorobot + 2.5;
			return valueToSendCorobot;
		}
	}
	else{
		return setMinForSwipe(current,old, valueToSendCorobot);
	}
}

function setMinForSwipe(current, old, valueToSendCorobot){
	
	if(current>old){
		if(valueToSendCorobot < -72.5){
			valueToSendCorobot = -75;
			return valueToSendCorobot;
		}
		else{
			valueToSendCorobot = valueToSendCorobot - 2.5;
			return valueToSendCorobot;
		}
	}
	
}