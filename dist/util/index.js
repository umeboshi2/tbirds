var create_new_approuter, navbar_color_handlers, navbar_set_active;

import $ from 'jquery';

import Backbone from 'backbone';

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


// These are handlers to retrieve the colors
// from the navbars, and are used to create
// the default color for the fullcalendar
// events.
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
  // FIXME this should be attached to view or
  // be a behavior
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

export {
  //if !String::startsWith
  //  String::startsWith = (searchString, position) ->
  //    position = position or 0
  //    @substr(position, searchString.length) == searchString
  create_new_approuter,
  navbar_color_handlers,
  navbar_set_active
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9pbmRleC5qcyIsInNvdXJjZXMiOlsidXRpbC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxvQkFBQSxFQUFBLHFCQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBRUEsb0JBQUEsR0FBdUIsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLEVBQWtCLFVBQWxCLENBQUE7QUFDckIsTUFBQSxVQUFBLEVBQUE7RUFBQSxVQUFBLEdBQWEsSUFBSTtFQUNqQixPQUFPLENBQUMsS0FBUixDQUFjLGlCQUFkLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO1dBQy9CO0VBRCtCLENBQWpDO0VBRUEsTUFBQSxHQUFTLElBQUksTUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztTQUVUO0FBTnFCLEVBSHZCOzs7Ozs7O0FBZUEscUJBQUEsR0FBd0IsUUFBQSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQUE7RUFDdEIsT0FBTyxDQUFDLEtBQVIsQ0FBYyxrQkFBZCxFQUFrQyxRQUFBLENBQUEsQ0FBQTtBQUNoQyxRQUFBO0lBQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxRQUFGO1dBQ1QsTUFBTSxDQUFDLEdBQVAsQ0FBVyxPQUFYO0VBRmdDLENBQWxDO1NBR0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxxQkFBZCxFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxRQUFBO0lBQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxRQUFGO1dBQ1QsTUFBTSxDQUFDLEdBQVAsQ0FBVyxrQkFBWDtFQUZtQyxDQUFyQztBQUpzQjs7QUFReEIsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLElBQUQsQ0FBQTtBQUNsQixNQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUEsUUFBQSxHQUFXLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWCxDQUFnQixDQUFBLENBQUE7QUFHM0I7OztBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7SUFDRSxHQUFBLEdBQU0sQ0FBQSxDQUFFLEVBQUY7SUFDTixHQUFHLENBQUMsV0FBSixDQUFnQixRQUFoQjtJQUNBLElBQUcsUUFBQSxLQUFZLEdBQUcsQ0FBQyxJQUFKLENBQVMsU0FBVCxDQUFmO21CQUNFLEdBQUcsQ0FBQyxRQUFKLENBQWEsUUFBYixHQURGO0tBQUEsTUFBQTsyQkFBQTs7RUFIRixDQUFBOztBQUprQjs7QUFlcEIsT0FBQTs7Ozs7RUFDRSxvQkFERjtFQUVFLHFCQUZGO0VBR0UsaUJBSEYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5cbmNyZWF0ZV9uZXdfYXBwcm91dGVyID0gKGNoYW5uZWwsIFJvdXRlciwgQ29udHJvbGxlcikgLT5cbiAgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyXG4gIGNoYW5uZWwucmVwbHkgJ21haW4tY29udHJvbGxlcicsIC0+XG4gICAgY29udHJvbGxlclxuICByb3V0ZXIgPSBuZXcgUm91dGVyXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICByb3V0ZXJcbiAgXG4jIFRoZXNlIGFyZSBoYW5kbGVycyB0byByZXRyaWV2ZSB0aGUgY29sb3JzXG4jIGZyb20gdGhlIG5hdmJhcnMsIGFuZCBhcmUgdXNlZCB0byBjcmVhdGVcbiMgdGhlIGRlZmF1bHQgY29sb3IgZm9yIHRoZSBmdWxsY2FsZW5kYXJcbiMgZXZlbnRzLlxubmF2YmFyX2NvbG9yX2hhbmRsZXJzID0gKGNoYW5uZWwsIHNlbGVjdG9yKSAtPlxuICBjaGFubmVsLnJlcGx5ICdnZXQtbmF2YmFyLWNvbG9yJywgLT5cbiAgICBuYXZiYXIgPSAkIHNlbGVjdG9yXG4gICAgbmF2YmFyLmNzcyAnY29sb3InXG4gIGNoYW5uZWwucmVwbHkgJ2dldC1uYXZiYXItYmctY29sb3InLCAtPlxuICAgIG5hdmJhciA9ICQgc2VsZWN0b3JcbiAgICBuYXZiYXIuY3NzICdiYWNrZ3JvdW5kLWNvbG9yJ1xuICAgIFxubmF2YmFyX3NldF9hY3RpdmUgPSAocGF0aCkgLT5cbiAgcGF0aF90b3AgPSBwYXRoLnNwbGl0KCcvJylbMF1cbiAgIyBGSVhNRSB0aGlzIHNob3VsZCBiZSBhdHRhY2hlZCB0byB2aWV3IG9yXG4gICMgYmUgYSBiZWhhdmlvclxuICBmb3IgbGkgaW4gJCgnI25hdmJhci12aWV3IGxpJylcbiAgICBsaXEgPSAkIGxpXG4gICAgbGlxLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgIGlmIHBhdGhfdG9wID09IGxpcS5hdHRyKCdhcHBuYW1lJylcbiAgICAgIGxpcS5hZGRDbGFzcygnYWN0aXZlJylcblxuI2lmICFTdHJpbmc6OnN0YXJ0c1dpdGhcbiMgIFN0cmluZzo6c3RhcnRzV2l0aCA9IChzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSAtPlxuIyAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIG9yIDBcbiMgICAgQHN1YnN0cihwb3NpdGlvbiwgc2VhcmNoU3RyaW5nLmxlbmd0aCkgPT0gc2VhcmNoU3RyaW5nXG5cbmV4cG9ydCB7XG4gIGNyZWF0ZV9uZXdfYXBwcm91dGVyXG4gIG5hdmJhcl9jb2xvcl9oYW5kbGVyc1xuICBuYXZiYXJfc2V0X2FjdGl2ZVxuICB9XG4gIFxuXG4iXX0=
