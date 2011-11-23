stopAndGo=->
    if $('button').attr('id') is "stop"
        alert 'Drive mode turned off.'
        
        stopWatch()

        $('button').attr('id','go')
        $('button').html('Go')
		
    else if $('button').attr('id') is "go"
        alert 'Drive mode turned on.'

        startWatch()

        $('button').attr('id','stop')
        $('button').html('Stop')