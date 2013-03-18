/*var student, firstName, lastName, school;

if(!$model){
  



   student = Alloy.createModel('Student-info', {}); 

  //console.log(student.toString());
  if(student.isValid() && student.customProperty === 'student'){
    student.save();
  }else{
    student.destroy();
  }
}*/
var user = Alloy.Models.user;
Alloy.Models.user.trigger('change');
Ti.API.debug('student info: ' + JSON.stringify(user));
