(function($){ 
    var figures = workflow.getFigures();
    var prop = new Map();
    figures.data.forEach(function(figure) {
        if (figure != null && figure != undefined) {
            for(var item in (figure) )
            {
                prop.set(item, 1);
            }
        }
    });
    var str = "";
    for (var k in prop.keys) {
        str += k + '\n';
    }
    alert(str);

    var figure = workflow.getFigure("8cd04028-8e6b-b56e-6863-35192a943ce2");
})(jQuery);
