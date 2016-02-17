
var tmpArr = [];
for(var item in (workflow) )
{
    tmpArr.push(item);
}
alert(tmpArr.join('\n'));

var figures = workflow.getFigures();

figures.data.forEach(function(figure) {
    if (figure != null && figure != undefined) {
        var tmpArr = [];
        for(var item in (figure) )
        {
            tmpArr.push(item);
        }
        alert(tmpArr.join('\n'));
    }
});


function AutoAdjust() {
    this.autoExtractIds = function(preName, prePkgCapt) {
        var extractIds = [];

        var figures = workflow.getFigures();

        figures.data.forEach(function(figure) {
            if (figure != null && figure != undefined) {


                if (figure.pkgCapt == prePkgCapt && figure.name.startsWith(preName)) {
                    var lastIndex = figure.name.lastIndexOf("_");
                    var num = figure.name.substring(lastIndex + 1, lastIndex + 3);
                    extractIds[parseInt(num) - 1] = figure.id;
                }
            }

        });
        return extractIds;
    }

    this.autoExtractYs = function(preName, prePkgCapt) {
        var extractYs = [];

        var figures = workflow.getFigures();

        figures.data.forEach(function(figure) {
            if (figure != null && figure != undefined) {
                if (figure.pkgCapt == prePkgCapt && figure.name.startsWith(preName)) {
                    var lastIndex = figure.name.lastIndexOf("_");
                    var num = figure.name.substring(lastIndex + 1, lastIndex + 3);
                    extractYs[parseInt(num) - 1] = figure.y;
                }
            }
        });
        return extractYs;
    }

    this.autoAdjustPosition = function(ids, x, ys) {
        if (x != undefined) {
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                workflow.getFigure(id).setX(x);
            }
        }

        if (ys != undefined) {
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var y = ys[i];
                workflow.getFigure(id).setY(y);
            }
        }
    }

    this.autoAdjustFontSize = function(ids, fontSize) {
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            workflow.getFigure(id).setFontSize(fontSize);
        }
    }

    this.autoAdjustSize = function(ids, width, height) {
        console.log(" autoAdjust Size: width" + width + " " + "height " + height);        
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            workflow.getFigure(id).setWidth(width);
            workflow.getFigure(id).setHeight(height);
        }
    }

    this.autoAdjustText = function(ids, text) {
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            workflow.getFigure(id).setText(text + i);
        }
    }

    this.autoAdjustTextForNum = function(ids, text) {
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            workflow.getFigure(id).setFormat(text);
            workflow.getFigure(id).setText(text);
        }
    }

    this.autoAdjustElement = function(preName, prePkgCapt, x, ys, width, height, fontSize, text) {
        var extractIds = this.autoExtractIds(preName, prePkgCapt);

        if (x != undefined) {
            this.autoAdjustPosition(extractIds, x, ys);
        }

        if (width != undefined) {
            console.log("AutoAdjustElement: width: " + width + " " + "height:" + height);
            this.autoAdjustSize(extractIds,width, height);
        }

        if (fontSize != undefined) {
            this.autoAdjustFontSize(extractIds, fontSize);
        }

        if (text != undefined) {
            this.autoAdjustText(extractIds, text);
        }
    }

    this.autoAdjustElementForNum = function(preName, prePkgCapt, x, ys, width, height, fontSize, text) {
        var extractIds = this.autoExtractIds(preName, prePkgCapt);

        if (x != undefined) {
            this.autoAdjustPosition(extractIds, x, ys);
        }

        if (width != undefined) {
            this.autoAdjustSize(extractIds,width, height);
        }

        if (fontSize != undefined) {
            this.autoAdjustFontSize(extractIds, fontSize);
        }

        if (text != undefined) {
            this.autoAdjustTextForNum(extractIds, text);
        }
    }

    this.autoExtractX = function(preName, prePkgCapt) {
        var x = undefined;
        var figures = workflow.getFigures();
        figures.data.forEach(function(figure) {
            if (figure != null && figure != undefined) {
                if (figure.pkgCapt == prePkgCapt && figure.name.startsWith(preName)) {
                    x = figure.x;                    
                }
            }
        });
        return x;
    }

    this.autoCopyYs = function(destPreName, destPkgCapt, srcPreName, srcPkgCapt, x, width, height, fontSize, text) {
        var extractYs = this.autoExtractYs(srcPreName, srcPkgCapt);
        console.log("origin: width:" + width + " " + " height: " + height)
        this.autoAdjustElement(destPreName, destPkgCapt, x, extractYs, width, height, fontSize, text);
    }

    this.autoCopyYsForNum = function(destPreName, destPkgCapt, srcPreName, srcPkgCapt, x, width, height, fontSize, text) {
        var extractYs = this.autoExtractYs(srcPreName, srcPkgCapt);
        this.autoAdjustElementForNum(destPreName, destPkgCapt, x, extractYs, width, height, fontSize, text);
    }

    this.autoCopyX = function(destPreName, destPkgCapt, srcPreName, srcPkgCapt) {
        var x = this.autoExtractX(srcPreName, srcPkgCapt);
        if (x == undefined) {
            return;
        }
        this.autoAdjustElement(destPreName,destPkgCapt,x);
    }

    this.autoRemove = function(preName, pkgCapt) {
        var extractIds = this.autoExtractIds(preName, pkgCapt);
        for (var i = 0; i < extractIds.length; i++) {
            var id = extractIds[i];
            if (id != undefined)
                workflow.removeFigure(workflow.getFigure(id));
        }

    }

};

var autoAdjust = new AutoAdjust();