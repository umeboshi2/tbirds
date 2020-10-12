var PointerOnHover;

import {
  result
} from 'lodash';

import {
  Behavior
} from 'backbone.marionette';

PointerOnHover = (function() {
  class PointerOnHover extends Behavior {
    events() {
      var data, key, uiProperty;
      key = 'mouseenter';
      uiProperty = this.getOption('uiProperty');
      if (uiProperty) {
        key = `mouseenter @ui.${uiProperty}`;
      }
      data = {};
      data[key] = 'handleHover';
      return data;
    }

    handleHover() {
      var el, uiProperty;
      if (result(this.options, 'isClickable')) {
        uiProperty = this.getOption('uiProperty');
        if (uiProperty) {
          el = this.ui[uiProperty];
        } else {
          el = this.$el;
        }
        el.css({
          cursor: this.getOption('cursor')
        });
      }
    }

  };

  PointerOnHover.prototype.options = {
    uiProperty: '',
    isClickable: true,
    cursor: 'pointer'
  };

  return PointerOnHover;

}).call(this);

export default PointerOnHover;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3BvaW50ZXItb24taG92ZXIuanMiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9wb2ludGVyLW9uLWhvdmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRU07RUFBTixNQUFBLGVBQUEsUUFBNkIsU0FBN0I7SUFLRSxNQUFRLENBQUEsQ0FBQTtBQUNWLFVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtNQUFJLEdBQUEsR0FBTTtNQUNOLFVBQUEsR0FBYSxJQUFDLENBQUEsU0FBRCxDQUFXLFlBQVg7TUFDYixJQUFHLFVBQUg7UUFDRSxHQUFBLEdBQU0sQ0FBQSxlQUFBLENBQUEsQ0FBa0IsVUFBbEIsQ0FBQSxFQURSOztNQUVBLElBQUEsR0FBTyxDQUFBO01BQ1AsSUFBSSxDQUFDLEdBQUQsQ0FBSixHQUFZO0FBQ1osYUFBTztJQVBEOztJQVNSLFdBQWEsQ0FBQSxDQUFBO0FBQ2YsVUFBQSxFQUFBLEVBQUE7TUFBSSxJQUFHLE1BQUEsQ0FBTyxJQUFDLENBQUEsT0FBUixFQUFpQixhQUFqQixDQUFIO1FBQ0UsVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtRQUNiLElBQUcsVUFBSDtVQUNFLEVBQUEsR0FBSyxJQUFDLENBQUEsRUFBRSxDQUFDLFVBQUQsRUFEVjtTQUFBLE1BQUE7VUFHRSxFQUFBLEdBQUssSUFBQyxDQUFBLElBSFI7O1FBSUEsRUFBRSxDQUFDLEdBQUgsQ0FDRTtVQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FBRCxDQUFXLFFBQVg7UUFBUixDQURGLEVBTkY7O0lBRFc7O0VBZGY7OzJCQUNFLE9BQUEsR0FDRTtJQUFBLFVBQUEsRUFBWSxFQUFaO0lBQ0EsV0FBQSxFQUFhLElBRGI7SUFFQSxNQUFBLEVBQVE7RUFGUjs7Ozs7O0FBdUJKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc3VsdCB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuY2xhc3MgUG9pbnRlck9uSG92ZXIgZXh0ZW5kcyBCZWhhdmlvclxuICBvcHRpb25zOlxuICAgIHVpUHJvcGVydHk6ICcnXG4gICAgaXNDbGlja2FibGU6IHRydWVcbiAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICBldmVudHM6IC0+XG4gICAga2V5ID0gJ21vdXNlZW50ZXInXG4gICAgdWlQcm9wZXJ0eSA9IEBnZXRPcHRpb24gJ3VpUHJvcGVydHknXG4gICAgaWYgdWlQcm9wZXJ0eVxuICAgICAga2V5ID0gXCJtb3VzZWVudGVyIEB1aS4je3VpUHJvcGVydHl9XCJcbiAgICBkYXRhID0ge31cbiAgICBkYXRhW2tleV0gPSAnaGFuZGxlSG92ZXInXG4gICAgcmV0dXJuIGRhdGFcbiAgICBcbiAgaGFuZGxlSG92ZXI6IC0+XG4gICAgaWYgcmVzdWx0IEBvcHRpb25zLCAnaXNDbGlja2FibGUnXG4gICAgICB1aVByb3BlcnR5ID0gQGdldE9wdGlvbigndWlQcm9wZXJ0eScpXG4gICAgICBpZiB1aVByb3BlcnR5XG4gICAgICAgIGVsID0gQHVpW3VpUHJvcGVydHldXG4gICAgICBlbHNlXG4gICAgICAgIGVsID0gQCRlbFxuICAgICAgZWwuY3NzXG4gICAgICAgIGN1cnNvcjogQGdldE9wdGlvbignY3Vyc29yJylcbiAgICByZXR1cm5cblxuZXhwb3J0IGRlZmF1bHQgUG9pbnRlck9uSG92ZXJcbiJdfQ==
