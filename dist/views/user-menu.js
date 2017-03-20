var Backbone, Marionette, MenuTemplates, UserMenuView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MenuTemplates = require('../templates/menus');

UserMenuView = (function(superClass) {
  extend(UserMenuView, superClass);

  function UserMenuView() {
    return UserMenuView.__super__.constructor.apply(this, arguments);
  }

  UserMenuView.prototype.template = MenuTemplates.user_menu;

  return UserMenuView;

})(Backbone.Marionette.View);

module.exports = UserMenuView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvdXNlci1tZW51LmpzIiwic291cmNlcyI6WyJ2aWV3cy91c2VyLW1lbnUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsaURBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBR2IsYUFBQSxHQUFnQixPQUFBLENBQVEsb0JBQVI7O0FBRVY7Ozs7Ozs7eUJBQ0osUUFBQSxHQUFVLGFBQWEsQ0FBQzs7OztHQURDLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBRy9DLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5cbk1lbnVUZW1wbGF0ZXMgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvbWVudXMnXG5cbmNsYXNzIFVzZXJNZW51VmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogTWVudVRlbXBsYXRlcy51c2VyX21lbnVcblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyTWVudVZpZXdcbiJdfQ==
