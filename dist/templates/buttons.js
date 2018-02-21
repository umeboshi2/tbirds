var divbutton, dropdown_toggle, modal_close_button, navbar_collapse_button, spanbutton, tc;

tc = require('teacup');

//#######################################
// Button Templates
//#######################################
spanbutton = tc.component(function(selector, attrs, renderContents) {
  return tc.span(`${selector}.btn.btn-default.btn-xs`, renderContents);
});

divbutton = tc.component(function(selector, attrs, renderContents) {
  return tc.div(`${selector}.btn.btn-default.btn-xs`, renderContents);
});

modal_close_button = tc.renderable(function(label = 'Close', icon = 'close') {
  return tc.div('.btn.btn-default.btn-xs', {
    'data-dismiss': 'modal'
  }, function() {
    return tc.h4('.modal-title', function() {
      tc.i(`.fa.fa-${icon}`);
      return tc.text(label);
    });
  });
});

navbar_collapse_button = tc.renderable(function(target) {
  return tc.button('.navbar-toggle', {
    type: 'button',
    'data-toggle': 'collapse',
    'data-target': `#${target}`
  }, function() {
    tc.span('.sr-only', 'Toggle Navigation');
    tc.span('.icon-bar');
    tc.span('.icon-bar');
    return tc.span('.icon-bar');
  });
});

dropdown_toggle = tc.component(function(selector, attrs, renderContents) {
  return tc.a(`${selector}.dropdown-toggle`, {
    href: attrs.href,
    'data-toggle': 'dropdown'
  }, renderContents);
});

