var Marionette, ToolbarEntryCollectionView, ToolbarEntryView, ToolbarView, default_entry_template, navigate_to_url, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('../util/navigate-to-url');

default_entry_template = tc.renderable(function(model) {
  tc.i(model.icon);
  tc.text(" ");
  return tc.text(model.label);
});

ToolbarEntryView = (function(superClass) {
  extend(ToolbarEntryView, superClass);

  function ToolbarEntryView() {
    return ToolbarEntryView.__super__.constructor.apply(this, arguments);
  }

  ToolbarEntryView.prototype.attributes = {
    'class': 'btn btn-default'
  };

  ToolbarEntryView.prototype.triggers = {
    click: 'button:clicked'
  };

  ToolbarEntryView.prototype.modelEvents = {
    change: 'render'
  };

  return ToolbarEntryView;

})(Marionette.View);

ToolbarEntryCollectionView = (function(superClass) {
  extend(ToolbarEntryCollectionView, superClass);

  function ToolbarEntryCollectionView() {
    return ToolbarEntryCollectionView.__super__.constructor.apply(this, arguments);
  }

  ToolbarEntryCollectionView.prototype.childView = ToolbarEntryView;

  ToolbarEntryCollectionView.prototype.childViewOptions = function() {
    return {
      template: this.options.entryTemplate
    };
  };

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
    var entryTemplate, view;
    entryTemplate = this.options.entryTemplate || default_entry_template;
    view = new ToolbarEntryCollectionView({
      collection: this.collection,
      entryTemplate: entryTemplate
    });
    return this.showChildView('entries', view);
  };

  ToolbarView.prototype.onChildviewToolbarEntryClicked = function(child) {
    return navigate_to_url(child.model.get('url'));
  };

  return ToolbarView;

})(Marionette.View);

module.exports = ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtIQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSOztBQUVsQixzQkFBQSxHQUF5QixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtFQUNyQyxFQUFFLENBQUMsQ0FBSCxDQUFLLEtBQUssQ0FBQyxJQUFYO0VBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFSO1NBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFLLENBQUMsS0FBZDtBQUhxQyxDQUFkOztBQUtuQjs7Ozs7Ozs2QkFDSixVQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVMsaUJBQVQ7Ozs2QkFDRixRQUFBLEdBSUU7SUFBQSxLQUFBLEVBQU8sZ0JBQVA7Ozs2QkFDRixXQUFBLEdBQ0U7SUFBQSxNQUFBLEVBQVEsUUFBUjs7Ozs7R0FUMkIsVUFBVSxDQUFDOztBQVdwQzs7Ozs7Ozt1Q0FDSixTQUFBLEdBQVc7O3VDQUNYLGdCQUFBLEdBQWtCLFNBQUE7V0FDaEI7TUFBQSxRQUFBLEVBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFuQjs7RUFEZ0I7O3VDQUVsQixTQUFBLEdBQVc7O3VDQUNYLHdCQUFBLEdBQTBCLFNBQUMsS0FBRDtXQUN4QixJQUFDLENBQUEsT0FBRCxDQUFTLHVCQUFULEVBQWtDLEtBQWxDO0VBRHdCOzs7O0dBTGEsVUFBVSxDQUFDOztBQVE5Qzs7Ozs7Ozt3QkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVA7RUFEc0IsQ0FBZDs7d0JBRVYsT0FBQSxHQUNFO0lBQUEsT0FBQSxFQUNFO01BQUEsRUFBQSxFQUFJLGtCQUFKO0tBREY7Ozt3QkFHRixRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxhQUFBLEdBQWdCLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxJQUEwQjtJQUMxQyxJQUFBLEdBQU8sSUFBSSwwQkFBSixDQUNMO01BQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO01BQ0EsYUFBQSxFQUFlLGFBRGY7S0FESztXQUdQLElBQUMsQ0FBQSxhQUFELENBQWUsU0FBZixFQUEwQixJQUExQjtFQUxROzt3QkFNViw4QkFBQSxHQUFnQyxTQUFDLEtBQUQ7V0FDOUIsZUFBQSxDQUFnQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsS0FBaEIsQ0FBaEI7RUFEOEI7Ozs7R0FiUixVQUFVLENBQUM7O0FBaUJyQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbm5hdmlnYXRlX3RvX3VybCA9IHJlcXVpcmUgJy4uL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuXG5kZWZhdWx0X2VudHJ5X3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmkgbW9kZWwuaWNvblxuICB0Yy50ZXh0IFwiIFwiXG4gIHRjLnRleHQgbW9kZWwubGFiZWxcbiAgXG5jbGFzcyBUb29sYmFyRW50cnlWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIGF0dHJpYnV0ZXM6XG4gICAgJ2NsYXNzJzogJ2J0biBidG4tZGVmYXVsdCdcbiAgdHJpZ2dlcnM6XG4gICAgIyB3ZSBjYXB0dXJlIGV2ZXJ5IGNsaWNrIHdpdGhpbiB0aGUgdmlld1xuICAgICMgd2UgZG9uJ3QgbmVlZCB1aSBoYXNoXG4gICAgIyBodHRwczovL2dpdHRlci5pbS9tYXJpb25ldHRlanMvYmFja2JvbmUubWFyaW9uZXR0ZT9hdD01OTUxNGRkODc2YTc1N2Y4MDhhYTUwNGYgIyBub3FhXG4gICAgY2xpY2s6ICdidXR0b246Y2xpY2tlZCdcbiAgbW9kZWxFdmVudHM6XG4gICAgY2hhbmdlOiAncmVuZGVyJ1xuICAgIFxuY2xhc3MgVG9vbGJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogVG9vbGJhckVudHJ5Vmlld1xuICBjaGlsZFZpZXdPcHRpb25zOiAtPlxuICAgIHRlbXBsYXRlOiBAb3B0aW9ucy5lbnRyeVRlbXBsYXRlXG4gIGNsYXNzTmFtZTogJ2J0bi1ncm91cCBidG4tZ3JvdXAtanVzdGlmaWVkJ1xuICBvbkNoaWxkdmlld0J1dHRvbkNsaWNrZWQ6IChjaGlsZCkgLT5cbiAgICBAdHJpZ2dlciAndG9vbGJhcjplbnRyeTpjbGlja2VkJywgY2hpbGRcbiAgICBcbmNsYXNzIFRvb2xiYXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgdGMuZGl2ICcudG9vbGJhci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGVudHJpZXM6XG4gICAgICBlbDogJy50b29sYmFyLWVudHJpZXMnXG4gICAgICAjcmVwbGFjZUVsZW1lbnQ6IHRydWVcbiAgb25SZW5kZXI6IC0+XG4gICAgZW50cnlUZW1wbGF0ZSA9IEBvcHRpb25zLmVudHJ5VGVtcGxhdGUgb3IgZGVmYXVsdF9lbnRyeV90ZW1wbGF0ZVxuICAgIHZpZXcgPSBuZXcgVG9vbGJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgICBlbnRyeVRlbXBsYXRlOiBlbnRyeVRlbXBsYXRlXG4gICAgQHNob3dDaGlsZFZpZXcgJ2VudHJpZXMnLCB2aWV3XG4gIG9uQ2hpbGR2aWV3VG9vbGJhckVudHJ5Q2xpY2tlZDogKGNoaWxkKSAtPlxuICAgIG5hdmlnYXRlX3RvX3VybCBjaGlsZC5tb2RlbC5nZXQgJ3VybCdcbiAgICBcbiAgICBcbm1vZHVsZS5leHBvcnRzID0gVG9vbGJhclZpZXdcblxuIl19
