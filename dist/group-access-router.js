var GroupAccessRouter, MainChannel, MessageChannel,
  indexOf = [].indexOf;

import {
  Radio
} from 'backbone';

import 'backbone.routefilter';

import AppRouter from 'marionette.approuter';

import navigate_to_url from './util/navigate-to-url';

import isObjectEmpty from './util/object-empty';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

GroupAccessRouter = class GroupAccessRouter extends AppRouter {
  // Backbone.Router prototype overridden by
  // backbone.routefilter which provides "before" method
  // before: (route, params) ->
  before() {
    var gname, hasAccess, i, len, permittedGroups, ref, user;
    user = MainChannel.request('main:app:decode-auth-token');
    hasAccess = false;
    permittedGroups = this.getOption('permittedGroups') || ['admin'];
    if (!isObjectEmpty(user)) {
      ref = user.groups;
      for (i = 0, len = ref.length; i < len; i++) {
        gname = ref[i];
        if (indexOf.call(permittedGroups, gname) >= 0) {
          hasAccess = true;
        }
      }
    }
    if (!hasAccess) {
      MessageChannel.request('warning', 'Restricted access only!');
      return navigate_to_url('/#frontdoor/login');
    }
  }

};

export default GroupAccessRouter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtYWNjZXNzLXJvdXRlci5qcyIsInNvdXJjZXMiOlsiZ3JvdXAtYWNjZXNzLXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7O0FBRUEsT0FBTyxTQUFQLE1BQUE7O0FBRUEsT0FBTyxlQUFQLE1BQUE7O0FBQ0EsT0FBTyxhQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFDZCxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZDs7QUFFWCxvQkFBTixNQUFBLGtCQUFBLFFBQWdDLFVBQWhDLENBQUE7Ozs7RUFJRSxNQUFRLENBQUEsQ0FBQTtBQUNOLFFBQUEsS0FBQSxFQUFBLFNBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLGVBQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxJQUFBLEdBQU8sV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0lBQ1AsU0FBQSxHQUFZO0lBQ1osZUFBQSxHQUFrQixJQUFDLENBQUEsU0FBRCxDQUFXLGlCQUFYLENBQUEsSUFBaUMsQ0FBQyxPQUFEO0lBQ25ELElBQUcsQ0FBSSxhQUFBLENBQWMsSUFBZCxDQUFQO0FBQ0U7TUFBQSxLQUFBLHFDQUFBOztRQUNFLElBQUcsYUFBUyxlQUFULEVBQUEsS0FBQSxNQUFIO1VBQ0UsU0FBQSxHQUFZLEtBRGQ7O01BREYsQ0FERjs7SUFJQSxJQUFHLENBQUksU0FBUDtNQUNFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLHlCQUFsQzthQUNBLGVBQUEsQ0FBZ0IsbUJBQWhCLEVBRkY7O0VBUk07O0FBSlY7O0FBZ0JBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgJ2JhY2tib25lLnJvdXRlZmlsdGVyJ1xuI2ltcG9ydCAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBBcHBSb3V0ZXIgZnJvbSAnbWFyaW9uZXR0ZS5hcHByb3V0ZXInXG5cbmltcG9ydCBuYXZpZ2F0ZV90b191cmwgZnJvbSAnLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbmltcG9ydCBpc09iamVjdEVtcHR5IGZyb20gJy4vdXRpbC9vYmplY3QtZW1wdHknXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuY2xhc3MgR3JvdXBBY2Nlc3NSb3V0ZXIgZXh0ZW5kcyBBcHBSb3V0ZXJcbiAgIyBCYWNrYm9uZS5Sb3V0ZXIgcHJvdG90eXBlIG92ZXJyaWRkZW4gYnlcbiAgIyBiYWNrYm9uZS5yb3V0ZWZpbHRlciB3aGljaCBwcm92aWRlcyBcImJlZm9yZVwiIG1ldGhvZFxuICAjIGJlZm9yZTogKHJvdXRlLCBwYXJhbXMpIC0+XG4gIGJlZm9yZTogLT5cbiAgICB1c2VyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gICAgaGFzQWNjZXNzID0gZmFsc2VcbiAgICBwZXJtaXR0ZWRHcm91cHMgPSBAZ2V0T3B0aW9uKCdwZXJtaXR0ZWRHcm91cHMnKSBvciBbJ2FkbWluJ11cbiAgICBpZiBub3QgaXNPYmplY3RFbXB0eSB1c2VyXG4gICAgICBmb3IgZ25hbWUgaW4gdXNlci5ncm91cHNcbiAgICAgICAgaWYgZ25hbWUgaW4gcGVybWl0dGVkR3JvdXBzXG4gICAgICAgICAgaGFzQWNjZXNzID0gdHJ1ZVxuICAgIGlmIG5vdCBoYXNBY2Nlc3NcbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCAnUmVzdHJpY3RlZCBhY2Nlc3Mgb25seSEnXG4gICAgICBuYXZpZ2F0ZV90b191cmwgJy8jZnJvbnRkb29yL2xvZ2luJ1xuXG5leHBvcnQgZGVmYXVsdCBHcm91cEFjY2Vzc1JvdXRlclxuXG5cbiJdfQ==
