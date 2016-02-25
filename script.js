function log(str) {
    jQuery('#wc-output').val(str + '\n' + jQuery('#wc-output').val());
}
    
var toolkit = new Object();

toolkit.ui = ' <style> .mti { position: fixed; height: 80%; width: 20%; background-color: white; top: 20px; right: 0px; border-left: 1px solid #ccc; padding: 10px; } .wc-selected{ border:1px solid #66ccff !important ; } </style> <div class="mti"> <p>ofx x: <input class="wc-ofx" type="number" value="0"></p> <p>stp x: <input class="wc-spx" type="number" value="1"></p> <p>xct x: <input class="wc-cpx" type="number" value="0"></p> <p>ofx y: <input class="wc-ofy" type="number" value="10"></p> <p>stp y: <input class="wc-spy" type="number" value="1"></p> <p>xtr y: <input class="wc-cpy" type="number" value="0"></p> <input id="btnApply" type="button" value="Apply"> <input id="btnDelete" type="button" value="Delete"> <p>Output</p> <textarea id="wc-output" style="width:100%; height:200px"></textarea> </div> ';
toolkit.ui = '<div>' + toolkit.ui + '</div>';

toolkit.getSiblings = function () {
    if (0 == toolkit.hasSiblings()) return [];
    var cur = workflow.getCurrentSelection(); 
    var ml = [], pn = cur.name.substring(0, cur.name.lastIndexOf('_'));
    workflow.getFigures().data.forEach(function (fg) {
        if (fg == undefined || fg.name == undefined) return;
        if (fg.pkgCapt != cur.pkgCapt || fg.name.indexOf(pn) == -1) return;
        var idx = parseInt(fg.name.substring(fg.name.lastIndexOf('_') + 1));
        ml[idx] = fg;
    });
    return ml;
};

toolkit.hasSiblings = function () {
    var cur = workflow.getCurrentSelection(); 
    if (cur == null || cur.name.indexOf('(改ページ用)') == -1) {
        log('no siblings');
        return 0;
    }
    return parseInt(cur.name.substring(cur.name.lastIndexOf('_') + 1));
};

toolkit.sibAlign = function () {
    var $ = jQuery, ci = toolkit.hasSiblings(), ml = toolkit.getSiblings();
    if (ci == 0) return;
    var ofx = $('.wc-ofx').val(), ofy = $('.wc-ofy').val(), 
        spx = $('.wc-spx').val(), spy = $('.wc-spy').val(), 
        cpx = $('.wc-cpx').val(), cpy = $('.wc-cpy').val();
    for (var i = 1; i < ml.length; i++) {
        ml[i].setX(ml[ci].getX() + (i - ci) * ofx + (Math.ceil(i / spx - 1) - Math.ceil(ci / spx - 1)) * cpx);
        ml[i].setY(ml[ci].getY() + (i - ci) * ofy + (Math.ceil(i / spy - 1) - Math.ceil(ci / spy - 1)) * cpy);
    }
};

toolkit.sibDelete = function () {
    var dl = toolkit.getSiblings();
    dl.forEach(function (fg) {
        workflow.removeFigure(fg);
    });
};

toolkit.ctrlKey = function () {
    var $ = jQuery;
    $('.wc-selected').removeClass('wc-selected');
    toolkit.getSiblings().forEach(function (fg) {
        $('#' + fg.getHTMLElement().id).addClass('wc-selected');
    });
};

toolkit.hotkey = 113;
toolkit.init = function ($) {
    $('body').append(toolkit.ui);
    $('#btnApply').click(toolkit.sibAlign);
    $('#btnDelete').click(toolkit.sibDelete);
    $('body').keypress(function(e) {if (e.ctrlKey && e.which == toolkit.hotkey) toolkit.ctrlKey();});
};

toolkit.init(jQuery);
