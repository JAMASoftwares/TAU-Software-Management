/* 
 Created on : 14 Jul 2020, 11.24.01
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

const col_reject = "col0";
const col_accept = "col1";
const col_sw_name = "col2";
const col_sw_version = "col3";
const col_yksikko = "col4";
const col_email = "col5";
const col_luokat = "col6";
const col_tarve_a = "col7";
const col_tarve_b = "col8";
const col_lisatieto = "col9";


const constructTable = function (tableid, requests) {

    const table = document.getElementById(tableid);
    const theaderRow = document.getElementById("theader");
    var string = ""; // Tiedon väliaikaiseen varastointiin taulukon solussa
    //
    // Lisätään checkbox taulukon otsakeriville
    const th_accept = document.createElement("th");
    const accept_checkbox = createAcceptedBox("", false);
    const img_a = document.createElement("img");
    img_a.src = "img/accept.png";
    img_a.className = "table-control";
    accept_checkbox.querySelector("input").id = "select_all_a";
    var span = accept_checkbox.querySelector("span");
    span.className = span.className.replace(" line-across", "");
    th_accept.appendChild(accept_checkbox);
    th_accept.querySelector('label').appendChild(img_a);
    th_accept.querySelector('span').textContent = "Accept";
    th_accept.querySelector('span').style.color = "white";
    th_accept.onclick = sortTable(1);

    theaderRow.insertBefore(th_accept, theaderRow.childNodes[0]);
    
 
    const th_remove = document.createElement("th");
    const remove_checkbox = createRejectedBox("", false);
    const img_r = document.createElement("img");
    img_r.src = "img/reject.png";
    img_r.className = "table-control";
    remove_checkbox.querySelector("input").id = "select_all_r";
    th_remove.appendChild(remove_checkbox);
    th_remove.querySelector('label').appendChild(img_r);
    th_remove.onclick = sortTable(0);
    
    
    theaderRow.insertBefore(th_remove, theaderRow.childNodes[0]);

    for (var i = 0; i < requests.length; i++) {
        const row = document.createElement("tr");
        
        const td_rejected = document.createElement("td");
        td_rejected.style.alignItems = "center";
        var rejected = requests[i].rejected;
        const checkbox_r = createRejectedBox(rejected);
        td_rejected.appendChild(checkbox_r);
        
        const td_accepted = document.createElement("td");
        td_accepted.style.alignItems = "center";
        var accepted = requests[i].accepted;
        const checkbox_a = createAcceptedBox("", accepted);
        td_accepted.appendChild(checkbox_a);

        const td_name = document.createElement("td");
        td_name.appendChild(document.createTextNode(requests[i].name));

        const td_versio = document.createElement("td");
        td_versio.appendChild(document.createTextNode(requests[i].versio));

        const td_vastuuyksikot = document.createElement("td");        
        const itemsToShow = extractString(requests[i].yksikkö, '(', ')');
        console.log(itemsToShow);
        string = "";
        for (var j = 0; j < itemsToShow.length; j++) {
            string += itemsToShow[j] + "\n";
        }
        td_vastuuyksikot.appendChild(document.createTextNode(string));

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
        
        const td_tarve_a = document.createElement("td");
        td_tarve_a.appendChild(document.createTextNode(requests[i].tarve_alku));
        
        const td_tarve_l = document.createElement("td");
        td_tarve_l.appendChild(document.createTextNode(requests[i].tarve_loppu));
        
        const td_lisatiedot = document.createElement("td");
        const div_lisatiedot = document.createElement("div");
        div_lisatiedot.className = "additions";
        div_lisatiedot.appendChild(document.createTextNode(requests[i].lisätiedot));
        td_lisatiedot.appendChild(div_lisatiedot);

        const td_pvm = document.createElement("td");
        td_pvm.appendChild(document.createTextNode(requests[i].req_date));

        row.appendChild(td_rejected);
        row.appendChild(td_accepted);
        row.appendChild(td_name);
        row.appendChild(td_versio);
        row.appendChild(td_vastuuyksikot);
        row.appendChild(td_tilaaja_email);
        row.appendChild(td_luokat);
        row.appendChild(td_tarve_a);
        row.appendChild(td_tarve_l);
        row.appendChild(td_lisatiedot);
        row.appendChild(td_pvm);

        table.appendChild(row);
    }
};

function filterSoftwares() {
    var input, filter, table, rows, td, i, txtValue;
    input = document.getElementById("softwaresearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("sw_req");
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

const setCheckItAll = function (checkbox_id, childrens_class) {
    console.log("Setting 'check all' checkbox");
    var dataTable = document.getElementById('sw_req');
    var checkItAll = dataTable.querySelector(checkbox_id);
    console.log(checkItAll);
    var inputs = dataTable.querySelectorAll(childrens_class);

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
    // Accept boxes
    var inputs_a = Array.from(dataTable.querySelectorAll('.accept-box'));
    const headerAcceptBox = inputs_a.shift();
    // Reject boxes
    var inputs_r = Array.from(dataTable.querySelectorAll('.reject-box'));
    const headerRejectBox = inputs_r.shift();
    
    const saveButton = document.getElementById('table_save_button');
    const cancelButton = document.getElementById('table_cancel_button');
    const rejectButton = document.getElementById('table_reject_button');
    const accrej_switch = document.getElementById('controls');
    console.log("Accept inputs from 'setCheckBoxChangeListener' function: " + inputs_a.length);
    console.log("Reject inputs from 'setCheckBoxChangeListener' function: " + inputs_r.length);
    
    // Setting accept boxes
    if (!checkIfAllIsChecked(inputs_a)) {
        headerAcceptBox.addEventListener('change', function () {
            if (headerAcceptBox.checked === true) {
                cancelButton.style.display = "inline";
                saveButton.style.display = "inline";
                accrej_switch.disabled = true;
            } else {
                cancelButton.style.display = "none";
                saveButton.style.display = "none";
                accrej_switch.disabled = false;
            }
            
        });
    }
    
    inputs_a.forEach(function (input) {
        input.addEventListener('change', function () {
            cancelButton.style.display = "inline";
            saveButton.style.display = "inline";
            accrej_switch.disabled = true;
        });
    });
    
    // Setting reject boxes
    if (!checkIfAllIsChecked(inputs_r)) {
        headerRejectBox.addEventListener('change', function () {
            if (headerRejectBox.checked === true) {
                cancelButton.style.display = "inline";
                rejectButton.style.display = "inline";
                accrej_switch.disabled = true;
            } else {
                cancelButton.style.display = "none";
                rejectButton.style.display = "none";
                accrej_switch.disabled = false;
            }
        });
    }
    
    inputs_r.forEach(function (input) {
        input.addEventListener('change', function () {
            cancelButton.style.display = "inline";
            rejectButton.style.display = "inline";
            accrej_switch.disabled = true;
        });
    });
};

const disableRejects = function () {
    
};

const disableAccepts = function () {
    
};

const removeSelections = function () {
    var dataTable = document.getElementById('sw_req');
    var inputs = Array.from(dataTable.querySelectorAll("input"));
    const selectAllCheckBox_r = inputs.shift();
    const selectAllCheckbox_a = inputs.shift();
    const saveButton = document.getElementById('table_save_button');
    const cancelButton = document.getElementById('table_cancel_button');
    const rejectButton = document.getElementById('table_reject_button');
    const accrejButton = document.getElementById('controls');
    console.log("Inputs from 'removeSelections' function: " + inputs.length);
    
    inputs.forEach(function (input) {
        //console.log("Input disabled status: " + input.disabled);
        //console.log("Input checked status: " + input.checked);
        if (input.disabled === false && input.checked === true) {
            input.checked = false;
        }
    });
    
    cancelButton.style.display = "none";
    saveButton.style.display = "none";
    rejectButton.style.display = "none";
    accrejButton.disabled = false;
    
};

const createAcceptedBox = function (text, accepted) {

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    
    span.textContent = text;
    span.className = "si-label si-label-accepted line-across";
    input.type = "checkbox";
    input.className = "accept-box";
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

const createRejectedBox = function (rejected) {

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const img = document.createElement("img");
    
    img.src = "img/cross.png";
    img.class = "reject-cross";
    img.display = "none";
    
    span.className = "si-label si-label-rejected line-across";
    input.type = "checkbox";
    input.className = "reject-box";
    input.checked = rejected;
    input.appendChild(img);
    
    if (rejected === true) {
        input.disabled = true;
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
    var i, row, row_accept_input, row_reject_input, swList = [];

    console.log("SW requests: " + (table_rows.length - 1));

    for (i = 1; i < table_rows.length; i++) {
        row = table_rows[i];
        row_accept_input = row.querySelector('.accept-box');
        row_reject_input = row.querySelector('.reject-box');
        if (row_accept_input.checked && !row_accept_input.disabled) {
            swnames_to_accept.push(row.cells[2].innerHTML); // Lisää sovelluksen nimen listaan
            row.querySelectorAll('input').disabled = true;
        } else if (row_reject_input.checked && !row_reject_input.disabled) {
            swnames_to_reject.push(row.cells[2].innerHTML); // Lisää sovelluksen nimen listaan
            row.querySelectorAll('input').disabled = true;
        }
    }
    console.log("SW requests accepted: " + swnames_to_accept.length);
    console.log("Accepted software: " + swnames_to_accept[0]);
    console.log("SW requests rejected: " + swnames_to_reject.length);
    console.log("Rejected software: " + swnames_to_reject[0]);
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
    document.getElementById('table_cancel_button').style.display = "none";
};

function rejectList() {
    console.log("rejectList() is not implemented yet!!");
}

(async () => {
    requests = await getJSON(sw_requests_url);
    constructTable('sw_req', requests);
    setCheckItAll("#select_all_a", ".accept-box");
    setCheckItAll("#select_all_r", ".reject-box");
    setCheckBoxChangeListener();
    
    const tbl = document.getElementById("sw_req");
    var classes = getClasses(tbl.rows[0]);
    setClasses(tbl, classes);

    console.log(location.href);
    
    showDefaultColumnsForRequests();
})();


function showDefaultColumnsForRequests() {
    toggleCol(col_yksikko);
    toggleCol(col_reject);
}

function getClasses(row) {
    // var cn = 0;
    var classes = new Array();
    for (var x = 0; x < row.cells.length; x++) {
        var cell = row.cells[x];
        var c = new Column(cell.textContent.trim(), cell.offsetLeft, cell.offsetLeft + cell.offsetWidth, x);
        classes[x] = c;
    }
    return classes;
}

function Column(name, left, right, cols) {
    this.name = name;
    this.left = left;
    this.right = right;
    this.cols = cols;
}

function setClasses(table, classes) {
    // var rowSpans = new Array();
    for (var x = 0; x < table.rows.length; x++) {
        var row = table.rows[x];
        for (var y = 0; y < row.cells.length; y++) {
            var cell = row.cells[y];
            for (var z = 0; z < classes.length; z++) {
                if (cell.offsetLeft >= classes[z].left && cell.offsetLeft <= classes[z].right) {
                    cell.className = "sp col" + classes[z].cols;
                }
            }
        }
    }
}

// Copy paste from licensing.js
function toggleCol(name) {
    var cols = document.getElementsByClassName(name);
    //console.log("toggleCol: Löytyi sarakkeita nimellä " + name + " " + cols.length + " kpl");
    for (var x = 0; x < cols.length; x++) {
        cols[x].style.display = (cols[x].style.display === 'none') ? '' : 'none';
    }
}

document.getElementById('controls').addEventListener('click', function (event) {
    event.preventDefault();
    const col0 = document.getElementsByClassName(col_accept)[0];
    if (col0.style.display !== 'none') {
        this.className = "menu-button tomato";
    } else {
        this.className = "menu-button green";
    }
    toggleCol(col_reject);
    toggleCol(col_accept);
});

document.getElementById('customer_cols').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_yksikko);
    toggleCol(col_email);
});
document.getElementById('target_cols').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_luokat);
    toggleCol(col_tarve_a);
    toggleCol(col_tarve_b);
});
document.getElementById('additions').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_lisatieto);
});
