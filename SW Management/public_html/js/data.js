/* 
 Created on : 7 Jul 2020, 11.36.33
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

/* 
 * Näille on ehkä löydettävä Websocket -ratkaisu.
 * Voidaan myös käyttää suoria web-osoitteita internetissä jaettuun sisältöön 
 * */
const sw_data_url = "webserver/data/software.json";
const sw_requests_url = "webserver/data/requests.json";

let ws = new WebSocket("ws://localhost:8000");
console.log(ws);

ws.onopen = (event) => {
    var msg = {type: "gen-msg", data: "I am so exited I am connected! It is like a Christmas!"};
    ws.send(JSON.stringify(msg));
};

ws.onmessage = (event) => {
    console.log(event);
};

const getJSON = function (url) {
    return fetch(url).then(function (response) {
        return response.json();
    });
};

const toJSON = function (sw_object) {
    console.log("Sending into JSON file...");

    var msg = {type: "json", data: sw_object};

    ws.send(JSON.stringify(msg));
};

const requestToJSON = function (sw_object) {
    console.log("Sending into JSON file...");

    var msg = {type: "json-req", data: sw_object};

    ws.send(JSON.stringify(msg));
};

const requestListToJSON = function (sw_object_list) {
    console.log("Sending list of SW requests into JSON file...");

    var msg = {type: "json-req-list", data: sw_object_list};

    ws.send(JSON.stringify(msg));
};

const listToJSON = function (sw_object_list) {
    console.log("Sending list of SW into JSON file...");

    var msg = {type: "json-list", data: sw_object_list};

    ws.send(JSON.stringify(msg));
};

const swListContains = function (name, list) {
    var contains = false;

    for (var i = 0; i < list.length; i++) {
        if (list[i].name === name) {
            contains = true;
        }
    }

    return contains;
};

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sw_stats");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
         first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
             one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
             based on the direction, asc or desc:*/
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again.*/
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

let requests, softwares;

async function updateSoftwareList() {
    console.log("Updating software lists...");
    softwares = await getJSON(sw_data_url);
    requests = await getJSON(sw_requests_url);
}


