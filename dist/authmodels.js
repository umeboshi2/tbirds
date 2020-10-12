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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG1vZGVscy5qcyIsInNvdXJjZXMiOlsiYXV0aG1vZGVscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixVQUFoQjtFQUE0QixLQUE1QjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBR0EsT0FBTyx1QkFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBQ2QsY0FBQSxHQUFpQixLQUFLLENBQUMsT0FBTixDQUFjLFVBQWQ7O0FBRWpCLGVBQUEsR0FBa0IsUUFBQSxDQUFDLFNBQUQsQ0FBQTtBQUNsQixNQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLGVBQUEsRUFBQSxpQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsY0FBQSxFQUFBO0VBQUUsWUFBQSxHQUFlLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBcEIsSUFBb0M7RUFFbkQsY0FBQSxHQUFpQixRQUFBLENBQUEsQ0FBQTtBQUNuQixRQUFBLEtBQUE7OztJQUVJLEtBQUEsR0FBUSxZQUFZLENBQUMsT0FBYixDQUFxQixZQUFyQjtBQUNSLFdBQU8sQ0FBQSxDQUFBLENBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUF2QixFQUFBLENBQUEsQ0FBcUMsS0FBckMsQ0FBQTtFQUpRO0VBTWpCLGNBQUEsR0FBaUIsUUFBQSxDQUFDLEdBQUQsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixTQUFTLENBQUMsU0FBUyxDQUFDLGFBQXpDLEVBQXdELGNBQUEsQ0FBQSxDQUF4RDtFQURlO0VBSWpCLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHlCQUFsQixFQUE2QyxRQUFBLENBQUEsQ0FBQTtBQUMzQyxXQUFPO0VBRG9DLENBQTdDO0VBSUEsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLE9BQUQsQ0FBQTtJQUNs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QVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtJQUNSLEtBQU8sS0FBUDtBQUNFLGFBQU8sS0FEVDs7QUFFQSxXQUFPLElBQUksS0FBSixDQUFVLEtBQVY7RUFOeUIsQ0FBbEM7RUFRQSxXQUFXLENBQUMsS0FBWixDQUFrQiw2QkFBbEIsRUFBaUQsUUFBQSxDQUFBLENBQUE7SUFDL0MsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsWUFBeEI7V0FDQSxXQUFXLENBQUMsT0FBWixDQUFvQix5QkFBcEI7RUFGK0MsQ0FBakQ7QUFoSGdCOztBQXNIbEIsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwsIENvbGxlY3Rpb24sIFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgand0RGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnXG5cbiN7QmFzaWNQYWdlYWJsZUNvbGxlY3Rpb259ID0gcmVxdWlyZSAnLi9iYXNpYy1wYWdlYWJsZS1jb2xsZWN0aW9uJ1xuaW1wb3J0IEJhc2ljUGFnZWFibGVDb2xsZWN0aW9uIGZyb20gJy4vYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbidcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5zZXR1cEF1dGhNb2RlbHMgPSAoYXBwQ29uZmlnKSAtPlxuICB0b2tlbktleU5hbWUgPSBhcHBDb25maWcuYXV0aFRva2VuLnRva2VuS2V5TmFtZSBvciAnYXV0aF90b2tlbidcblxuICBtYWtlQXV0aEhlYWRlciA9IC0+XG4gICAgIyByZXRyaWV2ZSBmcm9tIGxvY2FsIHN0b3JhZ2Ugb24gZWFjaCByZXF1ZXN0XG4gICAgIyB0byBlbnN1cmUgY3VycmVudCB0b2tlblxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0gdG9rZW5LZXlOYW1lXG4gICAgcmV0dXJuIFwiI3thcHBDb25maWcuYXV0aFRva2VuLmJlYXJlck5hbWV9ICN7dG9rZW59XCJcbiAgXG4gIHNlbmRBdXRoSGVhZGVyID0gKHhocikgLT5cbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciBhcHBDb25maWcuYXV0aFRva2VuLnJlcXVlc3RIZWFkZXIsIG1ha2VBdXRoSGVhZGVyKClcbiAgICByZXR1cm5cbiAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmF1dGhCZWZvcmVTZW5kJywgLT5cbiAgICByZXR1cm4gc2VuZEF1dGhIZWFkZXJcbiAgXG5cbiAgYXV0aF9zeW5jX29wdGlvbnMgPSAob3B0aW9ucykgLT5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIG9wdGlvbnMuYmVmb3JlU2VuZCA9IHNlbmRBdXRoSGVhZGVyXG4gICAgcmV0dXJuIG9wdGlvbnNcblxuICBjbGFzcyBBdXRoTW9kZWwgZXh0ZW5kcyBNb2RlbFxuICAgIHN5bmM6IChtZXRob2QsIG1vZGVsLCBvcHRpb25zKSAtPlxuICAgICAgb3B0aW9ucyA9IGF1dGhfc3luY19vcHRpb25zIG9wdGlvbnNcbiAgICAgIHN1cGVyIG1ldGhvZCwgbW9kZWwsIG9wdGlvbnNcblxuICBjbGFzcyBBdXRoQ29sbGVjdGlvbiBleHRlbmRzIEJhc2ljUGFnZWFibGVDb2xsZWN0aW9uXG4gICAgc3luYzogKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIC0+XG4gICAgICBvcHRpb25zID0gYXV0aF9zeW5jX29wdGlvbnMgb3B0aW9uc1xuICAgICAgc3VwZXIgbWV0aG9kLCBtb2RlbCwgb3B0aW9uc1xuXG4gIGNsYXNzIEF1dGhVblBhZ2luYXRlZCBleHRlbmRzIENvbGxlY3Rpb25cbiAgICBzeW5jOiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykgLT5cbiAgICAgIG9wdGlvbnMgPSBhdXRoX3N5bmNfb3B0aW9ucyBvcHRpb25zXG4gICAgICBzdXBlciBtZXRob2QsIG1vZGVsLCBvcHRpb25zXG4gICAgcGFyc2U6IChyZXNwb25zZSkgLT5cbiAgICAgIHN1cGVyIHJlc3BvbnNlLml0ZW1zXG4gICAgXG4gIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aE1vZGVsJywgLT5cbiAgICByZXR1cm4gQXV0aE1vZGVsXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoQ29sbGVjdGlvbicsIC0+XG4gICAgcmV0dXJuIEF1dGhDb2xsZWN0aW9uXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoVW5QYWdpbmF0ZWQnLCAtPlxuICAgIHJldHVybiBBdXRoVW5QYWdpbmF0ZWRcblxuICBjbGFzcyBBdXRoUmVmcmVzaCBleHRlbmRzIEF1dGhNb2RlbFxuICAgIHVybDogYXBwQ29uZmlnLmF1dGhUb2tlbi5yZWZyZXNoVXJsXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhSZWZyZXNoJywgLT5cbiAgICByZXR1cm4gQXV0aFJlZnJlc2hcblxuICBjdXJyZW50VXNlciA9IG5ldyBNb2RlbFxuICAgIGlzR3Vlc3Q6IHRydWVcbiAgICBuYW1lOiAnR3Vlc3QnXG4gICAgZnVsbG5hbWU6ICdHdWVzdCBVc2VyJ1xuICAgIGdyb3VwczogW11cbiAgICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmN1cnJlbnRVc2VyJywgLT5cbiAgICByZXR1cm4gY3VycmVudFVzZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNldC1ndWVzdC11c2VyJywgLT5cbiAgICBjdXJyZW50VXNlci5zZXRcbiAgICAgIGlzR3Vlc3Q6IHRydWVcbiAgICAgIG5hbWU6ICdHdWVzdCdcbiAgICAgIGZ1bGxuYW1lOiAnR3Vlc3QgVXNlcidcbiAgICAgIGdyb3VwczogW11cbiAgICByZXR1cm5cblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCAodG9rZW4pIC0+XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gdG9rZW5LZXlOYW1lLCB0b2tlblxuICAgIFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nLCAtPlxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0gdG9rZW5LZXlOYW1lXG4gICAgaWYgdG9rZW5cbiAgICAgIGRlY29kZWQgPSBqd3REZWNvZGUgdG9rZW5cbiAgICAgIGlzR3Vlc3QgPSBjdXJyZW50VXNlci5nZXQgJ2lzR3Vlc3QnXG4gICAgICBpZiBpc0d1ZXN0IGFuZCBkZWNvZGVkLnVpZFxuICAgICAgICBjdXJyZW50VXNlci5zZXQgJ2lzR3Vlc3QnLCBmYWxzZVxuICAgICAgY3VycmVudFVzZXIuc2V0IGRlY29kZWRcbiAgICAgIHJldHVybiBjdXJyZW50VXNlci50b0pTT04oKVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB7fVxuXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnJlZnJlc2gtdG9rZW4nLCAobG9naW5VcmwpIC0+XG4gICAgdW5sZXNzIHRva2VuS2V5TmFtZSBpbiBPYmplY3Qua2V5cyBsb2NhbFN0b3JhZ2VcbiAgICAgIHJldHVyblxuICAgIGxvZ2luVXJsID0gbG9naW5Vcmwgb3IgYXBwQ29uZmlnLmF1dGhUb2tlbi5sb2dpblVybFxuICAgIHJlZnJlc2ggPSBuZXcgQXV0aFJlZnJlc2hcbiAgICByZXNwb25zZSA9IHJlZnJlc2guZmV0Y2goKVxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIGlmIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDFcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBsb2dpblVybFxuICAgICAgZWxzZVxuICAgICAgICBtc2cgPSAnVGhlcmUgd2FzIGEgcHJvYmxlbSByZWZyZXNoaW5nIHRoZSBhY2Nlc3MgdG9rZW4nXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBtc2dcbiAgICAgIHJldHVyblxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIHRva2VuID0gcmVmcmVzaC5nZXQgJ3Rva2VuJ1xuICAgICAgI2RlY29kZWQgPSBqd3REZWNvZGUgdG9rZW5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIHRva2VuS2V5TmFtZSwgdG9rZW5cbiAgICAgIHJldHVyblxuICAgICAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdjdXJyZW50LXVzZXInLCAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUud2FybiBcIldlIG5lZWQgdG8gcmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nIGluc3RlYWRcIlxuICAgIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gICAgdW5sZXNzIHRva2VuXG4gICAgICByZXR1cm4gbnVsbFxuICAgIHJldHVybiBuZXcgTW9kZWwgdG9rZW5cbiAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpkZXN0cm95LWF1dGgtdG9rZW4nLCAtPlxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtIHRva2VuS2V5TmFtZVxuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnNldC1ndWVzdC11c2VyJ1xuXG4gIHJldHVyblxuICBcbmV4cG9ydCBkZWZhdWx0IHNldHVwQXV0aE1vZGVsc1xuICBcbiJdfQ==
