var ProgressModel, ProgressView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

console.warn("Deprecated: try using tbirds/views/progress instead.");

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyJ2aWV3cy9zaW1wbGUtcHJvZ3Jlc3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsYUFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLENBQUMsSUFBUixDQUFhLHNEQUFiOztBQUdNO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFFBQVEsQ0FBQyxNQUFyQyxDQUFBOzswQkFDRSxRQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVUsQ0FBVjtJQUNBLFFBQUEsRUFBVSxHQURWO0lBRUEsUUFBQSxFQUFVO0VBRlY7Ozs7OztBQUlFO0VBQU4sTUFBQSxhQUFBLFFBQTJCLEtBQTNCLENBQUE7O3lCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO0FBQ2xCLFVBQUEsSUFBQSxFQUFBO01BQUEsSUFBQSxHQUNFO1FBQUEsUUFBQSxFQUFVLEtBQUssQ0FBQyxRQUFoQjtRQUNBLFFBQUEsRUFBVSxLQUFLLENBQUMsUUFEaEI7UUFFQSxRQUFBLEVBQVUsS0FBSyxDQUFDO01BRmhCO01BR0YsS0FBQSxHQUFRLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBSyxDQUFDLFFBQU4sR0FBaUIsS0FBSyxDQUFDLFFBQXZCLEdBQWtDLEdBQWxDLEdBQXdDLEdBQW5EO2FBQ1IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQ0FBUCxFQUNBO1FBQUEsSUFBQSxFQUFLLGFBQUw7UUFDQSxLQUFBLEVBQU0sQ0FBQSxPQUFBLENBQUEsQ0FBVSxLQUFWLENBQWdCLENBQWhCO01BRE4sQ0FEQSxFQUUwQixRQUFBLENBQUEsQ0FBQTtlQUN4QixFQUFFLENBQUMsSUFBSCxDQUFRO1VBQUEsS0FBQSxFQUFNO1FBQU4sQ0FBUixFQUNBLENBQUEsQ0FBQSxDQUFHLEtBQUssQ0FBQyxRQUFULENBQWtCLElBQWxCLENBQUEsQ0FBd0IsS0FBSyxDQUFDLFFBQTlCLENBQXVDLENBQXZDLENBREE7TUFEd0IsQ0FGMUI7SUFOa0IsQ0FBcEI7RUFEc0IsQ0FBZDs7eUJBWVYsV0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVO0VBQVY7Ozs7OztBQUdKLE9BQUE7RUFDRSxhQURGO0VBRUUsWUFGRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuY29uc29sZS53YXJuIFwiRGVwcmVjYXRlZDogdHJ5IHVzaW5nIHRiaXJkcy92aWV3cy9wcm9ncmVzcyBpbnN0ZWFkLlwiXG5cblxuY2xhc3MgUHJvZ3Jlc3NNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHZhbHVlbWluOiAwXG4gICAgdmFsdWVtYXg6IDEwMFxuICAgIHZhbHVlbm93OiAwXG5cbmNsYXNzIFByb2dyZXNzVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLnByb2dyZXNzJywgLT5cbiAgICAgIGFyaWEgPVxuICAgICAgICB2YWx1ZW1pbjogbW9kZWwudmFsdWVtaW5cbiAgICAgICAgdmFsdWVtYXg6IG1vZGVsLnZhbHVlbWF4XG4gICAgICAgIHZhbHVlbm93OiBtb2RlbC52YWx1ZW5vd1xuICAgICAgd2lkdGggPSBNYXRoLmZsb29yIG1vZGVsLnZhbHVlbm93IC8gbW9kZWwudmFsdWVtYXggKiAxMDAgKyAwLjVcbiAgICAgIHRjLmRpdiAnLnByb2dyZXNzLWJhci5wcm9ncmVzcy1iYXItc3RyaXBlZCcsXG4gICAgICByb2xlOidwcm9ncmVzc2JhcicsXG4gICAgICBzdHlsZTpcIndpZHRoOiAje3dpZHRofSVcIiwgLT5cbiAgICAgICAgdGMuc3BhbiBzdHlsZTpcImNvbG9yOmJsYWNrO1wiLFxuICAgICAgICBcIiN7bW9kZWwudmFsdWVub3d9IG9mICN7bW9kZWwudmFsdWVtYXh9LlwiXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2UnOiAncmVuZGVyJ1xuICAgIFxuICAgIFxuZXhwb3J0IHtcbiAgUHJvZ3Jlc3NNb2RlbFxuICBQcm9ncmVzc1ZpZXdcbiAgfVxuIl19
