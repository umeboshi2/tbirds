var MainChannel, MessageChannel, NavbarToggleButton;

import $ from 'jquery';

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvdG9nZ2xlLWJ1dHRvbi5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvdG9nZ2xlLWJ1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUdYO0VBQU4sTUFBQSxtQkFBQSxRQUFpQyxLQUFqQztJQWdCRSxVQUFZLENBQUEsQ0FBQTtBQUNWLFVBQUE7TUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEVBQUUsQ0FBQztNQUNYLElBQUcsSUFBSSxDQUFDLFFBQUwsQ0FBYyxnQkFBZCxDQUFIO1FBQ0UsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsZ0JBQWpCO2VBQ0EsSUFBSSxDQUFDLFFBQUwsQ0FBYyxjQUFkLEVBRkY7T0FBQSxNQUFBO1FBSUUsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsY0FBakI7ZUFDQSxJQUFJLENBQUMsUUFBTCxDQUFjLGdCQUFkLEVBTEY7O0lBRlU7O0VBaEJkOzsrQkFDRSxPQUFBLEdBQVM7OytCQUNULFNBQUEsR0FBVzs7K0JBQ1gsVUFBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFFBQU47SUFDQSxhQUFBLEVBQWUsVUFEZjtJQUVBLGFBQUEsRUFBZSx1QkFGZjtJQUdBLGVBQUEsRUFBaUIsc0JBSGpCO0lBSUEsZUFBQSxFQUFpQixPQUpqQjtJQUtBLFlBQUEsRUFBYztFQUxkOzsrQkFNRixFQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU07RUFBTjs7K0JBQ0YsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7V0FDdEIsRUFBRSxDQUFDLENBQUgsQ0FBSyx3Q0FBTDtFQURzQixDQUFkOzsrQkFFVixNQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBVUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiAgXG5jbGFzcyBOYXZiYXJUb2dnbGVCdXR0b24gZXh0ZW5kcyBWaWV3XG4gIHRhZ05hbWU6ICdidXR0b24nXG4gIGNsYXNzTmFtZTogJ25hdmJhci10b2dnbGVyIHB1bGwtcmlnaHQnXG4gIGF0dHJpYnV0ZXM6XG4gICAgdHlwZTogJ2J1dHRvbidcbiAgICAnZGF0YS10b2dnbGUnOiAnY29sbGFwc2UnXG4gICAgJ2RhdGEtdGFyZ2V0JzogJyNuYXZiYXItdmlldy1jb2xsYXBzZSdcbiAgICAnYXJpYS1jb250cm9scyc6ICduYXZiYXItdmlldy1jb2xsYXBzZSdcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZSdcbiAgICAnYXJpYS1sYWJlbCc6ICdUb2dnbGUgbmF2aWdhdGlvbidcbiAgdWk6XG4gICAgaWNvbjogJy5mYSdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5pICcuZmEuZmEtdG9nZ2xlLWRvd24ubmF2YmFyLXRvZ2dsZXItaWNvbidcbiAgZXZlbnRzOlxuICAgIGNsaWNrOiBcInRvZ2dsZUljb25cIlxuICB0b2dnbGVJY29uOiAtPlxuICAgIGljb24gPSBAdWkuaWNvblxuICAgIGlmIGljb24uaGFzQ2xhc3MgJ2ZhLXRvZ2dsZS1kb3duJ1xuICAgICAgaWNvbi5yZW1vdmVDbGFzcyAnZmEtdG9nZ2xlLWRvd24nXG4gICAgICBpY29uLmFkZENsYXNzICdmYS10b2dnbGUtdXAnXG4gICAgZWxzZVxuICAgICAgaWNvbi5yZW1vdmVDbGFzcyAnZmEtdG9nZ2xlLXVwJ1xuICAgICAgaWNvbi5hZGRDbGFzcyAnZmEtdG9nZ2xlLWRvd24nXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IE5hdmJhclRvZ2dsZUJ1dHRvblxuXG5cbiJdfQ==
