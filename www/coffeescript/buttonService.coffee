stopAndGo = ->
    if $('button').attr('id') is "stop"
        stopWatch()
        
        killAcceleration()

        $('button').attr('id','go')
        $('button').html('Go')
		
    else if $('button').attr('id') is "go"

        startWatch()

        $('button').attr('id','stop')
        $('button').html('Stop')
		
killAcceleration = ->
	
	request = "<?xml version='1.0'?>" + 
	"<methodCall><methodName>p.set_cmd_vel</methodName>" + 
	"<params><param><value><double>0.0</double></value></param>" + 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><int>1</int></value></param>"+ 
	"</params></methodCall>"
		
	talkToCorobot(request)