var Backbone, BasicPageableCollection, MainChannel, MessageChannel, jwtDecode, navigate_to_url, setupAuthModels,
  indexOf = [].indexOf;

Backbone = require('backbone');

navigate_to_url = require('tbirds/util/navigate-to-url');

jwtDecode = require('jwt-decode');

BasicPageableCollection = require('./basic-pageable-collection');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

setupAuthModels = function(appConfig) {
  var AuthCollection, AuthModel, AuthRefresh, AuthUnPaginated, auth_sync_options, makeAuthHeader, sendAuthHeader, tokenKeyName;
  tokenKeyName = appConfig.authToken.tokenKeyName || 'auth_token';
  makeAuthHeader = function() {
    var token;
    // retrieve from local storage on each request
    // to ensure current token
    token = localStorage.getItem(tokenKeyName);
    return `${appConfig.authToken.bearerName} ${token}`;
  };
  sendAuthHeader = function(xhr) {
    var aheader, rheader;
    rheader = appConfig.authToken.requestHeader;
    aheader = makeAuthHeader();
    console.log("RHEADER", rheader);
    console.log("AHEADER", aheader);
    return xhr.setRequestHeader(appConfig.authToken.requestHeader, makeAuthHeader());
  };
  MainChannel.reply('main:app:authBeforeSend', function() {
    return sendAuthHeader;
  });
  auth_sync_options = function(options) {
    options = options || {};
    options.beforeSend = sendAuthHeader;
    return options;
  };
  AuthModel = class AuthModel extends Backbone.Model {
    sync(method, model, options) {
      options = auth_sync_options(options);
      return super.sync(method, model, options);
    }

  };
  AuthCollection = class AuthCollection extends BasicPageableCollection {
    sync(method, model, options) {
      options = auth_sync_options(options);
      return super.sync(method, model, options);
    }

  };
  AuthUnPaginated = class AuthUnPaginated extends Backbone.Collection {
    sync(method, model, options) {
      options = auth_sync_options(options);
      return super.sync(method, model, options);
    }

    parse(response) {
      return super.parse(response.items);
    }

  };
  MainChannel.reply('main:app:AuthModel', function() {
    return AuthModel;
  });
  MainChannel.reply('main:app:AuthCollection', function() {
    return AuthCollection;
  });
  MainChannel.reply('main:app:AuthUnPaginated', function() {
    return AuthUnPaginated;
  });
  AuthRefresh = (function() {
    class AuthRefresh extends AuthModel {};

    AuthRefresh.prototype.url = appConfig.authToken.refreshUrl;

    return AuthRefresh;

  }).call(this);
  MainChannel.reply('main:app:AuthRefresh', function() {
    return AuthRefresh;
  });
  MainChannel.reply('main:app:set-auth-token', function(token) {
    return localStorage.setItem(tokenKeyName, token);
  });
  MainChannel.reply('main:app:decode-auth-token', function() {
    var token;
    token = localStorage.getItem(tokenKeyName);
    if (token) {
      return jwtDecode(token);
    } else {
      return {};
    }
  });
  MainChannel.reply('main:app:refresh-token', function(loginUrl) {
    var refresh, response;
    if (indexOf.call(Object.keys(localStorage), tokenKeyName) < 0) {
      return;
    }
    loginUrl = loginUrl || appConfig.authToken.loginUrl;
    refresh = new AuthRefresh;
    response = refresh.fetch();
    response.fail(function() {
      var msg;
      if (response.status === 401) {
        return window.location.hash = loginUrl;
      } else {
        msg = 'There was a problem refreshing the access token';
        return MessageChannel.request('warning', msg);
      }
    });
    return response.done(function() {
      var decoded, token;
      token = refresh.get('token');
      decoded = jwtDecode(token);
      return localStorage.setItem(tokenKeyName, token);
    });
  });
  MainChannel.reply('current-user', function() {
    var token;
    if (__DEV__) {
      console.warn("We need to request 'main:app:decode-auth-token' instead");
    }
    token = MainChannel.request('main:app:decode-auth-token');
    if (!token) {
      return null;
    }
    return new Backbone.Model(token);
  });
  MainChannel.reply('main:app:destroy-auth-token', function() {
    return localStorage.removeItem(tokenKeyName);
  });
};

