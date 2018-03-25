
var options = '';
var bal = '';
 
var getlocaldb = function(){
    var db = JSON.parse(localStorage.getItem('database'));
    if(db.length) return db[0];
    else return db;
}
var getlocalbenificiary = function(){
    return JSON.parse(localStorage.getItem('benificiary'));
}
var setlocal = function(value,data){
    data = JSON.stringify(data);
    localStorage.setItem(value,data);
}

// Get the modal
var dsmtmodal = document.getElementById('dsmtmodal');
var itmodal = document.getElementById('itmodal');

// Get the button that opens the modal
var dsmtbtn = document.getElementById("dsmt");
var itbtn = document.getElementById("it");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
dsmtbtn.onclick = function() {
    document.getElementById('toaccount').innerHTML = options
    dsmtmodal.style.display = "block";
}
itbtn.onclick = function() {
    document.getElementById('toitaccount').innerHTML = options
    itmodal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    dsmtmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == dsmtmodal) {
        dsmtmodal.style.display = "none";
    }
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    itmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == itmodal) {
        itmodal.style.display = "none";
    }
}

var itdismiss = function(){
    itmodal.style.display = "none";
    document.location.reload()
}
var dsmtdismiss = function(){
    dsmtmodal.style.display = "none";
    document.location.reload()
}
// end of modal functions


var itTransfer = function(){
    var password = document.getElementById('itpassword').value;

    if(password == getlocaldb().password){
        var aadhar = document.getElementById('toitaccount').value;
        var amount = document.getElementById('toit').value;
        console.log(aadhar,amount);
        var tempdb = getlocaldb();
        tempdb.balance = parseInt(tempdb.balance) - parseInt(amount);
        setlocal('database',tempdb)

        var tempbenificiary = getlocalbenificiary();

        tempbenificiary.forEach(function(a){
            if(a.aadharnumber == aadhar){
                a.balance = parseInt(a.balance) + parseInt(amount);
            }
        })
        setlocal('benificiary',tempbenificiary)
        itdismiss();
    }else{
        alert('Password mismatch')
    }
}
var DSMTtransfer = function(){
    var aadhar = document.getElementById('toaccount').value;
    var amount = document.getElementById('todsmt').value;
    console.log(aadhar,amount);
    var tempdb = getlocaldb();
    tempdb.balance = parseInt(tempdb.balance) - parseInt(amount);
    setlocal('database',tempdb)

    var tempbenificiary = getlocalbenificiary();

    tempbenificiary.forEach(function(a){
        if(a.aadharnumber == aadhar){
            a.balance = parseInt(a.balance) + parseInt(amount);
        }
    })
    setlocal('benificiary',tempbenificiary)
    dsmtdismiss();
}
var authenticatedsmt = function(){
    FingerprintAuth.isAvailable(function (result) {
        console.log("FingerprintAuth available: " + JSON.stringify(result));
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
                DSMTtransfer();
            }, function(err){
                alert('Fingerprint mismatch');
            });
        }
    }, function (message) {
        alert('No fingerprint sensor detected')
    });
} 
var renderoptions = function(){

    benificiary.forEach(function(a){
        options += "<option value="+ a.aadharnumber +"><span class='text-capitalize'>"+ a.name +"</span></option>"
    })
}



// initialize
var dashboard = {
    initialize: function() {
        if(!localStorage.length){
            localStorage.setItem('database', JSON.stringify(db));
            localStorage.setItem('benificiary',JSON.stringify(benificiary));
        }

        renderoptions();
        bal = document.getElementById('balance').innerText
        bal += getlocaldb().balance;
        document.getElementById('balance').innerText = bal;
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
      
    },
    
};

dashboard.initialize();

