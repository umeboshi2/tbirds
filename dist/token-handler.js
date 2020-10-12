var MainChannel, MessageChannel, accessTimeRemaining, exportObject, initToken, keepTokenFresh, msRemaining, startUserApp, tokenNeedsRefresh,
  indexOf = [].indexOf;

import Backbone from 'backbone';

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
    refresh = new AuthRefresh();
    response = refresh.fetch();
    response.fail(function() {
      var loginUrl;
      if (response.status === 401) {
        MainChannel.request('main:app:destroy-auth-token');
        if (appConfig.needLogin) {
          loginUrl = appConfig.authToken.loginUrl || "#login";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taGFuZGxlci5qcyIsInNvdXJjZXMiOlsidG9rZW4taGFuZGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLG1CQUFBLEVBQUEsWUFBQSxFQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsRUFBQSxpQkFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRWpCLFdBQUEsR0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ2QsTUFBQSxHQUFBLEVBQUE7RUFBRSxHQUFBLEdBQU0sSUFBSSxJQUFKLENBQUE7RUFDTixHQUFBLEdBQU0sSUFBSSxJQUFKLENBQVMsS0FBSyxDQUFDLEdBQU4sR0FBWSxJQUFyQjtBQUNOLFNBQU8sR0FBQSxHQUFNO0FBSEQ7O0FBS2QsbUJBQUEsR0FBc0IsUUFBQSxDQUFBLENBQUE7QUFDdEIsTUFBQSxTQUFBLEVBQUE7RUFBRSxLQUFBLEdBQVEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0VBQ1IsSUFBRyxXQUFBLENBQVksS0FBWixDQUFIO0FBQ0UsV0FBTyxFQURUOztFQUVBLFNBQUEsR0FBWSxXQUFBLENBQVksS0FBWjtBQUNaLFNBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFBLEdBQVksSUFBdkI7QUFMYTs7QUFPdEIsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQUE7QUFDcEIsTUFBQSxZQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUE7RUFBRSxPQUFBLEdBQVUsT0FBQSxJQUFXLENBQUE7RUFDckIsU0FB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QyxPQUFaLENBQW9CLDRCQUFwQjtRQUFiO01BREYsQ0FERjtJQUxZLENBQWQsRUFiRztHQUFBLE1BQUE7O1dBdUJILEdBQUcsQ0FBQyxLQUFKLENBQ0U7TUFBQSxLQUFBLEVBQ0U7UUFBQSxXQUFBLEVBQWE7TUFBYjtJQURGLENBREYsRUF2Qkc7O0FBTlEsRUFsRGY7Ozs7QUFxRkEsWUFBQSxHQUNFO0VBQUEsbUJBQUEsRUFBcUIsbUJBQXJCO0VBQ0EsY0FBQSxFQUFnQixjQURoQjtFQUVBLFlBQUEsRUFBYztBQUZkOztBQUdGLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBtcyBmcm9tICdtcydcblxuaW1wb3J0IG9iamVjdEVtcHR5IGZyb20gJy4vdXRpbC9vYmplY3QtZW1wdHknXG5cblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5tc1JlbWFpbmluZyA9ICh0b2tlbikgLT5cbiAgbm93ID0gbmV3IERhdGUoKVxuICBleHAgPSBuZXcgRGF0ZSh0b2tlbi5leHAgKiAxMDAwKVxuICByZXR1cm4gZXhwIC0gbm93XG5cbmFjY2Vzc1RpbWVSZW1haW5pbmcgPSAtPlxuICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICBpZiBvYmplY3RFbXB0eSB0b2tlblxuICAgIHJldHVybiAwXG4gIHJlbWFpbmluZyA9IG1zUmVtYWluaW5nIHRva2VuXG4gIHJldHVybiBNYXRoLmZsb29yKHJlbWFpbmluZyAvIDEwMDApXG5cbnRva2VuTmVlZHNSZWZyZXNoID0gKHRva2VuLCBvcHRpb25zKSAtPlxuICBvcHRpb25zID0gb3B0aW9ucyBvciB7fVxuICByZW1haW5pbmcgPSBtc1JlbWFpbmluZyB0b2tlblxuICBpbnRlcnZhbCA9IG1zICc1bSdcbiAgaWYgJ3JlZnJlc2hJbnRlcnZhbCcgaW4gT2JqZWN0LmtleXMgb3B0aW9uc1xuICAgIGludGVydmFsID0gbXMgb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxcbiAgbXVsdGlwbGUgPSBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbE11bHRpcGxlIG9yIDNcbiAgYWNjZXNzUGVyaW9kID0gMTAwMCAqICh0b2tlbi5leHAgLSB0b2tlbi5pYXQpXG4gIHJlZnJlc2hXaGVuID0gYWNjZXNzUGVyaW9kIC0gKG11bHRpcGxlICogaW50ZXJ2YWwpXG4gIHJldHVybiByZW1haW5pbmcgPCByZWZyZXNoV2hlblxuICBcbiAgXG5rZWVwVG9rZW5GcmVzaCA9IChvcHRpb25zKSAtPlxuICBvcHRpb25zID0gb3B0aW9ucyBvciB7fVxuICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICBpZiB0b2tlbk5lZWRzUmVmcmVzaCB0b2tlbiwgb3B0aW9uc1xuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnJlZnJlc2gtdG9rZW4nLCBvcHRpb25zLmxvZ2luVXJsXG5cbmluaXRUb2tlbiA9IC0+XG4gIHJlbWFpbmluZyA9IGFjY2Vzc1RpbWVSZW1haW5pbmcoKVxuICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICBpZiByZW1haW5pbmcgPD0gMCBhbmQgbm90IG9iamVjdEVtcHR5IHRva2VuXG4gICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsICdkZWxldGluZyBleHBpcmVkIGFjY2VzcyB0b2tlbidcbiAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZXN0cm95LWF1dGgtdG9rZW4nXG4gIHRva2VuXG5cbiMgc2V0dXBBdXRoTW9kZWxzKGFwcENvbmZpZykgbmVlZHMgdG8gYmUgY2FsbGVkXG4jIGJlZm9yZSBjYWxsaW5nIHRoaXMgZnVuY3Rpb24uXG4jIGV4OiBcInJlcXVpcmUoJy4vYXV0aG1vZGVscycpKGFwcENvbmZpZylcIlxuc3RhcnRVc2VyQXBwID0gKGFwcCwgYXBwQ29uZmlnKSAtPlxuICB0b2tlbiA9IGluaXRUb2tlbigpXG4gIGlmIG9iamVjdEVtcHR5IHRva2VuXG4gICAgYXBwLnN0YXJ0XG4gICAgICBzdGF0ZTpcbiAgICAgICAgY3VycmVudFVzZXI6IG51bGxcbiAgZWxzZSBpZiB0b2tlbk5lZWRzUmVmcmVzaCB0b2tlbiwgYXBwQ29uZmlnLmF1dGhUb2tlblxuICAgIEF1dGhSZWZyZXNoID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6QXV0aFJlZnJlc2gnXG4gICAgcmVmcmVzaCA9IG5ldyBBdXRoUmVmcmVzaFxuICAgIHJlc3BvbnNlID0gcmVmcmVzaC5mZXRjaCgpXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgaWYgcmVzcG9uc2Uuc3RhdHVzID09IDQwMVxuICAgICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZXN0cm95LWF1dGgtdG9rZW4nXG4gICAgICAgIGlmIGFwcENvbmZpZy5uZWVkTG9naW5cbiAgICAgICAgICBsb2dpblVybCA9IGFwcENvbmZpZy5hdXRoVG9rZW4ubG9naW5Vcmwgb3IgXCIjbG9naW5cIlxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbG9naW5VcmxcbiAgICAgIGFwcC5zdGFydFxuICAgICAgICBzdGF0ZTpcbiAgICAgICAgICBjdXJyZW50VXNlcjogbnVsbFxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIHByb3BlcnR5ID0gYXBwQ29uZmlnLmF1dGhUb2tlbi50b2tlblJlc3BvbnNlUHJvcGVydHkgb3IgJ3Rva2VuJ1xuICAgICAgdG9rZW4gPSByZWZyZXNoLmdldCBwcm9wZXJ0eVxuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCB0b2tlblxuICAgICAgIyBzdGFydCB0aGUgYXBwXG4gICAgICBhcHAuc3RhcnRcbiAgICAgICAgc3RhdGU6XG4gICAgICAgICAgY3VycmVudFVzZXI6IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICBlbHNlXG4gICAgIyBzdGFydCB0aGUgYXBwXG4gICAgYXBwLnN0YXJ0XG4gICAgICBzdGF0ZTpcbiAgICAgICAgY3VycmVudFVzZXI6IHRva2VuXG4gICAgICBcbiAgICAgICBcbiMgRklYTUUgZmlndXJlIG91dCB3aGF0IHRvIGV4cG9ydFxuZXhwb3J0T2JqZWN0ID1cbiAgYWNjZXNzVGltZVJlbWFpbmluZzogYWNjZXNzVGltZVJlbWFpbmluZ1xuICBrZWVwVG9rZW5GcmVzaDoga2VlcFRva2VuRnJlc2hcbiAgc3RhcnRVc2VyQXBwOiBzdGFydFVzZXJBcHBcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydE9iamVjdFxuIl19
