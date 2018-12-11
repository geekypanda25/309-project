'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var mapForm = document.querySelector('#mapForm');

var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

function sendMap(event){

    if(stompClient){
        var mapInfo = mapContentsToObject();
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(mapInfo));
    }

    event.preventDefault();
}

function mapContentsToObject(){
    console.log("mapContentsToObject");
    var gameGrid = document.getElementsByClassName("gameGrid")[0];
    var gameBoard = gameGrid.querySelector("#gameBoard");

    var mapImage = ""; //TODO: implement when decisions on storing images are made
    var mapHeight = gameBoard.getAttribute("data-height");
    var mapWidth = gameBoard.getAttribute("data-width");
    var gridSize = gameBoard.getAttribute("data-gridSize");

    var markersInfoArray = [];

    var markers = gameGrid.querySelectorAll(".marker");

    var i=0;
    for(i=0; i<markers.length; i++){
        var m = markers[i];
        var markerInfo = {
            x: m.parentNode.getAttribute("data-x"),
            y: m.parentNode.getAttribute("data-y"),
            color: m.style.backgroundColor,
            symbol: m.innerHTML,
            image: "",
            name: m.title,
            size: m.getAttribute("data-size"),
            permissions: ""
        };
        markersInfoArray.push(markerInfo);
    }

    var gameBoardInfo = {
        image: mapImage,
        height: mapHeight,
        width: mapWidth,
        gridSize: gridSize,
        markers: markersInfoArray,
        type: 'MAPUPDATE'
        //TODO: HERE DUD
    }

    var returnable = {
        type: 'MAPUPDATE',
        content: JSON.stringify(gameBoardInfo),
        sender: username
    }

    return returnable;
}

function onMessageReceived(payload) {

    var message = JSON.parse(payload.body);

    if(message.type == 'MAPUPDATE'){
        console.log("type == MAPUPDATE");
        populateMapFromJSON(JSON.parse(message.content));
        return;
    }

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)
mapForm.addEventListener('submit', sendMap, true)






///////////////////////////////////MAP STUFF/////////////
function previewFile(){
    var preview = document.getElementById("gameBoard");
    var file = document.getElementById("mapImage").files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}

function createMap(){

    emptyMap();

    var mapHeight = document.getElementById("mapHeight").value;
    var mapWidth = document.getElementById("mapWidth").value;
    var gridSize = document.getElementById("gridSize").value;

    var cols = Math.floor(mapWidth / gridSize);
    var rows = Math.floor(mapHeight / gridSize);

    var gameBoard = document.querySelector('#gameBoard');
    var gameGrid = document.getElementsByClassName("gameGrid")[0];

    gameBoard.style.height = (mapHeight + "px");
    gameBoard.style.width = (mapWidth + "px");

    gameBoard.setAttribute("data-height", mapHeight);
    gameBoard.setAttribute("data-width", mapWidth);
    gameBoard.setAttribute("data-gridSize", gridSize);

    var i=0;
    var j=0;
    for(i=0; i<cols; i++){
        for(j=0; j<rows; j++){
            var tile = document.createElement('div');
            tile.style.position = 'absolute';
            tile.style.left = i*gridSize + "px";
            tile.style.top = j*gridSize + "px";
            tile.style.width = gridSize + "px";
            tile.style.height = gridSize + "px";
            tile.style.zIndex = "10000";
            tile.setAttribute("data-x", i);
            tile.setAttribute("data-y", j);
            gameGrid.appendChild(tile);
            tile.addEventListener("click", function(dest){return function(){moveMarker(dest)};}(5 + i*rows + j));
            tile.addEventListener("mouseover", function(){this.classList.add("hoveringTile");});
            tile.addEventListener("mouseout", function(){this.classList.remove("hoveringTile");});
        }
    }

    //gameGrid.childNodes[5].appendChild(createMarker(gridSize));

    var markerControls = document.getElementsByClassName("markerControls")[0];
    markerControls.querySelectorAll("button.addMarker")[0].addEventListener("click", function(gridSize){return function(){addMarker(gridSize);}}(gridSize));
    if(markerControls.classList.contains("hidden")){
        toggleVisibility(markerControls);
    }

}

function emptyMap(){
    var gameBoard = document.querySelector('#gameBoard');
    var gameGrid = document.getElementsByClassName("gameGrid")[0];

    var oldTiles = gameGrid.querySelectorAll("div");

    var i=0;
    for(i=0; i<oldTiles.length; i++){
        if(oldTiles[i].parentNode == gameGrid){
            gameGrid.removeChild(oldTiles[i]);
        }
    }
}

function moveMarker(dest){
    var toMove = document.getElementsByClassName("actionTarget")[0];
    var gameGrid = document.getElementsByClassName("gameGrid")[0];
    if(gameGrid.classList.contains("trackMouse")){
        gameGrid.childNodes[dest].appendChild(toMove);
    }
}

function createMarker(size){
    var marker = document.createElement('div');
    marker.style.width = size + "px";
    marker.style.height = size + "px";
    marker.setAttribute("data-size", 1);
    marker.style.backgroundColor = "blue";
    marker.classList.add("marker");
    marker.addEventListener("click", function(marker){return function(){markerClickHandler(marker)};}(marker));
    return marker;
}

function addMarker(size){

    var gameGrid = document.getElementsByClassName("gameGrid")[0];

    unmarkActionTargets(0);

    var marker = createMarker(size);
    marker.classList.add("actionTarget");
    document.getElementById("invisible").appendChild(marker);
    gameGrid.classList.add("trackMouse");

}

function markerClickHandler(marker){
    if(unmarkActionTargets(marker)){
        document.getElementsByClassName("gameGrid")[0].classList.remove("trackMouse");
        return; //comment this line if intended behavior changes so clicking a marker should mark that one to move
    }
    document.getElementsByClassName("gameGrid")[0].classList.toggle("trackMouse");
    marker.classList.toggle("actionTarget");
}

function unmarkActionTargets(exceptionMarker){
    var toMoves = document.getElementsByClassName("actionTarget");
    var unmarkedSomething = false;
    var i = 0;
    for(i=0; i<toMoves.length; i++){
        if(toMoves[i] == exceptionMarker){
            continue;
        }
        toMoves[i].classList.remove("actionTarget");
        unmarkedSomething = true;
    }
    return unmarkedSomething;
}

function styleMarker(){
    if(document.getElementsByClassName("actionTarget").length <= 0){
        return;
    }
    var toStyle = document.getElementsByClassName("actionTarget")[0];
    var color = document.getElementsByClassName("styleColor")[0].value;
    var text = document.getElementsByClassName("styleText")[0].value;
    var title = document.getElementsByClassName("styleTitle")[0].value;
    var size = document.getElementsByClassName("styleSize")[0].value - 1;

    var offset = size * parseInt(toStyle.style.width)/2;

    toStyle.style.backgroundColor = color;
    toStyle.innerHTML = text;
    toStyle.title = title;
    toStyle.style.padding = offset + "px";
    toStyle.style.left = "-" + offset + "px";
    toStyle.style.top = "-" + offset + "px";
    toStyle.setAttribute("data-size", size);

    document.getElementsByClassName("styleText")[0].value = "";
    document.getElementsByClassName("styleTitle")[0].value = "";
    document.getElementsByClassName("styleSize")[0].value = 1;

    if(document.getElementsByClassName("styleImage")[0].files.length > 0){
        var file = document.getElementsByClassName("styleImage")[0].files[0];
        var reader  = new FileReader();

        reader.onloadend = function(){
            toStyle.style.backgroundImage = "url(" + reader.result + ")";
            document.getElementsByClassName("styleImage")[0].value = "";
        }

        if(file){
            reader.readAsDataURL(file);
        }

    }

}

function destroyMarker(){
    if(document.getElementsByClassName("actionTarget").length <= 0){
        return;
    }
    var toDestroy = document.getElementsByClassName("actionTarget")[0];
    toDestroy.parentNode.removeChild(toDestroy);
    document.getElementsByClassName("gameGrid")[0].classList.remove("trackMouse")
}

