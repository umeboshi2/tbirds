var base_item_template, base_list_template;

import tc from 'teacup';

import capitalize from '../util/capitalize';

// Main Templates must use teacup.
// The template must be a teacup.renderable,
// and accept a layout model as an argument.

//#######################################
// Templates
//#######################################
base_item_template = function(name, route_name) {
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

base_list_template = function(name) {
  return tc.renderable(function() {
    tc.div('.listview-header', function() {
      return tc.text(capitalize(name));
    });
    tc.hr();
    return tc.ul(`#${name}-container.list-group`);
  });
};

export {
  base_item_template,
  base_list_template
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQTs7QUFBQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFVBQVAsTUFBQSxxQkFGQTs7Ozs7Ozs7O0FBWUEsa0JBQUEsR0FBcUIsUUFBQSxDQUFDLElBQUQsRUFBTyxVQUFQLENBQUE7U0FDbkIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ1osUUFBQTtJQUFBLFFBQUEsR0FBVztXQUNYLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLEtBQXpCLENBQU4sRUFBdUMsUUFBQSxDQUFBLENBQUE7TUFDckMsRUFBRSxDQUFDLElBQUgsQ0FBUSxRQUFBLENBQUEsQ0FBQTtlQUNOLEVBQUUsQ0FBQyxDQUFILENBQUs7VUFBQSxJQUFBLEVBQUssQ0FBQSxDQUFBLENBQUEsQ0FBSSxVQUFKLENBQWUsQ0FBZixDQUFBLENBQWtCLElBQWxCLENBQXVCLE9BQXZCLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLEVBQXRDLENBQUE7UUFBTCxDQUFMLEVBQXNELEtBQUssQ0FBQyxJQUE1RDtNQURNLENBQVI7YUFFQSxFQUFFLENBQUMsSUFBSCxDQUFRLHVCQUFSLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO1FBQy9CLEVBQUUsQ0FBQyxNQUFILENBQVUsQ0FBQSxXQUFBLENBQUEsQ0FBYyxRQUFkLENBQXVCLG9CQUF2QixDQUFWLEVBQXdELE1BQXhEO2VBQ0EsRUFBRSxDQUFDLE1BQUgsQ0FBVSxDQUFBLGFBQUEsQ0FBQSxDQUFnQixRQUFoQixDQUF5Qix1QkFBekIsQ0FBVixFQUE2RCxRQUE3RDtNQUYrQixDQUFqQztJQUhxQyxDQUF2QztFQUZZLENBQWQ7QUFEbUI7O0FBVXJCLGtCQUFBLEdBQXFCLFFBQUEsQ0FBQyxJQUFELENBQUE7U0FDbkIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUNaLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVAsRUFBMkIsUUFBQSxDQUFBLENBQUE7YUFDekIsRUFBRSxDQUFDLElBQUgsQ0FBUSxVQUFBLENBQVcsSUFBWCxDQUFSO0lBRHlCLENBQTNCO0lBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBQTtXQUNBLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSxDQUFBLENBQUEsQ0FBSSxJQUFKLENBQVMscUJBQVQsQ0FBTjtFQUpZLENBQWQ7QUFEbUI7O0FBT3JCLE9BQUE7RUFDRSxrQkFERjtFQUVFLGtCQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi4vdXRpbC9jYXBpdGFsaXplJ1xuXG4jIE1haW4gVGVtcGxhdGVzIG11c3QgdXNlIHRlYWN1cC5cbiMgVGhlIHRlbXBsYXRlIG11c3QgYmUgYSB0ZWFjdXAucmVuZGVyYWJsZSxcbiMgYW5kIGFjY2VwdCBhIGxheW91dCBtb2RlbCBhcyBhbiBhcmd1bWVudC5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuYmFzZV9pdGVtX3RlbXBsYXRlID0gKG5hbWUsIHJvdXRlX25hbWUpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGl0ZW1fYnRuID0gXCIuYnRuLmJ0bi1zZWNvbmRhcnkuYnRuLXNtXCJcbiAgICB0Yy5saSBcIi5saXN0LWdyb3VwLWl0ZW0uI3tuYW1lfS1pdGVtXCIsIC0+XG4gICAgICB0Yy5zcGFuIC0+XG4gICAgICAgIHRjLmEgaHJlZjpcIiMje3JvdXRlX25hbWV9LyN7bmFtZX1zL3ZpZXcvI3ttb2RlbC5pZH1cIiwgbW9kZWwubmFtZVxuICAgICAgdGMuc3BhbiAnLmJ0bi1ncm91cC5wdWxsLXJpZ2h0JywgLT5cbiAgICAgICAgdGMuYnV0dG9uIFwiLmVkaXQtaXRlbS4je2l0ZW1fYnRufS5idG4taW5mby5mYS5mYS1lZGl0XCIsICdlZGl0J1xuICAgICAgICB0Yy5idXR0b24gXCIuZGVsZXRlLWl0ZW0uI3tpdGVtX2J0bn0uYnRuLWRhbmdlci5mYS5mYS1jbG9zZVwiLCAnZGVsZXRlJ1xuXG5iYXNlX2xpc3RfdGVtcGxhdGUgPSAobmFtZSkgLT5cbiAgdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmRpdiAnLmxpc3R2aWV3LWhlYWRlcicsIC0+XG4gICAgICB0Yy50ZXh0IGNhcGl0YWxpemUgbmFtZVxuICAgIHRjLmhyKClcbiAgICB0Yy51bCBcIiMje25hbWV9LWNvbnRhaW5lci5saXN0LWdyb3VwXCJcblxuZXhwb3J0IHtcbiAgYmFzZV9pdGVtX3RlbXBsYXRlXG4gIGJhc2VfbGlzdF90ZW1wbGF0ZVxuICB9XG4gIFxuIl19
