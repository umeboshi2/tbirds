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
    return tc.button('.btn.btn-default', {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL25hdmJhci5qcyIsInNvdXJjZXMiOlsidGVtcGxhdGVzL25hdmJhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx1QkFBQSxFQUFBLGVBQUEsRUFBQSxNQUFBLEVBQUEsY0FBQSxFQUFBLGFBQUEsRUFBQSxzQkFBQSxFQUFBOztBQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFHTCxDQUFBLENBQUUsc0JBQUYsRUFDRSxlQURGLENBQUEsR0FDc0IsT0FBQSxDQUFRLFdBQVIsQ0FEdEIsRUFIQTs7Ozs7QUFVQSx1QkFBQSxHQUEwQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxRQUFELENBQUE7U0FDdEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxZQUFQLEVBQXFCLFFBQUEsQ0FBQSxDQUFBO0lBQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sNkJBQVAsRUFBc0MsUUFBQSxDQUFBLENBQUE7TUFDcEMsRUFBRSxDQUFDLE1BQUgsQ0FBVSxnQkFBVixFQUE0QjtRQUFBLElBQUEsRUFBSyxRQUFMO1FBQWUsYUFBQSxFQUFjLFVBQTdCO1FBQzVCLGFBQUEsRUFBYztNQURjLENBQTVCLEVBQ2tDLFFBQUEsQ0FBQSxDQUFBO1FBQ2hDLEVBQUUsQ0FBQyxJQUFILENBQVEsVUFBUixFQUFvQixtQkFBcEI7UUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7UUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7ZUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7TUFKZ0MsQ0FEbEM7YUFNQSxFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsRUFBc0I7UUFBQSxJQUFBLEVBQUssUUFBUSxDQUFDLEtBQUssQ0FBQztNQUFwQixDQUF0QixFQUErQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQTlEO0lBUG9DLENBQXRDO1dBUUEsRUFBRSxDQUFDLEdBQUgsQ0FBTywyQkFBUCxFQUFvQyxRQUFBLENBQUEsQ0FBQTtNQUNsQyxF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RSxDQUFDLEVBQUgsQ0FBTSx3Q0FBTjthQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sd0JBQVA7SUFOdUQsQ0FBekQ7RUFKOEMsQ0FBaEQ7QUFENkIsQ0FBZDs7QUFhakIsTUFBQSxHQUFTLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLFFBQUQsQ0FBQSxFQUFBOztTQUVyQixFQUFFLENBQUMsR0FBSCxDQUFPLHNEQUFQLEVBQ0E7SUFBQSxLQUFBLEVBQU0sOEJBQU47SUFBc0MsVUFBQSxFQUFXLElBQWpEO0lBQ0EsSUFBQSxFQUFLO0VBREwsQ0FEQSxFQUVtQixRQUFBLENBQUEsQ0FBQTtXQUNqQixjQUFBLENBQWUsUUFBZjtFQURpQixDQUZuQjtBQUZxQixDQUFkLEVBckRUOzs7O0FBNkRBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxhQUFBLEVBQWUsYUFBZjtFQUNBLE1BQUEsRUFBUSxNQURSO0VBRUEsdUJBQUEsRUFBeUI7QUFGekIiLCJzb3VyY2VzQ29udGVudCI6WyJ0YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuXG57IG5hdmJhcl9jb2xsYXBzZV9idXR0b25cbiAgZHJvcGRvd25fdG9nZ2xlIH0gPSByZXF1aXJlICcuL2J1dHRvbnMnXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgTmF2QmFyIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5Cb290c3RyYXBOYXZCYXJUZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKGFwcG1vZGVsKSAtPlxuICB0Yy5kaXYgJy5jb250YWluZXInLCAtPlxuICAgIHRjLmRpdiAnI25hdmJhci1icmFuZC5uYXZiYXItaGVhZGVyJywgLT5cbiAgICAgIHRjLmJ1dHRvbiAnLm5hdmJhci10b2dnbGUnLCB0eXBlOididXR0b24nLCAnZGF0YS10b2dnbGUnOidjb2xsYXBzZScsXG4gICAgICAnZGF0YS10YXJnZXQnOicubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgICAgdGMuc3BhbiAnLnNyLW9ubHknLCAnVG9nZ2xlIE5hdmlnYXRpb24nXG4gICAgICAgIHRjLnNwYW4gJy5pY29uLWJhcidcbiAgICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgICB0Yy5hICcubmF2YmFyLWJyYW5kJywgaHJlZjphcHBtb2RlbC5icmFuZC51cmwsIGFwcG1vZGVsLmJyYW5kLm5hbWVcbiAgICB0Yy5kaXYgJy5uYXZiYXItY29sbGFwc2UuY29sbGFwc2UnLCAtPlxuICAgICAgdGMudWwgJyNhcHAtbmF2YmFyLm5hdi5uYXZiYXItbmF2JywgLT5cbiAgICAgICAgZm9yIGFwcGxldCBpbiBhcHBtb2RlbC5hcHBsZXRzXG4gICAgICAgICAgdGMubGkgYXBwbmFtZTphcHBsZXQuYXBwbmFtZSwgLT5cbiAgICAgICAgICAgIHRjLmEgaHJlZjphcHBsZXQudXJsLCBhcHBsZXQubmFtZVxuICAgICAgdGMudWwgJyNtYWluLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLWxlZnQnXG4gICAgICB0Yy51bCAnI3VzZXItbWVudS5uYXYubmF2YmFyLW5hdi5uYXZiYXItcmlnaHQnXG5cbiMgRklYTUUgLS0gbm8gc2VhcmNoIGZvcm0gd2l0aCBhY3Rpb25cbm5hdl9wdF9zZWFyY2ggPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgdGMuZm9ybSAnI2Zvcm0tc2VhcmNoLm5hdmJhci1mb3JtLm5hdmJhci1yaWdodCcsIHJvbGU6J3NlYXJjaCcsXG4gIG1ldGhvZDoncG9zdCcsIGFjdGlvbjpcIiN7YXBwbW9kZWwubmF2YmFyU2VhcmNoQWN0aW9ufVwiLCAtPlxuICAgIHRjLmRpdiAnLmZvcm0tZ3JvdXAnLCAtPlxuICAgICAgIyBGSVhNRSBzZWFyY2ggaW5wdXQgcGxhY2Vob2xkZXIgbmVlZHMgdG8gY29tZSBmcm9tIHNlcnZlclxuICAgICAgdGMuaW5wdXQgJy5mb3JtLWNvbnRyb2wnLCBuYW1lOidzZWFyY2gtdGVybScsIHR5cGU6J3NlYXJjaCcsXG4gICAgICBwbGFjZWhvbGRlcjonU2VhcmNoLi4uJ1xuICAgIHRjLmJ1dHRvbiAnLmJ0bi5idG4tZGVmYXVsdCcsIHR5cGU6J3N1Ym1pdCcsIG5hbWU6J3NlYXJjaC1zdWJtaXQnLFxuICAgIHZhbHVlOidzZWFyY2gnLCBzdHlsZTonZGlzcGxheTogbm9uZTsnLCAtPlxuICAgICAgdGMucmF3ICcmIzg1OTQnXG4gICAgICBcbm5hdl9wdF9jb250ZW50ID0gdGMucmVuZGVyYWJsZSAoYXBwbW9kZWwpIC0+XG4gIHRjLmRpdiBcIi4je2FwcG1vZGVsLmNvbnRhaW5lciBvciAnY29udGFpbmVyJ31cIiwgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJywgLT5cbiAgICAgIG5hdmJhcl9jb2xsYXBzZV9idXR0b24gJ25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6YXBwbW9kZWwuYnJhbmQudXJsLCBhcHBtb2RlbC5icmFuZC5uYW1lXG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLnVsICcubmF2Lm5hdmJhci1uYXYnLCAtPlxuICAgICAgICBmb3IgYXBwbGV0IGluIGFwcG1vZGVsLmFwcGxldHNcbiAgICAgICAgICB0Yy5saSBhcHBuYW1lOmFwcGxldC5hcHBuYW1lLCAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOmFwcGxldC51cmwsIGFwcGxldC5uYW1lXG4gICAgICB0Yy51bCAnI3VzZXItbWVudS5uYXYubmF2YmFyLW5hdi5uYXZiYXItcmlnaHQnXG4gICAgICB0Yy5kaXYgJyNmb3JtLXNlYXJjaC1jb250YWluZXInXG5cbm5hdl9wdCA9IHRjLnJlbmRlcmFibGUgKGFwcG1vZGVsKSAtPlxuICAjdGMubmF2ICcjbmF2YmFyLXZpZXcubmF2YmFyLm5hdmJhci1zdGF0aWMtdG9wLm5hdmJhci1pbnZlcnNlJyxcbiAgdGMubmF2ICcjbmF2YmFyLXZpZXcubmF2YmFyLm5hdmJhci1zdGF0aWMtdG9wLm5hdmJhci1kZWZhdWx0JyxcbiAgeG1sbnM6J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAneG1sOmxhbmcnOidlbicsXG4gIHJvbGU6J25hdmlnYXRpb24nLCAtPlxuICAgIG5hdl9wdF9jb250ZW50IGFwcG1vZGVsXG4gICAgXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG4gIG5hdl9wdF9zZWFyY2g6IG5hdl9wdF9zZWFyY2hcbiAgbmF2X3B0OiBuYXZfcHRcbiAgQm9vdHN0cmFwTmF2QmFyVGVtcGxhdGU6IEJvb3RzdHJhcE5hdkJhclRlbXBsYXRlXG4iXX0=
