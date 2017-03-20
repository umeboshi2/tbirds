var BootStrapAppRouter, Marionette, Util,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

Util = require('./apputil');

BootStrapAppRouter = (function(superClass) {
  extend(BootStrapAppRouter, superClass);

  function BootStrapAppRouter() {
    return BootStrapAppRouter.__super__.constructor.apply(this, arguments);
  }

  BootStrapAppRouter.prototype.onRoute = function(name, path, args) {
    return Util.navbar_set_active(path);
  };

  return BootStrapAppRouter;

})(Marionette.AppRouter);

module.exports = BootStrapAppRouter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwX3JvdXRlci5qcyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwX3JvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxvQ0FBQTtFQUFBOzs7QUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLElBQUEsR0FBTyxPQUFBLENBQVEsV0FBUjs7QUFFRDs7Ozs7OzsrQkFDSixPQUFBLEdBQVMsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWI7V0FFUCxJQUFJLENBQUMsaUJBQUwsQ0FBdUIsSUFBdkI7RUFGTzs7OztHQURzQixVQUFVLENBQUM7O0FBSzVDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5VdGlsID0gcmVxdWlyZSAnLi9hcHB1dGlsJ1xuXG5jbGFzcyBCb290U3RyYXBBcHBSb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuICBvblJvdXRlOiAobmFtZSwgcGF0aCwgYXJncykgLT5cbiAgICAjY29uc29sZS5sb2cgXCJvblJvdXRlIG5hbWU6ICN7bmFtZX0sIHBhdGg6ICN7cGF0aH0sIGFyZ3M6ICN7YXJnc31cIlxuICAgIFV0aWwubmF2YmFyX3NldF9hY3RpdmUgcGF0aFxuICAgICAgICBcbm1vZHVsZS5leHBvcnRzID0gQm9vdFN0cmFwQXBwUm91dGVyXG4iXX0=
