var BootStrapAppRouter, Controller, MainChannel, Router;

BootStrapAppRouter = require('../../bootstrap_router');

Controller = require('./controller');

MainChannel = Backbone.Radio.channel('global');

Router = (function() {
  class Router extends BootStrapAppRouter {};

  Router.prototype.appRoutes = {
    '': 'frontdoor',
    'frontdoor': 'frontdoor',
    'frontdoor/view': 'frontdoor',
    'frontdoor/view/:name': 'view_page',
    'frontdoor/login': 'show_login',
    //FIXME
    'pages/:name': 'view_page'
  };

  return Router;

}).call(this);

MainChannel.reply('applet:frontdoor:route', function() {
  var controller, router;
  controller = new Controller(MainChannel);
  return router = new Router({
    controller: controller
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxrQkFBQSxFQUFBLFVBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSOztBQUVyQixVQUFBLEdBQWEsT0FBQSxDQUFRLGNBQVI7O0FBR2IsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFHUjtFQUFOLE1BQUEsT0FBQSxRQUFxQixtQkFBckIsQ0FBQTs7bUJBQ0UsU0FBQSxHQUNFO0lBQUEsRUFBQSxFQUFJLFdBQUo7SUFDQSxXQUFBLEVBQWEsV0FEYjtJQUVBLGdCQUFBLEVBQWtCLFdBRmxCO0lBR0Esc0JBQUEsRUFBd0IsV0FIeEI7SUFJQSxpQkFBQSxFQUFtQixZQUpuQjs7SUFNQSxhQUFBLEVBQWU7RUFOZjs7Ozs7O0FBUUosV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQSxDQUFBO0FBQzFDLE1BQUEsVUFBQSxFQUFBO0VBQUEsVUFBQSxHQUFhLElBQUksVUFBSixDQUFlLFdBQWY7U0FDYixNQUFBLEdBQVMsSUFBSSxNQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVk7RUFBWixDQURPO0FBRmlDLENBQTVDIiwic291cmNlc0NvbnRlbnQiOlsiQm9vdFN0cmFwQXBwUm91dGVyID0gcmVxdWlyZSAnLi4vLi4vYm9vdHN0cmFwX3JvdXRlcidcblxuQ29udHJvbGxlciA9IHJlcXVpcmUgJy4vY29udHJvbGxlcidcblxuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuXG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBCb290U3RyYXBBcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICcnOiAnZnJvbnRkb29yJ1xuICAgICdmcm9udGRvb3InOiAnZnJvbnRkb29yJ1xuICAgICdmcm9udGRvb3Ivdmlldyc6ICdmcm9udGRvb3InXG4gICAgJ2Zyb250ZG9vci92aWV3LzpuYW1lJzogJ3ZpZXdfcGFnZSdcbiAgICAnZnJvbnRkb29yL2xvZ2luJzogJ3Nob3dfbG9naW4nXG4gICAgI0ZJWE1FXG4gICAgJ3BhZ2VzLzpuYW1lJzogJ3ZpZXdfcGFnZSdcbiAgICBcbk1haW5DaGFubmVsLnJlcGx5ICdhcHBsZXQ6ZnJvbnRkb29yOnJvdXRlJywgKCkgLT5cbiAgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyIE1haW5DaGFubmVsXG4gIHJvdXRlciA9IG5ldyBSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG5cbiJdfQ==
