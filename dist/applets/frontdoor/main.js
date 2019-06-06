var Applet, MainChannel, Router;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxNQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sU0FBUCxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBR1I7RUFBTixNQUFBLE9BQUEsUUFBcUIsVUFBckIsQ0FBQTs7bUJBQ0UsU0FBQSxHQUNFO0lBQUEsRUFBQSxFQUFJLFdBQUo7SUFDQSxXQUFBLEVBQWEsV0FEYjtJQUVBLGdCQUFBLEVBQWtCLFdBRmxCO0lBR0Esc0JBQUEsRUFBd0IsVUFIeEI7SUFJQSxpQkFBQSxFQUFtQixXQUpuQjtJQUtBLGtCQUFBLEVBQW9CLFlBTHBCO0lBTUEsT0FBQSxFQUFTLFdBTlQ7SUFPQSxRQUFBLEVBQVUsWUFQVjs7SUFTQSxhQUFBLEVBQWU7RUFUZjs7Ozs7O0FBV0U7RUFBTixNQUFBLE9BQUEsUUFBcUIsU0FBckI7SUFJRSxNQUFRLENBQUEsQ0FBQTtNQUNOLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVosRUFBMEMsSUFBQyxDQUFDLFNBQUYsQ0FBQSxDQUExQztrQkFERixDQUFBLE1BRUUsQ0FBQTtJQUZNOztFQUpWOzttQkFDRSxVQUFBLEdBQVk7O21CQUNaLE1BQUEsR0FBUTs7bUJBS1IsYUFBQSxHQUFlO0lBQ2I7TUFDRSxLQUFBLEVBQU8sV0FEVDtNQUVFLElBQUEsRUFBTTtJQUZSLENBRGE7Ozs7Ozs7QUFPakIsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBBcHBSb3V0ZXIgZnJvbSAnbWFyaW9uZXR0ZS5hcHByb3V0ZXInXG5pbXBvcnQgVGtBcHBsZXQgZnJvbSAnLi4vLi4vdGthcHBsZXQnXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInXG5cblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cblxuY2xhc3MgUm91dGVyIGV4dGVuZHMgQXBwUm91dGVyXG4gIGFwcFJvdXRlczpcbiAgICAnJzogJ2Zyb250ZG9vcidcbiAgICAnZnJvbnRkb29yJzogJ2Zyb250ZG9vcidcbiAgICAnZnJvbnRkb29yL3ZpZXcnOiAnZnJvbnRkb29yJ1xuICAgICdmcm9udGRvb3Ivdmlldy8qbmFtZSc6ICd2aWV3UGFnZSdcbiAgICAnZnJvbnRkb29yL2xvZ2luJzogJ3Nob3dMb2dpbidcbiAgICAnZnJvbnRkb29yL2xvZ291dCc6ICdzaG93TG9nb3V0J1xuICAgICdsb2dpbic6ICdzaG93TG9naW4nXG4gICAgJ2xvZ291dCc6ICdzaG93TG9nb3V0J1xuICAgICNGSVhNRVxuICAgICdwYWdlcy86bmFtZSc6ICd2aWV3UGFnZSdcbiAgICBcbmNsYXNzIEFwcGxldCBleHRlbmRzIFRrQXBwbGV0XG4gIENvbnRyb2xsZXI6IENvbnRyb2xsZXJcbiAgUm91dGVyOiBSb3V0ZXJcblxuICBvblN0b3A6IC0+XG4gICAgY29uc29sZS5sb2cgXCIoQ2hpbGQpIFN0b3BwaW5nIGZyb250ZG9vclwiLCBALmlzUnVubmluZygpXG4gICAgc3VwZXIoKVxuICBhcHBsZXRFbnRyaWVzOiBbXG4gICAge1xuICAgICAgbGFiZWw6ICdNYWluIE1lbnUnXG4gICAgICBtZW51OiBhcHBsZXRFbnRyaWVzXG4gICAgfVxuICBdXG5cbmV4cG9ydCBkZWZhdWx0IEFwcGxldFxuIl19
