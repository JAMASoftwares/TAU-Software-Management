/* 
 Created on : 26 Jun 2020, 13.59.58
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

/* global fetch, caseMap, swMap */

(() => {
    console.log("Hello from index.js!");
})();


const constructTable = function (tableid, softwares) {

    const table = document.getElementById(tableid);
    var string = ""; // Tiedon väliaikaiseen varastointiin taulukon solussa

    for (var i = 0; i < softwares.length; i++) {
        const row = document.createElement("tr");

        const td_name = document.createElement("td");
        td_name.appendChild(document.createTextNode(softwares[i].name));

        const td_versio = document.createElement("td");
        td_versio.appendChild(document.createTextNode(softwares[i].versio));

        const td_yksikkö = document.createElement("td");
        td_yksikkö.appendChild(document.createTextNode(softwares[i].yksikkö));

        const td_tilaaja_email = document.createElement("td");
        const email_list = softwares[i].tilaaja_email.split(/[\n;]+/);
        console.log("We are trying to parse email list from database");
        console.log(email_list);
        email_list.sort();
        console.log(email_list);
        string = "";
        for (var j = 0; j < email_list.length; j++) {
            if (j < email_list.length - 1) {
                string += email_list[j] + "\n";
            } else {
                string += email_list[j];
            }
            
        }
        td_tilaaja_email.appendChild(document.createTextNode(string));

        const td_luokat = document.createElement("td");
        const class_list = softwares[i].luokat.split(';');
        class_list.sort();
        string = "";
        for (var j = 0; j < class_list.length; j++) {
            if (j < class_list.length - 1) {
                string += class_list[j]  + "\n";
            } else {
                string += class_list[j];
            }
        }
        td_luokat.appendChild(document.createTextNode(string));

        const td_tarveaika = document.createElement("td");
        
        /*
        const parts = softwares[i].tarveaika.split(',');
        string = "";
        for (var j = 0; j < parts.length; j++) {
            string += parts[j] + "\n";
        }
        */
        td_tarveaika.appendChild(document.createTextNode(softwares[i].tarveaika));

        const td_lisätiedot = document.createElement("td");
        td_lisätiedot.appendChild(document.createTextNode(softwares[i].lisätiedot));
        td_lisätiedot.setAttribute("contenteditable", true);

        row.appendChild(td_name);
        row.appendChild(td_versio);
        row.appendChild(td_yksikkö);
        row.appendChild(td_tilaaja_email);
        row.appendChild(td_luokat);
        row.appendChild(td_tarveaika);
        row.appendChild(td_lisätiedot);

        table.appendChild(row);
    }

};


function filterSoftwares() {
    var input, filter, table, rows, td, i, txtValue;
    input = document.getElementById("softwaresearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("sw_stats");
    rows = table.getElementsByTagName("tr");

    var match = false;

    for (i = 1; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName("td");
        match = false;
        for (var j = 0; j < cells.length; j++) {
            td = cells[j];

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    match = true;
                }
            }
        }
        if (match) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }
}

/**
 * Insert item into "todo" list
 * 
 * @param {string} text for list item
 * @returns {undefined}
 */
const addListItem = function (text) {
    const todoList = document.getElementById("todo");
    const listItem = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    span.textContent = text;
    span.className = "si-label line-across";

    input.type = "checkbox";
    const inputId = todoList.lastChild.id + 1;
    input.id = inputId;

    label.className = "si si-checkbox";
    label.for = inputId;

    todoList.appendChild(listItem);
    listItem.appendChild(label);
    label.appendChild(input);
    label.appendChild(span);

};

/**
 * Defines what happens when Add todo button pressed.
 * 
 * @param {object} e Parent node
 * @returns {undefined}
 */
const submitHandler = function (e) {
    // TODO: implement this function
    e.preventDefault();
    const TEXT_INPUT = document.querySelector("input#type-input").value;

    if (!(!TEXT_INPUT || /^\s*$/.test(TEXT_INPUT))) {
        addListItem(TEXT_INPUT);
    }
    document.querySelector("input#type-input").value = "";
};

/**
 * Handler for list items. Functionality based on state of list item. Removes list
 * item from todo list, if it is marked as done. Otherwise marks it as done.
 * 
 * @param {object} e Parent node
 * @returns {undefined}
 */
const listClickHandler = function (e) {
    e.preventDefault;
    const liElem = e.target;
    if (liElem.tagName === "LI") {
        const parent = liElem.parentNode;
        if (liElem.classList.contains("done")) {
            parent.removeChild(liElem);
        } else {
            liElem.classList.add("done");
        }
    }
};


let sw_name_version_map, class_map;

(async () => {
    softwares = await getJSON(sw_data_url);
    console.log(softwares);
    constructTable('sw_stats', softwares);
})();