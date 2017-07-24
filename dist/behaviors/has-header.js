var Backbone, HasHeader, Marionette, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

HasHeader = (function(superClass) {
  extend(HasHeader, superClass);

  function HasHeader() {
    return HasHeader.__super__.constructor.apply(this, arguments);
  }

  HasHeader.prototype.onSetHeader = function(text) {
    return this.ui.header.text(text);
  };

  return HasHeader;

})(Marionette.Behavior);

module.exports = HasHeader;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1oZWFkZXIuanMiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9oYXMtaGVhZGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG1DQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFHQzs7Ozs7OztzQkFDSixXQUFBLEdBQWEsU0FBQyxJQUFEO1dBQ1gsSUFBQyxDQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBWCxDQUFnQixJQUFoQjtFQURXOzs7O0dBRFMsVUFBVSxDQUFDOztBQUluQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5cbmNsYXNzIEhhc0hlYWRlciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcbiAgb25TZXRIZWFkZXI6ICh0ZXh0KSAtPlxuICAgIEB1aS5oZWFkZXIudGV4dCB0ZXh0XG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9IEhhc0hlYWRlclxuIl19
