var capitalize, form_group_input_div, login_form, make_field_input, make_field_select, make_field_textarea, make_login_form, name_content_form, tc;

tc = require('teacup');

capitalize = require('../apputil').capitalize;

form_group_input_div = tc.renderable(function(data) {
  return tc.div('.form-group', function() {
    var atts, input_type, selector;
    tc.label('.control-label', {
      "for": data.input_id
    }, data.label);
    selector = "#" + data.input_id + ".form-control";
    atts = data.input_attributes;
    input_type = tc.input;
    if (data != null ? data.input_type : void 0) {
      input_type = tc[data.input_type];
      return input_type(selector, atts, function() {
        return tc.text(data != null ? data.content : void 0);
      });
    } else {
      return input_type(selector, atts);
    }
  });
});

make_field_input = function(field) {
  return tc.renderable(function(model) {
    return form_group_input_div({
      input_id: "input_" + field,
      label: capitalize(field),
      input_attributes: {
        name: field,
        placeholder: field,
        value: model[field]
      }
    });
  });
};

make_field_textarea = function(field) {
  return tc.renderable(function(model) {
    return form_group_input_div({
      input_id: "input_" + field,
      input_type: 'textarea',
      label: capitalize(field),
      input_attributes: {
        name: field,
        placeholder: field
      },
      content: model[field]
    });
  });
};

make_field_select = function(field, optlist) {
  return tc.renderable(function(model) {
    tc.div('.form-group', function() {
      tc.label('.control-label', {
        "for": "select_" + field
      });
      return capitalize(field);
    });
    return tc.select('.form-control', {
      name: "select_" + field
    }, function() {
      var i, len, opt, results;
      results = [];
      for (i = 0, len = optlist.length; i < len; i++) {
        opt = optlist[i];
        if (model[field] === opt) {
          results.push(tc.option({
            selected: null,
            value: opt
          }, opt));
        } else {
          results.push(tc.option({
            value: opt
          }, opt));
        }
      }
      return results;
    });
  });
};

make_login_form = function(action, method) {
  if (action == null) {
    action = '/login';
  }
  if (method == null) {
    method = 'POST';
  }
  return tc.renderable(function(user) {
    return tc.form({
      role: 'form',
      method: method,
      action: action
    }, function() {
      form_group_input_div({
        input_id: 'input_username',
        label: 'User Name',
        input_attributes: {
          name: 'username',
          placeholder: 'User Name'
        }
      });
      form_group_input_div({
        input_id: 'input_password',
        label: 'Password',
        input_attributes: {
          name: 'password',
          type: 'password',
          placeholder: 'Type your password here....'
        }
      });
      return tc.button('.btn.btn-default', {
        type: 'submit'
      }, 'login');
    });
  });
};

login_form = make_login_form();

name_content_form = tc.renderable(function(model) {
  form_group_input_div({
    input_id: 'input_name',
    label: 'Name',
    input_attributes: {
      name: 'name',
      placeholder: 'Name'
    }
  });
  form_group_input_div({
    input_id: 'input_content',
    input_type: tc.textarea,
    label: 'Content',
    input_attributes: {
      name: 'content',
      placeholder: '...'
    }
  });
  return tc.input('.btn.btn-default.btn-xs', {
    type: 'submit',
    value: 'Add'
  });
});

