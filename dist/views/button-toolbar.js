var ToolbarEntryCollectionView, ToolbarEntryView, ToolbarView, defaultButtonClassName, defaultEntryTemplate;

import {
  View,
  CollectionView
} from 'backbone.marionette';

import tc from 'teacup';

import navigate_to_url from '../util/navigate-to-url';

defaultEntryTemplate = tc.renderable(function(model) {
  tc.i(model.icon);
  tc.text(" ");
  return tc.text(model.label);
});

defaultButtonClassName = "btn btn-outline-primary";

ToolbarEntryView = (function() {
  class ToolbarEntryView extends View {
    className() {
      var name;
      name = this.model.get('buttonClassName');
      if (!name) {
        name = this.getOption('buttonClassName') || defaultButtonClassName;
      }
      return name;
    }

  };

  ToolbarEntryView.prototype.tagName = 'button';

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
  class ToolbarEntryCollectionView extends CollectionView {
    childViewOptions() {
      return {
        template: this.getOption('entryTemplate'),
        buttonClassName: this.getOption('buttonClassName')
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
  class ToolbarView extends View {
    //replaceElement: true
    onRender() {
      var buttonClassName, entryTemplate, view;
      entryTemplate = this.getOption('entryTemplate') || defaultEntryTemplate;
      buttonClassName = this.getOption('buttonClassName') || defaultButtonClassName;
      view = new ToolbarEntryCollectionView({
        collection: this.collection,
        entryTemplate: entryTemplate,
        buttonClassName: buttonClassName
      });
      return this.showChildView('entries', view);
    }

    onChildviewToolbarEntryClicked(child) {
      var url;
      url = child.model.get('url');
      if (url) {
        return navigate_to_url(url);
      }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnV0dG9uLXRvb2xiYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL2J1dHRvbi10b29sYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBCQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsc0JBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBVDtFQUFlLGNBQWY7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sZUFBUCxNQUFBOztBQUVBLG9CQUFBLEdBQXVCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtFQUNuQyxFQUFFLENBQUMsQ0FBSCxDQUFLLEtBQUssQ0FBQyxJQUFYO0VBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFSO1NBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFLLENBQUMsS0FBZDtBQUhtQyxDQUFkOztBQUt2QixzQkFBQSxHQUF5Qjs7QUFFbkI7RUFBTixNQUFBLGlCQUFBLFFBQStCLEtBQS9CO0lBRUUsU0FBVyxDQUFBLENBQUE7QUFDYixVQUFBO01BQUksSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGlCQUFYO01BQ1AsSUFBRyxDQUFJLElBQVA7UUFDRSxJQUFBLEdBQU8sSUFBQyxDQUFBLFNBQUQsQ0FBVyxpQkFBWCxDQUFBLElBQWlDLHVCQUQxQzs7QUFFQSxhQUFPO0lBSkU7O0VBRmI7OzZCQUNFLE9BQUEsR0FBUzs7NkJBTVQsUUFBQSxHQUlFLENBQUE7Ozs7SUFBQSxLQUFBLEVBQU87RUFBUDs7NkJBQ0YsV0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRO0VBQVI7Ozs7OztBQUVFO0VBQU4sTUFBQSwyQkFBQSxRQUF5QyxlQUF6QztJQUVFLGdCQUFrQixDQUFBLENBQUE7YUFDaEI7UUFBQSxRQUFBLEVBQVUsSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYLENBQVY7UUFDQSxlQUFBLEVBQWlCLElBQUMsQ0FBQSxTQUFELENBQVcsaUJBQVg7TUFEakI7SUFEZ0I7O0VBRnBCOzt1Q0FDRSxTQUFBLEdBQVc7O3VDQUlYLFNBQUEsR0FBVzs7dUNBQ1gsaUJBQUEsR0FDRTtJQUFBLGdCQUFBLEVBQWtCO0VBQWxCOzs7Ozs7QUFFRTtFQUFOLE1BQUEsWUFBQSxRQUEwQixLQUExQixDQUFBOztJQU9FLFFBQVUsQ0FBQSxDQUFBO0FBQ1osVUFBQSxlQUFBLEVBQUEsYUFBQSxFQUFBO01BQUksYUFBQSxHQUFnQixJQUFDLENBQUEsU0FBRCxDQUFXLGVBQVgsQ0FBQSxJQUErQjtNQUMvQyxlQUFBLEdBQWtCLElBQUMsQ0FBQSxTQUFELENBQVcsaUJBQVgsQ0FBQSxJQUFpQztNQUNuRCxJQUFBLEdBQU8sSUFBSSwwQkFBSixDQUNMO1FBQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO1FBQ0EsYUFBQSxFQUFlLGFBRGY7UUFFQSxlQUFBLEVBQWlCO01BRmpCLENBREs7YUFJUCxJQUFDLENBQUEsYUFBRCxDQUFlLFNBQWYsRUFBMEIsSUFBMUI7SUFQUTs7SUFRViw4QkFBZ0MsQ0FBQyxLQUFELENBQUE7QUFDbEMsVUFBQTtNQUFJLEdBQUEsR0FBTSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsS0FBaEI7TUFDTixJQUFHLEdBQUg7ZUFDRSxlQUFBLENBQWdCLEdBQWhCLEVBREY7O0lBRjhCOztFQWZsQzs7d0JBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUDtFQURzQixDQUFkOzt3QkFFVixPQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQ0U7TUFBQSxFQUFBLEVBQUk7SUFBSjtFQURGOzs7Ozs7QUFpQkosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgQ29sbGVjdGlvblZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IG5hdmlnYXRlX3RvX3VybCBmcm9tICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcblxuZGVmYXVsdEVudHJ5VGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuaSBtb2RlbC5pY29uXG4gIHRjLnRleHQgXCIgXCJcbiAgdGMudGV4dCBtb2RlbC5sYWJlbFxuICBcbmRlZmF1bHRCdXR0b25DbGFzc05hbWUgPSBcImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XCJcblxuY2xhc3MgVG9vbGJhckVudHJ5VmlldyBleHRlbmRzIFZpZXdcbiAgdGFnTmFtZTogJ2J1dHRvbidcbiAgY2xhc3NOYW1lOiAtPlxuICAgIG5hbWUgPSBAbW9kZWwuZ2V0ICdidXR0b25DbGFzc05hbWUnXG4gICAgaWYgbm90IG5hbWVcbiAgICAgIG5hbWUgPSBAZ2V0T3B0aW9uKCdidXR0b25DbGFzc05hbWUnKSBvciBkZWZhdWx0QnV0dG9uQ2xhc3NOYW1lXG4gICAgcmV0dXJuIG5hbWVcbiAgdHJpZ2dlcnM6XG4gICAgIyB3ZSBjYXB0dXJlIGV2ZXJ5IGNsaWNrIHdpdGhpbiB0aGUgdmlld1xuICAgICMgd2UgZG9uJ3QgbmVlZCB1aSBoYXNoXG4gICAgIyBodHRwczovL2dpdHRlci5pbS9tYXJpb25ldHRlanMvYmFja2JvbmUubWFyaW9uZXR0ZT9hdD01OTUxNGRkODc2YTc1N2Y4MDhhYTUwNGYgIyBub3FhXG4gICAgY2xpY2s6ICdidXR0b246Y2xpY2tlZCdcbiAgbW9kZWxFdmVudHM6XG4gICAgY2hhbmdlOiAncmVuZGVyJ1xuICAgIFxuY2xhc3MgVG9vbGJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBDb2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IFRvb2xiYXJFbnRyeVZpZXdcbiAgY2hpbGRWaWV3T3B0aW9uczogLT5cbiAgICB0ZW1wbGF0ZTogQGdldE9wdGlvbiAnZW50cnlUZW1wbGF0ZSdcbiAgICBidXR0b25DbGFzc05hbWU6IEBnZXRPcHRpb24gJ2J1dHRvbkNsYXNzTmFtZSdcbiAgY2xhc3NOYW1lOiAnYnRuLWdyb3VwIGJ0bi1ncm91cC1qdXN0aWZpZWQnXG4gIGNoaWxkVmlld1RyaWdnZXJzOlxuICAgICdidXR0b246Y2xpY2tlZCc6ICd0b29sYmFyOmVudHJ5OmNsaWNrZWQnXG4gICAgIFxuY2xhc3MgVG9vbGJhclZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgdGMuZGl2ICcudG9vbGJhci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGVudHJpZXM6XG4gICAgICBlbDogJy50b29sYmFyLWVudHJpZXMnXG4gICAgICAjcmVwbGFjZUVsZW1lbnQ6IHRydWVcbiAgb25SZW5kZXI6IC0+XG4gICAgZW50cnlUZW1wbGF0ZSA9IEBnZXRPcHRpb24oJ2VudHJ5VGVtcGxhdGUnKSBvciBkZWZhdWx0RW50cnlUZW1wbGF0ZVxuICAgIGJ1dHRvbkNsYXNzTmFtZSA9IEBnZXRPcHRpb24oJ2J1dHRvbkNsYXNzTmFtZScpIG9yIGRlZmF1bHRCdXR0b25DbGFzc05hbWVcbiAgICB2aWV3ID0gbmV3IFRvb2xiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgICAgZW50cnlUZW1wbGF0ZTogZW50cnlUZW1wbGF0ZVxuICAgICAgYnV0dG9uQ2xhc3NOYW1lOiBidXR0b25DbGFzc05hbWVcbiAgICBAc2hvd0NoaWxkVmlldyAnZW50cmllcycsIHZpZXdcbiAgb25DaGlsZHZpZXdUb29sYmFyRW50cnlDbGlja2VkOiAoY2hpbGQpIC0+XG4gICAgdXJsID0gY2hpbGQubW9kZWwuZ2V0ICd1cmwnXG4gICAgaWYgdXJsXG4gICAgICBuYXZpZ2F0ZV90b191cmwgdXJsXG4gICAgXG4gICAgXG5leHBvcnQgZGVmYXVsdCBUb29sYmFyVmlld1xuXG4iXX0=
