var base_item_template, base_list_template, capitalize, form_group_input_div, marked, tc;

tc = require('teacup');

marked = require('marked');

({form_group_input_div} = require('./forms'));

capitalize = require('../util/capitalize');

// Main Templates must use teacup.
// The template must be a teacup.renderable,
// and accept a layout model as an argument.

//#######################################
// Templates
//#######################################
base_item_template = function(name, route_name) {
  return tc.renderable(function(model) {
    var item_btn;
    item_btn = ".btn.btn-default.btn-xs";
    return tc.li(`.list-group-item.${name}-item`, function() {
      tc.span(function() {
        return tc.a({
          href: `#${route_name}/${name}s/view/${model.id}`
        }, model.name);
      });
      return tc.div('.btn-group.pull-right', function() {
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
    tc.button(`#new-${name}.btn.btn-default`, function() {
      return `Add New ${capitalize(name)}`;
    });
    tc.hr();
    return tc.ul(`#${name}-container.list-group`);
  });
};

module.exports = {
  base_item_template: base_item_template,
  base_list_template: base_list_template
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQSxrQkFBQSxFQUFBLFVBQUEsRUFBQSxvQkFBQSxFQUFBLE1BQUEsRUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBQ0wsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztBQUlULENBQUEsQ0FBRSxvQkFBRixDQUFBLEdBQTJCLE9BQUEsQ0FBUSxTQUFSLENBQTNCOztBQUlBLFVBQUEsR0FBYSxPQUFBLENBQVEsb0JBQVIsRUFUYjs7Ozs7Ozs7O0FBbUJBLGtCQUFBLEdBQXFCLFFBQUEsQ0FBQyxJQUFELEVBQU8sVUFBUCxDQUFBO1NBQ25CLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUNaLFFBQUE7SUFBQSxRQUFBLEdBQVc7V0FDWCxFQUFFLENBQUMsRUFBSCxDQUFNLENBQUEsaUJBQUEsQ0FBQSxDQUFvQixJQUFwQixDQUF5QixLQUF6QixDQUFOLEVBQXVDLFFBQUEsQ0FBQSxDQUFBO01BQ3JDLEVBQUUsQ0FBQyxJQUFILENBQVEsUUFBQSxDQUFBLENBQUE7ZUFDTixFQUFFLENBQUMsQ0FBSCxDQUFLO1VBQUEsSUFBQSxFQUFLLENBQUEsQ0FBQSxDQUFBLENBQUksVUFBSixDQUFlLENBQWYsQ0FBQSxDQUFrQixJQUFsQixDQUF1QixPQUF2QixDQUFBLENBQWdDLEtBQUssQ0FBQyxFQUF0QyxDQUFBO1FBQUwsQ0FBTCxFQUFzRCxLQUFLLENBQUMsSUFBNUQ7TUFETSxDQUFSO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyx1QkFBUCxFQUFnQyxRQUFBLENBQUEsQ0FBQTtRQUM5QixFQUFFLENBQUMsTUFBSCxDQUFVLENBQUEsV0FBQSxDQUFBLENBQWMsUUFBZCxDQUF1QixvQkFBdkIsQ0FBVixFQUF3RCxNQUF4RDtlQUNBLEVBQUUsQ0FBQyxNQUFILENBQVUsQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsUUFBaEIsQ0FBeUIsdUJBQXpCLENBQVYsRUFBNkQsUUFBN0Q7TUFGOEIsQ0FBaEM7SUFIcUMsQ0FBdkM7RUFGWSxDQUFkO0FBRG1COztBQVVyQixrQkFBQSxHQUFxQixRQUFBLENBQUMsSUFBRCxDQUFBO1NBQ25CLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUNaLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVAsRUFBMkIsUUFBQSxDQUFBLENBQUE7YUFDekIsRUFBRSxDQUFDLElBQUgsQ0FBUSxVQUFBLENBQVcsSUFBWCxDQUFSO0lBRHlCLENBQTNCO0lBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxDQUFBLEtBQUEsQ0FBQSxDQUFRLElBQVIsQ0FBYSxnQkFBYixDQUFWLEVBQTBDLFFBQUEsQ0FBQSxDQUFBO2FBQ3hDLENBQUEsUUFBQSxDQUFBLENBQVcsVUFBQSxDQUFXLElBQVgsQ0FBWCxDQUFBO0lBRHdDLENBQTFDO0lBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBQTtXQUNBLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSxDQUFBLENBQUEsQ0FBSSxJQUFKLENBQVMscUJBQVQsQ0FBTjtFQU5ZLENBQWQ7QUFEbUI7O0FBU3JCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxrQkFBQSxFQUFvQixrQkFBcEI7RUFDQSxrQkFBQSxFQUFvQjtBQURwQiIsInNvdXJjZXNDb250ZW50IjpbInRjID0gcmVxdWlyZSAndGVhY3VwJ1xubWFya2VkID0gcmVxdWlyZSAnbWFya2VkJ1xuXG5cbiAgXG57IGZvcm1fZ3JvdXBfaW5wdXRfZGl2IH0gPSByZXF1aXJlICcuL2Zvcm1zJ1xuXG5cblxuY2FwaXRhbGl6ZSA9IHJlcXVpcmUgJy4uL3V0aWwvY2FwaXRhbGl6ZSdcblxuIyBNYWluIFRlbXBsYXRlcyBtdXN0IHVzZSB0ZWFjdXAuXG4jIFRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGEgdGVhY3VwLnJlbmRlcmFibGUsXG4jIGFuZCBhY2NlcHQgYSBsYXlvdXQgbW9kZWwgYXMgYW4gYXJndW1lbnQuXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgVGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmJhc2VfaXRlbV90ZW1wbGF0ZSA9IChuYW1lLCByb3V0ZV9uYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpdGVtX2J0biA9IFwiLmJ0bi5idG4tZGVmYXVsdC5idG4teHNcIlxuICAgIHRjLmxpIFwiLmxpc3QtZ3JvdXAtaXRlbS4je25hbWV9LWl0ZW1cIiwgLT5cbiAgICAgIHRjLnNwYW4gLT5cbiAgICAgICAgdGMuYSBocmVmOlwiIyN7cm91dGVfbmFtZX0vI3tuYW1lfXMvdmlldy8je21vZGVsLmlkfVwiLCBtb2RlbC5uYW1lXG4gICAgICB0Yy5kaXYgJy5idG4tZ3JvdXAucHVsbC1yaWdodCcsIC0+XG4gICAgICAgIHRjLmJ1dHRvbiBcIi5lZGl0LWl0ZW0uI3tpdGVtX2J0bn0uYnRuLWluZm8uZmEuZmEtZWRpdFwiLCAnZWRpdCdcbiAgICAgICAgdGMuYnV0dG9uIFwiLmRlbGV0ZS1pdGVtLiN7aXRlbV9idG59LmJ0bi1kYW5nZXIuZmEuZmEtY2xvc2VcIiwgJ2RlbGV0ZSdcblxuYmFzZV9saXN0X3RlbXBsYXRlID0gKG5hbWUpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLmxpc3R2aWV3LWhlYWRlcicsIC0+XG4gICAgICB0Yy50ZXh0IGNhcGl0YWxpemUgbmFtZVxuICAgIHRjLmJ1dHRvbiBcIiNuZXctI3tuYW1lfS5idG4uYnRuLWRlZmF1bHRcIiwgLT5cbiAgICAgIFwiQWRkIE5ldyAje2NhcGl0YWxpemUgbmFtZX1cIlxuICAgIHRjLmhyKClcbiAgICB0Yy51bCBcIiMje25hbWV9LWNvbnRhaW5lci5saXN0LWdyb3VwXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBiYXNlX2l0ZW1fdGVtcGxhdGU6IGJhc2VfaXRlbV90ZW1wbGF0ZVxuICBiYXNlX2xpc3RfdGVtcGxhdGU6IGJhc2VfbGlzdF90ZW1wbGF0ZVxuIl19
