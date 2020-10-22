var AppletRouter, MainChannel, MessageChannel;

import {
  Radio,
  history as BBhistory
} from 'backbone';

import {
  MnObject
} from 'backbone.marionette';

import AppRouter from './routers/approuter';

import RequireController from './require-controller';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

AppletRouter = (function() {
  class AppletRouter extends AppRouter {
    onRoute(name, path, args) {
      var url;
      if (name === 'directLink') {
        if (args.length === 2) {
          if (args[1] !== null) {
            url = `http${args.join('?')}`;
          } else {
            url = `http${args[0]}`;
          }
          window.open(url, '_blank');
        } else {
          console.warn("unhandled directLink");
        }
      }
      if (__DEV__ && DEBUG) {
        return console.log("MainRouter.onRoute", name, path, args);
      }
    }

  };

  AppletRouter.prototype.appRoutes = {
    'http*remainder': 'directLink',
    ':applet*path': 'routeApplet'
  };

  return AppletRouter;

}).call(this);

MainChannel.reply('main:app:create-main-router', function() {
  var controller, router;
  controller = new RequireController();
  router = new AppletRouter({
    controller: controller
  });
  MainChannel.reply('main-controller', function() {
    return controller;
  });
  MainChannel.reply('main-router', function() {
    return router;
  });
});

export {
  RequireController,
  AppletRouter
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLE9BQUEsYUFBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxRQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFDQSxPQUFPLGlCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFDZCxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZDs7QUFFWDtFQUFOLE1BQUEsYUFBQSxRQUEyQixVQUEzQjtJQUlFLE9BQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsQ0FBQTtBQUNYLFVBQUE7TUFBSSxJQUFHLElBQUEsS0FBUSxZQUFYO1FBQ0UsSUFBRyxJQUFJLENBQUMsTUFBTCxLQUFlLENBQWxCO1VBQ0UsSUFBRyxJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQWEsSUFBaEI7WUFDRSxHQUFBLEdBQU0sQ0FBQSxJQUFBLENBQUEsQ0FBTyxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQVYsQ0FBUCxDQUFBLEVBRFI7V0FBQSxNQUFBO1lBR0UsR0FBQSxHQUFNLENBQUEsSUFBQSxDQUFBLENBQU8sSUFBSSxDQUFDLENBQUQsQ0FBWCxDQUFBLEVBSFI7O1VBSUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaLEVBQWlCLFFBQWpCLEVBTEY7U0FBQSxNQUFBO1VBT0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxzQkFBYixFQVBGO1NBREY7O01BU0EsSUFBRyxPQUFBLElBQVksS0FBZjtlQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEMsRUFBOEMsSUFBOUMsRUFERjs7SUFWTzs7RUFKWDs7eUJBQ0UsU0FBQSxHQUNFO0lBQUEsZ0JBQUEsRUFBa0IsWUFBbEI7SUFDQSxjQUFBLEVBQWdCO0VBRGhCOzs7Ozs7QUFlSixXQUFXLENBQUMsS0FBWixDQUFrQiw2QkFBbEIsRUFBaUQsUUFBQSxDQUFBLENBQUE7QUFDakQsTUFBQSxVQUFBLEVBQUE7RUFBRSxVQUFBLEdBQWEsSUFBSSxpQkFBSixDQUFBO0VBQ2IsTUFBQSxHQUFTLElBQUksWUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztFQUVULFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxXQUFPO0VBRDRCLENBQXJDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsYUFBbEIsRUFBaUMsUUFBQSxDQUFBLENBQUE7QUFDL0IsV0FBTztFQUR3QixDQUFqQztBQU4rQyxDQUFqRDs7QUFVQSxPQUFBO0VBQ0UsaUJBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8sIGhpc3RvcnkgYXMgQkJoaXN0b3J5IH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBNbk9iamVjdCB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgQXBwUm91dGVyIGZyb20gJy4vcm91dGVycy9hcHByb3V0ZXInXG5pbXBvcnQgUmVxdWlyZUNvbnRyb2xsZXIgZnJvbSAnLi9yZXF1aXJlLWNvbnRyb2xsZXInXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuY2xhc3MgQXBwbGV0Um91dGVyIGV4dGVuZHMgQXBwUm91dGVyXG4gIGFwcFJvdXRlczpcbiAgICAnaHR0cCpyZW1haW5kZXInOiAnZGlyZWN0TGluaydcbiAgICAnOmFwcGxldCpwYXRoJzogJ3JvdXRlQXBwbGV0J1xuICBvblJvdXRlOiAobmFtZSwgcGF0aCwgYXJncykgLT5cbiAgICBpZiBuYW1lIGlzICdkaXJlY3RMaW5rJ1xuICAgICAgaWYgYXJncy5sZW5ndGggPT0gMlxuICAgICAgICBpZiBhcmdzWzFdIGlzbnQgbnVsbFxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJncy5qb2luKCc/Jyl9XCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJnc1swXX1cIlxuICAgICAgICB3aW5kb3cub3BlbiB1cmwsICdfYmxhbmsnXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUud2FybiBcInVuaGFuZGxlZCBkaXJlY3RMaW5rXCJcbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJNYWluUm91dGVyLm9uUm91dGVcIiwgbmFtZSwgcGF0aCwgYXJnc1xuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y3JlYXRlLW1haW4tcm91dGVyJywgLT5cbiAgY29udHJvbGxlciA9IG5ldyBSZXF1aXJlQ29udHJvbGxlclxuICByb3V0ZXIgPSBuZXcgQXBwbGV0Um91dGVyXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1jb250cm9sbGVyJywgLT5cbiAgICByZXR1cm4gY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1yb3V0ZXInLCAtPlxuICAgIHJldHVybiByb3V0ZXJcbiAgcmV0dXJuXG5cbmV4cG9ydCB7XG4gIFJlcXVpcmVDb250cm9sbGVyXG4gIEFwcGxldFJvdXRlclxuICB9XG4iXX0=
