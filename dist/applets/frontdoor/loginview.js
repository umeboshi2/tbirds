var BaseView, LoginView, MainChannel, MainView, MessageChannel, TokenView, form_group_input_div, login_form, token_form;

import $ from 'jquery';

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import make_field_input_ui from '../../util/make-field-input-ui';

import navigate_to_url from '../../util/navigate-to-url';

({form_group_input_div} = require('../../templates/forms'));

import BootstrapFormView from '../../views/bsformview';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

login_form = tc.renderable(function(user) {
  form_group_input_div({
    input_id: 'input_username',
    label: 'User Name',
    input_attributes: {
      name: 'username',
      placeholder: 'User Name'
    }
  });
  form_group_input_div({
    input_id: 'input_password',
    label: 'Password',
    input_attributes: {
      name: 'password',
      type: 'password',
      placeholder: 'Type your password here....'
    }
  });
  tc.input('.btn.btn-primary', {
    type: 'submit',
    value: 'login'
  });
  return tc.div('.spinner.fa.fa-spinner.fa-spin');
});

BaseView = class BaseView extends BootstrapFormView {
  ui() {
    var uiobject;
    uiobject = make_field_input_ui(this.fieldList);
    return uiobject;
  }

  createModel() {
    return new Backbone.Model;
  }

  onSuccess() {
    // FIXME start reloading the child apps
    // that recognize users
    return navigate_to_url('#');
  }

};

LoginView = (function() {
  class LoginView extends BaseView {
    updateModel() {
      console.log('updateModel called');
      this.model.set('username', this.ui.username.val());
      return this.model.set('password', this.ui.password.val());
    }

    saveModel() {
      var password, username, xhr;
      username = this.model.get('username');
      password = this.model.get('password');
      xhr = $.ajax({
        url: '/login',
        type: 'POST',
        data: {
          username: username,
          password: password
        },
        dataType: 'json',
        success: (response) => {
          var token;
          token = response.token;
          MainChannel.request('main:app:set-auth-token', token);
          return this.trigger('save:form:success', this.model);
        },
        error: (response) => {
          var msg;
          if (__DEV__) {
            console.log("error", response.responseJSON);
          }
          msg = response.responseJSON;
          MessageChannel.request('danger', msg.message);
          return this.trigger('save:form:failure', this.model);
        }
      });
      return console.log("returning xhr", xhr);
    }

  };

  LoginView.prototype.template = login_form;

  LoginView.prototype.fieldList = ['username', 'password'];

  return LoginView;

}).call(this);

token_form = tc.renderable(function(user) {
  form_group_input_div({
    input_id: 'input_token',
    label: 'Auth Token',
    input_attributes: {
      name: 'token',
      placeholder: 'xxxxxxxxxxxxxxx'
    }
  });
  tc.input('.btn.btn-primary', {
    type: 'submit',
    value: 'login'
  });
  return tc.div('.spinner.fa.fa-spinner.fa-spin');
});

TokenView = (function() {
  class TokenView extends BaseView {
    updateModel() {
      console.log('updateModel called');
      return this.model.set('token', this.ui.token.val());
    }

    saveModel() {
      var AuthRefresh, refresh, response, token;
      token = this.model.get('token');
      MainChannel.request('main:app:set-auth-token', token);
      AuthRefresh = MainChannel.request('main:app:AuthRefresh');
      refresh = new AuthRefresh;
      response = refresh.fetch();
      response.fail(() => {
        var msg;
        msg = response.responseJSON;
        MessageChannel.request('danger', msg.message);
        return this.trigger('save:form:failure', this.model);
      });
      return response.done(() => {
        return this.trigger('save:form:success', this.model);
      });
    }

  };

  TokenView.prototype.template = token_form;

  TokenView.prototype.fieldList = ['token'];

  return TokenView;

}).call(this);

MainView = (function() {
  class MainView extends View {
    onRender() {
      this.showChildView('login', new LoginView);
      return this.showChildView('token', new TokenView);
    }

  };

  MainView.prototype.template = tc.renderable(function(model) {
    tc.div('#login-form');
    return tc.div('#token-form');
  });

  MainView.prototype.regions = {
    login: '#login-form',
    token: '#token-form'
  };

  return MainView;

}).call(this);

