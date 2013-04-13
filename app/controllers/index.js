var homec = Alloy.createController('home'),
    signinc = Alloy.createController('signin'),
    signupc = Alloy.createController('signup');

$.index.open();
$.signup.addEventListener('click', function(){
 $.nav.open(signupc.getView());
});

$.signin.addEventListener('click', function(){
  $.nav.open(signinc.getView());
});

$.continueb.addEventListener('click', function(){
  homec.getView().open();
});

