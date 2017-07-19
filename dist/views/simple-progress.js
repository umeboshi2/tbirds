var Backbone, Marionette, ProgressModel, ProgressView, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

ProgressModel = (function(superClass) {
  extend(ProgressModel, superClass);

  function ProgressModel() {
    return ProgressModel.__super__.constructor.apply(this, arguments);
  }

  ProgressModel.prototype.defaults = {
    valuemin: 0,
    valuemax: 100,
    valuenow: 0
  };

  return ProgressModel;

})(Backbone.Model);

ProgressView = (function(superClass) {
  extend(ProgressView, superClass);

  function ProgressView() {
    return ProgressView.__super__.constructor.apply(this, arguments);
  }

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
        style: "width: " + width + "%"
      }, function() {
        return tc.span({
          style: "color:black;"
        }, model.valuenow + " of " + model.valuemax + ".");
      });
    });
  });

  ProgressView.prototype.modelEvents = {
    'change': 'render'
  };

  return ProgressView;

})(Marionette.View);

module.exports = {
  ProgressModel: ProgressModel,
  ProgressView: ProgressView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyJ2aWV3cy9zaW1wbGUtcHJvZ3Jlc3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEscURBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVDOzs7Ozs7OzBCQUNKLFFBQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxDQUFWO0lBQ0EsUUFBQSxFQUFVLEdBRFY7SUFFQSxRQUFBLEVBQVUsQ0FGVjs7Ozs7R0FGd0IsUUFBUSxDQUFDOztBQU0vQjs7Ozs7Ozt5QkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQLEVBQW9CLFNBQUE7QUFDbEIsVUFBQTtNQUFBLElBQUEsR0FDRTtRQUFBLFFBQUEsRUFBVSxLQUFLLENBQUMsUUFBaEI7UUFDQSxRQUFBLEVBQVUsS0FBSyxDQUFDLFFBRGhCO1FBRUEsUUFBQSxFQUFVLEtBQUssQ0FBQyxRQUZoQjs7TUFHRixLQUFBLEdBQVEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsUUFBTixHQUFpQixLQUFLLENBQUMsUUFBdkIsR0FBa0MsR0FBbEMsR0FBd0MsR0FBbkQ7YUFDUixFQUFFLENBQUMsR0FBSCxDQUFPLG9DQUFQLEVBQ0E7UUFBQSxJQUFBLEVBQUssYUFBTDtRQUNBLEtBQUEsRUFBTSxTQUFBLEdBQVUsS0FBVixHQUFnQixHQUR0QjtPQURBLEVBRTBCLFNBQUE7ZUFDeEIsRUFBRSxDQUFDLElBQUgsQ0FBUTtVQUFBLEtBQUEsRUFBTSxjQUFOO1NBQVIsRUFDRyxLQUFLLENBQUMsUUFBUCxHQUFnQixNQUFoQixHQUFzQixLQUFLLENBQUMsUUFBNUIsR0FBcUMsR0FEdkM7TUFEd0IsQ0FGMUI7SUFOa0IsQ0FBcEI7RUFEc0IsQ0FBZDs7eUJBWVYsV0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLFFBQVY7Ozs7O0dBZHVCLFVBQVUsQ0FBQzs7QUFpQnRDLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxhQUFBLEVBQWUsYUFBZjtFQUNBLFlBQUEsRUFBYyxZQURkIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbmNsYXNzIFByb2dyZXNzTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICB2YWx1ZW1pbjogMFxuICAgIHZhbHVlbWF4OiAxMDBcbiAgICB2YWx1ZW5vdzogMFxuXG5jbGFzcyBQcm9ncmVzc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLnByb2dyZXNzJywgLT5cbiAgICAgIGFyaWEgPVxuICAgICAgICB2YWx1ZW1pbjogbW9kZWwudmFsdWVtaW5cbiAgICAgICAgdmFsdWVtYXg6IG1vZGVsLnZhbHVlbWF4XG4gICAgICAgIHZhbHVlbm93OiBtb2RlbC52YWx1ZW5vd1xuICAgICAgd2lkdGggPSBNYXRoLmZsb29yIG1vZGVsLnZhbHVlbm93IC8gbW9kZWwudmFsdWVtYXggKiAxMDAgKyAwLjVcbiAgICAgIHRjLmRpdiAnLnByb2dyZXNzLWJhci5wcm9ncmVzcy1iYXItc3RyaXBlZCcsXG4gICAgICByb2xlOidwcm9ncmVzc2JhcicsXG4gICAgICBzdHlsZTpcIndpZHRoOiAje3dpZHRofSVcIiwgLT5cbiAgICAgICAgdGMuc3BhbiBzdHlsZTpcImNvbG9yOmJsYWNrO1wiLFxuICAgICAgICBcIiN7bW9kZWwudmFsdWVub3d9IG9mICN7bW9kZWwudmFsdWVtYXh9LlwiXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2UnOiAncmVuZGVyJ1xuICAgIFxuICAgIFxubW9kdWxlLmV4cG9ydHMgPVxuICBQcm9ncmVzc01vZGVsOiBQcm9ncmVzc01vZGVsXG4gIFByb2dyZXNzVmlldzogUHJvZ3Jlc3NWaWV3XG4gIFxuXG5cbiJdfQ==
