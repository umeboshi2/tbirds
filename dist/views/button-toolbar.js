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

  ToolbarEntryView.prototype.triggers = {
    click: 'button:clicked'
  };

  ToolbarEntryView.prototype.buttonClicked = function(event) {};

  return ToolbarEntryView;

})(Marionette.View);

ToolbarEntryCollectionView = (function(superClass) {
  extend(ToolbarEntryCollectionView, superClass);

  function ToolbarEntryCollectionView() {
    return ToolbarEntryCollectionView.__super__.constructor.apply(this, arguments);
  }

  ToolbarEntryCollectionView.prototype.childView = ToolbarEntryView;

  ToolbarEntryCollectionView.prototype.className = 'btn-group btn-group-justified';

  ToolbarEntryCollectionView.prototype.onChildviewButtonClicked = function(child) {
    return this.trigger('toolbar:entry:clicked', child);
  };

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

  ToolbarView.prototype.onChildviewToolbarEntryClicked = function(child) {
    return navigate_to_url(child.model.get('url'));
  };

  return ToolbarView;

})(Marionette.View);

module.exports = ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBGQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSOztBQUVaOzs7Ozs7OzZCQUNKLFVBQUEsR0FDRTtJQUFBLE9BQUEsRUFBUyxpQkFBVDs7OzZCQUNGLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtXQUN0QixFQUFFLENBQUMsQ0FBSCxDQUFLLEtBQUssQ0FBQyxJQUFYLEVBQWlCLEtBQUssQ0FBQyxLQUF2QjtFQURzQixDQUFkOzs2QkFFVixRQUFBLEdBSUU7SUFBQSxLQUFBLEVBQU8sZ0JBQVA7Ozs2QkFDRixhQUFBLEdBQWUsU0FBQyxLQUFELEdBQUE7Ozs7R0FWYyxVQUFVLENBQUM7O0FBWXBDOzs7Ozs7O3VDQUNKLFNBQUEsR0FBVzs7dUNBQ1gsU0FBQSxHQUFXOzt1Q0FDWCx3QkFBQSxHQUEwQixTQUFDLEtBQUQ7V0FDeEIsSUFBQyxDQUFBLE9BQUQsQ0FBUyx1QkFBVCxFQUFrQyxLQUFsQztFQUR3Qjs7OztHQUhhLFVBQVUsQ0FBQzs7QUFNOUM7Ozs7Ozs7d0JBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQO0VBRHNCLENBQWQ7O3dCQUVWLE9BQUEsR0FDRTtJQUFBLE9BQUEsRUFDRTtNQUFBLEVBQUEsRUFBSSxrQkFBSjtLQURGOzs7d0JBR0YsUUFBQSxHQUFVLFNBQUE7QUFDUixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUksMEJBQUosQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFBYjtLQURLO1dBRVAsSUFBQyxDQUFBLGFBQUQsQ0FBZSxTQUFmLEVBQTBCLElBQTFCO0VBSFE7O3dCQUlWLDhCQUFBLEdBQWdDLFNBQUMsS0FBRDtXQUM5QixlQUFBLENBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixLQUFoQixDQUFoQjtFQUQ4Qjs7OztHQVhSLFVBQVUsQ0FBQzs7QUFlckMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcblxuY2xhc3MgVG9vbGJhckVudHJ5VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICBhdHRyaWJ1dGVzOlxuICAgICdjbGFzcyc6ICdidG4gYnRuLWRlZmF1bHQnXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5pIG1vZGVsLmljb24sIG1vZGVsLmxhYmVsXG4gIHRyaWdnZXJzOlxuICAgICMgd2UgY2FwdHVyZSBldmVyeSBjbGljayB3aXRoaW4gdGhlIHZpZXdcbiAgICAjIHdlIGRvbid0IG5lZWQgdWkgaGFzaFxuICAgICMgaHR0cHM6Ly9naXR0ZXIuaW0vbWFyaW9uZXR0ZWpzL2JhY2tib25lLm1hcmlvbmV0dGU/YXQ9NTk1MTRkZDg3NmE3NTdmODA4YWE1MDRmICMgbm9xYVxuICAgIGNsaWNrOiAnYnV0dG9uOmNsaWNrZWQnXG4gIGJ1dHRvbkNsaWNrZWQ6IChldmVudCkgLT5cblxuY2xhc3MgVG9vbGJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogVG9vbGJhckVudHJ5Vmlld1xuICBjbGFzc05hbWU6ICdidG4tZ3JvdXAgYnRuLWdyb3VwLWp1c3RpZmllZCdcbiAgb25DaGlsZHZpZXdCdXR0b25DbGlja2VkOiAoY2hpbGQpIC0+XG4gICAgQHRyaWdnZXIgJ3Rvb2xiYXI6ZW50cnk6Y2xpY2tlZCcsIGNoaWxkXG4gICAgXG5jbGFzcyBUb29sYmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLnRvb2xiYXItZW50cmllcydcbiAgcmVnaW9uczpcbiAgICBlbnRyaWVzOlxuICAgICAgZWw6ICcudG9vbGJhci1lbnRyaWVzJ1xuICAgICAgI3JlcGxhY2VFbGVtZW50OiB0cnVlXG4gIG9uUmVuZGVyOiAtPlxuICAgIHZpZXcgPSBuZXcgVG9vbGJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ2VudHJpZXMnLCB2aWV3XG4gIG9uQ2hpbGR2aWV3VG9vbGJhckVudHJ5Q2xpY2tlZDogKGNoaWxkKSAtPlxuICAgIG5hdmlnYXRlX3RvX3VybCBjaGlsZC5tb2RlbC5nZXQgJ3VybCdcbiAgICBcbiAgICBcbm1vZHVsZS5leHBvcnRzID0gVG9vbGJhclZpZXdcblxuIl19
