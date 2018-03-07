var Marionette, ToolbarEntryCollectionView, ToolbarEntryView, ToolbarView, default_entry_template, navigate_to_url, tc;

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('../util/navigate-to-url');

default_entry_template = tc.renderable(function(model) {
  tc.i(model.icon);
  tc.text(" ");
  return tc.text(model.label);
});

ToolbarEntryView = (function() {
  class ToolbarEntryView extends Marionette.View {};

  ToolbarEntryView.prototype.tagName = 'button';

  ToolbarEntryView.prototype.attributes = {
    'class': 'btn btn-secondary'
  };

  ToolbarEntryView.prototype.triggers = {
    // we capture every click within the view
    // we don't need ui hash
    // https://gitter.im/marionettejs/backbone.marionette?at=59514dd876a757f808aa504f # noqa
    click: 'button:clicked'
  };

  ToolbarEntryView.prototype.modelEvents = {
    change: 'render'
  };

  return ToolbarEntryView;

}).call(this);

ToolbarEntryCollectionView = (function() {
  class ToolbarEntryCollectionView extends Marionette.CollectionView {
    childViewOptions() {
      return {
        template: this.options.entryTemplate
      };
    }

    onChildviewButtonClicked(child) {
      return this.trigger('toolbar:entry:clicked', child);
    }

  };

  ToolbarEntryCollectionView.prototype.childView = ToolbarEntryView;

  ToolbarEntryCollectionView.prototype.className = 'btn-group btn-group-justified';

  return ToolbarEntryCollectionView;

}).call(this);

ToolbarView = (function() {
  class ToolbarView extends Marionette.View {
    //replaceElement: true
    onRender() {
      var entryTemplate, view;
      entryTemplate = this.options.entryTemplate || default_entry_template;
      view = new ToolbarEntryCollectionView({
        collection: this.collection,
        entryTemplate: entryTemplate
      });
      return this.showChildView('entries', view);
    }

    onChildviewToolbarEntryClicked(child) {
      return navigate_to_url(child.model.get('url'));
    }

  };

  ToolbarView.prototype.template = tc.renderable(function() {
    return tc.div('.toolbar-entries');
  });

  ToolbarView.prototype.regions = {
    entries: {
      el: '.toolbar-entries'
    }
  };

  return ToolbarView;

}).call(this);

