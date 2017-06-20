var BootstrapNavBarTemplate, dropdown_toggle, nav_pt, nav_pt_content, nav_pt_search, navbar_collapse_button, ref, tc;

tc = require('teacup');

ref = require('./buttons'), navbar_collapse_button = ref.navbar_collapse_button, dropdown_toggle = ref.dropdown_toggle;

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
        var applet, i, len, ref1, results;
        ref1 = appmodel.applets;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          applet = ref1[i];
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

nav_pt_search = tc.renderable(function(appmodel) {
  return tc.form('#form-search.navbar-form.navbar-right', {
    role: 'search',
    method: 'post',
    action: "" + appmodel.navbarSearchAction
  }, function() {
    tc.div('.form-group', function() {
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
  return tc.div("." + (appmodel.container || 'container'), function() {
    tc.div('.navbar-header', function() {
      navbar_collapse_button('navbar-view-collapse');
      return tc.a('.navbar-brand', {
        href: appmodel.brand.url
      }, appmodel.brand.name);
    });
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.ul('.nav.navbar-nav', function() {
        var applet, i, len, ref1, results;
        ref1 = appmodel.applets;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          applet = ref1[i];
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
  return tc.nav('#navbar-view.navbar.navbar-static-top.navbar-default', {
    xmlns: 'http://www.w3.org/1999/xhtml',
    'xml:lang': 'en',
    role: 'navigation'
  }, function() {
    return nav_pt_content(appmodel);
  });
});

module.exports = {
  nav_pt_search: nav_pt_search,
  nav_pt: nav_pt,
  BootstrapNavBarTemplate: BootstrapNavBarTemplate
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL25hdmJhci5qcyIsInNvdXJjZXMiOlsidGVtcGxhdGVzL25hdmJhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBR0wsTUFDc0IsT0FBQSxDQUFRLFdBQVIsQ0FEdEIsRUFBRSxtREFBRixFQUNFOztBQU1GLHVCQUFBLEdBQTBCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxRQUFEO1NBQ3RDLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixTQUFBO0lBQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sNkJBQVAsRUFBc0MsU0FBQTtNQUNwQyxFQUFFLENBQUMsTUFBSCxDQUFVLGdCQUFWLEVBQTRCO1FBQUEsSUFBQSxFQUFLLFFBQUw7UUFBZSxhQUFBLEVBQWMsVUFBN0I7UUFDNUIsYUFBQSxFQUFjLGtCQURjO09BQTVCLEVBQ2tDLFNBQUE7UUFDaEMsRUFBRSxDQUFDLElBQUgsQ0FBUSxVQUFSLEVBQW9CLG1CQUFwQjtRQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsV0FBUjtRQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsV0FBUjtlQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsV0FBUjtNQUpnQyxDQURsQzthQU1BLEVBQUUsQ0FBQyxDQUFILENBQUssZUFBTCxFQUFzQjtRQUFBLElBQUEsRUFBSyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQXBCO09BQXRCLEVBQStDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBOUQ7SUFQb0MsQ0FBdEM7V0FRQSxFQUFFLENBQUMsR0FBSCxDQUFPLDJCQUFQLEVBQW9DLFNBQUE7TUFDbEMsRUFBRSxDQUFDLEVBQUgsQ0FBTSw0QkFBTixFQUFvQyxTQUFBO0FBQ2xDLFlBQUE7QUFBQTtBQUFBO2FBQUEsc0NBQUE7O3VCQUNFLEVBQUUsQ0FBQyxFQUFILENBQU07WUFBQSxPQUFBLEVBQVEsTUFBTSxDQUFDLE9BQWY7V0FBTixFQUE4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cmNlc0NvbnRlbnQiOlsidGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cblxueyBuYXZiYXJfY29sbGFwc2VfYnV0dG9uXG4gIGRyb3Bkb3duX3RvZ2dsZSB9ID0gcmVxdWlyZSAnLi9idXR0b25zJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIE5hdkJhciBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuQm9vdHN0cmFwTmF2QmFyVGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgdGMuZGl2ICcuY29udGFpbmVyJywgLT5cbiAgICB0Yy5kaXYgJyNuYXZiYXItYnJhbmQubmF2YmFyLWhlYWRlcicsIC0+XG4gICAgICB0Yy5idXR0b24gJy5uYXZiYXItdG9nZ2xlJywgdHlwZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonY29sbGFwc2UnLFxuICAgICAgJ2RhdGEtdGFyZ2V0JzonLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICAgIHRjLnNwYW4gJy5zci1vbmx5JywgJ1RvZ2dsZSBOYXZpZ2F0aW9uJ1xuICAgICAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgICAgIHRjLnNwYW4gJy5pY29uLWJhcidcbiAgICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6YXBwbW9kZWwuYnJhbmQudXJsLCBhcHBtb2RlbC5icmFuZC5uYW1lXG4gICAgdGMuZGl2ICcubmF2YmFyLWNvbGxhcHNlLmNvbGxhcHNlJywgLT5cbiAgICAgIHRjLnVsICcjYXBwLW5hdmJhci5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgICAgIGZvciBhcHBsZXQgaW4gYXBwbW9kZWwuYXBwbGV0c1xuICAgICAgICAgIHRjLmxpIGFwcG5hbWU6YXBwbGV0LmFwcG5hbWUsIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6YXBwbGV0LnVybCwgYXBwbGV0Lm5hbWVcbiAgICAgIHRjLnVsICcjbWFpbi1tZW51Lm5hdi5uYXZiYXItbmF2Lm5hdmJhci1sZWZ0J1xuICAgICAgdGMudWwgJyN1c2VyLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0J1xuXG4jIEZJWE1FIC0tIG5vIHNlYXJjaCBmb3JtIHdpdGggYWN0aW9uXG5uYXZfcHRfc2VhcmNoID0gdGMucmVuZGVyYWJsZSAoYXBwbW9kZWwpIC0+XG4gIHRjLmZvcm0gJyNmb3JtLXNlYXJjaC5uYXZiYXItZm9ybS5uYXZiYXItcmlnaHQnLCByb2xlOidzZWFyY2gnLFxuICBtZXRob2Q6J3Bvc3QnLCBhY3Rpb246XCIje2FwcG1vZGVsLm5hdmJhclNlYXJjaEFjdGlvbn1cIiwgLT5cbiAgICB0Yy5kaXYgJy5mb3JtLWdyb3VwJywgLT5cbiAgICAgICMgRklYTUUgc2VhcmNoIGlucHV0IHBsYWNlaG9sZGVyIG5lZWRzIHRvIGNvbWUgZnJvbSBzZXJ2ZXJcbiAgICAgIHRjLmlucHV0ICcuZm9ybS1jb250cm9sJywgbmFtZTonc2VhcmNoLXRlcm0nLCB0eXBlOidzZWFyY2gnLFxuICAgICAgcGxhY2Vob2xkZXI6J1NlYXJjaC4uLidcbiAgICB0Yy5idXR0b24gJy5idG4uYnRuLWRlZmF1bHQnLCB0eXBlOidzdWJtaXQnLCBuYW1lOidzZWFyY2gtc3VibWl0JyxcbiAgICB2YWx1ZTonc2VhcmNoJywgc3R5bGU6J2Rpc3BsYXk6IG5vbmU7JywgLT5cbiAgICAgIHRjLnJhdyAnJiM4NTk0J1xuICAgICAgXG5uYXZfcHRfY29udGVudCA9IHRjLnJlbmRlcmFibGUgKGFwcG1vZGVsKSAtPlxuICB0Yy5kaXYgXCIuI3thcHBtb2RlbC5jb250YWluZXIgb3IgJ2NvbnRhaW5lcid9XCIsIC0+XG4gICAgdGMuZGl2ICcubmF2YmFyLWhlYWRlcicsIC0+XG4gICAgICBuYXZiYXJfY29sbGFwc2VfYnV0dG9uICduYXZiYXItdmlldy1jb2xsYXBzZSdcbiAgICAgIHRjLmEgJy5uYXZiYXItYnJhbmQnLCBocmVmOmFwcG1vZGVsLmJyYW5kLnVybCwgYXBwbW9kZWwuYnJhbmQubmFtZVxuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbGxhcHNlLmNvbGxhcHNlLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICB0Yy51bCAnLm5hdi5uYXZiYXItbmF2JywgLT5cbiAgICAgICAgZm9yIGFwcGxldCBpbiBhcHBtb2RlbC5hcHBsZXRzXG4gICAgICAgICAgdGMubGkgYXBwbmFtZTphcHBsZXQuYXBwbmFtZSwgLT5cbiAgICAgICAgICAgIHRjLmEgaHJlZjphcHBsZXQudXJsLCBhcHBsZXQubmFtZVxuICAgICAgdGMudWwgJyN1c2VyLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0J1xuICAgICAgdGMuZGl2ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuXG5uYXZfcHQgPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgI3RjLm5hdiAnI25hdmJhci12aWV3Lm5hdmJhci5uYXZiYXItc3RhdGljLXRvcC5uYXZiYXItaW52ZXJzZScsXG4gIHRjLm5hdiAnI25hdmJhci12aWV3Lm5hdmJhci5uYXZiYXItc3RhdGljLXRvcC5uYXZiYXItZGVmYXVsdCcsXG4gIHhtbG5zOidodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ3htbDpsYW5nJzonZW4nLFxuICByb2xlOiduYXZpZ2F0aW9uJywgLT5cbiAgICBuYXZfcHRfY29udGVudCBhcHBtb2RlbFxuICAgIFxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMgPVxuICBuYXZfcHRfc2VhcmNoOiBuYXZfcHRfc2VhcmNoXG4gIG5hdl9wdDogbmF2X3B0XG4gIEJvb3RzdHJhcE5hdkJhclRlbXBsYXRlOiBCb290c3RyYXBOYXZCYXJUZW1wbGF0ZVxuIl19
