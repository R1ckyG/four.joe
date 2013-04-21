var course, question, answer;

exports.setAnswer = function(c, q, i){
 course = c;
 question = q;
 answer = question['answers'][i];
 Ti.API.debug('Setting answer to: ' + answer['content']);
 updateView();
};
/*
$.comment_button.addEventListener('click', function(){
	var text = $.comment_text.value;
	Ti.API.debug('Adding text: ' + text);
	if(!text)alert('No input');
	var time = new Date(),
			comment = {
				content: text,
				time: time.toString(),
				user: {
					firstname: Alloy.Models.user.get('firstname'),
					lastname: Alloy.Models.user.get('lastname'),
					id: Alloy.Models.user.get('id')
				}
			};
	answer['comments'].push(comment);
	Ti.API.debug('Saving comment ' + JSON.stringify(comment));
	course.save();
	updateView();
});
*/
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
	if(!text){
		alert('No input');
		return;
	}
	var time = new Date(),
			comment = {
				content: text,
				time: time.toString(),
				user: {
					firstname: Alloy.Models.user.get('firstname'),
					lastname: Alloy.Models.user.get('lastname'),
					id: Alloy.Models.user.get('id')
				}
			};
	answer['comments'].push(comment);
	Ti.API.debug('Saving comment ' + JSON.stringify(comment));
	course.save();
	updateView();
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

var updateView = function(){
	$.mainContainer.title= answer['content'];
	$.answer_text_label.text = answer['content'];
  var numRows = $.comment_section.rowCount;
	for(var i = 0; i < numRows;  i++){
		$.comment_table.deleteRow(0);
	}
	for(var i = 0; i < answer['comments'].length; i++){
		var comment = answer['comments'][i],
				row = Ti.UI.createTableViewRow({
					className: 'commentRow'
				}),
				label = Ti.UI.createLabel({
					text: comment['content'],
					font: {fontSize:'24dp'},
					left: 5,
		  	});
		 row.add(label);
		 row.id = i;
		 row.answer = answer;
		 $.comment_table.appendRow(row);
	}
};
