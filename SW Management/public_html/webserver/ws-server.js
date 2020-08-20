/* 
 Created on : 10 Jul 2020, 17.59.41
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

const http = require('http');
const websocket = require('ws');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});

const wss = new websocket.Server({server});
wss.on('headers', (headers, req) => {
    console.log(headers);
});

wss.on('connection', (ws, req) => {
    ws.send("Welcome to the websocket server!!");
    
    ws.on('message', (msg) => {

        var json_msg = JSON.parse(msg);

        if (json_msg.type === 'json') {
            console.log("Datatype 'json' received!");
            var sw_data = fs.readFileSync('data/software.json');
            const sw_list = JSON.parse(sw_data);
            if (swExist(sw_list, json_msg.data)) {
                overWriteSoftware(sw_list, json_msg.data);
            } else {
                sw_list.push(json_msg.data);
            }
            sw_data = JSON.stringify(sw_list, null, 2);
            fs.writeFile('data/software.json', sw_data, finished);

        } else if (json_msg.type === 'json-list') {
            console.log("Datatype 'json-list' received!");
            var sw_data = fs.readFileSync('data/software.json');
            const sw_list = JSON.parse(sw_data);
            var sw_object_list_from_client = json_msg.data;
            for (var i = 0; i < sw_object_list_from_client.length; i++) {
                sw_list.push(sw_object_list_from_client[i]);
            }
            //sortTable(sw_list);
            sw_data = JSON.stringify(sw_list, null, 2);
            fs.writeFile('data/software.json', sw_data, finished);

        } else if (json_msg.type === 'json-req') {
            console.log("Datatype 'json' received!");
            var sw_data = fs.readFileSync('data/requests.json');
            const sw_list = JSON.parse(sw_data);
            sw_list.push(json_msg.data);
            //sortTable(sw_list);
            sw_data = JSON.stringify(sw_list, null, 2);
            fs.writeFile('data/requests.json', sw_data, finished);

        } else if (json_msg.type === 'json-req-list') {
            console.log("Datatype 'json-list' received!");
            var sw_data = fs.readFileSync('data/requests.json');
            const sw_list = JSON.parse(sw_data);
            var sw_object_list_from_client = json_msg.data;
            // Tämä ei tee muuta kuin synkronoi ohjelmistopyyntölistat muuttujan "accepted" suhteen.
            for (var i = 0; i < sw_object_list_from_client.length; i++) {
                sw_list[i].accepted = sw_object_list_from_client[i].accepted;
            }
            //sortTable(sw_list);
            sw_data = JSON.stringify(sw_list, null, 2);
            fs.writeFile('data/requests.json', sw_data, finished);

        }

        console.log(msg);

    });
    
});

/*
wss.on('json', (msg) => {

    var json_msg = JSON.parse(msg);

    console.log("Datatype 'json' received!");
    var sw_data = fs.readFileSync('data/software.json');
    const sw_list = JSON.parse(sw_data);

    if (swExist(sw_list, json_msg.data)) {
        overWriteSoftware(sw_list, json_msg.data);
    }
    sw_list.push(json_msg.data);
    sortTable(sw_list);

    sw_data = JSON.stringify(sw_list, null, 2);
    fs.writeFile('data/software.json', sw_data, finished);
});

wss.on('json-list', (msg) => {

    var json_msg = JSON.parse(msg);

    console.log("Datatype 'json-list' received!");
    var sw_data = fs.readFileSync('data/software.json');
    const sw_list = JSON.parse(sw_data);
    var sw_object_list_from_client = json_msg.data;

    for (var i = 0; i < sw_object_list_from_client.length; i++) {
        sw_list.push(sw_object_list_from_client[i]);
    }
    //sortTable(sw_list);
    sw_data = JSON.stringify(sw_list, null, 2);
    fs.writeFile('data/software.json', sw_data, finished);
});

wss.on('json-req', (msg) => {

    var json_msg = JSON.parse(msg);

    console.log("Datatype 'json' received!");
    var sw_data = fs.readFileSync('data/requests.json');
    const sw_list = JSON.parse(sw_data);
    sw_list.push(json_msg.data);
    //sortTable(sw_list);
    sw_data = JSON.stringify(sw_list, null, 2);
    fs.writeFile('data/requests.json', sw_data, finished);
});

wss.on('json-req-list', (msg) => {

    var json_msg = JSON.parse(msg);

    console.log("Datatype 'json-list' received!");
    var sw_data = fs.readFileSync('data/requests.json');
    const sw_list = JSON.parse(sw_data);
    var sw_object_list_from_client = json_msg.data;
    for (var i = 0; i < sw_object_list_from_client.length; i++) {
        sw_list[i].accepted = sw_object_list_from_client[i].accepted;
    }
    //sortTable(sw_list);
    sw_data = JSON.stringify(sw_list, null, 2);
    fs.writeFile('data/requests.json', sw_data, finished);
});
*/

function finished(err) {
    console.log("Objects are written into file. All set.");
}

function swExist(sw_list, sw_obj) {
    var same_obj = false;
    for (var i = 0; i < sw_list.length; i++) {
        var comp = sw_list[i];
        if (comp.name === sw_obj.name && comp.version === sw_obj.version) {
            same_obj = true;
        }
    }
    return same_obj;
}

function compineSoftwares() {

}

function overWriteSoftware(sw_list, sw_obj) {

    const swobject = sw_list.find(sw => sw.name === sw_obj.name);
    console.log("Found object by name: " + swobject.name);
    swobject.name = sw_obj.name;
    swobject.versio = sw_obj.versio;
    swobject.luokat = sw_obj.luokat;
    swobject.tilaaja_email = sw_obj.tilaaja_email;

    for (var i = 0; i < sw_list.length; i++) {
        if (sw_list[i].name === sw_obj.name) {
            // Muokattavat tiedot
            sw_list[i].yksikkö = sw_obj.yksikkö;
            sw_list[i].tilaaja_email = sw_obj.tilaaja_email;
            sw_list[i].luokat = sw_obj.luokat;
            sw_list[i].lisätiedot = sw_obj.lisätiedot;
            sw_list[i].lh_kommentit = sw_obj.lh_kommentit;
            sw_list[i].sw_reg = sw_obj.sw_reg;
            sw_list[i].smadikortti_nro = sw_obj.smadikortti_nro;
            sw_list[i].pak_pyynto_tik_nro = sw_obj.pak_pyynto_tik_nro;
            sw_list[i].asennustapa = sw_obj.asennustapa;
            sw_list[i].tilannetieto = sw_obj.tilannetieto;
            if (sw_obj.packaged === "false") {
                sw_list[i].packaged = false;
            } else if (sw_obj.packaged === "true") {
                sw_list[i].packaged = true;
            }
            if (sw_obj.installed === "false") {
                sw_list[i].installed = false;
            } else if (sw_obj.installed === "true") {
                sw_list[i].installed = true;
            }
            
            //sw_list.splice(i, 1);
            break;
        }
    }
}

function sortTable(arr) {
    arr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
}

server.listen(8000);