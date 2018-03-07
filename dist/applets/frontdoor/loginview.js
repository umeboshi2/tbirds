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
  tc.input('.btn.btn-secondary', {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbG9naW52aWV3LmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2Zyb250ZG9vci9sb2dpbnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxpQkFBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsU0FBQSxFQUFBLG9CQUFBLEVBQUEsVUFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBLEVBQUEsRUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLGdDQUFSOztBQUN0QixlQUFBLEdBQWtCLE9BQUEsQ0FBUSw0QkFBUjs7QUFFbEIsQ0FBQSxDQUFFLG9CQUFGLENBQUEsR0FBMkIsT0FBQSxDQUFRLHVCQUFSLENBQTNCOztBQUNBLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSx3QkFBUjs7QUFFcEIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsVUFBQSxHQUFjLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtFQUMxQixvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLGdCQUFWO0lBQ0EsS0FBQSxFQUFPLFdBRFA7SUFFQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLFVBQU47TUFDQSxXQUFBLEVBQWE7SUFEYjtFQUhGLENBREY7RUFNQSxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLGdCQUFWO0lBQ0EsS0FBQSxFQUFPLFVBRFA7SUFFQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLFVBQU47TUFDQSxJQUFBLEVBQU0sVUFETjtNQUVBLFdBQUEsRUFBYTtJQUZiO0VBSEYsQ0FERjtFQU9BLEVBQUUsQ0FBQyxLQUFILENBQVMsb0JBQVQsRUFBK0I7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLEtBQUEsRUFBTTtFQUFyQixDQUEvQjtTQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0NBQVA7QUFmMEIsQ0FBZDs7QUFrQlIsV0FBTixNQUFBLFNBQUEsUUFBdUIsa0JBQXZCO0VBQ0UsRUFBSSxDQUFBLENBQUE7QUFDRixRQUFBO0lBQUEsUUFBQSxHQUFXLG1CQUFBLENBQW9CLElBQUMsQ0FBQSxTQUFyQjtBQUNYLFdBQU87RUFGTDs7RUFHSixXQUFhLENBQUEsQ0FBQTtXQUNYLElBQUksUUFBUSxDQUFDO0VBREY7O0VBRWIsU0FBVyxDQUFBLENBQUEsRUFBQTs7O1dBR1QsZUFBQSxDQUFnQixHQUFoQjtFQUhTOztBQU5iOztBQWNNO0VBQU4sTUFBQSxVQUFBLFFBQXdCLFNBQXhCO0lBR0UsV0FBYSxDQUFBLENBQUE7TUFDWCxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaO01BQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWCxFQUF1QixJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFiLENBQUEsQ0FBdkI7YUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxVQUFYLEVBQXVCLElBQUMsQ0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQWIsQ0FBQSxDQUF2QjtJQUhXOztJQUliLFNBQVcsQ0FBQSxDQUFBO0FBQ1QsVUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBO01BQUEsUUFBQSxHQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVg7TUFDWixRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWDtNQUNYLEdBQUEsR0FBTSxDQUFDLENBQUMsSUFBRixDQUNKO1FBQUEsR0FBQSxFQUFLLFFBQUw7UUFDQSxJQUFBLEVBQU0sTUFETjtRQUVBLElBQUEsRUFDRTtVQUFBLFFBQUEsRUFBVSxRQUFWO1VBQ0EsUUFBQSxFQUFVO1FBRFYsQ0FIRjtRQUtBLFFBQUEsRUFBVSxNQUxWO1FBTUEsT0FBQSxFQUFTLENBQUMsUUFBRCxDQUFBLEdBQUE7QUFDUCxjQUFBO1VBQUEsS0FBQSxHQUFRLFFBQVEsQ0FBQztVQUNqQixXQUFXLENBQUMsT0FBWixDQUFvQix5QkFBcEIsRUFBK0MsS0FBL0M7aUJBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxtQkFBVCxFQUE4QixJQUFDLENBQUEsS0FBL0I7UUFITyxDQU5UO1FBV0EsS0FBQSxFQUFPLENBQUMsUUFBRCxDQUFBLEdBQUE7QUFDTCxjQUFBO1VBQUEsSUFBRyxPQUFIO1lBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLFFBQVEsQ0FBQyxZQUE5QixFQURGOztVQUVBLEdBQUEsR0FBTSxRQUFRLENBQUM7VUFDZixjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxHQUFHLENBQUMsT0FBckM7aUJBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxtQkFBVCxFQUE4QixJQUFDLENBQUEsS0FBL0I7UUFMSztNQVhQLENBREk7YUFrQk4sT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLEdBQTdCO0lBckJTOztFQVBiOztzQkFDRSxRQUFBLEdBQVU7O3NCQUNWLFNBQUEsR0FBVyxDQUFDLFVBQUQsRUFBYSxVQUFiOzs7Ozs7QUE2QmIsVUFBQSxHQUFjLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtFQUMxQixvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLGFBQVY7SUFDQSxLQUFBLEVBQU8sWUFEUDtJQUVBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sT0FBTjtNQUNBLFdBQUEsRUFBYTtJQURiO0VBSEYsQ0FERjtFQU1BLEVBQUUsQ0FBQyxLQUFILENBQVMsa0JBQVQsRUFBNkI7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLEtBQUEsRUFBTTtFQUFyQixDQUE3QjtTQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0NBQVA7QUFSMEIsQ0FBZDs7QUFVUjtFQUFOLE1BQUEsVUFBQSxRQUF3QixTQUF4QjtJQUdFLFdBQWEsQ0FBQSxDQUFBO01BQ1gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBWjthQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE9BQVgsRUFBb0IsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBVixDQUFBLENBQXBCO0lBRlc7O0lBR2IsU0FBVyxDQUFBLENBQUE7QUFDVCxVQUFBLFdBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBO01BQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE9BQVg7TUFDUixXQUFXLENBQUMsT0FBWixDQUFvQix5QkFBcEIsRUFBK0MsS0FBL0M7TUFDQSxXQUFBLEdBQWMsV0FBVyxDQUFDLE9BQVosQ0FBb0Isc0JBQXBCO01BQ2QsT0FBQSxHQUFVLElBQUk7TUFDZCxRQUFBLEdBQVcsT0FBTyxDQUFDLEtBQVIsQ0FBQTtNQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBQSxDQUFBLEdBQUE7QUFDWixZQUFBO1FBQUEsR0FBQSxHQUFNLFFBQVEsQ0FBQztRQUNmLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLEdBQUcsQ0FBQyxPQUFyQztlQUNBLElBQUMsQ0FBQSxPQUFELENBQVMsbUJBQVQsRUFBOEIsSUFBQyxDQUFBLEtBQS9CO01BSFksQ0FBZDthQUlBLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBQSxDQUFBLEdBQUE7ZUFDWixJQUFDLENBQUEsT0FBRCxDQUFTLG1CQUFULEVBQThCLElBQUMsQ0FBQSxLQUEvQjtNQURZLENBQWQ7SUFWUzs7RUFOYjs7c0JBQ0UsUUFBQSxHQUFVOztzQkFDVixTQUFBLEdBQVcsQ0FBQyxPQUFEOzs7Ozs7QUFpQlA7RUFBTixNQUFBLFNBQUEsUUFBdUIsVUFBVSxDQUFDLEtBQWxDO0lBT0UsUUFBVSxDQUFBLENBQUE7TUFDUixJQUFDLENBQUEsYUFBRCxDQUFlLE9BQWYsRUFBd0IsSUFBSSxTQUE1QjthQUNBLElBQUMsQ0FBQSxhQUFELENBQWUsT0FBZixFQUF3QixJQUFJLFNBQTVCO0lBRlE7O0VBUFo7O3FCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQO0VBRnNCLENBQWQ7O3FCQUdWLE9BQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxhQUFQO0lBQ0EsS0FBQSxFQUFPO0VBRFA7Ozs7OztBQVVKLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbm1ha2VfZmllbGRfaW5wdXRfdWkgPSByZXF1aXJlICcuLi8uLi91dGlsL21ha2UtZmllbGQtaW5wdXQtdWknXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuLi8uLi91dGlsL25hdmlnYXRlLXRvLXVybCdcblxueyBmb3JtX2dyb3VwX2lucHV0X2RpdiB9ID0gcmVxdWlyZSAnLi4vLi4vdGVtcGxhdGVzL2Zvcm1zJ1xuQm9vdHN0cmFwRm9ybVZpZXcgPSByZXF1aXJlICcuLi8uLi92aWV3cy9ic2Zvcm12aWV3J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmxvZ2luX2Zvcm0gPSAgdGMucmVuZGVyYWJsZSAodXNlcikgLT5cbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X3VzZXJuYW1lJ1xuICAgIGxhYmVsOiAnVXNlciBOYW1lJ1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAndXNlcm5hbWUnXG4gICAgICBwbGFjZWhvbGRlcjogJ1VzZXIgTmFtZSdcbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X3Bhc3N3b3JkJ1xuICAgIGxhYmVsOiAnUGFzc3dvcmQnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICdwYXNzd29yZCdcbiAgICAgIHR5cGU6ICdwYXNzd29yZCdcbiAgICAgIHBsYWNlaG9sZGVyOiAnVHlwZSB5b3VyIHBhc3N3b3JkIGhlcmUuLi4uJ1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tc2Vjb25kYXJ5JywgdHlwZTonc3VibWl0JywgdmFsdWU6J2xvZ2luJ1xuICB0Yy5kaXYgJy5zcGlubmVyLmZhLmZhLXNwaW5uZXIuZmEtc3BpbidcblxuXG5jbGFzcyBCYXNlVmlldyBleHRlbmRzIEJvb3RzdHJhcEZvcm1WaWV3XG4gIHVpOiAtPlxuICAgIHVpb2JqZWN0ID0gbWFrZV9maWVsZF9pbnB1dF91aSBAZmllbGRMaXN0XG4gICAgcmV0dXJuIHVpb2JqZWN0XG4gIGNyZWF0ZU1vZGVsOiAtPlxuICAgIG5ldyBCYWNrYm9uZS5Nb2RlbFxuICBvblN1Y2Nlc3M6IC0+XG4gICAgIyBGSVhNRSBzdGFydCByZWxvYWRpbmcgdGhlIGNoaWxkIGFwcHNcbiAgICAjIHRoYXQgcmVjb2duaXplIHVzZXJzXG4gICAgbmF2aWdhdGVfdG9fdXJsICcvJ1xuICAgIFxuXG5cbiAgXG5jbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBCYXNlVmlld1xuICB0ZW1wbGF0ZTogbG9naW5fZm9ybVxuICBmaWVsZExpc3Q6IFsndXNlcm5hbWUnLCAncGFzc3dvcmQnXVxuICB1cGRhdGVNb2RlbDogLT5cbiAgICBjb25zb2xlLmxvZyAndXBkYXRlTW9kZWwgY2FsbGVkJ1xuICAgIEBtb2RlbC5zZXQgJ3VzZXJuYW1lJywgQHVpLnVzZXJuYW1lLnZhbCgpXG4gICAgQG1vZGVsLnNldCAncGFzc3dvcmQnLCBAdWkucGFzc3dvcmQudmFsKClcbiAgc2F2ZU1vZGVsOiAtPlxuICAgIHVzZXJuYW1lICA9IEBtb2RlbC5nZXQgJ3VzZXJuYW1lJ1xuICAgIHBhc3N3b3JkID0gQG1vZGVsLmdldCAncGFzc3dvcmQnXG4gICAgeGhyID0gJC5hamF4XG4gICAgICB1cmw6ICcvbG9naW4nXG4gICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIGRhdGE6XG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZVxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT5cbiAgICAgICAgdG9rZW4gPSByZXNwb25zZS50b2tlblxuICAgICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpzZXQtYXV0aC10b2tlbicsIHRva2VuXG4gICAgICAgIEB0cmlnZ2VyICdzYXZlOmZvcm06c3VjY2VzcycsIEBtb2RlbFxuICAgICAgICBcbiAgICAgIGVycm9yOiAocmVzcG9uc2UpID0+XG4gICAgICAgIGlmIF9fREVWX19cbiAgICAgICAgICBjb25zb2xlLmxvZyBcImVycm9yXCIsIHJlc3BvbnNlLnJlc3BvbnNlSlNPTlxuICAgICAgICBtc2cgPSByZXNwb25zZS5yZXNwb25zZUpTT05cbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgbXNnLm1lc3NhZ2VcbiAgICAgICAgQHRyaWdnZXIgJ3NhdmU6Zm9ybTpmYWlsdXJlJywgQG1vZGVsXG4gICAgY29uc29sZS5sb2cgXCJyZXR1cm5pbmcgeGhyXCIsIHhoclxuICAgIFxuXG50b2tlbl9mb3JtID0gIHRjLnJlbmRlcmFibGUgKHVzZXIpIC0+XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF90b2tlbidcbiAgICBsYWJlbDogJ0F1dGggVG9rZW4nXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICd0b2tlbidcbiAgICAgIHBsYWNlaG9sZGVyOiAneHh4eHh4eHh4eHh4eHh4J1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tZGVmYXVsdCcsIHR5cGU6J3N1Ym1pdCcsIHZhbHVlOidsb2dpbidcbiAgdGMuZGl2ICcuc3Bpbm5lci5mYS5mYS1zcGlubmVyLmZhLXNwaW4nXG5cbmNsYXNzIFRva2VuVmlldyBleHRlbmRzIEJhc2VWaWV3XG4gIHRlbXBsYXRlOiB0b2tlbl9mb3JtXG4gIGZpZWxkTGlzdDogWyd0b2tlbiddXG4gIHVwZGF0ZU1vZGVsOiAtPlxuICAgIGNvbnNvbGUubG9nICd1cGRhdGVNb2RlbCBjYWxsZWQnXG4gICAgQG1vZGVsLnNldCAndG9rZW4nLCBAdWkudG9rZW4udmFsKClcbiAgc2F2ZU1vZGVsOiAtPlxuICAgIHRva2VuID0gQG1vZGVsLmdldCAndG9rZW4nXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2V0LWF1dGgtdG9rZW4nLCB0b2tlblxuICAgIEF1dGhSZWZyZXNoID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6QXV0aFJlZnJlc2gnXG4gICAgcmVmcmVzaCA9IG5ldyBBdXRoUmVmcmVzaFxuICAgIHJlc3BvbnNlID0gcmVmcmVzaC5mZXRjaCgpXG4gICAgcmVzcG9uc2UuZmFpbCA9PlxuICAgICAgbXNnID0gcmVzcG9uc2UucmVzcG9uc2VKU09OXG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBtc2cubWVzc2FnZVxuICAgICAgQHRyaWdnZXIgJ3NhdmU6Zm9ybTpmYWlsdXJlJywgQG1vZGVsXG4gICAgcmVzcG9uc2UuZG9uZSA9PlxuICAgICAgQHRyaWdnZXIgJ3NhdmU6Zm9ybTpzdWNjZXNzJywgQG1vZGVsXG5cbmNsYXNzIE1haW5WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJyNsb2dpbi1mb3JtJ1xuICAgIHRjLmRpdiAnI3Rva2VuLWZvcm0nXG4gIHJlZ2lvbnM6XG4gICAgbG9naW46ICcjbG9naW4tZm9ybSdcbiAgICB0b2tlbjogJyN0b2tlbi1mb3JtJ1xuICBvblJlbmRlcjogLT5cbiAgICBAc2hvd0NoaWxkVmlldyAnbG9naW4nLCBuZXcgTG9naW5WaWV3XG4gICAgQHNob3dDaGlsZFZpZXcgJ3Rva2VuJywgbmV3IFRva2VuVmlld1xuXG5cblxuICAgIFxuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBNYWluVmlld1xuIl19
