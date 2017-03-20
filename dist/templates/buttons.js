var divbutton, dropdown_toggle, modal_close_button, navbar_collapse_button, spanbutton, tc;

tc = require('teacup');

spanbutton = tc.component(function(selector, attrs, renderContents) {
  return tc.span(selector + ".btn.btn-default.btn-xs", renderContents);
});

divbutton = tc.component(function(selector, attrs, renderContents) {
  return tc.div(selector + ".btn.btn-default.btn-xs", renderContents);
});

modal_close_button = tc.renderable(function(label, icon) {
  if (label == null) {
    label = 'Close';
  }
  if (icon == null) {
    icon = 'close';
  }
  return tc.div('.btn.btn-default.btn-xs', {
    'data-dismiss': 'modal'
  }, function() {
    return tc.h4('.modal-title', function() {
      tc.i(".fa.fa-" + icon);
      return tc.text(label);
    });
  });
});

navbar_collapse_button = tc.renderable(function(target) {
  return tc.button('.navbar-toggle', {
    type: 'button',
    'data-toggle': 'collapse',
    'data-target': "#" + target
  }, function() {
    tc.span('.sr-only', 'Toggle Navigation');
    tc.span('.icon-bar');
    tc.span('.icon-bar');
    return tc.span('.icon-bar');
  });
});

