var ListView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import ListGroupView from './list-group-collection-view.coffee';

import PaginateBar from './paginate-bar';

ListView = class ListView extends View {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGlzdC12aWV3LmpzIiwic291cmNlcyI6WyJ2aWV3cy9saXN0LXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQU8sYUFBUCxNQUFBOztBQUNBLE9BQU8sV0FBUCxNQUFBOztBQUVNLFdBQU4sTUFBQSxTQUFBLFFBQXVCLEtBQXZCO0VBQ0UsT0FBUyxDQUFBLENBQUE7V0FDUDtNQUFBLFFBQUEsRUFBVSxjQUFWO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFETzs7RUFHVCxRQUFVLENBQUEsQ0FBQTtBQUNSLFFBQUEsVUFBQSxFQUFBLEdBQUEsRUFBQTtJQUFBLFVBQUEsR0FBYSxJQUFDLENBQUEsU0FBRCxDQUFXLFlBQVg7SUFDYixPQUFPLENBQUMsR0FBUixDQUFZLFlBQVosRUFBMEIsVUFBMUI7SUFDQSxJQUFBLEdBQU8sSUFBSSxhQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksVUFBWjtNQUNBLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBRCxDQUFXLFVBQVgsQ0FEWDtNQUVBLGlCQUFBLEVBQW1CLElBQUMsQ0FBQSxTQUFELENBQVcsbUJBQVg7SUFGbkIsQ0FESztJQUlQLElBQUMsQ0FBQSxhQUFELENBQWUsVUFBZixFQUEyQixJQUEzQjtJQUNBLGdFQUFvQixDQUFFLDZCQUFuQixHQUFnQyxDQUFuQztNQUNFLElBQUEsR0FBTyxJQUFJLFdBQUosQ0FDTDtRQUFBLFVBQUEsRUFBWSxVQUFaO1FBQ0EsYUFBQSxFQUFlO01BRGYsQ0FESzthQUdQLElBQUMsQ0FBQSxhQUFELENBQWUsYUFBZixFQUE4QixJQUE5QixFQUpGOztFQVJROztBQUpaOztBQW9CQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuaW1wb3J0IExpc3RHcm91cFZpZXcgZnJvbSAnLi9saXN0LWdyb3VwLWNvbGxlY3Rpb24tdmlldy5jb2ZmZWUnXG5pbXBvcnQgUGFnaW5hdGVCYXIgZnJvbSAnLi9wYWdpbmF0ZS1iYXInXG5cbmNsYXNzIExpc3RWaWV3IGV4dGVuZHMgVmlld1xuICByZWdpb25zOiAtPlxuICAgIGl0ZW1MaXN0OiAnQHVpLml0ZW1MaXN0J1xuICAgIHBhZ2luYXRlQmFyOiAnQHVpLnBhZ2luYXRlQmFyJ1xuICBvblJlbmRlcjogLT5cbiAgICBjb2xsZWN0aW9uID0gQGdldE9wdGlvbiAnY29sbGVjdGlvbidcbiAgICBjb25zb2xlLmxvZyBcImNvbGxlY3Rpb25cIiwgY29sbGVjdGlvblxuICAgIHZpZXcgPSBuZXcgTGlzdEdyb3VwVmlld1xuICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvblxuICAgICAgY2hpbGRWaWV3OiBAZ2V0T3B0aW9uKCdJdGVtVmlldycpXG4gICAgICBjaGlsZFZpZXdUcmlnZ2VyczogQGdldE9wdGlvbignY2hpbGRWaWV3VHJpZ2dlcnMnKVxuICAgIEBzaG93Q2hpbGRWaWV3ICdpdGVtTGlzdCcsIHZpZXdcbiAgICBpZiBjb2xsZWN0aW9uPy5zdGF0ZT8udG90YWxQYWdlcyA+IDFcbiAgICAgIHZpZXcgPSBuZXcgUGFnaW5hdGVCYXJcbiAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvblxuICAgICAgICBzZXRLZXlIYW5kbGVyOiB0cnVlXG4gICAgICBAc2hvd0NoaWxkVmlldyAncGFnaW5hdGVCYXInLCB2aWV3XG4gICAgICBcblxuICAgIFxuZXhwb3J0IGRlZmF1bHQgTGlzdFZpZXdcblxuICAgIFxuIl19
