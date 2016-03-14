/*
 * begin to generate tag
 */
function createLabel(txt, x, y) {
    var label = document.createElement("div");
    label.style.position = "absolute";
    label.style.left = x + "px";
    label.style.top = y + "px";
    label.style.font = "normal 10px verdana";
    label.style.whiteSpace = "nowrap";
    label.style.fontWeight = "bold";
    label.innerHTML = txt;
    return label;
}

function createInput(value) {

    var input = document.createElement("input");
    input.position = "absolute";
    input.style.border = "1px solid gray";
    input.style.font = "normal 10px verdana";
    input.style.width = "120px";
    input.style.height = "15px";
    input.setAttribute("type", "text");
    input.value = value;

    return input;
}


//function createHidden(name,value) {

//
//    var input = document.createElement("input");
//    input.position = "absolute";
//    input.style.border = "1px solid gray";
//    input.style.font = "normal 10px verdana";
//    input.style.width = "120px";
//    input.style.height = "15px";
//    input.setAttribute("type", "hidden");
//    input.name = name;
//    input.value = value;
//    return input;
//};

function createNumInput(value) {

    var input = createInput(value);
    input.style.imeMode = "disabled";
    input.onkeypress = numberonly;

    return input;
}

function numberonly(e) {

    var code = 0;
    if (window.event == undefined) {
        code = e.charCode;// FF
    } else {
        code = event.keyCode;// IE
    }
    var charactor = null;
    if (32 <= code && code <= 126) {// ASCII
        charactor = String.fromCharCode(code);
    }
    if (charactor && !charactor.match(/[0-9\.]/)) {
        return false;
    } else {
        return true;
    }
}

function createDateInput(value) {

    if (value == undefined || value == "") {
        value = getNowDate();
    }

    var input = createInput(value);
    input.style.imeMode = "disabled";
    input.style.readOnly = "true";
    input.onkeypress = numberonly;
    jQuery(input).datepicker({
        "dateFormat": "yy/mm/dd"
    });

    return input;

    function getNowDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var date = date.getDate();
        if (month < 10) {
            month = "0" + month;

        }
        if (date < 10) {
            date = "0" + date;
        }
        var strDate = year + "/" + month + "/" + date;
        return strDate;
    }
}

function createCheckBox(value) {

    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    if (value) {
        input.value = value;
    } else {
        input.value = "";
    }
    return input;
}

function createForm() {
    var form = document.createElement("form");
    form.style.position = "absolute";
    form.style.left = "0px";
    form.style.top = "0px";
    form.style.fontFamily = "ＭＳ ゴシック,sans-serif";
    return form;
}

function createTable() {
    var table = document.createElement("table");
    return table;
}

function createTbody() {
    var tbody = document.createElement("tbody");
    return tbody;
}

function createTr() {
    var tr = document.createElement("tr");
    return tr;
}

function createTd() {
    var td = document.createElement("td");
    return td;
}

function createTh() {
    var th = document.createElement("th");
    return th;
}

function createSpan() {
    var span = document.createElement("span");
    return span;
}

function createSelction(map, val) {

    var selection = document.createElement("select");
    selection.style.position = "absolute";
    selection.style.width = "123px";
    selection.style.height = "20px";

    var flg = false;
    for (var i in map) {
        var opt = createOption(i);
        if (!flg) {
            flg = true;
            opt.selected = true;
        }
        selection.appendChild(opt);
        if (val && i == val) {
            opt.selected = true;
        }
    }
    return selection;
}

function createSelctionIdx(_optArray, _nowidx) {

    var selection = document.createElement("select");
    selection.style.position = "absolute";
    selection.style.width = "123px";
    selection.style.height = "20px";
    if (_optArray && _optArray.getSize() != 0) {
        var i;
        for (i = 0; i < _optArray.getSize(); i = i + 1) {
            var opt = createOption(_optArray.get(i));
            selection.appendChild(opt);
        }
    }
    if (_nowidx) {
        selection.selectedIndex = _nowidx;
    }
    return selection;
}

function createSelctionIdxWithPosition(_optArray, _nowidx, x, y) {

    var selection = document.createElement("select");
    selection.style.position = "absolute";
    selection.style.left = x + "px";
    selection.style.top = y + "px";
    selection.style.width = "75px";
    selection.style.height = "20px";
    if (_optArray && _optArray.getSize() != 0) {
        var i;
        for (i = 0; i < _optArray.getSize(); i = i + 1) {
            var opt = createOption(_optArray.get(i));
            selection.appendChild(opt);
        }
    }
    if (_nowidx) {
        selection.selectedIndex = _nowidx;
    }
    return selection;
}

