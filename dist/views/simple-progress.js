var ProgressModel, ProgressView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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
  class ProgressView extends Marionette.View {};

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyJ2aWV3cy9zaW1wbGUtcHJvZ3Jlc3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsYUFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFFBQVEsQ0FBQyxNQUFyQyxDQUFBOzswQkFDRSxRQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVUsQ0FBVjtJQUNBLFFBQUEsRUFBVSxHQURWO0lBRUEsUUFBQSxFQUFVO0VBRlY7Ozs7OztBQUlFO0VBQU4sTUFBQSxhQUFBLFFBQTJCLFVBQVUsQ0FBQyxLQUF0QyxDQUFBOzt5QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sV0FBUCxFQUFvQixRQUFBLENBQUEsQ0FBQTtBQUNsQixVQUFBLElBQUEsRUFBQTtNQUFBLElBQUEsR0FDRTtRQUFBLFFBQUEsRUFBVSxLQUFLLENBQUMsUUFBaEI7UUFDQSxRQUFBLEVBQVUsS0FBSyxDQUFDLFFBRGhCO1FBRUEsUUFBQSxFQUFVLEtBQUssQ0FBQztNQUZoQjtNQUdGLEtBQUEsR0FBUSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxRQUFOLEdBQWlCLEtBQUssQ0FBQyxRQUF2QixHQUFrQyxHQUFsQyxHQUF3QyxHQUFuRDthQUNSLEVBQUUsQ0FBQyxHQUFILENBQU8sb0NBQVAsRUFDQTtRQUFBLElBQUEsRUFBSyxhQUFMO1FBQ0EsS0FBQSxFQUFNLENBQUEsT0FBQSxDQUFBLENBQVUsS0FBVixDQUFnQixDQUFoQjtNQUROLENBREEsRUFFMEIsUUFBQSxDQUFBLENBQUE7ZUFDeEIsRUFBRSxDQUFDLElBQUgsQ0FBUTtVQUFBLEtBQUEsRUFBTTtRQUFOLENBQVIsRUFDQSxDQUFBLENBQUEsQ0FBRyxLQUFLLENBQUMsUUFBVCxDQUFrQixJQUFsQixDQUFBLENBQXdCLEtBQUssQ0FBQyxRQUE5QixDQUF1QyxDQUF2QyxDQURBO01BRHdCLENBRjFCO0lBTmtCLENBQXBCO0VBRHNCLENBQWQ7O3lCQVlWLFdBQUEsR0FDRTtJQUFBLFFBQUEsRUFBVTtFQUFWOzs7Ozs7QUFHSixPQUFBO0VBQ0UsYUFERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuY2xhc3MgUHJvZ3Jlc3NNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHZhbHVlbWluOiAwXG4gICAgdmFsdWVtYXg6IDEwMFxuICAgIHZhbHVlbm93OiAwXG5cbmNsYXNzIFByb2dyZXNzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcucHJvZ3Jlc3MnLCAtPlxuICAgICAgYXJpYSA9XG4gICAgICAgIHZhbHVlbWluOiBtb2RlbC52YWx1ZW1pblxuICAgICAgICB2YWx1ZW1heDogbW9kZWwudmFsdWVtYXhcbiAgICAgICAgdmFsdWVub3c6IG1vZGVsLnZhbHVlbm93XG4gICAgICB3aWR0aCA9IE1hdGguZmxvb3IgbW9kZWwudmFsdWVub3cgLyBtb2RlbC52YWx1ZW1heCAqIDEwMCArIDAuNVxuICAgICAgdGMuZGl2ICcucHJvZ3Jlc3MtYmFyLnByb2dyZXNzLWJhci1zdHJpcGVkJyxcbiAgICAgIHJvbGU6J3Byb2dyZXNzYmFyJyxcbiAgICAgIHN0eWxlOlwid2lkdGg6ICN7d2lkdGh9JVwiLCAtPlxuICAgICAgICB0Yy5zcGFuIHN0eWxlOlwiY29sb3I6YmxhY2s7XCIsXG4gICAgICAgIFwiI3ttb2RlbC52YWx1ZW5vd30gb2YgI3ttb2RlbC52YWx1ZW1heH0uXCJcbiAgbW9kZWxFdmVudHM6XG4gICAgJ2NoYW5nZSc6ICdyZW5kZXInXG4gICAgXG4gICAgXG5leHBvcnQge1xuICBQcm9ncmVzc01vZGVsXG4gIFByb2dyZXNzVmlld1xuICB9XG4iXX0=
