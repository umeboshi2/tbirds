var create_new_approuter, navbar_color_handlers, navbar_set_active;

import $ from 'jquery';

create_new_approuter = function(channel, Router, Controller) {
  var controller, router;
  controller = new Controller();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9pbmRleC5qcyIsInNvdXJjZXMiOlsidXRpbC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxvQkFBQSxFQUFBLHFCQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBRUEsb0JBQUEsR0FBdUIsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLEVBQWtCLFVBQWxCLENBQUE7QUFDdkIsTUFBQSxVQUFBLEVBQUE7RUFBRSxVQUFBLEdBQWEsSUFBSSxVQUFKLENBQUE7RUFDYixPQUFPLENBQUMsS0FBUixDQUFjLGlCQUFkLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO1dBQy9CO0VBRCtCLENBQWpDO0VBRUEsTUFBQSxHQUFTLElBQUksTUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztTQUVUO0FBTnFCLEVBRnZCOzs7Ozs7O0FBY0EscUJBQUEsR0FBd0IsUUFBQSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQUE7RUFDdEIsT0FBTyxDQUFDLEtBQVIsQ0FBYyxrQkFBZCxFQUFrQyxRQUFBLENBQUEsQ0FBQTtBQUNwQyxRQUFBO0lBQUksTUFBQSxHQUFTLENBQUEsQ0FBRSxRQUFGO1dBQ1QsTUFBTSxDQUFDLEdBQVAsQ0FBVyxPQUFYO0VBRmdDLENBQWxDO1NBR0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxxQkFBZCxFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUN2QyxRQUFBO0lBQUksTUFBQSxHQUFTLENBQUEsQ0FBRSxRQUFGO1dBQ1QsTUFBTSxDQUFDLEdBQVAsQ0FBVyxrQkFBWDtFQUZtQyxDQUFyQztBQUpzQjs7QUFReEIsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLElBQUQsQ0FBQTtBQUNwQixNQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUUsUUFBQSxHQUFXLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWCxDQUFlLENBQUMsQ0FBRDtBQUcxQjs7O0FBQUE7RUFBQSxLQUFBLHFDQUFBOztJQUNFLEdBQUEsR0FBTSxDQUFBLENBQUUsRUFBRjtJQUNOLEdBQUcsQ0FBQyxXQUFKLENBQWdCLFFBQWhCO0lBQ0EsSUFBRyxRQUFBLEtBQVksR0FBRyxDQUFDLElBQUosQ0FBUyxTQUFULENBQWY7bUJBQ0UsR0FBRyxDQUFDLFFBQUosQ0FBYSxRQUFiLEdBREY7S0FBQSxNQUFBOzJCQUFBOztFQUhGLENBQUE7O0FBSmtCOztBQWVwQixPQUFBOzs7OztFQUNFLG9CQURGO0VBRUUscUJBRkY7RUFHRSxpQkFIRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcblxuY3JlYXRlX25ld19hcHByb3V0ZXIgPSAoY2hhbm5lbCwgUm91dGVyLCBDb250cm9sbGVyKSAtPlxuICBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXJcbiAgY2hhbm5lbC5yZXBseSAnbWFpbi1jb250cm9sbGVyJywgLT5cbiAgICBjb250cm9sbGVyXG4gIHJvdXRlciA9IG5ldyBSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIHJvdXRlclxuICBcbiMgVGhlc2UgYXJlIGhhbmRsZXJzIHRvIHJldHJpZXZlIHRoZSBjb2xvcnNcbiMgZnJvbSB0aGUgbmF2YmFycywgYW5kIGFyZSB1c2VkIHRvIGNyZWF0ZVxuIyB0aGUgZGVmYXVsdCBjb2xvciBmb3IgdGhlIGZ1bGxjYWxlbmRhclxuIyBldmVudHMuXG5uYXZiYXJfY29sb3JfaGFuZGxlcnMgPSAoY2hhbm5lbCwgc2VsZWN0b3IpIC0+XG4gIGNoYW5uZWwucmVwbHkgJ2dldC1uYXZiYXItY29sb3InLCAtPlxuICAgIG5hdmJhciA9ICQgc2VsZWN0b3JcbiAgICBuYXZiYXIuY3NzICdjb2xvcidcbiAgY2hhbm5lbC5yZXBseSAnZ2V0LW5hdmJhci1iZy1jb2xvcicsIC0+XG4gICAgbmF2YmFyID0gJCBzZWxlY3RvclxuICAgIG5hdmJhci5jc3MgJ2JhY2tncm91bmQtY29sb3InXG4gICAgXG5uYXZiYXJfc2V0X2FjdGl2ZSA9IChwYXRoKSAtPlxuICBwYXRoX3RvcCA9IHBhdGguc3BsaXQoJy8nKVswXVxuICAjIEZJWE1FIHRoaXMgc2hvdWxkIGJlIGF0dGFjaGVkIHRvIHZpZXcgb3JcbiAgIyBiZSBhIGJlaGF2aW9yXG4gIGZvciBsaSBpbiAkKCcjbmF2YmFyLXZpZXcgbGknKVxuICAgIGxpcSA9ICQgbGlcbiAgICBsaXEucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgaWYgcGF0aF90b3AgPT0gbGlxLmF0dHIoJ2FwcG5hbWUnKVxuICAgICAgbGlxLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4jaWYgIVN0cmluZzo6c3RhcnRzV2l0aFxuIyAgU3RyaW5nOjpzdGFydHNXaXRoID0gKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIC0+XG4jICAgIHBvc2l0aW9uID0gcG9zaXRpb24gb3IgMFxuIyAgICBAc3Vic3RyKHBvc2l0aW9uLCBzZWFyY2hTdHJpbmcubGVuZ3RoKSA9PSBzZWFyY2hTdHJpbmdcblxuZXhwb3J0IHtcbiAgY3JlYXRlX25ld19hcHByb3V0ZXJcbiAgbmF2YmFyX2NvbG9yX2hhbmRsZXJzXG4gIG5hdmJhcl9zZXRfYWN0aXZlXG4gIH1cbiAgXG5cbiJdfQ==