function createOptionId(_val, _id) {
    var option = document.createElement("option");
    option.id = _id;
    option.innerHTML = _val;
    return option;
}

function createOption(val) {
    var option = document.createElement("option");
    option.innerHTML = val;
    option.value = val;
    return option;
}

function createOptionElem(_id, _value, _text) {
    var option = document.createElement("option");
    option.id = _id;
    option.value = _value;
    option.innerHTML = _text;
    return option;
}

function createRadio(_name, _capArray, _idArray, _obj, _nowval) {
    var div = document.createElement("div");
    var i;
    for (i = 0; i < _capArray.getSize(); i += 1) {
        var cap = _capArray.get(i);
        var id = _idArray.get(i);
        var inDiv = document.createElement("div");
        var radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", _name);
        radio.setAttribute("id", id);
        radio.setAttribute("value", id);
        radio.onclick = function() {
            _obj.setRadio(this.value);
        };
        if (_nowval && id == _nowval) {
            radio.checked = true;
        }
        var lab = document.createElement("label");
        lab.setAttribute("for", id);
        lab.innerHTML = cap;
        inDiv.appendChild(radio);
        inDiv.appendChild(lab);
        div.appendChild(inDiv);
    }
    return div;
}

/*
 * to generate tag end
 */
/*
 * to generate labeled input (for property-window) begin
 */
// text
function JRcreateTextInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("テキスト :", _x, _y));
    var txtDiv = createLabel("", _x + 120, _y);
    var txtInput = createInput(_val);
    txtInput.onkeyup = function() {
        _obj.setText(txtInput.value);
    };
    txtDiv.appendChild(txtInput);
    _element.appendChild(txtDiv);
}

// field-text
function JRcreateLayoutCapInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("レイアウト表示文言 :", _x, _y));
    var txtDiv = createLabel("", _x + 120, _y);
    var txtInput = createInput(_val);
    txtInput.onkeyup = function() {
        _obj.setText(txtInput.value);
    };
    txtDiv.appendChild(txtInput);
    _element.appendChild(txtDiv);
}

// font-select
function JRcreateFontFamilySelect(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("フォント :", _x, _y));
    var fontFamilyDiv = createLabel("", _x + 120, _y);
    var fontFamilySelect = createSelction(FontMstManager.getFontMap(), _val);
    fontFamilySelect.onchange = function() {
        _obj.setFont(FontMstManager.getFont(fontFamilySelect.value));
    };
    fontFamilyDiv.appendChild(fontFamilySelect);
    _element.appendChild(fontFamilyDiv);
}

// font-size
function JRcreateFontSizeInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("フォントサイズ :", _x, _y));
    var fontSizeDiv = createLabel("", _x + 120, _y);
    var fontSizeInput = createNumInput(_val);
    fontSizeInput.onkeyup = function() {
        _obj.setFontSize(fontSizeInput.value);
    };
    fontSizeDiv.appendChild(fontSizeInput);
    _element.appendChild(fontSizeDiv);
}

// font-bold-check
function JRcreateBoldCheckBox(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("太字 :", _x, _y));
    var fontBoldDiv = createLabel("", _x + 120, _y);
    var fontBoldCheck = createCheckBox();
    fontBoldCheck.id = "fontBoldCheck";
    fontBoldCheck.onclick = function() {
        if (this.checked) {
            _obj.setIsBold(true);
        } else {
            _obj.setIsBold(false);
        }
    };
    fontBoldDiv.appendChild(fontBoldCheck);
    _element.appendChild(fontBoldDiv);
}

// font-Italic-check
function JRcreateItalicCheckBox(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("斜体 :", _x, _y));
    var fontObliqueDiv = createLabel("", _x + 120, _y);
    var fontObliqueCheck = createCheckBox();
    fontObliqueCheck.id = "fontObliqueCheck";
    fontObliqueCheck.onclick = function() {
        if (this.checked) {
            _obj.setIsItalic(true);

        } else {
            _obj.setIsItalic(false);

        }
    };
    fontObliqueDiv.appendChild(fontObliqueCheck);
    _element.appendChild(fontObliqueDiv);
}

