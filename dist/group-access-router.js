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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtYWNjZXNzLXJvdXRlci5qcyIsInNvdXJjZXMiOlsiZ3JvdXAtYWNjZXNzLXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7O0FBRUEsT0FBTyxTQUFQLE1BQUE7O0FBRUEsT0FBTyxlQUFQLE1BQUE7O0FBQ0EsT0FBTyxhQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFDZCxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZDs7QUFFWCxvQkFBTixNQUFBLGtCQUFBLFFBQWdDLFVBQWhDLENBQUE7Ozs7RUFJRSxNQUFRLENBQUEsQ0FBQTtBQUNWLFFBQUEsS0FBQSxFQUFBLFNBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLGVBQUEsRUFBQSxHQUFBLEVBQUE7SUFBSSxJQUFBLEdBQU8sV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0lBQ1AsU0FBQSxHQUFZO0lBQ1osZUFBQSxHQUFrQixJQUFDLENBQUEsU0FBRCxDQUFXLGlCQUFYLENBQUEsSUFBaUMsQ0FBQyxPQUFEO0lBQ25ELElBQUcsQ0FBSSxhQUFBLENBQWMsSUFBZCxDQUFQO0FBQ0U7TUFBQSxLQUFBLHFDQUFBOztRQUNFLGlCQUFZLGlCQUFULFdBQUg7VUFDRSxTQUFBLEdBQVksS0FEZDs7TUFERixDQURGOztJQUlBLElBQUcsQ0FBSSxTQUFQO01BQ0UsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MseUJBQWxDO2FBQ0EsZUFBQSxDQUFnQixtQkFBaEIsRUFGRjs7RUFSTTs7QUFKVjs7QUFnQkEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCAnYmFja2JvbmUucm91dGVmaWx0ZXInXG4jaW1wb3J0ICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IEFwcFJvdXRlciBmcm9tICdtYXJpb25ldHRlLmFwcHJvdXRlcidcblxuaW1wb3J0IG5hdmlnYXRlX3RvX3VybCBmcm9tICcuL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuaW1wb3J0IGlzT2JqZWN0RW1wdHkgZnJvbSAnLi91dGlsL29iamVjdC1lbXB0eSdcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBHcm91cEFjY2Vzc1JvdXRlciBleHRlbmRzIEFwcFJvdXRlclxuICAjIEJhY2tib25lLlJvdXRlciBwcm90b3R5cGUgb3ZlcnJpZGRlbiBieVxuICAjIGJhY2tib25lLnJvdXRlZmlsdGVyIHdoaWNoIHByb3ZpZGVzIFwiYmVmb3JlXCIgbWV0aG9kXG4gICMgYmVmb3JlOiAocm91dGUsIHBhcmFtcykgLT5cbiAgYmVmb3JlOiAtPlxuICAgIHVzZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgICBoYXNBY2Nlc3MgPSBmYWxzZVxuICAgIHBlcm1pdHRlZEdyb3VwcyA9IEBnZXRPcHRpb24oJ3Blcm1pdHRlZEdyb3VwcycpIG9yIFsnYWRtaW4nXVxuICAgIGlmIG5vdCBpc09iamVjdEVtcHR5IHVzZXJcbiAgICAgIGZvciBnbmFtZSBpbiB1c2VyLmdyb3Vwc1xuICAgICAgICBpZiBnbmFtZSBpbiBwZXJtaXR0ZWRHcm91cHNcbiAgICAgICAgICBoYXNBY2Nlc3MgPSB0cnVlXG4gICAgaWYgbm90IGhhc0FjY2Vzc1xuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsICdSZXN0cmljdGVkIGFjY2VzcyBvbmx5ISdcbiAgICAgIG5hdmlnYXRlX3RvX3VybCAnLyNmcm9udGRvb3IvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwQWNjZXNzUm91dGVyXG5cblxuIl19
