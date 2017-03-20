var MainChannel, Marionette, TkApplet, Toolkit,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

MainChannel = Backbone.Radio.channel('global');

TkApplet = (function(superClass) {
  extend(TkApplet, superClass);

  function TkApplet() {
    return TkApplet.__super__.constructor.apply(this, arguments);
  }

  TkApplet.prototype.onBeforeStart = function() {
    var controller;
    controller = new this.Controller;
    controller.applet = this;
    return this.router = new this.Router({
      controller: controller
    });
  };

  TkApplet.prototype.onStop = function() {
    return console.log("Stopping TkApplet", this.isRunning());
  };

  return TkApplet;

})(Toolkit.App);

module.exports = TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBDQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsT0FBQSxHQUFVLE9BQUEsQ0FBUSxvQkFBUjs7QUFFVixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVSOzs7Ozs7O3FCQUNKLGFBQUEsR0FBZSxTQUFBO0FBQ2IsUUFBQTtJQUFBLFVBQUEsR0FBYSxJQUFJLElBQUMsQ0FBQTtJQUNsQixVQUFVLENBQUMsTUFBWCxHQUFvQjtXQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBQyxDQUFBLE1BQUwsQ0FDUjtNQUFBLFVBQUEsRUFBWSxVQUFaO0tBRFE7RUFIRzs7cUJBTWYsTUFBQSxHQUFRLFNBQUE7V0FDTixPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FBakM7RUFETTs7OztHQVBhLE9BQU8sQ0FBQzs7QUFXL0IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBUa0FwcGxldCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgY29udHJvbGxlciA9IG5ldyBAQ29udHJvbGxlclxuICAgIGNvbnRyb2xsZXIuYXBwbGV0ID0gQFxuICAgIEByb3V0ZXIgPSBuZXcgQFJvdXRlclxuICAgICAgY29udHJvbGxlcjogY29udHJvbGxlclxuXG4gIG9uU3RvcDogLT5cbiAgICBjb25zb2xlLmxvZyBcIlN0b3BwaW5nIFRrQXBwbGV0XCIsIEAuaXNSdW5uaW5nKClcbiAgICBcbiAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBUa0FwcGxldFxuIl19
