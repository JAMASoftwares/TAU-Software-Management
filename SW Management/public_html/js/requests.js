/* 
 Created on : 14 Jul 2020, 11.24.01
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

const constructTable = function (tableid, requests) {

    const table = document.getElementById(tableid);
    const theaderRow = document.getElementById("theader");
    var string = ""; // Tiedon väliaikaiseen varastointiin taulukon solussa
    //
    // Lisätään checkbox taulukon otsakeriville
    const th_checkAll = document.createElement("th");
    const custom_checkbox = createAcceptedBox("");
    custom_checkbox.querySelector("input").id = "select_all";
    th_checkAll.appendChild(custom_checkbox);
    th_checkAll.onclick = sortTable(0);

    theaderRow.insertBefore(th_checkAll, theaderRow.childNodes[0]);

    for (var i = 0; i < requests.length; i++) {
        const row = document.createElement("tr");

        const td_accepted = document.createElement("td");
        td_accepted.style.alignItems = "center";
        var accepted = requests[i].accepted;
        const checkbox = createAcceptedBox("", accepted);

        //td_accepted.style.border = "2px solid black";
        td_accepted.appendChild(checkbox);

        const td_name = document.createElement("td");
        td_name.appendChild(document.createTextNode(requests[i].name));

        const td_versio = document.createElement("td");
        td_versio.appendChild(document.createTextNode(requests[i].versio));

        const td_yksikkö = document.createElement("td");
        td_yksikkö.appendChild(document.createTextNode(requests[i].yksikkö));

        const td_tilaaja_email = document.createElement("td");
        const email_list = requests[i].tilaaja_email.split(';');
        email_list.sort();
        string = "";
        for (var j = 0; j < email_list.length; j++) {
            string += email_list[j] + "\n";
        }
        td_tilaaja_email.appendChild(document.createTextNode(string));

        const td_luokat = document.createElement("td");
        const class_list = requests[i].luokat.split(';');
        class_list.sort();
        string = "";
        for (var j = 0; j < class_list.length; j++) {
            string += class_list[j] + "\n";
        }
        td_luokat.appendChild(document.createTextNode(string));

        const td_pvm = document.createElement("td");
        td_pvm.appendChild(document.createTextNode(requests[i].req_date));

        row.appendChild(td_accepted);
        row.appendChild(td_name);
        row.appendChild(td_versio);
        row.appendChild(td_yksikkö);
        row.appendChild(td_tilaaja_email);
        row.appendChild(td_luokat);
        row.appendChild(td_pvm);

        table.appendChild(row);
    }
};

const setCheckItAll = function () {
    console.log("Setting 'check all' checkbox");
    var dataTable = document.getElementById('sw_req');
    var checkItAll = dataTable.querySelector('#select_all');
    console.log(checkItAll);
    var inputs = dataTable.querySelectorAll('input');

    console.log("Inputs from 'setCheckItAll' function: " + inputs.length);

    checkItAll.addEventListener('change', function () {
        if (checkItAll.checked) {
            inputs.forEach(function (input) {
                if (input.disabled === false) {
                    input.checked = true;
                }
            });
        } else {
            inputs.forEach(function (input) {
                if (input.disabled === false) {
                    input.checked = false;
                }
            });
        }
    });
};

const checkIfAllIsChecked = function (inputs) {
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].checked) {
            return false;
        } 
    }
    return true;
};

const setStatus = function (input, status) {
    if (status === true) {
        input.checked = true;
    }
};

const setCheckBoxChangeListener = function () {
    console.log("Setting eventlisteners for checkboxes");
    var dataTable = document.getElementById('sw_req');
    var inputs = Array.from(dataTable.querySelectorAll('input'));
    const headerCheckBox = inputs.shift();
    const saveButton = document.getElementById('table_save_button');
    console.log("Inputs from 'setCheckBoxChangeListener' function: " + inputs.length);
    
    if (!checkIfAllIsChecked(inputs)) {
        headerCheckBox.addEventListener('change', function () {
            saveButton.style.display = "block";
        });
    }
    
    inputs.forEach(function (input) {
        input.addEventListener('change', function () {
            saveButton.style.display = "block";
        });
    });
};

const createAcceptedBox = function (text, accepted) {

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    span.textContent = text;
    span.className = "si-label line-across";
    input.type = "checkbox";
    input.checked = accepted;
    if (accepted === true) {
        input.disabled = true;
        span.textContent = "accepted";
    }
    label.className = "si si-checkbox";
    label.appendChild(input);
    label.appendChild(span);
    return label;
};


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sw_req");
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

const saveList = function () {
    const data_table = document.getElementById("sw_req");
    const table_rows = data_table.querySelectorAll('tr');
    var swnames_to_reject = [], swnames_to_accept = [];
    var i, row, row_input, swList = [];

    console.log("SW requests: " + (table_rows.length - 1));

    for (i = 1; i < table_rows.length; i++) {
        row = table_rows[i];
        row_input = row.querySelector('input');
        if (row_input.checked && !row_input.disabled) {
            swnames_to_accept.push(row.cells[1].innerHTML); // Lisää sovelluksen nimen listaan
            row.querySelector('input').disabled = true;
        }
    }
    console.log("SW requests accepted: " + swnames_to_accept.length);
    console.log("Accepted software: " + swnames_to_accept[0]);
    // Päivitetään muiden käyttäjien varalta selaimen välimuistiin tallennettu sovelluslista
    updateSoftwareList();

    // Käydään läpi sovelluspyyntölista, joka on luettu muuttujaan 'requests'
    console.log("swList length before: " + swList.length);
    for (i = 0; i < requests.length; i++) {
        var sw_obj = requests[i];
        if (!(swnames_to_accept.indexOf(sw_obj.name) < 0)) {
            sw_obj.accepted = true;
            swList.push(sw_obj);
        }
    }
    console.log("swList length after: " + swList.length);

    if (swList.length === 1) {
        toJSON(swList[0]);
    } else if (swList.length > 1) {
        listToJSON(swList);
    }

    requestListToJSON(requests);

    document.getElementById('table_save_button').style.display = "none";
};

(async () => {
    requests = await getJSON(sw_requests_url);
    constructTable('sw_req', requests);
    setCheckItAll();
    setCheckBoxChangeListener();
})();