// under-line-check
function JRcreateUnderLineCheckBox(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("下線 :", _x, _y));
    var fontUnderLineDiv = createLabel("", _x + 120, _y);
    var fontUnderLineCheck = createCheckBox();
    fontUnderLineCheck.id = "fontUnderLineCheck";
    fontUnderLineCheck.onclick = function() {
        _obj.setIsUnderline(this.checked);
        _obj.updateTxtDec();
    };
    fontUnderLineDiv.appendChild(fontUnderLineCheck);
    _element.appendChild(fontUnderLineDiv);
}

// through-line-check
function JRcreateLineThroughCheckBox(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("取り消し線 :", _x, _y));
    var fontLineThroughDiv = createLabel("", _x + 120, _y);
    var fontLineThroughCheck = createCheckBox();
    fontLineThroughCheck.id = "fontLineThroughCheck";
    fontLineThroughCheck.onclick = function() {
        _obj.setIsStrikeThrough(this.checked);
        _obj.updateTxtDec();
    };
    fontLineThroughDiv.appendChild(fontLineThroughCheck);
    _element.appendChild(fontLineThroughDiv);
}

// isBarcode
function JRcreateBarcodeCheckBox(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("バーコード :", _x, _y));
    var fontBarcodeDiv = createLabel("", _x + 120, _y);
    var fontBarcodeCheck = createCheckBox();
    fontBarcodeCheck.id = "fontIsBarcode";
    fontBarcodeCheck.onclick = function() {
        _obj.setIsBarcode(this.checked);
    };
    fontBarcodeDiv.appendChild(fontBarcodeCheck);
    _element.appendChild(fontBarcodeDiv);
}

// isLock
function JRcreateLockCheckBox(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("位置を固定 :", _x, _y));
    var fontLockDiv = createLabel("", _x + 120, _y);
    var fontLockCheck = createCheckBox();
    fontLockCheck.id = "isLock";
    fontLockCheck.onclick = function() {
        _obj.setIsLock(this.checked);
    };
    fontLockDiv.appendChild(fontLockCheck);
    _element.appendChild(fontLockDiv);
}

// direction-select
function JRcreateShowTypeSelect(_element, _obj, _val, _x, _y) {
    if (_obj.mappingType == 0 || _obj instanceof draw2d.StaticImage || _obj instanceof draw2d.BarcodeImage || _obj instanceof draw2d.ChartImage || _obj instanceof draw2d.DynamicEmpPhotoImage) {

        _element.appendChild(createLabel("改ページ時表示 :", _x, _y));
        var showTypeSelectDiv = createLabel("", _x + 120, _y);
        var optArray = new draw2d.ArrayList();
        optArray.add("全ページ");
        optArray.add("1ページ目のみ");

        var nowIdx = _val;

        var showTypeSelect = createSelctionIdx(optArray, nowIdx);
        showTypeSelect.onchange = function() {
            _obj.showType = this.options.selectedIndex;

        };
        showTypeSelectDiv.appendChild(showTypeSelect);
        _element.appendChild(showTypeSelectDiv);
    }
}

// direction-select
function JRcreateDirectionSelect(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("方向 :", _x, _y));
    var directionDiv = createLabel("", _x + 120, _y);
    var optArray = new draw2d.ArrayList();
    optArray.add("横書き");
    optArray.add("縦書き");

    var nowIdx = 0;
    if (_val == "tb-rl") {
        nowIdx = 1;
    }
    var directionSelect = createSelctionIdx(optArray, nowIdx);
    directionSelect.onchange = function() {
        if (this.options.selectedIndex == 0) {
            _obj.setWritingMode("lr-tb");
        } else {
            _obj.setWritingMode("tb-rl");
        }
    };
    directionDiv.appendChild(directionSelect);
    _element.appendChild(directionDiv);
}

// line-width-input
function JRcreateLineWidthInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("線の太さ :", _x, _y));
    var lwDiv = createLabel("", _x + 120, _y);
    var lwInput = createNumInput(_val);
    lwInput.onkeyup = function() {
        _obj.setLineWidth(lwInput.value);
    };
    lwDiv.appendChild(lwInput);
    _element.appendChild(lwDiv);
}

// url-select
function JRcreateUrlSelect(_element, _obj, _imgId, _x, _y) {
    _element.appendChild(createLabel("URL :", _x, _y));
    var urlDiv = createLabel("", _x + 120, _y);
    var urlSelect = document.createElement("select");
    urlSelect.style.position = "absolute";
    urlSelect.style.width = "123px";
    urlSelect.style.height = "20px";
    var idx = 0;
    for (var key in ImgMap.imgMap) {
        var opt = createOptionId(ImgMap.getName(key), key);
        urlSelect.appendChild(opt);
        if (key == _imgId) {
            urlSelect.options.selectedIndex = idx;
        }
        idx += 1;
    }
    urlSelect.onchange = function() {
        _obj.setImageUrl(urlSelect.options[urlSelect.options.selectedIndex].id);
    };
    urlDiv.appendChild(urlSelect);
    _element.appendChild(urlDiv);
}

