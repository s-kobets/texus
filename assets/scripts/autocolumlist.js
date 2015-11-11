(function($) {
    var defaults = {
        columns: 2,
        classname: 'column'
    };

    $.fn.autocolumnlist = function(params){
        var options = $.extend({}, defaults, params);
        return this.each(function() {
            var els = $(this).find('> li');
            var dimension = els.size();
            if (dimension > 0) {
                var elCol = Math.ceil(dimension/options.columns);
                if (elCol < options.min) {
                    elCol = options.min;
                }
                var start = 0;
                var end = elCol;
                
                for (i=0; i<options.columns; i++) {
                    if ((i + 1) == options.columns) {
                        els.slice(start, end).wrapAll('<div class="'+options.classname+' last" />');
                    } else {
                            els.slice(start, end).wrapAll('<div class="'+options.classname+'" />');
                    }
                    start = start+elCol;
                    end = end+elCol;
                }
            }
        });
    };
})(jQuery);