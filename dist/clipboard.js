var $, AppClipboard, Backbone, MainChannel, Marionette, MessageChannel, _, app_clipboard,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

_ = require('underscore');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

AppClipboard = (function(superClass) {
  extend(AppClipboard, superClass);

  function AppClipboard() {
    return AppClipboard.__super__.constructor.apply(this, arguments);
  }

  AppClipboard.prototype.copy_status = 'copy';

  AppClipboard.prototype._add_models = function(models, command) {
    this.reset();
    this.add(models);
    return this.copy_status = command;
  };

  AppClipboard.prototype.copy = function(models) {
    return this._add_models(models, 'copy');
  };

  AppClipboard.prototype.cut = function(models) {
    return this._add_models(models, 'cut');
  };

  AppClipboard.prototype.paste = function() {
    var models;
    models = this.models.slice();
    this.reset();
    return models;
  };

  return AppClipboard;

})(Backbone.Collection);

app_clipboard = new AppClipboard;

MainChannel.reply('main:app:app-clipboard', function() {
  return app_clipboard;
});

module.exports = {
  AppClipboard: AppClipboard
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLmpzIiwic291cmNlcyI6WyJjbGlwYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0ZBQUE7RUFBQTs7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLENBQUEsR0FBSSxPQUFBLENBQVEsWUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUdYOzs7Ozs7O3lCQUVKLFdBQUEsR0FBYTs7eUJBRWIsV0FBQSxHQUFhLFNBQUMsTUFBRCxFQUFTLE9BQVQ7SUFDWCxJQUFDLENBQUEsS0FBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLEdBQUQsQ0FBSyxNQUFMO1dBQ0EsSUFBQyxDQUFBLFdBQUQsR0FBZTtFQUhKOzt5QkFLYixJQUFBLEdBQU0sU0FBQyxNQUFEO1dBQ0osSUFBQyxDQUFBLFdBQUQsQ0FBYSxNQUFiLEVBQXFCLE1BQXJCO0VBREk7O3lCQUdOLEdBQUEsR0FBSyxTQUFDLE1BQUQ7V0FDSCxJQUFDLENBQUEsV0FBRCxDQUFhLE1BQWIsRUFBcUIsS0FBckI7RUFERzs7eUJBR0wsS0FBQSxHQUFPLFNBQUE7QUFFTCxRQUFBO0lBQUEsTUFBQSxHQUFTLElBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFBO0lBRVQsSUFBQyxDQUFBLEtBQUQsQ0FBQTtXQUVBO0VBTks7Ozs7R0Fma0IsUUFBUSxDQUFDOztBQXVCcEMsYUFBQSxHQUFnQixJQUFJOztBQUNwQixXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsU0FBQTtTQUMxQztBQUQwQyxDQUE1Qzs7QUFHQSxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsWUFBQSxFQUFjLFlBQWQiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUnXG5CYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuXG5jbGFzcyBBcHBDbGlwYm9hcmQgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gICMgaW5pdGlhbGl6ZSBjb3B5X3N0YXR1cyB3aXRoIFwiY29weVwiXG4gIGNvcHlfc3RhdHVzOiAnY29weSdcblxuICBfYWRkX21vZGVsczogKG1vZGVscywgY29tbWFuZCkgLT5cbiAgICBAcmVzZXQoKVxuICAgIEBhZGQgbW9kZWxzXG4gICAgQGNvcHlfc3RhdHVzID0gY29tbWFuZFxuICAgIFxuICBjb3B5OiAobW9kZWxzKSAtPlxuICAgIEBfYWRkX21vZGVscyBtb2RlbHMsICdjb3B5J1xuXG4gIGN1dDogKG1vZGVscykgLT5cbiAgICBAX2FkZF9tb2RlbHMgbW9kZWxzLCAnY3V0J1xuXG4gIHBhc3RlOiAoKSAtPlxuICAgICMgY29weSBtb2RlbHNcbiAgICBtb2RlbHMgPSBALm1vZGVscy5zbGljZSgpXG4gICAgIyBlbXB0eSBjb2xsZWN0aW9uXG4gICAgQHJlc2V0KClcbiAgICAjIHJldHVybiBtb2RlbHNcbiAgICBtb2RlbHNcblxuYXBwX2NsaXBib2FyZCA9IG5ldyBBcHBDbGlwYm9hcmRcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDphcHAtY2xpcGJvYXJkJywgLT5cbiAgYXBwX2NsaXBib2FyZFxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEFwcENsaXBib2FyZDogQXBwQ2xpcGJvYXJkXG4iXX0=
