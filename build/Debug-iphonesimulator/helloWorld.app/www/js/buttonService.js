var stopAndGo;
stopAndGo = function() {
  if ($('button').attr('id') === "stop") {
    alert('Drive mode turned off.');
    stopWatch();
    $('button').attr('id', 'go');
    return $('button').html('Go');
  } else if ($('button').attr('id') === "go") {
    alert('Drive mode turned on.');
    startWatch();
    $('button').attr('id', 'stop');
    return $('button').html('Stop');
  }
};