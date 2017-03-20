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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL25hdmJhci5qcyIsInNvdXJjZXMiOlsidGVtcGxhdGVzL25hdmJhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBR0wsTUFDc0IsT0FBQSxDQUFRLFdBQVIsQ0FEdEIsRUFBRSxtREFBRixFQUNFOztBQU1GLHVCQUFBLEdBQTBCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxRQUFEO1NBQ3RDLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixTQUFBO0lBQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sNkJBQVAsRUFBc0MsU0FBQTtNQUNwQyxFQUFFLENBQUMsTUFBSCxDQUFVLGdCQUFWLEVBQTRCO1FBQUEsSUFBQSxFQUFLLFFBQUw7UUFBZSxhQUFBLEVBQWMsVUFBN0I7UUFDNUIsYUFBQSxFQUFjLGtCQURjO09BQTVCLEVBQ2tDLFNBQUE7UUFDaEMsRUFBRSxDQUFDLElBQUgsQ0FBUSxVQUFSLEVBQW9CLG1CQUFwQjtRQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsV0FBUjtRQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsV0FBUjtlQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsV0FBUjtNQUpnQyxDQURsQzthQU1BLEVBQUUsQ0FBQyxDQUFILENBQUssZUFBTCxFQUFzQjtRQUFBLElBQUEsRUFBSyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQXBCO09BQXRCLEVBQStDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBOUQ7SUFQb0MsQ0FBdEM7V0FRQSxFQUFFLENBQUMsR0FBSCxDQUFPLDJCQUFQLEVBQW9DLFNBQUE7TUFDbEMsRUFBRSxDQUFDLEVBQUgsQ0FBTSw0QkFBTixFQUFvQyxTQUFBO0FBQ2xDLFlBQUE7QUFBQTtBQUFBO2FBQUEsc0NBQUE7O3VCQUNFLEVBQUUsQ0FBQyxFQUFILENBQU07WUFBQSxPQUFBLEVBQVEsTUFBTSxDQUFDLE9BQWY7V0FBTixFQUE4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cmNlc0NvbnRlbnQiOlsidGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cblxueyBuYXZiYXJfY29sbGFwc2VfYnV0dG9uXG4gIGRyb3Bkb3duX3RvZ2dsZSB9ID0gcmVxdWlyZSAnLi9idXR0b25zJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIE5hdkJhciBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuQm9vdHN0cmFwTmF2QmFyVGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgdGMuZGl2ICcuY29udGFpbmVyJywgLT5cbiAgICB0Yy5kaXYgJyNuYXZiYXItYnJhbmQubmF2YmFyLWhlYWRlcicsIC0+XG4gICAgICB0Yy5idXR0b24gJy5uYXZiYXItdG9nZ2xlJywgdHlwZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonY29sbGFwc2UnLFxuICAgICAgJ2RhdGEtdGFyZ2V0JzonLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICAgIHRjLnNwYW4gJy5zci1vbmx5JywgJ1RvZ2dsZSBOYXZpZ2F0aW9uJ1xuICAgICAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgICAgIHRjLnNwYW4gJy5pY29uLWJhcidcbiAgICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6YXBwbW9kZWwuYnJhbmQudXJsLCBhcHBtb2RlbC5icmFuZC5uYW1lXG4gICAgdGMuZGl2ICcubmF2YmFyLWNvbGxhcHNlLmNvbGxhcHNlJywgLT5cbiAgICAgIHRjLnVsICcjYXBwLW5hdmJhci5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgICAgIGZvciBhcHBsZXQgaW4gYXBwbW9kZWwuYXBwbGV0c1xuICAgICAgICAgIHRjLmxpIGFwcG5hbWU6YXBwbGV0LmFwcG5hbWUsIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6YXBwbGV0LnVybCwgYXBwbGV0Lm5hbWVcbiAgICAgIHRjLnVsICcjbWFpbi1tZW51Lm5hdi5uYXZiYXItbmF2Lm5hdmJhci1sZWZ0J1xuICAgICAgdGMudWwgJyN1c2VyLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0J1xuXG4jIEZJWE1FIC0tIG5vIHNlYXJjaCBmb3JtIHdpdGggYWN0aW9uIFxubmF2X3B0X3NlYXJjaCA9IHRjLnJlbmRlcmFibGUgKGFwcG1vZGVsKSAtPlxuICB0Yy5mb3JtICcjZm9ybS1zZWFyY2gubmF2YmFyLWZvcm0ubmF2YmFyLXJpZ2h0Jywgcm9sZTonc2VhcmNoJyxcbiAgbWV0aG9kOidwb3N0JywgYWN0aW9uOlwiI3thcHBtb2RlbC5uYXZiYXJTZWFyY2hBY3Rpb259XCIsIC0+XG4gICAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgICAjIEZJWE1FIHNlYXJjaCBpbnB1dCBwbGFjZWhvbGRlciBuZWVkcyB0byBjb21lIGZyb20gc2VydmVyXG4gICAgICB0Yy5pbnB1dCAnLmZvcm0tY29udHJvbCcsIG5hbWU6J3NlYXJjaC10ZXJtJywgdHlwZTonc2VhcmNoJyxcbiAgICAgIHBsYWNlaG9sZGVyOidTZWFyY2guLi4nXG4gICAgdGMuYnV0dG9uICcuYnRuLmJ0bi1kZWZhdWx0JywgdHlwZTonc3VibWl0JywgbmFtZTonc2VhcmNoLXN1Ym1pdCcsXG4gICAgdmFsdWU6J3NlYXJjaCcsIHN0eWxlOidkaXNwbGF5OiBub25lOycsIC0+XG4gICAgICB0Yy5yYXcgJyYjODU5NCdcbiAgICAgIFxubmF2X3B0X2NvbnRlbnQgPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgdGMuZGl2IFwiLiN7YXBwbW9kZWwuY29udGFpbmVyIG9yICdjb250YWluZXInfVwiLCAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInLCAtPlxuICAgICAgbmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAnbmF2YmFyLXZpZXctY29sbGFwc2UnXG4gICAgICB0Yy5hICcubmF2YmFyLWJyYW5kJywgaHJlZjphcHBtb2RlbC5icmFuZC51cmwsIGFwcG1vZGVsLmJyYW5kLm5hbWVcbiAgICB0Yy5kaXYgJyNuYXZiYXItdmlldy1jb2xsYXBzZS5jb2xsYXBzZS5uYXZiYXItY29sbGFwc2UnLCAtPlxuICAgICAgdGMudWwgJy5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgICAgIGZvciBhcHBsZXQgaW4gYXBwbW9kZWwuYXBwbGV0c1xuICAgICAgICAgIHRjLmxpIGFwcG5hbWU6YXBwbGV0LmFwcG5hbWUsIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6YXBwbGV0LnVybCwgYXBwbGV0Lm5hbWVcbiAgICAgIHRjLnVsICcjdXNlci1tZW51Lm5hdi5uYXZiYXItbmF2Lm5hdmJhci1yaWdodCdcbiAgICAgIHRjLmRpdiAnI2Zvcm0tc2VhcmNoLWNvbnRhaW5lcidcblxubmF2X3B0ID0gdGMucmVuZGVyYWJsZSAoYXBwbW9kZWwpIC0+XG4gICN0Yy5uYXYgJyNuYXZiYXItdmlldy5uYXZiYXIubmF2YmFyLXN0YXRpYy10b3AubmF2YmFyLWludmVyc2UnLFxuICB0Yy5uYXYgJyNuYXZiYXItdmlldy5uYXZiYXIubmF2YmFyLXN0YXRpYy10b3AubmF2YmFyLWRlZmF1bHQnLFxuICB4bWxuczonaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICd4bWw6bGFuZyc6J2VuJyxcbiAgcm9sZTonbmF2aWdhdGlvbicsIC0+XG4gICAgbmF2X3B0X2NvbnRlbnQgYXBwbW9kZWxcbiAgICBcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzID1cbiAgbmF2X3B0X3NlYXJjaDogbmF2X3B0X3NlYXJjaFxuICBuYXZfcHQ6IG5hdl9wdFxuICBCb290c3RyYXBOYXZCYXJUZW1wbGF0ZTogQm9vdHN0cmFwTmF2QmFyVGVtcGxhdGVcbiJdfQ==
