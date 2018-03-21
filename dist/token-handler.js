var MainChannel, MessageChannel, accessTimeRemaining, exportObject, initToken, keepTokenFresh, msRemaining, startUserApp, tokenNeedsRefresh,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import ms from 'ms';

import objectEmpty from './util/object-empty';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

msRemaining = function(token) {
  var exp, now;
  now = new Date();
  exp = new Date(token.exp * 1000);
  return exp - now;
};

accessTimeRemaining = function() {
  var remaining, token;
  token = MainChannel.request('main:app:decode-auth-token');
  if (objectEmpty(token)) {
    return 0;
  }
  remaining = msRemaining(token);
  return Math.floor(remaining / 1000);
};

tokenNeedsRefresh = function(token, options) {
  var accessPeriod, interval, multiple, refreshWhen, remaining;
  options = options || {};
  remaining = msRemaining(token);
  interval = ms('5m');
  if (indexOf.call(Object.keys(options), 'refreshInterval') >= 0) {
    interval = ms(options.refreshInterval);
  }
  multiple = options.refreshIntervalMultiple || 3;
  accessPeriod = 1000 * (token.exp - token.iat);
  refreshWhen = accessPeriod - (multiple * interval);
  return remaining < refreshWhen;
};

keepTokenFresh = function(options) {
  var token;
  options = options || {};
  token = MainChannel.request('main:app:decode-auth-token');
  if (tokenNeedsRefresh(token, options)) {
    return MainChannel.request('main:app:refresh-token', options.loginUrl);
  }
};

initToken = function() {
  var remaining, token;
  remaining = accessTimeRemaining();
  token = MainChannel.request('main:app:decode-auth-token');
  if (remaining <= 0 && !objectEmpty(token)) {
    MessageChannel.request('warning', 'deleting expired access token');
    MainChannel.request('main:app:destroy-auth-token');
  }
  return token;
};

// setupAuthModels(appConfig) needs to be called
// before calling this function.
// ex: "require('./authmodels')(appConfig)"
startUserApp = function(app, appConfig) {
  var AuthRefresh, refresh, response, token;
  token = initToken();
  if (objectEmpty(token)) {
    return app.start({
      state: {
        currentUser: null
      }
    });
  } else if (tokenNeedsRefresh(token, appConfig.authToken)) {
    AuthRefresh = MainChannel.request('main:app:AuthRefresh');
    refresh = new AuthRefresh;
    response = refresh.fetch();
    response.fail(function() {
      var loginUrl;
      if (response.status === 401) {
        MainChannel.request('main:app:destroy-auth-token');
        if (appConfig.needLogin) {
          loginUrl = appConfig.authToken.loginUrl || "#frontdoor/login";
          window.location.hash = loginUrl;
        }
      }
      return app.start({
        state: {
          currentUser: null
        }
      });
    });
    return response.done(function() {
      var property;
      property = appConfig.authToken.tokenResponseProperty || 'token';
      token = refresh.get(property);
      MainChannel.request('main:app:set-auth-token', token);
      // start the app
      return app.start({
        state: {
          currentUser: MainChannel.request('main:app:decode-auth-token')
        }
      });
    });
  } else {
    // start the app
    return app.start({
      state: {
        currentUser: token
      }
    });
  }
};


// FIXME figure out what to export
exportObject = {
  accessTimeRemaining: accessTimeRemaining,
  keepTokenFresh: keepTokenFresh,
  startUserApp: startUserApp
};

