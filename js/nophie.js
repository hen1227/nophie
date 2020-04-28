	function chooseProblemSet(myProblemsets){
		var hasOperators = [];
		for(var i = 0; i < myProblemsets.length; i++){
			if(myProblemsets[i].use){
				hasOperators += [myProblemsets[i]]
			}
		}
		return hasOperators;
	}

(function($){
  'use strict';
  var problemsets = [

    {
      operator : '-',
      min : 5,
      max : 100,
      lowerBound : false,
     use:false // higher number must be greater than lower 
    },
    {
      operator : '+',
      max : 100,
     use:false
// 	operatorInclude: false
    },
 // for now just use multiplication 
    {
      operator : '*',
      min : 2,
      max : 10,
     use:false
// 	us    operatorInclude: false
    }
  ];


  $.get(
    chrome.extension.getURL('html/nophie.html'), 
    function(content){
      // usse {extension-url} placeholder in html for location of this extension
      content = content.replace(/\{extension\-url\}/g, chrome.extension.getURL(''));

      // create references to all the elements we will use from the dom 
      var nophie$ = $('body').prepend(content).find('#nophie').first().hide();
      var nophieImageWrapper$ = nophie$.find('#nophie-image-wrapper').first();
      var button$ = nophie$.find('#nophie-submit').first();
      var input$ = nophie$.find('#nophie-answer').first();
      var question$ = nophie$.find('#nophie-question').first();

      function block(){
	if(nophie$.is(':visible')) return; // last question is still up

	// generate question
	var problemset = _.sample(chooseProblemSet(problemsets));
	var min = (problemset.min || 0);
	var lower = _.random(min, problemset.max);
	var upper = _.random((problemset.lowerBound ? lower : min), problemset.max);
	var problem = upper + ' ' + problemset.operator + ' ' + lower;
	var solution = eval(problem);
	question$.text(problem);

	// handle checking the answer
	var handler = function handler(){
	  if(input$.val() == solution){
	    input$.val('');
	    nophie$.fadeOut();
	  } else nophieImageWrapper$.effect('shake');
	};

	// use handler if button is clicked or enter is pressed in input
	button$.off().on('click', handler);
	input$.off().on('keypress', function(evt){
	  if(evt.keyCode == 13) handler();
	}).focus();
	
	nophie$.fadeIn();
      }


      // run at start
      block();
      // run every (5) minutes and set up a new question if needed
      setInterval(block, (5 * 60 * 1000)); // xx - make the minutes com from settings

    }, 
    'html');

})(jQuery);
