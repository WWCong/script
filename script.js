function log(str) {
    jQuery('#wc-output').val(str + '\n' + jQuery('#wc-output').val());
}
    
var toolkit = new Object();

toolkit.ui = ' <style> .right-side-toolbar { position: fixed; height: 80%; width: 20%; background-color: white; top: 20px; right: 0px; border-left: 1px solid #ccc; padding: 10px; } .wc-selected{ border:1px solid #66ccff !important ; } .title { width: 100px; } .test input { border: 1px solid #ccc; border-top: none; } .test p { border-top: 1px solid #ccc; border-left: 1px solid #ccc; margin-bottom: 0px; padding-left: 4px; } </style> <script> (function ($) {  $(document).ready(function() { $(".tab-select").change(function () { $(this).siblings(".tab-container").hide(); $(this).siblings("." + $(".tab-select").val()).show(); }); $(".tab-select").change(); }); })(jQuery); </script> <div class="right-side-toolbar"> <select class="tab-select"> <option value="mask">Mask</option> <option value="sib">Siblings</option> </select> <div class="tab-container sib"> <p>ofx x: <input class="wc-ofx" type="number" value="0"></p> <p>stp x: <input class="wc-spx" type="number" value="1"></p> <p>xct x: <input class="wc-cpx" type="number" value="0"></p> <p>ofx y: <input class="wc-ofy" type="number" value="10"></p> <p>stp y: <input class="wc-spy" type="number" value="1"></p> <p>xtr y: <input class="wc-cpy" type="number" value="0"></p> <input id="btnApply" type="button" value="Apply"> <input id="btnDelete" type="button" value="Delete"> <p>Output</p> <textarea id="wc-output" style="width:100%; height:200px"></textarea> <br> <input id="clipbuffer" type="text"> <textarea id="clipboard"></textarea> </div> <div class="tab-container mask"> <hr> <button class="toggleMask">On</button> <hr> <p> <button class="delta up"> ↑ </button> <input class="delta-value up" type="number" value="1"> </p> <p> <button class="delta down"> ↓ </button> <input class="delta-value down" type="number" value="1"> </p> <p> <button class="delta left">←</button> <input class="delta-value left" type="number" value="1"> </p> <p> <button class="delta right">→</button> <input class="delta-value right" type="number" value="1"> </p> <hr> <select class="align"> <option value="vtl">↕vertical</option> <option value="htl">↔Horizontal</option> </select> <p>ofs: <input class="ofs" type="number" value="10"></p> <p>stp: <input class="stp" type="number" value="1"></p> <p>cpv: <input class="cpv" type="number" value="0"></p> <button class="btnOffset">Apply</button> <button class="btnDelete">Delete</button> <hr> <p><span class="title">Left:</span><input class="uniLeft" type="number" value=""></p> <p><span class="title">Top:</span><input class="uniTop" type="number" value=""></p> <p><span class="title">Width:</span><input class="uniWidth" type="number" value=""></p> <p><span class="title">Height:</span><input class="uniHeight" type="number" value=""></p> <p><span class="title">FontSize:</span><input class="uniFontSize" type="number" value=""></p> <p><span class="title">TextAlign:</span> <select class="uniTextAlign"> <option value=""></option> <option value="left">Left</option> <option value="center">Center</option> <option value="right">Right</option> </select></p> <p><span class="title">Text:</span><input class="uniText" type="text" value=""></p> </div> </div> ';
toolkit.ui = '<div>' + toolkit.ui + '</div>';

