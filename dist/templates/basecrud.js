import {
  capitalize
} from 'lodash';

import tc from 'teacup';

// Main Templates must use teacup.
// The template must be a teacup.renderable,
// and accept a layout model as an argument.

//#######################################
// Templates
//#######################################
export var base_item_template = function(name, route_name) {
  return tc.renderable(function(model) {
    var item_btn;
    item_btn = ".btn.btn-secondary.btn-sm";
    return tc.li(`.list-group-item.${name}-item`, function() {
      tc.span(function() {
        return tc.a({
          href: `#${route_name}/${name}s/view/${model.id}`
        }, model.name);
      });
      return tc.span('.btn-group.pull-right', function() {
        tc.button(`.edit-item.${item_btn}.btn-info.fa.fa-edit`, 'edit');
        return tc.button(`.delete-item.${item_btn}.btn-danger.fa.fa-close`, 'delete');
      });
    });
  });
};

export var base_list_template = function(name) {
  return tc.renderable(function() {
    tc.div('.listview-header', function() {
      return tc.text(capitalize(name));
    });
    tc.hr();
    return tc.ul(`#${name}-container.list-group`);
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUE7RUFBUyxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQSxTQURBOzs7Ozs7Ozs7QUFZQSxPQUFBLElBQU8sa0JBQUEsR0FBcUIsUUFBQSxDQUFDLElBQUQsRUFBTyxVQUFQLENBQUE7U0FDMUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ2hCLFFBQUE7SUFBSSxRQUFBLEdBQVc7V0FDWCxFQUFFLENBQUMsRUFBSCxDQUFNLENBQUEsaUJBQUEsQ0FBQSxDQUFvQixJQUFwQixDQUFBLEtBQUEsQ0FBTixFQUF1QyxRQUFBLENBQUEsQ0FBQTtNQUNyQyxFQUFFLENBQUMsSUFBSCxDQUFRLFFBQUEsQ0FBQSxDQUFBO2VBQ04sRUFBRSxDQUFDLENBQUgsQ0FBSztVQUFBLElBQUEsRUFBSyxDQUFBLENBQUEsQ0FBQSxDQUFJLFVBQUosQ0FBQSxDQUFBLENBQUEsQ0FBa0IsSUFBbEIsQ0FBQSxPQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLEVBQXRDLENBQUE7UUFBTCxDQUFMLEVBQXNELEtBQUssQ0FBQyxJQUE1RDtNQURNLENBQVI7YUFFQSxFQUFFLENBQUMsSUFBSCxDQUFRLHVCQUFSLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO1FBQy9CLEVBQUUsQ0FBQyxNQUFILENBQVUsQ0FBQSxXQUFBLENBQUEsQ0FBYyxRQUFkLENBQUEsb0JBQUEsQ0FBVixFQUF3RCxNQUF4RDtlQUNBLEVBQUUsQ0FBQyxNQUFILENBQVUsQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsUUFBaEIsQ0FBQSx1QkFBQSxDQUFWLEVBQTZELFFBQTdEO01BRitCLENBQWpDO0lBSHFDLENBQXZDO0VBRlksQ0FBZDtBQUQwQjs7QUFVNUIsT0FBQSxJQUFPLGtCQUFBLEdBQXFCLFFBQUEsQ0FBQyxJQUFELENBQUE7U0FDMUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUNaLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVAsRUFBMkIsUUFBQSxDQUFBLENBQUE7YUFDekIsRUFBRSxDQUFDLElBQUgsQ0FBUSxVQUFBLENBQVcsSUFBWCxDQUFSO0lBRHlCLENBQTNCO0lBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBQTtXQUNBLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSxDQUFBLENBQUEsQ0FBSSxJQUFKLENBQUEscUJBQUEsQ0FBTjtFQUpZLENBQWQ7QUFEMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYXBpdGFsaXplIH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuXG4jIE1haW4gVGVtcGxhdGVzIG11c3QgdXNlIHRlYWN1cC5cbiMgVGhlIHRlbXBsYXRlIG11c3QgYmUgYSB0ZWFjdXAucmVuZGVyYWJsZSxcbiMgYW5kIGFjY2VwdCBhIGxheW91dCBtb2RlbCBhcyBhbiBhcmd1bWVudC5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZXhwb3J0IGJhc2VfaXRlbV90ZW1wbGF0ZSA9IChuYW1lLCByb3V0ZV9uYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpdGVtX2J0biA9IFwiLmJ0bi5idG4tc2Vjb25kYXJ5LmJ0bi1zbVwiXG4gICAgdGMubGkgXCIubGlzdC1ncm91cC1pdGVtLiN7bmFtZX0taXRlbVwiLCAtPlxuICAgICAgdGMuc3BhbiAtPlxuICAgICAgICB0Yy5hIGhyZWY6XCIjI3tyb3V0ZV9uYW1lfS8je25hbWV9cy92aWV3LyN7bW9kZWwuaWR9XCIsIG1vZGVsLm5hbWVcbiAgICAgIHRjLnNwYW4gJy5idG4tZ3JvdXAucHVsbC1yaWdodCcsIC0+XG4gICAgICAgIHRjLmJ1dHRvbiBcIi5lZGl0LWl0ZW0uI3tpdGVtX2J0bn0uYnRuLWluZm8uZmEuZmEtZWRpdFwiLCAnZWRpdCdcbiAgICAgICAgdGMuYnV0dG9uIFwiLmRlbGV0ZS1pdGVtLiN7aXRlbV9idG59LmJ0bi1kYW5nZXIuZmEuZmEtY2xvc2VcIiwgJ2RlbGV0ZSdcblxuZXhwb3J0IGJhc2VfbGlzdF90ZW1wbGF0ZSA9IChuYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuZGl2ICcubGlzdHZpZXctaGVhZGVyJywgLT5cbiAgICAgIHRjLnRleHQgY2FwaXRhbGl6ZSBuYW1lXG4gICAgdGMuaHIoKVxuICAgIHRjLnVsIFwiIyN7bmFtZX0tY29udGFpbmVyLmxpc3QtZ3JvdXBcIlxuIl19