//chart-select
function JRcreateChartSelect(_element, _obj, _imgId, _x, _y) {
    _element.appendChild(createLabel("チャート :", _x, _y));
    var chartDiv = createLabel("", _x + 120, _y);
    var chartSelect = document.createElement("select");
    chartSelect.style.position = "absolute";
    chartSelect.style.width = "123px";
    chartSelect.style.height = "20px";
    var idx = 0;
    for (var key in chartImageMap.chartImageMap) {
        var opt = createOptionId(chartImageMap.getCaption(key), key);
        chartSelect.appendChild(opt);
        if (typeof _imgId === "undefined" || _imgId === "undefined") {
            _obj.setChartId(chartSelect.options[idx].id);
            return;
        }
        if (key == _imgId) {
            chartSelect.options.selectedIndex = idx;
        }
        idx += 1;
    }
    chartSelect.onchange = function() {
        _obj.setChartId(chartSelect.options[chartSelect.options.selectedIndex].id);
    };
    chartDiv.appendChild(chartSelect);
    _element.appendChild(chartDiv);
}

// line-begin-x
function JRcreateBeginXInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("始点X :", _x, _y));
    var sxDiv = createLabel("", _x + 120, _y);
    var sxInput = createNumInput(_val);
    sxInput.onblur = function() {
        _obj.setStartX(sxInput.value);
    };
    sxDiv.appendChild(sxInput);
    _element.appendChild(sxDiv);
}

// line-begin-y
function JRcreateBeginYInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("始点Y :", _x, _y));
    var syDiv = createLabel("", _x + 120, _y);
    var syInput = createNumInput(_val);
    syInput.onblur = function() {
        _obj.setStartY(syInput.value);
    };
    syDiv.appendChild(syInput);
    _element.appendChild(syDiv);
}

// line-end-x
function JRcreateEndXInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("終点X :", _x, _y));
    var exDiv = createLabel("", _x + 120, _y);
    var exInput = createNumInput(_val);
    exInput.onblur = function() {
        _obj.setEndX(exInput.value);
    };
    exDiv.appendChild(exInput);
    _element.appendChild(exDiv);
}

// line-end-y
function JRcreateEndYInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("終点Y :", _x, _y));
    var eyDiv = createLabel("", _x + 120, _y);
    var eyInput = createNumInput(_val);
    eyInput.onblur = function() {
        _obj.setEndY(eyInput.value);
    };
    eyDiv.appendChild(eyInput);
    _element.appendChild(eyDiv);
}

// line-kind-select
function JRcreateLineKindSelect(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("線種 :", _x, _y));
    var lKindDiv = createLabel("", _x + 120, _y);
    var optArray = new draw2d.ArrayList();
    optArray.add("lineKind1");
    optArray.add("lineKind2");
    optArray.add("lineKind3");

    var lKindSelect = createSelction(optArray);
    lKindDiv.appendChild(lKindSelect);
    _element.appendChild(lKindDiv);
}

function JRcreateFormatInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("表示形式 :", _x, _y));
    var formatDiv = createLabel("", _x + 120, _y);
    var formatInput = createInput(_val);
    formatInput.id = "format";
    formatInput.onkeyup = function() {
        _obj.setFormat(formatInput.value);
    };
    formatInput.disabled = false;

    formatDiv.appendChild(formatInput);
    _element.appendChild(formatDiv);
}

function JRcreateHAlignmentSelect(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("横位置 :", _x, _y));
    var directionDiv = createLabel("", _x + 120, _y);
    var optArray = new draw2d.ArrayList();
    optArray.add("左揃え");
    optArray.add("中央揃え");
    optArray.add("右揃え");

    var nowIdx = 0;
    if (_val.toLowerCase() == "center") {
        nowIdx = 1;
    } else if (_val.toLowerCase() == "right") {
        nowIdx = 2;
    }

    var directionSelect = createSelctionIdx(optArray, nowIdx);
    directionSelect.onchange = function() {
        if (this.options.selectedIndex == 0) {
            _obj.setTextAlignment("left");
        } else if (this.options.selectedIndex == 1) {
            _obj.setTextAlignment("center");
        } else if (this.options.selectedIndex == 2) {
            _obj.setTextAlignment("right");
        }
    };
    directionDiv.appendChild(directionSelect);
    _element.appendChild(directionDiv);
}

