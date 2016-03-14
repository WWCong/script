window.filedUtil = {

	// select Object
	currentSelection : undefined,

	//
	selectForCond : function(_this, _bindType, _namespace, _key, _format,
			_dataType, _mappingType, _caption) {

	},

	selectForBarcode : function(_this, _bindType, _namespace, _key, _format,
			_dataType, _mappingType, _captionf) {

		bddlg.txtInput.value = bddlg.txtInput.value + "<" + _caption + ">";
		othis.setDispString(bddlg.txtInput.value);
		othis.setConvTxt("<" + _key + ">");

	},

	toLayout : function(_this, _bindType, _namespace, _key, _format, _type,
			_dataType, _mappingType, _caption) {

		var escapeFunction = DOMImplementation.prototype.escapeString;
		var copy = document.createElement("div");
		copy.innerHTML = escapeFunction(_caption);
		jQuery(copy).css('position', 'absolute');
		jQuery(copy).css('top', jQuery(_this).position().top + 420);
		jQuery(copy).css('left', jQuery(_this).position().left - 280);
		jQuery(copy).css('width', 130);
		jQuery(copy).css('height', 20);
		jQuery(copy).css('z-index', '100000000');
		jQuery(copy).css('cursor', 'move');
		jQuery(copy).css('font-size', '12');
		jQuery(copy).css('background-color', '#BBDDFF');
		$('mainContents').appendChild(copy);

		window.filedUtil.currentSelection = copy;
		// window.document.onmousemove = window.filedUtil.mousemove;

		jQuery(window.document).mousemove(function(e) {

					var target = window.filedUtil.currentSelection;

					if (target) {

						var adjX = jQuery(target).width() / 2;
						var adjY = jQuery(target).height() / 2;

						jQuery(target).css('top', (e.pageY - 130 - adjY));
						jQuery(target).css('left', (e.pageX - 290 - adjX));

					}

				})

		var pkgCapt = analyzePkgCapt(_this);

		var rootName = analyzeRootName(_this);

		// mouseUp
		jQuery(copy).mouseup(function(e) {

			if ((jQuery(copy).position().left < -160)
					&& ((jQuery(copy).position().top < 400))) {

				$('mainContents').removeChild(copy);
			} else {

				window.filedUtil.currentSelection = undefined;
				// window.document.onmousemove = undefined;

				if (jQuery(copy).position().left < 0
						|| jQuery(copy).position().top < 0) {
					$('mainContents').removeChild(copy);
					return;
				}

				var target = fieldfactory.createField(pkgCapt, _bindType,
						_namespace, _key, _format, _type, _dataType,
						_mappingType, _caption, rootName);

				workflow.addFigure(target, jQuery(copy).position().left,
						jQuery(copy).position().top);

				$('mainContents').removeChild(copy);
			}
		})
	},

	// create Object
	createField : function(_this, _bindType, _namespace, _key, _format, _type,
			_dataType, _mappingType, _caption) {

		window.filedUtil.toLayout(_this, _bindType, _namespace, _key, _format,
				_type, _dataType, _mappingType, _caption);

	}

}