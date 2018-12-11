
var i = 0;
var monNameid = 0;
var formatedlist;
var allMons = "";

window.onload = $.get("monsterlist.txt", function(response) {
    formatedlist= response.split( "\n" )

    window.localStorage;
    loadLocalStorage();
    addElement();

});



function addElement () {
    for(1 in allMons
        //let entry of formatedlist
    ){
        //create new monster div
        var newTr = document.createElement('tr');
        newTr.id = "mon"+monNameid;
        monNameid++;
        newTr.className = "monster";

        //begin making monster sections div
        mon = entry.split(',');
        mon[0] = mon[0].trim();
        mon[1] = mon[1].trim();
        mon[2] = mon[2].trim();
        var newTr = monHTMLRow(mon[0], mon[1], mon[2]);

        //append new div
        document.getElementById("monsterElements").appendChild(newTr);
    }

    for(1 in allMons
        //let entry of allMons
        ){
        var temp = entry.split(',');
        var newTr = monHTMLRow(temp[0], temp[1], temp[2]);

        //append new div
        document.getElementById("monsterElements").appendChild(newTr);

    }
}


function addMonsterToDoc() {

    allMons +=  document.getElementById("newMonName").value +","+ document.getElementById("newMonAttack").value +","+ document.getElementById("newMonDesc").value +"\n";

    var newTr = monHTMLRow(document.getElementById("newMonName").value, document.getElementById("newMonAttack").value, document.getElementById("newMonDesc").value);

    //append new div
    document.getElementById("monsterElements").appendChild(newTr);

    document.getElementById("newMonName").value = "";
    document.getElementById("newMonAttack").value = "";
    document.getElementById("newMonDesc").value = "";
    showHide();
    storeLocal();
}

function loadLocalStorage(){
    if(!localStorage.getItem('monsters')) {
        Window.localStorage;

    } else {
        allMons = localStorage.getItem('monsters');
        allMons = allMons.split("\n");
    }
}

function storeLocal() {

    localStorage.setItem("monsters", allMons);
}

function addMon() {
    var toAdd ="";

    allMons = allMons + document.getElementById("newMonName").value +","+ document.getElementById("newMonAttack").value +","+ document.getElementById("newMonDesc").value+ "\n";
    toAdd = allMons.split(",");
    toAdd[2] = toAdd[2].trim("\n");

    var newTr = monHTMLRow(toAdd[0], toAdd[1], toAdd[2]);

    //append new div
    document.getElementById("monsterElements").appendChild(newTr);

    document.getElementById("newMonName").value = "";
    document.getElementById("newMonAttack").value = "";
    document.getElementById("newMonDesc").value = "";
    storeLocal();

}

function monHTMLRow(name, att, text){

    var newTr = document.createElement('tr');
    newTr.id = "mon"+monNameid;
    monNameid++;
    newTr.className = "monster";

    //create new name for monster div
    var newContent = document.createElement('td');
    newContent.className = "name";
    var newText =  document.createTextNode(name);
    newContent.appendChild(newText);
    newTr.appendChild(newContent);

    //create new damage for monster div
    newContent = document.createElement('td');
    newContent.className = "attack";
    newText = document.createTextNode(att);
    newContent.appendChild(newText);
    newTr.appendChild(newContent);

    //create new text for monster div
    newContent = document.createElement('td');
    newContent.className = "text";
    newText = document.createTextNode(text);
    newContent.appendChild(newText);
    newTr.appendChild(newContent);

    //return new row
    return newTr;
}

function showHide() {
    var x = document.getElementById("monsterAdd");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}






