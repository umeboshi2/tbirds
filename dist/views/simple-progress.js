var ProgressModel, ProgressView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

ProgressModel = (function() {
  class ProgressModel extends Backbone.Model {};

  ProgressModel.prototype.defaults = {
    valuemin: 0,
    valuemax: 100,
    valuenow: 0
  };

  return ProgressModel;

}).call(this);

ProgressView = (function() {
  class ProgressView extends View {};

  ProgressView.prototype.template = tc.renderable(function(model) {
    return tc.div('.progress', function() {
      var aria, width;
      aria = {
        valuemin: model.valuemin,
        valuemax: model.valuemax,
        valuenow: model.valuenow
      };
      width = Math.floor(model.valuenow / model.valuemax * 100 + 0.5);
      return tc.div('.progress-bar.progress-bar-striped', {
        role: 'progressbar',
        style: `width: ${width}%`
      }, function() {
        return tc.span({
          style: "color:black;"
        }, `${model.valuenow} of ${model.valuemax}.`);
      });
    });
  });

  ProgressView.prototype.modelEvents = {
    'change': 'render'
  };

  return ProgressView;

}).call(this);

export {
  ProgressModel,
  ProgressView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyJ2aWV3cy9zaW1wbGUtcHJvZ3Jlc3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsYUFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFTTtFQUFOLE1BQUEsY0FBQSxRQUE0QixRQUFRLENBQUMsTUFBckMsQ0FBQTs7MEJBQ0UsUUFBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLENBQVY7SUFDQSxRQUFBLEVBQVUsR0FEVjtJQUVBLFFBQUEsRUFBVTtFQUZWOzs7Ozs7QUFJRTtFQUFOLE1BQUEsYUFBQSxRQUEyQixLQUEzQixDQUFBOzt5QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sV0FBUCxFQUFvQixRQUFBLENBQUEsQ0FBQTtBQUNsQixVQUFBLElBQUEsRUFBQTtNQUFBLElBQUEsR0FDRTtRQUFBLFFBQUEsRUFBVSxLQUFLLENBQUMsUUFBaEI7UUFDQSxRQUFBLEVBQVUsS0FBSyxDQUFDLFFBRGhCO1FBRUEsUUFBQSxFQUFVLEtBQUssQ0FBQztNQUZoQjtNQUdGLEtBQUEsR0FBUSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxRQUFOLEdBQWlCLEtBQUssQ0FBQyxRQUF2QixHQUFrQyxHQUFsQyxHQUF3QyxHQUFuRDthQUNSLEVBQUUsQ0FBQyxHQUFILENBQU8sb0NBQVAsRUFDQTtRQUFBLElBQUEsRUFBSyxhQUFMO1FBQ0EsS0FBQSxFQUFNLENBQUEsT0FBQSxDQUFBLENBQVUsS0FBVixDQUFnQixDQUFoQjtNQUROLENBREEsRUFFMEIsUUFBQSxDQUFBLENBQUE7ZUFDeEIsRUFBRSxDQUFDLElBQUgsQ0FBUTtVQUFBLEtBQUEsRUFBTTtRQUFOLENBQVIsRUFDQSxDQUFBLENBQUEsQ0FBRyxLQUFLLENBQUMsUUFBVCxDQUFrQixJQUFsQixDQUFBLENBQXdCLEtBQUssQ0FBQyxRQUE5QixDQUF1QyxDQUF2QyxDQURBO01BRHdCLENBRjFCO0lBTmtCLENBQXBCO0VBRHNCLENBQWQ7O3lCQVlWLFdBQUEsR0FDRTtJQUFBLFFBQUEsRUFBVTtFQUFWOzs7Ozs7QUFHSixPQUFBO0VBQ0UsYUFERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmNsYXNzIFByb2dyZXNzTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICB2YWx1ZW1pbjogMFxuICAgIHZhbHVlbWF4OiAxMDBcbiAgICB2YWx1ZW5vdzogMFxuXG5jbGFzcyBQcm9ncmVzc1ZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5wcm9ncmVzcycsIC0+XG4gICAgICBhcmlhID1cbiAgICAgICAgdmFsdWVtaW46IG1vZGVsLnZhbHVlbWluXG4gICAgICAgIHZhbHVlbWF4OiBtb2RlbC52YWx1ZW1heFxuICAgICAgICB2YWx1ZW5vdzogbW9kZWwudmFsdWVub3dcbiAgICAgIHdpZHRoID0gTWF0aC5mbG9vciBtb2RlbC52YWx1ZW5vdyAvIG1vZGVsLnZhbHVlbWF4ICogMTAwICsgMC41XG4gICAgICB0Yy5kaXYgJy5wcm9ncmVzcy1iYXIucHJvZ3Jlc3MtYmFyLXN0cmlwZWQnLFxuICAgICAgcm9sZToncHJvZ3Jlc3NiYXInLFxuICAgICAgc3R5bGU6XCJ3aWR0aDogI3t3aWR0aH0lXCIsIC0+XG4gICAgICAgIHRjLnNwYW4gc3R5bGU6XCJjb2xvcjpibGFjaztcIixcbiAgICAgICAgXCIje21vZGVsLnZhbHVlbm93fSBvZiAje21vZGVsLnZhbHVlbWF4fS5cIlxuICBtb2RlbEV2ZW50czpcbiAgICAnY2hhbmdlJzogJ3JlbmRlcidcbiAgICBcbiAgICBcbmV4cG9ydCB7XG4gIFByb2dyZXNzTW9kZWxcbiAgUHJvZ3Jlc3NWaWV3XG4gIH1cbiJdfQ==
