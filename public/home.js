var database = firebase.database().ref('/');

var getEventName = document.getElementById('eventName');
var getEvLoc = document.getElementById('eventLocation');
var getEvDate = document.getElementById('eventDate');
var getEvTime = document.getElementById('eventTime');
var getEvDes = document.getElementById('eventDescription');
var eventDiv = document.getElementById('eventDiv');
var getModal = document.getElementById('createEventBtn');
var homeLi = document.getElementById('homeLi');

homeLi.setAttribute('class', 'nav-item active');

var user = JSON.parse(localStorage.getItem('userloged'));
var uName = user.nameF + ' ' + user.nameS;

var userID = localStorage.getItem('uid');

function create() {

    if (getEventName.value == '' || getEvLoc.value == '' || getEvDate.value == '' || getEvTime == '') {
        alert('Please complete the required fields')
    }
    else {

        var planObj = {
            uname: uName,
            name: getEventName.value,
            evLocation: getEvLoc.value,
            date: getEvDate.value,
            time: getEvTime.value,
            description: getEvDes.value
        }

        //push to firebase to user as well as all
        database.child('loguser/' + userID + '/plans').push(planObj)
        database.child('allplans').push(planObj);

        // data-dismiss="modal"
        getModal.setAttribute('data-dismiss', 'modal');
    }
}

var i = 0;

