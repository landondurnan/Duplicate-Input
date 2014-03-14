/*!
 * jQuery Duplicate Plugin
 * Original author: Landon Durnan
 */

 ;(function ( $, window, document, undefined ) {

	"use strict"; 

	function Duplicate( element, options ) {
		this.element = $(element);
		this.options = $.extend({}, $.fn.duplicate.defaults, options);
		this.addListener(this.element);
	}

	Duplicate.prototype = {

		constructor: Duplicate

	,	copy: function ( elem ) {
			var $clone = $(elem).clone(true, true);
			$clone.removeClass('clone');

			this.addListener($clone);
			$(elem).find('input').val('');
			$(elem).before($clone);
			this.callback( this.options.onCopy )
		}

	, remove: function (elem) {
			$(elem).closest('li').remove();
			this.callback( this.options.onRemove )
		}

	, addListener: function( elem ) {
			var that = this;
			$(elem).on('click', '.clone-add', function(e){ that.copy(elem); e.preventDefault(); } );
			$(elem).on('click', '.clone-remove', function(e){ that.remove(this); e.preventDefault(); });
		}

	, callback: function( func ) {
		if ( typeof func == 'function' ) {
			func.call(this);
		}
	}

	};

	$.fn.duplicate = function ( option ) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('duplicate')
				, options = typeof option === 'object' && option;
			if (!data){ $this.data('duplicate', (data = new Duplicate(this, options))); }
		});
	};

	$.fn.duplicate.Constructor = Duplicate;

	$.fn.duplicate.defaults = {
		onCopy : function(){},
		onRemove : function(){}
	}

})( jQuery, window, document );
