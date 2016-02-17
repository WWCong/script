(function($){ 
    if (document.getElementById('wc') == null)
        $('body').append("<div id='wc'></div>");
    //$('#wc').load('https://rawgit.com/WWCong/script/master/test.html .wc-load')
    $('#wc').append("<div style='position: fixed;height: 80%;width: 20%;background-color: white;top: 20px;right: 0px;border-left: 1px solid #ccc;padding: 10px;'><p>name</p><p id='wc-name'></p><p>pkgCpt</p><p id='wc-pkg'></p><p>Output</p><p id='wc-output'></p></div>");
})(jQuery);