database.child('allplans').on('child_added', snapshot => {

    var snapVal = snapshot.val();

    var colors = ['#4CAF50', '#009688', '#2196F3', '#795548', '#607D8B', '#673AB7'];

    var singleEvDiv = document.createElement('div');
    singleEvDiv.setAttribute('class', 'container p-3 mb-4 text-dark bg-light rounded')
    singleEvDiv.style = 'box-shadow: 0 10px 15px 2px #E0E0E0; border-top: 10px solid ' + colors[i] + ';'; i++;



    var eventHead = document.createElement('h1');
    eventHead.setAttribute('class', 'display-4 text-center mb-4');
    eventHead.style = 'font-size: 40px';
    var autoCap = snapVal.name;
    autoCap = autoCap.charAt(0).toUpperCase() + autoCap.slice(1);
    eventHead.appendChild(document.createTextNode(autoCap));

    var totalTable = document.createElement('table');
    totalTable.setAttribute('class', 'table p-2');

    var tRowLoc = document.createElement('tr');
    // tRowDate.setAttribute('class',)

    var thLoc = document.createElement('th');
    thLoc.setAttribute('class', 'text-center');
    thLoc.appendChild(document.createTextNode('Location'));
    tRowLoc.appendChild(thLoc);

    var tdLocTxt = document.createElement('td');
    tdLocTxt.setAttribute('class', 'text-center');
    tdLocTxt.appendChild(document.createTextNode(snapVal.evLocation));
    tRowLoc.appendChild(tdLocTxt);

    totalTable.appendChild(tRowLoc);
    
    var tRowDate = document.createElement('tr');
    
        var thDate = document.createElement('th');
        thDate.setAttribute('class', 'text-center');
        thDate.appendChild(document.createTextNode('Date'));
        tRowDate.appendChild(thDate);
    
        var tdDateTxt = document.createElement('td');
        tdDateTxt.setAttribute('class', 'text-center');
        tdDateTxt.appendChild(document.createTextNode(snapVal.date));
        tRowDate.appendChild(tdDateTxt);
    
        totalTable.appendChild(tRowDate);

    var tRowTime = document.createElement('tr');
    
        var thTime = document.createElement('th');
        thTime.setAttribute('class', 'text-center');
        thTime.appendChild(document.createTextNode('Time'));
        tRowTime.appendChild(thTime);
    
        var tdTimeTxt = document.createElement('td');
        tdTimeTxt.setAttribute('class', 'text-center');
        tdTimeTxt.appendChild(document.createTextNode(snapVal.time));
        tRowTime.appendChild(tdTimeTxt);
    
        totalTable.appendChild(tRowTime);

    var tRowDes = document.createElement('tr');
    
        var thDes = document.createElement('th');
        thDes.setAttribute('class', 'text-center pt-4');
        thDes.setAttribute('colspan', '2');
        thDes.appendChild(document.createTextNode('Description'));
        tRowDes.appendChild(thDes);

        totalTable.appendChild(tRowDes);

    var tRowDesTxt = document.createElement('tr');
    
        var tdDesTxt = document.createElement('td');
        tdDesTxt.setAttribute('class', 'm-4 bg-white rounded')
        tdDesTxt.setAttribute('colspan', '2');
        var autoCapDes = snapVal.description;
         autoCapDes = autoCapDes.charAt(0).toUpperCase() + autoCapDes.slice(1);
         tdDesTxt.appendChild(document.createTextNode(autoCapDes));
        tRowDesTxt.appendChild(tdDesTxt);

        totalTable.appendChild(tRowDesTxt);


    var userNam = document.createElement('p');
    userNam.setAttribute('class', 'p text-muted text-right');
    userNam.style = 'font-size: 24px;'
    userNam.appendChild(document.createTextNode('Event created by ' + snapVal.uname));

    var btnDiv = document.createElement('div');
    btnDiv.setAttribute('class', 'row fluid justify-content-center');

    var goBtn = document.createElement('button');
    goBtn.setAttribute('class', 'btn ml-3 btn-info col-3');
    goBtn.appendChild(document.createTextNode('Going'));
    goBtn.onclick = go;

    var nGoBtn = document.createElement('button');
    nGoBtn.setAttribute('class', 'btn ml-3 btn-secondary col-3');
    nGoBtn.appendChild(document.createTextNode('Not Going'));
    nGoBtn.onclick = nGo;

    singleEvDiv.appendChild(eventHead);
    singleEvDiv.appendChild(totalTable);
    singleEvDiv.appendChild(userNam);
    btnDiv.appendChild(goBtn);
    btnDiv.appendChild(nGoBtn);
    singleEvDiv.appendChild(btnDiv);

    eventDiv.appendChild(singleEvDiv);

    database.child('allplans/' + snapshot.key + '/go').on('child_added', snap => {

        var snapshotVal1 = snap.val();

        if( userID == snapshotVal1){
            goBtn.style = 'visibility: hidden';
            nGoBtn.style = 'visibility: hidden';
    
            var editSelect = document.createElement('button');
            editSelect.setAttribute('class', 'btn btn-link container-fluid justify-content-end');
            editSelect.appendChild(document.createTextNode('Edit'));
    
            var ngnTxt = document.createElement('p');
            ngnTxt.setAttribute('class', 'text-success text-center');
            ngnTxt.style = 'font-size: 24px';
            ngnTxt.appendChild(document.createTextNode('Going'));
    
            singleEvDiv.appendChild(ngnTxt);
            // console.log(snapshotVal1)
            // singleEvDiv.appendChild(editSelect);
            // editSelect.onclick = edit;
        }
    })

    database.child('allplans/' + snapshot.key + '/ngo').on('child_added', snap => {

        var snapshotVal2 = snap.val();

        if( userID == snapshotVal2){
            goBtn.style = 'visibility: hidden';
            nGoBtn.style = 'visibility: hidden';
    
            var editSelect = document.createElement('button');
            editSelect.setAttribute('class', 'btn btn-link container-fluid justify-content-end');
            editSelect.appendChild(document.createTextNode('Edit'));
    
            var ngnTxt = document.createElement('p');
            ngnTxt.setAttribute('class', 'text-danger text-center');
            ngnTxt.style = 'font-size: 24px';
            ngnTxt.appendChild(document.createTextNode('Not Going'));
    
            singleEvDiv.appendChild(ngnTxt);
            // singleEvDiv.appendChild(editSelect);
            // editSelect.onclick = edit;
        }
    })

    // function edit() {
    //     database.child('loguser/' + userID + '/going').on('child_added', snaps => {

    //         console.log(snaps.key);
    //     })
    // }

    function go() {
        
        database.child('loguser/' + userID + '/going').push(snapVal);

        database.child('allplans/' + snapshot.key + '/go').push(userID);

        // goBtn.style = 'visibility: hidden';
        // nGoBtn.style = 'visibility: hidden';

        // var editSelect = document.createElement('button');
        // editSelect.setAttribute('class', 'btn btn-link container-fluid justify-content-end');
        // editSelect.appendChild(document.createTextNode('Edit'));

        // var ngnTxt = document.createElement('p');
        // ngnTxt.setAttribute('class', 'text-success text-center');
        // ngnTxt.style = 'font-size: 24px';
        // ngnTxt.appendChild(document.createTextNode('Going'));

        // singleEvDiv.appendChild(ngnTxt);
        // singleEvDiv.appendChild(editSelect);
    }

    function nGo() {
        
        database.child('loguser/' + userID + '/notgoing').push(snapVal);

        database.child('allplans/' + snapshot.key + '/ngo').push(userID);

        // goBtn.style = 'visibility: hidden';
        // nGoBtn.style = 'visibility: hidden';

        // var editSelect = document.createElement('button');
        // editSelect.setAttribute('class', 'btn btn-link container-fluid justify-content-end');
        // editSelect.appendChild(document.createTextNode('Edit'));

        // var ngnTxt = document.createElement('p');
        // ngnTxt.setAttribute('class', 'text-danger text-center');
        // ngnTxt.style = 'font-size: 24px';
        // ngnTxt.appendChild(document.createTextNode('Not Going'));

        // singleEvDiv.appendChild(ngnTxt);
        // singleEvDiv.appendChild(editSelect);
    }
})