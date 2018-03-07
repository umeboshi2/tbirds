var BootstrapNavBarTemplate, dropdown_toggle, nav_pt, nav_pt_content, nav_pt_search, navbar_collapse_button, tc;

tc = require('teacup');

({navbar_collapse_button, dropdown_toggle} = require('./buttons'));

//#######################################
// NavBar Templates
//#######################################
BootstrapNavBarTemplate = tc.renderable(function(appmodel) {
  return tc.div('.container', function() {
    tc.div('#navbar-brand.navbar-header', function() {
      tc.button('.navbar-toggle', {
        type: 'button',
        'data-toggle': 'collapse',
        'data-target': '.navbar-collapse'
      }, function() {
        tc.span('.sr-only', 'Toggle Navigation');
        tc.span('.icon-bar');
        tc.span('.icon-bar');
        return tc.span('.icon-bar');
      });
      return tc.a('.navbar-brand', {
        href: appmodel.brand.url
      }, appmodel.brand.name);
    });
    return tc.div('.navbar-collapse.collapse', function() {
      tc.ul('#app-navbar.nav.navbar-nav', function() {
        var applet, i, len, ref, results;
        ref = appmodel.applets;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          applet = ref[i];
          results.push(tc.li({
            appname: applet.appname
          }, function() {
            return tc.a({
              href: applet.url
            }, applet.name);
          }));
        }
        return results;
      });
      tc.ul('#main-menu.nav.navbar-nav.navbar-left');
      return tc.ul('#user-menu.nav.navbar-nav.navbar-right');
    });
  });
});

// FIXME -- no search form with action
nav_pt_search = tc.renderable(function(appmodel) {
  return tc.form('#form-search.navbar-form.navbar-right', {
    role: 'search',
    method: 'post',
    action: `${appmodel.navbarSearchAction}`
  }, function() {
    tc.div('.form-group', function() {
      // FIXME search input placeholder needs to come from server
      return tc.input('.form-control', {
        name: 'search-term',
        type: 'search',
        placeholder: 'Search...'
      });
    });
    return tc.button('.btn.btn-secondary', {
      type: 'submit',
      name: 'search-submit',
      value: 'search',
      style: 'display: none;'
    }, function() {
      return tc.raw('&#8594');
    });
  });
});

nav_pt_content = tc.renderable(function(appmodel) {
  return tc.div(`.${appmodel.container || 'container'}`, function() {
    tc.div('.navbar-header', function() {
      navbar_collapse_button('navbar-view-collapse');
      return tc.a('.navbar-brand', {
        href: appmodel.brand.url
      }, appmodel.brand.name);
    });
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.ul('.nav.navbar-nav', function() {
        var applet, i, len, ref, results;
        ref = appmodel.applets;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          applet = ref[i];
          results.push(tc.li({
            appname: applet.appname
          }, function() {
            return tc.a({
              href: applet.url
            }, applet.name);
          }));
        }
        return results;
      });
      tc.ul('#user-menu.nav.navbar-nav.navbar-right');
      return tc.div('#form-search-container');
    });
  });
});

nav_pt = tc.renderable(function(appmodel) {
  //tc.nav '#navbar-view.navbar.navbar-static-top.navbar-inverse',
  return tc.nav('#navbar-view.navbar.navbar-static-top.navbar-default', {
    xmlns: 'http://www.w3.org/1999/xhtml',
    'xml:lang': 'en',
    role: 'navigation'
  }, function() {
    return nav_pt_content(appmodel);
  });
});


