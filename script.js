(function($){ 
    if (document.getElementById('wc') == null)
        $('body').append("<div id='wc'></div>");
    $('#wc').load('https://rawgit.com/WWCong/script/master/test.html .wc-load')
})(jQuery);