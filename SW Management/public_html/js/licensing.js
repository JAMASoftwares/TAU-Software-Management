
/* 
 Created on : 20 Jul 2020, 22.04.25
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

console.log("Hello from licensing.js");

const col_edit_bg_color = 'lightgray';
const col_edit_border_style = '2px solid black';

const col_sw_name = "col0";
const col_sw_version = "col1";
const col_yksikko = "col2";
const col_email = "col3";
const col_luokat = "col4";
const col_tarve_alku = "col5";
const col_tarve_loppu = "col6";
const col_lisatieto = "col7";
const col_lh_kommentit = "col8";
const col_lh_swreg = "col9";
const col_lh_smadi = "col10";
const col_lh_pak_tnro = "col11";
const col_pak_asennustapa = "col12";
const col_pak_paketoitu = "col13";
const col_pak_asennettu = "col14";
const col_pak_tilannetieto = "col15";
const col_edit = "col16";

const softwares2 =
        [
            {
                "name": "Arduino IDE",
                "versio": "1.8.9",
                "yksikkö": "TAMK Konetekniikka, TAU/ITC",
                "tilaaja_email": "juuso.huhtiniemi@tuni.fi;jouko.heikkinen@tuni.fi",
                "luokat": "TAMK F2-26;HSM201;HSM208;HSM213;HSM221;HTC315",
                "tarveaika": "2020-2021, Jatkuva",
                "lisätiedot": "-",
                "req_date": "2020-04-29",
                "accepted": true,
                "lh_kommentit": "OK\nSWLA-115/SL-263",
                "sw_reg": "SWREG-120\nei julkaistu",
                "smadikortti_nro": "",
                "pak-pyynto_tik-nro": "TUNI-125855",
                "licensed": true,
                "asennustapa": "SCCM",
                "packaged": true,
                "installed": true,
                "tilannetieto": ""
            },
            {
                "name": "AutoCAD Architecture",
                "versio": "2020",
                "yksikkö": "TAU K&O, TAU BEN",
                "tilaaja_email": "mika.kiirikki@tuni.fi;mika.mathlin@tuni.fi",
                "luokat": "SB101;RH216;RD202",
                "tarveaika": "Jatkuva",
                "lisätiedot": "-",
                "req_date": "2020-04-29",
                "accepted": true,
                "lh_kommentit": "",
                "sw_reg": "SWREG-120",
                "smadikortti_nro": "SMADI-245\n(2020)",
                "pak-pyynto_tik-nro": "TUNI-125835",
                "licensed": true,
                "asennustapa": "SCCM",
                "packaged": true,
                "installed": true,
                "tilannetieto": "Jarno Matarmaa"
            },
            {
                "name": "Atmel Studio",
                "versio": "7.0.1931",
                "yksikkö": "TAU/ITC, TAMK/TT",
                "tilaaja_email": "jouko.heikkinen@tuni.fi;kai.poutanen@tuni.fi",
                "luokat": "HSM201;HSM208;HSM213;HSM221;HTC315;TAMK A3-15;TAMK A3-17",
                "tarveaika": "Jatkuva",
                "lisätiedot": "-",
                "req_date": "2020-04-29",
                "accepted": true,
                "lh_kommentit": "OK\nSWLA-115/SL-272",
                "sw_reg": "",
                "smadikortti_nro": "SMADI-197",
                "pak-pyynto_tik-nro": "",
                "licensed": true,
                "asennustapa": "SCCM / Käsin",
                "packaged": true,
                "installed": true,
                "tilannetieto": "Tommi Kuisma"
            },
            {
                "name": "Matlab",
                "versio": "R2020a",
                "yksikkö": "TAU Tekniikka ja luonnontieteet (ENS)",
                "tilaaja_email": "jarno.matarmaa@tuni.fi",
                "luokat": "HSM213;HSM208;HSM201",
                "tarveaika": "2020-08-01 to 2021-07-31",
                "lisätiedot": "MATLAB is a multi-paradigm numerical computing environment and proprietary programming language developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages.",
                "req_date": "2020-04-29",
                "accepted": true,
                "lh_kommentit": "",
                "sw_reg": "SWREG-120",
                "smadikortti_nro": "",
                "pak-pyynto_tik-nro": "TUNI-123463",
                "licensed": true,
                "asennustapa": "SCCM",
                "packaged": true,
                "installed": true,
                "tilannetieto": "Sami Lanu"
            }
        ];

var random_id = function () {
    var id_num = Math.random().toString(9).substr(2, 3);
    var id_str = Math.random().toString(36).substr(2);
    return id_num + id_str;
};


(async () => {

    softwares = await getJSON(sw_data_url);

//--->create data table > start
    var tbl = '';
    tbl += '<table id="sw_stats" class="table table-hover sp">';
//--->create table header > start
    tbl += '<thead>';
    tbl += '<tr>';
    tbl += '<th onclick="sortTable(0)"><div class="user-resizable-column">Nimi</div></th>';
    tbl += '<th onclick="sortTable(1)"><div class="user-resizable-column">Versio</div></th>';
    tbl += '<th onclick="sortTable(2)"><div class="user-resizable-column">Yksikkö</div></th>';
    tbl += '<th onclick="sortTable(3)"><div class="user-resizable-column">Email</div></th>';
    tbl += '<th onclick="sortTable(4)"><div class="user-resizable-column">Luokat</div></th>';
    tbl += '<th onclick="sortTable(5)"><div class="user-resizable-column">Tarve alku</div></th>';
    tbl += '<th onclick="sortTable(6)"><div class="user-resizable-column">Tarve loppu</div></th>';
    tbl += '<th onclick="sortTable(7)"><div class="user-resizable-column">Lisätiedot</div></th>';
    tbl += '<th class="lisenssih" onclick="sortTable(8)"><div class="user-resizable-div">Lh. kommentit</div></th>';
    tbl += '<th class="lisenssih" onclick="sortTable(9)"><div class="user-resizable-div">Efecte swreg</div></th>';
    tbl += '<th class="lisenssih" onclick="sortTable(10)"><div class="user-resizable-div">Smadikortti nro.</div></th>';
    tbl += '<th class="lisenssih" onclick="sortTable(11)"><div class="user-resizable-div">Pk. tikettinro.</div></th>';
    tbl += '<th class="paketointi" onclick="sortTable(12)"><div class="user-resizable-div">Asennustapa</div></th>';
    tbl += '<th class="paketointi" onclick="sortTable(13)"><div class="user-resizable-div">Paketoitu</div></th>';
    tbl += '<th class="paketointi" onclick="sortTable(14)"><div class="user-resizable-div">Asennettu</div></th>';
    tbl += '<th class="paketointi" onclick="sortTable(15)"><div class="user-resizable-div">Tilannetieto</div></th>';
    tbl += '<th>Edit</th>';
    tbl += '</tr>';
    tbl += '</thead>';
//--->create table header > end


//--->create table body > start
    tbl += '<tbody>';
//--->create table body rows > start
    $.each(softwares, function (index, val) {
        //you can replace with your database row id
        const row_id = random_id();

        // Data formatting for specific table cells
        // For emails (just for sorting emails by ASC or DESC)
        const email_list = val['tilaaja_email'].split(/\n+/g);
        email_list.sort();
        var email_string = "";
        for (var j = 0; j < email_list.length; j++) {
            if (j < email_list.length - 1) {
                email_string += email_list[j] + '\n';
            } else {
                email_string += email_list[j];
            }
        }
        // For classes
        // Tämä järjestää listan, mutta myös muuttaa luokkatietoa sisältävän rivin,
        // jonka muoto on ennalta sovittu. Korvaa merkit ';' merkillä '\n' johdonmukaista
        // esitystapaa varten
        const class_list = val['luokat'].split(';');
        class_list.sort();
        var class_string = "";
        for (var j = 0; j < class_list.length; j++) {
            if (j < class_list.length - 1) {
                class_string += class_list[j] + '\n';
            } else {
                class_string += class_list[j];
            }
        }
        // For needed period
        /*
         const parts = val['tarveaika'].split(/,|\n+/g);
         var needed_string = "";
         for (var j = 0; j < parts.length; j++) {
         needed_string += parts[j] + "\n";
         }
         */

        //loop through ajax row data
        tbl += '<tr row_id="' + row_id + '">';
        // Taulukon yksittäisen rivin solut
        // Ohjelmiston nimi ja versio
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="name">' + val['name'] + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="versio">' + val['versio'] + '</div></td>';
        // Asiakkaan tiedot ja kohdennus
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="yksikkö">' + val['yksikkö'] + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="tilaaja_email">' + email_string + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="luokat">' + class_string + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="tarveaika">' + val['tarve_alku'] + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="tarveaika">' + val['tarve_loppu'] + '</div></td>';
        tbl += '<td class="sp"><div class="additions row_data" edit_type="click" col_name="lisätiedot">' + val['lisätiedot'] + '</div></td>';
        // Lisenssinhallinnan sarakkeet
        tbl += '<td class="sp licensing"><div class="row_data" edit_type="click" col_name="lh_kommentit">' + val['lh_kommentit'] + '</div></td>';
        tbl += '<td class="sp licensing"><div class="row_data" edit_type="click" col_name="sw_reg">' + val['sw_reg'] + '</div></td>';
        tbl += '<td class="sp licensing"><div class="row_data" edit_type="click" col_name="smadikortti_nro">' + val['smadikortti_nro'] + '</div></td>';
        tbl += '<td class="sp licensing"><div class="row_data" edit_type="click" col_name="pak-pyynto_tik-nro">' + val['pak_pyynto_tik_nro'] + '</div></td>';
        // Paketoinnin sarakkeet
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="asennustapa">' + val['asennustapa'] + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="packaged">' + val['packaged'] + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="installed">' + val['installed'] + '</div></td>';
        tbl += '<td class="sp"><div class="row_data" edit_type="click" col_name="tilannetieto">' + val['tilannetieto'] + '</div></td>';
        // Rivin muokkauksen painikkeille varattu solu
        //--->edit options > start
        tbl += '<td class="sp">';
        tbl += '<span class="btn_edit" > <a href="#" id="btn_edit" class="btn btn-link " row_id="' + row_id + '" > Edit</a> </span>';
        //only show this button if edit button is clicked
        tbl += '<span class="btn_save"> <a href="#" id="btn_save" class="btn btn-link"  row_id="' + row_id + '"> Save</a> | </span>';
        tbl += '<span class="btn_cancel"> <a href="#" id="btn_cancel" class="btn btn-link" row_id="' + row_id + '"> Cancel</a></span>';
        tbl += '</td>';
        //--->edit options > end
        tbl += '</tr>';
    });
