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

  ToolbarEntryView.prototype.buttonClicked = function(event) {};

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtIQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSOztBQUVsQixzQkFBQSxHQUF5QixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtFQUNyQyxFQUFFLENBQUMsQ0FBSCxDQUFLLEtBQUssQ0FBQyxJQUFYO0VBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFSO1NBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFLLENBQUMsS0FBZDtBQUhxQyxDQUFkOztBQUtuQjs7Ozs7Ozs2QkFDSixVQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVMsaUJBQVQ7Ozs2QkFDRixRQUFBLEdBSUU7SUFBQSxLQUFBLEVBQU8sZ0JBQVA7Ozs2QkFDRixhQUFBLEdBQWUsU0FBQyxLQUFELEdBQUE7Ozs7R0FSYyxVQUFVLENBQUM7O0FBVXBDOzs7Ozs7O3VDQUNKLFNBQUEsR0FBVzs7dUNBQ1gsZ0JBQUEsR0FBa0IsU0FBQTtXQUNoQjtNQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQW5COztFQURnQjs7dUNBRWxCLFNBQUEsR0FBVzs7dUNBQ1gsd0JBQUEsR0FBMEIsU0FBQyxLQUFEO1dBQ3hCLElBQUMsQ0FBQSxPQUFELENBQVMsdUJBQVQsRUFBa0MsS0FBbEM7RUFEd0I7Ozs7R0FMYSxVQUFVLENBQUM7O0FBUTlDOzs7Ozs7O3dCQUNKLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUDtFQURzQixDQUFkOzt3QkFFVixPQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQ0U7TUFBQSxFQUFBLEVBQUksa0JBQUo7S0FERjs7O3dCQUdGLFFBQUEsR0FBVSxTQUFBO0FBQ1IsUUFBQTtJQUFBLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFULElBQTBCO0lBQzFDLElBQUEsR0FBTyxJQUFJLDBCQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7TUFDQSxhQUFBLEVBQWUsYUFEZjtLQURLO1dBR1AsSUFBQyxDQUFBLGFBQUQsQ0FBZSxTQUFmLEVBQTBCLElBQTFCO0VBTFE7O3dCQU1WLDhCQUFBLEdBQWdDLFNBQUMsS0FBRDtXQUM5QixlQUFBLENBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixLQUFoQixDQUFoQjtFQUQ4Qjs7OztHQWJSLFVBQVUsQ0FBQzs7QUFpQnJDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxubmF2aWdhdGVfdG9fdXJsID0gcmVxdWlyZSAnLi4vdXRpbC9uYXZpZ2F0ZS10by11cmwnXG5cbmRlZmF1bHRfZW50cnlfdGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuaSBtb2RlbC5pY29uXG4gIHRjLnRleHQgXCIgXCJcbiAgdGMudGV4dCBtb2RlbC5sYWJlbFxuICBcbmNsYXNzIFRvb2xiYXJFbnRyeVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgYXR0cmlidXRlczpcbiAgICAnY2xhc3MnOiAnYnRuIGJ0bi1kZWZhdWx0J1xuICB0cmlnZ2VyczpcbiAgICAjIHdlIGNhcHR1cmUgZXZlcnkgY2xpY2sgd2l0aGluIHRoZSB2aWV3XG4gICAgIyB3ZSBkb24ndCBuZWVkIHVpIGhhc2hcbiAgICAjIGh0dHBzOi8vZ2l0dGVyLmltL21hcmlvbmV0dGVqcy9iYWNrYm9uZS5tYXJpb25ldHRlP2F0PTU5NTE0ZGQ4NzZhNzU3ZjgwOGFhNTA0ZiAjIG5vcWFcbiAgICBjbGljazogJ2J1dHRvbjpjbGlja2VkJ1xuICBidXR0b25DbGlja2VkOiAoZXZlbnQpIC0+XG5cbmNsYXNzIFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IFRvb2xiYXJFbnRyeVZpZXdcbiAgY2hpbGRWaWV3T3B0aW9uczogLT5cbiAgICB0ZW1wbGF0ZTogQG9wdGlvbnMuZW50cnlUZW1wbGF0ZVxuICBjbGFzc05hbWU6ICdidG4tZ3JvdXAgYnRuLWdyb3VwLWp1c3RpZmllZCdcbiAgb25DaGlsZHZpZXdCdXR0b25DbGlja2VkOiAoY2hpbGQpIC0+XG4gICAgQHRyaWdnZXIgJ3Rvb2xiYXI6ZW50cnk6Y2xpY2tlZCcsIGNoaWxkXG4gICAgXG5jbGFzcyBUb29sYmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLnRvb2xiYXItZW50cmllcydcbiAgcmVnaW9uczpcbiAgICBlbnRyaWVzOlxuICAgICAgZWw6ICcudG9vbGJhci1lbnRyaWVzJ1xuICAgICAgI3JlcGxhY2VFbGVtZW50OiB0cnVlXG4gIG9uUmVuZGVyOiAtPlxuICAgIGVudHJ5VGVtcGxhdGUgPSBAb3B0aW9ucy5lbnRyeVRlbXBsYXRlIG9yIGRlZmF1bHRfZW50cnlfdGVtcGxhdGVcbiAgICB2aWV3ID0gbmV3IFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgICAgZW50cnlUZW1wbGF0ZTogZW50cnlUZW1wbGF0ZVxuICAgIEBzaG93Q2hpbGRWaWV3ICdlbnRyaWVzJywgdmlld1xuICBvbkNoaWxkdmlld1Rvb2xiYXJFbnRyeUNsaWNrZWQ6IChjaGlsZCkgLT5cbiAgICBuYXZpZ2F0ZV90b191cmwgY2hpbGQubW9kZWwuZ2V0ICd1cmwnXG4gICAgXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2xiYXJWaWV3XG5cbiJdfQ==
