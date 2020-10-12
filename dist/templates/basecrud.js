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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQTs7QUFBQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFVBQVAsTUFBQSxxQkFGQTs7Ozs7Ozs7O0FBWUEsa0JBQUEsR0FBcUIsUUFBQSxDQUFDLElBQUQsRUFBTyxVQUFQLENBQUE7U0FDbkIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ2hCLFFBQUE7SUFBSSxRQUFBLEdBQVc7V0FDWCxFQUFFLENBQUMsRUFBSCxDQUFNLENBQUEsaUJBQUEsQ0FBQSxDQUFvQixJQUFwQixDQUFBLEtBQUEsQ0FBTixFQUF1QyxRQUFBLENBQUEsQ0FBQTtNQUNyQyxFQUFFLENBQUMsSUFBSCxDQUFRLFFBQUEsQ0FBQSxDQUFBO2VBQ04sRUFBRSxDQUFDLENBQUgsQ0FBSztVQUFBLElBQUEsRUFBSyxDQUFBLENBQUEsQ0FBQSxDQUFJLFVBQUosQ0FBQSxDQUFBLENBQUEsQ0FBa0IsSUFBbEIsQ0FBQSxPQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLEVBQXRDLENBQUE7UUFBTCxDQUFMLEVBQXNELEtBQUssQ0FBQyxJQUE1RDtNQURNLENBQVI7YUFFQSxFQUFFLENBQUMsSUFBSCxDQUFRLHVCQUFSLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO1FBQy9CLEVBQUUsQ0FBQyxNQUFILENBQVUsQ0FBQSxXQUFBLENBQUEsQ0FBYyxRQUFkLENBQUEsb0JBQUEsQ0FBVixFQUF3RCxNQUF4RDtlQUNBLEVBQUUsQ0FBQyxNQUFILENBQVUsQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsUUFBaEIsQ0FBQSx1QkFBQSxDQUFWLEVBQTZELFFBQTdEO01BRitCLENBQWpDO0lBSHFDLENBQXZDO0VBRlksQ0FBZDtBQURtQjs7QUFVckIsa0JBQUEsR0FBcUIsUUFBQSxDQUFDLElBQUQsQ0FBQTtTQUNuQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ1osRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQixRQUFBLENBQUEsQ0FBQTthQUN6QixFQUFFLENBQUMsSUFBSCxDQUFRLFVBQUEsQ0FBVyxJQUFYLENBQVI7SUFEeUIsQ0FBM0I7SUFFQSxFQUFFLENBQUMsRUFBSCxDQUFBO1dBQ0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLENBQUEsQ0FBQSxDQUFJLElBQUosQ0FBQSxxQkFBQSxDQUFOO0VBSlksQ0FBZDtBQURtQjs7QUFPckIsT0FBQTtFQUNFLGtCQURGO0VBRUUsa0JBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgY2FwaXRhbGl6ZSBmcm9tICcuLi91dGlsL2NhcGl0YWxpemUnXG5cbiMgTWFpbiBUZW1wbGF0ZXMgbXVzdCB1c2UgdGVhY3VwLlxuIyBUaGUgdGVtcGxhdGUgbXVzdCBiZSBhIHRlYWN1cC5yZW5kZXJhYmxlLFxuIyBhbmQgYWNjZXB0IGEgbGF5b3V0IG1vZGVsIGFzIGFuIGFyZ3VtZW50LlxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5iYXNlX2l0ZW1fdGVtcGxhdGUgPSAobmFtZSwgcm91dGVfbmFtZSkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaXRlbV9idG4gPSBcIi5idG4uYnRuLXNlY29uZGFyeS5idG4tc21cIlxuICAgIHRjLmxpIFwiLmxpc3QtZ3JvdXAtaXRlbS4je25hbWV9LWl0ZW1cIiwgLT5cbiAgICAgIHRjLnNwYW4gLT5cbiAgICAgICAgdGMuYSBocmVmOlwiIyN7cm91dGVfbmFtZX0vI3tuYW1lfXMvdmlldy8je21vZGVsLmlkfVwiLCBtb2RlbC5uYW1lXG4gICAgICB0Yy5zcGFuICcuYnRuLWdyb3VwLnB1bGwtcmlnaHQnLCAtPlxuICAgICAgICB0Yy5idXR0b24gXCIuZWRpdC1pdGVtLiN7aXRlbV9idG59LmJ0bi1pbmZvLmZhLmZhLWVkaXRcIiwgJ2VkaXQnXG4gICAgICAgIHRjLmJ1dHRvbiBcIi5kZWxldGUtaXRlbS4je2l0ZW1fYnRufS5idG4tZGFuZ2VyLmZhLmZhLWNsb3NlXCIsICdkZWxldGUnXG5cbmJhc2VfbGlzdF90ZW1wbGF0ZSA9IChuYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuZGl2ICcubGlzdHZpZXctaGVhZGVyJywgLT5cbiAgICAgIHRjLnRleHQgY2FwaXRhbGl6ZSBuYW1lXG4gICAgdGMuaHIoKVxuICAgIHRjLnVsIFwiIyN7bmFtZX0tY29udGFpbmVyLmxpc3QtZ3JvdXBcIlxuXG5leHBvcnQge1xuICBiYXNlX2l0ZW1fdGVtcGxhdGVcbiAgYmFzZV9saXN0X3RlbXBsYXRlXG4gIH1cbiAgXG4iXX0=
