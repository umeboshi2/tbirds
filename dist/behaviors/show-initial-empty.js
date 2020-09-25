var ShowInitialEmptyContent;

import {
  Behavior
} from 'backbone.marionette';

import EmptyView from '../views/empty';

ShowInitialEmptyContent = (function() {
  class ShowInitialEmptyContent extends Behavior {
    onDomRefresh() {
      var View, view;
      View = this.getOption('emptyView');
      view = new View;
      return this.view.showChildView('content', view);
    }

  };

  ShowInitialEmptyContent.prototype.options = {
    emptyView: EmptyView
  };

  return ShowInitialEmptyContent;

}).call(this);

export default ShowInitialEmptyContent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBTyxTQUFQLE1BQUE7O0FBRU07RUFBTixNQUFBLHdCQUFBLFFBQXNDLFNBQXRDO0lBR0UsWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBLElBQUEsRUFBQTtNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVg7TUFDUCxJQUFBLEdBQU8sSUFBSTthQUNYLElBQUMsQ0FBQSxJQUFJLENBQUMsYUFBTixDQUFvQixTQUFwQixFQUErQixJQUEvQjtJQUhZOztFQUhoQjs7b0NBQ0UsT0FBQSxHQUNFO0lBQUEsU0FBQSxFQUFXO0VBQVg7Ozs7OztBQU1KLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuaW1wb3J0IEVtcHR5VmlldyBmcm9tICcuLi92aWV3cy9lbXB0eSdcblxuY2xhc3MgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQgZXh0ZW5kcyBCZWhhdmlvclxuICBvcHRpb25zOlxuICAgIGVtcHR5VmlldzogRW1wdHlWaWV3XG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBWaWV3ID0gQGdldE9wdGlvbiAnZW1wdHlWaWV3J1xuICAgIHZpZXcgPSBuZXcgVmlld1xuICAgIEB2aWV3LnNob3dDaGlsZFZpZXcgJ2NvbnRlbnQnLCB2aWV3XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dJbml0aWFsRW1wdHlDb250ZW50XG4iXX0=
