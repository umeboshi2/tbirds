var Backbone, MainChannel, Marionette, MessageChannel, access_time_remaining, init_token, keep_token_fresh, ms, ms_remaining, objectEmpty, start_user_app, token_needs_refresh,
  indexOf = [].indexOf;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

ms = require('ms');

objectEmpty = require('../object-empty');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

ms_remaining = function(token) {
  var exp, now;
  now = new Date();
  exp = new Date(token.exp * 1000);
  return exp - now;
};

access_time_remaining = function() {
  var remaining, token;
  token = MainChannel.request('main:app:decode-auth-token');
  if (objectEmpty(token)) {
    return 0;
  }
  remaining = ms_remaining(token);
  return Math.floor(remaining / 1000);
};

token_needs_refresh = function(token, options) {
  var access_period, interval, multiple, refresh_when, remaining;
  options = options || {};
  remaining = ms_remaining(token);
  interval = ms('5m');
  if (indexOf.call(Object.keys(options), 'refreshInterval') >= 0) {
    interval = ms(options.refreshInterval);
  }
  multiple = options.refreshIntervalMultiple || 3;
  access_period = 1000 * (token.exp - token.iat);
  refresh_when = access_period - (multiple * interval);
  return remaining < refresh_when;
};

keep_token_fresh = function(options) {
  var token;
  options = options || {};
  token = MainChannel.request('main:app:decode-auth-token');
  if (token_needs_refresh(token, options)) {
    return MainChannel.request('main:app:refresh-token', options.loginUrl);
  }
};

init_token = function() {
  var remaining, token;
  remaining = access_time_remaining();
  token = MainChannel.request('main:app:decode-auth-token');
  if (remaining <= 0 && !objectEmpty(token)) {
    MessageChannel.request('warning', 'deleting expired access token');
    MainChannel.request('main:app:destroy-auth-token');
  }
  return token;
};

