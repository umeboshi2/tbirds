var MainChannel, MessageChannel, NavbarHeaderView, NavbarToggleButton;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarToggleButton = (function() {
  class NavbarToggleButton extends Marionette.View {};

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

  return NavbarToggleButton;

}).call(this);

NavbarHeaderView = (function() {
  class NavbarHeaderView extends Marionette.View {
    onRender() {
      var tview;
      tview = new NavbarToggleButton;
      return this.showChildView('toggle', tview);
    }

  };

  NavbarHeaderView.prototype.template = tc.renderable(function(model) {
    tc.a('.navbar-brand', {
      href: model.url
    }, model.label);
    return tc.span('.toggle-button');
  });

  NavbarHeaderView.prototype.regions = {
    toggle: '.toggle-button'
  };

  NavbarHeaderView.prototype.ui = {
    brand: '.navbar-brand'
  };

  NavbarHeaderView.prototype.triggers = {
    //'click @ui.brand': 'click:brand'
    click: 'click:brand'
  };

  return NavbarHeaderView;

}).call(this);

export default NavbarHeaderView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGdCQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFHWDtFQUFOLE1BQUEsbUJBQUEsUUFBaUMsVUFBVSxDQUFDLEtBQTVDLENBQUE7OytCQUNFLE9BQUEsR0FBUzs7K0JBQ1QsU0FBQSxHQUFXOzsrQkFDWCxVQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sUUFBTjtJQUNBLGFBQUEsRUFBZSxVQURmO0lBRUEsYUFBQSxFQUFlLHVCQUZmO0lBR0EsZUFBQSxFQUFpQixzQkFIakI7SUFJQSxlQUFBLEVBQWlCLE9BSmpCO0lBS0EsWUFBQSxFQUFjO0VBTGQ7OytCQU1GLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxJQUFILENBQVEsc0JBQVI7RUFEc0IsQ0FBZDs7Ozs7O0FBSU47RUFBTixNQUFBLGlCQUFBLFFBQStCLFVBQVUsQ0FBQyxLQUExQztJQVdFLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQTtNQUFBLEtBQUEsR0FBUSxJQUFJO2FBQ1osSUFBQyxDQUFBLGFBQUQsQ0FBZSxRQUFmLEVBQXlCLEtBQXpCO0lBRlE7O0VBWFo7OzZCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsRUFBRSxDQUFDLENBQUgsQ0FBSyxlQUFMLEVBQXNCO01BQUEsSUFBQSxFQUFLLEtBQUssQ0FBQztJQUFYLENBQXRCLEVBQXNDLEtBQUssQ0FBQyxLQUE1QztXQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsZ0JBQVI7RUFGc0IsQ0FBZDs7NkJBR1YsT0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRO0VBQVI7OzZCQUNGLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzs2QkFDRixRQUFBLEdBRUUsQ0FBQTs7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBS0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuICBcbmNsYXNzIE5hdmJhclRvZ2dsZUJ1dHRvbiBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0YWdOYW1lOiAnYnV0dG9uJ1xuICBjbGFzc05hbWU6ICduYXZiYXItdG9nZ2xlcidcbiAgYXR0cmlidXRlczpcbiAgICB0eXBlOiAnYnV0dG9uJ1xuICAgICdkYXRhLXRvZ2dsZSc6ICdjb2xsYXBzZSdcbiAgICAnZGF0YS10YXJnZXQnOiAnI25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgICdhcmlhLWNvbnRyb2xzJzogJ25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJ1xuICAgICdhcmlhLWxhYmVsJzogJ1RvZ2dsZSBuYXZpZ2F0aW9uJ1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLnNwYW4gJy5uYXZiYXItdG9nZ2xlci1pY29uJ1xuICAgIFxuICAgIFxuY2xhc3MgTmF2YmFySGVhZGVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6bW9kZWwudXJsLCBtb2RlbC5sYWJlbFxuICAgIHRjLnNwYW4gJy50b2dnbGUtYnV0dG9uJ1xuICByZWdpb25zOlxuICAgIHRvZ2dsZTogJy50b2dnbGUtYnV0dG9uJ1xuICB1aTpcbiAgICBicmFuZDogJy5uYXZiYXItYnJhbmQnXG4gIHRyaWdnZXJzOlxuICAgICMnY2xpY2sgQHVpLmJyYW5kJzogJ2NsaWNrOmJyYW5kJ1xuICAgIGNsaWNrOiAnY2xpY2s6YnJhbmQnXG4gIG9uUmVuZGVyOiAtPlxuICAgIHR2aWV3ID0gbmV3IE5hdmJhclRvZ2dsZUJ1dHRvblxuICAgIEBzaG93Q2hpbGRWaWV3ICd0b2dnbGUnLCB0dmlld1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgTmF2YmFySGVhZGVyVmlld1xuXG5cblxuIl19
