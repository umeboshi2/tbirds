var Backbone, BaseView, BootstrapFormView, LoginView, MainChannel, MainView, Marionette, MessageChannel, TokenView, form_group_input_div, login_form, make_field_input_ui, navigate_to_url, tc, token_form;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

make_field_input_ui = require('../../util/make-field-input-ui');

navigate_to_url = require('../../util/navigate-to-url');

({form_group_input_div} = require('../../templates/forms'));

BootstrapFormView = require('../../views/bsformview');

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
  tc.input('.btn.btn-default', {
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
    return navigate_to_url('/');
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
  tc.input('.btn.btn-default', {
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
  class MainView extends Marionette.View {
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

module.exports = MainView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbG9naW52aWV3LmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2Zyb250ZG9vci9sb2dpbnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxpQkFBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsU0FBQSxFQUFBLG9CQUFBLEVBQUEsVUFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBLEVBQUEsRUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLGdDQUFSOztBQUN0QixlQUFBLEdBQWtCLE9BQUEsQ0FBUSw0QkFBUjs7QUFFbEIsQ0FBQSxDQUFFLG9CQUFGLENBQUEsR0FBMkIsT0FBQSxDQUFRLHVCQUFSLENBQTNCOztBQUNBLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSx3QkFBUjs7QUFFcEIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsVUFBQSxHQUFjLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtFQUMxQixvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLGdCQUFWO0lBQ0EsS0FBQSxFQUFPLFdBRFA7SUFFQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLFVBQU47TUFDQSxXQUFBLEVBQWE7SUFEYjtFQUhGLENBREY7RUFNQSxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLGdCQUFWO0lBQ0EsS0FBQSxFQUFPLFVBRFA7SUFFQSxnQkFBQSxFQUNFO01BQUEsSUFB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UUFBVSxDQUFBLENBQUE7TUFDUixJQUFDLENBQUEsYUFBRCxDQUFlLE9BQWYsRUFBd0IsSUFBSSxTQUE1QjthQUNBLElBQUMsQ0FBQSxhQUFELENBQWUsT0FBZixFQUF3QixJQUFJLFNBQTVCO0lBRlE7O0VBUFo7O3FCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQO0VBRnNCLENBQWQ7O3FCQUdWLE9BQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxhQUFQO0lBQ0EsS0FBQSxFQUFPO0VBRFA7Ozs7OztBQVVKLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbm1ha2VfZmllbGRfaW5wdXRfdWkgPSByZXF1aXJlICcuLi8uLi91dGlsL21ha2UtZmllbGQtaW5wdXQtdWknXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuLi8uLi91dGlsL25hdmlnYXRlLXRvLXVybCdcblxueyBmb3JtX2dyb3VwX2lucHV0X2RpdiB9ID0gcmVxdWlyZSAnLi4vLi4vdGVtcGxhdGVzL2Zvcm1zJ1xuQm9vdHN0cmFwRm9ybVZpZXcgPSByZXF1aXJlICcuLi8uLi92aWV3cy9ic2Zvcm12aWV3J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmxvZ2luX2Zvcm0gPSAgdGMucmVuZGVyYWJsZSAodXNlcikgLT5cbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X3VzZXJuYW1lJ1xuICAgIGxhYmVsOiAnVXNlciBOYW1lJ1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAndXNlcm5hbWUnXG4gICAgICBwbGFjZWhvbGRlcjogJ1VzZXIgTmFtZSdcbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X3Bhc3N3b3JkJ1xuICAgIGxhYmVsOiAnUGFzc3dvcmQnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICdwYXNzd29yZCdcbiAgICAgIHR5cGU6ICdwYXNzd29yZCdcbiAgICAgIHBsYWNlaG9sZGVyOiAnVHlwZSB5b3VyIHBhc3N3b3JkIGhlcmUuLi4uJ1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tZGVmYXVsdCcsIHR5cGU6J3N1Ym1pdCcsIHZhbHVlOidsb2dpbidcbiAgdGMuZGl2ICcuc3Bpbm5lci5mYS5mYS1zcGlubmVyLmZhLXNwaW4nXG5cblxuY2xhc3MgQmFzZVZpZXcgZXh0ZW5kcyBCb290c3RyYXBGb3JtVmlld1xuICB1aTogLT5cbiAgICB1aW9iamVjdCA9IG1ha2VfZmllbGRfaW5wdXRfdWkgQGZpZWxkTGlzdFxuICAgIHJldHVybiB1aW9iamVjdFxuICBjcmVhdGVNb2RlbDogLT5cbiAgICBuZXcgQmFja2JvbmUuTW9kZWxcbiAgb25TdWNjZXNzOiAtPlxuICAgICMgRklYTUUgc3RhcnQgcmVsb2FkaW5nIHRoZSBjaGlsZCBhcHBzXG4gICAgIyB0aGF0IHJlY29nbml6ZSB1c2Vyc1xuICAgIG5hdmlnYXRlX3RvX3VybCAnLydcbiAgICBcblxuXG4gIFxuY2xhc3MgTG9naW5WaWV3IGV4dGVuZHMgQmFzZVZpZXdcbiAgdGVtcGxhdGU6IGxvZ2luX2Zvcm1cbiAgZmllbGRMaXN0OiBbJ3VzZXJuYW1lJywgJ3Bhc3N3b3JkJ11cbiAgdXBkYXRlTW9kZWw6IC0+XG4gICAgY29uc29sZS5sb2cgJ3VwZGF0ZU1vZGVsIGNhbGxlZCdcbiAgICBAbW9kZWwuc2V0ICd1c2VybmFtZScsIEB1aS51c2VybmFtZS52YWwoKVxuICAgIEBtb2RlbC5zZXQgJ3Bhc3N3b3JkJywgQHVpLnBhc3N3b3JkLnZhbCgpXG4gIHNhdmVNb2RlbDogLT5cbiAgICB1c2VybmFtZSAgPSBAbW9kZWwuZ2V0ICd1c2VybmFtZSdcbiAgICBwYXNzd29yZCA9IEBtb2RlbC5nZXQgJ3Bhc3N3b3JkJ1xuICAgIHhociA9ICQuYWpheFxuICAgICAgdXJsOiAnL2xvZ2luJ1xuICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICBkYXRhOlxuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgICBzdWNjZXNzOiAocmVzcG9uc2UpID0+XG4gICAgICAgIHRva2VuID0gcmVzcG9uc2UudG9rZW5cbiAgICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCB0b2tlblxuICAgICAgICBAdHJpZ2dlciAnc2F2ZTpmb3JtOnN1Y2Nlc3MnLCBAbW9kZWxcbiAgICAgICAgXG4gICAgICBlcnJvcjogKHJlc3BvbnNlKSA9PlxuICAgICAgICBpZiBfX0RFVl9fXG4gICAgICAgICAgY29uc29sZS5sb2cgXCJlcnJvclwiLCByZXNwb25zZS5yZXNwb25zZUpTT05cbiAgICAgICAgbXNnID0gcmVzcG9uc2UucmVzcG9uc2VKU09OXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RhbmdlcicsIG1zZy5tZXNzYWdlXG4gICAgICAgIEB0cmlnZ2VyICdzYXZlOmZvcm06ZmFpbHVyZScsIEBtb2RlbFxuICAgIGNvbnNvbGUubG9nIFwicmV0dXJuaW5nIHhoclwiLCB4aHJcbiAgICBcblxudG9rZW5fZm9ybSA9ICB0Yy5yZW5kZXJhYmxlICh1c2VyKSAtPlxuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfdG9rZW4nXG4gICAgbGFiZWw6ICdBdXRoIFRva2VuJ1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAndG9rZW4nXG4gICAgICBwbGFjZWhvbGRlcjogJ3h4eHh4eHh4eHh4eHh4eCdcbiAgdGMuaW5wdXQgJy5idG4uYnRuLWRlZmF1bHQnLCB0eXBlOidzdWJtaXQnLCB2YWx1ZTonbG9naW4nXG4gIHRjLmRpdiAnLnNwaW5uZXIuZmEuZmEtc3Bpbm5lci5mYS1zcGluJ1xuXG5jbGFzcyBUb2tlblZpZXcgZXh0ZW5kcyBCYXNlVmlld1xuICB0ZW1wbGF0ZTogdG9rZW5fZm9ybVxuICBmaWVsZExpc3Q6IFsndG9rZW4nXVxuICB1cGRhdGVNb2RlbDogLT5cbiAgICBjb25zb2xlLmxvZyAndXBkYXRlTW9kZWwgY2FsbGVkJ1xuICAgIEBtb2RlbC5zZXQgJ3Rva2VuJywgQHVpLnRva2VuLnZhbCgpXG4gIHNhdmVNb2RlbDogLT5cbiAgICB0b2tlbiA9IEBtb2RlbC5nZXQgJ3Rva2VuJ1xuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnNldC1hdXRoLXRva2VuJywgdG9rZW5cbiAgICBBdXRoUmVmcmVzaCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOkF1dGhSZWZyZXNoJ1xuICAgIHJlZnJlc2ggPSBuZXcgQXV0aFJlZnJlc2hcbiAgICByZXNwb25zZSA9IHJlZnJlc2guZmV0Y2goKVxuICAgIHJlc3BvbnNlLmZhaWwgPT5cbiAgICAgIG1zZyA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgbXNnLm1lc3NhZ2VcbiAgICAgIEB0cmlnZ2VyICdzYXZlOmZvcm06ZmFpbHVyZScsIEBtb2RlbFxuICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgIEB0cmlnZ2VyICdzYXZlOmZvcm06c3VjY2VzcycsIEBtb2RlbFxuXG5jbGFzcyBNYWluVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcjbG9naW4tZm9ybSdcbiAgICB0Yy5kaXYgJyN0b2tlbi1mb3JtJ1xuICByZWdpb25zOlxuICAgIGxvZ2luOiAnI2xvZ2luLWZvcm0nXG4gICAgdG9rZW46ICcjdG9rZW4tZm9ybSdcbiAgb25SZW5kZXI6IC0+XG4gICAgQHNob3dDaGlsZFZpZXcgJ2xvZ2luJywgbmV3IExvZ2luVmlld1xuICAgIEBzaG93Q2hpbGRWaWV3ICd0b2tlbicsIG5ldyBUb2tlblZpZXdcblxuXG5cbiAgICBcbiAgICBcbm1vZHVsZS5leHBvcnRzID0gTWFpblZpZXdcbiJdfQ==
