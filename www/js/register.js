
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

    var result = db.filter(function(a){
        if(name == a.name || name == a.email){
            if(password == a.password){
                return 'found';
            }else{
                return 'wrongpass';
            }
        }else{
            return 'notfound'
        }
    })
    if(result == 'found'){
        window.location.href = './dashboard.html';
    }else if(result == 'wrongpass'){
        alert('Incorrect password');
    }else if(result == 'notfound'){
        alert('User not found');
    }
}

var fingerprint = function(){
    FingerprintAuth.isAvailable(function (result) {
        
        console.log("FingerprintAuth available: " + JSON.stringify(result));
        // If has fingerprint device and has fingerprints registered
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
            alert(encryptConfig.username,encryptConfig.password);
            // Set config and success callback
            FingerprintAuth.encrypt(encryptConfig, function(_fingerResult){
                // alert('detected');
                console.log("successCallback(): " + JSON.stringify(_fingerResult));
                if (_fingerResult.withFingerprint) {
                    console.log("Successfully encrypted credentials.");
                    console.log("Encrypted credentials: " + result.token);  
                } else if (_fingerResult.withBackup) {
                    console.log("Authenticated with backup password");
                }
            // Error callback
            }, function(err){
                    if (err === "Cancelled") {
                    console.log("FingerprintAuth Dialog Cancelled!");
                } else {
                    console.log("FingerprintAuth Error: " + err);
                }
            });
        }
    }, function (message) {
        console.log("isAvailableError(): " + message);
        alert('No fingerprint sensor detected')
    });
}