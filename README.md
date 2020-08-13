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

# Project Screenshots

<div align="center">
    <img src="/accepted_sw.png" style="width='100%'; margin:30px;">
    <img src="/sw_order.png" width="100%">
    <img src="/ordered_sw.png" width="100%">
</div>

# Process schemas

<div align="center">
    <br>
    <img src="/Prosessikaavio.jpg" width="100%"</img>
</div>
