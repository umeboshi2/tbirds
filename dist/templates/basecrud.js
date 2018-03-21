var base_item_template, base_list_template;

import tc from 'teacup';

import marked from 'marked';

import {
  form_group_input_div
} from './forms';

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
  return tc.renderable(function(model) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQTs7QUFBQSxPQUFPLEVBQVAsTUFBQTs7QUFDQSxPQUFPLE1BQVAsTUFBQTs7QUFHQSxPQUFBO0VBQVMsb0JBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBLHFCQUxBOzs7Ozs7Ozs7QUFlQSxrQkFBQSxHQUFxQixRQUFBLENBQUMsSUFBRCxFQUFPLFVBQVAsQ0FBQTtTQUNuQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7QUFDWixRQUFBO0lBQUEsUUFBQSxHQUFXO1dBQ1gsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekIsQ0FBTixFQUF1QyxRQUFBLENBQUEsQ0FBQTtNQUNyQyxFQUFFLENBQUMsSUFBSCxDQUFRLFFBQUEsQ0FBQSxDQUFBO2VBQ04sRUFBRSxDQUFDLENBQUgsQ0FBSztVQUFBLElBQUEsRUFBSyxDQUFBLENBQUEsQ0FBQSxDQUFJLFVBQUosQ0FBZSxDQUFmLENBQUEsQ0FBa0IsSUFBbEIsQ0FBdUIsT0FBdkIsQ0FBQSxDQUFnQyxLQUFLLENBQUMsRUFBdEMsQ0FBQTtRQUFMLENBQUwsRUFBc0QsS0FBSyxDQUFDLElBQTVEO01BRE0sQ0FBUjthQUVBLEVBQUUsQ0FBQyxJQUFILENBQVEsdUJBQVIsRUFBaUMsUUFBQSxDQUFBLENBQUE7UUFDL0IsRUFBRSxDQUFDLE1BQUgsQ0FBVSxDQUFBLFdBQUEsQ0FBQSxDQUFjLFFBQWQsQ0FBdUIsb0JBQXZCLENBQVYsRUFBd0QsTUFBeEQ7ZUFDQSxFQUFFLENBQUMsTUFBSCxDQUFVLENBQUEsYUFBQSxDQUFBLENBQWdCLFFBQWhCLENBQXlCLHVCQUF6QixDQUFWLEVBQTZELFFBQTdEO01BRitCLENBQWpDO0lBSHFDLENBQXZDO0VBRlksQ0FBZDtBQURtQjs7QUFVckIsa0JBQUEsR0FBcUIsUUFBQSxDQUFDLElBQUQsQ0FBQTtTQUNuQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDWixFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQLEVBQTJCLFFBQUEsQ0FBQSxDQUFBO2FBQ3pCLEVBQUUsQ0FBQyxJQUFILENBQVEsVUFBQSxDQUFXLElBQVgsQ0FBUjtJQUR5QixDQUEzQjtJQUVBLEVBQUUsQ0FBQyxFQUFILENBQUE7V0FDQSxFQUFFLENBQUMsRUFBSCxDQUFNLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBSixDQUFTLHFCQUFULENBQU47RUFKWSxDQUFkO0FBRG1COztBQU9yQixPQUFBO0VBQ0Usa0JBREY7RUFFRSxrQkFGRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCdcblxuXG5pbXBvcnQgeyBmb3JtX2dyb3VwX2lucHV0X2RpdiB9IGZyb20gJy4vZm9ybXMnXG5pbXBvcnQgY2FwaXRhbGl6ZSBmcm9tICcuLi91dGlsL2NhcGl0YWxpemUnXG5cbiMgTWFpbiBUZW1wbGF0ZXMgbXVzdCB1c2UgdGVhY3VwLlxuIyBUaGUgdGVtcGxhdGUgbXVzdCBiZSBhIHRlYWN1cC5yZW5kZXJhYmxlLFxuIyBhbmQgYWNjZXB0IGEgbGF5b3V0IG1vZGVsIGFzIGFuIGFyZ3VtZW50LlxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5iYXNlX2l0ZW1fdGVtcGxhdGUgPSAobmFtZSwgcm91dGVfbmFtZSkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaXRlbV9idG4gPSBcIi5idG4uYnRuLXNlY29uZGFyeS5idG4tc21cIlxuICAgIHRjLmxpIFwiLmxpc3QtZ3JvdXAtaXRlbS4je25hbWV9LWl0ZW1cIiwgLT5cbiAgICAgIHRjLnNwYW4gLT5cbiAgICAgICAgdGMuYSBocmVmOlwiIyN7cm91dGVfbmFtZX0vI3tuYW1lfXMvdmlldy8je21vZGVsLmlkfVwiLCBtb2RlbC5uYW1lXG4gICAgICB0Yy5zcGFuICcuYnRuLWdyb3VwLnB1bGwtcmlnaHQnLCAtPlxuICAgICAgICB0Yy5idXR0b24gXCIuZWRpdC1pdGVtLiN7aXRlbV9idG59LmJ0bi1pbmZvLmZhLmZhLWVkaXRcIiwgJ2VkaXQnXG4gICAgICAgIHRjLmJ1dHRvbiBcIi5kZWxldGUtaXRlbS4je2l0ZW1fYnRufS5idG4tZGFuZ2VyLmZhLmZhLWNsb3NlXCIsICdkZWxldGUnXG5cbmJhc2VfbGlzdF90ZW1wbGF0ZSA9IChuYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5saXN0dmlldy1oZWFkZXInLCAtPlxuICAgICAgdGMudGV4dCBjYXBpdGFsaXplIG5hbWVcbiAgICB0Yy5ocigpXG4gICAgdGMudWwgXCIjI3tuYW1lfS1jb250YWluZXIubGlzdC1ncm91cFwiXG5cbmV4cG9ydCB7XG4gIGJhc2VfaXRlbV90ZW1wbGF0ZVxuICBiYXNlX2xpc3RfdGVtcGxhdGVcbiAgfVxuICBcbiJdfQ==
