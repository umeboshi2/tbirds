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
    item_btn = ".btn.btn-secondary.btn-sm";
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
    tc.button(`#new-${name}.btn.btn-secondary`, function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQSxrQkFBQSxFQUFBLFVBQUEsRUFBQSxvQkFBQSxFQUFBLE1BQUEsRUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBQ0wsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztBQUlULENBQUEsQ0FBRSxvQkFBRixDQUFBLEdBQTJCLE9BQUEsQ0FBUSxTQUFSLENBQTNCOztBQUlBLFVBQUEsR0FBYSxPQUFBLENBQVEsb0JBQVIsRUFUYjs7Ozs7Ozs7O0FBbUJBLGtCQUFBLEdBQXFCLFFBQUEsQ0FBQyxJQUFELEVBQU8sVUFBUCxDQUFBO1NBQ25CLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUNaLFFBQUE7SUFBQSxRQUFBLEdBQVc7V0FDWCxFQUFFLENBQUMsRUFBSCxDQUFNLENBQUEsaUJBQUEsQ0FBQSxDQUFvQixJQUFwQixDQUF5QixLQUF6QixDQUFOLEVBQXVDLFFBQUEsQ0FBQSxDQUFBO01BQ3JDLEVBQUUsQ0FBQyxJQUFILENBQVEsUUFBQSxDQUFBLENBQUE7ZUFDTixFQUFFLENBQUMsQ0FBSCxDQUFLO1VBQUEsSUFBQSxFQUFLLENBQUEsQ0FBQSxDQUFBLENBQUksVUFBSixDQUFlLENBQWYsQ0FBQSxDQUFrQixJQUFsQixDQUF1QixPQUF2QixDQUFBLENBQWdDLEtBQUssQ0FBQyxFQUF0QyxDQUFBO1FBQUwsQ0FBTCxFQUFzRCxLQUFLLENBQUMsSUFBNUQ7TUFETSxDQUFSO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyx1QkFBUCxFQUFnQyxRQUFBLENBQUEsQ0FBQTtRQUM5QixFQUFFLENBQUMsTUFBSCxDQUFVLENBQUEsV0FBQSxDQUFBLENBQWMsUUFBZCxDQUF1QixvQkFBdkIsQ0FBVixFQUF3RCxNQUF4RDtlQUNBLEVBQUUsQ0FBQyxNQUFILENBQVUsQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsUUFBaEIsQ0FBeUIsdUJBQXpCLENBQVYsRUFBNkQsUUFBN0Q7TUFGOEIsQ0FBaEM7SUFIcUMsQ0FBdkM7RUFGWSxDQUFkO0FBRG1COztBQVVyQixrQkFBQSxHQUFxQixRQUFBLENBQUMsSUFBRCxDQUFBO1NBQ25CLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUNaLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVAsRUFBMkIsUUFBQSxDQUFBLENBQUE7YUFDekIsRUFBRSxDQUFDLElBQUgsQ0FBUSxVQUFBLENBQVcsSUFBWCxDQUFSO0lBRHlCLENBQTNCO0lBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxDQUFBLEtBQUEsQ0FBQSxDQUFRLElBQVIsQ0FBYSxrQkFBYixDQUFWLEVBQTRDLFFBQUEsQ0FBQSxDQUFBO2FBQzFDLENBQUEsUUFBQSxDQUFBLENBQVcsVUFBQSxDQUFXLElBQVgsQ0FBWCxDQUFBO0lBRDBDLENBQTVDO0lBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBQTtXQUNBLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSxDQUFBLENBQUEsQ0FBSSxJQUFKLENBQVMscUJBQVQsQ0FBTjtFQU5ZLENBQWQ7QUFEbUI7O0FBU3JCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxrQkFBQSxFQUFvQixrQkFBcEI7RUFDQSxrQkFBQSxFQUFvQjtBQURwQiIsInNvdXJjZXNDb250ZW50IjpbInRjID0gcmVxdWlyZSAndGVhY3VwJ1xubWFya2VkID0gcmVxdWlyZSAnbWFya2VkJ1xuXG5cbiAgXG57IGZvcm1fZ3JvdXBfaW5wdXRfZGl2IH0gPSByZXF1aXJlICcuL2Zvcm1zJ1xuXG5cblxuY2FwaXRhbGl6ZSA9IHJlcXVpcmUgJy4uL3V0aWwvY2FwaXRhbGl6ZSdcblxuIyBNYWluIFRlbXBsYXRlcyBtdXN0IHVzZSB0ZWFjdXAuXG4jIFRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGEgdGVhY3VwLnJlbmRlcmFibGUsXG4jIGFuZCBhY2NlcHQgYSBsYXlvdXQgbW9kZWwgYXMgYW4gYXJndW1lbnQuXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgVGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmJhc2VfaXRlbV90ZW1wbGF0ZSA9IChuYW1lLCByb3V0ZV9uYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpdGVtX2J0biA9IFwiLmJ0bi5idG4tc2Vjb25kYXJ5LmJ0bi1zbVwiXG4gICAgdGMubGkgXCIubGlzdC1ncm91cC1pdGVtLiN7bmFtZX0taXRlbVwiLCAtPlxuICAgICAgdGMuc3BhbiAtPlxuICAgICAgICB0Yy5hIGhyZWY6XCIjI3tyb3V0ZV9uYW1lfS8je25hbWV9cy92aWV3LyN7bW9kZWwuaWR9XCIsIG1vZGVsLm5hbWVcbiAgICAgIHRjLmRpdiAnLmJ0bi1ncm91cC5wdWxsLXJpZ2h0JywgLT5cbiAgICAgICAgdGMuYnV0dG9uIFwiLmVkaXQtaXRlbS4je2l0ZW1fYnRufS5idG4taW5mby5mYS5mYS1lZGl0XCIsICdlZGl0J1xuICAgICAgICB0Yy5idXR0b24gXCIuZGVsZXRlLWl0ZW0uI3tpdGVtX2J0bn0uYnRuLWRhbmdlci5mYS5mYS1jbG9zZVwiLCAnZGVsZXRlJ1xuXG5iYXNlX2xpc3RfdGVtcGxhdGUgPSAobmFtZSkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcubGlzdHZpZXctaGVhZGVyJywgLT5cbiAgICAgIHRjLnRleHQgY2FwaXRhbGl6ZSBuYW1lXG4gICAgdGMuYnV0dG9uIFwiI25ldy0je25hbWV9LmJ0bi5idG4tc2Vjb25kYXJ5XCIsIC0+XG4gICAgICBcIkFkZCBOZXcgI3tjYXBpdGFsaXplIG5hbWV9XCJcbiAgICB0Yy5ocigpXG4gICAgdGMudWwgXCIjI3tuYW1lfS1jb250YWluZXIubGlzdC1ncm91cFwiXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgYmFzZV9pdGVtX3RlbXBsYXRlOiBiYXNlX2l0ZW1fdGVtcGxhdGVcbiAgYmFzZV9saXN0X3RlbXBsYXRlOiBiYXNlX2xpc3RfdGVtcGxhdGVcbiJdfQ==
