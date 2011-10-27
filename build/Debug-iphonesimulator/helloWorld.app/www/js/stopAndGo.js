function stopAndGo()
{
	
	if(document.getElementsByTagName('button')[0].id=="stop"){
		
		alert('Drive mode turned off.');
		
		//stops watching the acceleration
		stopWatch();
		
		//changes the button name to 'claw' and the id for CSS purposes
		document.getElementsByTagName('button')[0].id="go";
		document.getElementsByTagName('button')[0].innerHTML="Go";
		
	}
	else if(document.getElementsByTagName('button')[0].id=="go"){
		
		alert('Drive mode turned on.');
		
		//start watching the acceleration again
		startWatch();
		
		//changes the button name to 'drive' and the id for CSS purposes
		document.getElementsByTagName('button')[0].id="stop";
		document.getElementsByTagName('button')[0].innerHTML="Stop";

		}

	}
