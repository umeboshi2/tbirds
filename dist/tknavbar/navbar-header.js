var MainChannel, MessageChannel, NavbarHeaderView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import NavbarToggleButton from './toggle-button';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarHeaderView = (function() {
  class NavbarHeaderView extends Marionette.View {
    onRender() {
      var view;
      view = new NavbarToggleButton;
      return this.showChildView('toggleContainer', view);
    }

  };

  NavbarHeaderView.prototype.template = tc.renderable(function(model) {
    tc.a('.navbar-brand', {
      href: model.url
    }, model.label);
    return tc.div('.toggle-container');
  });

  NavbarHeaderView.prototype.ui = {
    brand: '.navbar-brand',
    toggleContainer: '.toggle-container'
  };

  NavbarHeaderView.prototype.regions = {
    toggleContainer: '@ui.toggleContainer'
  };

  NavbarHeaderView.prototype.triggers = {
    'click @ui.brand': 'click:brand'
  };

  return NavbarHeaderView;

}).call(this);

export default NavbarHeaderView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sa0JBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUdYO0VBQU4sTUFBQSxpQkFBQSxRQUErQixVQUFVLENBQUMsS0FBMUM7SUFXRSxRQUFVLENBQUEsQ0FBQTtBQUNSLFVBQUE7TUFBQSxJQUFBLEdBQU8sSUFBSTthQUNYLElBQUMsQ0FBQSxhQUFELENBQWUsaUJBQWYsRUFBa0MsSUFBbEM7SUFGUTs7RUFYWjs7NkJBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUN0QixFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsRUFBc0I7TUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDO0lBQVgsQ0FBdEIsRUFBc0MsS0FBSyxDQUFDLEtBQTVDO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxtQkFBUDtFQUZzQixDQUFkOzs2QkFHVixFQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU8sZUFBUDtJQUNBLGVBQUEsRUFBaUI7RUFEakI7OzZCQUVGLE9BQUEsR0FDRTtJQUFBLGVBQUEsRUFBaUI7RUFBakI7OzZCQUNGLFFBQUEsR0FDRTtJQUFBLGlCQUFBLEVBQW1CO0VBQW5COzs7Ozs7QUFTSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhclRvZ2dsZUJ1dHRvbiBmcm9tICcuL3RvZ2dsZS1idXR0b24nXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuICBcbmNsYXNzIE5hdmJhckhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmEgJy5uYXZiYXItYnJhbmQnLCBocmVmOm1vZGVsLnVybCwgbW9kZWwubGFiZWxcbiAgICB0Yy5kaXYgJy50b2dnbGUtY29udGFpbmVyJ1xuICB1aTpcbiAgICBicmFuZDogJy5uYXZiYXItYnJhbmQnXG4gICAgdG9nZ2xlQ29udGFpbmVyOiAnLnRvZ2dsZS1jb250YWluZXInXG4gIHJlZ2lvbnM6XG4gICAgdG9nZ2xlQ29udGFpbmVyOiAnQHVpLnRvZ2dsZUNvbnRhaW5lcidcbiAgdHJpZ2dlcnM6XG4gICAgJ2NsaWNrIEB1aS5icmFuZCc6ICdjbGljazpicmFuZCdcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBOYXZiYXJUb2dnbGVCdXR0b25cbiAgICBAc2hvd0NoaWxkVmlldyAndG9nZ2xlQ29udGFpbmVyJywgdmlld1xuICAgIFxuXG4gICAgXG5cbiAgICBcbmV4cG9ydCBkZWZhdWx0IE5hdmJhckhlYWRlclZpZXdcblxuXG5cbiJdfQ==
