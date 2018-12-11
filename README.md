# Roll-19

Team Pic:





Project Name: Roll 19
(A lite version of Roll 20)



Team Competency:
Dustin: 1 summer of internship (web dev), 5th semester, comfortable with: Java, JavaScript/JQuery, HTML, C; familiar with: C#, CSS, TypeScript, MySQL

Shlok: 1 summer of Internship, 5th Semester, comfortable with Java, HTML, C/C++, MySQL, JS, bash

Anthony: 3rd semester at Iowa State with 2 semesters at a transfer school.  On my 3rd semester as a Software Engineering Intern with Maverick Software Consulting.  I've taken Com S 319 which has a very similar semester long project.  Comfortable with Java, JavaScript, HTML, CSS.  Okay with C/C++

Qilin: 7th semester, comfortable with Java, C++, familiar with C, HTML, CSS and JavaScript



Description of project:
Roll 20 is a site to assist players in playing Tabletop RPG Dungeons and Dragons. It provides many functionalities like an in game chat, storing players' character sheets, allowing players to roll virtual dice, and providing map support.

The biggest things we want is the base game, with the above mentioned features, and other smaller peripherals. Should time permit we would like to add offline support. In offline mode players would connect to a single "host" device, all chat longs and dice rolls would be saved to the host device to be uploaded to the server when reconnected. Secondly, we would like to add support for mobile clients.  If we are able to complete all of these core features there are a number of extra features we would like to implement bellow.  

Random extra features:

DM should have access to all players' sheets so he can do passive perception checks.  

Able to draw on the map, not just place pictures. 

Able to upload your own images to place on map.

Languages: Java, MySQL, Spring



Complexity: 

Client: connects with server/host
Receive character sheets, maps, and chats from server/host
Realtime(ish), no timing-based events, but still needs to be constantly refreshing

Server: all game data in databases

Databases: character sheets, maps, chat history

Plan to make it for web and mobile if time allows.

Spring is a framework that most of us have not used before.



(For our use: this wiki before we made it to a proposal https://docs.google.com/document/d/1_lq-cBodoX_y4xh5GqWv75qUj8pzYBvpKzutwOU6Fo0/edit)

Features sheet from class:



Feature brainstorming:

CHAT:
input cleansing
"channel" toggling
history stored in a .txt
timestamping
"whisper" functionality
console

ROLLING:
kind of dice and amount
GUI and command
ADVANCED random
threshold beating (individual or total)
print results to chat
roll in secret (for DM)
