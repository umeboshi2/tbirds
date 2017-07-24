var Backbone, Marionette, MarkdownView, marked, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

marked = require('marked');

MarkdownView = (function(superClass) {
  extend(MarkdownView, superClass);

  function MarkdownView() {
    return MarkdownView.__super__.constructor.apply(this, arguments);
  }

  MarkdownView.prototype.template = tc.renderable(function(model) {
    return tc.article('.document-view.content.col-sm-8.col-sm-offset-2', function() {
      return tc.div('.body', function() {
        return tc.raw(marked(model.content));
      });
    });
  });

  return MarkdownView;

})(Marionette.View);

module.exports = MarkdownView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWR2aWV3LmpzIiwic291cmNlcyI6WyJ2aWV3cy9tZHZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsOENBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUNMLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7QUFFSDs7Ozs7Ozt5QkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7V0FDdEIsRUFBRSxDQUFDLE9BQUgsQ0FBVyxpREFBWCxFQUE4RCxTQUFBO2FBQzVELEVBQUUsQ0FBQyxHQUFILENBQU8sT0FBUCxFQUFnQixTQUFBO2VBQ2QsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFBLENBQU8sS0FBSyxDQUFDLE9BQWIsQ0FBUDtNQURjLENBQWhCO0lBRDRELENBQTlEO0VBRHNCLENBQWQ7Ozs7R0FEZSxVQUFVLENBQUM7O0FBTXRDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5tYXJrZWQgPSByZXF1aXJlICdtYXJrZWQnXG5cbmNsYXNzIE1hcmtkb3duVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuYXJ0aWNsZSAnLmRvY3VtZW50LXZpZXcuY29udGVudC5jb2wtc20tOC5jb2wtc20tb2Zmc2V0LTInLCAtPlxuICAgICAgdGMuZGl2ICcuYm9keScsIC0+XG4gICAgICAgIHRjLnJhdyBtYXJrZWQgbW9kZWwuY29udGVudFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtkb3duVmlld1xuIl19
