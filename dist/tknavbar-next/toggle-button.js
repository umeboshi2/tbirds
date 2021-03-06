var NavbarToggleButton;

import $ from 'jquery';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

NavbarToggleButton = (function() {
  class NavbarToggleButton extends View {
    toggleIcon() {
      var icon;
      icon = this.ui.icon;
      if (icon.hasClass('fa-toggle-down')) {
        icon.removeClass('fa-toggle-down');
        return icon.addClass('fa-toggle-up');
      } else {
        icon.removeClass('fa-toggle-up');
        return icon.addClass('fa-toggle-down');
      }
    }

  };

  NavbarToggleButton.prototype.tagName = 'button';

  NavbarToggleButton.prototype.className = 'navbar-toggler pull-right';

  NavbarToggleButton.prototype.attributes = {
    type: 'button',
    'data-toggle': 'collapse',
    'data-target': '#navbar-view-collapse',
    'aria-controls': 'navbar-view-collapse',
    'aria-expanded': 'false',
    'aria-label': 'Toggle navigation'
  };

  NavbarToggleButton.prototype.ui = {
    icon: '.fa'
  };

  NavbarToggleButton.prototype.template = tc.renderable(function() {
    return tc.i('.fa.fa-toggle-down.navbar-toggler-icon');
  });

  NavbarToggleButton.prototype.events = {
    click: "toggleIcon"
  };

  return NavbarToggleButton;

}).call(this);

export default NavbarToggleButton;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXItbmV4dC90b2dnbGUtYnV0dG9uLmpzIiwic291cmNlcyI6WyJ0a25hdmJhci1uZXh0L3RvZ2dsZS1idXR0b24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxtQkFBQSxRQUFpQyxLQUFqQztJQWdCRSxVQUFZLENBQUEsQ0FBQTtBQUNkLFVBQUE7TUFBSSxJQUFBLEdBQU8sSUFBQyxDQUFBLEVBQUUsQ0FBQztNQUNYLElBQUcsSUFBSSxDQUFDLFFBQUwsQ0FBYyxnQkFBZCxDQUFIO1FBQ0UsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsZ0JBQWpCO2VBQ0EsSUFBSSxDQUFDLFFBQUwsQ0FBYyxjQUFkLEVBRkY7T0FBQSxNQUFBO1FBSUUsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsY0FBakI7ZUFDQSxJQUFJLENBQUMsUUFBTCxDQUFjLGdCQUFkLEVBTEY7O0lBRlU7O0VBaEJkOzsrQkFDRSxPQUFBLEdBQVM7OytCQUNULFNBQUEsR0FBVzs7K0JBQ1gsVUFBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFFBQU47SUFDQSxhQUFBLEVBQWUsVUFEZjtJQUVBLGFBQUEsRUFBZSx1QkFGZjtJQUdBLGVBQUEsRUFBaUIsc0JBSGpCO0lBSUEsZUFBQSxFQUFpQixPQUpqQjtJQUtBLFlBQUEsRUFBYztFQUxkOzsrQkFNRixFQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU07RUFBTjs7K0JBQ0YsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7V0FDdEIsRUFBRSxDQUFDLENBQUgsQ0FBSyx3Q0FBTDtFQURzQixDQUFkOzsrQkFFVixNQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBVUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5jbGFzcyBOYXZiYXJUb2dnbGVCdXR0b24gZXh0ZW5kcyBWaWV3XG4gIHRhZ05hbWU6ICdidXR0b24nXG4gIGNsYXNzTmFtZTogJ25hdmJhci10b2dnbGVyIHB1bGwtcmlnaHQnXG4gIGF0dHJpYnV0ZXM6XG4gICAgdHlwZTogJ2J1dHRvbidcbiAgICAnZGF0YS10b2dnbGUnOiAnY29sbGFwc2UnXG4gICAgJ2RhdGEtdGFyZ2V0JzogJyNuYXZiYXItdmlldy1jb2xsYXBzZSdcbiAgICAnYXJpYS1jb250cm9scyc6ICduYXZiYXItdmlldy1jb2xsYXBzZSdcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZSdcbiAgICAnYXJpYS1sYWJlbCc6ICdUb2dnbGUgbmF2aWdhdGlvbidcbiAgdWk6XG4gICAgaWNvbjogJy5mYSdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5pICcuZmEuZmEtdG9nZ2xlLWRvd24ubmF2YmFyLXRvZ2dsZXItaWNvbidcbiAgZXZlbnRzOlxuICAgIGNsaWNrOiBcInRvZ2dsZUljb25cIlxuICB0b2dnbGVJY29uOiAtPlxuICAgIGljb24gPSBAdWkuaWNvblxuICAgIGlmIGljb24uaGFzQ2xhc3MgJ2ZhLXRvZ2dsZS1kb3duJ1xuICAgICAgaWNvbi5yZW1vdmVDbGFzcyAnZmEtdG9nZ2xlLWRvd24nXG4gICAgICBpY29uLmFkZENsYXNzICdmYS10b2dnbGUtdXAnXG4gICAgZWxzZVxuICAgICAgaWNvbi5yZW1vdmVDbGFzcyAnZmEtdG9nZ2xlLXVwJ1xuICAgICAgaWNvbi5hZGRDbGFzcyAnZmEtdG9nZ2xlLWRvd24nXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IE5hdmJhclRvZ2dsZUJ1dHRvblxuXG5cbiJdfQ==