export default MainView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbG9naW52aWV3LmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2Zyb250ZG9vci9sb2dpbnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsUUFBQSxFQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsb0JBQUEsRUFBQSxVQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sbUJBQVAsTUFBQTs7QUFDQSxPQUFPLGVBQVAsTUFBQTs7QUFFQSxDQUFBLENBQUUsb0JBQUYsQ0FBQSxHQUEyQixPQUFBLENBQVEsdUJBQVIsQ0FBM0I7O0FBQ0EsT0FBTyxpQkFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRWpCLFVBQUEsR0FBYyxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxJQUFELENBQUE7RUFDMUIsb0JBQUEsQ0FDRTtJQUFBLFFBQUEsRUFBVSxnQkFBVjtJQUNBLEtBQUEsRUFBTyxXQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxVQUFOO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFIRixDQURGO0VBTUEsb0JBQUEsQ0FDRTtJQUFBLFFBQUEsRUFBVSxnQkFBVjtJQUNBLEtBQUEsRUFBTyxVQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxVQUFOO01BQ0EsSUFBQSxFQUFNLFVBRE47TUFFQSxXQUFBLEVBQWE7SUFGYjtFQUhGLENBREY7RUFPQSxFQUFFLENBQUMsS0FBSCxDQUFTLGtCQUFULEVBQTZCO0lB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RlE7O0VBUFo7O3FCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQO0VBRnNCLENBQWQ7O3FCQUdWLE9BQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxhQUFQO0lBQ0EsS0FBQSxFQUFPO0VBRFA7Ozs7OztBQVVKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IG1ha2VfZmllbGRfaW5wdXRfdWkgZnJvbSAnLi4vLi4vdXRpbC9tYWtlLWZpZWxkLWlucHV0LXVpJ1xuaW1wb3J0IG5hdmlnYXRlX3RvX3VybCBmcm9tICcuLi8uLi91dGlsL25hdmlnYXRlLXRvLXVybCdcblxueyBmb3JtX2dyb3VwX2lucHV0X2RpdiB9ID0gcmVxdWlyZSAnLi4vLi4vdGVtcGxhdGVzL2Zvcm1zJ1xuaW1wb3J0IEJvb3RzdHJhcEZvcm1WaWV3IGZyb20gJy4uLy4uL3ZpZXdzL2JzZm9ybXZpZXcnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxubG9naW5fZm9ybSA9ICB0Yy5yZW5kZXJhYmxlICh1c2VyKSAtPlxuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfdXNlcm5hbWUnXG4gICAgbGFiZWw6ICdVc2VyIE5hbWUnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICd1c2VybmFtZSdcbiAgICAgIHBsYWNlaG9sZGVyOiAnVXNlciBOYW1lJ1xuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfcGFzc3dvcmQnXG4gICAgbGFiZWw6ICdQYXNzd29yZCdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ3Bhc3N3b3JkJ1xuICAgICAgdHlwZTogJ3Bhc3N3b3JkJ1xuICAgICAgcGxhY2Vob2xkZXI6ICdUeXBlIHlvdXIgcGFzc3dvcmQgaGVyZS4uLi4nXG4gIHRjLmlucHV0ICcuYnRuLmJ0bi1wcmltYXJ5JywgdHlwZTonc3VibWl0JywgdmFsdWU6J2xvZ2luJ1xuICB0Yy5kaXYgJy5zcGlubmVyLmZhLmZhLXNwaW5uZXIuZmEtc3BpbidcblxuXG5jbGFzcyBCYXNlVmlldyBleHRlbmRzIEJvb3RzdHJhcEZvcm1WaWV3XG4gIHVpOiAtPlxuICAgIHVpb2JqZWN0ID0gbWFrZV9maWVsZF9pbnB1dF91aSBAZmllbGRMaXN0XG4gICAgcmV0dXJuIHVpb2JqZWN0XG4gIGNyZWF0ZU1vZGVsOiAtPlxuICAgIG5ldyBCYWNrYm9uZS5Nb2RlbFxuICBvblN1Y2Nlc3M6IC0+XG4gICAgIyBGSVhNRSBzdGFydCByZWxvYWRpbmcgdGhlIGNoaWxkIGFwcHNcbiAgICAjIHRoYXQgcmVjb2duaXplIHVzZXJzXG4gICAgbmF2aWdhdGVfdG9fdXJsICcjJ1xuICAgIFxuXG5cbiAgXG5jbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBCYXNlVmlld1xuICB0ZW1wbGF0ZTogbG9naW5fZm9ybVxuICBmaWVsZExpc3Q6IFsndXNlcm5hbWUnLCAncGFzc3dvcmQnXVxuICB1cGRhdGVNb2RlbDogLT5cbiAgICBjb25zb2xlLmxvZyAndXBkYXRlTW9kZWwgY2FsbGVkJ1xuICAgIEBtb2RlbC5zZXQgJ3VzZXJuYW1lJywgQHVpLnVzZXJuYW1lLnZhbCgpXG4gICAgQG1vZGVsLnNldCAncGFzc3dvcmQnLCBAdWkucGFzc3dvcmQudmFsKClcbiAgc2F2ZU1vZGVsOiAtPlxuICAgIHVzZXJuYW1lICA9IEBtb2RlbC5nZXQgJ3VzZXJuYW1lJ1xuICAgIHBhc3N3b3JkID0gQG1vZGVsLmdldCAncGFzc3dvcmQnXG4gICAgeGhyID0gJC5hamF4XG4gICAgICB1cmw6ICcvbG9naW4nXG4gICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIGRhdGE6XG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZVxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT5cbiAgICAgICAgdG9rZW4gPSByZXNwb25zZS50b2tlblxuICAgICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpzZXQtYXV0aC10b2tlbicsIHRva2VuXG4gICAgICAgIEB0cmlnZ2VyICdzYXZlOmZvcm06c3VjY2VzcycsIEBtb2RlbFxuICAgICAgICBcbiAgICAgIGVycm9yOiAocmVzcG9uc2UpID0+XG4gICAgICAgIGlmIF9fREVWX19cbiAgICAgICAgICBjb25zb2xlLmxvZyBcImVycm9yXCIsIHJlc3BvbnNlLnJlc3BvbnNlSlNPTlxuICAgICAgICBtc2cgPSByZXNwb25zZS5yZXNwb25zZUpTT05cbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgbXNnLm1lc3NhZ2VcbiAgICAgICAgQHRyaWdnZXIgJ3NhdmU6Zm9ybTpmYWlsdXJlJywgQG1vZGVsXG4gICAgY29uc29sZS5sb2cgXCJyZXR1cm5pbmcgeGhyXCIsIHhoclxuICAgIFxuXG50b2tlbl9mb3JtID0gIHRjLnJlbmRlcmFibGUgKHVzZXIpIC0+XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF90b2tlbidcbiAgICBsYWJlbDogJ0F1dGggVG9rZW4nXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICd0b2tlbidcbiAgICAgIHBsYWNlaG9sZGVyOiAneHh4eHh4eHh4eHh4eHh4J1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tcHJpbWFyeScsIHR5cGU6J3N1Ym1pdCcsIHZhbHVlOidsb2dpbidcbiAgdGMuZGl2ICcuc3Bpbm5lci5mYS5mYS1zcGlubmVyLmZhLXNwaW4nXG5cbmNsYXNzIFRva2VuVmlldyBleHRlbmRzIEJhc2VWaWV3XG4gIHRlbXBsYXRlOiB0b2tlbl9mb3JtXG4gIGZpZWxkTGlzdDogWyd0b2tlbiddXG4gIHVwZGF0ZU1vZGVsOiAtPlxuICAgIGNvbnNvbGUubG9nICd1cGRhdGVNb2RlbCBjYWxsZWQnXG4gICAgQG1vZGVsLnNldCAndG9rZW4nLCBAdWkudG9rZW4udmFsKClcbiAgc2F2ZU1vZGVsOiAtPlxuICAgIHRva2VuID0gQG1vZGVsLmdldCAndG9rZW4nXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCB0b2tlblxuICAgIEF1dGhSZWZyZXNoID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6QXV0aFJlZnJlc2gnXG4gICAgcmVmcmVzaCA9IG5ldyBBdXRoUmVmcmVzaFxuICAgIHJlc3BvbnNlID0gcmVmcmVzaC5mZXRjaCgpXG4gICAgcmVzcG9uc2UuZmFpbCA9PlxuICAgICAgbXNnID0gcmVzcG9uc2UucmVzcG9uc2VKU09OXG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBtc2cubWVzc2FnZVxuICAgICAgQHRyaWdnZXIgJ3NhdmU6Zm9ybTpmYWlsdXJlJywgQG1vZGVsXG4gICAgcmVzcG9uc2UuZG9uZSA9PlxuICAgICAgQHRyaWdnZXIgJ3NhdmU6Zm9ybTpzdWNjZXNzJywgQG1vZGVsXG5cbmNsYXNzIE1haW5WaWV3IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcjbG9naW4tZm9ybSdcbiAgICB0Yy5kaXYgJyN0b2tlbi1mb3JtJ1xuICByZWdpb25zOlxuICAgIGxvZ2luOiAnI2xvZ2luLWZvcm0nXG4gICAgdG9rZW46ICcjdG9rZW4tZm9ybSdcbiAgb25SZW5kZXI6IC0+XG4gICAgQHNob3dDaGlsZFZpZXcgJ2xvZ2luJywgbmV3IExvZ2luVmlld1xuICAgIEBzaG93Q2hpbGRWaWV3ICd0b2tlbicsIG5ldyBUb2tlblZpZXdcblxuXG5cbiAgICBcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE1haW5WaWV3XG4iXX0=
