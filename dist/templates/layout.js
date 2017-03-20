var BootstrapLayoutTemplate, BootstrapNoGridLayoutTemplate, MainContentTemplate, MainFluidLayoutTemplate, MainLayoutTemplate, _MainLayoutTemplate, make_sidebar_template, tc;

tc = require('teacup');

BootstrapLayoutTemplate = tc.renderable(function() {
  tc.div('#main-navbar.navbar.navbar-default.navbar-fixed-top', {
    role: 'navigation'
  });
  tc.div('.container-fluid', function() {
    return tc.div('.row', function() {
      tc.div('#sidebar.col-sm-2');
      return tc.div('#main-content.col-sm-9');
    });
  });
  tc.div('#footer');
  return tc.div('#modal');
});

BootstrapNoGridLayoutTemplate = tc.renderable(function() {
  tc.div('#main-navbar.navbar.navbar-default.navbar-fixed-top', {
    role: 'navigation'
  });
  tc.div('.main-layout', function() {
    tc.div('#sidebar');
    return tc.div('#main-content');
  });
  tc.div('#footer');
  return tc.div('#modal');
});

_MainLayoutTemplate = tc.renderable(function(container) {
  tc.div('#navbar-view-container');
  tc.div("." + container, function() {
    tc.div('.row', function() {
      return tc.div('.col-md-10', function() {
        return tc.div('#messages');
      });
    });
    return tc.div('#applet-content.row');
  });
  tc.div('#footer');
  return tc.div('#modal');
});

MainLayoutTemplate = function() {
  return _MainLayoutTemplate('container');
};

MainFluidLayoutTemplate = function() {
  return _MainLayoutTemplate('container-fluid');
};

MainContentTemplate = tc.renderable(function(doc) {
  var atts;
  atts = doc.data.attributes;
  return tc.article('.document-view.content', function() {
    tc.h1(atts.title);
    tc.p('.lead', atts.description);
    return tc.div('.body', function() {
      return tc.raw(atts.body);
    });
  });
});

make_sidebar_template = function(columns, size, position) {
  if (columns == null) {
    columns = 3;
  }
  if (size == null) {
    size = 'sm';
  }
  if (position == null) {
    position = 'left';
  }
  return tc.renderable(function() {
    if (position === 'left') {
      tc.div("#sidebar.col-" + size + "-" + columns + ".left-column");
    }
    tc.div("#main-content.col-" + size + "-" + (12 - columns));
    if (position === 'right') {
      return tc.div("#sidebar.col-" + size + "-" + columns + ".right-column");
    }
  });
};

