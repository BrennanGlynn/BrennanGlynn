$(document).ready(function() {
	var current = $('#history').text();
	var history = 0;
	var answer;
	var operators = {
    '+': function(a, b) { return a + b },
    '-': function(a, b) { return a - b},
		'/': function(a, b) { return a / b},
		'*': function(a, b) { return a * b},
	};
	var currentOperator;
	
	$('button').on('click', function() {
		var buttonValue = $(this).attr("value");
		switch (buttonValue) {
			case 'c':
				//do something
				history = 0;
				current = 0;
				answer = null;
				updateCurrent(current);
				updateHistory(history);
				break;
			case '/':
			case '*':
			case '-':
			case '+':
				currentOperator = buttonValue;
				if (answer != null) {
					history = answer;
				} else history = current;
				current = 0;
				updateHistory(history);
				updateCurrent(current);
				break;
			case '=':
				current = parseFloat(current);
				history = parseFloat(history);
				var func = operators[currentOperator];
				answer = func(history, current);
				updateCurrent(answer);
				$('.operator').css('background-color', '');
				currentOperator = null;
				break;
			default:
				current = addToCurrent(current, buttonValue);
				var arr = current.split("");
				if (arr[0] == 0) {
					arr.shift();
				}
				current = arr.join("");
				updateCurrent(current);
		}
	});
});

function addToCurrent(c, v) {
	return c + v;
}

function updateCurrent(value) {
	$('#current').text(value);
}

function updateHistory(value) {
	$('#history').text(value);
}