//#######################################
module.exports = {
  nav_pt_search: nav_pt_search,
  nav_pt: nav_pt,
  BootstrapNavBarTemplate: BootstrapNavBarTemplate
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL25hdmJhci5qcyIsInNvdXJjZXMiOlsidGVtcGxhdGVzL25hdmJhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx1QkFBQSxFQUFBLGVBQUEsRUFBQSxNQUFBLEVBQUEsY0FBQSxFQUFBLGFBQUEsRUFBQSxzQkFBQSxFQUFBOztBQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFHTCxDQUFBLENBQUUsc0JBQUYsRUFDRSxlQURGLENBQUEsR0FDc0IsT0FBQSxDQUFRLFdBQVIsQ0FEdEIsRUFIQTs7Ozs7QUFVQSx1QkFBQSxHQUEwQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxRQUFELENBQUE7U0FDdEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxZQUFQLEVBQXFCLFFBQUEsQ0FBQSxDQUFBO0lBQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sNkJBQVAsRUFBc0MsUUFBQSxDQUFBLENBQUE7TUFDcEMsRUFBRSxDQUFDLE1BQUgsQ0FBVSxnQkFBVixFQUE0QjtRQUFBLElBQUEsRUFBSyxRQUFMO1FBQWUsYUFBQSxFQUFjLFVBQTdCO1FBQzVCLGFBQUEsRUFBYztNQURjLENBQTVCLEVBQ2tDLFFBQUEsQ0FBQSxDQUFBO1FBQ2hDLEVBQUUsQ0FBQyxJQUFILENBQVEsVUFBUixFQUFvQixtQkFBcEI7UUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7UUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7ZUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7TUFKZ0MsQ0FEbEM7YUFNQSxFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsRUFBc0I7UUFBQSxJQUFBLEVBQUssUUFBUSxDQUFDLEtBQUssQ0FBQztNQUFwQixDQUF0QixFQUErQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQTlEO0lBUG9DLENBQXRDO1dBUUEsRUFBRSxDQUFDLEdBQUgsQ0FBTywyQkFBUCxFQUFvQyxRQUFBLENBQUEsQ0FBQTtNQUNsQyxF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QUUsQ0FBQyxFQUFILENBQU0sd0NBQU47YUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBTnVELENBQXpEO0VBSjhDLENBQWhEO0FBRDZCLENBQWQ7O0FBYWpCLE1BQUEsR0FBUyxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxRQUFELENBQUEsRUFBQTs7U0FFckIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxzREFBUCxFQUNBO0lBQUEsS0FBQSxFQUFNLDhCQUFOO0lBQXNDLFVBQUEsRUFBVyxJQUFqRDtJQUNBLElBQUEsRUFBSztFQURMLENBREEsRUFFbUIsUUFBQSxDQUFBLENBQUE7V0FDakIsY0FBQSxDQUFlLFFBQWY7RUFEaUIsQ0FGbkI7QUFGcUIsQ0FBZCxFQXJEVDs7OztBQTZEQSxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsYUFBQSxFQUFlLGFBQWY7RUFDQSxNQUFBLEVBQVEsTUFEUjtFQUVBLHVCQUFBLEVBQXlCO0FBRnpCIiwic291cmNlc0NvbnRlbnQiOlsidGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cblxueyBuYXZiYXJfY29sbGFwc2VfYnV0dG9uXG4gIGRyb3Bkb3duX3RvZ2dsZSB9ID0gcmVxdWlyZSAnLi9idXR0b25zJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIE5hdkJhciBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuQm9vdHN0cmFwTmF2QmFyVGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgdGMuZGl2ICcuY29udGFpbmVyJywgLT5cbiAgICB0Yy5kaXYgJyNuYXZiYXItYnJhbmQubmF2YmFyLWhlYWRlcicsIC0+XG4gICAgICB0Yy5idXR0b24gJy5uYXZiYXItdG9nZ2xlJywgdHlwZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonY29sbGFwc2UnLFxuICAgICAgJ2RhdGEtdGFyZ2V0JzonLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICAgIHRjLnNwYW4gJy5zci1vbmx5JywgJ1RvZ2dsZSBOYXZpZ2F0aW9uJ1xuICAgICAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgICAgIHRjLnNwYW4gJy5pY29uLWJhcidcbiAgICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6YXBwbW9kZWwuYnJhbmQudXJsLCBhcHBtb2RlbC5icmFuZC5uYW1lXG4gICAgdGMuZGl2ICcubmF2YmFyLWNvbGxhcHNlLmNvbGxhcHNlJywgLT5cbiAgICAgIHRjLnVsICcjYXBwLW5hdmJhci5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgICAgIGZvciBhcHBsZXQgaW4gYXBwbW9kZWwuYXBwbGV0c1xuICAgICAgICAgIHRjLmxpIGFwcG5hbWU6YXBwbGV0LmFwcG5hbWUsIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6YXBwbGV0LnVybCwgYXBwbGV0Lm5hbWVcbiAgICAgIHRjLnVsICcjbWFpbi1tZW51Lm5hdi5uYXZiYXItbmF2Lm5hdmJhci1sZWZ0J1xuICAgICAgdGMudWwgJyN1c2VyLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0J1xuXG4jIEZJWE1FIC0tIG5vIHNlYXJjaCBmb3JtIHdpdGggYWN0aW9uXG5uYXZfcHRfc2VhcmNoID0gdGMucmVuZGVyYWJsZSAoYXBwbW9kZWwpIC0+XG4gIHRjLmZvcm0gJyNmb3JtLXNlYXJjaC5uYXZiYXItZm9ybS5uYXZiYXItcmlnaHQnLCByb2xlOidzZWFyY2gnLFxuICBtZXRob2Q6J3Bvc3QnLCBhY3Rpb246XCIje2FwcG1vZGVsLm5hdmJhclNlYXJjaEFjdGlvbn1cIiwgLT5cbiAgICB0Yy5kaXYgJy5mb3JtLWdyb3VwJywgLT5cbiAgICAgICMgRklYTUUgc2VhcmNoIGlucHV0IHBsYWNlaG9sZGVyIG5lZWRzIHRvIGNvbWUgZnJvbSBzZXJ2ZXJcbiAgICAgIHRjLmlucHV0ICcuZm9ybS1jb250cm9sJywgbmFtZTonc2VhcmNoLXRlcm0nLCB0eXBlOidzZWFyY2gnLFxuICAgICAgcGxhY2Vob2xkZXI6J1NlYXJjaC4uLidcbiAgICB0Yy5idXR0b24gJy5idG4uYnRuLXNlY29uZGFyeScsIHR5cGU6J3N1Ym1pdCcsIG5hbWU6J3NlYXJjaC1zdWJtaXQnLFxuICAgIHZhbHVlOidzZWFyY2gnLCBzdHlsZTonZGlzcGxheTogbm9uZTsnLCAtPlxuICAgICAgdGMucmF3ICcmIzg1OTQnXG4gICAgICBcbm5hdl9wdF9jb250ZW50ID0gdGMucmVuZGVyYWJsZSAoYXBwbW9kZWwpIC0+XG4gIHRjLmRpdiBcIi4je2FwcG1vZGVsLmNvbnRhaW5lciBvciAnY29udGFpbmVyJ31cIiwgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJywgLT5cbiAgICAgIG5hdmJhcl9jb2xsYXBzZV9idXR0b24gJ25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6YXBwbW9kZWwuYnJhbmQudXJsLCBhcHBtb2RlbC5icmFuZC5uYW1lXG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLnVsICcubmF2Lm5hdmJhci1uYXYnLCAtPlxuICAgICAgICBmb3IgYXBwbGV0IGluIGFwcG1vZGVsLmFwcGxldHNcbiAgICAgICAgICB0Yy5saSBhcHBuYW1lOmFwcGxldC5hcHBuYW1lLCAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOmFwcGxldC51cmwsIGFwcGxldC5uYW1lXG4gICAgICB0Yy51bCAnI3VzZXItbWVudS5uYXYubmF2YmFyLW5hdi5uYXZiYXItcmlnaHQnXG4gICAgICB0Yy5kaXYgJyNmb3JtLXNlYXJjaC1jb250YWluZXInXG5cbm5hdl9wdCA9IHRjLnJlbmRlcmFibGUgKGFwcG1vZGVsKSAtPlxuICAjdGMubmF2ICcjbmF2YmFyLXZpZXcubmF2YmFyLm5hdmJhci1zdGF0aWMtdG9wLm5hdmJhci1pbnZlcnNlJyxcbiAgdGMubmF2ICcjbmF2YmFyLXZpZXcubmF2YmFyLm5hdmJhci1zdGF0aWMtdG9wLm5hdmJhci1kZWZhdWx0JyxcbiAgeG1sbnM6J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAneG1sOmxhbmcnOidlbicsXG4gIHJvbGU6J25hdmlnYXRpb24nLCAtPlxuICAgIG5hdl9wdF9jb250ZW50IGFwcG1vZGVsXG4gICAgXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG4gIG5hdl9wdF9zZWFyY2g6IG5hdl9wdF9zZWFyY2hcbiAgbmF2X3B0OiBuYXZfcHRcbiAgQm9vdHN0cmFwTmF2QmFyVGVtcGxhdGU6IEJvb3RzdHJhcE5hdkJhclRlbXBsYXRlXG4iXX0=
