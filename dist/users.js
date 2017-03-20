var Backbone, CurrentUser, MainChannel, MessageChannel, User, make_current_user_model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

User = (function(superClass) {
  extend(User, superClass);

  function User() {
    return User.__super__.constructor.apply(this, arguments);
  }

  return User;

})(Backbone.Model);

CurrentUser = (function(superClass) {
  extend(CurrentUser, superClass);

  function CurrentUser() {
    return CurrentUser.__super__.constructor.apply(this, arguments);
  }

  return CurrentUser;

})(User);

make_current_user_model = function(url) {
  var user;
  user = new CurrentUser;
  user.url = url;
  return user;
};

MainChannel.reply('create-current-user-object', function(url) {
  var currentuser;
  currentuser = make_current_user_model(url);
  MainChannel.reply('current-user', function() {
    return currentuser;
  });
  MainChannel.reply('update-user-config', function(config) {
    var response;
    currentuser.set('config', config);
    response = currentuser.save();
    response.done((function(_this) {
      return function() {
        return currentuser;
      };
    })(this));
    return response.fail((function(_this) {
      return function() {
        return MessageChannel.request('danger', 'failed to update user config!');
      };
    })(this));
  });
  return currentuser;
});

module.exports = {
  User: User,
  CurrentUser: CurrentUser
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VzIjpbInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGlGQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFFWCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYOzs7Ozs7Ozs7R0FBYSxRQUFRLENBQUM7O0FBRXRCOzs7Ozs7Ozs7R0FBb0I7O0FBRTFCLHVCQUFBLEdBQTBCLFNBQUMsR0FBRDtBQUN4QixNQUFBO0VBQUEsSUFBQSxHQUFNLElBQUk7RUFDVixJQUFJLENBQUMsR0FBTCxHQUFXO0FBQ1gsU0FBTztBQUhpQjs7QUFLMUIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsNEJBQWxCLEVBQWdELFNBQUMsR0FBRDtBQUM5QyxNQUFBO0VBQUEsV0FBQSxHQUFjLHVCQUFBLENBQXdCLEdBQXhCO0VBRWQsV0FBVyxDQUFDLEtBQVosQ0FBa0IsY0FBbEIsRUFBa0MsU0FBQTtXQUNoQztFQURnQyxDQUFsQztFQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLG9CQUFsQixFQUF3QyxTQUFDLE1BQUQ7QUFDdEMsUUFBQTtJQUFBLFdBQVcsQ0FBQyxHQUFaLENBQWdCLFFBQWhCLEVBQTBCLE1BQTFCO0lBQ0EsUUFBQSxHQUFXLFdBQVcsQ0FBQyxJQUFaLENBQUE7SUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUNaO01BRFk7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQ7V0FFQSxRQUFRLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLCtCQUFqQztNQURZO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkO0VBTHNDLENBQXhDO1NBT0E7QUFaOEMsQ0FBaEQ7O0FBZUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLElBQUEsRUFBTSxJQUFOO0VBQ0EsV0FBQSxFQUFhLFdBRGIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIFVzZXIgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG5jbGFzcyBDdXJyZW50VXNlciBleHRlbmRzIFVzZXJcblxubWFrZV9jdXJyZW50X3VzZXJfbW9kZWwgPSAodXJsKSAtPlxuICB1c2VyPSBuZXcgQ3VycmVudFVzZXJcbiAgdXNlci51cmwgPSB1cmxcbiAgcmV0dXJuIHVzZXJcbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnY3JlYXRlLWN1cnJlbnQtdXNlci1vYmplY3QnLCAodXJsKSAtPlxuICBjdXJyZW50dXNlciA9IG1ha2VfY3VycmVudF91c2VyX21vZGVsIHVybFxuICAjIGNyZWF0ZSBjdXJyZW50LXVzZXIgcmVxdWVzdFxuICBNYWluQ2hhbm5lbC5yZXBseSAnY3VycmVudC11c2VyJywgLT5cbiAgICBjdXJyZW50dXNlclxuICBNYWluQ2hhbm5lbC5yZXBseSAndXBkYXRlLXVzZXItY29uZmlnJywgKGNvbmZpZykgLT5cbiAgICBjdXJyZW50dXNlci5zZXQgJ2NvbmZpZycsIGNvbmZpZ1xuICAgIHJlc3BvbnNlID0gY3VycmVudHVzZXIuc2F2ZSgpXG4gICAgcmVzcG9uc2UuZG9uZSA9PlxuICAgICAgY3VycmVudHVzZXJcbiAgICByZXNwb25zZS5mYWlsID0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCAnZmFpbGVkIHRvIHVwZGF0ZSB1c2VyIGNvbmZpZyEnXG4gIGN1cnJlbnR1c2VyXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIFVzZXI6IFVzZXJcbiAgQ3VycmVudFVzZXI6IEN1cnJlbnRVc2VyXG4gIFxuXG4iXX0=
