var capitalize, form_group_input_div, login_form, make_field_input, make_field_select, make_field_textarea, make_login_form, name_content_form, tc;

tc = require('teacup');

capitalize = require('../util/capitalize');

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLFVBQUEsR0FBYSxPQUFBLENBQVEsb0JBQVI7O0FBTWIsb0JBQUEsR0FBdUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLElBQUQ7U0FDbkMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLFNBQUE7QUFDcEIsUUFBQTtJQUFBLEVBQUUsQ0FBQyxLQUFILENBQVMsZ0JBQVQsRUFDRTtNQUFBLENBQUEsR0FBQSxDQUFBLEVBQUksSUFBSSxDQUFDLFFBQVQ7S0FERixFQUVFLElBQUksQ0FBQyxLQUZQO0lBR0EsUUFBQSxHQUFXLEdBQUEsR0FBSSxJQUFJLENBQUMsUUFBVCxHQUFrQjtJQUM3QixJQUFBLEdBQU8sSUFBSSxDQUFDO0lBQ1osVUFBQSxHQUFhLEVBQUUsQ0FBQztJQUNoQixtQkFBRyxJQUFJLENBQUUsbUJBQVQ7TUFDRSxVQUFBLEdBQWEsRUFBRyxDQUFBLElBQUksQ0FBQyxVQUFMO2FBQ2hCLFVBQUEsQ0FBVyxRQUFYLEVBQXFCLElBQXJCLEVBQTJCLFNBQUE7ZUFDekIsRUFBRSxDQUFDLElBQUgsZ0JBQVEsSUFBSSxDQUFFLGdCQUFkO01BRHlCLENBQTNCLEVBRkY7S0FBQSxNQUFBO2FBS0UsVUFBQSxDQUFXLFFBQVgsRUFBcUIsSUFBckIsRUFMRjs7RUFQb0IsQ0FBdEI7QUFEbUMsQ0FBZDs7QUFldkIsZ0JBQUEsR0FBbUIsU0FBQyxLQUFEO1NBQ2pCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1dBQ1osb0JBQUEsQ0FDRTtNQUFBLFFBQUEsRUFBVSxRQUFBLEdBQVMsS0FBbkI7TUFDQSxLQUFBLEVBQU8sVUFBQSxDQUFXLEtBQVgsQ0FEUDtNQUVBLGdCQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sS0FBTjtRQUNBLFdBQUEsRUFBYSxLQURiO1FBRUEsS0FBQSxFQUFPLEtBQU0sQ0FBQSxLQUFBLENBRmI7T0FIRjtLQURGO0VBRFksQ0FBZDtBQURpQjs7QUFVbkIsbUJBQUEsR0FBc0IsU0FBQyxLQUFEO1NBQ3BCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1dBQ1osb0JBQUEsQ0FDRTtNQUFBLFFBQUEsRUFBVSxRQUFBLEdBQVMsS0FBbkI7TUFDQSxVQUFBLEVBQVksVUFEWjtNQUVBLEtBQUEsRUFBTyxVQUFBLENBQVcsS0FBWCxDQUZQO01BR0EsZ0JBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxLQUFOO1FBQ0EsV0FBQSxFQUFhLEtBRGI7T0FKRjtNQU1BLE9BQUEsRUFBUyxLQUFNLENBQUEsS0FBQSxDQU5mO0tBREY7RUFEWSxDQUFkO0FBRG9COztBQVd0QixpQkFBQSxHQUFvQixTQUFDLEtBQUQsRUFBUSxPQUFSO1NBQ2xCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO0lBQ1osRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLFNBQUE7TUFDcEIsRUFBRSxDQUFDLEtBQUgsQ0FBUyxnQkFBVCxFQUNFO1FBQUEsQ0FBQSxHQUFBLENBQUEsRUFBSSxTQUFBLEdBQVUsS0FBZDtPQURGO2FBRUEsVUFBQSxDQUFXLEtBQVg7SUFIb0IsQ0FBdEI7V0FJQSxFQUFFLENBQUMsTUFBSCxDQUFVLGVBQVYsRUFBMkI7TUFBQSxJQUFBLEVBQUssU0FBQSxHQUFVLEtBQWY7S0FBM0IsRUFBbUQsU0FBQTtBQUNqRCxVQUFBO0FBQUE7V0FBQSx5Q0FBQTs7UUFDRSxJQUFHLEtBQU0sQ0FBQSxLQUFBLENBQU4sS0FBZ0IsR0FBbkI7dUJBQ0UsRUFBRSxDQUFDLE1BQUgsQ0FBVTtZQUFBLFFBQUEsRUFBUyxJQUFUO1lBQWUsS0FBQSxFQUFNLEdBQXJCO1dBQVYsRUFBb0MsR0FBcEMsR0FERjtTQUFBLE1BQUE7dUJBR0UsRUFBRSxDQUFDLE1BQUgsQ0FBVTtZQUFBLEtBQUEsRUFBTSxHQUFOO1dBQVYsRUFBcUIsR0FBckIsR0FIRjs7QUFERjs7SUFEaUQsQ0FBbkQ7RUFMWSxDQUFkO0FBRGtCOztBQWFwQixlQUFBLEdBQWtCLFNBQUMsTUFBRCxFQUFrQixNQUFsQjs7SUFBQyxTQUFPOzs7SUFBVSxTQUFPOztTQUN6QyxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsSUFBRDtXQUNaLEVBQUUsQ0FBQyxJQUFILENBQ0U7TUFBQSxJQUFBLEVBQUssTUFBTDtNQUNBLE1BQUEsRUFBUSxNQURSO01BRUEsTUFBQSxFQUFRLE1BRlI7S0FERixFQUdrQixTQUFBO01BQ2Qsb0JBQUEsQ0FDRTtRQUFBLFFBQUEsRUFBVSxnQkFBVjtRQUNBLEtBQUEsRUFBTyxXQURQO1FBRUEsZ0JBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1VBQ0EsV0FBQSxFQUFhLFdBRGI7U0FIRjtPQURGO01BTUEsb0JBQUEsQ0FDRTtRQUFBLFFBQUEsRUFBVSxnQkFBVjtRQUNBLEtBQUEsRUFBTyxVQURQO1FBRUEsZ0JBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1VBQ0EsSUFBQSxFQUFNLFVBRE47VUFFQSxXQUFBLEVBQWEsNkJBRmI7U0FIRjtPQURGO2FBT0EsRUFBRSxDQUFDLE1BQUgsQ0FBVSxrQkFBVixFQUE4QjtRQUFBLElBQUEsRUFBSyxRQUFMO09BQTlCLEVBQTZDLE9BQTdDO0lBZGMsQ0FIbEI7RUFEWSxDQUFkO0FBRGdCOztBQXFCbEIsVUFBQSxHQUFhLGVBQUEsQ0FBQTs7QUFFYixpQkFBQSxHQUFvQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtFQUNoQyxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLFlBQVY7SUFDQSxLQUFBLEVBQU8sTUFEUDtJQUVBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLFdBQUEsRUFBYSxNQURiO0tBSEY7R0FERjtFQU1BLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsZUFBVjtJQUNBLFVBQUEsRUFBWSxFQUFFLENBQUMsUUFEZjtJQUVBLEtBQUEsRUFBTyxTQUZQO0lBR0EsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsV0FBQSxFQUFhLEtBRGI7S0FKRjtHQURGO1NBT0EsRUFBRSxDQUFDLEtBQUgsQ0FBUyx5QkFBVCxFQUFvQztJQUFBLElBQUEsRUFBSyxRQUFMO0lBQWUsS0FBQSxFQUFNLEtBQXJCO0dBQXBDO0FBZGdDLENBQWQ7O0FBaUJwQixNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsb0JBQUEsRUFBc0Isb0JBQXRCO0VBQ0EsZ0JBQUEsRUFBa0IsZ0JBRGxCO0VBRUEsbUJBQUEsRUFBcUIsbUJBRnJCO0VBR0EsaUJBQUEsRUFBbUIsaUJBSG5CO0VBSUEsZUFBQSxFQUFpQixlQUpqQjtFQUtBLFVBQUEsRUFBWSxVQUxaO0VBTUEsaUJBQUEsRUFBbUIsaUJBTm5CIiwic291cmNlc0NvbnRlbnQiOlsidGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbmNhcGl0YWxpemUgPSByZXF1aXJlICcuLi91dGlsL2NhcGl0YWxpemUnXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBGb3JtIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuZm9ybV9ncm91cF9pbnB1dF9kaXYgPSB0Yy5yZW5kZXJhYmxlIChkYXRhKSAtPlxuICB0Yy5kaXYgJy5mb3JtLWdyb3VwJywgLT5cbiAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgZm9yOmRhdGEuaW5wdXRfaWRcbiAgICAgIGRhdGEubGFiZWxcbiAgICBzZWxlY3RvciA9IFwiIyN7ZGF0YS5pbnB1dF9pZH0uZm9ybS1jb250cm9sXCJcbiAgICBhdHRzID0gZGF0YS5pbnB1dF9hdHRyaWJ1dGVzXG4gICAgaW5wdXRfdHlwZSA9IHRjLmlucHV0XG4gICAgaWYgZGF0YT8uaW5wdXRfdHlwZVxuICAgICAgaW5wdXRfdHlwZSA9IHRjW2RhdGEuaW5wdXRfdHlwZV1cbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHMsIC0+XG4gICAgICAgIHRjLnRleHQgZGF0YT8uY29udGVudFxuICAgIGVsc2VcbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHNcblxubWFrZV9maWVsZF9pbnB1dCA9IChmaWVsZCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgIGlucHV0X2lkOiBcImlucHV0XyN7ZmllbGR9XCJcbiAgICAgIGxhYmVsOiBjYXBpdGFsaXplIGZpZWxkXG4gICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICBuYW1lOiBmaWVsZFxuICAgICAgICBwbGFjZWhvbGRlcjogZmllbGRcbiAgICAgICAgdmFsdWU6IG1vZGVsW2ZpZWxkXVxuICAgIFxubWFrZV9maWVsZF90ZXh0YXJlYSA9IChmaWVsZCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgIGlucHV0X2lkOiBcImlucHV0XyN7ZmllbGR9XCJcbiAgICAgIGlucHV0X3R5cGU6ICd0ZXh0YXJlYSdcbiAgICAgIGxhYmVsOiBjYXBpdGFsaXplIGZpZWxkXG4gICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICBuYW1lOiBmaWVsZFxuICAgICAgICBwbGFjZWhvbGRlcjogZmllbGRcbiAgICAgIGNvbnRlbnQ6IG1vZGVsW2ZpZWxkXVxuXG5tYWtlX2ZpZWxkX3NlbGVjdCA9IChmaWVsZCwgb3B0bGlzdCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgICBmb3I6XCJzZWxlY3RfI3tmaWVsZH1cIlxuICAgICAgY2FwaXRhbGl6ZSBmaWVsZFxuICAgIHRjLnNlbGVjdCAnLmZvcm0tY29udHJvbCcsIG5hbWU6XCJzZWxlY3RfI3tmaWVsZH1cIiwgLT5cbiAgICAgIGZvciBvcHQgaW4gb3B0bGlzdFxuICAgICAgICBpZiBtb2RlbFtmaWVsZF0gaXMgb3B0XG4gICAgICAgICAgdGMub3B0aW9uIHNlbGVjdGVkOm51bGwsIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy5vcHRpb24gdmFsdWU6b3B0LCBvcHRcbiAgICAgICAgICBcbm1ha2VfbG9naW5fZm9ybSA9IChhY3Rpb249Jy9sb2dpbicsIG1ldGhvZD0nUE9TVCcpIC0+XG4gIHRjLnJlbmRlcmFibGUgKHVzZXIpIC0+XG4gICAgdGMuZm9ybVxuICAgICAgcm9sZTonZm9ybSdcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICBhY3Rpb246IGFjdGlvbiwgLT5cbiAgICAgICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgICAgICBpbnB1dF9pZDogJ2lucHV0X3VzZXJuYW1lJ1xuICAgICAgICAgIGxhYmVsOiAnVXNlciBOYW1lJ1xuICAgICAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgICAgICBuYW1lOiAndXNlcm5hbWUnXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1VzZXIgTmFtZSdcbiAgICAgICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgICAgICBpbnB1dF9pZDogJ2lucHV0X3Bhc3N3b3JkJ1xuICAgICAgICAgIGxhYmVsOiAnUGFzc3dvcmQnXG4gICAgICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgICAgIG5hbWU6ICdwYXNzd29yZCdcbiAgICAgICAgICAgIHR5cGU6ICdwYXNzd29yZCdcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVHlwZSB5b3VyIHBhc3N3b3JkIGhlcmUuLi4uJ1xuICAgICAgICB0Yy5idXR0b24gJy5idG4uYnRuLWRlZmF1bHQnLCB0eXBlOidzdWJtaXQnLCAnbG9naW4nXG5cbmxvZ2luX2Zvcm0gPSBtYWtlX2xvZ2luX2Zvcm0oKVxuXG5uYW1lX2NvbnRlbnRfZm9ybSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfbmFtZSdcbiAgICBsYWJlbDogJ05hbWUnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICduYW1lJ1xuICAgICAgcGxhY2Vob2xkZXI6ICdOYW1lJ1xuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfY29udGVudCdcbiAgICBpbnB1dF90eXBlOiB0Yy50ZXh0YXJlYVxuICAgIGxhYmVsOiAnQ29udGVudCdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ2NvbnRlbnQnXG4gICAgICBwbGFjZWhvbGRlcjogJy4uLidcbiAgdGMuaW5wdXQgJy5idG4uYnRuLWRlZmF1bHQuYnRuLXhzJywgdHlwZTonc3VibWl0JywgdmFsdWU6J0FkZCdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMgPVxuICBmb3JtX2dyb3VwX2lucHV0X2RpdjogZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgbWFrZV9maWVsZF9pbnB1dDogbWFrZV9maWVsZF9pbnB1dFxuICBtYWtlX2ZpZWxkX3RleHRhcmVhOiBtYWtlX2ZpZWxkX3RleHRhcmVhXG4gIG1ha2VfZmllbGRfc2VsZWN0OiBtYWtlX2ZpZWxkX3NlbGVjdFxuICBtYWtlX2xvZ2luX2Zvcm06IG1ha2VfbG9naW5fZm9ybVxuICBsb2dpbl9mb3JtOiBsb2dpbl9mb3JtXG4gIG5hbWVfY29udGVudF9mb3JtOiBuYW1lX2NvbnRlbnRfZm9ybVxuIl19
