/* 
 Created on : 6 Aug 2020, 16.07.39
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

function extractString(str, beg, end) {
    var list = str.split(beg);
    list.shift();
    //console.log(list);
    var items = [];
    
    var yksikko;
    for (; list.length > 0;) {
        yksikko = list.shift().split(end)[0];
        items.push(yksikko); 
    }
    return items;
}