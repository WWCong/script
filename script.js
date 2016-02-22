var sellist = [];
var cursel;

(function($){ 

    function log(str) {
        $('#wc-output').val(str + '\n' + $('#wc-output').val());
    }
    
    $('body').append('<div>' + ' <style> .mti { position: fixed; height: 80%; width: 20%; background-color: white; top: 20px; right: 0px; border-left: 1px solid #ccc; padding: 10px; } .wc-selected{ border:1px solid #66ccff !important ; } </style> <div class="mti"> <p>ofx x: <input class="wc-ofx" type="number" value="0"></p> <p>stp x: <input class="wc-spx" type="number" value="1"></p> <p>xct x: <input class="wc-cpx" type="number" value="0"></p> <p>ofx y: <input class="wc-ofy" type="number" value="10"></p> <p>stp y: <input class="wc-spy" type="number" value="1"></p> <p>xtr y: <input class="wc-cpy" type="number" value="0"></p> <input id="btnApply" type="button" value="Apply"> <input id="btnDelete" type="button" value="Delete"> <p>Output</p> <textarea id="wc-output" style="width:100%; height:200px"></textarea> </div> ' + '</div>');
    
    $('#btnApply').click(function () {
        var cur = workflow.getCurrentSelection(); 
        if (cur == null || cur.name.indexOf('(改ページ用)') == -1) {
            log('no siblings');
            return;
        }
        var ci, ml = [], pn = cur.name.substring(0, cur.name.lastIndexOf('_'));
        workflow.getFigures().data.forEach(function (fg) {
            if (fg == undefined || fg.name == undefined) return;
            if (fg.pkgCapt != cur.pkgCapt || fg.name.indexOf(pn) == -1) return;
            var idx = parseInt(fg.name.substring(fg.name.lastIndexOf('_') + 1));
            if (fg.id == cur.id) ci = idx;
            ml[idx] = fg;
        });
        var ofx = $('.wc-ofx').val(), ofy = $('.wc-ofy').val(), 
            spx = $('.wc-spx').val(), spy = $('.wc-spy').val(), 
            cpx = $('.wc-cpx').val(), cpy = $('.wc-cpy').val();
        for (var i = 1; i < ml.length; i++) {
            ml[i].setX(ml[ci].getX() + (i - ci) * ofx + (Math.ceil(i / spx - 1) - Math.ceil(ci / spx - 1)) * cpx);
            ml[i].setY(ml[ci].getY() + (i - ci) * ofy + (Math.ceil(i / spy - 1) - Math.ceil(ci / spy - 1)) * cpy);
        }
    });
    
    $('#btnDelete').click(function () {
        var cur = workflow.getCurrentSelection(); 
        if (cur == null || cur.name.indexOf('(改ページ用)') == -1) {
            log('no siblings');
            return;
        }
        var dl = [];
        workflow.getFigures().data.forEach(function (fg) {
            if (fg == undefined || fg.name == undefined) return;
            if (fg.pkgCapt != cur.pkgCapt || fg.name.indexOf(cur.name.substring(0, cur.name.lastIndexOf('_'))) == -1) return;
            dl.push(fg);
        });
        dl.forEach(function (fg) {
            workflow.removeFigure(fg);
        })
    });
    
    $('#mainContents').click(function (event) {
        cursel = workflow.getCurrentSelection();
        log(cursel.name);
        if (cursel == null) {
            sellist = [];
            return;
        } else if (event.ctrlKey) {
            sellist.push(cursel);
        } else if (event.shiftKey && cursel.name.indexOf('(改ページ用)') != -1) {
            sellist = [];
            var pn = cursel.name.substring(0, cursel.name.lastIndexOf('_'));
            workflow.getFigures().data.forEach(function (fg) {
                if (fg == undefined || fg.name == undefined) return;
                if (fg.pkgCapt != cursel.pkgCapt || fg.name.indexOf(pn) == -1) return;
                var idx = fg.name.substring(fg.name.lastIndexOf('_') + 1);
                sellist[parseInt(idx)] = fg;
            });
        } else {
            sellist = [cursel];
        }
    });
    
})(jQuery);