//--->create table body rows > end

    /*
     "lh_kommentit": "",
     "sw_reg": "",
     "smadikortti_nro": "",
     "pak-pyynto_tik-nro": "",
     */

    tbl += '</tbody>';
//--->create table body > end

    tbl += '</table>';
//--->create data table > end





//out put table data
    $(document).find('.tbl_user_data').html(tbl);
    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide();
//--->create table body rows > end

//--->make div editable > start
    $(document).on('click', '.row_data', function (event) {
        event.preventDefault();
        if ($(this).attr('edit_type') === 'button') {
            return false;
        }

        //make div editable
        $(this).closest('div').attr('contenteditable', 'true');
        //add bg css
        $(this).addClass('bg-warning').css('padding', '5px');
        $(this).focus();
    });
//--->make div editable > end

//--->button > edit > start	
    $(document).on('click', '.btn_edit', function (event) {
        event.preventDefault();
        const tbl_row = $(this).closest('tr');
        // console.log(tbl_row); // Just for checking what kind of element we get in tbl_row variable
        changeColor(tbl_row[0], col_edit_bg_color, col_edit_border_style);
        // var row_id = tbl_row.attr('row_id');
        tbl_row.find('.btn_save').show();
        tbl_row.find('.btn_cancel').show();
        //hide edit button
        tbl_row.find('.btn_edit').hide();
        //make the whole row editable
        tbl_row.find('.row_data')
                .attr('contenteditable', 'true')
                .attr('edit_type', 'button')
                .addClass('bg-warning')
                .css('padding', '3px');
        //--->add the original entry > start
        tbl_row.find('.row_data').each(function (index, val) {
            //this will help in case user decided to click on cancel button
            $(this).attr('original_entry', $(this).html());
        });
        //--->add the original entry > end

    });
