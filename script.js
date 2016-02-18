var cvsClick, getSelectedList;
var sellist = [];
var cursel;

(function($){ 
    if (document.getElementById('wc') == null) {
        $('body').append("<div id='wc'></div>");
        $('#wc').append("<style>.wc-selected{border:1px solid #66ccff !important ;}</style><div style='position: fixed;height: 80%;width: 20%;background-color: white;top: 20px;right: 0px;border-left: 1px solid #ccc;padding: 10px;'><p>name</p><p id='wc-name'></p><p>pkgCpt</p><p id='wc-pkg'></p><p>Output</p><textarea id='wc-output'></textarea></div>");
    }
    
    getSelectedList = function (event) {
        cursel = workflow.getCurrentSelection();
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
                if (fg.name.indexOf(pn) == -1) return;
                var idx = fg.name.substring(fg.name.lastIndexOf('_') + 1);
                sellist[parseInt(idx)] = fg;
            });
        } else {
            sellist = [cursel];
        }
    }
    
    //$('#mainContents').unbind("click", cvsClick);
    cvsClick = function (event) {
        getSelectedList(event);
        $('.wc-selected').removeClass('wc-selected');
        sellist.forEach(function (fg) {
                $('#' + fg.getHTMLElement().id).addClass('wc-selected'); });
        if (cursel == null) {
            $('#wc-name').html('-');
            $('#wc-pkg').html('-');
        } else {
            $('#wc-name').html(cursel.name);
            $('#wc-pkg').html(cursel.pkgCapt);
        }
    }
    //$('#mainContents').click(cvsClick);
})(jQuery);

(function($){
})(jQuery);