module.exports = {
  form_group_input_div: form_group_input_div,
  make_field_input: make_field_input,
  make_field_textarea: make_field_textarea,
  make_field_select: make_field_select,
  make_login_form: make_login_form,
  login_form: login_form,
  name_content_form: name_content_form
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVILGFBQWUsT0FBQSxDQUFRLFlBQVI7O0FBTWpCLG9CQUFBLEdBQXVCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxJQUFEO1NBQ25DLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixTQUFBO0FBQ3BCLFFBQUE7SUFBQSxFQUFFLENBQUMsS0FBSCxDQUFTLGdCQUFULEVBQ0U7TUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFJLElBQUksQ0FBQyxRQUFUO0tBREYsRUFFRSxJQUFJLENBQUMsS0FGUDtJQUdBLFFBQUEsR0FBVyxHQUFBLEdBQUksSUFBSSxDQUFDLFFBQVQsR0FBa0I7SUFDN0IsSUFBQSxHQUFPLElBQUksQ0FBQztJQUNaLFVBQUEsR0FBYSxFQUFFLENBQUM7SUFDaEIsbUJBQUcsSUFBSSxDQUFFLG1CQUFUO01BQ0UsVUFBQSxHQUFhLEVBQUcsQ0FBQSxJQUFJLENBQUMsVUFBTDthQUNoQixVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUEyQixTQUFBO2VBQ3pCLEVBQUUsQ0FBQyxJQUFILGdCQUFRLElBQUksQ0FBRSxnQkFBZDtNQUR5QixDQUEzQixFQUZGO0tBQUEsTUFBQTthQUtFLFVBQUEsQ0FBVyxRQUFYLEVBQXFCLElBQXJCLEVBTEY7O0VBUG9CLENBQXRCO0FBRG1DLENBQWQ7O0FBZXZCLGdCQUFBLEdBQW1CLFNBQUMsS0FBRDtTQUNqQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtXQUNaLG9CQUFBLENBQ0U7TUFBQSxRQUFBLEVBQVUsUUFBQSxHQUFTLEtBQW5CO01BQ0EsS0FBQSxFQUFPLFVBQUEsQ0FBVyxLQUFYLENBRFA7TUFFQSxnQkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLEtBQU47UUFDQSxX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QUdBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLFdBQUEsRUFBYSxLQURiO0tBSkY7R0FERjtTQU9BLEVBQUUsQ0FBQyxLQUFILENBQVMseUJBQVQsRUFBb0M7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLEtBQUEsRUFBTSxLQUFyQjtHQUFwQztBQWRnQyxDQUFkOztBQWlCcEIsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLG9CQUFBLEVBQXNCLG9CQUF0QjtFQUNBLGdCQUFBLEVBQWtCLGdCQURsQjtFQUVBLG1CQUFBLEVBQXFCLG1CQUZyQjtFQUdBLGlCQUFBLEVBQW1CLGlCQUhuQjtFQUlBLGVBQUEsRUFBaUIsZUFKakI7RUFLQSxVQUFBLEVBQVksVUFMWjtFQU1BLGlCQUFBLEVBQW1CLGlCQU5uQiIsInNvdXJjZXNDb250ZW50IjpbInRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG57IGNhcGl0YWxpemUgfSA9IHJlcXVpcmUgJy4uL2FwcHV0aWwnXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBGb3JtIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuZm9ybV9ncm91cF9pbnB1dF9kaXYgPSB0Yy5yZW5kZXJhYmxlIChkYXRhKSAtPlxuICB0Yy5kaXYgJy5mb3JtLWdyb3VwJywgLT5cbiAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgZm9yOmRhdGEuaW5wdXRfaWRcbiAgICAgIGRhdGEubGFiZWxcbiAgICBzZWxlY3RvciA9IFwiIyN7ZGF0YS5pbnB1dF9pZH0uZm9ybS1jb250cm9sXCJcbiAgICBhdHRzID0gZGF0YS5pbnB1dF9hdHRyaWJ1dGVzIFxuICAgIGlucHV0X3R5cGUgPSB0Yy5pbnB1dFxuICAgIGlmIGRhdGE/LmlucHV0X3R5cGVcbiAgICAgIGlucHV0X3R5cGUgPSB0Y1tkYXRhLmlucHV0X3R5cGVdXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzLCAtPlxuICAgICAgICB0Yy50ZXh0IGRhdGE/LmNvbnRlbnRcbiAgICBlbHNlXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzXG5cbm1ha2VfZmllbGRfaW5wdXQgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICAgIHZhbHVlOiBtb2RlbFtmaWVsZF1cbiAgICBcbm1ha2VfZmllbGRfdGV4dGFyZWEgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBpbnB1dF90eXBlOiAndGV4dGFyZWEnXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICBjb250ZW50OiBtb2RlbFtmaWVsZF1cblxubWFrZV9maWVsZF9zZWxlY3QgPSAoZmllbGQsIG9wdGxpc3QpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLmZvcm0tZ3JvdXAnLCAtPlxuICAgICAgdGMubGFiZWwgJy5jb250cm9sLWxhYmVsJyxcbiAgICAgICAgZm9yOlwic2VsZWN0XyN7ZmllbGR9XCJcbiAgICAgIGNhcGl0YWxpemUgZmllbGRcbiAgICB0Yy5zZWxlY3QgJy5mb3JtLWNvbnRyb2wnLCBuYW1lOlwic2VsZWN0XyN7ZmllbGR9XCIsIC0+XG4gICAgICBmb3Igb3B0IGluIG9wdGxpc3RcbiAgICAgICAgaWYgbW9kZWxbZmllbGRdIGlzIG9wdFxuICAgICAgICAgIHRjLm9wdGlvbiBzZWxlY3RlZDpudWxsLCB2YWx1ZTpvcHQsIG9wdFxuICAgICAgICBlbHNlXG4gICAgICAgICAgdGMub3B0aW9uIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgICAgXG5tYWtlX2xvZ2luX2Zvcm0gPSAoYWN0aW9uPScvbG9naW4nLCBtZXRob2Q9J1BPU1QnKSAtPiBcbiAgdGMucmVuZGVyYWJsZSAodXNlcikgLT5cbiAgICB0Yy5mb3JtXG4gICAgICByb2xlOidmb3JtJ1xuICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgIGFjdGlvbjogYWN0aW9uLCAtPlxuICAgICAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgICAgIGlucHV0X2lkOiAnaW5wdXRfdXNlcm5hbWUnXG4gICAgICAgICAgbGFiZWw6ICdVc2VyIE5hbWUnXG4gICAgICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgICAgIG5hbWU6ICd1c2VybmFtZSdcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVXNlciBOYW1lJ1xuICAgICAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgICAgIGlucHV0X2lkOiAnaW5wdXRfcGFzc3dvcmQnXG4gICAgICAgICAgbGFiZWw6ICdQYXNzd29yZCdcbiAgICAgICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgbmFtZTogJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgdHlwZTogJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdUeXBlIHlvdXIgcGFzc3dvcmQgaGVyZS4uLi4nXG4gICAgICAgIHRjLmJ1dHRvbiAnLmJ0bi5idG4tZGVmYXVsdCcsIHR5cGU6J3N1Ym1pdCcsICdsb2dpbidcblxubG9naW5fZm9ybSA9IG1ha2VfbG9naW5fZm9ybSgpXG5cbm5hbWVfY29udGVudF9mb3JtID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9uYW1lJ1xuICAgIGxhYmVsOiAnTmFtZSdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ25hbWUnXG4gICAgICBwbGFjZWhvbGRlcjogJ05hbWUnXG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9jb250ZW50J1xuICAgIGlucHV0X3R5cGU6IHRjLnRleHRhcmVhXG4gICAgbGFiZWw6ICdDb250ZW50J1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAnY29udGVudCdcbiAgICAgIHBsYWNlaG9sZGVyOiAnLi4uJ1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tZGVmYXVsdC5idG4teHMnLCB0eXBlOidzdWJtaXQnLCB2YWx1ZTonQWRkJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2OiBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICBtYWtlX2ZpZWxkX2lucHV0OiBtYWtlX2ZpZWxkX2lucHV0XG4gIG1ha2VfZmllbGRfdGV4dGFyZWE6IG1ha2VfZmllbGRfdGV4dGFyZWFcbiAgbWFrZV9maWVsZF9zZWxlY3Q6IG1ha2VfZmllbGRfc2VsZWN0XG4gIG1ha2VfbG9naW5fZm9ybTogbWFrZV9sb2dpbl9mb3JtXG4gIGxvZ2luX2Zvcm06IGxvZ2luX2Zvcm1cbiAgbmFtZV9jb250ZW50X2Zvcm06IG5hbWVfY29udGVudF9mb3JtXG4iXX0=