module.exports = {
  spanbutton: spanbutton,
  divbutton: divbutton,
  modal_close_button: modal_close_button,
  navbar_collapse_button: navbar_collapse_button,
  dropdown_toggle: dropdown_toggle
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2J1dHRvbnMuanMiLCJzb3VyY2VzIjpbInRlbXBsYXRlcy9idXR0b25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFNBQUEsRUFBQSxlQUFBLEVBQUEsa0JBQUEsRUFBQSxzQkFBQSxFQUFBLFVBQUEsRUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVIsRUFBTDs7Ozs7QUFNQSxVQUFBLEdBQWEsRUFBRSxDQUFDLFNBQUgsQ0FBYSxRQUFBLENBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsY0FBbEIsQ0FBQTtTQUN4QixFQUFFLENBQUMsSUFBSCxDQUFRLENBQUEsQ0FBQSxDQUFHLFFBQUgsQ0FBWSx1QkFBWixDQUFSLEVBQThDLGNBQTlDO0FBRHdCLENBQWI7O0FBR2IsU0FBQSxHQUFZLEVBQUUsQ0FBQyxTQUFILENBQWEsUUFBQSxDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLGNBQWxCLENBQUE7U0FDdkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFBLENBQUEsQ0FBRyxRQUFILENBQVksdUJBQVosQ0FBUCxFQUE2QyxjQUE3QztBQUR1QixDQUFiOztBQUdaLGtCQUFBLEdBQXFCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLFFBQU0sT0FBUCxFQUFnQixPQUFLLE9BQXJCLENBQUE7U0FDakMsRUFBRSxDQUFDLEdBQUgsQ0FBTyx5QkFBUCxFQUFrQztJQUFBLGNBQUEsRUFBZ0I7RUFBaEIsQ0FBbEMsRUFBMkQsUUFBQSxDQUFBLENBQUE7V0FDekQsRUFBRSxDQUFDLEVBQUgsQ0FBTSxjQUFOLEVBQXNCLFFBQUEsQ0FBQSxDQUFBO01BQ3BCLEVBQUUsQ0FBQyxDQUFILENBQUssQ0FBQSxPQUFBLENBQUEsQ0FBVSxJQUFWLENBQUEsQ0FBTDthQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBUjtJQUZvQixDQUF0QjtFQUR5RCxDQUEzRDtBQURpQyxDQUFkOztBQU1yQixzQkFBQSxHQUEwQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxNQUFELENBQUE7U0FDdEMsRUFBRSxDQUFDLE1BQUgsQ0FBVSxnQkFBVixFQUE0QjtJQUFBLElBQUEsRUFBSyxRQUFMO0lBQWUsYUFBQSxFQUFjLFVBQTdCO0lBQzVCLGFBQUEsRUFBZSxDQUFBLENBQUEsQ0FBQSxDQUFJLE1BQUosQ0FBQTtFQURhLENBQTVCLEVBQzZCLFFBQUEsQ0FBQSxDQUFBO0lBQzNCLEVBQUUsQ0FBQyxJQUFILENBQVEsVUFBUixFQUFvQixtQkFBcEI7SUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7SUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7V0FDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7RUFKMkIsQ0FEN0I7QUFEc0MsQ0FBZDs7QUFRMUIsZUFBQSxHQUFrQixFQUFFLENBQUMsU0FBSCxDQUFhLFFBQUEsQ0FBQyxRQUFELEVBQVcsS0FBWCxFQUFrQixjQUFsQixDQUFBO1NBQzdCLEVBQUUsQ0FBQyxDQUFILENBQUssQ0FBQSxDQUFBLENBQUcsUUFBSCxDQUFZLGdCQUFaLENBQUwsRUFBb0M7SUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDLElBQVg7SUFDcEMsYUFBQSxFQUFjO0VBRHNCLENBQXBDLEVBQzBCLGNBRDFCO0FBRDZCLENBQWI7O0FBSWxCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxVQUFBLEVBQVksVUFBWjtFQUNBLFNBQUEsRUFBVyxTQURYO0VBRUEsa0JBQUEsRUFBb0Isa0JBRnBCO0VBR0Esc0JBQUEsRUFBd0Isc0JBSHhCO0VBSUEsZUFBQSxFQUFpQjtBQUpqQiIsInNvdXJjZXNDb250ZW50IjpbInRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQnV0dG9uIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuc3BhbmJ1dHRvbiA9IHRjLmNvbXBvbmVudCAoc2VsZWN0b3IsIGF0dHJzLCByZW5kZXJDb250ZW50cykgLT5cbiAgdGMuc3BhbiBcIiN7c2VsZWN0b3J9LmJ0bi5idG4tZGVmYXVsdC5idG4teHNcIiwgcmVuZGVyQ29udGVudHNcblxuZGl2YnV0dG9uID0gdGMuY29tcG9uZW50IChzZWxlY3RvciwgYXR0cnMsIHJlbmRlckNvbnRlbnRzKSAtPlxuICB0Yy5kaXYgXCIje3NlbGVjdG9yfS5idG4uYnRuLWRlZmF1bHQuYnRuLXhzXCIsIHJlbmRlckNvbnRlbnRzXG5cbm1vZGFsX2Nsb3NlX2J1dHRvbiA9IHRjLnJlbmRlcmFibGUgKGxhYmVsPSdDbG9zZScsIGljb249J2Nsb3NlJyktPlxuICB0Yy5kaXYgJy5idG4uYnRuLWRlZmF1bHQuYnRuLXhzJywgJ2RhdGEtZGlzbWlzcyc6ICdtb2RhbCcsIC0+XG4gICAgdGMuaDQgJy5tb2RhbC10aXRsZScsIC0+XG4gICAgICB0Yy5pIFwiLmZhLmZhLSN7aWNvbn1cIlxuICAgICAgdGMudGV4dCBsYWJlbFxuXG5uYXZiYXJfY29sbGFwc2VfYnV0dG9uICA9IHRjLnJlbmRlcmFibGUgKHRhcmdldCkgLT5cbiAgdGMuYnV0dG9uICcubmF2YmFyLXRvZ2dsZScsIHR5cGU6J2J1dHRvbicsICdkYXRhLXRvZ2dsZSc6J2NvbGxhcHNlJyxcbiAgJ2RhdGEtdGFyZ2V0JzogXCIjI3t0YXJnZXR9XCIsIC0+XG4gICAgdGMuc3BhbiAnLnNyLW9ubHknLCAnVG9nZ2xlIE5hdmlnYXRpb24nXG4gICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgIHRjLnNwYW4gJy5pY29uLWJhcidcbiAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG5cbmRyb3Bkb3duX3RvZ2dsZSA9IHRjLmNvbXBvbmVudCAoc2VsZWN0b3IsIGF0dHJzLCByZW5kZXJDb250ZW50cykgLT5cbiAgdGMuYSBcIiN7c2VsZWN0b3J9LmRyb3Bkb3duLXRvZ2dsZVwiLCBocmVmOmF0dHJzLmhyZWYsXG4gICdkYXRhLXRvZ2dsZSc6J2Ryb3Bkb3duJywgcmVuZGVyQ29udGVudHNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBzcGFuYnV0dG9uOiBzcGFuYnV0dG9uXG4gIGRpdmJ1dHRvbjogZGl2YnV0dG9uXG4gIG1vZGFsX2Nsb3NlX2J1dHRvbjogbW9kYWxfY2xvc2VfYnV0dG9uXG4gIG5hdmJhcl9jb2xsYXBzZV9idXR0b246IG5hdmJhcl9jb2xsYXBzZV9idXR0b25cbiAgZHJvcGRvd25fdG9nZ2xlOiBkcm9wZG93bl90b2dnbGVcbiJdfQ==
