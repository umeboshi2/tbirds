var MainChannel, MessageChannel, setupAuthModels,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import jwtDecode from 'jwt-decode';

import BasicPageableCollection from './basic-pageable-collection';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

setupAuthModels = function(appConfig) {
  var AuthCollection, AuthModel, AuthRefresh, AuthUnPaginated, auth_sync_options, currentUser, makeAuthHeader, sendAuthHeader, tokenKeyName;
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
    xhr.setRequestHeader(appConfig.authToken.requestHeader, makeAuthHeader());
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
  currentUser = new Backbone.Model({
    name: 'guest',
    fullname: 'Guest User',
    groups: []
  });
  MainChannel.reply('main:app:currentUser', function() {
    return currentUser;
  });
  MainChannel.reply('main:app:set-guest-user', function() {
    currentUser.set({
      name: 'guest',
      fullname: 'Guest User',
      groups: []
    });
  });
  MainChannel.reply('main:app:set-auth-token', function(token) {
    return localStorage.setItem(tokenKeyName, token);
  });
  MainChannel.reply('main:app:decode-auth-token', function() {
    var decoded, token;
    token = localStorage.getItem(tokenKeyName);
    if (token) {
      decoded = jwtDecode(token);
      currentUser.set(decoded);
      return currentUser.toJSON();
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
        window.location.hash = loginUrl;
      } else {
        msg = 'There was a problem refreshing the access token';
        MessageChannel.request('warning', msg);
      }
    });
    return response.done(function() {
      var decoded, token;
      token = refresh.get('token');
      decoded = jwtDecode(token);
      localStorage.setItem(tokenKeyName, token);
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
    localStorage.removeItem(tokenKeyName);
    return MainChannel.request('main:app:set-guest-user');
  });
};

