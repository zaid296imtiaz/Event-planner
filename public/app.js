var database = firebase.database().ref('/');
var inputFName = document.getElementById('inputFName');
var inputSName = document.getElementById('inputSName');
var inputEmail = document.getElementById('inputEmail');
var inputPass = document.getElementById('inputPass');

function submit() {
    var user = {
        nameF: inputFName.value,
        nameS: inputSName.value,
        email: inputEmail.value,
        pass: inputPass.value
    }

    firebase.auth().createUserWithEmailAndPassword(user.email, user.pass)
    .then(function(res){
        // console.log(res);
        database.child('loguser/' + res.uid).set(user)
        .then( () => location = 'login.html');
    })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });

         
}

