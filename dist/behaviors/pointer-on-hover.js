var PointerOnHover;

import {
  result
} from 'underscore';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3BvaW50ZXItb24taG92ZXIuanMiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9wb2ludGVyLW9uLWhvdmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRU07RUFBTixNQUFBLGVBQUEsUUFBNkIsU0FBN0I7SUFLRSxNQUFRLENBQUEsQ0FBQTtBQUNOLFVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtNQUFBLEdBQUEsR0FBTTtNQUNOLFVBQUEsR0FBYSxJQUFDLENBQUEsU0FBRCxDQUFXLFlBQVg7TUFDYixJQUFHLFVBQUg7UUFDRSxHQUFBLEdBQU0sQ0FBQSxlQUFBLENBQUEsQ0FBa0IsVUFBbEIsQ0FBQSxFQURSOztNQUVBLElBQUEsR0FBTyxDQUFBO01BQ1AsSUFBSyxDQUFBLEdBQUEsQ0FBTCxHQUFZO0FBQ1osYUFBTztJQVBEOztJQVNSLFdBQWEsQ0FBQSxDQUFBO0FBQ1gsVUFBQSxFQUFBLEVBQUE7TUFBQSxJQUFHLE1BQUEsQ0FBTyxJQUFDLENBQUEsT0FBUixFQUFpQixhQUFqQixDQUFIO1FBQ0UsVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtRQUNiLElBQUcsVUFBSDtVQUNFLEVBQUEsR0FBSyxJQUFDLENBQUEsRUFBRyxDQUFBLFVBQUEsRUFEWDtTQUFBLE1BQUE7VUFHRSxFQUFBLEdBQUssSUFBQyxDQUFBLElBSFI7O1FBSUEsRUFBRSxDQUFDLEdBQUgsQ0FDRTtVQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FBRCxDQUFXLFFBQVg7UUFBUixDQURGLEVBTkY7O0lBRFc7O0VBZGY7OzJCQUNFLE9BQUEsR0FDRTtJQUFBLFVBQUEsRUFBWSxFQUFaO0lBQ0EsV0FBQSxFQUFhLElBRGI7SUFFQSxNQUFBLEVBQVE7RUFGUjs7Ozs7O0FBdUJKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc3VsdCB9IGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbmNsYXNzIFBvaW50ZXJPbkhvdmVyIGV4dGVuZHMgQmVoYXZpb3JcbiAgb3B0aW9uczpcbiAgICB1aVByb3BlcnR5OiAnJ1xuICAgIGlzQ2xpY2thYmxlOiB0cnVlXG4gICAgY3Vyc29yOiAncG9pbnRlcidcbiAgZXZlbnRzOiAtPlxuICAgIGtleSA9ICdtb3VzZWVudGVyJ1xuICAgIHVpUHJvcGVydHkgPSBAZ2V0T3B0aW9uICd1aVByb3BlcnR5J1xuICAgIGlmIHVpUHJvcGVydHlcbiAgICAgIGtleSA9IFwibW91c2VlbnRlciBAdWkuI3t1aVByb3BlcnR5fVwiXG4gICAgZGF0YSA9IHt9XG4gICAgZGF0YVtrZXldID0gJ2hhbmRsZUhvdmVyJ1xuICAgIHJldHVybiBkYXRhXG4gICAgXG4gIGhhbmRsZUhvdmVyOiAtPlxuICAgIGlmIHJlc3VsdCBAb3B0aW9ucywgJ2lzQ2xpY2thYmxlJ1xuICAgICAgdWlQcm9wZXJ0eSA9IEBnZXRPcHRpb24oJ3VpUHJvcGVydHknKVxuICAgICAgaWYgdWlQcm9wZXJ0eVxuICAgICAgICBlbCA9IEB1aVt1aVByb3BlcnR5XVxuICAgICAgZWxzZVxuICAgICAgICBlbCA9IEAkZWxcbiAgICAgIGVsLmNzc1xuICAgICAgICBjdXJzb3I6IEBnZXRPcHRpb24oJ2N1cnNvcicpXG4gICAgcmV0dXJuXG5cbmV4cG9ydCBkZWZhdWx0IFBvaW50ZXJPbkhvdmVyXG4iXX0=
