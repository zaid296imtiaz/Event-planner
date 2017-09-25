var getEmail = document.getElementById('input2');
var getPass = document.getElementById('input3');
var database = firebase.database().ref('/');

document.getElementById('stop')
  .addEventListener('submit', event => {
    event.preventDefault();

    var user = {
      email: getEmail.value,
      pass: getPass.value
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
      .then(success => {
        database.child('loguser/' + success.uid)
          .once('value', snapshot => {
            // console.log(snapshot.val());
            var convert = JSON.stringify(snapshot.val());
            localStorage.setItem('userloged', convert);
            localStorage.setItem('uid', success.uid);
            // console.log(snapshot.uid)
            // localStorage.setItem('user', JSON.stringify(user));
            location = 'home.html';
          })

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });

    //  console.log(user)
    //  console.log(firebase)
    // alert();
  });