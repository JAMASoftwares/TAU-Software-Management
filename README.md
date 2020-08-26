# TAU-Software-Management
Management tool for Tampere University software licensing and installations.

# Usage info
This is a Node.js web-application project. It reads and writes data into JSON file using websocket server. The server files are adopted into the same project. To run and use web site complete and succesfully requires running nodejs server.

Highly recommended is to use Nodemon which is available in npm.

Websocket server file is located in /SW Management/public_html/webserver/

Run it via terminal/command prompt like this (mac/linux):
- npm install -g nodemon
- nodemon ws-server.js 

Or
- node ws-server.js

<h3> Project Screenshots </h3>

<div align="center">
    <img src="/acceptedsw.png" style="width: 70%; margin: 30px;">
    <img src="/sworderform.png" style="width: 70%; margin: 30px;">
    <img src="/requestofsw.png" style="width: 70%; margin: 30px;">
    <img src="/licensingsw.png" style="width: 70%; margin: 30px;">
    <img src="/footer.png" style="width: 70%; margin: 30px;">
</div>

# Process schemas

<div align="center">
    <br>
    <img src="/Prosessikaavio.jpg" width="70%"</img>
</div>
