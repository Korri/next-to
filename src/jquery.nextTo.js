/**
 * jQuery nextTo
 *
 * Basic usage:
 * $('#positionMe').nextTo($('#target'), {position: 'bottom', shareBorder: 'right'});
 *
 * @author gillyb, Korri
 * @version 0.1.1
 * https://github.com/Korri/jQuery.nextTo
 */
(function ($) {
	$.fn.nextTo = function (baseElement, options) {
		if (this.length == 0) return false;

		var settings = $.extend({}, $.fn.nextTo.defaults, options);

		var looseElement = this,
			baseOffset = baseElement.offset(),
			css = {
				position: 'absolute',
				top: 0,
				left: 0
			}

		// general position
		switch (settings.position) {
			case 'bottom':
				css.top = baseOffset.top + baseElement.outerHeight();
				break;
			case 'top':
				css.top = baseOffset.top - looseElement.outerHeight();
				break;
			case 'right':
				css.left = baseOffset.left + baseElement.outerWidth();
				break;
			case 'left':
				css.left = baseOffset.left - looseElement.outerWidth();
				break;
			default:
				throw 'Invalid "position" value passed to nextTo(): ' + settings.position;
		}

		// align border
		switch (settings.shareBorder) {
			case 'right':
				css.left = baseOffset.left - (looseElement.outerWidth() - baseElement.outerWidth());
				break;
			case 'left':
				css.left = baseOffset.left;
				break;
			case 'top':
				css.top = baseOffset.top;
				break;
			case 'bottom':
				css.top = baseOffset.top - (looseElement.outerHeight() - baseElement.outerHeight());
				break;
			default:
				throw 'Invalid "shareBorder" value passed to nextTo(): ' + settings.position;
		}

		//Handle offset parent
		var parentOffset = looseElement.offsetParent().offset();
		css.left -= parentOffset.left;
		css.top -= parentOffset.top;

		// add offset
		css.left += settings.offsetX;
		css.top += settings.offsetY;

		//Actually change css
		looseElement.css(css);
	};

	$.fn.nextTo.defaults = {
		position: 'bottom', // bottom/top/right/left
		shareBorder: 'right', // bottom/top/right/left
		offsetX: 0,
		offsetY: 0
	};
})(jQuery)