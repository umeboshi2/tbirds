var ProgressModel, ProgressView;

import {
  Model
} from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

console.warn("Deprecated: try using tbirds/views/progress instead.");

ProgressModel = (function() {
  class ProgressModel extends Model {};

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
      var width;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyJ2aWV3cy9zaW1wbGUtcHJvZ3Jlc3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsYUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxzREFBYjs7QUFHTTtFQUFOLE1BQUEsY0FBQSxRQUE0QixNQUE1QixDQUFBOzswQkFDRSxRQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVUsQ0FBVjtJQUNBLFFBQUEsRUFBVSxHQURWO0lBRUEsUUFBQSxFQUFVO0VBRlY7Ozs7OztBQUlFO0VBQU4sTUFBQSxhQUFBLFFBQTJCLEtBQTNCLENBQUE7O3lCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO0FBQ3hCLFVBQUE7TUFBTSxLQUFBLEdBQVEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsUUFBTixHQUFpQixLQUFLLENBQUMsUUFBdkIsR0FBa0MsR0FBbEMsR0FBd0MsR0FBbkQ7YUFDUixFQUFFLENBQUMsR0FBSCxDQUFPLG9DQUFQLEVBQ0E7UUFBQSxJQUFBLEVBQUssYUFBTDtRQUNBLEtBQUEsRUFBTSxDQUFBLE9BQUEsQ0FBQSxDQUFVLEtBQVYsQ0FBQSxDQUFBO01BRE4sQ0FEQSxFQUUwQixRQUFBLENBQUEsQ0FBQTtlQUN4QixFQUFFLENBQUMsSUFBSCxDQUFRO1VBQUEsS0FBQSxFQUFNO1FBQU4sQ0FBUixFQUNBLENBQUEsQ0FBQSxDQUFHLEtBQUssQ0FBQyxRQUFULENBQUEsSUFBQSxDQUFBLENBQXdCLEtBQUssQ0FBQyxRQUE5QixDQUFBLENBQUEsQ0FEQTtNQUR3QixDQUYxQjtJQUZrQixDQUFwQjtFQURzQixDQUFkOzt5QkFRVixXQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVU7RUFBVjs7Ozs7O0FBRUosT0FBQTtFQUNFLGFBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuY29uc29sZS53YXJuIFwiRGVwcmVjYXRlZDogdHJ5IHVzaW5nIHRiaXJkcy92aWV3cy9wcm9ncmVzcyBpbnN0ZWFkLlwiXG5cblxuY2xhc3MgUHJvZ3Jlc3NNb2RlbCBleHRlbmRzIE1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHZhbHVlbWluOiAwXG4gICAgdmFsdWVtYXg6IDEwMFxuICAgIHZhbHVlbm93OiAwXG5cbmNsYXNzIFByb2dyZXNzVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLnByb2dyZXNzJywgLT5cbiAgICAgIHdpZHRoID0gTWF0aC5mbG9vciBtb2RlbC52YWx1ZW5vdyAvIG1vZGVsLnZhbHVlbWF4ICogMTAwICsgMC41XG4gICAgICB0Yy5kaXYgJy5wcm9ncmVzcy1iYXIucHJvZ3Jlc3MtYmFyLXN0cmlwZWQnLFxuICAgICAgcm9sZToncHJvZ3Jlc3NiYXInLFxuICAgICAgc3R5bGU6XCJ3aWR0aDogI3t3aWR0aH0lXCIsIC0+XG4gICAgICAgIHRjLnNwYW4gc3R5bGU6XCJjb2xvcjpibGFjaztcIixcbiAgICAgICAgXCIje21vZGVsLnZhbHVlbm93fSBvZiAje21vZGVsLnZhbHVlbWF4fS5cIlxuICBtb2RlbEV2ZW50czpcbiAgICAnY2hhbmdlJzogJ3JlbmRlcidcblxuZXhwb3J0IHtcbiAgUHJvZ3Jlc3NNb2RlbFxuICBQcm9ncmVzc1ZpZXdcbiAgfVxuIl19
