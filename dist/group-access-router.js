var GroupAccessRouter, MainChannel, MessageChannel,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import 'backbone.routefilter';

import 'backbone.marionette';

import AppRouter from 'marionette.approuter';

import navigate_to_url from './util/navigate-to-url';

import isObjectEmpty from './util/object-empty';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

GroupAccessRouter = class GroupAccessRouter extends AppRouter {
  // Backbone.Router prototype overridden by
  // backbone.routefilter which provides "before" method
  before(route, params) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtYWNjZXNzLXJvdXRlci5qcyIsInNvdXJjZXMiOlsiZ3JvdXAtYWNjZXNzLXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTs7QUFDQSxPQUFBOztBQUNBLE9BQU8sU0FBUCxNQUFBOztBQUVBLE9BQU8sZUFBUCxNQUFBOztBQUNBLE9BQU8sYUFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRVgsb0JBQU4sTUFBQSxrQkFBQSxRQUFnQyxVQUFoQyxDQUFBOzs7RUFHRSxNQUFRLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FBQTtBQUNOLFFBQUEsS0FBQSxFQUFBLFNBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLGVBQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxJQUFBLEdBQU8sV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0lBQ1AsU0FBQSxHQUFZO0lBQ1osZUFBQSxHQUFrQixJQUFDLENBQUEsU0FBRCxDQUFXLGlCQUFYLENBQUEsSUFBaUMsQ0FBQyxPQUFEO0lBQ25ELElBQUcsQ0FBSSxhQUFBLENBQWMsSUFBZCxDQUFQO0FBQ0U7TUFBQSxLQUFBLHFDQUFBOztRQUNFLElBQUcsYUFBUyxlQUFULEVBQUEsS0FBQSxNQUFIO1VBQ0UsU0FBQSxHQUFZLEtBRGQ7O01BREYsQ0FERjs7SUFJQSxJQUFHLENBQUksU0FBUDtNQUNFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLHlCQUFsQzthQUNBLGVBQUEsQ0FBZ0IsbUJBQWhCLEVBRkY7O0VBUk07O0FBSFY7O0FBZUEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0ICdiYWNrYm9uZS5yb3V0ZWZpbHRlcidcbmltcG9ydCAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBBcHBSb3V0ZXIgZnJvbSAnbWFyaW9uZXR0ZS5hcHByb3V0ZXInXG5cbmltcG9ydCBuYXZpZ2F0ZV90b191cmwgZnJvbSAnLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbmltcG9ydCBpc09iamVjdEVtcHR5IGZyb20gJy4vdXRpbC9vYmplY3QtZW1wdHknXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuY2xhc3MgR3JvdXBBY2Nlc3NSb3V0ZXIgZXh0ZW5kcyBBcHBSb3V0ZXJcbiAgIyBCYWNrYm9uZS5Sb3V0ZXIgcHJvdG90eXBlIG92ZXJyaWRkZW4gYnlcbiAgIyBiYWNrYm9uZS5yb3V0ZWZpbHRlciB3aGljaCBwcm92aWRlcyBcImJlZm9yZVwiIG1ldGhvZFxuICBiZWZvcmU6IChyb3V0ZSwgcGFyYW1zKSAtPlxuICAgIHVzZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgICBoYXNBY2Nlc3MgPSBmYWxzZVxuICAgIHBlcm1pdHRlZEdyb3VwcyA9IEBnZXRPcHRpb24oJ3Blcm1pdHRlZEdyb3VwcycpIG9yIFsnYWRtaW4nXVxuICAgIGlmIG5vdCBpc09iamVjdEVtcHR5IHVzZXJcbiAgICAgIGZvciBnbmFtZSBpbiB1c2VyLmdyb3Vwc1xuICAgICAgICBpZiBnbmFtZSBpbiBwZXJtaXR0ZWRHcm91cHNcbiAgICAgICAgICBoYXNBY2Nlc3MgPSB0cnVlXG4gICAgaWYgbm90IGhhc0FjY2Vzc1xuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsICdSZXN0cmljdGVkIGFjY2VzcyBvbmx5ISdcbiAgICAgIG5hdmlnYXRlX3RvX3VybCAnLyNmcm9udGRvb3IvbG9naW4nXG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwQWNjZXNzUm91dGVyXG5cblxuIl19
