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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG1vZGVscy5qcyIsInNvdXJjZXMiOlsiYXV0aG1vZGVscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFHQSxPQUFPLHVCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZUFBQSxHQUFrQixRQUFBLENBQUMsU0FBRCxDQUFBO0FBQ2hCLE1BQUEsY0FBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsZUFBQSxFQUFBLGlCQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBLEVBQUE7RUFBQSxZQUFBLEdBQWUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxZQUFwQixJQUFvQztFQUVuRCxjQUFBLEdBQWlCLFFBQUEsQ0FBQSxDQUFBO0FBR2YsUUFBQSxLQUFBOzs7SUFBQSxLQUFBLEdBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsWUFBckI7QUFDUixXQUFPLENBQUEsQ0FBQSxDQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBdkIsRUFBQSxDQUFBLENBQXFDLEtBQXJDLENBQUE7RUFKUTtFQU1qQixjQUFBLEdBQWlCLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDZixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzlCLE9BQUEsR0FBVSxjQUFBLENBQUE7SUFDVixHQUFHLENBQUMsZ0JBQUosQ0FBcUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUF6QyxFQUF3RCxjQUFBLENBQUEsQ0FBeEQ7RUFIZTtFQU1qQixXQUFXLENBQUMsS0FBWixDQUFrQix5QkFBbEIsRUFBNkMsUUFBQSxDQUFB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O0VBbUJBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGNBQWxCLEVBQWtDLFFBQUEsQ0FBQSxDQUFBO0FBQ2hDLFFBQUE7SUFBQSxJQUFHLE9BQUg7TUFDRSxPQUFPLENBQUMsSUFBUixDQUFhLHlEQUFiLEVBREY7O0lBRUEsS0FBQSxHQUFRLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtJQUNSLElBQUEsQ0FBTyxLQUFQO0FBQ0UsYUFBTyxLQURUOztBQUVBLFdBQU8sSUFBSSxRQUFRLENBQUMsS0FBYixDQUFtQixLQUFuQjtFQU55QixDQUFsQztFQVFBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLDZCQUFsQixFQUFpRCxRQUFBLENBQUEsQ0FBQTtJQUMvQyxZQUFZLENBQUMsVUFBYixDQUF3QixZQUF4QjtXQUNBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHlCQUFwQjtFQUYrQyxDQUFqRDtBQWxIZ0I7O0FBd0hsQixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgand0RGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnXG5cbiN7QmFzaWNQYWdlYWJsZUNvbGxlY3Rpb259ID0gcmVxdWlyZSAnLi9iYXNpYy1wYWdlYWJsZS1jb2xsZWN0aW9uJ1xuaW1wb3J0IEJhc2ljUGFnZWFibGVDb2xsZWN0aW9uIGZyb20gJy4vYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbidcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5zZXR1cEF1dGhNb2RlbHMgPSAoYXBwQ29uZmlnKSAtPlxuICB0b2tlbktleU5hbWUgPSBhcHBDb25maWcuYXV0aFRva2VuLnRva2VuS2V5TmFtZSBvciAnYXV0aF90b2tlbidcblxuICBtYWtlQXV0aEhlYWRlciA9IC0+XG4gICAgIyByZXRyaWV2ZSBmcm9tIGxvY2FsIHN0b3JhZ2Ugb24gZWFjaCByZXF1ZXN0XG4gICAgIyB0byBlbnN1cmUgY3VycmVudCB0b2tlblxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0gdG9rZW5LZXlOYW1lXG4gICAgcmV0dXJuIFwiI3thcHBDb25maWcuYXV0aFRva2VuLmJlYXJlck5hbWV9ICN7dG9rZW59XCJcbiAgXG4gIHNlbmRBdXRoSGVhZGVyID0gKHhocikgLT5cbiAgICByaGVhZGVyID0gYXBwQ29uZmlnLmF1dGhUb2tlbi5yZXF1ZXN0SGVhZGVyXG4gICAgYWhlYWRlciA9IG1ha2VBdXRoSGVhZGVyKClcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciBhcHBDb25maWcuYXV0aFRva2VuLnJlcXVlc3RIZWFkZXIsIG1ha2VBdXRoSGVhZGVyKClcbiAgICByZXR1cm5cbiAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmF1dGhCZWZvcmVTZW5kJywgLT5cbiAgICByZXR1cm4gc2VuZEF1dGhIZWFkZXJcbiAgXG5cbiAgYXV0aF9zeW5jX29wdGlvbnMgPSAob3B0aW9ucykgLT5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIG9wdGlvbnMuYmVmb3JlU2VuZCA9IHNlbmRBdXRoSGVhZGVyXG4gICAgcmV0dXJuIG9wdGlvbnNcblxuICBjbGFzcyBBdXRoTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICAgIHN5bmM6IChtZXRob2QsIG1vZGVsLCBvcHRpb25zKSAtPlxuICAgICAgb3B0aW9ucyA9IGF1dGhfc3luY19vcHRpb25zIG9wdGlvbnNcbiAgICAgIHN1cGVyIG1ldGhvZCwgbW9kZWwsIG9wdGlvbnNcblxuICBjbGFzcyBBdXRoQ29sbGVjdGlvbiBleHRlbmRzIEJhc2ljUGFnZWFibGVDb2xsZWN0aW9uXG4gICAgc3luYzogKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIC0+XG4gICAgICBvcHRpb25zID0gYXV0aF9zeW5jX29wdGlvbnMgb3B0aW9uc1xuICAgICAgc3VwZXIgbWV0aG9kLCBtb2RlbCwgb3B0aW9uc1xuXG4gIGNsYXNzIEF1dGhVblBhZ2luYXRlZCBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgICBzeW5jOiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykgLT5cbiAgICAgIG9wdGlvbnMgPSBhdXRoX3N5bmNfb3B0aW9ucyBvcHRpb25zXG4gICAgICBzdXBlciBtZXRob2QsIG1vZGVsLCBvcHRpb25zXG4gICAgcGFyc2U6IChyZXNwb25zZSkgLT5cbiAgICAgIHN1cGVyIHJlc3BvbnNlLml0ZW1zXG4gICAgXG4gIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aE1vZGVsJywgLT5cbiAgICByZXR1cm4gQXV0aE1vZGVsXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoQ29sbGVjdGlvbicsIC0+XG4gICAgcmV0dXJuIEF1dGhDb2xsZWN0aW9uXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoVW5QYWdpbmF0ZWQnLCAtPlxuICAgIHJldHVybiBBdXRoVW5QYWdpbmF0ZWRcblxuICBjbGFzcyBBdXRoUmVmcmVzaCBleHRlbmRzIEF1dGhNb2RlbFxuICAgIHVybDogYXBwQ29uZmlnLmF1dGhUb2tlbi5yZWZyZXNoVXJsXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhSZWZyZXNoJywgLT5cbiAgICByZXR1cm4gQXV0aFJlZnJlc2hcblxuICBjdXJyZW50VXNlciA9IG5ldyBCYWNrYm9uZS5Nb2RlbFxuICAgIGlzR3Vlc3Q6IHRydWVcbiAgICBuYW1lOiAnR3Vlc3QnXG4gICAgZnVsbG5hbWU6ICdHdWVzdCBVc2VyJ1xuICAgIGdyb3VwczogW11cbiAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmN1cnJlbnRVc2VyJywgLT5cbiAgICByZXR1cm4gY3VycmVudFVzZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNldC1ndWVzdC11c2VyJywgLT5cbiAgICBjdXJyZW50VXNlci5zZXRcbiAgICAgIGlzR3Vlc3Q6IHRydWVcbiAgICAgIG5hbWU6ICdHdWVzdCdcbiAgICAgIGZ1bGxuYW1lOiAnR3Vlc3QgVXNlcidcbiAgICAgIGdyb3VwczogW11cbiAgICByZXR1cm5cblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCAodG9rZW4pIC0+XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gdG9rZW5LZXlOYW1lLCB0b2tlblxuICAgIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nLCAtPlxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0gdG9rZW5LZXlOYW1lXG4gICAgaWYgdG9rZW5cbiAgICAgIGRlY29kZWQgPSBqd3REZWNvZGUgdG9rZW5cbiAgICAgIGlzR3Vlc3QgPSBjdXJyZW50VXNlci5nZXQgJ2lzR3Vlc3QnXG4gICAgICBpZiBpc0d1ZXN0IGFuZCBkZWNvZGVkLnVpZFxuICAgICAgICBjdXJyZW50VXNlci5zZXQgJ2lzR3Vlc3QnLCBmYWxzZVxuICAgICAgY3VycmVudFVzZXIuc2V0IGRlY29kZWRcbiAgICAgIHJldHVybiBjdXJyZW50VXNlci50b0pTT04oKVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB7fVxuXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnJlZnJlc2gtdG9rZW4nLCAobG9naW5VcmwpIC0+XG4gICAgdW5sZXNzIHRva2VuS2V5TmFtZSBpbiBPYmplY3Qua2V5cyBsb2NhbFN0b3JhZ2VcbiAgICAgIHJldHVyblxuICAgIGxvZ2luVXJsID0gbG9naW5Vcmwgb3IgYXBwQ29uZmlnLmF1dGhUb2tlbi5sb2dpblVybFxuICAgIHJlZnJlc2ggPSBuZXcgQXV0aFJlZnJlc2hcbiAgICByZXNwb25zZSA9IHJlZnJlc2guZmV0Y2goKVxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIGlmIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDFcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBsb2dpblVybFxuICAgICAgZWxzZVxuICAgICAgICBtc2cgPSAnVGhlcmUgd2FzIGEgcHJvYmxlbSByZWZyZXNoaW5nIHRoZSBhY2Nlc3MgdG9rZW4nXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBtc2dcbiAgICAgIHJldHVyblxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIHRva2VuID0gcmVmcmVzaC5nZXQgJ3Rva2VuJ1xuICAgICAgZGVjb2RlZCA9IGp3dERlY29kZSB0b2tlblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gdG9rZW5LZXlOYW1lLCB0b2tlblxuICAgICAgcmV0dXJuXG4gICAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ2N1cnJlbnQtdXNlcicsIC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS53YXJuIFwiV2UgbmVlZCB0byByZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbicgaW5zdGVhZFwiXG4gICAgdG9rZW4gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpkZWNvZGUtYXV0aC10b2tlbidcbiAgICB1bmxlc3MgdG9rZW5cbiAgICAgIHJldHVybiBudWxsXG4gICAgcmV0dXJuIG5ldyBCYWNrYm9uZS5Nb2RlbCB0b2tlblxuICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmRlc3Ryb3ktYXV0aC10b2tlbicsIC0+XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0gdG9rZW5LZXlOYW1lXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2V0LWd1ZXN0LXVzZXInXG5cbiAgcmV0dXJuXG4gIFxuZXhwb3J0IGRlZmF1bHQgc2V0dXBBdXRoTW9kZWxzXG4gIFxuIl19
