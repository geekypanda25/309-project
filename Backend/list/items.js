
var i = 0;
var itemNameid = 0;
var formatedlist;
var allitems = "";

window.onload = $.get("itemlist.txt", function(response) {
    formatedlist= response.split( "\n" )

    window.localStorage;
    loadLocalStorage();
    addElement();

});



function addElement () {
    for(let entry of formatedlist){
        //create new item div
        var newTr = document.createElement('tr');
        newTr.id = "item"+monNameid;
        itemNameid++;
        newTr.className = "monster";

        //begin making item sections div
        item = entry.split(',');
        item[0] = item[0].trim();
        item[1] = item[1].trim();
        item[2] = item[2].trim();
        var newTr = monHTMLRow(item[0], item[1], itrem[2]);

        //append new div
        document.getElementById("monsterElements").appendChild(newTr);
    }

    for(let entry of allitems){
        var temp = entry.split(',');
        var newTr = monHTMLRow(temp[0], temp[1], temp[2]);

        //append new div
        document.getElementById("monsterElements").appendChild(newTr);

    }
}


function addItemToDoc() {

    allitems +=  document.getElementById("newMonName").value +","+ document.getElementById("newMonAttack").value +","+ document.getElementById("newMonDesc").value +"\n";

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
        allitems = localStorage.getItem('monsters');
        allitems = allitems.split("\n");
    }
}

function storeLocal() {

    localStorage.setItem("monsters", allMons);
}

function addItem() {
    var toAdd ="";

    allitems = allitems + document.getElementById("newMonName").value +","+ document.getElementById("newMonAttack").value +","+ document.getElementById("newMonDesc").value+ "\n";
    toAdd = allitems.split(",");
    toAdd[2] = toAdd[2].trim("\n");

    var newTr = monHTMLRow(toAdd[0], toAdd[1], toAdd[2]);

    //append new div
    document.getElementById("monsterElements").appendChild(newTr);

    document.getElementById("newMonName").value = "";
    document.getElementById("newMonAttack").value = "";
    document.getElementById("newMonDesc").value = "";
    storeLocal();

}

function itemHTMLRow(name, att, text){

    var newTr = document.createElement('tr');
    newTr.id = "item"+itemNameid;
    itemNameid++;
    newTr.className = "item";

    //create new name for monster div
    var newContent = document.createElement('td');
    newContent.className = "name";
    var newText =  document.createTextNode(name);
    newContent.appendChild(newText);
    newTr.appendChild(newContent);

    //create new damage for monster div
    newContent = document.createElement('td');
    newContent.className = "damage";
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
    var x = document.getElementById("itemAdd");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}






