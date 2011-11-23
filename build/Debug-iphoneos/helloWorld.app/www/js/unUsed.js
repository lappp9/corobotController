/*
 
 if I decide to refactor the long touchService.js

function determineValueToSendCorobot(current, old, value, identifier)
{	
	if(current < old)
	{
		value = setValue(value, identifier, true);
		return value;
	}
	
	if(current > old)
	{
		value = setValue(value, identifier, false);
		return value;
	}
}

function setValue(value, identifier, old)
{
	if(old)
	{
		if(identifier == "x")
		{
			if(value > 312.5)
			{
				value = 315;
				return value;
			}
			else
			{
				value += 2.5;
				return value;
			}
		}
	}
	else
	{
		if(identifier == "x")
		{
			if(value < 92.5)
			{
				value = 90;
				return value;
			}
			else
			{
				value -= 2.5;
				return value;
			}
		}
	}
}
