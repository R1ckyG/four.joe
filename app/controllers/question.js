var question, course;
var answerController = Alloy.createController('answer');

exports.setQuestion = function(c, q){
	question = c.get('questions')[q];
	course = c;
	Ti.API.debug('Setting ' + question['title'] + ' question for ' + course.get('title'));
	updateView();
};

$.comment_button.addEventListener('click', function(){
  var text = $.comment_text.value;
	Ti.API.debug('Adding text: ' + text);
	//TODO Validate user signed in
	if(!text)alert('No input');
	var time = new Date(),
			answer = {
				content: text,
				time: time.toString(),
				points: 0,
				text: text,
				user:{
					id: Alloy.Models.user.get('id'),
					firstname: Alloy.Models.user.get('firstname'),
					lastname: Alloy.Models.user.get('lastname')
				}
			};
	question['answers'].push(answer);
	Ti.API.debug('Saving answer ' + JSON.stringify(answer));
	course.save();
});

var createAccordion = function(answer){
	var aView = Ti.UI.createView({
		borderColor: '#000',
		borderWidth: 1
	});
	var anim = Ti.UI.createAnimation({
		height: 10,
		duration:200
	});
	var	label = Ti.UI.createLabel({
					text: answer['content'],
					font: {fontSize:'24dp'},
					left: 5,
					height: 'auto'
	});
  return aView;	
};

var addAnswerField = function(){
	var submit = Ti.UI.createButton({
		//style : Ti.UI.iPhone.SystemButtonStyle.DONE,
		title: 'Submit'
	});
	var textArea = Ti.UI.createTextArea({
			  borderColor: '#000',
				color: '#000',
				keyboardToolbar: [submit],
				keyboardToolbarColor: '#999',
				keyboardToolbarHeight: 40,
				value: 'A: ',
				top: 10,
				height:43
			}),
			row = Ti.UI.createTableViewRow({
				className: 'answerTextArea'
			});
	row.add(submit);
	$.answer_table.appendRow(row);
};

var expanded = [];

var updateView = function(){
	Ti.API.debug('Updating question view');
	$.mainContainer.title = question['title'];
	$.question_text_label.text = question['text'];
	
	var numRows = $.answer_section.rowCount;
	$.answer_table.addEventListener('click', function(e){
		Ti.API.debug('Row ' + e.rowData.id + ' clicked');
		answerController.setAnswer(course, question, e.rowData.id);
		var view = answerController.getView();
		Alloy.CFG.nav.open(view);
	});

	for(var i = 0; i < numRows; i++){
		$.answer_table.deleteRow(0);
	}	
	for(var i = 0; i < question['answers'].length; i++){
		var answer = question['answers'][i],
				row = Ti.UI.createTableViewRow({
					className: 'answerRow'
				}),
				label;
	  label = Ti.UI.createLabel({
				text: answer['content'],
				font: {fontSize:'24dp'},
				left: 5,
				borderColor: '#000',
				borderWidth: 1
		  });
    var view = createAccordion(answer);		
		row.add(label);
		row.id = i;
	  row.expanded = false;	
		row.answer = answer;
		$.answer_table.appendRow(row);
	}
	//addAnswerField();
};
