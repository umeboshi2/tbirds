var GroupAccessRouter, MainChannel, MessageChannel,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import 'backbone.routefilter';

import Marionette from 'backbone.marionette';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtYWNjZXNzLXJvdXRlci5qcyIsInNvdXJjZXMiOlsiZ3JvdXAtYWNjZXNzLXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFFQSxPQUFPLGVBQVAsTUFBQTs7QUFDQSxPQUFPLGFBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsVUFBaEMsQ0FBQTs7O0VBR0UsTUFBUSxDQUFDLEtBQUQsRUFBUSxNQUFSLENBQUE7QUFDTixRQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxlQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUEsSUFBQSxHQUFPLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtJQUNQLFNBQUEsR0FBWTtJQUNaLGVBQUEsR0FBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxpQkFBWCxDQUFBLElBQWlDLENBQUMsT0FBRDtJQUNuRCxJQUFHLENBQUksYUFBQSxDQUFjLElBQWQsQ0FBUDtBQUNFO01BQUEsS0FBQSxxQ0FBQTs7UUFDRSxJQUFHLGFBQVMsZUFBVCxFQUFBLEtBQUEsTUFBSDtVQUNFLFNBQUEsR0FBWSxLQURkOztNQURGLENBREY7O0lBSUEsSUFBRyxDQUFJLFNBQVA7TUFDRSxjQUFjLENBQUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyx5QkFBbEM7YUFDQSxlQUFBLENBQWdCLG1CQUFoQixFQUZGOztFQVJNOztBQUhWOztBQWVBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCAnYmFja2JvbmUucm91dGVmaWx0ZXInXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IEFwcFJvdXRlciBmcm9tICdtYXJpb25ldHRlLmFwcHJvdXRlcidcblxuaW1wb3J0IG5hdmlnYXRlX3RvX3VybCBmcm9tICcuL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuaW1wb3J0IGlzT2JqZWN0RW1wdHkgZnJvbSAnLi91dGlsL29iamVjdC1lbXB0eSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBHcm91cEFjY2Vzc1JvdXRlciBleHRlbmRzIEFwcFJvdXRlclxuICAjIEJhY2tib25lLlJvdXRlciBwcm90b3R5cGUgb3ZlcnJpZGRlbiBieVxuICAjIGJhY2tib25lLnJvdXRlZmlsdGVyIHdoaWNoIHByb3ZpZGVzIFwiYmVmb3JlXCIgbWV0aG9kXG4gIGJlZm9yZTogKHJvdXRlLCBwYXJhbXMpIC0+XG4gICAgdXNlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICAgIGhhc0FjY2VzcyA9IGZhbHNlXG4gICAgcGVybWl0dGVkR3JvdXBzID0gQGdldE9wdGlvbigncGVybWl0dGVkR3JvdXBzJykgb3IgWydhZG1pbiddXG4gICAgaWYgbm90IGlzT2JqZWN0RW1wdHkgdXNlclxuICAgICAgZm9yIGduYW1lIGluIHVzZXIuZ3JvdXBzXG4gICAgICAgIGlmIGduYW1lIGluIHBlcm1pdHRlZEdyb3Vwc1xuICAgICAgICAgIGhhc0FjY2VzcyA9IHRydWVcbiAgICBpZiBub3QgaGFzQWNjZXNzXG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgJ1Jlc3RyaWN0ZWQgYWNjZXNzIG9ubHkhJ1xuICAgICAgbmF2aWdhdGVfdG9fdXJsICcvI2Zyb250ZG9vci9sb2dpbidcblxuZXhwb3J0IGRlZmF1bHQgR3JvdXBBY2Nlc3NSb3V0ZXJcblxuXG4iXX0=
