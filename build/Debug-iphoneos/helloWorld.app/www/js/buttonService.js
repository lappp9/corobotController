function stopAndGo()
{
	
	if($('button').attr('id')=="stop"){

		alert('Drive mode turned off.');
		
		//stops watching the acceleration
		stopWatch();
		
		//changes the button name to 'claw' and the id for CSS purposes
		$('button').attr('id','go');
		$('button').html('Go');		
	}
	else if($('button').attr('id')=="go"){

		alert('Drive mode turned on.');
		
		//start watching the acceleration again
		startWatch();
		
		//changes the button name to 'drive' and the id for CSS purposes
		$('button').attr('id','stop');
		$('button').html('Stop');		

		}

	}
