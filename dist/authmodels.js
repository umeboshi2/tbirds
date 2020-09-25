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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG1vZGVscy5qcyIsInNvdXJjZXMiOlsiYXV0aG1vZGVscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixVQUFoQjtFQUE0QixLQUE1QjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBR0EsT0FBTyx1QkFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBQ2QsY0FBQSxHQUFpQixLQUFLLENBQUMsT0FBTixDQUFjLFVBQWQ7O0FBRWpCLGVBQUEsR0FBa0IsUUFBQSxDQUFDLFNBQUQsQ0FBQTtBQUNoQixNQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLGVBQUEsRUFBQSxpQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsY0FBQSxFQUFBO0VBQUEsWUFBQSxHQUFlLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBcEIsSUFBb0M7RUFFbkQsY0FBQSxHQUFpQixRQUFBLENBQUEsQ0FBQTtBQUdmLFFBQUEsS0FBQTs7O0lBQUEsS0FBQSxHQUFRLFlBQVksQ0FBQyxPQUFiLENBQXFCLFlBQXJCO0FBQ1IsV0FBTyxDQUFBLENBQUEsQ0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQXZCLEVBQUEsQ0FBQSxDQUFxQyxLQUFyQyxDQUFBO0VBSlE7RUFNakIsY0FBQSxHQUFpQixRQUFBLENBQUMsR0FBRCxDQUFBO0lBQ2YsR0FBRyxDQUFDLGdCQUFKLENBQXFCLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBekMsRUFBd0QsY0FBQSxDQUFBLENBQXhEO0VBRGU7RUFJakIsV0FBVyxDQUFDLEtBQVosQ0FBa0IseUJBQWxCLEVBQTZDLFFBQUEsQ0FBQSxDQUFBO0FBQzNDLFdBQU87RUFEb0MsQ0FBN0M7RUFJQSxpQkFBQSxHQUFvQixRQUFBLENBQUMsT0FBRCxDQUFBO0lBQ2xC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QVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtJQUNSLElBQUEsQ0FBTyxLQUFQO0FBQ0UsYUFBTyxLQURUOztBQUVBLFdBQU8sSUFBSSxLQUFKLENBQVUsS0FBVjtFQU55QixDQUFsQztFQVFBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLDZCQUFsQixFQUFpRCxRQUFBLENBQUEsQ0FBQTtJQUMvQyxZQUFZLENBQUMsVUFBYixDQUF3QixZQUF4QjtXQUNBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHlCQUFwQjtFQUYrQyxDQUFqRDtBQWhIZ0I7O0FBc0hsQixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCwgQ29sbGVjdGlvbiwgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBqd3REZWNvZGUgZnJvbSAnand0LWRlY29kZSdcblxuI3tCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvbn0gPSByZXF1aXJlICcuL2Jhc2ljLXBhZ2VhYmxlLWNvbGxlY3Rpb24nXG5pbXBvcnQgQmFzaWNQYWdlYWJsZUNvbGxlY3Rpb24gZnJvbSAnLi9iYXNpYy1wYWdlYWJsZS1jb2xsZWN0aW9uJ1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbnNldHVwQXV0aE1vZGVscyA9IChhcHBDb25maWcpIC0+XG4gIHRva2VuS2V5TmFtZSA9IGFwcENvbmZpZy5hdXRoVG9rZW4udG9rZW5LZXlOYW1lIG9yICdhdXRoX3Rva2VuJ1xuXG4gIG1ha2VBdXRoSGVhZGVyID0gLT5cbiAgICAjIHJldHJpZXZlIGZyb20gbG9jYWwgc3RvcmFnZSBvbiBlYWNoIHJlcXVlc3RcbiAgICAjIHRvIGVuc3VyZSBjdXJyZW50IHRva2VuXG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSB0b2tlbktleU5hbWVcbiAgICByZXR1cm4gXCIje2FwcENvbmZpZy5hdXRoVG9rZW4uYmVhcmVyTmFtZX0gI3t0b2tlbn1cIlxuICBcbiAgc2VuZEF1dGhIZWFkZXIgPSAoeGhyKSAtPlxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyIGFwcENvbmZpZy5hdXRoVG9rZW4ucmVxdWVzdEhlYWRlciwgbWFrZUF1dGhIZWFkZXIoKVxuICAgIHJldHVyblxuICAgIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6YXV0aEJlZm9yZVNlbmQnLCAtPlxuICAgIHJldHVybiBzZW5kQXV0aEhlYWRlclxuICBcblxuICBhdXRoX3N5bmNfb3B0aW9ucyA9IChvcHRpb25zKSAtPlxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgb3B0aW9ucy5iZWZvcmVTZW5kID0gc2VuZEF1dGhIZWFkZXJcbiAgICByZXR1cm4gb3B0aW9uc1xuXG4gIGNsYXNzIEF1dGhNb2RlbCBleHRlbmRzIE1vZGVsXG4gICAgc3luYzogKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIC0+XG4gICAgICBvcHRpb25zID0gYXV0aF9zeW5jX29wdGlvbnMgb3B0aW9uc1xuICAgICAgc3VwZXIgbWV0aG9kLCBtb2RlbCwgb3B0aW9uc1xuXG4gIGNsYXNzIEF1dGhDb2xsZWN0aW9uIGV4dGVuZHMgQmFzaWNQYWdlYWJsZUNvbGxlY3Rpb25cbiAgICBzeW5jOiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykgLT5cbiAgICAgIG9wdGlvbnMgPSBhdXRoX3N5bmNfb3B0aW9ucyBvcHRpb25zXG4gICAgICBzdXBlciBtZXRob2QsIG1vZGVsLCBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aFVuUGFnaW5hdGVkIGV4dGVuZHMgQ29sbGVjdGlvblxuICAgIHN5bmM6IChtZXRob2QsIG1vZGVsLCBvcHRpb25zKSAtPlxuICAgICAgb3B0aW9ucyA9IGF1dGhfc3luY19vcHRpb25zIG9wdGlvbnNcbiAgICAgIHN1cGVyIG1ldGhvZCwgbW9kZWwsIG9wdGlvbnNcbiAgICBwYXJzZTogKHJlc3BvbnNlKSAtPlxuICAgICAgc3VwZXIgcmVzcG9uc2UuaXRlbXNcbiAgICBcbiAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoTW9kZWwnLCAtPlxuICAgIHJldHVybiBBdXRoTW9kZWxcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhDb2xsZWN0aW9uJywgLT5cbiAgICByZXR1cm4gQXV0aENvbGxlY3Rpb25cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhVblBhZ2luYXRlZCcsIC0+XG4gICAgcmV0dXJuIEF1dGhVblBhZ2luYXRlZFxuXG4gIGNsYXNzIEF1dGhSZWZyZXNoIGV4dGVuZHMgQXV0aE1vZGVsXG4gICAgdXJsOiBhcHBDb25maWcuYXV0aFRva2VuLnJlZnJlc2hVcmxcblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aFJlZnJlc2gnLCAtPlxuICAgIHJldHVybiBBdXRoUmVmcmVzaFxuXG4gIGN1cnJlbnRVc2VyID0gbmV3IE1vZGVsXG4gICAgaXNHdWVzdDogdHJ1ZVxuICAgIG5hbWU6ICdHdWVzdCdcbiAgICBmdWxsbmFtZTogJ0d1ZXN0IFVzZXInXG4gICAgZ3JvdXBzOiBbXVxuICAgIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y3VycmVudFVzZXInLCAtPlxuICAgIHJldHVybiBjdXJyZW50VXNlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6c2V0LWd1ZXN0LXVzZXInLCAtPlxuICAgIGN1cnJlbnRVc2VyLnNldFxuICAgICAgaXNHdWVzdDogdHJ1ZVxuICAgICAgbmFtZTogJ0d1ZXN0J1xuICAgICAgZnVsbG5hbWU6ICdHdWVzdCBVc2VyJ1xuICAgICAgZ3JvdXBzOiBbXVxuICAgIHJldHVyblxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpzZXQtYXV0aC10b2tlbicsICh0b2tlbikgLT5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSB0b2tlbktleU5hbWUsIHRva2VuXG4gICAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbicsIC0+XG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSB0b2tlbktleU5hbWVcbiAgICBpZiB0b2tlblxuICAgICAgZGVjb2RlZCA9IGp3dERlY29kZSB0b2tlblxuICAgICAgaXNHdWVzdCA9IGN1cnJlbnRVc2VyLmdldCAnaXNHdWVzdCdcbiAgICAgIGlmIGlzR3Vlc3QgYW5kIGRlY29kZWQudWlkXG4gICAgICAgIGN1cnJlbnRVc2VyLnNldCAnaXNHdWVzdCcsIGZhbHNlXG4gICAgICBjdXJyZW50VXNlci5zZXQgZGVjb2RlZFxuICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyLnRvSlNPTigpXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHt9XG5cblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cmVmcmVzaC10b2tlbicsIChsb2dpblVybCkgLT5cbiAgICB1bmxlc3MgdG9rZW5LZXlOYW1lIGluIE9iamVjdC5rZXlzIGxvY2FsU3RvcmFnZVxuICAgICAgcmV0dXJuXG4gICAgbG9naW5VcmwgPSBsb2dpblVybCBvciBhcHBDb25maWcuYXV0aFRva2VuLmxvZ2luVXJsXG4gICAgcmVmcmVzaCA9IG5ldyBBdXRoUmVmcmVzaFxuICAgIHJlc3BvbnNlID0gcmVmcmVzaC5mZXRjaCgpXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgaWYgcmVzcG9uc2Uuc3RhdHVzID09IDQwMVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGxvZ2luVXJsXG4gICAgICBlbHNlXG4gICAgICAgIG1zZyA9ICdUaGVyZSB3YXMgYSBwcm9ibGVtIHJlZnJlc2hpbmcgdGhlIGFjY2VzcyB0b2tlbidcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIG1zZ1xuICAgICAgcmV0dXJuXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgdG9rZW4gPSByZWZyZXNoLmdldCAndG9rZW4nXG4gICAgICAjZGVjb2RlZCA9IGp3dERlY29kZSB0b2tlblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gdG9rZW5LZXlOYW1lLCB0b2tlblxuICAgICAgcmV0dXJuXG4gICAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ2N1cnJlbnQtdXNlcicsIC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS53YXJuIFwiV2UgbmVlZCB0byByZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbicgaW5zdGVhZFwiXG4gICAgdG9rZW4gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgICB1bmxlc3MgdG9rZW5cbiAgICAgIHJldHVybiBudWxsXG4gICAgcmV0dXJuIG5ldyBNb2RlbCB0b2tlblxuICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmRlc3Ryb3ktYXV0aC10b2tlbicsIC0+XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0gdG9rZW5LZXlOYW1lXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2V0LWd1ZXN0LXVzZXInXG5cbiAgcmV0dXJuXG4gIFxuZXhwb3J0IGRlZmF1bHQgc2V0dXBBdXRoTW9kZWxzXG4gIFxuIl19