//--->button > edit > end

//--->button > cancel > start	
    $(document).on('click', '.btn_cancel', function (event) {
        event.preventDefault();
        const tbl_row = $(this).closest('tr');
        changeColor(tbl_row[0], '', '');
        // var row_id = tbl_row.attr('row_id');
        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();
        //show edit button
        tbl_row.find('.btn_edit').show();

        //make the whole row editable
        tbl_row.find('.row_data')
                .attr('edit_type', 'click')
                .removeClass('bg-warning')
                .css('padding', '');
        tbl_row.find('.row_data').each(function (index, val) {
            $(this).html($(this).attr('original_entry'));
        });

    });
//--->button > cancel > end

//--->save whole row entery > start	
    $(document).on('click', '.btn_save', function (event) {
        event.preventDefault();
        const tbl_row = $(this).closest('tr');
        // Muutetaan muokattavan rivin taustaväri
        changeColor(tbl_row[0], '', '');
        const row_id = tbl_row.attr('row_id');
        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();
        //show edit button
        tbl_row.find('.btn_edit').show();

        //make the whole row editable
        tbl_row.find('.row_data')
                .attr('edit_type', 'click')
                .removeClass('bg-warning')
                .css('padding', '');

        //--->get row data > start
        const arr = {};
        tbl_row.find('.row_data').each(function (index, val) {
            var col_name = $(this).attr('col_name');
            console.log("Saatiin sarakenimi: " + col_name);
            var col_val = $(this).html().replace(/<div>/g, "\n").replace(/<\/div>/g, "").replace(/<br>/g, "\n").trim();
            console.log("Saatiin sarakearvo: " + col_val);
            arr[col_name] = col_val;
        });
        //--->get row data > end

        /* Muotoillaan kerätty data tietokannan edellyttämään muotoon 
         * (Tämä on vain datan esitystapaa koskeva muotoseikka) */
        console.log(arr);
        formatDataForDatabase(arr);
        console.log(arr);

        //use the "arr"	object for your ajax call
        $.extend(arr, {row_id: row_id});
        //out put to show
        $('.post_msg').html('<pre-wrap class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre-wrap>');

        // This will write changes into database
        toJSON(arr);
        //location.reload();
    });
