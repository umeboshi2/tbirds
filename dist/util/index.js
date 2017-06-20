var $, Backbone, create_new_approuter, navbar_color_handlers, navbar_set_active;

$ = require('jquery');

Backbone = require('backbone');

create_new_approuter = function(channel, Router, Controller) {
  var controller, router;
  controller = new Controller;
  channel.reply('main-controller', function() {
    return controller;
  });
  router = new Router({
    controller: controller
  });
  return router;
};

navbar_color_handlers = function(channel, selector) {
  channel.reply('get-navbar-color', function() {
    var navbar;
    navbar = $(selector);
    return navbar.css('color');
  });
  return channel.reply('get-navbar-bg-color', function() {
    var navbar;
    navbar = $(selector);
    return navbar.css('background-color');
  });
};

navbar_set_active = function(path) {
  var i, len, li, liq, path_top, ref, results;
  path_top = path.split('/')[0];
  ref = $('#navbar-view li');
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    li = ref[i];
    liq = $(li);
    liq.removeClass('active');
    if (path_top === liq.attr('appname')) {
      results.push(liq.addClass('active'));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

module.exports = {
  create_new_approuter: create_new_approuter,
  navbar_color_handlers: navbar_color_handlers,
  navbar_set_active: navbar_set_active
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9pbmRleC5qcyIsInNvdXJjZXMiOlsidXRpbC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUVYLG9CQUFBLEdBQXVCLFNBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsVUFBbEI7QUFDckIsTUFBQTtFQUFBLFVBQUEsR0FBYSxJQUFJO0VBQ2pCLE9BQU8sQ0FBQyxLQUFSLENBQWMsaUJBQWQsRUFBaUMsU0FBQTtXQUMvQjtFQUQrQixDQUFqQztFQUVBLE1BQUEsR0FBUyxJQUFJLE1BQUosQ0FDUDtJQUFBLFVBQUEsRUFBWSxVQUFaO0dBRE87U0FFVDtBQU5xQjs7QUFZdkIscUJBQUEsR0FBd0IsU0FBQyxPQUFELEVBQVUsUUFBVjtFQUN0QixPQUFPLENBQUMsS0FBUixDQUFjLGtCQUFkLEVBQWtDLFNBQUE7QUFDaEMsUUFBQTtJQUFBLE1BQUEsR0FBUyxDQUFBLENBQUUsUUFBRjtXQUNULE1BQU0sQ0FBQyxHQUFQLENBQVcsT0FBWDtFQUZnQyxDQUFsQztTQUdBLE9BQU8sQ0FBQyxLQUFSLENBQWMscUJBQWQsRUFBcUMsU0FBQTtBQUNuQyxRQUFBO0lBQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxRQUFGO1dBQ1QsTUFBTSxDQUFDLEdBQVAsQ0FBVyxrQkFBWDtFQUZtQyxDQUFyQztBQUpzQjs7QUFReEIsaUJBQUEsR0FBb0IsU0FBQyxJQUFEO0FBQ2xCLE1BQUE7RUFBQSxRQUFBLEdBQVcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBQWdCLENBQUEsQ0FBQTtBQUczQjtBQUFBO09BQUEscUNBQUE7O0lBQ0UsR0FBQSxHQUFNLENBQUEsQ0FBRSxFQUFGO0lBQ04sR0FBRyxDQUFDLFdBQUosQ0FBZ0IsUUFBaEI7SUFDQSxJQUFHLFFBQUEsS0FBWSxHQUFHLENBQUMsSUFBSixDQUFTLFNBQVQsQ0FBZjttQkFDRSxHQUFHLENBQUMsUUFBSixDQUFhLFFBQWIsR0FERjtLQUFBLE1BQUE7MkJBQUE7O0FBSEY7O0FBSmtCOztBQWVwQixNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsb0JBQUEsRUFBc0Isb0JBQXRCO0VBQ0EscUJBQUEsRUFBdUIscUJBRHZCO0VBRUEsaUJBQUEsRUFBbUIsaUJBRm5CIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5cbmNyZWF0ZV9uZXdfYXBwcm91dGVyID0gKGNoYW5uZWwsIFJvdXRlciwgQ29udHJvbGxlcikgLT5cbiAgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyXG4gIGNoYW5uZWwucmVwbHkgJ21haW4tY29udHJvbGxlcicsIC0+XG4gICAgY29udHJvbGxlclxuICByb3V0ZXIgPSBuZXcgUm91dGVyXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICByb3V0ZXJcbiAgXG4jIFRoZXNlIGFyZSBoYW5kbGVycyB0byByZXRyaWV2ZSB0aGUgY29sb3JzXG4jIGZyb20gdGhlIG5hdmJhcnMsIGFuZCBhcmUgdXNlZCB0byBjcmVhdGVcbiMgdGhlIGRlZmF1bHQgY29sb3IgZm9yIHRoZSBmdWxsY2FsZW5kYXJcbiMgZXZlbnRzLlxubmF2YmFyX2NvbG9yX2hhbmRsZXJzID0gKGNoYW5uZWwsIHNlbGVjdG9yKSAtPlxuICBjaGFubmVsLnJlcGx5ICdnZXQtbmF2YmFyLWNvbG9yJywgLT5cbiAgICBuYXZiYXIgPSAkIHNlbGVjdG9yXG4gICAgbmF2YmFyLmNzcyAnY29sb3InXG4gIGNoYW5uZWwucmVwbHkgJ2dldC1uYXZiYXItYmctY29sb3InLCAtPlxuICAgIG5hdmJhciA9ICQgc2VsZWN0b3JcbiAgICBuYXZiYXIuY3NzICdiYWNrZ3JvdW5kLWNvbG9yJ1xuICAgIFxubmF2YmFyX3NldF9hY3RpdmUgPSAocGF0aCkgLT5cbiAgcGF0aF90b3AgPSBwYXRoLnNwbGl0KCcvJylbMF1cbiAgIyBGSVhNRSB0aGlzIHNob3VsZCBiZSBhdHRhY2hlZCB0byB2aWV3IG9yXG4gICMgYmUgYSBiZWhhdmlvclxuICBmb3IgbGkgaW4gJCgnI25hdmJhci12aWV3IGxpJylcbiAgICBsaXEgPSAkIGxpXG4gICAgbGlxLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgIGlmIHBhdGhfdG9wID09IGxpcS5hdHRyKCdhcHBuYW1lJylcbiAgICAgIGxpcS5hZGRDbGFzcygnYWN0aXZlJylcblxuI2lmICFTdHJpbmc6OnN0YXJ0c1dpdGhcbiMgIFN0cmluZzo6c3RhcnRzV2l0aCA9IChzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSAtPlxuIyAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIG9yIDBcbiMgICAgQHN1YnN0cihwb3NpdGlvbiwgc2VhcmNoU3RyaW5nLmxlbmd0aCkgPT0gc2VhcmNoU3RyaW5nXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgY3JlYXRlX25ld19hcHByb3V0ZXI6IGNyZWF0ZV9uZXdfYXBwcm91dGVyXG4gIG5hdmJhcl9jb2xvcl9oYW5kbGVyczogbmF2YmFyX2NvbG9yX2hhbmRsZXJzXG4gIG5hdmJhcl9zZXRfYWN0aXZlOiBuYXZiYXJfc2V0X2FjdGl2ZVxuXG4iXX0=