dropdown_toggle = tc.component(function(selector, attrs, renderContents) {
  return tc.a(selector + ".dropdown-toggle", {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2J1dHRvbnMuanMiLCJzb3VyY2VzIjpbInRlbXBsYXRlcy9idXR0b25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFNTCxVQUFBLEdBQWEsRUFBRSxDQUFDLFNBQUgsQ0FBYSxTQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLGNBQWxCO1NBQ3hCLEVBQUUsQ0FBQyxJQUFILENBQVcsUUFBRCxHQUFVLHlCQUFwQixFQUE4QyxjQUE5QztBQUR3QixDQUFiOztBQUdiLFNBQUEsR0FBWSxFQUFFLENBQUMsU0FBSCxDQUFhLFNBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsY0FBbEI7U0FDdkIsRUFBRSxDQUFDLEdBQUgsQ0FBVSxRQUFELEdBQVUseUJBQW5CLEVBQTZDLGNBQTdDO0FBRHVCLENBQWI7O0FBR1osa0JBQUEsR0FBcUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQsRUFBZ0IsSUFBaEI7O0lBQUMsUUFBTTs7O0lBQVMsT0FBSzs7U0FDdEQsRUFBRSxDQUFDLEdBQUgsQ0FBTyx5QkFBUCxFQUFrQztJQUFBLGNBQUEsRUFBZ0IsT0FBaEI7R0FBbEMsRUFBMkQsU0FBQTtXQUN6RCxFQUFFLENBQUMsRUFBSCxDQUFNLGNBQU4sRUFBc0IsU0FBQTtNQUNwQixFQUFFLENBQUMsQ0FBSCxDQUFLLFNBQUEsR0FBVSxJQUFmO2FBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFSO0lBRm9CLENBQXRCO0VBRHlELENBQTNEO0FBRGlDLENBQWQ7O0FBTXJCLHNCQUFBLEdBQTBCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxNQUFEO1NBQ3RDLEVBQUUsQ0FBQyxNQUFILENBQVUsZ0JBQVYsRUFBNEI7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLGFBQUEsRUFBYyxVQUE3QjtJQUM1QixhQUFBLEVBQWUsR0FBQSxHQUFJLE1BRFM7R0FBNUIsRUFDNkIsU0FBQTtJQUN6QixFQUFFLENBQUMsSUFBSCxDQUFRLFVBQVIsRUFBb0IsbUJBQXBCO0lBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxXQUFSO0lBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxXQUFSO1dBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxXQUFSO0VBSnlCLENBRDdCO0FBRHNDLENBQWQ7O0FBUTFCLGVBQUEsR0FBa0IsRUFBRSxDQUFDLFNBQUgsQ0FBYSxTQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLGNBQWxCO1NBQzdCLEVBQUUsQ0FBQyxDQUFILENBQVEsUUFBRCxHQUFVLGtCQUFqQixFQUFvQztJQUFBLElBQUEsRUFBSyxLQUFLLENBQUMsSUFBWDtJQUNwQyxhQUFBLEVBQWMsVUFEc0I7R0FBcEMsRUFDMEIsY0FEMUI7QUFENkIsQ0FBYjs7QUFJbEIsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLFVBQUEsRUFBWSxVQUFaO0VBQ0EsU0FBQSxFQUFXLFNBRFg7RUFFQSxrQkFBQSxFQUFvQixrQkFGcEI7RUFHQSxzQkFBQSxFQUF3QixzQkFIeEI7RUFJQSxlQUFBLEVBQWlCLGVBSmpCIiwic291cmNlc0NvbnRlbnQiOlsidGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBCdXR0b24gVGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5zcGFuYnV0dG9uID0gdGMuY29tcG9uZW50IChzZWxlY3RvciwgYXR0cnMsIHJlbmRlckNvbnRlbnRzKSAtPlxuICB0Yy5zcGFuIFwiI3tzZWxlY3Rvcn0uYnRuLmJ0bi1kZWZhdWx0LmJ0bi14c1wiLCByZW5kZXJDb250ZW50c1xuXG5kaXZidXR0b24gPSB0Yy5jb21wb25lbnQgKHNlbGVjdG9yLCBhdHRycywgcmVuZGVyQ29udGVudHMpIC0+XG4gIHRjLmRpdiBcIiN7c2VsZWN0b3J9LmJ0bi5idG4tZGVmYXVsdC5idG4teHNcIiwgcmVuZGVyQ29udGVudHNcblxubW9kYWxfY2xvc2VfYnV0dG9uID0gdGMucmVuZGVyYWJsZSAobGFiZWw9J0Nsb3NlJywgaWNvbj0nY2xvc2UnKS0+XG4gIHRjLmRpdiAnLmJ0bi5idG4tZGVmYXVsdC5idG4teHMnLCAnZGF0YS1kaXNtaXNzJzogJ21vZGFsJywgLT5cbiAgICB0Yy5oNCAnLm1vZGFsLXRpdGxlJywgLT5cbiAgICAgIHRjLmkgXCIuZmEuZmEtI3tpY29ufVwiXG4gICAgICB0Yy50ZXh0IGxhYmVsXG5cbm5hdmJhcl9jb2xsYXBzZV9idXR0b24gID0gdGMucmVuZGVyYWJsZSAodGFyZ2V0KSAtPlxuICB0Yy5idXR0b24gJy5uYXZiYXItdG9nZ2xlJywgdHlwZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonY29sbGFwc2UnLFxuICAnZGF0YS10YXJnZXQnOiBcIiMje3RhcmdldH1cIiwgLT5cbiAgICAgIHRjLnNwYW4gJy5zci1vbmx5JywgJ1RvZ2dsZSBOYXZpZ2F0aW9uJ1xuICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuXG5kcm9wZG93bl90b2dnbGUgPSB0Yy5jb21wb25lbnQgKHNlbGVjdG9yLCBhdHRycywgcmVuZGVyQ29udGVudHMpIC0+XG4gIHRjLmEgXCIje3NlbGVjdG9yfS5kcm9wZG93bi10b2dnbGVcIiwgaHJlZjphdHRycy5ocmVmLFxuICAnZGF0YS10b2dnbGUnOidkcm9wZG93bicsIHJlbmRlckNvbnRlbnRzXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgc3BhbmJ1dHRvbjogc3BhbmJ1dHRvblxuICBkaXZidXR0b246IGRpdmJ1dHRvblxuICBtb2RhbF9jbG9zZV9idXR0b246IG1vZGFsX2Nsb3NlX2J1dHRvblxuICBuYXZiYXJfY29sbGFwc2VfYnV0dG9uOiBuYXZiYXJfY29sbGFwc2VfYnV0dG9uXG4gIGRyb3Bkb3duX3RvZ2dsZTogZHJvcGRvd25fdG9nZ2xlXG4iXX0=
