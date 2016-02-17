(function($){ 
    //$('body').append('<div style="position:fixed;height:100px;weight:100px;background-color:red;">12312</div>');
    $('body').click(function () {
        alert("click");
    });
})(jQuery);


var prop = new Map();
var counter = 0;
var figures = workflow.getFigures();
var arr = [];
figures.data.forEach(function(figure) {
    if (figure != null && figure != undefined) {
        arr.push(figure.pkgCapt + ", " + figure.name)
    }
});
console.log(arr.join('\n'));
var str = "";
for (var k in prop.keys) {
    str += k + '\n';
}
console.log(str);

var figure = workflow.getCurrentSelection();
alert(figure);
alert(figure.pkgCapt + ", " + figure.name);