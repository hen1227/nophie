/*

 This is sort of a mess...
 xx - let users customize the problem set settings

*/
/*
function save(){
  var minutes = document.getElementById('minutes').value;
  console.log('saving minutes ' + minutes);
  chrome.storage.sync.set({
    minutes : (parseInt(minutes) || 1)
  }, function(){    
    console.log('saved minutes: ' + minutes);
    var status = document.getElementById('status');
    status.className = 'ok';
    setTimeout(function(){
      status.className = '';
    }, 750);
  })
}

function restore(){

  console.log('restoring');
// xx - why erroring here?
  chrome.storage.sync.get({
    minutes : 1
  }, function(got){
    console.log('got ' + got);
    document.getElementById('minutes').value(got.minutes);
  });
}


document.addEventListener('DOMContentLoaded', restore, false);
document.getElementById('save').addEventListener('click',save);
*/
