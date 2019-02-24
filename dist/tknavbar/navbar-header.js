var MainChannel, MessageChannel, NavbarHeaderView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import NavbarToggleButton from './toggle-button';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLGtCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFHWDtFQUFOLE1BQUEsaUJBQUEsUUFBK0IsS0FBL0I7SUFXRSxRQUFVLENBQUEsQ0FBQTtBQUNSLFVBQUE7TUFBQSxJQUFBLEdBQU8sSUFBSTthQUNYLElBQUMsQ0FBQSxhQUFELENBQWUsaUJBQWYsRUFBa0MsSUFBbEM7SUFGUTs7RUFYWjs7NkJBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUN0QixFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsRUFBc0I7TUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDO0lBQVgsQ0FBdEIsRUFBc0MsS0FBSyxDQUFDLEtBQTVDO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxtQkFBUDtFQUZzQixDQUFkOzs2QkFHVixFQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU8sZUFBUDtJQUNBLGVBQUEsRUFBaUI7RUFEakI7OzZCQUVGLE9BQUEsR0FDRTtJQUFBLGVBQUEsRUFBaUI7RUFBakI7OzZCQUNGLFFBQUEsR0FDRTtJQUFBLGlCQUFBLEVBQW1CO0VBQW5COzs7Ozs7QUFTSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJUb2dnbGVCdXR0b24gZnJvbSAnLi90b2dnbGUtYnV0dG9uJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiAgXG5jbGFzcyBOYXZiYXJIZWFkZXJWaWV3IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6bW9kZWwudXJsLCBtb2RlbC5sYWJlbFxuICAgIHRjLmRpdiAnLnRvZ2dsZS1jb250YWluZXInXG4gIHVpOlxuICAgIGJyYW5kOiAnLm5hdmJhci1icmFuZCdcbiAgICB0b2dnbGVDb250YWluZXI6ICcudG9nZ2xlLWNvbnRhaW5lcidcbiAgcmVnaW9uczpcbiAgICB0b2dnbGVDb250YWluZXI6ICdAdWkudG9nZ2xlQ29udGFpbmVyJ1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmJyYW5kJzogJ2NsaWNrOmJyYW5kJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE5hdmJhclRvZ2dsZUJ1dHRvblxuICAgIEBzaG93Q2hpbGRWaWV3ICd0b2dnbGVDb250YWluZXInLCB2aWV3XG4gICAgXG5cbiAgICBcblxuICAgIFxuZXhwb3J0IGRlZmF1bHQgTmF2YmFySGVhZGVyVmlld1xuXG5cblxuIl19
