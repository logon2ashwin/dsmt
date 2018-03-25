
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        // this.receivedEvent('deviceready');
    },
    
};

app.initialize();

var goregister = function(){
    window.location.href = './register.html'
}
var onlogin  = function(){
    console.log(db);
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var result = false;
    db.forEach(function(a){
        if(name == a.name || name == a.email){
            if(password == a.password){
                result = true;
            }
        }
    });
    if(result){
        window.location.href = './dashboard.html';
    }else{
        alert('User not found');
    }
}

var fingerprint = function(){
    FingerprintAuth.isAvailable(function (result) {
        if (result.isAvailable == true && result.hasEnrolledFingerprints == true) {
            var encryptConfig = {
                clientId: "DSMT",
                username: "raghul",
                password: "raghul333",
                maxAttempts: 5,
                locale: "en_US",
                dialogTitle: "Hey dude, your finger",
                dialogMessage: "Put your finger on the device",
                dialogHint: ""
            };

            FingerprintAuth.encrypt(encryptConfig, function(_fingerResult){
                window.location.href = './dashboard.html'
            }, function(err){
                alert('Fingerprint mismatch');
            });
        }
    }, function (message) {
        console.log("isAvailableError(): " + message);
        alert('No fingerprint sensor detected')
    });
}