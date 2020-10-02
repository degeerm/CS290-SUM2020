function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        /*outer: assigns numbers (i will continue
        to change, assign avoid assigning values
        to raw i).*/
        var new_item = (function () {
            /*format portion*/
            var item = 'item' + list[i];
            /*temporary number*/
            var temp_i = list[i];
            /*inner: returns the alert*/
            return function () {
                /*format portion + temporary number*/
                alert(item + ' ' + temp_i);
            }
        })(i);
        
        /*new_item is the alert added to result*/
        result.push(new_item);
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();