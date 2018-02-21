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

  ToolbarEntryView.prototype.attributes = {
    'class': 'btn btn-default'
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFVBQUEsRUFBQSwwQkFBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLHNCQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSOztBQUVsQixzQkFBQSxHQUF5QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7RUFDckMsRUFBRSxDQUFDLENBQUgsQ0FBSyxLQUFLLENBQUMsSUFBWDtFQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsR0FBUjtTQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLEtBQWQ7QUFIcUMsQ0FBZDs7QUFLbkI7RUFBTixNQUFBLGlCQUFBLFFBQStCLFVBQVUsQ0FBQyxLQUExQyxDQUFBOzs2QkFDRSxVQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVM7RUFBVDs7NkJBQ0YsUUFBQSxHQUlFLENBQUE7Ozs7SUFBQSxLQUFBLEVBQU87RUFBUDs7NkJBQ0YsV0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRO0VBQVI7Ozs7OztBQUVFO0VBQU4sTUFBQSwyQkFBQSxRQUF5QyxVQUFVLENBQUMsZUFBcEQ7SUFFRSxnQkFBa0IsQ0FBQSxDQUFBO2FBQ2hCO1FBQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxPQUFPLENBQUM7TUFBbkI7SUFEZ0I7O0lBR2xCLHdCQUEwQixDQUFDLEtBQUQsQ0FBQTthQUN4QixJQUFDLENBQUEsT0FBRCxDQUFTLHVCQUFULEVBQWtDLEtBQWxDO0lBRHdCOztFQUw1Qjs7dUNBQ0UsU0FBQSxHQUFXOzt1Q0FHWCxTQUFBLEdBQVc7Ozs7OztBQUlQO0VBQU4sTUFBQSxZQUFBLFFBQTBCLFVBQVUsQ0FBQyxLQUFyQyxDQUFBOztJQU9FLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQSxhQUFBLEVBQUE7TUFBQSxhQUFBLEdBQWdCLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxJQUEwQjtNQUMxQyxJQUFBLEdBQU8sSUFBSSwwQkFBSixDQUNMO1FBQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO1FBQ0EsYUFBQSxFQUFlO01BRGYsQ0FESzthQUdQLElBQUMsQ0FBQSxhQUFELENBQWUsU0FBZixFQUEwQixJQUExQjtJQUxROztJQU1WLDhCQUFnQyxDQUFDLEtBQUQsQ0FBQTthQUM5QixlQUFBLENBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixLQUFoQixDQUFoQjtJQUQ4Qjs7RUFibEM7O3dCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVA7RUFEc0IsQ0FBZDs7d0JBRVYsT0FBQSxHQUNFO0lBQUEsT0FBQSxFQUNFO01BQUEsRUFBQSxFQUFJO0lBQUo7RUFERjs7Ozs7O0FBYUosTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcblxuZGVmYXVsdF9lbnRyeV90ZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5pIG1vZGVsLmljb25cbiAgdGMudGV4dCBcIiBcIlxuICB0Yy50ZXh0IG1vZGVsLmxhYmVsXG4gIFxuY2xhc3MgVG9vbGJhckVudHJ5VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICBhdHRyaWJ1dGVzOlxuICAgICdjbGFzcyc6ICdidG4gYnRuLWRlZmF1bHQnXG4gIHRyaWdnZXJzOlxuICAgICMgd2UgY2FwdHVyZSBldmVyeSBjbGljayB3aXRoaW4gdGhlIHZpZXdcbiAgICAjIHdlIGRvbid0IG5lZWQgdWkgaGFzaFxuICAgICMgaHR0cHM6Ly9naXR0ZXIuaW0vbWFyaW9uZXR0ZWpzL2JhY2tib25lLm1hcmlvbmV0dGU/YXQ9NTk1MTRkZDg3NmE3NTdmODA4YWE1MDRmICMgbm9xYVxuICAgIGNsaWNrOiAnYnV0dG9uOmNsaWNrZWQnXG4gIG1vZGVsRXZlbnRzOlxuICAgIGNoYW5nZTogJ3JlbmRlcidcbiAgICBcbmNsYXNzIFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IFRvb2xiYXJFbnRyeVZpZXdcbiAgY2hpbGRWaWV3T3B0aW9uczogLT5cbiAgICB0ZW1wbGF0ZTogQG9wdGlvbnMuZW50cnlUZW1wbGF0ZVxuICBjbGFzc05hbWU6ICdidG4tZ3JvdXAgYnRuLWdyb3VwLWp1c3RpZmllZCdcbiAgb25DaGlsZHZpZXdCdXR0b25DbGlja2VkOiAoY2hpbGQpIC0+XG4gICAgQHRyaWdnZXIgJ3Rvb2xiYXI6ZW50cnk6Y2xpY2tlZCcsIGNoaWxkXG4gICAgXG5jbGFzcyBUb29sYmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLnRvb2xiYXItZW50cmllcydcbiAgcmVnaW9uczpcbiAgICBlbnRyaWVzOlxuICAgICAgZWw6ICcudG9vbGJhci1lbnRyaWVzJ1xuICAgICAgI3JlcGxhY2VFbGVtZW50OiB0cnVlXG4gIG9uUmVuZGVyOiAtPlxuICAgIGVudHJ5VGVtcGxhdGUgPSBAb3B0aW9ucy5lbnRyeVRlbXBsYXRlIG9yIGRlZmF1bHRfZW50cnlfdGVtcGxhdGVcbiAgICB2aWV3ID0gbmV3IFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgICAgZW50cnlUZW1wbGF0ZTogZW50cnlUZW1wbGF0ZVxuICAgIEBzaG93Q2hpbGRWaWV3ICdlbnRyaWVzJywgdmlld1xuICBvbkNoaWxkdmlld1Rvb2xiYXJFbnRyeUNsaWNrZWQ6IChjaGlsZCkgLT5cbiAgICBuYXZpZ2F0ZV90b191cmwgY2hpbGQubW9kZWwuZ2V0ICd1cmwnXG4gICAgXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2xiYXJWaWV3XG5cbiJdfQ==
