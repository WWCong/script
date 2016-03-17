
var log = new Object();
log.print = function (str) {
    log.$output.val(log.$output.val() + str);
};
log.lnPrint = function (str) {
    log.$output.val(log.$output.val() + str + "\n");
};
log.show = function (str) {
    log.$output.val(str);
};
log.lnShow = function (str) {
    log.$output.val(str + "\n");
};

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
        var types = clipboardData.types || [];
        // for(var i = 0; i < types.length; i++ ){
        //     alert(types[i]);
        // }
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

$(document).ready(function(){
    log.$output = $("#output");
    var textbox = document.getElementById("clipboard");
    EventUtil.addHandler(textbox, "paste", function (event) {  
        event = EventUtil.getEvent(event);  
        $("#back").append(EventUtil.getClipboardText(event));
        var tds = $("td");
        for (var i = 0; i < tds.length; i++) {
            var $td = $(tds[i]);
            log.lnPrint($td.offset().left + ", " + $td.offset().top + ", " + $td.html());
        } 
        log.show(EventUtil.getClipboardText(event));
    });
}); 