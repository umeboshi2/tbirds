var Marionette, ToolbarEntryCollectionView, ToolbarEntryView, ToolbarView, navigate_to_url, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('../util/navigate-to-url');

ToolbarEntryView = (function(superClass) {
  extend(ToolbarEntryView, superClass);

  function ToolbarEntryView() {
    return ToolbarEntryView.__super__.constructor.apply(this, arguments);
  }

  ToolbarEntryView.prototype.attributes = {
    'class': 'btn btn-default'
  };

  ToolbarEntryView.prototype.template = tc.renderable(function(model) {
    return tc.i(model.icon, model.label);
  });

  ToolbarEntryView.prototype.events = {
    'click': 'buttonClicked'
  };

  ToolbarEntryView.prototype.buttonClicked = function(event) {
    return navigate_to_url(this.model.get('url'));
  };

  return ToolbarEntryView;

})(Marionette.View);

ToolbarEntryCollectionView = (function(superClass) {
  extend(ToolbarEntryCollectionView, superClass);

  function ToolbarEntryCollectionView() {
    return ToolbarEntryCollectionView.__super__.constructor.apply(this, arguments);
  }

  ToolbarEntryCollectionView.prototype.childView = ToolbarEntryView;

  ToolbarEntryCollectionView.prototype.className = 'btn-group btn-group-justified';

  return ToolbarEntryCollectionView;

})(Marionette.CollectionView);

ToolbarView = (function(superClass) {
  extend(ToolbarView, superClass);

  function ToolbarView() {
    return ToolbarView.__super__.constructor.apply(this, arguments);
  }

  ToolbarView.prototype.template = tc.renderable(function() {
    return tc.div('.toolbar-entries');
  });

  ToolbarView.prototype.regions = {
    entries: {
      el: '.toolbar-entries'
    }
  };

  ToolbarView.prototype.onRender = function() {
    var view;
    view = new ToolbarEntryCollectionView({
      collection: this.collection
    });
    return this.showChildView('entries', view);
  };

  return ToolbarView;

})(Marionette.View);

module.exports = ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBGQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSOztBQUVaOzs7Ozs7OzZCQUNKLFVBQUEsR0FDRTtJQUFBLE9BQUEsRUFBUyxpQkFBVDs7OzZCQUNGLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtXQUN0QixFQUFFLENBQUMsQ0FBSCxDQUFLLEtBQUssQ0FBQyxJQUFYLEVBQWlCLEtBQUssQ0FBQyxLQUF2QjtFQURzQixDQUFkOzs2QkFFVixNQUFBLEdBSUU7SUFBQSxPQUFBLEVBQVMsZUFBVDs7OzZCQUNGLGFBQUEsR0FBZSxTQUFDLEtBQUQ7V0FDYixlQUFBLENBQWdCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLEtBQVgsQ0FBaEI7RUFEYTs7OztHQVZjLFVBQVUsQ0FBQzs7QUFhcEM7Ozs7Ozs7dUNBQ0osU0FBQSxHQUFXOzt1Q0FDWCxTQUFBLEdBQVc7Ozs7R0FGNEIsVUFBVSxDQUFDOztBQUk5Qzs7Ozs7Ozt3QkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVA7RUFEc0IsQ0FBZDs7d0JBRVYsT0FBQSxHQUNFO0lBQUEsT0FBQSxFQUNFO01BQUEsRUFBQSxFQUFJLGtCQUFKO0tBREY7Ozt3QkFHRixRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBSSwwQkFBSixDQUNMO01BQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO0tBREs7V0FFUCxJQUFDLENBQUEsYUFBRCxDQUFlLFNBQWYsRUFBMEIsSUFBMUI7RUFIUTs7OztHQVBjLFVBQVUsQ0FBQzs7QUFhckMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcblxuY2xhc3MgVG9vbGJhckVudHJ5VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICBhdHRyaWJ1dGVzOlxuICAgICdjbGFzcyc6ICdidG4gYnRuLWRlZmF1bHQnXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5pIG1vZGVsLmljb24sIG1vZGVsLmxhYmVsXG4gIGV2ZW50czpcbiAgICAjIHdlIGNhcHR1cmUgZXZlcnkgY2xpY2sgd2l0aGluIHRoZSB2aWV3XG4gICAgIyB3ZSBkb24ndCBuZWVkIHVpIGhhc2hcbiAgICAjIGh0dHBzOi8vZ2l0dGVyLmltL21hcmlvbmV0dGVqcy9iYWNrYm9uZS5tYXJpb25ldHRlP2F0PTU5NTE0ZGQ4NzZhNzU3ZjgwOGFhNTA0ZiAjIG5vcWFcbiAgICAnY2xpY2snOiAnYnV0dG9uQ2xpY2tlZCdcbiAgYnV0dG9uQ2xpY2tlZDogKGV2ZW50KSAtPlxuICAgIG5hdmlnYXRlX3RvX3VybCBAbW9kZWwuZ2V0ICd1cmwnXG5cbmNsYXNzIFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IFRvb2xiYXJFbnRyeVZpZXdcbiAgY2xhc3NOYW1lOiAnYnRuLWdyb3VwIGJ0bi1ncm91cC1qdXN0aWZpZWQnXG4gIFxuY2xhc3MgVG9vbGJhclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICB0Yy5kaXYgJy50b29sYmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgZW50cmllczpcbiAgICAgIGVsOiAnLnRvb2xiYXItZW50cmllcydcbiAgICAgICNyZXBsYWNlRWxlbWVudDogdHJ1ZVxuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93Q2hpbGRWaWV3ICdlbnRyaWVzJywgdmlld1xuXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2xiYXJWaWV3XG5cbiJdfQ==
