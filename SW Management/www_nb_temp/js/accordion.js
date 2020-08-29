/* 
 Created on : 29 Jul 2020, 18.58.10
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */
const setAccordionMenu = function (accordion_divs) {
    for (var i = 0; i < accordion_divs.length; i++) {
        var id = 'Demo' + (i + 1);
        const div = document.getElementById(id);
        var status = localStorage.getItem('Demo' + (i + 1));
        var class_name = div.className;

        console.log(id + " status: " + status);
        console.log("Classname before: " + class_name);
        console.log("Index of w3-hide: " + class_name.indexOf(" w3-hide"));
        console.log("Index of w3-show: " + class_name.indexOf(" w3-show"));

        if (status > 0) {
            console.log("Setting accordion submenu visible");
            if (class_name.indexOf(" w3-hide") > 0) {
                class_name = class_name.replace(" w3-hide", " w3-show");
            } 
        } else if (status < 0) {
            console.log("Setting accordion submenu hide");
            if (class_name.indexOf(" w3-show") > 0) {
                class_name = class_name.replace(" w3-show", " w3-hide");
            }
        }
        document.getElementById(id).className = class_name;
        console.log("Classname after: " + class_name);
    }
};

function showAccordionItems(id) {
    console.log("ID: " + id);
  var accordion_div = document.getElementById(id);
  if (accordion_div.className.indexOf(" w3-show") === -1) {
    accordion_div.className = accordion_div.className.replace(" w3-hide", " w3-show");
  } else { 
    accordion_div.className = accordion_div.className.replace(" w3-show", " w3-hide");
  }
}

let accordion_divs = document.getElementsByClassName("menu-accord-item__sub");
let accordion_btns = document.getElementsByClassName("btn");
console.log("Accordion sub menu buttons: " + accordion_btns.length);
console.log("Accordion sub menus: " + accordion_divs.length);
console.log(accordion_divs);
console.log(accordion_btns);


accordion_btns[0].onclick = function (event) {
    event.preventDefault();
    showAccordionItems("Demo1");
    var accordion_subitem = accordion_divs[0];
    var visibility = accordion_subitem.className.indexOf(" w3-show");
    console.log("Setting sub menu value: " + visibility);
    localStorage.setItem("Demo1", visibility);
};
accordion_btns[1].onclick = function (event) {
    event.preventDefault();
    showAccordionItems("Demo2");
    var accordion_subitem = accordion_divs[1];
    var visibility = accordion_subitem.className.indexOf(" w3-show");
    console.log("Setting sub menu value: " + visibility);
    localStorage.setItem("Demo2", visibility);
};
accordion_btns[2].onclick = function (event) {
    event.preventDefault();
    showAccordionItems("Demo3");
    var accordion_subitem = accordion_divs[2];
    var visibility = accordion_subitem.className.indexOf(" w3-show");
    console.log("Setting sub menu value: " + visibility);
    localStorage.setItem("Demo3", visibility);
};
accordion_btns[3].onclick = function (event) {
    event.preventDefault();
    showAccordionItems("Demo4");
    var accordion_subitem = accordion_divs[3];
    var visibility = accordion_subitem.className.indexOf(" w3-show");
    console.log("Setting sub menu value: " + visibility);
    localStorage.setItem("Demo4", visibility);
};

var menuOpen = true;

function openNav() {
  var acc_div = document.getElementById("accordion-div");
  if (menuOpen) {
      acc_div.style.width = "20px";
      menuOpen = false;
  } else {
      acc_div.style.width = "330px";
      menuOpen = true;
  }
}


setAccordionMenu(accordion_divs);