export default exportObject;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taGFuZGxlci5qcyIsInNvdXJjZXMiOlsidG9rZW4taGFuZGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLG1CQUFBLEVBQUEsWUFBQSxFQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsRUFBQSxpQkFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRWpCLFdBQUEsR0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ1osTUFBQSxHQUFBLEVBQUE7RUFBQSxHQUFBLEdBQU0sSUFBSSxJQUFKLENBQUE7RUFDTixHQUFBLEdBQU0sSUFBSSxJQUFKLENBQVMsS0FBSyxDQUFDLEdBQU4sR0FBWSxJQUFyQjtBQUNOLFNBQU8sR0FBQSxHQUFNO0FBSEQ7O0FBS2QsbUJBQUEsR0FBc0IsUUFBQSxDQUFBLENBQUE7QUFDcEIsTUFBQSxTQUFBLEVBQUE7RUFBQSxLQUFBLEdBQVEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0VBQ1IsSUFBRyxXQUFBLENBQVksS0FBWixDQUFIO0FBQ0UsV0FBTyxFQURUOztFQUVBLFNBQUEsR0FBWSxXQUFBLENBQVksS0FBWjtBQUNaLFNBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFBLEdBQVksSUFBdkI7QUFMYTs7QUFPdEIsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQUE7QUFDbEIsTUFBQSxZQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUE7RUFBQSxPQUFBLEdBQVUsT0FBQSxJQUFXLENBQUE7RUFDckIsU0FBQSxHQUFZLFdBQUEsQ0FBWSxLQUFaO0VBQ1osUUFBQSxHQUFXLEVBQUEsQ0FBRyxJQUFIO0VBQ1gsSUFBRyxhQUFxQixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQVosQ0FBckIsRUFBQSxpQkFBQSxNQUFIO0lBQ0UsUUFBQSxHQUFXLEVBQUEsQ0FBRyxPQUFPLENBQUMsZUFBWCxFQURiOztFQUVBLFFBQUEsR0FBVyxPQUFPLENBQUMsdUJBQVIsSUFBbUM7RUFDOUMsWUFBQSxHQUFlLElBQUEsR0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFOLEdBQVksS0FBSyxDQUFDLEdBQW5CO0VBQ3RCLFdBQUEsR0FBYyxZQUFBLEdBQWUsQ0FBQyxRQUFBLEdBQVcsUUFBWjtBQUM3QixTQUFPLFNBQUEsR0FBWTtBQVREOztBQVlwQixjQUFBLEdBQWlCLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDZixNQUFBO0VBQUEsT0FBQSxHQUFVLE9BQUEsSUFBVyxDQUFBO0VBQ3JCLEtBQUEsR0FBUSxXQUFXLENBQUMsT0FBWixDQUFvQiw0QkFBcEI7RUFDUixJQUFHLGlCQUFBLENBQWtCLEtBQWxCLEVBQXlCLE9BQXpCLENBQUg7V0FDRSxXQUFXLENBQUMsT0FBWixDQUFvQix3QkFBcEIsRUFBOEMsT0FBTyxDQUFDLFFBQXRELEVBREY7O0FBSGU7O0FBTWpCLFNBQUEsR0FBWSxRQUFBLENBQUEsQ0FBQTtBQUNWLE1BQUEsU0FBQSxFQUFBO0VBQUEsU0FBQSxHQUFZLG1CQUFBLENBQUE7RUFDWixLQUFBLEdBQVEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0VBQ1IsSUFBRyxTQUFBLElBQWEsQ0FBYixJQUFtQixDQUFJLFdBQUEsQ0FBWSxLQUFaLENBQTFCO0lBQ0UsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsK0JBQWxDO0lBQ0EsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNkJBQXBCLEVBRkY7O1NBR0E7QUFOVSxFQXhDWjs7Ozs7QUFtREEsWUFBQSxHQUFlLFFBQUEsQ0FBQyxHQUFELEVBQU0sU0FBTixDQUFBO0FBQ2IsTUFBQSxXQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQTtFQUFBLEtBQUEsR0FBUSxTQUFBLENBQUE7RUFDUixJQUFHLFdBQUEsQ0FBWSxLQUFaLENBQUg7V0FDRSxHQUFHLENBQUMsS0FBSixDQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsV0FBQSxFQUFhO01BQWI7SUFERixDQURGLEVBREY7R0FBQSxNQUlLLElBQUcsaUJBQUEsQ0FBa0IsS0FBbEIsRUFBeUIsU0FBUyxDQUFDLFNBQW5DLENBQUg7SUFDSCxXQUFBLEdBQWMsV0FBVyxDQUFDLE9BQVosQ0FBb0Isc0JBQXBCO0lBQ2QsT0FBQSxHQUFVLElBQUk7SUFDZCxRQUFBLEdBQVcsT0FBTyxDQUFDLEtBQVIsQ0FBQTtJQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsUUFBQSxDQUFBLENBQUE7QUFDWixVQUFBO01BQUEsSUFBRyxRQUFRLENBQUMsTUFBVCxLQUFtQixHQUF0QjtRQUNFLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDZCQUFwQjtRQUNBLElBQUcsU0FBUyxDQUFDLFNBQWI7VUFDRSxRQUFBLEdBQVcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFwQixJQUFnQztVQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWhCLEdBQXVCLFNBRnpCO1NBRkY7O2FBS0EsR0FBRyxDQUFDLEtBQUosQ0FDRTtRQUFBLEtBQUEsRUFDRTtVQUFBLFdBQUEsRUFBYTtRQUFiO01BREYsQ0FERjtJQU5ZLENBQWQ7V0FTQSxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0FBQ1osVUFBQTtNQUFBLFFBQUEsR0FBVyxTQUFTLENBQUMsU0FBUyxDQUFDLHFCQUFwQixJQUE2QztNQUN4RCxLQUFBLEdBQVEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFaO01BQ1IsV0FBVyxDQUFDLE9BQVosQ0FBb0IseUJBQXBCLEVBQStDLEtBQS9DLEVBRkE7O2FBSUEsR0FBRyxDQUFDLEtBQUosQ0FDRTtRQUFBLEtBQUEsRUFDRTtVQUFBLFdBQUEsRUFBYSxXQUFXLENBQUMsT0FBWixDQUFvQiw0QkFBcEI7UUFBYjtNQURGLENBREY7SUFMWSxDQUFkLEVBYkc7R0FBQSxNQUFBOztXQXVCSCxHQUFHLENBQUMsS0FBSixDQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsV0FBQSxFQUFhO01BQWI7SUFERixDQURGLEVBdkJHOztBQU5RLEVBbkRmOzs7O0FBc0ZBLFlBQUEsR0FDRTtFQUFBLG1CQUFBLEVBQXFCLG1CQUFyQjtFQUNBLGNBQUEsRUFBZ0IsY0FEaEI7RUFFQSxZQUFBLEVBQWM7QUFGZDs7QUFHRixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IG1zIGZyb20gJ21zJ1xuXG5pbXBvcnQgb2JqZWN0RW1wdHkgZnJvbSAnLi91dGlsL29iamVjdC1lbXB0eSdcblxuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbm1zUmVtYWluaW5nID0gKHRva2VuKSAtPlxuICBub3cgPSBuZXcgRGF0ZSgpXG4gIGV4cCA9IG5ldyBEYXRlKHRva2VuLmV4cCAqIDEwMDApXG4gIHJldHVybiBleHAgLSBub3dcblxuYWNjZXNzVGltZVJlbWFpbmluZyA9IC0+XG4gIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gIGlmIG9iamVjdEVtcHR5IHRva2VuXG4gICAgcmV0dXJuIDBcbiAgcmVtYWluaW5nID0gbXNSZW1haW5pbmcgdG9rZW5cbiAgcmV0dXJuIE1hdGguZmxvb3IocmVtYWluaW5nIC8gMTAwMClcblxudG9rZW5OZWVkc1JlZnJlc2ggPSAodG9rZW4sIG9wdGlvbnMpIC0+XG4gIG9wdGlvbnMgPSBvcHRpb25zIG9yIHt9XG4gIHJlbWFpbmluZyA9IG1zUmVtYWluaW5nIHRva2VuXG4gIGludGVydmFsID0gbXMgJzVtJ1xuICBpZiAncmVmcmVzaEludGVydmFsJyBpbiBPYmplY3Qua2V5cyBvcHRpb25zXG4gICAgaW50ZXJ2YWwgPSBtcyBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbFxuICBtdWx0aXBsZSA9IG9wdGlvbnMucmVmcmVzaEludGVydmFsTXVsdGlwbGUgb3IgM1xuICBhY2Nlc3NQZXJpb2QgPSAxMDAwICogKHRva2VuLmV4cCAtIHRva2VuLmlhdClcbiAgcmVmcmVzaFdoZW4gPSBhY2Nlc3NQZXJpb2QgLSAobXVsdGlwbGUgKiBpbnRlcnZhbClcbiAgcmV0dXJuIHJlbWFpbmluZyA8IHJlZnJlc2hXaGVuXG4gIFxuICBcbmtlZXBUb2tlbkZyZXNoID0gKG9wdGlvbnMpIC0+XG4gIG9wdGlvbnMgPSBvcHRpb25zIG9yIHt9XG4gIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gIGlmIHRva2VuTmVlZHNSZWZyZXNoIHRva2VuLCBvcHRpb25zXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6cmVmcmVzaC10b2tlbicsIG9wdGlvbnMubG9naW5VcmxcblxuaW5pdFRva2VuID0gLT5cbiAgcmVtYWluaW5nID0gYWNjZXNzVGltZVJlbWFpbmluZygpXG4gIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gIGlmIHJlbWFpbmluZyA8PSAwIGFuZCBub3Qgb2JqZWN0RW1wdHkgdG9rZW5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgJ2RlbGV0aW5nIGV4cGlyZWQgYWNjZXNzIHRva2VuJ1xuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlc3Ryb3ktYXV0aC10b2tlbidcbiAgdG9rZW5cblxuIyBzZXR1cEF1dGhNb2RlbHMoYXBwQ29uZmlnKSBuZWVkcyB0byBiZSBjYWxsZWRcbiMgYmVmb3JlIGNhbGxpbmcgdGhpcyBmdW5jdGlvbi5cbiMgZXg6IFwicmVxdWlyZSgnLi9hdXRobW9kZWxzJykoYXBwQ29uZmlnKVwiXG5zdGFydFVzZXJBcHAgPSAoYXBwLCBhcHBDb25maWcpIC0+XG4gIHRva2VuID0gaW5pdFRva2VuKClcbiAgaWYgb2JqZWN0RW1wdHkgdG9rZW5cbiAgICBhcHAuc3RhcnRcbiAgICAgIHN0YXRlOlxuICAgICAgICBjdXJyZW50VXNlcjogbnVsbFxuICBlbHNlIGlmIHRva2VuTmVlZHNSZWZyZXNoIHRva2VuLCBhcHBDb25maWcuYXV0aFRva2VuXG4gICAgQXV0aFJlZnJlc2ggPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpBdXRoUmVmcmVzaCdcbiAgICByZWZyZXNoID0gbmV3IEF1dGhSZWZyZXNoXG4gICAgcmVzcG9uc2UgPSByZWZyZXNoLmZldGNoKClcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBpZiByZXNwb25zZS5zdGF0dXMgPT0gNDAxXG4gICAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlc3Ryb3ktYXV0aC10b2tlbidcbiAgICAgICAgaWYgYXBwQ29uZmlnLm5lZWRMb2dpblxuICAgICAgICAgIGxvZ2luVXJsID0gYXBwQ29uZmlnLmF1dGhUb2tlbi5sb2dpblVybCBvciBcIiNmcm9udGRvb3IvbG9naW5cIlxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbG9naW5VcmxcbiAgICAgIGFwcC5zdGFydFxuICAgICAgICBzdGF0ZTpcbiAgICAgICAgICBjdXJyZW50VXNlcjogbnVsbFxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIHByb3BlcnR5ID0gYXBwQ29uZmlnLmF1dGhUb2tlbi50b2tlblJlc3BvbnNlUHJvcGVydHkgb3IgJ3Rva2VuJyBcbiAgICAgIHRva2VuID0gcmVmcmVzaC5nZXQgcHJvcGVydHlcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnNldC1hdXRoLXRva2VuJywgdG9rZW5cbiAgICAgICMgc3RhcnQgdGhlIGFwcFxuICAgICAgYXBwLnN0YXJ0XG4gICAgICAgIHN0YXRlOlxuICAgICAgICAgIGN1cnJlbnRVc2VyOiBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgZWxzZVxuICAgICMgc3RhcnQgdGhlIGFwcFxuICAgIGFwcC5zdGFydFxuICAgICAgc3RhdGU6XG4gICAgICAgIGN1cnJlbnRVc2VyOiB0b2tlblxuICAgICAgXG4gICAgICAgXG4jIEZJWE1FIGZpZ3VyZSBvdXQgd2hhdCB0byBleHBvcnRcbmV4cG9ydE9iamVjdCA9XG4gIGFjY2Vzc1RpbWVSZW1haW5pbmc6IGFjY2Vzc1RpbWVSZW1haW5pbmdcbiAga2VlcFRva2VuRnJlc2g6IGtlZXBUb2tlbkZyZXNoXG4gIHN0YXJ0VXNlckFwcDogc3RhcnRVc2VyQXBwXG5leHBvcnQgZGVmYXVsdCBleHBvcnRPYmplY3RcbiJdfQ==