module.exports = {
  BootstrapLayoutTemplate: BootstrapLayoutTemplate,
  BootstrapNoGridLayoutTemplate: BootstrapNoGridLayoutTemplate,
  MainLayoutTemplate: MainLayoutTemplate,
  MainFluidLayoutTemplate: MainFluidLayoutTemplate,
  MainContentTemplate: MainContentTemplate,
  make_sidebar_template: make_sidebar_template
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2xheW91dC5qcyIsInNvdXJjZXMiOlsidGVtcGxhdGVzL2xheW91dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBTUwsdUJBQUEsR0FBMEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO0VBQ3RDLEVBQUUsQ0FBQyxHQUFILENBQU8scURBQVAsRUFDQTtJQUFBLElBQUEsRUFBSyxZQUFMO0dBREE7RUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQLEVBQTJCLFNBQUE7V0FDekIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQLEVBQWUsU0FBQTtNQUNiLEVBQUUsQ0FBQyxHQUFILENBQU8sbUJBQVA7YUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBRmEsQ0FBZjtFQUR5QixDQUEzQjtFQUlBLEVBQUUsQ0FBQyxHQUFILENBQU8sU0FBUDtTQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sUUFBUDtBQVJzQyxDQUFkOztBQVUxQiw2QkFBQSxHQUFnQyxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUE7RUFDNUMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxREFBUCxFQUNBO0lBQUEsSUFBQSxFQUFLLFlBQUw7R0FEQTtFQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sY0FBUCxFQUF1QixTQUFBO0lBQ3JCLEVBQUUsQ0FBQyxHQUFILENBQU8sVUFBUDtXQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUDtFQUZxQixDQUF2QjtFQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sU0FBUDtTQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sUUFBUDtBQVI0QyxDQUFkOztBQVVoQyxtQkFBQSxHQUFzQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsU0FBRDtFQUNsQyxFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0VBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxHQUFBLEdBQUksU0FBWCxFQUF3QixTQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFNBQUE7YUFDYixFQUFFLENBQUMsR0FBSCxDQUFPLFlBQVAsRUFBcUIsU0FBQTtlQUNuQixFQUFFLENBQUMsR0FBSCxDQUFPLFdBQVA7TUFEbUIsQ0FBckI7SUFEYSxDQUFmO1dBR0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxQkFBUDtFQUpzQixDQUF4QjtFQUtBLEVBQUUsQ0FBQyxHQUFILENBQU8sU0FBUDtTQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sUUFBUDtBQVRrQyxDQUFkOztBQVd0QixrQkFBQSxHQUFxQixTQUFBO1NBQ25CLG1CQUFBLENBQW9CLFdBQXBCO0FBRG1COztBQUdyQix1QkFBQSxHQUEwQixTQUFBO1NBQ3hCLG1CQUFBLENBQW9CLGlCQUFwQjtBQUR3Qjs7QUFJMUIsbUJBQUEsR0FBc0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEdBQUQ7QUFDbEMsTUFBQTtFQUFBLElBQUEsR0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2hCLEVBQUUsQ0FBQyxPQUFILENBQVcsd0JBQVgsRUFBcUMsU0FBQTtJQUNuQyxFQUFFLENBQUMsRUFBSCxDQUFNLElBQUksQ0FBQyxLQUFYO0lBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxPQUFMLEVBQWMsSUFBSSxDQUFDLFdBQW5CO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxPQUFQLEVBQWdCLFNBQUE7YUFDZCxFQUFFLENBQUMsR0FBSCxDQUFPLElBQUksQ0FBQyxJQUFaO0lBRGMsQ0FBaEI7RUFIbUMsQ0FBckM7QUFGa0MsQ0FBZDs7QUFRdEIscUJBQUEsR0FBd0IsU0FBQyxPQUFELEVBQVksSUFBWixFQUF1QixRQUF2Qjs7SUFBQyxVQUFROzs7SUFBRyxPQUFLOzs7SUFBTSxXQUFTOztTQUN0RCxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUE7SUFDWixJQUFHLFFBQUEsS0FBWSxNQUFmO01BQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFBLEdBQWdCLElBQWhCLEdBQXFCLEdBQXJCLEdBQXdCLE9BQXhCLEdBQWdDLGNBQXZDLEVBREY7O0lBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQkFBQSxHQUFxQixJQUFyQixHQUEwQixHQUExQixHQUE0QixDQUFDLEVBQUEsR0FBSyxPQUFOLENBQW5DO0lBQ0EsSUFBRyxRQUFBLEtBQVksT0FBZjthQUNFLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBQSxHQUFnQixJQUFoQixHQUFxQixHQUFyQixHQUF3QixPQUF4QixHQUFnQyxlQUF2QyxFQURGOztFQUpZLENBQWQ7QUFEc0I7O0FBU3hCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSx1QkFBQSxFQUF5Qix1QkFBekI7RUFDQSw2QkFBQSxFQUErQiw2QkFEL0I7RUFFQSxrQkFBQSxFQUFvQixrQkFGcEI7RUFHQSx1QkFBQSxFQUF5Qix1QkFIekI7RUFJQSxtQkFBQSxFQUFxQixtQkFKckI7RUFLQSxxQkFBQSxFQUF1QixxQkFMdkIiLCJzb3VyY2VzQ29udGVudCI6WyJ0YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIExheW91dCBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbkJvb3RzdHJhcExheW91dFRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAoKSAtPlxuICB0Yy5kaXYgJyNtYWluLW5hdmJhci5uYXZiYXIubmF2YmFyLWRlZmF1bHQubmF2YmFyLWZpeGVkLXRvcCcsXG4gIHJvbGU6J25hdmlnYXRpb24nXG4gIHRjLmRpdiAnLmNvbnRhaW5lci1mbHVpZCcsIC0+XG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgIHRjLmRpdiAnI3NpZGViYXIuY29sLXNtLTInXG4gICAgICB0Yy5kaXYgJyNtYWluLWNvbnRlbnQuY29sLXNtLTknXG4gIHRjLmRpdiAnI2Zvb3RlcidcbiAgdGMuZGl2ICcjbW9kYWwnXG5cbkJvb3RzdHJhcE5vR3JpZExheW91dFRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAoKSAtPlxuICB0Yy5kaXYgJyNtYWluLW5hdmJhci5uYXZiYXIubmF2YmFyLWRlZmF1bHQubmF2YmFyLWZpeGVkLXRvcCcsXG4gIHJvbGU6J25hdmlnYXRpb24nXG4gICNkaXYgJyNoZWFkZXIubGlzdHZpZXctaGVhZGVyJ1xuICB0Yy5kaXYgJy5tYWluLWxheW91dCcsIC0+XG4gICAgdGMuZGl2ICcjc2lkZWJhcidcbiAgICB0Yy5kaXYgJyNtYWluLWNvbnRlbnQnXG4gIHRjLmRpdiAnI2Zvb3RlcidcbiAgdGMuZGl2ICcjbW9kYWwnXG5cbl9NYWluTGF5b3V0VGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChjb250YWluZXIpIC0+XG4gIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgI3RjLmRpdiAnI2VkaXRvci1iYXItY29udGFpbmVyJ1xuICB0Yy5kaXYgXCIuI3tjb250YWluZXJ9XCIsIC0+XG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgIHRjLmRpdiAnLmNvbC1tZC0xMCcsIC0+XG4gICAgICAgIHRjLmRpdiAnI21lc3NhZ2VzJ1xuICAgIHRjLmRpdiAnI2FwcGxldC1jb250ZW50LnJvdydcbiAgdGMuZGl2ICcjZm9vdGVyJ1xuICB0Yy5kaXYgJyNtb2RhbCdcblxuTWFpbkxheW91dFRlbXBsYXRlID0gLT5cbiAgX01haW5MYXlvdXRUZW1wbGF0ZSAnY29udGFpbmVyJ1xuXG5NYWluRmx1aWRMYXlvdXRUZW1wbGF0ZSA9IC0+XG4gIF9NYWluTGF5b3V0VGVtcGxhdGUgJ2NvbnRhaW5lci1mbHVpZCdcbiAgXG5cbk1haW5Db250ZW50VGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChkb2MpIC0+XG4gIGF0dHMgPSBkb2MuZGF0YS5hdHRyaWJ1dGVzXG4gIHRjLmFydGljbGUgJy5kb2N1bWVudC12aWV3LmNvbnRlbnQnLCAtPlxuICAgIHRjLmgxIGF0dHMudGl0bGVcbiAgICB0Yy5wICcubGVhZCcsIGF0dHMuZGVzY3JpcHRpb25cbiAgICB0Yy5kaXYgJy5ib2R5JywgLT5cbiAgICAgIHRjLnJhdyBhdHRzLmJvZHlcbiAgICAgIFxubWFrZV9zaWRlYmFyX3RlbXBsYXRlID0gKGNvbHVtbnM9Mywgc2l6ZT0nc20nLCBwb3NpdGlvbj0nbGVmdCcpIC0+XG4gIHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICBpZiBwb3NpdGlvbiBpcyAnbGVmdCdcbiAgICAgIHRjLmRpdiBcIiNzaWRlYmFyLmNvbC0je3NpemV9LSN7Y29sdW1uc30ubGVmdC1jb2x1bW5cIlxuICAgIHRjLmRpdiBcIiNtYWluLWNvbnRlbnQuY29sLSN7c2l6ZX0tI3sxMiAtIGNvbHVtbnN9XCJcbiAgICBpZiBwb3NpdGlvbiBpcyAncmlnaHQnXG4gICAgICB0Yy5kaXYgXCIjc2lkZWJhci5jb2wtI3tzaXplfS0je2NvbHVtbnN9LnJpZ2h0LWNvbHVtblwiXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzID1cbiAgQm9vdHN0cmFwTGF5b3V0VGVtcGxhdGU6IEJvb3RzdHJhcExheW91dFRlbXBsYXRlXG4gIEJvb3RzdHJhcE5vR3JpZExheW91dFRlbXBsYXRlOiBCb290c3RyYXBOb0dyaWRMYXlvdXRUZW1wbGF0ZVxuICBNYWluTGF5b3V0VGVtcGxhdGU6IE1haW5MYXlvdXRUZW1wbGF0ZVxuICBNYWluRmx1aWRMYXlvdXRUZW1wbGF0ZTogTWFpbkZsdWlkTGF5b3V0VGVtcGxhdGVcbiAgTWFpbkNvbnRlbnRUZW1wbGF0ZTogTWFpbkNvbnRlbnRUZW1wbGF0ZVxuICBtYWtlX3NpZGViYXJfdGVtcGxhdGU6IG1ha2Vfc2lkZWJhcl90ZW1wbGF0ZVxuIl19
