var ToolbarEntryCollectionView, ToolbarEntryView, ToolbarView, default_entry_template;

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import navigate_to_url from '../util/navigate-to-url';

default_entry_template = tc.renderable(function(model) {
  tc.i(model.icon);
  tc.text(" ");
  return tc.text(model.label);
});

ToolbarEntryView = (function() {
  class ToolbarEntryView extends Marionette.View {};

  ToolbarEntryView.prototype.tagName = 'button';

  ToolbarEntryView.prototype.attributes = {
    'class': 'btn btn-outline-primary'
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

  };

  ToolbarEntryCollectionView.prototype.childView = ToolbarEntryView;

  ToolbarEntryCollectionView.prototype.className = 'btn-group btn-group-justified';

  ToolbarEntryCollectionView.prototype.childViewTriggers = {
    'button:clicked': 'toolbar:entry:clicked'
  };

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

export default ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBCQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxlQUFQLE1BQUE7O0FBRUEsc0JBQUEsR0FBeUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0VBQ3JDLEVBQUUsQ0FBQyxDQUFILENBQUssS0FBSyxDQUFDLElBQVg7RUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLEdBQVI7U0FDQSxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxLQUFkO0FBSHFDLENBQWQ7O0FBS25CO0VBQU4sTUFBQSxpQkFBQSxRQUErQixVQUFVLENBQUMsS0FBMUMsQ0FBQTs7NkJBQ0UsT0FBQSxHQUFTOzs2QkFDVCxVQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVM7RUFBVDs7NkJBQ0YsUUFBQSxHQUlFLENBQUE7Ozs7SUFBQSxLQUFBLEVBQU87RUFBUDs7NkJBQ0YsV0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRO0VBQVI7Ozs7OztBQUVFO0VBQU4sTUFBQSwyQkFBQSxRQUF5QyxVQUFVLENBQUMsZUFBcEQ7SUFFRSxnQkFBa0IsQ0FBQSxDQUFBO2FBQ2hCO1FBQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxPQUFPLENBQUM7TUFBbkI7SUFEZ0I7O0VBRnBCOzt1Q0FDRSxTQUFBLEdBQVc7O3VDQUdYLFNBQUEsR0FBVzs7dUNBQ1gsaUJBQUEsR0FDRTtJQUFBLGdCQUFBLEVBQWtCO0VBQWxCOzs7Ozs7QUFFRTtFQUFOLE1BQUEsWUFBQSxRQUEwQixVQUFVLENBQUMsS0FBckMsQ0FBQTs7SUFPRSxRQUFVLENBQUEsQ0FBQTtBQUNSLFVBQUEsYUFBQSxFQUFBO01BQUEsYUFBQSxHQUFnQixJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVQsSUFBMEI7TUFDMUMsSUFBQSxHQUFPLElBQUksMEJBQUosQ0FDTDtRQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFBYjtRQUNBLGFBQUEsRUFBZTtNQURmLENBREs7YUFHUCxJQUFDLENBQUEsYUFBRCxDQUFlLFNBQWYsRUFBMEIsSUFBMUI7SUFMUTs7SUFNViw4QkFBZ0MsQ0FBQyxLQUFELENBQUE7YUFDOUIsZUFBQSxDQUFnQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsS0FBaEIsQ0FBaEI7SUFEOEI7O0VBYmxDOzt3QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQO0VBRHNCLENBQWQ7O3dCQUVWLE9BQUEsR0FDRTtJQUFBLE9BQUEsRUFDRTtNQUFBLEVBQUEsRUFBSTtJQUFKO0VBREY7Ozs7OztBQWFKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgbmF2aWdhdGVfdG9fdXJsIGZyb20gJy4uL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuXG5kZWZhdWx0X2VudHJ5X3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmkgbW9kZWwuaWNvblxuICB0Yy50ZXh0IFwiIFwiXG4gIHRjLnRleHQgbW9kZWwubGFiZWxcbiAgXG5jbGFzcyBUb29sYmFyRW50cnlWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRhZ05hbWU6ICdidXR0b24nXG4gIGF0dHJpYnV0ZXM6XG4gICAgJ2NsYXNzJzogJ2J0biBidG4tb3V0bGluZS1wcmltYXJ5J1xuICB0cmlnZ2VyczpcbiAgICAjIHdlIGNhcHR1cmUgZXZlcnkgY2xpY2sgd2l0aGluIHRoZSB2aWV3XG4gICAgIyB3ZSBkb24ndCBuZWVkIHVpIGhhc2hcbiAgICAjIGh0dHBzOi8vZ2l0dGVyLmltL21hcmlvbmV0dGVqcy9iYWNrYm9uZS5tYXJpb25ldHRlP2F0PTU5NTE0ZGQ4NzZhNzU3ZjgwOGFhNTA0ZiAjIG5vcWFcbiAgICBjbGljazogJ2J1dHRvbjpjbGlja2VkJ1xuICBtb2RlbEV2ZW50czpcbiAgICBjaGFuZ2U6ICdyZW5kZXInXG4gICAgXG5jbGFzcyBUb29sYmFyRW50cnlDb2xsZWN0aW9uVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2hpbGRWaWV3OiBUb29sYmFyRW50cnlWaWV3XG4gIGNoaWxkVmlld09wdGlvbnM6IC0+XG4gICAgdGVtcGxhdGU6IEBvcHRpb25zLmVudHJ5VGVtcGxhdGVcbiAgY2xhc3NOYW1lOiAnYnRuLWdyb3VwIGJ0bi1ncm91cC1qdXN0aWZpZWQnXG4gIGNoaWxkVmlld1RyaWdnZXJzOlxuICAgICdidXR0b246Y2xpY2tlZCc6ICd0b29sYmFyOmVudHJ5OmNsaWNrZWQnXG4gICAgIFxuY2xhc3MgVG9vbGJhclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICB0Yy5kaXYgJy50b29sYmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgZW50cmllczpcbiAgICAgIGVsOiAnLnRvb2xiYXItZW50cmllcydcbiAgICAgICNyZXBsYWNlRWxlbWVudDogdHJ1ZVxuICBvblJlbmRlcjogLT5cbiAgICBlbnRyeVRlbXBsYXRlID0gQG9wdGlvbnMuZW50cnlUZW1wbGF0ZSBvciBkZWZhdWx0X2VudHJ5X3RlbXBsYXRlXG4gICAgdmlldyA9IG5ldyBUb29sYmFyRW50cnlDb2xsZWN0aW9uVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICAgIGVudHJ5VGVtcGxhdGU6IGVudHJ5VGVtcGxhdGVcbiAgICBAc2hvd0NoaWxkVmlldyAnZW50cmllcycsIHZpZXdcbiAgb25DaGlsZHZpZXdUb29sYmFyRW50cnlDbGlja2VkOiAoY2hpbGQpIC0+XG4gICAgbmF2aWdhdGVfdG9fdXJsIGNoaWxkLm1vZGVsLmdldCAndXJsJ1xuICAgIFxuICAgIFxuZXhwb3J0IGRlZmF1bHQgVG9vbGJhclZpZXdcblxuIl19
