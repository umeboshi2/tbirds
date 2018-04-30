var PointerOnHover;

import {
  result
} from 'underscore';

import Marionette from 'backbone.marionette';

export default PointerOnHover = (function() {
  class PointerOnHover extends Marionette.Behavior {
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
        return el.css({
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3BvaW50ZXItb24taG92ZXIuanMiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9wb2ludGVyLW9uLWhvdmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxPQUFBLFFBQXFCO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFVBQVUsQ0FBQyxTQUF4QztJQUliLE1BQVEsQ0FBQSxDQUFBO0FBQ04sVUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNO01BQ04sVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtNQUNiLElBQUcsVUFBSDtRQUNFLEdBQUEsR0FBTSxDQUFBLGVBQUEsQ0FBQSxDQUFrQixVQUFsQixDQUFBLEVBRFI7O01BRUEsSUFBQSxHQUFPLENBQUE7TUFDUCxJQUFLLENBQUEsR0FBQSxDQUFMLEdBQVk7QUFDWixhQUFPO0lBUEQ7O0lBU1IsV0FBYSxDQUFBLENBQUE7QUFDWCxVQUFBLEVBQUEsRUFBQTtNQUFBLElBQUcsTUFBQSxDQUFPLElBQUMsQ0FBQSxPQUFSLEVBQWlCLGFBQWpCLENBQUg7UUFDRSxVQUFBLEdBQWEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxZQUFYO1FBQ2IsSUFBRyxVQUFIO1VBQ0UsRUFBQSxHQUFLLElBQUMsQ0FBQSxFQUFHLENBQUEsVUFBQSxFQURYO1NBQUEsTUFBQTtVQUdFLEVBQUEsR0FBSyxJQUFDLENBQUEsSUFIUjs7ZUFJQSxFQUFFLENBQUMsR0FBSCxDQUNFO1VBQUEsTUFBQSxFQUFRO1FBQVIsQ0FERixFQU5GOztJQURXOztFQWJBOzsyQkFDYixPQUFBLEdBQ0U7SUFBQSxVQUFBLEVBQVksRUFBWjtJQUNBLFdBQUEsRUFBYTtFQURiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzdWx0IH0gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50ZXJPbkhvdmVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuICBvcHRpb25zOlxuICAgIHVpUHJvcGVydHk6ICcnXG4gICAgaXNDbGlja2FibGU6ICdoZWxsbydcbiAgZXZlbnRzOiAtPlxuICAgIGtleSA9ICdtb3VzZWVudGVyJ1xuICAgIHVpUHJvcGVydHkgPSBAZ2V0T3B0aW9uICd1aVByb3BlcnR5J1xuICAgIGlmIHVpUHJvcGVydHlcbiAgICAgIGtleSA9IFwibW91c2VlbnRlciBAdWkuI3t1aVByb3BlcnR5fVwiXG4gICAgZGF0YSA9IHt9XG4gICAgZGF0YVtrZXldID0gJ2hhbmRsZUhvdmVyJ1xuICAgIHJldHVybiBkYXRhXG4gICAgXG4gIGhhbmRsZUhvdmVyOiAtPlxuICAgIGlmIHJlc3VsdCBAb3B0aW9ucywgJ2lzQ2xpY2thYmxlJ1xuICAgICAgdWlQcm9wZXJ0eSA9IEBnZXRPcHRpb24oJ3VpUHJvcGVydHknKVxuICAgICAgaWYgdWlQcm9wZXJ0eVxuICAgICAgICBlbCA9IEB1aVt1aVByb3BlcnR5XVxuICAgICAgZWxzZVxuICAgICAgICBlbCA9IEAkZWxcbiAgICAgIGVsLmNzc1xuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuIl19
