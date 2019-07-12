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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3BvaW50ZXItb24taG92ZXIuanMiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9wb2ludGVyLW9uLWhvdmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBQSxRQUFxQjtFQUFOLE1BQUEsZUFBQSxRQUE2QixTQUE3QjtJQUtiLE1BQVEsQ0FBQSxDQUFBO0FBQ04sVUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNO01BQ04sVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtNQUNiLElBQUcsVUFBSDtRQUNFLEdBQUEsR0FBTSxDQUFBLGVBQUEsQ0FBQSxDQUFrQixVQUFsQixDQUFBLEVBRFI7O01BRUEsSUFBQSxHQUFPLENBQUE7TUFDUCxJQUFLLENBQUEsR0FBQSxDQUFMLEdBQVk7QUFDWixhQUFPO0lBUEQ7O0lBU1IsV0FBYSxDQUFBLENBQUE7QUFDWCxVQUFBLEVBQUEsRUFBQTtNQUFBLElBQUcsTUFBQSxDQUFPLElBQUMsQ0FBQSxPQUFSLEVBQWlCLGFBQWpCLENBQUg7UUFDRSxVQUFBLEdBQWEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxZQUFYO1FBQ2IsSUFBRyxVQUFIO1VBQ0UsRUFBQSxHQUFLLElBQUMsQ0FBQSxFQUFHLENBQUEsVUFBQSxFQURYO1NBQUEsTUFBQTtVQUdFLEVBQUEsR0FBSyxJQUFDLENBQUEsSUFIUjs7UUFJQSxFQUFFLENBQUMsR0FBSCxDQUNFO1VBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFELENBQVcsUUFBWDtRQUFSLENBREYsRUFORjs7SUFEVzs7RUFkQTs7MkJBQ2IsT0FBQSxHQUNFO0lBQUEsVUFBQSxFQUFZLEVBQVo7SUFDQSxXQUFBLEVBQWEsSUFEYjtJQUVBLE1BQUEsRUFBUTtFQUZSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzdWx0IH0gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRlck9uSG92ZXIgZXh0ZW5kcyBCZWhhdmlvclxuICBvcHRpb25zOlxuICAgIHVpUHJvcGVydHk6ICcnXG4gICAgaXNDbGlja2FibGU6IHRydWVcbiAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICBldmVudHM6IC0+XG4gICAga2V5ID0gJ21vdXNlZW50ZXInXG4gICAgdWlQcm9wZXJ0eSA9IEBnZXRPcHRpb24gJ3VpUHJvcGVydHknXG4gICAgaWYgdWlQcm9wZXJ0eVxuICAgICAga2V5ID0gXCJtb3VzZWVudGVyIEB1aS4je3VpUHJvcGVydHl9XCJcbiAgICBkYXRhID0ge31cbiAgICBkYXRhW2tleV0gPSAnaGFuZGxlSG92ZXInXG4gICAgcmV0dXJuIGRhdGFcbiAgICBcbiAgaGFuZGxlSG92ZXI6IC0+XG4gICAgaWYgcmVzdWx0IEBvcHRpb25zLCAnaXNDbGlja2FibGUnXG4gICAgICB1aVByb3BlcnR5ID0gQGdldE9wdGlvbigndWlQcm9wZXJ0eScpXG4gICAgICBpZiB1aVByb3BlcnR5XG4gICAgICAgIGVsID0gQHVpW3VpUHJvcGVydHldXG4gICAgICBlbHNlXG4gICAgICAgIGVsID0gQCRlbFxuICAgICAgZWwuY3NzXG4gICAgICAgIGN1cnNvcjogQGdldE9wdGlvbignY3Vyc29yJylcbiAgICByZXR1cm5cbiJdfQ==
