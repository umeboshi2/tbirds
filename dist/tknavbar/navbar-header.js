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
      view = new NavbarToggleButton();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvbmF2YmFyLWhlYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxrQkFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxpQkFBQSxRQUErQixLQUEvQjtJQVdFLFFBQVUsQ0FBQSxDQUFBO0FBQ1osVUFBQTtNQUFJLElBQUEsR0FBTyxJQUFJLGtCQUFKLENBQUE7YUFDUCxJQUFDLENBQUEsYUFBRCxDQUFlLGlCQUFmLEVBQWtDLElBQWxDO0lBRlE7O0VBWFo7OzZCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsRUFBRSxDQUFDLENBQUgsQ0FBSyxlQUFMLEVBQXNCO01BQUEsSUFBQSxFQUFLLEtBQUssQ0FBQztJQUFYLENBQXRCLEVBQXNDLEtBQUssQ0FBQyxLQUE1QztXQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sbUJBQVA7RUFGc0IsQ0FBZDs7NkJBR1YsRUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPLGVBQVA7SUFDQSxlQUFBLEVBQWlCO0VBRGpCOzs2QkFFRixPQUFBLEdBQ0U7SUFBQSxlQUFBLEVBQWlCO0VBQWpCOzs2QkFDRixRQUFBLEdBQ0U7SUFBQSxpQkFBQSxFQUFtQjtFQUFuQjs7Ozs7O0FBS0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTmF2YmFyVG9nZ2xlQnV0dG9uIGZyb20gJy4vdG9nZ2xlLWJ1dHRvbidcblxuY2xhc3MgTmF2YmFySGVhZGVyVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmEgJy5uYXZiYXItYnJhbmQnLCBocmVmOm1vZGVsLnVybCwgbW9kZWwubGFiZWxcbiAgICB0Yy5kaXYgJy50b2dnbGUtY29udGFpbmVyJ1xuICB1aTpcbiAgICBicmFuZDogJy5uYXZiYXItYnJhbmQnXG4gICAgdG9nZ2xlQ29udGFpbmVyOiAnLnRvZ2dsZS1jb250YWluZXInXG4gIHJlZ2lvbnM6XG4gICAgdG9nZ2xlQ29udGFpbmVyOiAnQHVpLnRvZ2dsZUNvbnRhaW5lcidcbiAgdHJpZ2dlcnM6XG4gICAgJ2NsaWNrIEB1aS5icmFuZCc6ICdjbGljazpicmFuZCdcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBOYXZiYXJUb2dnbGVCdXR0b25cbiAgICBAc2hvd0NoaWxkVmlldyAndG9nZ2xlQ29udGFpbmVyJywgdmlld1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgTmF2YmFySGVhZGVyVmlld1xuXG5cblxuIl19
