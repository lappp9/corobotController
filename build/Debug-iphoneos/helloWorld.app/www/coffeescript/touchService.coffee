oldUpAndDown = undefined
oldLeftAndRight = undefined
oldRotation = undefined
oldScale = undefined
closedStart = undefined
closedEnd = undefined

xValueToSendCorobot = .15
yValueToSendCorobot = .15

rotationValueToSendCorobot = 0
scaleValueToSendCorobot = 'g.close_cmd'

scaleCurrent = undefined
rotationCurrent = undefined
xStart = undefined
xCurrent = undefined
yCurrent = undefined

document.addEventListener('gesturechange', (event)->
	
		touchRotation(event)
		sendGestureValues()
, false)

document.addEventListener('gesturestart', (event)->
 
	closedStart = roundNumber(event.scale,2)
	
, false)
 
document.addEventListener('gestureend', (event)->
 
	closedEnd = roundNumber(event.scale,2)
	openOrClose()
	
, false)
 
document.addEventListener('touchstart', (event)->
	
		touchStart(event)
	
, false)
	
document.addEventListener('touchmove', (event)->
	
		if event.touches.length is 1
				touchLeftAndRight(event)
				touchUpAndDown(event)
				sendGestureValues()
, false)
	
touchStart = (event) ->
	console.log 'STARTED A NEW SWIPE'
	
touchLeftAndRight = (event) ->
		xCurrent = event.touches[0].pageX
		
		if xCurrent > oldLeftAndRight
			if xValueToSendCorobot > .34
				xValueToSendCorobot = .35
			else
				xValueToSendCorobot += .005
		
		if xCurrent < oldLeftAndRight
			if xValueToSendCorobot < .16
				xValueToSendCorobot = .15
			else
				xValueToSendCorobot -= .005
	
		oldLeftAndRight = xCurrent

touchRotation = (event) ->
	rotationCurrent = roundNumber(event.rotation,2)
	
	if rotationCurrent < .3 and rotationCurrent > -.3
		rotationValueToSendCorobot = 0
	
	if rotationCurrent > oldRotation
		if rotationValueToSendCorobot > 1.45
			rotationValueToSendCorobot = 1.5
		else
			rotationValueToSendCorobot += .05
	
	if rotationCurrent < oldRotation
		if rotationValueToSendCorobot < -1.45
			rotationValueToSendCorobot = -1.5
		else
			rotationValueToSendCorobot -=.05
			
	oldRotation = rotationCurrent
	
touchUpAndDown = (event) ->
	yCurrent = event.touches[0].pageY;
	
	if yCurrent < oldUpAndDown
		if yValueToSendCorobot > .34
			yValueToSendCorobot = .35
		else 
			yValueToSendCorobot += .005
	
	if yCurrent > oldUpAndDown
		if yValueToSendCorobot < -.14
			yValueToSendCorobot = -.15
		else
			yValueToSendCorobot -=.005
	
	oldUpAndDown = yCurrent

roundNumber = (num, dec) ->
	Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
	
openOrClose = ->
	if((closedStart - closedEnd) > .5)
		scaleValueToSendCorobot = 'g.close_cmd'
		request = "<?xml version='1.0'?>" + 
		"<methodCall><methodName>" + scaleValueToSendCorobot + "</methodName>" + 
		"</methodCall>"
		talkToCorobot(request)
	
	if((closedStart - closedEnd) < -2)
		scaleValueToSendCorobot = 'g.open_cmd'
		request = "<?xml version='1.0'?>" + 
		"<methodCall><methodName>" + scaleValueToSendCorobot + "</methodName>" + 
		"</methodCall>"
		talkToCorobot(request)

sendGestureValues = ->
	
	request = "<?xml version='1.0'?>" + 
	"<methodCall><methodName>l.setpose_cmd</methodName>" + 
	"<params><param><value><double>" + roundNumber(xValueToSendCorobot,2) + "</double></value></param>" + 
	"<param><value><double>" + roundNumber(yValueToSendCorobot,2) + "</double></value></param>"+ 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><double>" + roundNumber(rotationValueToSendCorobot, 2) + "</double></value></param>"+ 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><double>0.0</double></value></param>"+ 

	"</params></methodCall>"
		
	talkToCorobot(request)
	
	$('#tempValueDisplayTouches').html	"X value: " + roundNumber(xValueToSendCorobot,2) + 
										"<br/>" + "Y Value: " + roundNumber(yValueToSendCorobot,2) + 
										"<br/>" + "Scale: " + scaleValueToSendCorobot + 
										"<br/>" + "Rotation: " + roundNumber(rotationValueToSendCorobot,2)
