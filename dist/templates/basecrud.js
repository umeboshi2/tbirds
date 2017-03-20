var base_item_template, base_list_template, capitalize, form_group_input_div, marked, tc;

tc = require('teacup');

marked = require('marked');

form_group_input_div = require('./forms').form_group_input_div;

capitalize = require('../apputil').capitalize;

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Jhc2VjcnVkLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvYmFzZWNydWQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUNMLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7QUFJUCx1QkFBeUIsT0FBQSxDQUFRLFNBQVI7O0FBSXpCLGFBQWUsT0FBQSxDQUFRLFlBQVI7O0FBVWpCLGtCQUFBLEdBQXFCLFNBQUMsSUFBRCxFQUFPLFVBQVA7U0FDbkIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7QUFDWixRQUFBO0lBQUEsUUFBQSxHQUFXO1dBQ1gsRUFBRSxDQUFDLEVBQUgsQ0FBTSxtQkFBQSxHQUFvQixJQUFwQixHQUF5QixPQUEvQixFQUF1QyxTQUFBO01BQ3JDLEVBQUUsQ0FBQyxJQUFILENBQVEsU0FBQTtlQUNOLEVBQUUsQ0FBQyxDQUFILENBQUs7VUFBQSxJQUFBLEVBQUssR0FBQSxHQUFJLFVBQUosR0FBZSxHQUFmLEdBQWtCLElBQWxCLEdBQXVCLFNBQXZCLEdBQWdDLEtBQUssQ0FBQyxFQUEzQztTQUFMLEVBQXNELEtBQUssQ0FBQyxJQUE1RDtNQURNLENBQVI7YUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLHVCQUFQLEVBQWdDLFNBQUE7UUFDOUIsRUFBRSxDQUFDLE1BQUgsQ0FBVSxhQUFBLEdBQWMsUUFBZCxHQUF1QixzQkFBakMsRUFBd0QsTUFBeEQ7ZUFDQSxFQUFFLENBQUMsTUFBSCxDQUFVLGVBQUEsR0FBZ0IsUUFBaEIsR0FBeUIseUJBQW5DLEVBQTZELFFBQTdEO01BRjhCLENBQWhDO0lBSHFDLENBQXZDO0VBRlksQ0FBZDtBQURtQjs7QUFVckIsa0JBQUEsR0FBcUIsU0FBQyxJQUFEO1NBQ25CLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO0lBQ1osRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQixTQUFBO2FBQ3pCLEVBQUUsQ0FBQyxJQUFILENBQVEsVUFBQSxDQUFXLElBQVgsQ0FBUjtJQUR5QixDQUEzQjtJQUVBLEVBQUUsQ0FBQyxNQUFILENBQVUsT0FBQSxHQUFRLElBQVIsR0FBYSxrQkFBdkIsRUFBMEMsU0FBQTthQUN4QyxVQUFBLEdBQVUsQ0FBQyxVQUFBLENBQVcsSUFBWCxDQUFEO0lBRDhCLENBQTFDO0lBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBQTtXQUNBLEVBQUUsQ0FBQyxFQUFILENBQU0sR0FBQSxHQUFJLElBQUosR0FBUyx1QkFBZjtFQU5ZLENBQWQ7QUFEbUI7O0FBU3JCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxrQkFBQSxFQUFvQixrQkFBcEI7RUFDQSxrQkFBQSxFQUFvQixrQkFEcEIiLCJzb3VyY2VzQ29udGVudCI6WyJ0YyA9IHJlcXVpcmUgJ3RlYWN1cCdcbm1hcmtlZCA9IHJlcXVpcmUgJ21hcmtlZCdcblxuXG4gIFxueyBmb3JtX2dyb3VwX2lucHV0X2RpdiB9ID0gcmVxdWlyZSAnLi9mb3JtcydcblxuXG5cbnsgY2FwaXRhbGl6ZSB9ID0gcmVxdWlyZSAnLi4vYXBwdXRpbCdcblxuIyBNYWluIFRlbXBsYXRlcyBtdXN0IHVzZSB0ZWFjdXAuXG4jIFRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGEgdGVhY3VwLnJlbmRlcmFibGUsIFxuIyBhbmQgYWNjZXB0IGEgbGF5b3V0IG1vZGVsIGFzIGFuIGFyZ3VtZW50LlxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5iYXNlX2l0ZW1fdGVtcGxhdGUgPSAobmFtZSwgcm91dGVfbmFtZSkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaXRlbV9idG4gPSBcIi5idG4uYnRuLWRlZmF1bHQuYnRuLXhzXCJcbiAgICB0Yy5saSBcIi5saXN0LWdyb3VwLWl0ZW0uI3tuYW1lfS1pdGVtXCIsIC0+XG4gICAgICB0Yy5zcGFuIC0+XG4gICAgICAgIHRjLmEgaHJlZjpcIiMje3JvdXRlX25hbWV9LyN7bmFtZX1zL3ZpZXcvI3ttb2RlbC5pZH1cIiwgbW9kZWwubmFtZVxuICAgICAgdGMuZGl2ICcuYnRuLWdyb3VwLnB1bGwtcmlnaHQnLCAtPlxuICAgICAgICB0Yy5idXR0b24gXCIuZWRpdC1pdGVtLiN7aXRlbV9idG59LmJ0bi1pbmZvLmZhLmZhLWVkaXRcIiwgJ2VkaXQnXG4gICAgICAgIHRjLmJ1dHRvbiBcIi5kZWxldGUtaXRlbS4je2l0ZW1fYnRufS5idG4tZGFuZ2VyLmZhLmZhLWNsb3NlXCIsICdkZWxldGUnXG5cbmJhc2VfbGlzdF90ZW1wbGF0ZSA9IChuYW1lKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5saXN0dmlldy1oZWFkZXInLCAtPlxuICAgICAgdGMudGV4dCBjYXBpdGFsaXplIG5hbWVcbiAgICB0Yy5idXR0b24gXCIjbmV3LSN7bmFtZX0uYnRuLmJ0bi1kZWZhdWx0XCIsIC0+XG4gICAgICBcIkFkZCBOZXcgI3tjYXBpdGFsaXplIG5hbWV9XCJcbiAgICB0Yy5ocigpXG4gICAgdGMudWwgXCIjI3tuYW1lfS1jb250YWluZXIubGlzdC1ncm91cFwiXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgYmFzZV9pdGVtX3RlbXBsYXRlOiBiYXNlX2l0ZW1fdGVtcGxhdGVcbiAgYmFzZV9saXN0X3RlbXBsYXRlOiBiYXNlX2xpc3RfdGVtcGxhdGVcbiJdfQ==
