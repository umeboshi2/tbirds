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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvdG9nZ2xlLWJ1dHRvbi5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvdG9nZ2xlLWJ1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRU07RUFBTixNQUFBLG1CQUFBLFFBQWlDLEtBQWpDO0lBZ0JFLFVBQVksQ0FBQSxDQUFBO0FBQ1YsVUFBQTtNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsRUFBRSxDQUFDO01BQ1gsSUFBRyxJQUFJLENBQUMsUUFBTCxDQUFjLGdCQUFkLENBQUg7UUFDRSxJQUFJLENBQUMsV0FBTCxDQUFpQixnQkFBakI7ZUFDQSxJQUFJLENBQUMsUUFBTCxDQUFjLGNBQWQsRUFGRjtPQUFBLE1BQUE7UUFJRSxJQUFJLENBQUMsV0FBTCxDQUFpQixjQUFqQjtlQUNBLElBQUksQ0FBQyxRQUFMLENBQWMsZ0JBQWQsRUFMRjs7SUFGVTs7RUFoQmQ7OytCQUNFLE9BQUEsR0FBUzs7K0JBQ1QsU0FBQSxHQUFXOzsrQkFDWCxVQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sUUFBTjtJQUNBLGFBQUEsRUFBZSxVQURmO0lBRUEsYUFBQSxFQUFlLHVCQUZmO0lBR0EsZUFBQSxFQUFpQixzQkFIakI7SUFJQSxlQUFBLEVBQWlCLE9BSmpCO0lBS0EsWUFBQSxFQUFjO0VBTGQ7OytCQU1GLEVBQUEsR0FDRTtJQUFBLElBQUEsRUFBTTtFQUFOOzsrQkFDRixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsQ0FBSCxDQUFLLHdDQUFMO0VBRHNCLENBQWQ7OytCQUVWLE1BQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzs7Ozs7QUFVSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmNsYXNzIE5hdmJhclRvZ2dsZUJ1dHRvbiBleHRlbmRzIFZpZXdcbiAgdGFnTmFtZTogJ2J1dHRvbidcbiAgY2xhc3NOYW1lOiAnbmF2YmFyLXRvZ2dsZXIgcHVsbC1yaWdodCdcbiAgYXR0cmlidXRlczpcbiAgICB0eXBlOiAnYnV0dG9uJ1xuICAgICdkYXRhLXRvZ2dsZSc6ICdjb2xsYXBzZSdcbiAgICAnZGF0YS10YXJnZXQnOiAnI25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgICdhcmlhLWNvbnRyb2xzJzogJ25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJ1xuICAgICdhcmlhLWxhYmVsJzogJ1RvZ2dsZSBuYXZpZ2F0aW9uJ1xuICB1aTpcbiAgICBpY29uOiAnLmZhJ1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmkgJy5mYS5mYS10b2dnbGUtZG93bi5uYXZiYXItdG9nZ2xlci1pY29uJ1xuICBldmVudHM6XG4gICAgY2xpY2s6IFwidG9nZ2xlSWNvblwiXG4gIHRvZ2dsZUljb246IC0+XG4gICAgaWNvbiA9IEB1aS5pY29uXG4gICAgaWYgaWNvbi5oYXNDbGFzcyAnZmEtdG9nZ2xlLWRvd24nXG4gICAgICBpY29uLnJlbW92ZUNsYXNzICdmYS10b2dnbGUtZG93bidcbiAgICAgIGljb24uYWRkQ2xhc3MgJ2ZhLXRvZ2dsZS11cCdcbiAgICBlbHNlXG4gICAgICBpY29uLnJlbW92ZUNsYXNzICdmYS10b2dnbGUtdXAnXG4gICAgICBpY29uLmFkZENsYXNzICdmYS10b2dnbGUtZG93bidcbiAgICAgIFxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyVG9nZ2xlQnV0dG9uXG5cblxuIl19
