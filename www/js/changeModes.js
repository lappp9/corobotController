function changeModes()
{
	
	if(document.getElementsByTagName('button')[0].id=="claw"){
		
		alert('In drive mode now, changing to Claw mode!');
		
		//stops watching the acceleration to put it into claw mode
		stopWatch();
		startClaw();
		
		//changes the button name to 'claw' and the id for CSS purposes
		document.getElementsByTagName('button')[0].id="accelerometer";
		document.getElementsByTagName('button')[0].innerHTML="Drive";
		
	}
	else if(document.getElementsByTagName('button')[0].id=="accelerometer"){
		
		alert('In claw mode now, changing to Drive mode!');
		
		//start watching the acceleration again
		//we will probably need a stopClaw() function
		startWatch();
		
		//changes the button name to 'drive' and the id for CSS purposes
		document.getElementsByTagName('button')[0].id="claw";
		document.getElementsByTagName('button')[0].innerHTML="Claw";

		}

	}
