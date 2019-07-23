var Applet, MainChannel, Router;

import Backbone from 'backbone';

import 'backbone.marionette';

import AppRouter from 'marionette.approuter';

import TkApplet from '../../tkapplet';

import Controller from './controller';

MainChannel = Backbone.Radio.channel('global');

Router = (function() {
  class Router extends AppRouter {};

  Router.prototype.appRoutes = {
    '': 'frontdoor',
    'frontdoor': 'frontdoor',
    'frontdoor/view': 'frontdoor',
    'frontdoor/view/*name': 'viewPage',
    'frontdoor/login': 'showLogin',
    'frontdoor/logout': 'showLogout',
    'login': 'showLogin',
    'logout': 'showLogout',
    //FIXME
    'pages/:name': 'viewPage'
  };

  return Router;

}).call(this);

Applet = (function() {
  class Applet extends TkApplet {
    onStop() {
      console.log("(Child) Stopping frontdoor", this.isRunning());
      return super.onStop();
    }

  };

  Applet.prototype.Controller = Controller;

  Applet.prototype.Router = Router;

  Applet.prototype.appletEntries = [
    {
      label: 'Main Menu',
      menu: appletEntries
    }
  ];

  return Applet;

}).call(this);

export default Applet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxNQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBR0EsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFHUjtFQUFOLE1BQUEsT0FBQSxRQUFxQixVQUFyQixDQUFBOzttQkFDRSxTQUFBLEdBQ0U7SUFBQSxFQUFBLEVBQUksV0FBSjtJQUNBLFdBQUEsRUFBYSxXQURiO0lBRUEsZ0JBQUEsRUFBa0IsV0FGbEI7SUFHQSxzQkFBQSxFQUF3QixVQUh4QjtJQUlBLGlCQUFBLEVBQW1CLFdBSm5CO0lBS0Esa0JBQUEsRUFBb0IsWUFMcEI7SUFNQSxPQUFBLEVBQVMsV0FOVDtJQU9BLFFBQUEsRUFBVSxZQVBWOztJQVNBLGFBQUEsRUFBZTtFQVRmOzs7Ozs7QUFXRTtFQUFOLE1BQUEsT0FBQSxRQUFxQixTQUFyQjtJQUlFLE1BQVEsQ0FBQSxDQUFBO01BQ04sT0FBTyxDQUFDLEdBQVIsQ0FBWSw0QkFBWixFQUEwQyxJQUFDLENBQUMsU0FBRixDQUFBLENBQTFDO2tCQURGLENBQUEsTUFFRSxDQUFBO0lBRk07O0VBSlY7O21CQUNFLFVBQUEsR0FBWTs7bUJBQ1osTUFBQSxHQUFROzttQkFLUixhQUFBLEdBQWU7SUFDYjtNQUNFLEtBQUEsRUFBTyxXQURUO01BRUUsSUFBQSxFQUFNO0lBRlIsQ0FEYTs7Ozs7OztBQU9qQixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgQXBwUm91dGVyIGZyb20gJ21hcmlvbmV0dGUuYXBwcm91dGVyJ1xuaW1wb3J0IFRrQXBwbGV0IGZyb20gJy4uLy4uL3RrYXBwbGV0J1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJ1xuXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5cbmNsYXNzIFJvdXRlciBleHRlbmRzIEFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJyc6ICdmcm9udGRvb3InXG4gICAgJ2Zyb250ZG9vcic6ICdmcm9udGRvb3InXG4gICAgJ2Zyb250ZG9vci92aWV3JzogJ2Zyb250ZG9vcidcbiAgICAnZnJvbnRkb29yL3ZpZXcvKm5hbWUnOiAndmlld1BhZ2UnXG4gICAgJ2Zyb250ZG9vci9sb2dpbic6ICdzaG93TG9naW4nXG4gICAgJ2Zyb250ZG9vci9sb2dvdXQnOiAnc2hvd0xvZ291dCdcbiAgICAnbG9naW4nOiAnc2hvd0xvZ2luJ1xuICAgICdsb2dvdXQnOiAnc2hvd0xvZ291dCdcbiAgICAjRklYTUVcbiAgICAncGFnZXMvOm5hbWUnOiAndmlld1BhZ2UnXG4gICAgXG5jbGFzcyBBcHBsZXQgZXh0ZW5kcyBUa0FwcGxldFxuICBDb250cm9sbGVyOiBDb250cm9sbGVyXG4gIFJvdXRlcjogUm91dGVyXG5cbiAgb25TdG9wOiAtPlxuICAgIGNvbnNvbGUubG9nIFwiKENoaWxkKSBTdG9wcGluZyBmcm9udGRvb3JcIiwgQC5pc1J1bm5pbmcoKVxuICAgIHN1cGVyKClcbiAgYXBwbGV0RW50cmllczogW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnTWFpbiBNZW51J1xuICAgICAgbWVudTogYXBwbGV0RW50cmllc1xuICAgIH1cbiAgXVxuXG5leHBvcnQgZGVmYXVsdCBBcHBsZXRcbiJdfQ==
