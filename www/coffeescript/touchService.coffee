oldUpAndDown = undefined
oldLeftAndRight = undefined
oldRotation = undefined
oldScale = undefined

xValueToSendCorobot = 90
yValueToSendCorobot = -70

rotationValueToSendCorobot = 0

scaleValueToSendCorobot = undefined
scaleCurrent = undefined
rotationCurrent = undefined
xStart = undefined
xCurrent = undefined
yCurrent = undefined

document.addEventListener('gesturechange', (event)->
	
		touchScale(event)
		touchRotation(event)
		sendValues()
, false)

document.addEventListener('touchstart', (event)->
	
		touchStart(event)
	
, false)
	
document.addEventListener('touchmove', (event)->
	
		if event.touches.length is 1
				touchLeftAndRight(event)
				touchUpAndDown(event)
				sendValues()
, false)
	
touchStart = (event) ->
	console.log 'STARTED A NEW SWIPE'
	
touchLeftAndRight = (event) ->
		xCurrent = event.touches[0].pageX
		
		if xCurrent < oldLeftAndRight
			if xValueToSendCorobot > 313.5
				xValueToSendCorobot = 315
			else
				xValueToSendCorobot += 2.5
		
		if xCurrent > oldLeftAndRight
			if xValueToSendCorobot < 92.5
				xValueToSendCorobot = 90
			else
				xValueToSendCorobot -= 2.5
	
		oldLeftAndRight = xCurrent

touchRotation = (event) ->
	rotationCurrent = Math.round(event.rotation*Math.pow(10,2))/Math.pow(10,2);
	
	if rotationCurrent > oldRotation
		if rotationValueToSendCorobot > 87.5
			rotationValueToSendCorobot = 90
		else
			rotationValueToSendCorobot += 2.5
	
	if rotationCurrent < oldRotation
		if rotationValueToSendCorobot < -87.5
			rotationValueToSendCorobot = -90
		else
			rotationValueToSendCorobot -=2.5
			
	oldRotation = rotationCurrent

touchScale = (event) ->
	scaleCurrent = Math.round(event.scale*Math.pow(10,2))/Math.pow(10,2);

	if scaleCurrent > oldScale
		scaleValueToSendCorobot = 'open_cmd'
	
	if scaleCurrent < oldScale
		scaleValueToSendCorobot = 'close_cmd'
			
	oldScale = scaleCurrent
	
touchUpAndDown = (event) ->
	yCurrent = event.touches[0].pageY;
	
	if yCurrent < oldUpAndDown
		if yValueToSendCorobot > 298.5
			yValueToSendCorobot = 300
		else 
			yValueToSendCorobot += 2.5
	
	if yCurrent > oldUpAndDown
		if yValueToSendCorobot < -72.5
			yValueToSendCorobot = -75
		else
			yValueToSendCorobot -=2.5
	
	oldUpAndDown = yCurrent
		
sendValues = ->
	
	$('#tempValueDisplayTouches').html	"X value: " + xValueToSendCorobot + 
										"<br/>" + "Y Value: " + yValueToSendCorobot + 
										"<br/>" + "Scale: " + scaleValueToSendCorobot + 
										"<br/>" + "Rotation: " + rotationValueToSendCorobot