function JRcreateVAlignmentSelect(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("縦位置 :", _x, _y));
    var directionDiv = createLabel("", _x + 120, _y);
    var optArray = new draw2d.ArrayList();
    optArray.add("上");
    optArray.add("中央");
    optArray.add("下");

    var nowIdx = 0;
    if (_val.toLowerCase() == "middle") {
        nowIdx = 1;
    } else if (_val.toLowerCase() == "bottom") {
        nowIdx = 2;
    }
    var directionSelect = createSelctionIdx(optArray, nowIdx);
    directionSelect.onchange = function() {
        if (this.options.selectedIndex == 0) {
            _obj.setVerticalAlignment("top");
        } else if (this.options.selectedIndex == 1) {
            _obj.setVerticalAlignment("middle");
        } else if (this.options.selectedIndex == 2) {
            _obj.setVerticalAlignment("bottom");
        }
    };
    directionDiv.appendChild(directionSelect);
    _element.appendChild(directionDiv);
}

function JRcreateConditionInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("表示条件式 :", _x, _y));
    var condDiv = createLabel("", +120, _y);
    var condInput = createInput(_obj.getCond());
    condInput.id = "condInput";
    condInput.onkeyup = function() {
        _obj.setCond(condInput.value);
    };

    condDiv.appendChild(condInput);
    _element.appendChild(condDiv);
}

function JRdeleteFigure(_figure) {
    if (_figure == null) {
        return;
    }
    var delCmd = new draw2d.CommandDelete(_figure);
    delCmd.execute();
}

/*
 * 各Figure から呼び出す場合には、this.palette.workflow.getDocument()、id（対象の） を引数に渡す。
 * getId() で取得できる ID を元に Figure を返す。
 */
function JRgetFigureById(_doc, _id) {
    var allFigures = _doc.getFigures();
    var allLines = _doc.getLines();
    // 線をallFiguresに追加
    for (var i = 0; i < allLines.getSize(); i++) {
        allFigures.add(allLines.get(i));
    }
    // 割り振りを行う
    for (var i = 0; i < allFigures.getSize(); i++) {
        var figure = allFigures.get(i);
        if (_id == figure.getId()) {
            return figure;
        }
    }
    return null;
}

/*
 * to generate labeled input (for property-window) end
 */
function dispose() {
    WindowFigure.prototype.dispose.call(this);
}

window.$ = function(id) {
    return document.getElementById(id);
};

function analyzePkgCapt(_this) {
    pkgCapt = "";
    while (_this.id != "fieldTree") {

        if (jQuery(_this).attr("class") == "directory expanded") {
            pkgCapt = jQuery(_this.childNodes[0]).attr("disp") + "/" + pkgCapt;

        }
        _this = _this.parentNode;

    }
    return pkgCapt.substring(0, pkgCapt.lastIndexOf("/"));
}

function analyzeRootName(_this) {
    rootName = "";
    while (_this.id != "fieldTree") {

        if (jQuery(_this).attr("class") == "directory expanded") {
            rootName = jQuery(_this.childNodes[0]).attr("rel");

        }
        _this = _this.parentNode;

    }
    return rootName;
}

// maintxt-input
function JRcreateMainInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("レイアウト表示文言 :", _x, _y));
    var txtDiv = createLabel("", _x + 120, _y);
    var txtInput = createInput(_val);
    txtInput.onkeyup = function() {
        _obj.setMainText(txtInput.value);
    };
    txtDiv.appendChild(txtInput);
    _element.appendChild(txtDiv);
}

// head-input
function JRcreateHeadInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("接頭文言 :", _x, _y));
    var headDiv = createLabel("", _x + 120, _y);
    var headInput = createInput(_val);
    headInput.onkeyup = function() {
        _obj.setHeadTxt(headInput.value);
    };
    headDiv.appendChild(headInput);
    _element.appendChild(headDiv);
}

function JRcreateTailInput(_element, _obj, _val, _x, _y) {
    _element.appendChild(createLabel("接尾文言 :", _x, _y));
    var tailDiv = createLabel("", _x + 120, _y);
    var tailInput = createInput(_val);
    tailInput.onkeyup = function() {
        _obj.setTailTxt(tailInput.value);
    };
    tailDiv.appendChild(tailInput);
    _element.appendChild(tailDiv);
}