/*function mapContentsToObject(){
    var gameGrid = document.getElementsByClassName("gameGrid")[0];
    var gameBoard = gameGrid.querySelector("#gameBoard");

    var mapImage = ""; //TODO: implement when decisions on storing images are made
    var mapHeight = gameBoard.getAttribute("data-height");
    var mapWidth = gameBoard.getAttribute("data-width");
    var gridSize = gameBoard.getAttribute("data-gridSize");

    var markersInfoArray = [];

    var markers = gameGrid.querySelectorAll(".marker");

    var i=0;
    for(i=0; i<markers.length; i++){
        var m = markers[i];
        var markerInfo = {
            x: m.parentNode.getAttribute("data-x"),
            y: m.parentNode.getAttribute("data-y"),
            color: m.style.backgroundColor,
            symbol: m.innerHTML,
            image: "",
            name: m.title,
            size: m.getAttribute("data-size"),
            permissions: ""
        };
        markersInfoArray.push(markerInfo);
    }

    var gameBoardInfo = {
        image: mapImage,
        height: mapHeight,
        width: mapWidth,
        gridSize: gridSize,
        markers: markersInfoArray,
        type: 'MAPUPDATE'
    }

    console.log(gameBoardInfo);
    return gameBoardInfo;
}*/

function yeetJSONtoServer(toYeet){
    var jsonFormattedYeetable = JSON.stringify(toYeet);
    console.log(jsonFormattedYeetable); //delete this line
    //do magic
}

function toggleVisibility(element){
    if(element.classList.contains("hidden")){
        element.classList.remove("hidden");
        if(element.parentNode.querySelector(".toggleVisibilityButton")){
            element.parentNode.querySelector(".toggleVisibilityButton").innerHTML = "-";
        }
    }
    else {
        element.classList.add("hidden");
        if(element.parentNode.querySelector(".toggleVisibilityButton")){
            element.parentNode.querySelector(".toggleVisibilityButton").innerHTML = "+";
        }
    }
}

function createFakeJSON(){

    var markersInfoArray = [];

    var markerInfo1 = {
        x: "5",
        y: "5",
        color: "#db3f17",
        symbol: "r",
        image: "",
        name: "I am red",
        size: "1",
        permissions: ""
    };
    markersInfoArray.push(markerInfo1);

    var markerInfo2 = {
        x: "7",
        y: "7",
        color: "#ff80c0",
        symbol: "p",
        image: "",
        name: "I am big pink",
        size: "3",
        permissions: ""
    };
    markersInfoArray.push(markerInfo2);


    var gameBoardInfo = {
        image: "",
        height: "160",
        width: "304",
        gridSize: "10",
        markers: markersInfoArray
    }

    console.log(JSON.stringify(gameBoardInfo));
    return JSON.stringify(gameBoardInfo);
}

function populateMapFromJSON(parsedJSON){
    console.log("populateMapFromJSON()");
    var gameGrid = document.getElementsByClassName("gameGrid")[0];
    var gameBoard = gameGrid.querySelector("#gameBoard");

    var mapHeight = parseInt(parsedJSON.height);
    var mapWidth = parseInt(parsedJSON.width);
    var gridSize = parseInt(parsedJSON.gridSize);
    var mapImage = parsedJSON.image;
    var markers = parsedJSON.markers;

    document.getElementById("mapHeight").value = mapHeight;
    document.getElementById("mapWidth").value = mapWidth;
    document.getElementById("gridSize").value = gridSize;

    createMap();

    var i=0;
    for(i=0; i<markers.length; i++){
        var m = markers[i];
        addMarker(parsedJSON.gridSize);
        var tile = gameGrid.querySelectorAll("[data-x='" + m.x + "']")[m.y];
        tile.click();

        document.getElementsByClassName("styleColor")[0].value = m.color;
        document.getElementsByClassName("styleText")[0].value = m.symbol;
        document.getElementsByClassName("styleTitle")[0].value = m.name;
        document.getElementsByClassName("styleSize")[0].value = m.size;

        styleMarker();
    }

    unmarkActionTargets(0);
    document.getElementsByClassName("gameGrid")[0].classList.remove("trackMouse");

}