module.exports = ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFVBQUEsRUFBQSwwQkFBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLHNCQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSOztBQUVsQixzQkFBQSxHQUF5QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7RUFDckMsRUFBRSxDQUFDLENBQUgsQ0FBSyxLQUFLLENBQUMsSUFBWDtFQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsR0FBUjtTQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLEtBQWQ7QUFIcUMsQ0FBZDs7QUFLbkI7RUFBTixNQUFBLGlCQUFBLFFBQStCLFVBQVUsQ0FBQyxLQUExQyxDQUFBOzs2QkFDRSxPQUFBLEdBQVM7OzZCQUNULFVBQUEsR0FDRTtJQUFBLE9BQUEsRUFBUztFQUFUOzs2QkFDRixRQUFBLEdBSUUsQ0FBQTs7OztJQUFBLEtBQUEsRUFBTztFQUFQOzs2QkFDRixXQUFBLEdBQ0U7SUFBQSxNQUFBLEVBQVE7RUFBUjs7Ozs7O0FBRUU7RUFBTixNQUFBLDJCQUFBLFFBQXlDLFVBQVUsQ0FBQyxlQUFwRDtJQUVFLGdCQUFrQixDQUFBLENBQUE7YUFDaEI7UUFBQSxRQUFBLEVBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQztNQUFuQjtJQURnQjs7SUFHbEIsd0JBQTBCLENBQUMsS0FBRCxDQUFBO2FBQ3hCLElBQUMsQ0FBQSxPQUFELENBQVMsdUJBQVQsRUFBa0MsS0FBbEM7SUFEd0I7O0VBTDVCOzt1Q0FDRSxTQUFBLEdBQVc7O3VDQUdYLFNBQUEsR0FBVzs7Ozs7O0FBSVA7RUFBTixNQUFBLFlBQUEsUUFBMEIsVUFBVSxDQUFDLEtBQXJDLENBQUE7O0lBT0UsUUFBVSxDQUFBLENBQUE7QUFDUixVQUFBLGFBQUEsRUFBQTtNQUFBLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFULElBQTBCO01BQzFDLElBQUEsR0FBTyxJQUFJLDBCQUFKLENBQ0w7UUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7UUFDQSxhQUFBLEVBQWU7TUFEZixDQURLO2FBR1AsSUFBQyxDQUFBLGFBQUQsQ0FBZSxTQUFmLEVBQTBCLElBQTFCO0lBTFE7O0lBTVYsOEJBQWdDLENBQUMsS0FBRCxDQUFBO2FBQzlCLGVBQUEsQ0FBZ0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFaLENBQWdCLEtBQWhCLENBQWhCO0lBRDhCOztFQWJsQzs7d0JBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUDtFQURzQixDQUFkOzt3QkFFVixPQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQ0U7TUFBQSxFQUFBLEVBQUk7SUFBSjtFQURGOzs7Ozs7QUFhSixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbm5hdmlnYXRlX3RvX3VybCA9IHJlcXVpcmUgJy4uL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuXG5kZWZhdWx0X2VudHJ5X3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmkgbW9kZWwuaWNvblxuICB0Yy50ZXh0IFwiIFwiXG4gIHRjLnRleHQgbW9kZWwubGFiZWxcbiAgXG5jbGFzcyBUb29sYmFyRW50cnlWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRhZ05hbWU6ICdidXR0b24nXG4gIGF0dHJpYnV0ZXM6XG4gICAgJ2NsYXNzJzogJ2J0biBidG4tc2Vjb25kYXJ5J1xuICB0cmlnZ2VyczpcbiAgICAjIHdlIGNhcHR1cmUgZXZlcnkgY2xpY2sgd2l0aGluIHRoZSB2aWV3XG4gICAgIyB3ZSBkb24ndCBuZWVkIHVpIGhhc2hcbiAgICAjIGh0dHBzOi8vZ2l0dGVyLmltL21hcmlvbmV0dGVqcy9iYWNrYm9uZS5tYXJpb25ldHRlP2F0PTU5NTE0ZGQ4NzZhNzU3ZjgwOGFhNTA0ZiAjIG5vcWFcbiAgICBjbGljazogJ2J1dHRvbjpjbGlja2VkJ1xuICBtb2RlbEV2ZW50czpcbiAgICBjaGFuZ2U6ICdyZW5kZXInXG4gICAgXG5jbGFzcyBUb29sYmFyRW50cnlDb2xsZWN0aW9uVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2hpbGRWaWV3OiBUb29sYmFyRW50cnlWaWV3XG4gIGNoaWxkVmlld09wdGlvbnM6IC0+XG4gICAgdGVtcGxhdGU6IEBvcHRpb25zLmVudHJ5VGVtcGxhdGVcbiAgY2xhc3NOYW1lOiAnYnRuLWdyb3VwIGJ0bi1ncm91cC1qdXN0aWZpZWQnXG4gIG9uQ2hpbGR2aWV3QnV0dG9uQ2xpY2tlZDogKGNoaWxkKSAtPlxuICAgIEB0cmlnZ2VyICd0b29sYmFyOmVudHJ5OmNsaWNrZWQnLCBjaGlsZFxuICAgIFxuY2xhc3MgVG9vbGJhclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICB0Yy5kaXYgJy50b29sYmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgZW50cmllczpcbiAgICAgIGVsOiAnLnRvb2xiYXItZW50cmllcydcbiAgICAgICNyZXBsYWNlRWxlbWVudDogdHJ1ZVxuICBvblJlbmRlcjogLT5cbiAgICBlbnRyeVRlbXBsYXRlID0gQG9wdGlvbnMuZW50cnlUZW1wbGF0ZSBvciBkZWZhdWx0X2VudHJ5X3RlbXBsYXRlXG4gICAgdmlldyA9IG5ldyBUb29sYmFyRW50cnlDb2xsZWN0aW9uVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICAgIGVudHJ5VGVtcGxhdGU6IGVudHJ5VGVtcGxhdGVcbiAgICBAc2hvd0NoaWxkVmlldyAnZW50cmllcycsIHZpZXdcbiAgb25DaGlsZHZpZXdUb29sYmFyRW50cnlDbGlja2VkOiAoY2hpbGQpIC0+XG4gICAgbmF2aWdhdGVfdG9fdXJsIGNoaWxkLm1vZGVsLmdldCAndXJsJ1xuICAgIFxuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBUb29sYmFyVmlld1xuXG4iXX0=