//--->save whole row entery > end

//--->save single field data > start
    $(document).on('focusout', '.row_data', function (event) {
        event.preventDefault();
        if ($(this).attr('edit_type') === 'button') {
            return false;
        }

        const row_id = $(this).closest('tr').attr('row_id');
        const row_div = $(this)
                .removeClass('bg-warning') //add bg css
                .css('padding', '');
        var col_name = row_div.attr('col_name');
        var col_val = row_div.html();

        var arr = {};
        arr[col_name] = col_val;
        //use the "arr"	object for your ajax call
        $.extend(arr, {row_id: row_id});
        //out put to show
        $('.post_msg').html('<pre-wrap class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre-wrap>');

        // TODO: INCLUDE TABLE CELL CHANGES HERE!!!

    });
//--->save single field data > end 

    tbl = document.getElementById("sw_stats");
    classes = getClasses(tbl.rows[0]);
    setClasses(tbl, classes);

    console.log(location.href);

    $().ready(function () {
        if ($('body').hasClass('lic')) {
            showDefaultColumnsForLicensing();
        } else if ($('body').hasClass('pac')) {
            showDefaultColumnsForPackaging();
        }

    });
    
    resizableGrid(tbl);

})();

// This is for table column resizing
//var tables = document.getElementsByClassName('flexiCol');
function resizableGrid(table) {
    var row = table.getElementsByTagName('tr')[0],
            cols = row ? row.children : undefined;
    if (!cols)
        return;

    table.style.overflow = 'hidden';

    var tableHeight = table.offsetHeight;

    for (var i = 0; i < cols.length; i++) {
        var div = createDiv(tableHeight);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setListeners(div);
    }

    function setListeners(div) {
        var pageX, curCol, nxtCol, curColWidth, nxtColWidth;

        div.addEventListener('mousedown', function (e) {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;

            var padding = paddingDiff(curCol);

            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol)
                nxtColWidth = nxtCol.offsetWidth - padding;
        });

        div.addEventListener('mouseover', function (e) {
            e.target.style.borderRight = '2px solid black';
        });

        div.addEventListener('mouseout', function (e) {
            e.target.style.borderRight = '';
        });

        document.addEventListener('mousemove', function (e) {
            if (curCol) {
                var diffX = e.pageX - pageX;

                if (nxtCol)
                    nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';

                curCol.style.width = (curColWidth + diffX) + 'px';
            }
        });

        document.addEventListener('mouseup', function (e) {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;
        });
    }

    function createDiv(height) {
        var div = document.createElement('div');
        div.style.top = 0;
        div.style.right = 0;
        div.style.width = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = height + 'px';
        return div;
    }

    function paddingDiff(col) {

        if (getStyleVal(col, 'box-sizing') === 'border-box') {
            return 0;
        }

        var padLeft = getStyleVal(col, 'padding-left');
        var padRight = getStyleVal(col, 'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));

    }

    function getStyleVal(elm, css) {
        return (window.getComputedStyle(elm, null).getPropertyValue(css));
    }
}

