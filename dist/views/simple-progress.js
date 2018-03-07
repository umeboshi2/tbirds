var Backbone, Marionette, ProgressModel, ProgressView, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

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

module.exports = {
  ProgressModel: ProgressModel,
  ProgressView: ProgressView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyJ2aWV3cy9zaW1wbGUtcHJvZ3Jlc3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxhQUFBLEVBQUEsWUFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFQztFQUFOLE1BQUEsY0FBQSxRQUE0QixRQUFRLENBQUMsTUFBckMsQ0FBQTs7MEJBQ0UsUUFBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLENBQVY7SUFDQSxRQUFBLEVBQVUsR0FEVjtJQUVBLFFBQUEsRUFBVTtFQUZWOzs7Ozs7QUFJRTtFQUFOLE1BQUEsYUFBQSxRQUEyQixVQUFVLENBQUMsS0FBdEMsQ0FBQTs7eUJBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLFdBQVAsRUFBb0IsUUFBQSxDQUFBLENBQUE7QUFDbEIsVUFBQSxJQUFBLEVBQUE7TUFBQSxJQUFBLEdBQ0U7UUFBQSxRQUFBLEVBQVUsS0FBSyxDQUFDLFFBQWhCO1FBQ0EsUUFBQSxFQUFVLEtBQUssQ0FBQyxRQURoQjtRQUVBLFFBQUEsRUFBVSxLQUFLLENBQUM7TUFGaEI7TUFHRixLQUFBLEdBQVEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsUUFBTixHQUFpQixLQUFLLENBQUMsUUFBdkIsR0FBa0MsR0FBbEMsR0FBd0MsR0FBbkQ7YUFDUixFQUFFLENBQUMsR0FBSCxDQUFPLG9DQUFQLEVBQ0E7UUFBQSxJQUFBLEVBQUssYUFBTDtRQUNBLEtBQUEsRUFBTSxDQUFBLE9BQUEsQ0FBQSxDQUFVLEtBQVYsQ0FBZ0IsQ0FBaEI7TUFETixDQURBLEVBRTBCLFFBQUEsQ0FBQSxDQUFBO2VBQ3hCLEVBQUUsQ0FBQyxJQUFILENBQVE7VUFBQSxLQUFBLEVBQU07UUFBTixDQUFSLEVBQ0EsQ0FBQSxDQUFBLENBQUcsS0FBSyxDQUFDLFFBQVQsQ0FBa0IsSUFBbEIsQ0FBQSxDQUF3QixLQUFLLENBQUMsUUFBOUIsQ0FBdUMsQ0FBdkMsQ0FEQTtNQUR3QixDQUYxQjtJQU5rQixDQUFwQjtFQURzQixDQUFkOzt5QkFZVixXQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVU7RUFBVjs7Ozs7O0FBR0osTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLGFBQUEsRUFBZSxhQUFmO0VBQ0EsWUFBQSxFQUFjO0FBRGQiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuY2xhc3MgUHJvZ3Jlc3NNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHZhbHVlbWluOiAwXG4gICAgdmFsdWVtYXg6IDEwMFxuICAgIHZhbHVlbm93OiAwXG5cbmNsYXNzIFByb2dyZXNzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcucHJvZ3Jlc3MnLCAtPlxuICAgICAgYXJpYSA9XG4gICAgICAgIHZhbHVlbWluOiBtb2RlbC52YWx1ZW1pblxuICAgICAgICB2YWx1ZW1heDogbW9kZWwudmFsdWVtYXhcbiAgICAgICAgdmFsdWVub3c6IG1vZGVsLnZhbHVlbm93XG4gICAgICB3aWR0aCA9IE1hdGguZmxvb3IgbW9kZWwudmFsdWVub3cgLyBtb2RlbC52YWx1ZW1heCAqIDEwMCArIDAuNVxuICAgICAgdGMuZGl2ICcucHJvZ3Jlc3MtYmFyLnByb2dyZXNzLWJhci1zdHJpcGVkJyxcbiAgICAgIHJvbGU6J3Byb2dyZXNzYmFyJyxcbiAgICAgIHN0eWxlOlwid2lkdGg6ICN7d2lkdGh9JVwiLCAtPlxuICAgICAgICB0Yy5zcGFuIHN0eWxlOlwiY29sb3I6YmxhY2s7XCIsXG4gICAgICAgIFwiI3ttb2RlbC52YWx1ZW5vd30gb2YgI3ttb2RlbC52YWx1ZW1heH0uXCJcbiAgbW9kZWxFdmVudHM6XG4gICAgJ2NoYW5nZSc6ICdyZW5kZXInXG4gICAgXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIFByb2dyZXNzTW9kZWw6IFByb2dyZXNzTW9kZWxcbiAgUHJvZ3Jlc3NWaWV3OiBQcm9ncmVzc1ZpZXdcbiAgXG5cblxuIl19
