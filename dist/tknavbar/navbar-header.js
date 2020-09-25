var NavbarHeaderView;

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import NavbarToggleButton from './toggle-button';

NavbarHeaderView = (function() {
  class NavbarHeaderView extends View {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxrQkFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxpQkFBQSxRQUErQixLQUEvQjtJQVdFLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQTtNQUFBLElBQUEsR0FBTyxJQUFJO2FBQ1gsSUFBQyxDQUFBLGFBQUQsQ0FBZSxpQkFBZixFQUFrQyxJQUFsQztJQUZROztFQVhaOzs2QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxDQUFILENBQUssZUFBTCxFQUFzQjtNQUFBLElBQUEsRUFBSyxLQUFLLENBQUM7SUFBWCxDQUF0QixFQUFzQyxLQUFLLENBQUMsS0FBNUM7V0FDQSxFQUFFLENBQUMsR0FBSCxDQUFPLG1CQUFQO0VBRnNCLENBQWQ7OzZCQUdWLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxlQUFQO0lBQ0EsZUFBQSxFQUFpQjtFQURqQjs7NkJBRUYsT0FBQSxHQUNFO0lBQUEsZUFBQSxFQUFpQjtFQUFqQjs7NkJBQ0YsUUFBQSxHQUNFO0lBQUEsaUJBQUEsRUFBbUI7RUFBbkI7Ozs7OztBQUtKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhclRvZ2dsZUJ1dHRvbiBmcm9tICcuL3RvZ2dsZS1idXR0b24nXG5cbmNsYXNzIE5hdmJhckhlYWRlclZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5hICcubmF2YmFyLWJyYW5kJywgaHJlZjptb2RlbC51cmwsIG1vZGVsLmxhYmVsXG4gICAgdGMuZGl2ICcudG9nZ2xlLWNvbnRhaW5lcidcbiAgdWk6XG4gICAgYnJhbmQ6ICcubmF2YmFyLWJyYW5kJ1xuICAgIHRvZ2dsZUNvbnRhaW5lcjogJy50b2dnbGUtY29udGFpbmVyJ1xuICByZWdpb25zOlxuICAgIHRvZ2dsZUNvbnRhaW5lcjogJ0B1aS50b2dnbGVDb250YWluZXInXG4gIHRyaWdnZXJzOlxuICAgICdjbGljayBAdWkuYnJhbmQnOiAnY2xpY2s6YnJhbmQnXG4gIG9uUmVuZGVyOiAtPlxuICAgIHZpZXcgPSBuZXcgTmF2YmFyVG9nZ2xlQnV0dG9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ3RvZ2dsZUNvbnRhaW5lcicsIHZpZXdcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE5hdmJhckhlYWRlclZpZXdcblxuXG5cbiJdfQ==
