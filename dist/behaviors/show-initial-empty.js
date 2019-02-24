var MainChannel, ShowInitialEmptyContent;

import {
  result
} from 'underscore';

import Backbone from 'backbone';

import {
  Behavior
} from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

import EmptyView from '../views/empty';

export default ShowInitialEmptyContent = (function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxRQUFUO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLE9BQU8sU0FBUCxNQUFBOztBQUVBLE9BQUEsUUFBcUI7RUFBTixNQUFBLHdCQUFBLFFBQXNDLFNBQXRDO0lBR2IsWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBLElBQUEsRUFBQTtNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVg7TUFDUCxJQUFBLEdBQU8sSUFBSTthQUNYLElBQUMsQ0FBQSxJQUFJLENBQUMsYUFBTixDQUFvQixTQUFwQixFQUErQixJQUEvQjtJQUhZOztFQUhEOztvQ0FDYixPQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVc7RUFBWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc3VsdCB9IGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5pbXBvcnQgRW1wdHlWaWV3IGZyb20gJy4uL3ZpZXdzL2VtcHR5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93SW5pdGlhbEVtcHR5Q29udGVudCBleHRlbmRzIEJlaGF2aW9yXG4gIG9wdGlvbnM6XG4gICAgZW1wdHlWaWV3OiBFbXB0eVZpZXdcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIFZpZXcgPSBAZ2V0T3B0aW9uICdlbXB0eVZpZXcnXG4gICAgdmlldyA9IG5ldyBWaWV3XG4gICAgQHZpZXcuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiJdfQ==
