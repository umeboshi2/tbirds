var BootStrapAppRouter, Controller, MainChannel, Router,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BootStrapAppRouter = require('../../bootstrap_router');

Controller = require('./controller');

MainChannel = Backbone.Radio.channel('global');

Router = (function(superClass) {
  extend(Router, superClass);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.appRoutes = {
    '': 'frontdoor',
    'frontdoor': 'frontdoor',
    'frontdoor/view': 'frontdoor',
    'frontdoor/view/:name': 'view_page',
    'frontdoor/login': 'show_login',
    'pages/:name': 'view_page'
  };

  return Router;

})(BootStrapAppRouter);

MainChannel.reply('applet:frontdoor:route', function() {
  var controller, router;
  controller = new Controller(MainChannel);
  return router = new Router({
    controller: controller
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxtREFBQTtFQUFBOzs7QUFBQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsd0JBQVI7O0FBRXJCLFVBQUEsR0FBYSxPQUFBLENBQVEsY0FBUjs7QUFHYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUdSOzs7Ozs7O21CQUNKLFNBQUEsR0FDRTtJQUFBLEVBQUEsRUFBSSxXQUFKO0lBQ0EsV0FBQSxFQUFhLFdBRGI7SUFFQSxnQkFBQSxFQUFrQixXQUZsQjtJQUdBLHNCQUFBLEVBQXdCLFdBSHhCO0lBSUEsaUJBQUEsRUFBbUIsWUFKbkI7SUFNQSxhQUFBLEVBQWUsV0FOZjs7Ozs7R0FGaUI7O0FBVXJCLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHdCQUFsQixFQUE0QyxTQUFBO0FBQzFDLE1BQUE7RUFBQSxVQUFBLEdBQWEsSUFBSSxVQUFKLENBQWUsV0FBZjtTQUNiLE1BQUEsR0FBUyxJQUFJLE1BQUosQ0FDUDtJQUFBLFVBQUEsRUFBWSxVQUFaO0dBRE87QUFGaUMsQ0FBNUMiLCJzb3VyY2VzQ29udGVudCI6WyJCb290U3RyYXBBcHBSb3V0ZXIgPSByZXF1aXJlICcuLi8uLi9ib290c3RyYXBfcm91dGVyJ1xuXG5Db250cm9sbGVyID0gcmVxdWlyZSAnLi9jb250cm9sbGVyJ1xuXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5cbmNsYXNzIFJvdXRlciBleHRlbmRzIEJvb3RTdHJhcEFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJyc6ICdmcm9udGRvb3InXG4gICAgJ2Zyb250ZG9vcic6ICdmcm9udGRvb3InXG4gICAgJ2Zyb250ZG9vci92aWV3JzogJ2Zyb250ZG9vcidcbiAgICAnZnJvbnRkb29yL3ZpZXcvOm5hbWUnOiAndmlld19wYWdlJ1xuICAgICdmcm9udGRvb3IvbG9naW4nOiAnc2hvd19sb2dpbidcbiAgICAjRklYTUVcbiAgICAncGFnZXMvOm5hbWUnOiAndmlld19wYWdlJ1xuICAgIFxuTWFpbkNoYW5uZWwucmVwbHkgJ2FwcGxldDpmcm9udGRvb3I6cm91dGUnLCAoKSAtPlxuICBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIgTWFpbkNoYW5uZWxcbiAgcm91dGVyID0gbmV3IFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcblxuIl19
