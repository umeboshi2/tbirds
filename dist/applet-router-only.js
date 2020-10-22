import AppRouter from './routers/approuter';

export var AppletRouter = (function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci1vbmx5LmpzIiwic291cmNlcyI6WyJhcHBsZXQtcm91dGVyLW9ubHkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUCxNQUFBOztBQUVBLE9BQUEsSUFBYTtFQUFOLE1BQUEsYUFBQSxRQUEyQixVQUEzQjtJQUlMLE9BQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsQ0FBQTtBQUNYLFVBQUE7TUFBSSxJQUFHLElBQUEsS0FBUSxZQUFYO1FBQ0UsSUFBRyxJQUFJLENBQUMsTUFBTCxLQUFlLENBQWxCO1VBQ0UsSUFBRyxJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQWEsSUFBaEI7WUFDRSxHQUFBLEdBQU0sQ0FBQSxJQUFBLENBQUEsQ0FBTyxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQVYsQ0FBUCxDQUFBLEVBRFI7V0FBQSxNQUFBO1lBR0UsR0FBQSxHQUFNLENBQUEsSUFBQSxDQUFBLENBQU8sSUFBSSxDQUFDLENBQUQsQ0FBWCxDQUFBLEVBSFI7O1VBSUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaLEVBQWlCLFFBQWpCLEVBTEY7U0FBQSxNQUFBO1VBT0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxzQkFBYixFQVBGO1NBREY7O01BU0EsSUFBRyxPQUFBLElBQVksS0FBZjtlQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEMsRUFBOEMsSUFBOUMsRUFERjs7SUFWTzs7RUFKSjs7eUJBQ0wsU0FBQSxHQUNFO0lBQUEsZ0JBQUEsRUFBa0IsWUFBbEI7SUFDQSxjQUFBLEVBQWdCO0VBRGhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwcFJvdXRlciBmcm9tICcuL3JvdXRlcnMvYXBwcm91dGVyJ1xuXG5leHBvcnQgY2xhc3MgQXBwbGV0Um91dGVyIGV4dGVuZHMgQXBwUm91dGVyXG4gIGFwcFJvdXRlczpcbiAgICAnaHR0cCpyZW1haW5kZXInOiAnZGlyZWN0TGluaydcbiAgICAnOmFwcGxldCpwYXRoJzogJ3JvdXRlQXBwbGV0J1xuICBvblJvdXRlOiAobmFtZSwgcGF0aCwgYXJncykgLT5cbiAgICBpZiBuYW1lIGlzICdkaXJlY3RMaW5rJ1xuICAgICAgaWYgYXJncy5sZW5ndGggPT0gMlxuICAgICAgICBpZiBhcmdzWzFdIGlzbnQgbnVsbFxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJncy5qb2luKCc/Jyl9XCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJnc1swXX1cIlxuICAgICAgICB3aW5kb3cub3BlbiB1cmwsICdfYmxhbmsnXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUud2FybiBcInVuaGFuZGxlZCBkaXJlY3RMaW5rXCJcbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJNYWluUm91dGVyLm9uUm91dGVcIiwgbmFtZSwgcGF0aCwgYXJnc1xuXG4iXX0=
