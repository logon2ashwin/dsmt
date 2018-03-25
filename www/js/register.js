
var register = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        // this.receivedEvent('deviceready');
    },
    
};

register.initialize();

var onregister  = function(){
    console.log(db);
    var newuser = {
        name : document.getElementById('name').value,
        phone : document.getElementById('phone').value,
        password : document.getElementById('password').value,
        aadharnumber : document.getElementById('aadharnumber').value,
        email : document.getElementById('email').value
    }

    var result = true;
    db.forEach(function(a){
        if(newuser.email == a.email){
           alert('User already exists');
           result = false;
        }
    })
    if(result){
       db.push(newuser);
       alert('Registration Successfull')
       window.location.href='./index.html'
    }
}
