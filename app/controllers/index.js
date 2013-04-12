var homec = Alloy.createController('home'),
    signinc = Alloy.createController('signin'),
    signupc = Alloy.createController('signup');

$.index.open();
$.signup.addEventListener('click', function(){
  signupc.getView().open();
});

$.signin.addEventListener('click', function(){
  signinc.getView().open();
});

$.continueb.addEventListener('click', function(){
  homec.getView().open();
});

