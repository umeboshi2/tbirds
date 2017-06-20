var base_item_template, base_list_template, capitalize, form_group_input_div, marked, tc;

tc = require('teacup');

marked = require('marked');

form_group_input_div = require('./forms').form_group_input_div;

capitalize = require('../util/capitalize');

base_item_template = function(name, route_name) {
  return tc.renderable(function(model) {
    var item_btn;
    item_btn = ".btn.btn-default.btn-xs";
    return tc.li(".list-group-item." + name + "-item", function() {
      tc.span(function() {
        return tc.a({
          href: "#" + route_name + "/" + name + "s/view/" + model.id
        }, model.name);
      });
      return tc.div('.btn-group.pull-right', function() {
        tc.button(".edit-item." + item_btn + ".btn-info.fa.fa-edit", 'edit');
        return tc.button(".delete-item." + item_btn + ".btn-danger.fa.fa-close", 'delete');
      });
    });
  });
};

base_list_template = function(name) {
  return tc.renderable(function(model) {
    tc.div('.listview-header', function() {
      return tc.text(capitalize(name));
    });
    tc.button("#new-" + name + ".btn.btn-default", function() {
      return "Add New " + (capitalize(name));
    });
    tc.hr();
    return tc.ul("#" + name + "-container.list-group");
  });
};

module.exports = {
  base_item_template: base_item_template,
  base_list_template: base_list_template
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUNMLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7QUFJUCx1QkFBeUIsT0FBQSxDQUFRLFNBQVI7O0FBSTNCLFVBQUEsR0FBYSxPQUFBLENBQVEsb0JBQVI7O0FBVWIsa0JBQUEsR0FBcUIsU0FBQyxJQUFELEVBQU8sVUFBUDtTQUNuQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtBQUNaLFFBQUE7SUFBQSxRQUFBLEdBQVc7V0FDWCxFQUFFLENBQUMsRUFBSCxDQUFNLG1CQUFBLEdBQW9CLElBQXBCLEdBQXlCLE9BQS9CLEVBQXVDLFNBQUE7TUFDckMsRUFBRSxDQUFDLElBQUgsQ0FBUSxTQUFBO2VBQ04sRUFBRSxDQUFDLENBQUgsQ0FBSztVQUFBLElBQUEsRUFBSyxHQUFBLEdBQUksVUFBSixHQUFlLEdBQWYsR0FBa0IsSUFBbEIsR0FBdUIsU0FBdkIsR0FBZ0MsS0FBSyxDQUFDLEVBQTNDO1NBQUwsRUFBc0QsS0FBSyxDQUFDLElBQTVEO01BRE0sQ0FBUjthQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sdUJBQVAsRUFBZ0MsU0FBQTtRQUM5QixFQUFFLENBQUMsTUFBSCxDQUFVLGFBQUEsR0FBYyxRQUFkLEdBQXVCLHNCQUFqQyxFQUF3RCxNQUF4RDtlQUNBLEVBQUUsQ0FBQyxNQUFILENBQVUsZUFBQSxHQUFnQixRQUFoQixHQUF5Qix5QkFBbkMsRUFBNkQsUUFBN0Q7TUFGOEIsQ0FBaEM7SUFIcUMsQ0FBdkM7RUFGWSxDQUFkO0FBRG1COztBQVVyQixrQkFBQSxHQUFxQixTQUFDLElBQUQ7U0FDbkIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7SUFDWixFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQLEVBQTJCLFNBQUE7YUFDekIsRUFBRSxDQUFDLElBQUgsQ0FBUSxVQUFBLENBQVcsSUFBWCxDQUFSO0lBRHlCLENBQTNCO0lBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxPQUFBLEdBQVEsSUFBUixHQUFhLGtCQUF2QixFQUEwQyxTQUFBO2FBQ3hDLFVBQUEsR0FBVSxDQUFDLFVBQUEsQ0FBVyxJQUFYLENBQUQ7SUFEOEIsQ0FBMUM7SUFFQSxFQUFFLENBQUMsRUFBSCxDQUFBO1dBQ0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSxHQUFBLEdBQUksSUFBSixHQUFTLHVCQUFmO0VBTlksQ0FBZDtBQURtQjs7QUFTckIsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLGtCQUFBLEVBQW9CLGtCQUFwQjtFQUNBLGtCQUFBLEVBQW9CLGtCQURwQiIsInNvdXJjZXNDb250ZW50IjpbInRjID0gcmVxdWlyZSAndGVhY3VwJ1xubWFya2VkID0gcmVxdWlyZSAnbWFya2VkJ1xuXG5cbiAgXG57IGZvcm1fZ3JvdXBfaW5wdXRfZGl2IH0gPSByZXF1aXJlICcuL2Zvcm1zJ1xuXG5cblxuY2FwaXRhbGl6ZSA9IHJlcXVpcmUgJy4uL3V0aWwvY2FwaXRhbGl6ZSdcblxuIyBNYWluIFRlbXBsYXRlcyBtdXN0IHVzZSB0ZWFjdXAuXG4jIFRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGEgdGVhY3VwLnJlbmRlcmFibGUsXG4jIGFuZCBhY2NlcHQgYSBsYXlvdXQgbW9kZWwgYXMgYW4gYXJndW1lbnQuXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgVGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmJhc2VfaXRlbV90ZW1wbGF0ZSA9IChuYW1lLCByb3V0ZV9uYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpdGVtX2J0biA9IFwiLmJ0bi5idG4tZGVmYXVsdC5idG4teHNcIlxuICAgIHRjLmxpIFwiLmxpc3QtZ3JvdXAtaXRlbS4je25hbWV9LWl0ZW1cIiwgLT5cbiAgICAgIHRjLnNwYW4gLT5cbiAgICAgICAgdGMuYSBocmVmOlwiIyN7cm91dGVfbmFtZX0vI3tuYW1lfXMvdmlldy8je21vZGVsLmlkfVwiLCBtb2RlbC5uYW1lXG4gICAgICB0Yy5kaXYgJy5idG4tZ3JvdXAucHVsbC1yaWdodCcsIC0+XG4gICAgICAgIHRjLmJ1dHRvbiBcIi5lZGl0LWl0ZW0uI3tpdGVtX2J0bn0uYnRuLWluZm8uZmEuZmEtZWRpdFwiLCAnZWRpdCdcbiAgICAgICAgdGMuYnV0dG9uIFwiLmRlbGV0ZS1pdGVtLiN7aXRlbV9idG59LmJ0bi1kYW5nZXIuZmEuZmEtY2xvc2VcIiwgJ2RlbGV0ZSdcblxuYmFzZV9saXN0X3RlbXBsYXRlID0gKG5hbWUpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLmxpc3R2aWV3LWhlYWRlcicsIC0+XG4gICAgICB0Yy50ZXh0IGNhcGl0YWxpemUgbmFtZVxuICAgIHRjLmJ1dHRvbiBcIiNuZXctI3tuYW1lfS5idG4uYnRuLWRlZmF1bHRcIiwgLT5cbiAgICAgIFwiQWRkIE5ldyAje2NhcGl0YWxpemUgbmFtZX1cIlxuICAgIHRjLmhyKClcbiAgICB0Yy51bCBcIiMje25hbWV9LWNvbnRhaW5lci5saXN0LWdyb3VwXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBiYXNlX2l0ZW1fdGVtcGxhdGU6IGJhc2VfaXRlbV90ZW1wbGF0ZVxuICBiYXNlX2xpc3RfdGVtcGxhdGU6IGJhc2VfbGlzdF90ZW1wbGF0ZVxuIl19
