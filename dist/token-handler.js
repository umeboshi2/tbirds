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
    refresh = new AuthRefresh;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taGFuZGxlci5qcyIsInNvdXJjZXMiOlsidG9rZW4taGFuZGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLG1CQUFBLEVBQUEsWUFBQSxFQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsRUFBQSxpQkFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRWpCLFdBQUEsR0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ1osTUFBQSxHQUFBLEVBQUE7RUFBQSxHQUFBLEdBQU0sSUFBSSxJQUFKLENBQUE7RUFDTixHQUFBLEdBQU0sSUFBSSxJQUFKLENBQVMsS0FBSyxDQUFDLEdBQU4sR0FBWSxJQUFyQjtBQUNOLFNBQU8sR0FBQSxHQUFNO0FBSEQ7O0FBS2QsbUJBQUEsR0FBc0IsUUFBQSxDQUFBLENBQUE7QUFDcEIsTUFBQSxTQUFBLEVBQUE7RUFBQSxLQUFBLEdBQVEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0VBQ1IsSUFBRyxXQUFBLENBQVksS0FBWixDQUFIO0FBQ0UsV0FBTyxFQURUOztFQUVBLFNBQUEsR0FBWSxXQUFBLENBQVksS0FBWjtBQUNaLFNBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFBLEdBQVksSUFBdkI7QUFMYTs7QUFPdEIsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQUE7QUFDbEIsTUFBQSxZQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUE7RUFBQSxPQUFBLEdBQVUsT0FBQSxJQUFXLENBQUE7RUFDckIsU0FB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QUMsT0FBWixDQUFvQiw0QkFBcEI7UUFBYjtNQURGLENBREY7SUFMWSxDQUFkLEVBYkc7R0FBQSxNQUFBOztXQXVCSCxHQUFHLENBQUMsS0FBSixDQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsV0FBQSxFQUFhO01BQWI7SUFERixDQURGLEVBdkJHOztBQU5RLEVBbERmOzs7O0FBcUZBLFlBQUEsR0FDRTtFQUFBLG1CQUFBLEVBQXFCLG1CQUFyQjtFQUNBLGNBQUEsRUFBZ0IsY0FEaEI7RUFFQSxZQUFBLEVBQWM7QUFGZDs7QUFHRixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgbXMgZnJvbSAnbXMnXG5cbmltcG9ydCBvYmplY3RFbXB0eSBmcm9tICcuL3V0aWwvb2JqZWN0LWVtcHR5J1xuXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxubXNSZW1haW5pbmcgPSAodG9rZW4pIC0+XG4gIG5vdyA9IG5ldyBEYXRlKClcbiAgZXhwID0gbmV3IERhdGUodG9rZW4uZXhwICogMTAwMClcbiAgcmV0dXJuIGV4cCAtIG5vd1xuXG5hY2Nlc3NUaW1lUmVtYWluaW5nID0gLT5cbiAgdG9rZW4gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgaWYgb2JqZWN0RW1wdHkgdG9rZW5cbiAgICByZXR1cm4gMFxuICByZW1haW5pbmcgPSBtc1JlbWFpbmluZyB0b2tlblxuICByZXR1cm4gTWF0aC5mbG9vcihyZW1haW5pbmcgLyAxMDAwKVxuXG50b2tlbk5lZWRzUmVmcmVzaCA9ICh0b2tlbiwgb3B0aW9ucykgLT5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgb3Ige31cbiAgcmVtYWluaW5nID0gbXNSZW1haW5pbmcgdG9rZW5cbiAgaW50ZXJ2YWwgPSBtcyAnNW0nXG4gIGlmICdyZWZyZXNoSW50ZXJ2YWwnIGluIE9iamVjdC5rZXlzIG9wdGlvbnNcbiAgICBpbnRlcnZhbCA9IG1zIG9wdGlvbnMucmVmcmVzaEludGVydmFsXG4gIG11bHRpcGxlID0gb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxNdWx0aXBsZSBvciAzXG4gIGFjY2Vzc1BlcmlvZCA9IDEwMDAgKiAodG9rZW4uZXhwIC0gdG9rZW4uaWF0KVxuICByZWZyZXNoV2hlbiA9IGFjY2Vzc1BlcmlvZCAtIChtdWx0aXBsZSAqIGludGVydmFsKVxuICByZXR1cm4gcmVtYWluaW5nIDwgcmVmcmVzaFdoZW5cbiAgXG4gIFxua2VlcFRva2VuRnJlc2ggPSAob3B0aW9ucykgLT5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgb3Ige31cbiAgdG9rZW4gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgaWYgdG9rZW5OZWVkc1JlZnJlc2ggdG9rZW4sIG9wdGlvbnNcbiAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpyZWZyZXNoLXRva2VuJywgb3B0aW9ucy5sb2dpblVybFxuXG5pbml0VG9rZW4gPSAtPlxuICByZW1haW5pbmcgPSBhY2Nlc3NUaW1lUmVtYWluaW5nKClcbiAgdG9rZW4gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgaWYgcmVtYWluaW5nIDw9IDAgYW5kIG5vdCBvYmplY3RFbXB0eSB0b2tlblxuICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCAnZGVsZXRpbmcgZXhwaXJlZCBhY2Nlc3MgdG9rZW4nXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVzdHJveS1hdXRoLXRva2VuJ1xuICB0b2tlblxuXG4jIHNldHVwQXV0aE1vZGVscyhhcHBDb25maWcpIG5lZWRzIHRvIGJlIGNhbGxlZFxuIyBiZWZvcmUgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLlxuIyBleDogXCJyZXF1aXJlKCcuL2F1dGhtb2RlbHMnKShhcHBDb25maWcpXCJcbnN0YXJ0VXNlckFwcCA9IChhcHAsIGFwcENvbmZpZykgLT5cbiAgdG9rZW4gPSBpbml0VG9rZW4oKVxuICBpZiBvYmplY3RFbXB0eSB0b2tlblxuICAgIGFwcC5zdGFydFxuICAgICAgc3RhdGU6XG4gICAgICAgIGN1cnJlbnRVc2VyOiBudWxsXG4gIGVsc2UgaWYgdG9rZW5OZWVkc1JlZnJlc2ggdG9rZW4sIGFwcENvbmZpZy5hdXRoVG9rZW5cbiAgICBBdXRoUmVmcmVzaCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOkF1dGhSZWZyZXNoJ1xuICAgIHJlZnJlc2ggPSBuZXcgQXV0aFJlZnJlc2hcbiAgICByZXNwb25zZSA9IHJlZnJlc2guZmV0Y2goKVxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIGlmIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDFcbiAgICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVzdHJveS1hdXRoLXRva2VuJ1xuICAgICAgICBpZiBhcHBDb25maWcubmVlZExvZ2luXG4gICAgICAgICAgbG9naW5VcmwgPSBhcHBDb25maWcuYXV0aFRva2VuLmxvZ2luVXJsIG9yIFwiI2xvZ2luXCJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGxvZ2luVXJsXG4gICAgICBhcHAuc3RhcnRcbiAgICAgICAgc3RhdGU6XG4gICAgICAgICAgY3VycmVudFVzZXI6IG51bGxcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBwcm9wZXJ0eSA9IGFwcENvbmZpZy5hdXRoVG9rZW4udG9rZW5SZXNwb25zZVByb3BlcnR5IG9yICd0b2tlbidcbiAgICAgIHRva2VuID0gcmVmcmVzaC5nZXQgcHJvcGVydHlcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnNldC1hdXRoLXRva2VuJywgdG9rZW5cbiAgICAgICMgc3RhcnQgdGhlIGFwcFxuICAgICAgYXBwLnN0YXJ0XG4gICAgICAgIHN0YXRlOlxuICAgICAgICAgIGN1cnJlbnRVc2VyOiBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgZWxzZVxuICAgICMgc3RhcnQgdGhlIGFwcFxuICAgIGFwcC5zdGFydFxuICAgICAgc3RhdGU6XG4gICAgICAgIGN1cnJlbnRVc2VyOiB0b2tlblxuICAgICAgXG4gICAgICAgXG4jIEZJWE1FIGZpZ3VyZSBvdXQgd2hhdCB0byBleHBvcnRcbmV4cG9ydE9iamVjdCA9XG4gIGFjY2Vzc1RpbWVSZW1haW5pbmc6IGFjY2Vzc1RpbWVSZW1haW5pbmdcbiAga2VlcFRva2VuRnJlc2g6IGtlZXBUb2tlbkZyZXNoXG4gIHN0YXJ0VXNlckFwcDogc3RhcnRVc2VyQXBwXG5leHBvcnQgZGVmYXVsdCBleHBvcnRPYmplY3RcbiJdfQ==