export default setupAuthModels;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG1vZGVscy5qcyIsInNvdXJjZXMiOlsiYXV0aG1vZGVscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFHQSxPQUFPLHVCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZUFBQSxHQUFrQixRQUFBLENBQUMsU0FBRCxDQUFBO0FBQ2hCLE1BQUEsY0FBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsZUFBQSxFQUFBLGlCQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBLEVBQUE7RUFBQSxZQUFBLEdBQWUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxZQUFwQixJQUFvQztFQUVuRCxjQUFBLEdBQWlCLFFBQUEsQ0FBQSxDQUFBO0FBR2YsUUFBQSxLQUFBOzs7SUFBQSxLQUFBLEdBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsWUFBckI7QUFDUixXQUFPLENBQUEsQ0FBQSxDQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBdkIsRUFBQSxDQUFBLENBQXFDLEtBQXJDLENBQUE7RUFKUTtFQU1qQixjQUFBLEdBQWlCLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDZixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzlCLE9BQUEsR0FBVSxjQUFBLENBQUE7SUFDVixHQUFHLENBQUMsZ0JBQUosQ0FBcUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUF6QyxFQUF3RCxjQUFBLENBQUEsQ0FBeEQ7RUFIZTtFQU1qQixXQUFXLENBQUMsS0FBWixDQUFrQix5QkFBbEIsRUFBNkMsUUFBQSxDQUFB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QVA7QUFDRSxhQUFPLEtBRFQ7O0FBRUEsV0FBTyxJQUFJLFFBQVEsQ0FBQyxLQUFiLENBQW1CLEtBQW5CO0VBTnlCLENBQWxDO0VBUUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsNkJBQWxCLEVBQWlELFFBQUEsQ0FBQSxDQUFBO0lBQy9DLFlBQVksQ0FBQyxVQUFiLENBQXdCLFlBQXhCO1dBQ0EsV0FBVyxDQUFDLE9BQVosQ0FBb0IseUJBQXBCO0VBRitDLENBQWpEO0FBN0dnQjs7QUFtSGxCLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBqd3REZWNvZGUgZnJvbSAnand0LWRlY29kZSdcblxuI3tCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvbn0gPSByZXF1aXJlICcuL2Jhc2ljLXBhZ2VhYmxlLWNvbGxlY3Rpb24nXG5pbXBvcnQgQmFzaWNQYWdlYWJsZUNvbGxlY3Rpb24gZnJvbSAnLi9iYXNpYy1wYWdlYWJsZS1jb2xsZWN0aW9uJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbnNldHVwQXV0aE1vZGVscyA9IChhcHBDb25maWcpIC0+XG4gIHRva2VuS2V5TmFtZSA9IGFwcENvbmZpZy5hdXRoVG9rZW4udG9rZW5LZXlOYW1lIG9yICdhdXRoX3Rva2VuJ1xuXG4gIG1ha2VBdXRoSGVhZGVyID0gLT5cbiAgICAjIHJldHJpZXZlIGZyb20gbG9jYWwgc3RvcmFnZSBvbiBlYWNoIHJlcXVlc3RcbiAgICAjIHRvIGVuc3VyZSBjdXJyZW50IHRva2VuXG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSB0b2tlbktleU5hbWVcbiAgICByZXR1cm4gXCIje2FwcENvbmZpZy5hdXRoVG9rZW4uYmVhcmVyTmFtZX0gI3t0b2tlbn1cIlxuICBcbiAgc2VuZEF1dGhIZWFkZXIgPSAoeGhyKSAtPlxuICAgIHJoZWFkZXIgPSBhcHBDb25maWcuYXV0aFRva2VuLnJlcXVlc3RIZWFkZXJcbiAgICBhaGVhZGVyID0gbWFrZUF1dGhIZWFkZXIoKVxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIGFwcENvbmZpZy5hdXRoVG9rZW4ucmVxdWVzdEhlYWRlciwgbWFrZUF1dGhIZWFkZXIoKVxuICAgIHJldHVyblxuICAgIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6YXV0aEJlZm9yZVNlbmQnLCAtPlxuICAgIHJldHVybiBzZW5kQXV0aEhlYWRlclxuICBcblxuICBhdXRoX3N5bmNfb3B0aW9ucyA9IChvcHRpb25zKSAtPlxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgb3B0aW9ucy5iZWZvcmVTZW5kID0gc2VuZEF1dGhIZWFkZXJcbiAgICByZXR1cm4gb3B0aW9uc1xuXG4gIGNsYXNzIEF1dGhNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gICAgc3luYzogKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIC0+XG4gICAgICBvcHRpb25zID0gYXV0aF9zeW5jX29wdGlvbnMgb3B0aW9uc1xuICAgICAgc3VwZXIgbWV0aG9kLCBtb2RlbCwgb3B0aW9uc1xuXG4gIGNsYXNzIEF1dGhDb2xsZWN0aW9uIGV4dGVuZHMgQmFzaWNQYWdlYWJsZUNvbGxlY3Rpb25cbiAgICBzeW5jOiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykgLT5cbiAgICAgIG9wdGlvbnMgPSBhdXRoX3N5bmNfb3B0aW9ucyBvcHRpb25zXG4gICAgICBzdXBlciBtZXRob2QsIG1vZGVsLCBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aFVuUGFnaW5hdGVkIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICAgIHN5bmM6IChtZXRob2QsIG1vZGVsLCBvcHRpb25zKSAtPlxuICAgICAgb3B0aW9ucyA9IGF1dGhfc3luY19vcHRpb25zIG9wdGlvbnNcbiAgICAgIHN1cGVyIG1ldGhvZCwgbW9kZWwsIG9wdGlvbnNcbiAgICBwYXJzZTogKHJlc3BvbnNlKSAtPlxuICAgICAgc3VwZXIgcmVzcG9uc2UuaXRlbXNcbiAgICBcbiAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoTW9kZWwnLCAtPlxuICAgIHJldHVybiBBdXRoTW9kZWxcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhDb2xsZWN0aW9uJywgLT5cbiAgICByZXR1cm4gQXV0aENvbGxlY3Rpb25cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhVblBhZ2luYXRlZCcsIC0+XG4gICAgcmV0dXJuIEF1dGhVblBhZ2luYXRlZFxuXG4gIGNsYXNzIEF1dGhSZWZyZXNoIGV4dGVuZHMgQXV0aE1vZGVsXG4gICAgdXJsOiBhcHBDb25maWcuYXV0aFRva2VuLnJlZnJlc2hVcmxcblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aFJlZnJlc2gnLCAtPlxuICAgIHJldHVybiBBdXRoUmVmcmVzaFxuXG4gIGN1cnJlbnRVc2VyID0gbmV3IEJhY2tib25lLk1vZGVsXG4gICAgbmFtZTogJ2d1ZXN0J1xuICAgIGZ1bGxuYW1lOiAnR3Vlc3QgVXNlcidcbiAgICBncm91cHM6IFtdXG4gICAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjdXJyZW50VXNlcicsIC0+XG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpzZXQtZ3Vlc3QtdXNlcicsIC0+XG4gICAgY3VycmVudFVzZXIuc2V0XG4gICAgICBuYW1lOiAnZ3Vlc3QnXG4gICAgICBmdWxsbmFtZTogJ0d1ZXN0IFVzZXInXG4gICAgICBncm91cHM6IFtdXG4gICAgcmV0dXJuXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNldC1hdXRoLXRva2VuJywgKHRva2VuKSAtPlxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIHRva2VuS2V5TmFtZSwgdG9rZW5cbiAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJywgLT5cbiAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtIHRva2VuS2V5TmFtZVxuICAgIGlmIHRva2VuXG4gICAgICBkZWNvZGVkID0gand0RGVjb2RlIHRva2VuXG4gICAgICBjdXJyZW50VXNlci5zZXQgZGVjb2RlZFxuICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyLnRvSlNPTigpXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHt9XG5cblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cmVmcmVzaC10b2tlbicsIChsb2dpblVybCkgLT5cbiAgICB1bmxlc3MgdG9rZW5LZXlOYW1lIGluIE9iamVjdC5rZXlzIGxvY2FsU3RvcmFnZVxuICAgICAgcmV0dXJuXG4gICAgbG9naW5VcmwgPSBsb2dpblVybCBvciBhcHBDb25maWcuYXV0aFRva2VuLmxvZ2luVXJsXG4gICAgcmVmcmVzaCA9IG5ldyBBdXRoUmVmcmVzaFxuICAgIHJlc3BvbnNlID0gcmVmcmVzaC5mZXRjaCgpXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgaWYgcmVzcG9uc2Uuc3RhdHVzID09IDQwMVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGxvZ2luVXJsXG4gICAgICBlbHNlXG4gICAgICAgIG1zZyA9ICdUaGVyZSB3YXMgYSBwcm9ibGVtIHJlZnJlc2hpbmcgdGhlIGFjY2VzcyB0b2tlbidcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIG1zZ1xuICAgICAgcmV0dXJuXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgdG9rZW4gPSByZWZyZXNoLmdldCAndG9rZW4nXG4gICAgICBkZWNvZGVkID0gand0RGVjb2RlIHRva2VuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSB0b2tlbktleU5hbWUsIHRva2VuXG4gICAgICByZXR1cm5cbiAgICAgIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnY3VycmVudC11c2VyJywgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLndhcm4gXCJXZSBuZWVkIHRvIHJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJyBpbnN0ZWFkXCJcbiAgICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICAgIHVubGVzcyB0b2tlblxuICAgICAgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gbmV3IEJhY2tib25lLk1vZGVsIHRva2VuXG4gIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZGVzdHJveS1hdXRoLXRva2VuJywgLT5cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSB0b2tlbktleU5hbWVcbiAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpzZXQtZ3Vlc3QtdXNlcidcblxuICByZXR1cm5cbiAgXG5leHBvcnQgZGVmYXVsdCBzZXR1cEF1dGhNb2RlbHNcbiAgXG4iXX0=