function formatDataForDatabase(arr) {
    // Taulukosta luettu muotoiltu data
    /*
     * Huomio: Datan tallennuksen formaatista täytyy olla sopimus. Tässä oletetaan
     * että taulusta luettu soludata on tallennettu omille riveilleen erotettuna
     * rivinvaihdolla. Siten tämä data puretaan sovittuun muotoon. 
     * Korvataan "\n" merkillä ";".
     * 
     */

    // Luovuttu email listojen formatoinnista
    /* var email_data = arr['tilaaja_email']; 
     * const fixed_email_data = email_data.replace(/\s+|\n+/g, ';');
     * arr['tilaaja_email'] = fixed_email_data; 
     */

    var class_data = arr['luokat'];
    const fixed_class_data = class_data.replace(/\n+/g, ';');
    arr['luokat'] = fixed_class_data;

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
                    cell.className = "sp licensing col" + classes[z].cols;
                }
            }
        }
    }
}

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

function showDefaultColumnsForLicensing() {
    // Disabling some columns by default
    toggleCol(col_luokat);
    toggleCol(col_tarve_alku);
    toggleCol(col_tarve_loppu);
    toggleCol(col_lisatieto);
    toggleCol(col_pak_asennettu);
    toggleCol(col_pak_asennustapa);
    toggleCol(col_pak_paketoitu);
    toggleCol(col_pak_tilannetieto);
}

function showDefaultColumnsForPackaging() {
    // Disabling some columns by default
    toggleCol(col_yksikko);
    toggleCol(col_email);
    toggleCol(col_lisatieto);
    toggleCol(col_lh_kommentit);
    toggleCol(col_lh_smadi);
    toggleCol(col_lh_swreg);
}

function changeColor(tr, color, borderstyle) {
    tr.style.backgroundColor = color;
    const cells = tr.cells;
    for (var i = 0; i < cells.length; i++) {
        if (i === 0) {
            cells[i].style.borderLeft = borderstyle;
        }
        if (i === cells.length - 1) {
            cells[i].style.borderRight = borderstyle;
        }
        cells[i].style.borderBottom = borderstyle;
        cells[i].style.borderTop = borderstyle;
    }
}

function toggleCol(name) {
    var cols = document.getElementsByClassName(name);
    for (var x = 0; x < cols.length; x++) {
        cols[x].style.display = (cols[x].style.display === 'none') ? '' : 'none';
    }
}

document.getElementById('customer_cols').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_yksikko);
    toggleCol(col_email);
});
document.getElementById('target_cols').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_luokat);
    toggleCol(col_tarve_alku);
    toggleCol(col_tarve_loppu);
});
document.getElementById('additions').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_lisatieto);
});
document.getElementById('licensing_cols').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_lh_kommentit);
    toggleCol(col_lh_swreg);
    toggleCol(col_lh_smadi);
    toggleCol(col_lh_pak_tnro);
});
document.getElementById('packaging_cols').addEventListener('click', function (event) {
    event.preventDefault();
    toggleCol(col_pak_asennustapa);
    toggleCol(col_pak_paketoitu);
    toggleCol(col_pak_asennettu);
    toggleCol(col_pak_tilannetieto);
});

