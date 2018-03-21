var MainChannel, MessageChannel, setupAuthModels,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import navigate_to_url from 'tbirds/util/navigate-to-url';

import jwtDecode from 'jwt-decode';

import BasicPageableCollection from './basic-pageable-collection';

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
    return localStorage.removeItem(tokenKeyName);
  });
};

export default setupAuthModels;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG1vZGVscy5qcyIsInNvdXJjZXMiOlsiYXV0aG1vZGVscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLGVBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFHQSxPQUFPLHVCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZUFBQSxHQUFrQixRQUFBLENBQUMsU0FBRCxDQUFBO0FBQ2hCLE1BQUEsY0FBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsZUFBQSxFQUFBLGlCQUFBLEVBQUEsY0FBQSxFQUFBLGNBQUEsRUFBQTtFQUFBLFlBQUEsR0FBZSxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQXBCLElBQW9DO0VBRW5ELGNBQUEsR0FBaUIsUUFBQSxDQUFBLENBQUE7QUFHZixRQUFBLEtBQUE7OztJQUFBLEtBQUEsR0FBUSxZQUFZLENBQUMsT0FBYixDQUFxQixZQUFyQjtBQUNSLFdBQU8sQ0FBQSxDQUFBLENBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUF2QixFQUFBLENBQUEsQ0FBcUMsS0FBckMsQ0FBQTtFQUpRO0VBTWpCLGNBQUEsR0FBaUIsUUFBQSxDQUFDLEdBQUQsQ0FBQTtBQUNmLFFBQUEsT0FBQSxFQUFBO0lBQUEsT0FBQSxHQUFVLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDOUIsT0FBQSxHQUFVLGNBQUEsQ0FBQTtJQUNWLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixTQUFTLENBQUMsU0FBUyxDQUFDLGFBQXpDLEVBQXdELGNBQUEsQ0FBQSxDQUF4RDtFQUhlO0VBTWpCLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHlCQUFsQixFQUE2QyxRQUFBLENBQUEsQ0FBQTtBQUMzQyxXQUFPO0VBRG9DLENBQTdDO0VBSUEsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLE9BQUQsQ0FBQTtJQUNsQixPQUFBLEdBQVUsT0FBQSxJQUFXLENBQUE7SUFDckIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7QUFDckIsV0FBTztFQUhXO0VBS2QsWUFBTixNQUFBLFVBQUEsUUFBd0IsUUFBUSxDQUFDLE1BQWpDO0lBQ0UsSUFBTSxDQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLE9BQWhCLENBQUE7TUFDSixPQUFBLEdBQVUsaUJBQUEsQ0FBa0IsT0FBbEI7a0JBRFosQ0FBQSxJQUVFLENBQU0sTUFBTixFQUFjLEtBQWQsRUFBcUIsT0FBckI7SUFGSTs7RUFEUjtFQUtNLGlCQUFOLE1BQUEsZUFBQSxRQUE2Qix3QkFBN0I7SUFDRSxJQUFNLENBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsT0FBaEIsQ0FBQTtNQUNKLE9BQUEsR0FBVSxpQkFBQSxDQUFrQixPQUFsQjtrQkFEWixDQUFBLElBRUUsQ0FBTSxNQUFOLEVBQWMsS0FBZCxFQUFxQixPQUFyQjtJQUZJOztFQURSO0VBS00sa0JBQU4sTUFBQSxnQkFBQSxRQUE4QixRQUFRLENBQUMsV0FBdkM7SUFDRSxJQUFNLENBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsT0FBaEIsQ0FBQTtNQUNKLE9BQUEsR0FBVSxpQkFBQSxDQUFrQixPQUFsQjtrQkFEWixDQUFBLElBRUUsQ0FBTSxNQUFOLEVBQWMsS0FBZCxFQUFxQixPQUFyQjtJQUZJOztJQUdOLEtBQU8sQ0FBQyxRQUFELENBQUE7a0JBQVAsQ0FBQSxLQUNFLENBQU0sUUFBUSxDQUFDLEtBQWY7SUFESzs7RUFKVDtFQVFBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLG9CQUFsQixFQUF3QyxRQUFBLENBQUEsQ0FBQTtBQUN0QyxXQUFPO0VBRCtCLENBQXhDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IseUJBQWxCLEVBQTZDLFFBQUEsQ0FBQSxDQUFBO0FBQzNDLFdBQU87RUFEb0MsQ0FBN0M7RUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQiwwQkFBbEIsRUFBOEMsUUFBQSxDQUFBLENBQUE7QUFDNUMsV0FBTztFQURxQyxDQUE5QztFQUdNO0lBQU4sTUFBQSxZQUFBLFFBQTBCLFVBQTFCLENBQUE7OzBCQUNFLEdBQUEsR0FBSyxTQUFTLENBQUMsU0FBUyxDQUFDOzs7OztFQUUzQixXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFBLENBQUE7QUFDeEMsV0FBTztFQURpQyxDQUExQztFQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHlCQUFsQixFQUE2QyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQzNDLFlBQVksQ0FBQyxPQUFiLENBQXFCLFlBQXJCLEVBQW1DLEtBQW5DO0VBRDJDLENBQTdDO0VBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IsNEJBQWxCLEVBQWdELFFBQUEsQ0FBQSxDQUFBO0FBQzlDLFFBQUE7SUFBQSxLQUFBLEdBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsWUFBckI7SUFDUixJQUFHLEtBQUg7QUFDRSxhQUFPLFNBQUEsQ0FBVSxLQUFWLEVBRFQ7S0FBQSxNQUFBO0FBR0UsYUFBTyxDQUFBLEVBSFQ7O0VBRjhDLENBQWhEO0VBUUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxRQUFELENBQUE7QUFDMUMsUUFBQSxPQUFBLEVBQUE7SUFBQSxJQUFPLGFBQWdCLE1BQU0sQ0FBQyxJQUFQLENBQVksWUFBWixDQUFoQixFQUFBLFlBQUEsS0FBUDtBQUNFLGFBREY7O0lBRUEsUUFBQSxHQUFXLFFBQUEsSUFBWSxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzNDLE9BQUEsR0FBVSxJQUFJO0lBQ2QsUUFBQSxHQUFXLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0FBQ1osVUFBQTtNQUFBLElBQUcsUUFBUSxDQUFDLE1BQVQsS0FBbUIsR0FBdEI7UUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWhCLEdBQXVCLFNBRHpCO09BQUEsTUFBQTtRQUdFLEdBQUEsR0FBTTtRQUNOLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLEdBQWxDLEVBSkY7O0lBRFksQ0FBZDtXQU9BLFFBQVEsQ0FBQyxJQUFULENBQWMsUUFBQSxDQUFBLENBQUE7QUFDWixVQUFBLE9BQUEsRUFBQTtNQUFBLEtBQUEsR0FBUSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVo7TUFDUixPQUFBLEdBQVUsU0FBQSxDQUFVLEtBQVY7TUFDVixZQUFZLENBQUMsT0FBYixDQUFxQixZQUFyQixFQUFtQyxLQUFuQztJQUhZLENBQWQ7RUFiMEMsQ0FBNUM7RUFtQkEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsY0FBbEIsRUFBa0MsUUFBQSxDQUFBLENBQUE7QUFDaEMsUUFBQTtJQUFBLElBQUcsT0FBSDtNQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEseURBQWIsRUFERjs7SUFFQSxLQUFBLEdBQVEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO0lBQ1IsSUFBQSxDQUFPLEtBQVA7QUFDRSxhQUFPLEtBRFQ7O0FBRUEsV0FBTyxJQUFJLFFBQVEsQ0FBQyxLQUFiLENBQW1CLEtBQW5CO0VBTnlCLENBQWxDO0VBUUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsNkJBQWxCLEVBQWlELFFBQUEsQ0FBQSxDQUFBO1dBQy9DLFlBQVksQ0FBQyxVQUFiLENBQXdCLFlBQXhCO0VBRCtDLENBQWpEO0FBN0ZnQjs7QUFrR2xCLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBuYXZpZ2F0ZV90b191cmwgZnJvbSAndGJpcmRzL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuaW1wb3J0IGp3dERlY29kZSBmcm9tICdqd3QtZGVjb2RlJ1xuXG4je0Jhc2ljUGFnZWFibGVDb2xsZWN0aW9ufSA9IHJlcXVpcmUgJy4vYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbidcbmltcG9ydCBCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvbiBmcm9tICcuL2Jhc2ljLXBhZ2VhYmxlLWNvbGxlY3Rpb24nXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuc2V0dXBBdXRoTW9kZWxzID0gKGFwcENvbmZpZykgLT5cbiAgdG9rZW5LZXlOYW1lID0gYXBwQ29uZmlnLmF1dGhUb2tlbi50b2tlbktleU5hbWUgb3IgJ2F1dGhfdG9rZW4nXG5cbiAgbWFrZUF1dGhIZWFkZXIgPSAtPlxuICAgICMgcmV0cmlldmUgZnJvbSBsb2NhbCBzdG9yYWdlIG9uIGVhY2ggcmVxdWVzdFxuICAgICMgdG8gZW5zdXJlIGN1cnJlbnQgdG9rZW5cbiAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtIHRva2VuS2V5TmFtZVxuICAgIHJldHVybiBcIiN7YXBwQ29uZmlnLmF1dGhUb2tlbi5iZWFyZXJOYW1lfSAje3Rva2VufVwiXG4gIFxuICBzZW5kQXV0aEhlYWRlciA9ICh4aHIpIC0+XG4gICAgcmhlYWRlciA9IGFwcENvbmZpZy5hdXRoVG9rZW4ucmVxdWVzdEhlYWRlclxuICAgIGFoZWFkZXIgPSBtYWtlQXV0aEhlYWRlcigpXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIgYXBwQ29uZmlnLmF1dGhUb2tlbi5yZXF1ZXN0SGVhZGVyLCBtYWtlQXV0aEhlYWRlcigpXG4gICAgcmV0dXJuXG4gICAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDphdXRoQmVmb3JlU2VuZCcsIC0+XG4gICAgcmV0dXJuIHNlbmRBdXRoSGVhZGVyXG4gIFxuXG4gIGF1dGhfc3luY19vcHRpb25zID0gKG9wdGlvbnMpIC0+XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICBvcHRpb25zLmJlZm9yZVNlbmQgPSBzZW5kQXV0aEhlYWRlclxuICAgIHJldHVybiBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgICBzeW5jOiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykgLT5cbiAgICAgIG9wdGlvbnMgPSBhdXRoX3N5bmNfb3B0aW9ucyBvcHRpb25zXG4gICAgICBzdXBlciBtZXRob2QsIG1vZGVsLCBvcHRpb25zXG5cbiAgY2xhc3MgQXV0aENvbGxlY3Rpb24gZXh0ZW5kcyBCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvblxuICAgIHN5bmM6IChtZXRob2QsIG1vZGVsLCBvcHRpb25zKSAtPlxuICAgICAgb3B0aW9ucyA9IGF1dGhfc3luY19vcHRpb25zIG9wdGlvbnNcbiAgICAgIHN1cGVyIG1ldGhvZCwgbW9kZWwsIG9wdGlvbnNcblxuICBjbGFzcyBBdXRoVW5QYWdpbmF0ZWQgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gICAgc3luYzogKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIC0+XG4gICAgICBvcHRpb25zID0gYXV0aF9zeW5jX29wdGlvbnMgb3B0aW9uc1xuICAgICAgc3VwZXIgbWV0aG9kLCBtb2RlbCwgb3B0aW9uc1xuICAgIHBhcnNlOiAocmVzcG9uc2UpIC0+XG4gICAgICBzdXBlciByZXNwb25zZS5pdGVtc1xuICAgIFxuICBcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOkF1dGhNb2RlbCcsIC0+XG4gICAgcmV0dXJuIEF1dGhNb2RlbFxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aENvbGxlY3Rpb24nLCAtPlxuICAgIHJldHVybiBBdXRoQ29sbGVjdGlvblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6QXV0aFVuUGFnaW5hdGVkJywgLT5cbiAgICByZXR1cm4gQXV0aFVuUGFnaW5hdGVkXG5cbiAgY2xhc3MgQXV0aFJlZnJlc2ggZXh0ZW5kcyBBdXRoTW9kZWxcbiAgICB1cmw6IGFwcENvbmZpZy5hdXRoVG9rZW4ucmVmcmVzaFVybFxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpBdXRoUmVmcmVzaCcsIC0+XG4gICAgcmV0dXJuIEF1dGhSZWZyZXNoXG5cbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNldC1hdXRoLXRva2VuJywgKHRva2VuKSAtPlxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIHRva2VuS2V5TmFtZSwgdG9rZW5cblxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nLCAtPlxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0gdG9rZW5LZXlOYW1lXG4gICAgaWYgdG9rZW5cbiAgICAgIHJldHVybiBqd3REZWNvZGUgdG9rZW5cbiAgICBlbHNlXG4gICAgICByZXR1cm4ge31cblxuXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpyZWZyZXNoLXRva2VuJywgKGxvZ2luVXJsKSAtPlxuICAgIHVubGVzcyB0b2tlbktleU5hbWUgaW4gT2JqZWN0LmtleXMgbG9jYWxTdG9yYWdlXG4gICAgICByZXR1cm5cbiAgICBsb2dpblVybCA9IGxvZ2luVXJsIG9yIGFwcENvbmZpZy5hdXRoVG9rZW4ubG9naW5VcmxcbiAgICByZWZyZXNoID0gbmV3IEF1dGhSZWZyZXNoXG4gICAgcmVzcG9uc2UgPSByZWZyZXNoLmZldGNoKClcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBpZiByZXNwb25zZS5zdGF0dXMgPT0gNDAxXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbG9naW5VcmxcbiAgICAgIGVsc2VcbiAgICAgICAgbXNnID0gJ1RoZXJlIHdhcyBhIHByb2JsZW0gcmVmcmVzaGluZyB0aGUgYWNjZXNzIHRva2VuJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgbXNnXG4gICAgICByZXR1cm5cbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICB0b2tlbiA9IHJlZnJlc2guZ2V0ICd0b2tlbidcbiAgICAgIGRlY29kZWQgPSBqd3REZWNvZGUgdG9rZW5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIHRva2VuS2V5TmFtZSwgdG9rZW5cbiAgICAgIHJldHVyblxuICAgICAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdjdXJyZW50LXVzZXInLCAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUud2FybiBcIldlIG5lZWQgdG8gcmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nIGluc3RlYWRcIlxuICAgIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gICAgdW5sZXNzIHRva2VuXG4gICAgICByZXR1cm4gbnVsbFxuICAgIHJldHVybiBuZXcgQmFja2JvbmUuTW9kZWwgdG9rZW5cbiAgXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpkZXN0cm95LWF1dGgtdG9rZW4nLCAtPlxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtIHRva2VuS2V5TmFtZVxuXG4gIHJldHVyblxuICBcbmV4cG9ydCBkZWZhdWx0IHNldHVwQXV0aE1vZGVsc1xuICBcbiJdfQ==
