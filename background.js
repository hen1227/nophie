var start = Date.now();

// xx  - update interval if options changed during execution
chrome.storage.sync.get('minutes', function(got){
  var ms = ((got.minutes || 1) * 60 * 1000);
  setInterval(function(){
    console.log('Nophie interval hit ' + Date.now());
  }, ms);
});
