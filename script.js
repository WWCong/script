function log(str) {
    jQuery('#wc-output').val(str + '\n' + jQuery('#wc-output').val());
}
    
var toolkit = new Object();

toolkit.ui = ' <style> .mti { position: fixed; height: 80%; width: 20%; background-color: white; top: 20px; right: 0px; border-left: 1px solid #ccc; padding: 10px; } .wc-selected{ border:1px solid #66ccff !important ; } </style> <div class="mti"> <p>ofx x: <input class="wc-ofx" type="number" value="0"></p> <p>stp x: <input class="wc-spx" type="number" value="1"></p> <p>xct x: <input class="wc-cpx" type="number" value="0"></p> <p>ofx y: <input class="wc-ofy" type="number" value="10"></p> <p>stp y: <input class="wc-spy" type="number" value="1"></p> <p>xtr y: <input class="wc-cpy" type="number" value="0"></p> <input id="btnApply" type="button" value="Apply"> <input id="btnDelete" type="button" value="Delete"> <p>Output</p> <textarea id="wc-output" style="width:100%; height:200px"></textarea> <br> <input id="clipbuffer" type="text"> <textarea id="clipboard"></textarea> </div> ';
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

toolkit.shortcut = function () {
    var $ = jQuery;
    $('.wc-selected').removeClass('wc-selected');
    toolkit.getSiblings().forEach(function (fg) {
        $('#' + fg.getHTMLElement().id).addClass('wc-selected');
    });
};

toolkit.hotkey = 113;
toolkit.ctrlKey = false;
toolkit.init = function ($) {
    $('body').append(toolkit.ui);
    $('#btnApply').click(toolkit.sibAlign);
    $('#btnDelete').click(toolkit.sibDelete);
    $('body').keypress(function(e) {
        if (e.ctrlKey == toolkit.ctrlKey && e.which == toolkit.hotkey) 
        toolkit.shortcut();
    });
};

toolkit.init(jQuery);

var EventUtil = {  
    addHandler: function (element, type, handler) {  
        if (element.addEventListener) {  
            element.addEventListener(type, handler, false);  
        } else if (element.attachEvent) {  
            element.attachEvent("on" + type, handler);  
        } else {  
            element["on" + type] = handler;  
        }  
    },  
    getEvent: function (event) {  
        return event ? event : window.event;  
    },  
    getClipboardText: function (event) {  
        var clipboardData = (event.clipboardData || window.clipboardData); 
        /*var types = clipboardData.types || [];
        for(var i = 0; i < types.length; i++ ){
            alert(types[i]);
        }*/
        return clipboardData.getData("text/html");  
    },  
    setClipboardText: function (event, value) {  
        if (event.clipboardData) {  
            return event.clipboardData.setData("text/plain", value);  
        } else if (window.clipboardData) {  
            return window.clipboardData.setData("text", value);  
        }  
    },  
    preventDefault: function (event) {  
        if (event.preventDefault) {  
            event.preventDefault();  
        } else {  
            event.returnValue = false;  
        }  
    }  
}; 

function testObj(x, y) {
    var rootname = "basic_trip";
    var pkgCapt = "旅費情報(単一)/基本情報";
    var _bindType = 'field';
    var _namespace = 'base.base_destination';
    var _key = 'base.base_destination';
    var _format = 'none';
    var _type = '1';
    var _dataType = 'string';
    var _mappingType = '0';
    var _caption = '出張先';
    var target = fieldfactory.createField(pkgCapt, _bindType,
                        _namespace, _key, _format, _type, _dataType,
                        _mappingType, _caption, rootName);
    workflow.addFigure(target, x, y);
}

var clipboard = "";
(function ($) {
    var textbox = document.getElementById("clipbuffer");
    EventUtil.addHandler(textbox, "paste", function (event) {  
        event = EventUtil.getEvent(event);  
        $("#clipboard").val(EventUtil.getClipboardText(event));
        clipboard = EventUtil.getClipboardText(event);
    });
    $("body").append("<div id='back' style='position: absolute; top: 0px; left: 0px; z-index: -999;'></div>");
})(jQuery);

function test() {
    var $ = jQuery, excel = clipboard;
    $("#back").append(excel);
    var tds = $("#back td");
}