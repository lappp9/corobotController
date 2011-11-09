###
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script src="http://jashkenas.github.com/coffee-script/extras/coffee-script.js"></script>
<script type="text/coffeescript" charset="utf-8" src="coffeescript/accelerometerCoffee.coffee"></script>

Place these in app.html at the top in the dependencies portion.  It alerts, so something in this code is broke.
I think it is the Jquery part not reading correctly, "$->".  If I have time, I'll come back to figure it out fully.

See reference: http://geekiriki.blogspot.com/2010/08/jquery-meets-coffeescript.html
###

startWatch: ->

    #update acceleration every .3 seconds
	options = frequency: 30
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options)
	
	
stopWatch: ->
    if watchID
        navigator.accelerometer.clearWatch(watchID)
        watchID = null
		
onSuccess: ->
    $->
        x = Math.round(acceleration.x*Math.pow(10,2))/Math.pow(10,2)
        y = Math.round(acceleration.y*Math.pow(10,2))/Math.pow(10,2)

    drive = translation: x, rotation: y

    options = formatOutput: false
    xml = $.json2xml(drive, options)

    element = document.getElementById("tempValueDisplayAccelerometer")

    element.innerHTML = x + " " + y

onError: ->
    alert 'onError!'