module.exports = setupAuthModels;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG1vZGVscy5qcyIsInNvdXJjZXMiOlsiYXV0aG1vZGVscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsdUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFNBQUEsRUFBQSxlQUFBLEVBQUEsZUFBQTtFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxlQUFBLEdBQWtCLE9BQUEsQ0FBUSw2QkFBUjs7QUFDbEIsU0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSOztBQUNaLHVCQUFBLEdBQTBCLE9BQUEsQ0FBUSw2QkFBUjs7QUFFMUIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZUFBQSxHQUFrQixRQUFBLENBQUMsU0FBRCxDQUFBO0FBQ2hCLE1BQUEsY0FBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsZUFBQSxFQUFBLGlCQUFBLEVBQUEsY0FBQSxFQUFBLGNBQUEsRUFBQTtFQUFBLFlBQUEsR0FBZSxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQXBCLElBQW9DO0VBRW5ELGNBQUEsR0FBaUIsUUFBQSxDQUFBLENBQUE7QUFHZixRQUFBLEtBQUE7OztJQUFBLEtBQUEsR0FBUSxZQUFZLENBQUMsT0FBYixDQUFxQixZQUFyQjtXQUNSLENBQUEsQ0FBQSxDQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBdkIsRUFBQSxDQUFBLENBQXFDLEtBQXJDLENBQUE7RUFKZTtFQU1qQixjQUFBLEdBQWlCLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDZixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzlCLE9BQUEsR0FBVSxjQUFBLENBQUE7SUFDVixPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBdUIs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QUNkLFFBQUEsR0FBVyxPQUFPLENBQUMsS0FBUixDQUFBO0lBQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFBLENBQUEsQ0FBQTtBQUNaLFVBQUE7TUFBQSxJQUFHLFFBQVEsQ0FBQyxNQUFULEtBQW1CLEdBQXRCO2VBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFoQixHQUF1QixTQUR6QjtPQUFBLE1BQUE7UUFHRSxHQUFBLEdBQU07ZUFDTixjQUFjLENBQUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyxHQUFsQyxFQUpGOztJQURZLENBQWQ7V0FNQSxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0FBQ1osVUFBQSxPQUFBLEVBQUE7TUFBQSxLQUFBLEdBQVEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaO01BQ1IsT0FBQSxHQUFVLFNBQUEsQ0FBVSxLQUFWO2FBQ1YsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsWUFBckIsRUFBbUMsS0FBbkM7SUFIWSxDQUFkO0VBWjBDLENBQTVDO0VBaUJBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGNBQWxCLEVBQWtDLFFBQUEsQ0FBQSxDQUFBO0FBQ2hDLFFBQUE7SUFBQSxJQUFHLE9BQUg7TUFDRSxPQUFPLENBQUMsSUFBUixDQUFhLHlEQUFiLEVBREY7O0lBRUEsS0FBQSxHQUFRLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtJQUNSLElBQUEsQ0FBTyxLQUFQO0FBQ0UsYUFBTyxLQURUOztBQUVBLFdBQU8sSUFBSSxRQUFRLENBQUMsS0FBYixDQUFtQixLQUFuQjtFQU55QixDQUFsQztFQVFBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLDZCQUFsQixFQUFpRCxRQUFBLENBQUEsQ0FBQTtXQUMvQyxZQUFZLENBQUMsVUFBYixDQUF3QixZQUF4QjtFQUQrQyxDQUFqRDtBQTVGZ0I7O0FBaUdsQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICd0YmlyZHMvdXRpbC9uYXZpZ2F0ZS10by11cmwnXG5qd3REZWNvZGUgPSByZXF1aXJlICdqd3QtZGVjb2RlJ1xuQmFzaWNQYWdlYWJsZUNvbGxlY3Rpb24gPSByZXF1aXJlICcuL2Jhc2ljLXBhZ2VhYmxlLWNvbGxlY3Rpb24nXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuc2V0dXBBdXRoTW9kZWxzID0gKGFwcENvbmZpZykgLT5cbiAgdG9rZW5LZXlOYW1lID0gYXBwQ29uZmlnLmF1dGhUb2tlbi50b2tlbktleU5hbWUgb3IgJ2F1dGhfdG9rZW4nXG5cbiAgbWFrZUF1dGhIZWFkZXIgPSAtPlxuICAgICMgcmV0cmlldmUgZnJvbSBsb2NhbCBzdG9yYWdlIG9uIGVhY2ggcmVxdWVzdFxuICAgICMgdG8gZW5zdXJlIGN1cnJlbnQgdG9rZW5cbiAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtIHRva2VuS2V5TmFtZVxuICAgIFwiI3thcHBDb25maWcuYXV0aFRva2VuLmJlYXJlck5hbWV9ICN7dG9rZW59XCJcbiAgXG4gIHNlbmRBdXRoSGVhZGVyID0gKHhocikgLT5cbiAgICByaGVhZGVyID0gYXBwQ29uZmlnLmF1dGhUb2tlbi5yZXF1ZXN0SGVhZGVyXG4gICAgYWhlYWRlciA9IG1ha2VBdXRoSGVhZGVyKClcbiAgICBjb25zb2xlLmxvZyBcIlJIRUFERVJcIiwgcmhlYWRlclxuICAgIGNvbnNvbGUubG9nIFwiQUhFQURFUlwiLCBhaGVhZGVyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgYXBwQ29uZmlnLmF1dGhUb2tlbi5yZXF1ZXN0SGVhZGVyLCBtYWtlQXV0aEhlYWRlcigpXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmF1dGhCZWZvcmVTZW5kJywgLT5cbiAgICBzZW5kQXV0aEhlYWRlclxuICBcblxuICBhdXRoX3N5bmNfb3B0aW9ucyA9IChvcHRpb25zKSAtPlxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgb3B0aW9ucy5iZWZvcmVTZW5kID0gc2VuZEF1dGhIZWFkZXJcbiAgICBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgICBzeW5jOiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykgLT5cbiAgICAgIG9wdGlvbnMgPSBhdXRoX3N5bmNfb3B0aW9ucyBvcHRpb25zXG4gICAgICBzdXBlciBtZXRob2QsIG1vZGVsLCBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aENvbGxlY3Rpb24gZXh0ZW5kcyBCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvblxuICAgIHN5bmM6IChtZXRob2QsIG1vZGVsLCBvcHRpb25zKSAtPlxuICAgICAgb3B0aW9ucyA9IGF1dGhfc3luY19vcHRpb25zIG9wdGlvbnNcbiAgICAgIHN1cGVyIG1ldGhvZCwgbW9kZWwsIG9wdGlvbnNcblxuICBjbGFzcyBBdXRoVW5QYWdpbmF0ZWQgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gICAgc3luYzogKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIC0+XG4gICAgICBvcHRpb25zID0gYXV0aF9zeW5jX29wdGlvbnMgb3B0aW9uc1xuICAgICAgc3VwZXIgbWV0aG9kLCBtb2RlbCwgb3B0aW9uc1xuICAgIHBhcnNlOiAocmVzcG9uc2UpIC0+XG4gICAgICBzdXBlciByZXNwb25zZS5pdGVtc1xuICAgIFxuICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhNb2RlbCcsIC0+XG4gICAgQXV0aE1vZGVsXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoQ29sbGVjdGlvbicsIC0+XG4gICAgQXV0aENvbGxlY3Rpb25cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhVblBhZ2luYXRlZCcsIC0+XG4gICAgQXV0aFVuUGFnaW5hdGVkXG5cbiAgY2xhc3MgQXV0aFJlZnJlc2ggZXh0ZW5kcyBBdXRoTW9kZWxcbiAgICB1cmw6IGFwcENvbmZpZy5hdXRoVG9rZW4ucmVmcmVzaFVybFxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoUmVmcmVzaCcsIC0+XG4gICAgQXV0aFJlZnJlc2hcblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCAodG9rZW4pIC0+XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gdG9rZW5LZXlOYW1lLCB0b2tlblxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbicsIC0+XG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSB0b2tlbktleU5hbWVcbiAgICBpZiB0b2tlblxuICAgICAgand0RGVjb2RlIHRva2VuXG4gICAgZWxzZVxuICAgICAge31cblxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpyZWZyZXNoLXRva2VuJywgKGxvZ2luVXJsKSAtPlxuICAgIHVubGVzcyB0b2tlbktleU5hbWUgaW4gT2JqZWN0LmtleXMgbG9jYWxTdG9yYWdlXG4gICAgICByZXR1cm5cbiAgICBsb2dpblVybCA9IGxvZ2luVXJsIG9yIGFwcENvbmZpZy5hdXRoVG9rZW4ubG9naW5VcmxcbiAgICByZWZyZXNoID0gbmV3IEF1dGhSZWZyZXNoXG4gICAgcmVzcG9uc2UgPSByZWZyZXNoLmZldGNoKClcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBpZiByZXNwb25zZS5zdGF0dXMgPT0gNDAxXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbG9naW5VcmxcbiAgICAgIGVsc2VcbiAgICAgICAgbXNnID0gJ1RoZXJlIHdhcyBhIHByb2JsZW0gcmVmcmVzaGluZyB0aGUgYWNjZXNzIHRva2VuJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgbXNnXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgdG9rZW4gPSByZWZyZXNoLmdldCAndG9rZW4nXG4gICAgICBkZWNvZGVkID0gand0RGVjb2RlIHRva2VuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSB0b2tlbktleU5hbWUsIHRva2VuXG4gIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnY3VycmVudC11c2VyJywgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLndhcm4gXCJXZSBuZWVkIHRvIHJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJyBpbnN0ZWFkXCJcbiAgICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICAgIHVubGVzcyB0b2tlblxuICAgICAgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gbmV3IEJhY2tib25lLk1vZGVsIHRva2VuXG4gIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZGVzdHJveS1hdXRoLXRva2VuJywgLT5cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSB0b2tlbktleU5hbWVcblxuICByZXR1cm5cbiAgXG5tb2R1bGUuZXhwb3J0cyA9IHNldHVwQXV0aE1vZGVsc1xuICBcbiJdfQ==
