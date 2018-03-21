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

export default ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBCQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxlQUFQLE1BQUE7O0FBRUEsc0JBQUEsR0FBeUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0VBQ3JDLEVBQUUsQ0FBQyxDQUFILENBQUssS0FBSyxDQUFDLElBQVg7RUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLEdBQVI7U0FDQSxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxLQUFkO0FBSHFDLENBQWQ7O0FBS25CO0VBQU4sTUFBQSxpQkFBQSxRQUErQixVQUFVLENBQUMsS0FBMUMsQ0FBQTs7NkJBQ0UsT0FBQSxHQUFTOzs2QkFDVCxVQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVM7RUFBVDs7NkJBQ0YsUUFBQSxHQUlFLENBQUE7Ozs7SUFBQSxLQUFBLEVBQU87RUFBUDs7NkJBQ0YsV0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRO0VBQVI7Ozs7OztBQUVFO0VBQU4sTUFBQSwyQkFBQSxRQUF5QyxVQUFVLENBQUMsZUFBcEQ7SUFFRSxnQkFBa0IsQ0FBQSxDQUFBO2FBQ2hCO1FBQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxPQUFPLENBQUM7TUFBbkI7SUFEZ0I7O0lBR2xCLHdCQUEwQixDQUFDLEtBQUQsQ0FBQTthQUN4QixJQUFDLENBQUEsT0FBRCxDQUFTLHVCQUFULEVBQWtDLEtBQWxDO0lBRHdCOztFQUw1Qjs7dUNBQ0UsU0FBQSxHQUFXOzt1Q0FHWCxTQUFBLEdBQVc7Ozs7OztBQUlQO0VBQU4sTUFBQSxZQUFBLFFBQTBCLFVBQVUsQ0FBQyxLQUFyQyxDQUFBOztJQU9FLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQSxhQUFBLEVBQUE7TUFBQSxhQUFBLEdBQWdCLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxJQUEwQjtNQUMxQyxJQUFBLEdBQU8sSUFBSSwwQkFBSixDQUNMO1FBQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO1FBQ0EsYUFBQSxFQUFlO01BRGYsQ0FESzthQUdQLElBQUMsQ0FBQSxhQUFELENBQWUsU0FBZixFQUEwQixJQUExQjtJQUxROztJQU1WLDhCQUFnQyxDQUFDLEtBQUQsQ0FBQTthQUM5QixlQUFBLENBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixLQUFoQixDQUFoQjtJQUQ4Qjs7RUFibEM7O3dCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVA7RUFEc0IsQ0FBZDs7d0JBRVYsT0FBQSxHQUNFO0lBQUEsT0FBQSxFQUNFO01BQUEsRUFBQSxFQUFJO0lBQUo7RUFERjs7Ozs7O0FBYUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBuYXZpZ2F0ZV90b191cmwgZnJvbSAnLi4vdXRpbC9uYXZpZ2F0ZS10by11cmwnXG5cbmRlZmF1bHRfZW50cnlfdGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuaSBtb2RlbC5pY29uXG4gIHRjLnRleHQgXCIgXCJcbiAgdGMudGV4dCBtb2RlbC5sYWJlbFxuICBcbmNsYXNzIFRvb2xiYXJFbnRyeVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGFnTmFtZTogJ2J1dHRvbidcbiAgYXR0cmlidXRlczpcbiAgICAnY2xhc3MnOiAnYnRuIGJ0bi1zZWNvbmRhcnknXG4gIHRyaWdnZXJzOlxuICAgICMgd2UgY2FwdHVyZSBldmVyeSBjbGljayB3aXRoaW4gdGhlIHZpZXdcbiAgICAjIHdlIGRvbid0IG5lZWQgdWkgaGFzaFxuICAgICMgaHR0cHM6Ly9naXR0ZXIuaW0vbWFyaW9uZXR0ZWpzL2JhY2tib25lLm1hcmlvbmV0dGU/YXQ9NTk1MTRkZDg3NmE3NTdmODA4YWE1MDRmICMgbm9xYVxuICAgIGNsaWNrOiAnYnV0dG9uOmNsaWNrZWQnXG4gIG1vZGVsRXZlbnRzOlxuICAgIGNoYW5nZTogJ3JlbmRlcidcbiAgICBcbmNsYXNzIFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IFRvb2xiYXJFbnRyeVZpZXdcbiAgY2hpbGRWaWV3T3B0aW9uczogLT5cbiAgICB0ZW1wbGF0ZTogQG9wdGlvbnMuZW50cnlUZW1wbGF0ZVxuICBjbGFzc05hbWU6ICdidG4tZ3JvdXAgYnRuLWdyb3VwLWp1c3RpZmllZCdcbiAgb25DaGlsZHZpZXdCdXR0b25DbGlja2VkOiAoY2hpbGQpIC0+XG4gICAgQHRyaWdnZXIgJ3Rvb2xiYXI6ZW50cnk6Y2xpY2tlZCcsIGNoaWxkXG4gICAgXG5jbGFzcyBUb29sYmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLnRvb2xiYXItZW50cmllcydcbiAgcmVnaW9uczpcbiAgICBlbnRyaWVzOlxuICAgICAgZWw6ICcudG9vbGJhci1lbnRyaWVzJ1xuICAgICAgI3JlcGxhY2VFbGVtZW50OiB0cnVlXG4gIG9uUmVuZGVyOiAtPlxuICAgIGVudHJ5VGVtcGxhdGUgPSBAb3B0aW9ucy5lbnRyeVRlbXBsYXRlIG9yIGRlZmF1bHRfZW50cnlfdGVtcGxhdGVcbiAgICB2aWV3ID0gbmV3IFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgICAgZW50cnlUZW1wbGF0ZTogZW50cnlUZW1wbGF0ZVxuICAgIEBzaG93Q2hpbGRWaWV3ICdlbnRyaWVzJywgdmlld1xuICBvbkNoaWxkdmlld1Rvb2xiYXJFbnRyeUNsaWNrZWQ6IChjaGlsZCkgLT5cbiAgICBuYXZpZ2F0ZV90b191cmwgY2hpbGQubW9kZWwuZ2V0ICd1cmwnXG4gICAgXG4gICAgXG5leHBvcnQgZGVmYXVsdCBUb29sYmFyVmlld1xuXG4iXX0=
