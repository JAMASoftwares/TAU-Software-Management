# TAU-Software-Management
Management tool for Tampere University software licensing and installations.

# Usage info
This is a Node.js web-application project. It reads and writes data into JSON file using websocket server. The server files are adopted into the same project. To run and use web site complete and succesfully requires running nodejs server.

Highly recommended is to use Nodemon which is avalalable in npm.

Websocket server file is located in /SW Management/public_html/webserver/

Run it via terminal/command prompt like this (mac/linux):
- npm install -g nodemon
- nodemon ws-server.js 

Or
- node ws.server.js
