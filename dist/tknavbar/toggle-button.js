var MainChannel, MessageChannel, NavbarToggleButton;

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarToggleButton = (function() {
  class NavbarToggleButton extends Marionette.View {
    onRender() {
      return console.log("Rhissdfsf");
    }

    toggleClicked() {
      var target;
      target = $(this.attributes['data-target']);
      return target.toggle();
    }

  };

  NavbarToggleButton.prototype.tagName = 'button';

  NavbarToggleButton.prototype.className = 'navbar-toggler';

  NavbarToggleButton.prototype.attributes = {
    type: 'button',
    'data-toggle': 'collapse',
    'data-target': '#navbar-view-collapse',
    'aria-controls': 'navbar-view-collapse',
    'aria-expanded': 'false',
    'aria-label': 'Toggle navigation'
  };

  NavbarToggleButton.prototype.template = tc.renderable(function() {
    return tc.span('.navbar-toggler-icon');
  });

  NavbarToggleButton.prototype.events = {
    click: 'toggleClicked'
  };

  return NavbarToggleButton;

}).call(this);

export default NavbarToggleButton;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvdG9nZ2xlLWJ1dHRvbi5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvdG9nZ2xlLWJ1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBR1g7RUFBTixNQUFBLG1CQUFBLFFBQWlDLFVBQVUsQ0FBQyxLQUE1QztJQVlFLFFBQVUsQ0FBQSxDQUFBO2FBQ1IsT0FBTyxDQUFDLEdBQVIsQ0FBWSxXQUFaO0lBRFE7O0lBSVYsYUFBZSxDQUFBLENBQUE7QUFDYixVQUFBO01BQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxJQUFDLENBQUEsVUFBVyxDQUFBLGFBQUEsQ0FBZDthQUNULE1BQU0sQ0FBQyxNQUFQLENBQUE7SUFGYTs7RUFoQmpCOzsrQkFDRSxPQUFBLEdBQVM7OytCQUNULFNBQUEsR0FBVzs7K0JBQ1gsVUFBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFFBQU47SUFDQSxhQUFBLEVBQWUsVUFEZjtJQUVBLGFBQUEsRUFBZSx1QkFGZjtJQUdBLGVBQUEsRUFBaUIsc0JBSGpCO0lBSUEsZUFBQSxFQUFpQixPQUpqQjtJQUtBLFlBQUEsRUFBYztFQUxkOzsrQkFNRixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsSUFBSCxDQUFRLHNCQUFSO0VBRHNCLENBQWQ7OytCQUlWLE1BQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzs7Ozs7QUFLSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4gIFxuY2xhc3MgTmF2YmFyVG9nZ2xlQnV0dG9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRhZ05hbWU6ICdidXR0b24nXG4gIGNsYXNzTmFtZTogJ25hdmJhci10b2dnbGVyJ1xuICBhdHRyaWJ1dGVzOlxuICAgIHR5cGU6ICdidXR0b24nXG4gICAgJ2RhdGEtdG9nZ2xlJzogJ2NvbGxhcHNlJ1xuICAgICdkYXRhLXRhcmdldCc6ICcjbmF2YmFyLXZpZXctY29sbGFwc2UnXG4gICAgJ2FyaWEtY29udHJvbHMnOiAnbmF2YmFyLXZpZXctY29sbGFwc2UnXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiAnZmFsc2UnXG4gICAgJ2FyaWEtbGFiZWwnOiAnVG9nZ2xlIG5hdmlnYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuc3BhbiAnLm5hdmJhci10b2dnbGVyLWljb24nXG4gIG9uUmVuZGVyOiAtPlxuICAgIGNvbnNvbGUubG9nIFwiUmhpc3NkZnNmXCJcbiAgZXZlbnRzOlxuICAgIGNsaWNrOiAndG9nZ2xlQ2xpY2tlZCdcbiAgdG9nZ2xlQ2xpY2tlZDogLT5cbiAgICB0YXJnZXQgPSAkIEBhdHRyaWJ1dGVzWydkYXRhLXRhcmdldCddXG4gICAgdGFyZ2V0LnRvZ2dsZSgpXG4gICAgXG5leHBvcnQgZGVmYXVsdCBOYXZiYXJUb2dnbGVCdXR0b25cblxuXG4iXX0=