toolkit.getSiblings = function (obj) {
    if (0 == toolkit.hasSiblings()) return [];
    var cur = obj || workflow.getCurrentSelection(); 
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

var rootName = "basic_trip";
function testObj(x, y, wd, hg) {
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
    target.setWidth(wd);
    target.setHeight(hg);
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

function excelTest() {
    var $ = jQuery, excel = clipboard;
    $("#back").css("width", $("#mainContents").css("width"));
    $("#back").css("height", $("#mainContents").css("height"));
    $("#back").html(excel);
    var th = $("#back table").height();
    var tw = $("#back table").width();
    var mh = $("#mainContents").height();
    var mw = $("#mainContents").width();
    var xsl = mw / tw, ysl = mh / th;
    
    var tds = $("#back td"); 
    for (var i = 0; i < tds.length; i++) {
        if (tds[i].innerText == "#") {
            testObj($(tds[i]).offset().left * xsl + 5, $(tds[i]).offset().top * ysl + 5,
                    $(tds[i]).width() * xsl, $(tds[i]).height() * ysl);
        }
    }
}

function deleteFigures() {
    var list = [];
    workflow.getFigures().data.forEach(function (fg) {
        if (fg != null && fg != undefined && fg.pkgCapt != undefined)
            list.push(fg);
    });
    for (var i = list.length - 1; i >= 0; i--)
        workflow.removeFigure(list[i]);
}

var mask = new Object();
mask.init = function () {
    var $ = jQuery;
    mask.x = $("#mainContents").offset().left + 3;
    mask.y = $("#mainContents").offset().top + 3;
    mask.width = $("#mainContents").width();
    mask.height = $("#mainContents").height();
    $("#mask").remove();
    var $mask = $("<div id='mask' style='position:absolute; z-index:9999'></div>");
    $mask.css("border", "1px solid red");
    $mask.css("left", mask.x);    $mask.css("top", mask.y);
    $mask.css("width", mask.width);    $mask.css("height", mask.height);
    $("body").append($mask);
    $mask.data("obj", mask);
    mask.jqobj = $mask;
    mask.isClick = false;
    mask.EventBinding();
    $mask.hide();
    $(".toggleMask").click(mask.toggle);
    $(".delta").mousedown(mask.deltaBtnDown);
    $(".delta").mouseup(mask.deltaBtnUp);
    $(".btnOffset").click(mask.align);
    $(".btnDelete").click(mask.deleteSeleted);
    $("#ExitTool").click(function () {
        if ($(".toggleMask").html() == "Off")
            $(".toggleMask").click();
    }); 
    mask.attrInit();
};

mask.EventBinding = function () {
    var $ = jQuery, $mask = mask.jqobj;
    $mask.unbind();
    $mask.mousedown(mask.mousedown);
    $mask.mouseup(mask.mouseup);
    $mask.click(mask.click);
    // $mask.mousemove(mask.mouseover);
};

mask.msePnt = function (msupEvent) {
    if (!mask.mouseEvent) return undefined;
    var pnt = new Object();
    var dx = mask.mouseEvent.dx, dy = mask.mouseEvent.dy;
    var ux = msupEvent.pageX - mask.x, uy = msupEvent.pageY - mask.y;
    pnt.tlx = Math.min(dx, ux); pnt.tly = Math.min(dy, uy);
    pnt.brx = Math.max(dx, ux); pnt.bry = Math.max(dy, uy);
    pnt.distance = Math.sqrt((pnt.tlx - pnt.brx) * (pnt.tlx - pnt.brx)
                           + (pnt.tly - pnt.bry) * (pnt.tly - pnt.bry));
    pnt.isClick = mask.isClick = pnt.distance < 10;
    return pnt;
};

mask.isSelected = function (obj) {
    return jQuery(obj.getHTMLElement()).hasClass("wc-selected");
}

mask.addSelected = function (obj) {
    var $ = jQuery;
    if (!obj) {
        return;
    } else if (obj instanceof Array) {
        for (var i = 0; i < obj.length; i++) {
            $(obj[i].getHTMLElement()).addClass("wc-selected");
            $(obj[i].getHTMLElement()).data("figure", obj[i]);
        }
    } else {
        $(obj.getHTMLElement()).addClass("wc-selected");
        $(obj.getHTMLElement()).data("figure", obj);
    }
    mask.attrUpdate();
}

mask.removeSelected = function (obj) {
    var $ = jQuery;
    if (!obj) {
        $(".wc-selected").removeClass("wc-selected");
    } else if (obj instanceof Array) {
        for (var i = 0; i < obj.length; i++)
            $(obj[i].getHTMLElement()).removeClass("wc-selected");
    } else {
        $(obj.getHTMLElement()).removeClass("wc-selected");
    }
    mask.attrUpdate();
} 

mask.selectedForEach = function (func) {
    jQuery(".wc-selected").each(function () {
        func(jQuery(this).data("figure"));
    });
}

mask.getSelected = function () {
    var list = [];
    mask.selectedForEach(function (fg) {
        list.push(fg);
    });
    return list;
}

mask.click = function (e) {
    if (!mask.msePnt(e).isClick) return;
    var sel = mask.PointSelect(e.pageX - mask.x, e.pageY - mask.y);
    if (!e.shiftKey && !e.ctrlKey) {
        mask.removeSelected();
        mask.addSelected(sel);
    } else {
        if (mask.isSelected(sel))
            mask.removeSelected(sel);
        else
            mask.addSelected(sel);
    }
}

mask.mousedown = function  (e) {
    mask.mouseEvent = {dx: e.pageX - mask.x, dy: e.pageY - mask.y,
                       px: e.pageX, py: e.pageY }; 
};

mask.mouseup = function  (e) {
    var $ = jQuery, pnt = mask.msePnt(e);
    if (pnt.isClick) return;
    var list = mask.RectSelect(pnt.tlx, pnt.tly, pnt.brx, pnt.bry);
    if (!e.shiftKey && !e.ctrlKey) {
        mask.removeSelected();
        mask.addSelected(list);
    } else {
        for (var i = 0; i < list.length; i++)
            if (mask.isSelected(list[i]))
                mask.removeSelected(list[i]);
            else
                mask.addSelected(list[i]);
    }
};

mask.mouseover = function (e) {
    log((e.pageX - mask.x) + ", " + (e.pageY - mask.y));
};

mask.PointSelect = function (x, y) {
    var ret = undefined;
    workflow.getFigures().data.forEach(function (fg) {
        if (fg && fg.getX && fg.getWidth && fg.getZOrder) {
            if (fg.getX() <= x && fg.getY() <= y
                    && fg.getX() + fg.getWidth() >= x
                    && fg.getY() + fg.getHeight() >= y) {
                if (!ret || ret.getZOrder() < fg.getZOrder)
                    ret = fg;
            }
        }
    });
    return ret;
};

mask.RectSelect = function (tlx, tly, brx, bry) {
    var ret = [];
    workflow.getFigures().data.forEach(function (fg) {
        if (fg && fg.getX &&fg.getWidth && fg.getZOrder) {
            if (fg.getX() >= tlx && fg.getY() >= tly
                    && fg.getX() + fg.getWidth() <= brx
                    && fg.getY() + fg.getHeight() <= bry) {
                ret.push(fg);
            }
        }
    });
    return ret;
};

mask.toggle = function () {
    var $ = jQuery;
    if ($(".toggleMask").html() == "On") {
        $(".toggleMask").html("Off");
        mask.jqobj.show();
    } else {
        $(".toggleMask").html("On");
        mask.jqobj.hide();
        mask.removeSelected();
    }
};

mask.deltaBtnDown = function (e) {
    var $ = jQuery, btn = mask.isMousePress || this;
    if ($(btn).hasClass("up")) {
        mask.selectedForEach (function (fg) {
            fg.setY(fg.getY() - $(".delta-value.up").val());
        });
    } else if ($(btn).hasClass("down")) {
        mask.selectedForEach (function (fg) {
            fg.setY(fg.getY() + parseInt($(".delta-value.down").val()));
        });
    } else if ($(btn).hasClass("left")) {
        mask.selectedForEach (function (fg) {
            fg.setX(fg.getX() - $(".delta-value.left").val());
        });
    } else if ($(btn).hasClass("right")) {
        mask.selectedForEach (function (fg) {
            fg.setX(fg.getX() + parseInt($(".delta-value.right").val()));
        });
    };
    if (e) mask.isMousePress = this;
    if (mask.isMousePress)
        setTimeout(mask.deltaBtnDown, e ? 300 : 100);
};

mask.deltaBtnUp = function () {
    mask.isMousePress = undefined;
};

mask.align = function () {
    var $ = jQuery, isVertical = $(".align").val() == "vtl";
    var list = mask.getSelected().sort(function (a, b) {
        return isVertical ? a.getY() > b.getY() : a.getX() > b.getX();
    });
    var ofs = $(".ofs").val(), stp = $(".stp").val(), cpv = $(".cpv").val();
    var tmp = isVertical ? list[0].getY() : list[0].getX();
    for (var i = 1; i < list.length; i++)
        if (isVertical) list[i].setY(tmp + i * ofs + i / stp * cpv);
        else list[i].setX(tmp + i * ofs + i / stp * cpv);
}

mask.deleteSeleted = function () {
    var list = mask.getSelected();
    for (var i = list.length - 1; i >= 0; i--)
        workflow.removeFigure(list[i]);
}

mask.attrInit = function() {
    var $ = jQuery;
    $(".uniLeft").change(function () {
        mask.selectedForEach (function (fg) {
            fg.setX(parseInt($(".uniLeft").val()));
        });
    });
    $(".uniTop").change(function () {
        mask.selectedForEach (function (fg) {
            fg.setY(parseInt($(".uniTop").val()));
        });
    });
    $(".uniWidth").change(function () {
        mask.selectedForEach (function (fg) {
            fg.setWidth(parseInt($(".uniWidth").val()));
        });
    });
    $(".uniHeight").change(function () {
        mask.selectedForEach (function (fg) {
            fg.setHeight(parseInt($(".uniHeight").val()));
        });
    });
    $(".uniFontSize").change(function () {
        mask.selectedForEach (function (fg) {
            fg.setFontSize(parseInt($(".uniFontSize").val()));
        });
    });
    $(".uniTextAlign").change(function () {
        mask.selectedForEach (function (fg) {
            fg.setTextAlignment($(".uniTextAlign").val());
        });
    });
    $(".uniText").change(function () {
        mask.selectedForEach (function (fg) {
            fg.setText($(".uniText").val());
        });
    });
}

mask.attrUpdate = function () {
    var $ = jQuery;
    var list = mask.getSelected();
    if (!list || list.length < 1) {
        $(".uniLeft").val("");
        $(".uniTop").val("");
        $(".uniWidth").val("");
        $(".uniHeight").val("");
        $(".uniFontSize").val("");
        $(".uniTextAlign").val("");
        $(".uniText").val("");
        return;
    };
    var fontSize = list[0].getFontSize ? list[0].getFontSize() : undefined;
    var textAlign = list[0].getTextAlignment ? list[0].getTextAlignment() : undefined;
    var text = list[0].getText ? list[0].getText() : undefined;
    var x = list[0].getX(), y = list[0].getY();
    var width = list[0].getWidth(), height = list[0].getHeight();
    for (var i = 1; i < list.length; i++) {
        if (fontSize && fontSize != list[i].getFontSize()) fontSize = "";
        if (textAlign && textAlign != list[i].getTextAlignment()) textAlign = "";
        if (text && text != list[i].getText()) text = "";
        if (x != list[i].getX()) x = "";
        if (y != list[i].getY()) y = "";
        if (width != list[i].getWidth()) width = "";
        if (height != list[i].getHeight()) height = "";
    }
    $(".uniLeft").val(x);
    $(".uniTop").val(y);
    $(".uniWidth").val(width);
    $(".uniHeight").val(height);
    $(".uniFontSize").val(fontSize ? fontSize : "");
    $(".uniTextAlign").val(textAlign ? textAlign : "");
    $(".uniText").val(text ? text : "");
}

mask.init();