start_user_app = function(app, appConfig) {
  var AuthRefresh, refresh, response, token;
  token = init_token();
  if (objectEmpty(token)) {
    return app.start({
      state: {
        currentUser: null
      }
    });
  } else if (token_needs_refresh(token, appConfig.authToken)) {
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

module.exports = {
  access_time_remaining: access_time_remaining,
  keep_token_fresh: keep_token_fresh,
  start_user_app: start_user_app
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taGFuZGxlci5qcyIsInNvdXJjZXMiOlsidG9rZW4taGFuZGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsV0FBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEscUJBQUEsRUFBQSxVQUFBLEVBQUEsZ0JBQUEsRUFBQSxFQUFBLEVBQUEsWUFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsbUJBQUE7RUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLElBQVI7O0FBRUwsV0FBQSxHQUFjLE9BQUEsQ0FBUSxpQkFBUjs7QUFHZCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVqQixZQUFBLEdBQWUsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUNiLE1BQUEsR0FBQSxFQUFBO0VBQUEsR0FBQSxHQUFNLElBQUksSUFBSixDQUFBO0VBQ04sR0FBQSxHQUFNLElBQUksSUFBSixDQUFTLEtBQUssQ0FBQyxHQUFOLEdBQVksSUFBckI7QUFDTixTQUFPLEdBQUEsR0FBTTtBQUhBOztBQUtmLHFCQUFBLEdBQXdCLFFBQUEsQ0FBQSxDQUFBO0FBQ3RCLE1BQUEsU0FBQSxFQUFBO0VBQUEsS0FBQSxHQUFRLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtFQUNSLElBQUcsV0FBQSxDQUFZLEtBQVosQ0FBSDtBQUNFLFdBQU8sRUFEVDs7RUFFQSxTQUFBLEdBQVksWUFBQSxDQUFhLEtBQWI7QUFDWixTQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsU0FBQSxHQUFZLElBQXZCO0FBTGU7O0FBT3hCLG1CQUFBLEdBQXNCLFFBQUEsQ0FBQyxLQUFELEVBQVEsT0FBUixD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b0IseUJBQXBCLEVBQStDLEtBQS9DLEVBRkE7O2FBSUEsR0FBRyxDQUFDLEtBQUosQ0FDRTtRQUFBLEtBQUEsRUFDRTtVQUFBLFdBQUEsRUFBYSxXQUFXLENBQUMsT0FBWixDQUFvQiw0QkFBcEI7UUFBYjtNQURGLENBREY7SUFMWSxDQUFkLEVBYkc7R0FBQSxNQUFBOztXQXVCSCxHQUFHLENBQUMsS0FBSixDQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsV0FBQSxFQUFhO01BQWI7SUFERixDQURGLEVBdkJHOztBQU5VOztBQW1DakIsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLHFCQUFBLEVBQXVCLHFCQUF2QjtFQUNBLGdCQUFBLEVBQWtCLGdCQURsQjtFQUVBLGNBQUEsRUFBZ0I7QUFGaEIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5tcyA9IHJlcXVpcmUgJ21zJ1xuXG5vYmplY3RFbXB0eSA9IHJlcXVpcmUgJy4uL29iamVjdC1lbXB0eSdcblxuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbm1zX3JlbWFpbmluZyA9ICh0b2tlbikgLT5cbiAgbm93ID0gbmV3IERhdGUoKVxuICBleHAgPSBuZXcgRGF0ZSh0b2tlbi5leHAgKiAxMDAwKVxuICByZXR1cm4gZXhwIC0gbm93XG5cbmFjY2Vzc190aW1lX3JlbWFpbmluZyA9IC0+XG4gIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gIGlmIG9iamVjdEVtcHR5IHRva2VuXG4gICAgcmV0dXJuIDBcbiAgcmVtYWluaW5nID0gbXNfcmVtYWluaW5nIHRva2VuXG4gIHJldHVybiBNYXRoLmZsb29yKHJlbWFpbmluZyAvIDEwMDApXG5cbnRva2VuX25lZWRzX3JlZnJlc2ggPSAodG9rZW4sIG9wdGlvbnMpIC0+XG4gIG9wdGlvbnMgPSBvcHRpb25zIG9yIHt9XG4gIHJlbWFpbmluZyA9IG1zX3JlbWFpbmluZyB0b2tlblxuICBpbnRlcnZhbCA9IG1zICc1bSdcbiAgaWYgJ3JlZnJlc2hJbnRlcnZhbCcgaW4gT2JqZWN0LmtleXMgb3B0aW9uc1xuICAgIGludGVydmFsID0gbXMgb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxcbiAgbXVsdGlwbGUgPSBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbE11bHRpcGxlIG9yIDNcbiAgYWNjZXNzX3BlcmlvZCA9IDEwMDAgKiAodG9rZW4uZXhwIC0gdG9rZW4uaWF0KVxuICByZWZyZXNoX3doZW4gPSBhY2Nlc3NfcGVyaW9kIC0gKG11bHRpcGxlICogaW50ZXJ2YWwpXG4gIHJldHVybiByZW1haW5pbmcgPCByZWZyZXNoX3doZW5cbiAgXG4gIFxua2VlcF90b2tlbl9mcmVzaCA9IChvcHRpb25zKSAtPlxuICBvcHRpb25zID0gb3B0aW9ucyBvciB7fVxuICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICBpZiB0b2tlbl9uZWVkc19yZWZyZXNoIHRva2VuLCBvcHRpb25zXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6cmVmcmVzaC10b2tlbicsIG9wdGlvbnMubG9naW5VcmxcblxuaW5pdF90b2tlbiA9IC0+XG4gIHJlbWFpbmluZyA9IGFjY2Vzc190aW1lX3JlbWFpbmluZygpXG4gIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gIGlmIHJlbWFpbmluZyA8PSAwIGFuZCBub3Qgb2JqZWN0RW1wdHkgdG9rZW5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgJ2RlbGV0aW5nIGV4cGlyZWQgYWNjZXNzIHRva2VuJ1xuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlc3Ryb3ktYXV0aC10b2tlbidcbiAgdG9rZW5cbiAgXG5zdGFydF91c2VyX2FwcCA9IChhcHAsIGFwcENvbmZpZykgLT5cbiAgdG9rZW4gPSBpbml0X3Rva2VuKClcbiAgaWYgb2JqZWN0RW1wdHkgdG9rZW5cbiAgICBhcHAuc3RhcnRcbiAgICAgIHN0YXRlOlxuICAgICAgICBjdXJyZW50VXNlcjogbnVsbFxuICBlbHNlIGlmIHRva2VuX25lZWRzX3JlZnJlc2ggdG9rZW4sIGFwcENvbmZpZy5hdXRoVG9rZW5cbiAgICBBdXRoUmVmcmVzaCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOkF1dGhSZWZyZXNoJ1xuICAgIHJlZnJlc2ggPSBuZXcgQXV0aFJlZnJlc2hcbiAgICByZXNwb25zZSA9IHJlZnJlc2guZmV0Y2goKVxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIGlmIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDFcbiAgICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVzdHJveS1hdXRoLXRva2VuJ1xuICAgICAgICBpZiBhcHBDb25maWcubmVlZExvZ2luXG4gICAgICAgICAgbG9naW5VcmwgPSBhcHBDb25maWcuYXV0aFRva2VuLmxvZ2luVXJsIG9yIFwiI2Zyb250ZG9vci9sb2dpblwiXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBsb2dpblVybFxuICAgICAgYXBwLnN0YXJ0XG4gICAgICAgIHN0YXRlOlxuICAgICAgICAgIGN1cnJlbnRVc2VyOiBudWxsXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgcHJvcGVydHkgPSBhcHBDb25maWcuYXV0aFRva2VuLnRva2VuUmVzcG9uc2VQcm9wZXJ0eSBvciAndG9rZW4nIFxuICAgICAgdG9rZW4gPSByZWZyZXNoLmdldCBwcm9wZXJ0eVxuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCB0b2tlblxuICAgICAgIyBzdGFydCB0aGUgYXBwXG4gICAgICBhcHAuc3RhcnRcbiAgICAgICAgc3RhdGU6XG4gICAgICAgICAgY3VycmVudFVzZXI6IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICBlbHNlXG4gICAgIyBzdGFydCB0aGUgYXBwXG4gICAgYXBwLnN0YXJ0XG4gICAgICBzdGF0ZTpcbiAgICAgICAgY3VycmVudFVzZXI6IHRva2VuXG4gICAgICBcbiAgICAgICBcbiAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGFjY2Vzc190aW1lX3JlbWFpbmluZzogYWNjZXNzX3RpbWVfcmVtYWluaW5nXG4gIGtlZXBfdG9rZW5fZnJlc2g6IGtlZXBfdG9rZW5fZnJlc2hcbiAgc3RhcnRfdXNlcl9hcHA6IHN0YXJ0X3VzZXJfYXBwXG4gIFxuXG5cblxuIl19
