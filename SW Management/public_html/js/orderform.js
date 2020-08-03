/* 
 Created on : 28 Jun 2020, 11.01.38
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

document.getElementById('sw-order-form').addEventListener('submit', function (e) {
    e.preventDefault(); //to prevent form submission
    alert('click');
});

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    console.log("n = " + n + ", x = " + x.length);
    if (n === x.length - 1) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
    }
    // Näytetään n:s "lomakevälilehti", tyyli riippuu välilehden sisällön asettelusta 
    if (n === 0) {
        x[n].style.display = "grid";
    } else if (n === 1 || n === 2) {
        x[n].style.display = "block";
    }

    //... and fix the Previous/Next buttons:
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    if (n === 1) {
        document.getElementById("prevBtn").style.display = "inline";
    } else {
        document.getElementById("prevBtn").style.display = "none";
    }


    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n);
}

function nextPrev(n) {
    console.log("Next button pressed! n = " + n);
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) { 
        return false;
    }
    // Setting form data visible in next summary tab parapgraphs
    if (currentTab === 0) { 
        // Tällöin vain next button mahdollinen eli 'n' oltava '1', siirrytään overview -näkymään.
        dataOverview(); // Rakennetaan taulukko lomakkeen datasta
    } 
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if you have reached the end of the form...
    if (currentTab === x.length - 1) {
        // ... the form gets submitted:
        saveFormData();
        showTab(currentTab);
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}


function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    sel = x[currentTab].getElementsByTagName("select");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        if (i === 3) { // We have multi select input
            const multiInput = document.querySelector('multi-input');
            if (!(multiInput.getValues().length > 0)) {
                y[i].className += " invalid";
                valid = false;
            }
        }
        // If a field is empty...
        if (y[i].value === "" && i !== 3) {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // Validating 'select' inputs
    for (i = 0; i < sel.length; i++) {
        if (sel[i].value === "") {
            sel[i].className += " invalid";
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}


function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    var tab_number = document.getElementsByClassName("tab").length;

    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }

    if (currentTab === tab_number - 1) {
        for (i = 0; i < x.length; i++) {
            x[i].className += " ready";
        }

    } else {
        //... and adds the "active" class on the current step:
        x[n].className += " active";
    }
}

function dataOverview() {
    const tabs = document.getElementsByClassName("tab");
    const paraps = document.getElementsByClassName("sw-details");
    const inputs = tabs[currentTab].getElementsByTagName("input");
    const select = document.getElementById("resp");
    const multiInput = document.querySelector('multi-input');
    const textarea = document.getElementById("add");

    var text, classList, inputs_index = 0;

    for (var i = 0; i < paraps.length; i++) {
        text = "";
        if (i === 2) {
            text = select.value;
        } else if (i === 4) {
            classList = multiInput.getValues();
            for (var j = 0; j < classList.length; j++) {
                text += classList[j] + " ";
            }
            inputs_index++;
        } else if (i === 7) {
            text = textarea.value;
        } else {
            text = inputs[inputs_index].value;
            inputs_index++;
        }
        console.log("Lisätään teksti '" + text + "' p-elementtiin");
        paraps[i].innerHTML = text;
        console.log("Verifioidaan lisäys: teksti '"
                + paraps[i].innerHTML + "' on p-elementissä");
    }
}

function createSWObjFromFormData() {
    console.log("Luodaan sw -objektiattribuutti...");

    var class_string = "", email_string = "", i;

    var luokat = document.querySelector('multi-input').getValues();
    for (i = 0; i < luokat.length; i++) {
        // Viimeisen luokannimen perään ei laiteta ';' -merkkiä
        if (i < luokat.length - 1) {
            class_string += luokat[i] + ";";
        } else {
            class_string += luokat[i];
        }
    }

    var emails = document.getElementById("email").value.replace(/\s+/g, '').split(',');
    for (i = 0; i < emails.length; i++) {
        if (i < emails.length - 1) {
            email_string += emails[i] + ";";
        } else {
            email_string += emails[i];
        }
    }

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date + ' ' + time;
    
    var sw_obj = {
        name: document.getElementById("software_name").value,
        versio: document.getElementById("software_version").value,
        yksikkö: document.getElementById("resp").value,
        tilaaja_email: email_string,
        luokat: class_string,
        tarveaika: document.getElementById("start").value.replace(/-/g, '.') + " to " +
                document.getElementById("end").value.replace(/-/g, '.'),
        lisätiedot: document.getElementById("add").value,
        req_date: dateTime
    };
    console.log(sw_obj);

    return sw_obj;
}

function saveFormData() {
    requestToJSON(createSWObjFromFormData());
}

const softwareMap = function (softwares) {
    const swMap = {};
    for (let i = 0; i < softwares.length; i++) {
        const name = softwares[i].name;
        swMap[name] = softwares[i].versio;
    }

    return swMap;
};

const classMap = function (softwares) {
    var classMap = new Array();
    let sw_obj, sw_classes;
    for (let i = 0; i < softwares.length; i++) {
        sw_obj = softwares[i];
        sw_classes = sw_obj.luokat.split(';');
        classMap = classMap.concat(sw_classes);
    }
    classMap.sort();
    let unique = [...new Set(classMap)];

    return unique;
};

const fillClassList = function (class_map) {
    var datalist = document.getElementById("class_names");
    var class_amount = class_map.length;
    console.log("Classroom number: " + class_amount);

    var room_name, opt, i;
    // Tämä on merkkijonolista luokille
    var classList = new Array();

    // Kerätään listalle html koodissa lisätyt perus-luokat
    for (i = 0; i < datalist.options.length; i++) {
        classList.push(datalist.options.item(i).value);
    }

    for (i = 0; i < class_amount; i++) {
        room_name = class_map[i];
        console.log("Option " + room_name + " created");
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode(room_name));
        opt.value = room_name;

        if (!classList.includes(room_name)) {
            datalist.appendChild(opt);
            classList.push(room_name);
        }
    }
};

const fillSWList = function (swMap) {
    let allSoftwares = "";
    for (const software in swMap) {
        allSoftwares += "<option value ='" + software + "'>";
    }
    document.getElementById("software_names").innerHTML = allSoftwares;
};


let sw_name_version_map, class_map;

(async () => {
    softwares = await getJSON(sw_data_url);
    //console.log(softwares);
    sw_name_version_map = softwareMap(softwares);
    console.log(sw_name_version_map);
    class_map = classMap(softwares);
    console.log(class_map);
    fillClassList(class_map);
    fillSWList(sw_name_version_map);
})();
