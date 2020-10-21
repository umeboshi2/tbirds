var MainChannel, MessageChannel, setupAuthModels,
  indexOf = [].indexOf;

import {
  Model,
  Collection,
  Radio
} from 'backbone';

import jwtDecode from 'jwt-decode';

import BasicPageableCollection from './basic-pageable-collection';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

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
  AuthModel = class AuthModel extends Model {
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
  AuthUnPaginated = class AuthUnPaginated extends Collection {
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
  currentUser = new Model({
    isGuest: true,
    name: 'Guest',
    fullname: 'Guest User',
    groups: []
  });
  MainChannel.reply('main:app:currentUser', function() {
    return currentUser;
  });
  MainChannel.reply('main:app:set-guest-user', function() {
    currentUser.set({
      isGuest: true,
      name: 'Guest',
      fullname: 'Guest User',
      groups: []
    });
  });
  MainChannel.reply('main:app:set-auth-token', function(token) {
    return localStorage.setItem(tokenKeyName, token);
  });
  MainChannel.reply('main:app:decode-auth-token', function() {
    var decoded, isGuest, token;
    token = localStorage.getItem(tokenKeyName);
    if (token) {
      decoded = jwtDecode(token);
      isGuest = currentUser.get('isGuest');
      if (isGuest && decoded.uid) {
        currentUser.set('isGuest', false);
      }
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
    refresh = new AuthRefresh();
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
      var token;
      token = refresh.get('token');
      //decoded = jwtDecode token
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
    return new Model(token);
  });
  MainChannel.reply('main:app:destroy-auth-token', function() {
    localStorage.removeItem(tokenKeyName);
    return MainChannel.request('main:app:set-guest-user');
  });
};

export default setupAuthModels;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG1vZGVscy5qcyIsInNvdXJjZXMiOlsiYXV0aG1vZGVscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixVQUFoQjtFQUE0QixLQUE1QjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBRUEsT0FBTyx1QkFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBQ2QsY0FBQSxHQUFpQixLQUFLLENBQUMsT0FBTixDQUFjLFVBQWQ7O0FBRWpCLGVBQUEsR0FBa0IsUUFBQSxDQUFDLFNBQUQsQ0FBQTtBQUNsQixNQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLGVBQUEsRUFBQSxpQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsY0FBQSxFQUFBO0VBQUUsWUFBQSxHQUFlLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBcEIsSUFBb0M7RUFFbkQsY0FBQSxHQUFpQixRQUFBLENBQUEsQ0FBQTtBQUNuQixRQUFBLEtBQUE7OztJQUVJLEtBQUEsR0FBUSxZQUFZLENBQUMsT0FBYixDQUFxQixZQUFyQjtBQUNSLFdBQU8sQ0FBQSxDQUFBLENBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUF2QixFQUFBLENBQUEsQ0FBcUMsS0FBckMsQ0FBQTtFQUpRO0VBTWpCLGNBQUEsR0FBaUIsUUFBQSxDQUFDLEdBQUQsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixTQUFTLENBQUMsU0FBUyxDQUFDLGFBQXpDLEVBQXdELGNBQUEsQ0FBQSxDQUF4RDtFQURlO0VBSWpCLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHlCQUFsQixFQUE2QyxRQUFBLENBQUEsQ0FBQTtBQUMzQyxXQUFPO0VBRG9DLENBQTdDO0VBSUEsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLE9BQUQsQ0FBQTtJQUNs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QVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtJQUNSLEtBQU8sS0FBUDtBQUNFLGFBQU8sS0FEVDs7QUFFQSxXQUFPLElBQUksS0FBSixDQUFVLEtBQVY7RUFOeUIsQ0FBbEM7RUFRQSxXQUFXLENBQUMsS0FBWixDQUFrQiw2QkFBbEIsRUFBaUQsUUFBQSxDQUFBLENBQUE7SUFDL0MsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsWUFBeEI7V0FDQSxXQUFXLENBQUMsT0FBWixDQUFvQix5QkFBcEI7RUFGK0MsQ0FBakQ7QUFoSGdCOztBQXNIbEIsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwsIENvbGxlY3Rpb24sIFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgand0RGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnXG5cbmltcG9ydCBCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvbiBmcm9tICcuL2Jhc2ljLXBhZ2VhYmxlLWNvbGxlY3Rpb24nXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuc2V0dXBBdXRoTW9kZWxzID0gKGFwcENvbmZpZykgLT5cbiAgdG9rZW5LZXlOYW1lID0gYXBwQ29uZmlnLmF1dGhUb2tlbi50b2tlbktleU5hbWUgb3IgJ2F1dGhfdG9rZW4nXG5cbiAgbWFrZUF1dGhIZWFkZXIgPSAtPlxuICAgICMgcmV0cmlldmUgZnJvbSBsb2NhbCBzdG9yYWdlIG9uIGVhY2ggcmVxdWVzdFxuICAgICMgdG8gZW5zdXJlIGN1cnJlbnQgdG9rZW5cbiAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtIHRva2VuS2V5TmFtZVxuICAgIHJldHVybiBcIiN7YXBwQ29uZmlnLmF1dGhUb2tlbi5iZWFyZXJOYW1lfSAje3Rva2VufVwiXG4gIFxuICBzZW5kQXV0aEhlYWRlciA9ICh4aHIpIC0+XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgYXBwQ29uZmlnLmF1dGhUb2tlbi5yZXF1ZXN0SGVhZGVyLCBtYWtlQXV0aEhlYWRlcigpXG4gICAgcmV0dXJuXG4gICAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDphdXRoQmVmb3JlU2VuZCcsIC0+XG4gICAgcmV0dXJuIHNlbmRBdXRoSGVhZGVyXG4gIFxuXG4gIGF1dGhfc3luY19vcHRpb25zID0gKG9wdGlvbnMpIC0+XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICBvcHRpb25zLmJlZm9yZVNlbmQgPSBzZW5kQXV0aEhlYWRlclxuICAgIHJldHVybiBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aE1vZGVsIGV4dGVuZHMgTW9kZWxcbiAgICBzeW5jOiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykgLT5cbiAgICAgIG9wdGlvbnMgPSBhdXRoX3N5bmNfb3B0aW9ucyBvcHRpb25zXG4gICAgICBzdXBlciBtZXRob2QsIG1vZGVsLCBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aENvbGxlY3Rpb24gZXh0ZW5kcyBCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvblxuICAgIHN5bmM6IChtZXRob2QsIG1vZGVsLCBvcHRpb25zKSAtPlxuICAgICAgb3B0aW9ucyA9IGF1dGhfc3luY19vcHRpb25zIG9wdGlvbnNcbiAgICAgIHN1cGVyIG1ldGhvZCwgbW9kZWwsIG9wdGlvbnNcblxuICBjbGFzcyBBdXRoVW5QYWdpbmF0ZWQgZXh0ZW5kcyBDb2xsZWN0aW9uXG4gICAgc3luYzogKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIC0+XG4gICAgICBvcHRpb25zID0gYXV0aF9zeW5jX29wdGlvbnMgb3B0aW9uc1xuICAgICAgc3VwZXIgbWV0aG9kLCBtb2RlbCwgb3B0aW9uc1xuICAgIHBhcnNlOiAocmVzcG9uc2UpIC0+XG4gICAgICBzdXBlciByZXNwb25zZS5pdGVtc1xuICAgIFxuICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhNb2RlbCcsIC0+XG4gICAgcmV0dXJuIEF1dGhNb2RlbFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aENvbGxlY3Rpb24nLCAtPlxuICAgIHJldHVybiBBdXRoQ29sbGVjdGlvblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aFVuUGFnaW5hdGVkJywgLT5cbiAgICByZXR1cm4gQXV0aFVuUGFnaW5hdGVkXG5cbiAgY2xhc3MgQXV0aFJlZnJlc2ggZXh0ZW5kcyBBdXRoTW9kZWxcbiAgICB1cmw6IGFwcENvbmZpZy5hdXRoVG9rZW4ucmVmcmVzaFVybFxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoUmVmcmVzaCcsIC0+XG4gICAgcmV0dXJuIEF1dGhSZWZyZXNoXG5cbiAgY3VycmVudFVzZXIgPSBuZXcgTW9kZWxcbiAgICBpc0d1ZXN0OiB0cnVlXG4gICAgbmFtZTogJ0d1ZXN0J1xuICAgIGZ1bGxuYW1lOiAnR3Vlc3QgVXNlcidcbiAgICBncm91cHM6IFtdXG4gICAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjdXJyZW50VXNlcicsIC0+XG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpzZXQtZ3Vlc3QtdXNlcicsIC0+XG4gICAgY3VycmVudFVzZXIuc2V0XG4gICAgICBpc0d1ZXN0OiB0cnVlXG4gICAgICBuYW1lOiAnR3Vlc3QnXG4gICAgICBmdWxsbmFtZTogJ0d1ZXN0IFVzZXInXG4gICAgICBncm91cHM6IFtdXG4gICAgcmV0dXJuXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNldC1hdXRoLXRva2VuJywgKHRva2VuKSAtPlxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIHRva2VuS2V5TmFtZSwgdG9rZW5cbiAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJywgLT5cbiAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtIHRva2VuS2V5TmFtZVxuICAgIGlmIHRva2VuXG4gICAgICBkZWNvZGVkID0gand0RGVjb2RlIHRva2VuXG4gICAgICBpc0d1ZXN0ID0gY3VycmVudFVzZXIuZ2V0ICdpc0d1ZXN0J1xuICAgICAgaWYgaXNHdWVzdCBhbmQgZGVjb2RlZC51aWRcbiAgICAgICAgY3VycmVudFVzZXIuc2V0ICdpc0d1ZXN0JywgZmFsc2VcbiAgICAgIGN1cnJlbnRVc2VyLnNldCBkZWNvZGVkXG4gICAgICByZXR1cm4gY3VycmVudFVzZXIudG9KU09OKClcbiAgICBlbHNlXG4gICAgICByZXR1cm4ge31cblxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpyZWZyZXNoLXRva2VuJywgKGxvZ2luVXJsKSAtPlxuICAgIHVubGVzcyB0b2tlbktleU5hbWUgaW4gT2JqZWN0LmtleXMgbG9jYWxTdG9yYWdlXG4gICAgICByZXR1cm5cbiAgICBsb2dpblVybCA9IGxvZ2luVXJsIG9yIGFwcENvbmZpZy5hdXRoVG9rZW4ubG9naW5VcmxcbiAgICByZWZyZXNoID0gbmV3IEF1dGhSZWZyZXNoXG4gICAgcmVzcG9uc2UgPSByZWZyZXNoLmZldGNoKClcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBpZiByZXNwb25zZS5zdGF0dXMgPT0gNDAxXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbG9naW5VcmxcbiAgICAgIGVsc2VcbiAgICAgICAgbXNnID0gJ1RoZXJlIHdhcyBhIHByb2JsZW0gcmVmcmVzaGluZyB0aGUgYWNjZXNzIHRva2VuJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgbXNnXG4gICAgICByZXR1cm5cbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICB0b2tlbiA9IHJlZnJlc2guZ2V0ICd0b2tlbidcbiAgICAgICNkZWNvZGVkID0gand0RGVjb2RlIHRva2VuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSB0b2tlbktleU5hbWUsIHRva2VuXG4gICAgICByZXR1cm5cbiAgICAgIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnY3VycmVudC11c2VyJywgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLndhcm4gXCJXZSBuZWVkIHRvIHJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJyBpbnN0ZWFkXCJcbiAgICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICAgIHVubGVzcyB0b2tlblxuICAgICAgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gbmV3IE1vZGVsIHRva2VuXG4gIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZGVzdHJveS1hdXRoLXRva2VuJywgLT5cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSB0b2tlbktleU5hbWVcbiAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpzZXQtZ3Vlc3QtdXNlcidcblxuICByZXR1cm5cbiAgXG5leHBvcnQgZGVmYXVsdCBzZXR1cEF1dGhNb2RlbHNcbiAgXG4iXX0=
