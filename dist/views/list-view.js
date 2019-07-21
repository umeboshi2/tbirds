var ListView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import ListGroupView from './list-group-collection-view.coffee';

import PaginateBar from './paginate-bar';

ListView = class ListView extends Marionette.View {
  regions() {
    return {
      itemList: '@ui.itemList',
      paginateBar: '@ui.paginateBar'
    };
  }

  onRender() {
    var collection, ref, view;
    collection = this.getOption('collection');
    console.log("collection", collection);
    view = new ListGroupView({
      collection: collection,
      childView: this.getOption('ItemView'),
      childViewTriggers: this.getOption('childViewTriggers')
    });
    this.showChildView('itemList', view);
    if ((collection != null ? (ref = collection.state) != null ? ref.totalPages : void 0 : void 0) > 1) {
      view = new PaginateBar({
        collection: collection,
        setKeyHandler: true
      });
      return this.showChildView('paginateBar', view);
    }
  }

};

export default ListView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGlzdC12aWV3LmpzIiwic291cmNlcyI6WyJ2aWV3cy9saXN0LXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRUEsT0FBTyxhQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBRU0sV0FBTixNQUFBLFNBQUEsUUFBdUIsVUFBVSxDQUFDLEtBQWxDO0VBQ0UsT0FBUyxDQUFBLENBQUE7V0FDUDtNQUFBLFFBQUEsRUFBVSxjQUFWO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFETzs7RUFHVCxRQUFVLENBQUEsQ0FBQTtBQUNSLFFBQUEsVUFBQSxFQUFBLEdBQUEsRUFBQTtJQUFBLFVBQUEsR0FBYSxJQUFDLENBQUEsU0FBRCxDQUFXLFlBQVg7SUFDYixPQUFPLENBQUMsR0FBUixDQUFZLFlBQVosRUFBMEIsVUFBMUI7SUFDQSxJQUFBLEdBQU8sSUFBSSxhQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksVUFBWjtNQUNBLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBRCxDQUFXLFVBQVgsQ0FEWDtNQUVBLGlCQUFBLEVBQW1CLElBQUMsQ0FBQSxTQUFELENBQVcsbUJBQVg7SUFGbkIsQ0FESztJQUlQLElBQUMsQ0FBQSxhQUFELENBQWUsVUFBZixFQUEyQixJQUEzQjtJQUNBLGdFQUFvQixDQUFFLDZCQUFuQixHQUFnQyxDQUFuQztNQUNFLElBQUEsR0FBTyxJQUFJLFdBQUosQ0FDTDtRQUFBLFVBQUEsRUFBWSxVQUFaO1FBQ0EsYUFBQSxFQUFlO01BRGYsQ0FESzthQUdQLElBQUMsQ0FBQSxhQUFELENBQWUsYUFBZixFQUE4QixJQUE5QixFQUpGOztFQVJROztBQUpaOztBQW9CQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5pbXBvcnQgTGlzdEdyb3VwVmlldyBmcm9tICcuL2xpc3QtZ3JvdXAtY29sbGVjdGlvbi12aWV3LmNvZmZlZSdcbmltcG9ydCBQYWdpbmF0ZUJhciBmcm9tICcuL3BhZ2luYXRlLWJhcidcblxuY2xhc3MgTGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgcmVnaW9uczogLT5cbiAgICBpdGVtTGlzdDogJ0B1aS5pdGVtTGlzdCdcbiAgICBwYWdpbmF0ZUJhcjogJ0B1aS5wYWdpbmF0ZUJhcidcbiAgb25SZW5kZXI6IC0+XG4gICAgY29sbGVjdGlvbiA9IEBnZXRPcHRpb24gJ2NvbGxlY3Rpb24nXG4gICAgY29uc29sZS5sb2cgXCJjb2xsZWN0aW9uXCIsIGNvbGxlY3Rpb25cbiAgICB2aWV3ID0gbmV3IExpc3RHcm91cFZpZXdcbiAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb25cbiAgICAgIGNoaWxkVmlldzogQGdldE9wdGlvbignSXRlbVZpZXcnKVxuICAgICAgY2hpbGRWaWV3VHJpZ2dlcnM6IEBnZXRPcHRpb24oJ2NoaWxkVmlld1RyaWdnZXJzJylcbiAgICBAc2hvd0NoaWxkVmlldyAnaXRlbUxpc3QnLCB2aWV3XG4gICAgaWYgY29sbGVjdGlvbj8uc3RhdGU/LnRvdGFsUGFnZXMgPiAxXG4gICAgICB2aWV3ID0gbmV3IFBhZ2luYXRlQmFyXG4gICAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb25cbiAgICAgICAgc2V0S2V5SGFuZGxlcjogdHJ1ZVxuICAgICAgQHNob3dDaGlsZFZpZXcgJ3BhZ2luYXRlQmFyJywgdmlld1xuICAgICAgXG5cbiAgICBcbmV4cG9ydCBkZWZhdWx0IExpc3RWaWV3XG5cbiAgICBcbiJdfQ==
