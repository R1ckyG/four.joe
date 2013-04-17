var question, course;
var answerController = Alloy.createController('answer');

exports.setQuestion = function(c, q){
	question = c.get('questions')[q];
	course = c;
	Ti.API.debug('Setting ' + question['title'] + ' question for ' + course.get('title'));
	updateView();
};

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

var tf = Ti.UI.createTextField({
	width: '100%',
	height: 32,
	width: 200,
	backgroundColor:'white',
	font:{fontSize: 13},
	borderRadius: 4,
	borderWidth: 1,
	borderColor: '#000',
	paddingLeft: 10
});

var cButton = Ti.UI.createButton({
	title: 'Submit',
	width: 80,
	height: 32,
});

cButton.addEventListener('click', function(){
  var text = tf.value;
	tf.value = '';
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

var textField = Ti.UI.createTextField({
	color:'#336699',
	value:'Answer Question',
	height:35,
	width:300,
	bottom: 5,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardToolbar:[tf, cButton],
	keyboardToolbarColor: '#999',	
	keyboardToolbarHeight: 40
});

$.mainContainer.add(textField);
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
				label, aView, icon;
		icon = Ti.UI.createLabel({
			text: 'A:',
			font:{
				fontSize: '28dp',
				fontFamily: 'Helvetica',
				fontStyle: 'italic',
				fontWeight: 'bold'
			},
			color: '#3299BB',
			left: 5
		});
	  label = Ti.UI.createLabel({
				text: answer['content'],
				font: {fontSize:'18dp'},
				left: '11%',
		  });
		aView = Ti.UI.createView({height:40});
		aView.add(icon);
		aView.add(label);
    //var view = createAccordion(answer);		
		row.add(aView);
		row.id = i;
	  row.expanded = false;	
		row.answer = answer;
		$.answer_table.appendRow(row);
	}
	//addAnswerField();
};
