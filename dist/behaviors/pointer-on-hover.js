var PointerOnHover;

import {
  result
} from 'underscore';

import {
  Behavior
} from 'backbone.marionette';

export default PointerOnHover = (function() {
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
          cursor: 'pointer'
        });
      }
    }

  };

  PointerOnHover.prototype.options = {
    uiProperty: '',
    isClickable: 'hello'
  };

  return PointerOnHover;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3BvaW50ZXItb24taG92ZXIuanMiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9wb2ludGVyLW9uLWhvdmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBQSxRQUFxQjtFQUFOLE1BQUEsZUFBQSxRQUE2QixTQUE3QjtJQUliLE1BQVEsQ0FBQSxDQUFBO0FBQ04sVUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNO01BQ04sVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtNQUNiLElBQUcsVUFBSDtRQUNFLEdBQUEsR0FBTSxDQUFBLGVBQUEsQ0FBQSxDQUFrQixVQUFsQixDQUFBLEVBRFI7O01BRUEsSUFBQSxHQUFPLENBQUE7TUFDUCxJQUFLLENBQUEsR0FBQSxDQUFMLEdBQVk7QUFDWixhQUFPO0lBUEQ7O0lBU1IsV0FBYSxDQUFBLENBQUE7QUFDWCxVQUFBLEVBQUEsRUFBQTtNQUFBLElBQUcsTUFBQSxDQUFPLElBQUMsQ0FBQSxPQUFSLEVBQWlCLGFBQWpCLENBQUg7UUFDRSxVQUFBLEdBQWEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxZQUFYO1FBQ2IsSUFBRyxVQUFIO1VBQ0UsRUFBQSxHQUFLLElBQUMsQ0FBQSxFQUFHLENBQUEsVUFBQSxFQURYO1NBQUEsTUFBQTtVQUdFLEVBQUEsR0FBSyxJQUFDLENBQUEsSUFIUjs7UUFJQSxFQUFFLENBQUMsR0FBSCxDQUNFO1VBQUEsTUFBQSxFQUFRO1FBQVIsQ0FERixFQU5GOztJQURXOztFQWJBOzsyQkFDYixPQUFBLEdBQ0U7SUFBQSxVQUFBLEVBQVksRUFBWjtJQUNBLFdBQUEsRUFBYTtFQURiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzdWx0IH0gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRlck9uSG92ZXIgZXh0ZW5kcyBCZWhhdmlvclxuICBvcHRpb25zOlxuICAgIHVpUHJvcGVydHk6ICcnXG4gICAgaXNDbGlja2FibGU6ICdoZWxsbydcbiAgZXZlbnRzOiAtPlxuICAgIGtleSA9ICdtb3VzZWVudGVyJ1xuICAgIHVpUHJvcGVydHkgPSBAZ2V0T3B0aW9uICd1aVByb3BlcnR5J1xuICAgIGlmIHVpUHJvcGVydHlcbiAgICAgIGtleSA9IFwibW91c2VlbnRlciBAdWkuI3t1aVByb3BlcnR5fVwiXG4gICAgZGF0YSA9IHt9XG4gICAgZGF0YVtrZXldID0gJ2hhbmRsZUhvdmVyJ1xuICAgIHJldHVybiBkYXRhXG4gICAgXG4gIGhhbmRsZUhvdmVyOiAtPlxuICAgIGlmIHJlc3VsdCBAb3B0aW9ucywgJ2lzQ2xpY2thYmxlJ1xuICAgICAgdWlQcm9wZXJ0eSA9IEBnZXRPcHRpb24oJ3VpUHJvcGVydHknKVxuICAgICAgaWYgdWlQcm9wZXJ0eVxuICAgICAgICBlbCA9IEB1aVt1aVByb3BlcnR5XVxuICAgICAgZWxzZVxuICAgICAgICBlbCA9IEAkZWxcbiAgICAgIGVsLmNzc1xuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgIHJldHVyblxuIl19
