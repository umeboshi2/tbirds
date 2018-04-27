var MainChannel, PointerOnHover;

import {
  result
} from 'underscore';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

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
      console.log("handleHover", this.options.isClickable, this.options);
      console.log("isClickable", this.getOption('isClickable'));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3BvaW50ZXItb24taG92ZXIuanMiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9wb2ludGVyLW9uLWhvdmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFZCxPQUFBLFFBQXFCO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFVBQVUsQ0FBQyxTQUF4QztJQUliLE1BQVEsQ0FBQSxDQUFBO0FBQ04sVUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNO01BQ04sVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtNQUNiLElBQUcsVUFBSDtRQUNFLEdBQUEsR0FBTSxDQUFBLGVBQUEsQ0FBQSxDQUFrQixVQUFsQixDQUFBLEVBRFI7O01BRUEsSUFBQSxHQUFPLENBQUE7TUFDUCxJQUFLLENBQUEsR0FBQSxDQUFMLEdBQVk7QUFDWixhQUFPO0lBUEQ7O0lBU1IsV0FBYSxDQUFBLENBQUE7QUFDWCxVQUFBLEVBQUEsRUFBQTtNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBWixFQUEyQixJQUFDLENBQUEsT0FBTyxDQUFDLFdBQXBDLEVBQWlELElBQUMsQ0FBQSxPQUFsRDtNQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBWixFQUEyQixJQUFDLENBQUEsU0FBRCxDQUFXLGFBQVgsQ0FBM0I7TUFDQSxJQUFHLE1BQUEsQ0FBTyxJQUFDLENBQUEsT0FBUixFQUFpQixhQUFqQixDQUFIO1FBQ0UsVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtRQUNiLElBQUcsVUFBSDtVQUNFLEVBQUEsR0FBSyxJQUFDLENBQUEsRUFBRyxDQUFBLFVBQUEsRUFEWDtTQUFBLE1BQUE7VUFHRSxFQUFBLEdBQUssSUFBQyxDQUFBLElBSFI7O2VBSUEsRUFBRSxDQUFDLEdBQUgsQ0FDRTtVQUFBLE1BQUEsRUFBUTtRQUFSLENBREYsRUFORjs7SUFIVzs7RUFiQTs7MkJBQ2IsT0FBQSxHQUNFO0lBQUEsVUFBQSxFQUFZLEVBQVo7SUFDQSxXQUFBLEVBQWE7RUFEYiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc3VsdCB9IGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRlck9uSG92ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG4gIG9wdGlvbnM6XG4gICAgdWlQcm9wZXJ0eTogJydcbiAgICBpc0NsaWNrYWJsZTogJ2hlbGxvJ1xuICBldmVudHM6IC0+XG4gICAga2V5ID0gJ21vdXNlZW50ZXInXG4gICAgdWlQcm9wZXJ0eSA9IEBnZXRPcHRpb24gJ3VpUHJvcGVydHknXG4gICAgaWYgdWlQcm9wZXJ0eVxuICAgICAga2V5ID0gXCJtb3VzZWVudGVyIEB1aS4je3VpUHJvcGVydHl9XCJcbiAgICBkYXRhID0ge31cbiAgICBkYXRhW2tleV0gPSAnaGFuZGxlSG92ZXInXG4gICAgcmV0dXJuIGRhdGFcbiAgICBcbiAgaGFuZGxlSG92ZXI6IC0+XG4gICAgY29uc29sZS5sb2cgXCJoYW5kbGVIb3ZlclwiLCBAb3B0aW9ucy5pc0NsaWNrYWJsZSwgQG9wdGlvbnNcbiAgICBjb25zb2xlLmxvZyBcImlzQ2xpY2thYmxlXCIsIEBnZXRPcHRpb24oJ2lzQ2xpY2thYmxlJylcbiAgICBpZiByZXN1bHQgQG9wdGlvbnMsICdpc0NsaWNrYWJsZSdcbiAgICAgIHVpUHJvcGVydHkgPSBAZ2V0T3B0aW9uKCd1aVByb3BlcnR5JylcbiAgICAgIGlmIHVpUHJvcGVydHlcbiAgICAgICAgZWwgPSBAdWlbdWlQcm9wZXJ0eV1cbiAgICAgIGVsc2VcbiAgICAgICAgZWwgPSBAJGVsXG4gICAgICBlbC5jc3NcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiJdfQ==
