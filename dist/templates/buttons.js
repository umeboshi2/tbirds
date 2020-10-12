var divbutton, dropdown_toggle, modal_close_button, navbar_collapse_button, spanbutton;

import tc from 'teacup';

//#######################################
// Button Templates
//#######################################
spanbutton = tc.component(function(selector, attrs, renderContents) {
  return tc.span(`${selector}.btn.btn-secondary.btn-sm`, renderContents);
});

divbutton = tc.component(function(selector, attrs, renderContents) {
  return tc.div(`${selector}.btn.btn-secondary.btn-sm`, renderContents);
});

modal_close_button = tc.renderable(function(label = 'Close', icon = 'close') {
  return tc.div('.btn.btn-secondary.btn-sm', {
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

export {
  spanbutton,
  divbutton,
  modal_close_button,
  navbar_collapse_button,
  dropdown_toggle
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2J1dHRvbnMuanMiLCJzb3VyY2VzIjpbInRlbXBsYXRlcy9idXR0b25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFNBQUEsRUFBQSxlQUFBLEVBQUEsa0JBQUEsRUFBQSxzQkFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBLFNBQUE7Ozs7O0FBTUEsVUFBQSxHQUFhLEVBQUUsQ0FBQyxTQUFILENBQWEsUUFBQSxDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLGNBQWxCLENBQUE7U0FDeEIsRUFBRSxDQUFDLElBQUgsQ0FBUSxDQUFBLENBQUEsQ0FBRyxRQUFILENBQUEseUJBQUEsQ0FBUixFQUFnRCxjQUFoRDtBQUR3QixDQUFiOztBQUdiLFNBQUEsR0FBWSxFQUFFLENBQUMsU0FBSCxDQUFhLFFBQUEsQ0FBQyxRQUFELEVBQVcsS0FBWCxFQUFrQixjQUFsQixDQUFBO1NBQ3ZCLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxDQUFBLENBQUcsUUFBSCxDQUFBLHlCQUFBLENBQVAsRUFBK0MsY0FBL0M7QUFEdUIsQ0FBYjs7QUFHWixrQkFBQSxHQUFxQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxRQUFNLE9BQVAsRUFBZ0IsT0FBSyxPQUFyQixDQUFBO1NBQ2pDLEVBQUUsQ0FBQyxHQUFILENBQU8sMkJBQVAsRUFBb0M7SUFBQSxjQUFBLEVBQWdCO0VBQWhCLENBQXBDLEVBQTZELFFBQUEsQ0FBQSxDQUFBO1dBQzNELEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixRQUFBLENBQUEsQ0FBQTtNQUNwQixFQUFFLENBQUMsQ0FBSCxDQUFLLENBQUEsT0FBQSxDQUFBLENBQVUsSUFBVixDQUFBLENBQUw7YUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQVI7SUFGb0IsQ0FBdEI7RUFEMkQsQ0FBN0Q7QUFEaUMsQ0FBZDs7QUFNckIsc0JBQUEsR0FBMEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsTUFBRCxDQUFBO1NBQ3RDLEVBQUUsQ0FBQyxNQUFILENBQVUsZ0JBQVYsRUFBNEI7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLGFBQUEsRUFBYyxVQUE3QjtJQUM1QixhQUFBLEVBQWUsQ0FBQSxDQUFBLENBQUEsQ0FBSSxNQUFKLENBQUE7RUFEYSxDQUE1QixFQUM2QixRQUFBLENBQUEsQ0FBQTtJQUMzQixFQUFFLENBQUMsSUFBSCxDQUFRLFVBQVIsRUFBb0IsbUJBQXBCO0lBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxXQUFSO0lBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxXQUFSO1dBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxXQUFSO0VBSjJCLENBRDdCO0FBRHNDLENBQWQ7O0FBUTFCLGVBQUEsR0FBa0IsRUFBRSxDQUFDLFNBQUgsQ0FBYSxRQUFBLENBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsY0FBbEIsQ0FBQTtTQUM3QixFQUFFLENBQUMsQ0FBSCxDQUFLLENBQUEsQ0FBQSxDQUFHLFFBQUgsQ0FBQSxnQkFBQSxDQUFMLEVBQW9DO0lBQUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUFYO0lBQ3BDLGFBQUEsRUFBYztFQURzQixDQUFwQyxFQUMwQixjQUQxQjtBQUQ2QixDQUFiOztBQUlsQixPQUFBO0VBQ0UsVUFERjtFQUVFLFNBRkY7RUFHRSxrQkFIRjtFQUlFLHNCQUpGO0VBS0UsZUFMRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBCdXR0b24gVGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5zcGFuYnV0dG9uID0gdGMuY29tcG9uZW50IChzZWxlY3RvciwgYXR0cnMsIHJlbmRlckNvbnRlbnRzKSAtPlxuICB0Yy5zcGFuIFwiI3tzZWxlY3Rvcn0uYnRuLmJ0bi1zZWNvbmRhcnkuYnRuLXNtXCIsIHJlbmRlckNvbnRlbnRzXG5cbmRpdmJ1dHRvbiA9IHRjLmNvbXBvbmVudCAoc2VsZWN0b3IsIGF0dHJzLCByZW5kZXJDb250ZW50cykgLT5cbiAgdGMuZGl2IFwiI3tzZWxlY3Rvcn0uYnRuLmJ0bi1zZWNvbmRhcnkuYnRuLXNtXCIsIHJlbmRlckNvbnRlbnRzXG5cbm1vZGFsX2Nsb3NlX2J1dHRvbiA9IHRjLnJlbmRlcmFibGUgKGxhYmVsPSdDbG9zZScsIGljb249J2Nsb3NlJyktPlxuICB0Yy5kaXYgJy5idG4uYnRuLXNlY29uZGFyeS5idG4tc20nLCAnZGF0YS1kaXNtaXNzJzogJ21vZGFsJywgLT5cbiAgICB0Yy5oNCAnLm1vZGFsLXRpdGxlJywgLT5cbiAgICAgIHRjLmkgXCIuZmEuZmEtI3tpY29ufVwiXG4gICAgICB0Yy50ZXh0IGxhYmVsXG5cbm5hdmJhcl9jb2xsYXBzZV9idXR0b24gID0gdGMucmVuZGVyYWJsZSAodGFyZ2V0KSAtPlxuICB0Yy5idXR0b24gJy5uYXZiYXItdG9nZ2xlJywgdHlwZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonY29sbGFwc2UnLFxuICAnZGF0YS10YXJnZXQnOiBcIiMje3RhcmdldH1cIiwgLT5cbiAgICB0Yy5zcGFuICcuc3Itb25seScsICdUb2dnbGUgTmF2aWdhdGlvbidcbiAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgIHRjLnNwYW4gJy5pY29uLWJhcidcblxuZHJvcGRvd25fdG9nZ2xlID0gdGMuY29tcG9uZW50IChzZWxlY3RvciwgYXR0cnMsIHJlbmRlckNvbnRlbnRzKSAtPlxuICB0Yy5hIFwiI3tzZWxlY3Rvcn0uZHJvcGRvd24tdG9nZ2xlXCIsIGhyZWY6YXR0cnMuaHJlZixcbiAgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCByZW5kZXJDb250ZW50c1xuXG5leHBvcnQge1xuICBzcGFuYnV0dG9uXG4gIGRpdmJ1dHRvblxuICBtb2RhbF9jbG9zZV9idXR0b25cbiAgbmF2YmFyX2NvbGxhcHNlX2J1dHRvblxuICBkcm9wZG93bl90b2dnbGVcbiAgfVxuICBcbiJdfQ==
