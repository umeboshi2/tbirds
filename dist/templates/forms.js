var form_group_input_div, login_form, make_field_input, make_field_select, make_field_textarea, make_login_form, name_content_form;

import tc from 'teacup';

import capitalize from '../util/capitalize';

if (__useCssModules__) {
  require("../../sass/forms.scss");
}

//#######################################
// Form Templates
//#######################################
form_group_input_div = tc.renderable(function(data) {
  return tc.div('.form-group', function() {
    var atts, input_type, selector;
    tc.label('.control-label', {
      for: data.input_id
    }, data.label);
    selector = `#${data.input_id}.form-control`;
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
      input_id: `input_${field}`,
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
      input_id: `input_${field}`,
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
        for: `select_${field}`
      });
      return capitalize(field);
    });
    return tc.select('.form-control', {
      name: `select_${field}`
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

make_login_form = function(action = '/login', method = 'POST') {
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
      return tc.button('.btn.btn-secondary', {
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
  return tc.input('.btn.btn-secondary.btn-sm', {
    type: 'submit',
    value: 'Add'
  });
});

export {
  //#######################################
  form_group_input_div,
  make_field_input,
  make_field_textarea,
  make_field_select,
  make_login_form,
  login_form,
  name_content_form
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxVQUFBLEVBQUEsZ0JBQUEsRUFBQSxpQkFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sVUFBUCxNQUFBOztBQUVBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsdUJBQVIsRUFERjtDQUpBOzs7OztBQVVBLG9CQUFBLEdBQXVCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtTQUNuQyxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7QUFDcEIsUUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBO0lBQUEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxnQkFBVCxFQUNFO01BQUEsR0FBQSxFQUFJLElBQUksQ0FBQztJQUFULENBREYsRUFFRSxJQUFJLENBQUMsS0FGUDtJQUdBLFFBQUEsR0FBVyxDQUFBLENBQUEsQ0FBQSxDQUFJLElBQUksQ0FBQyxRQUFULENBQWtCLGFBQWxCO0lBQ1gsSUFBQSxHQUFPLElBQUksQ0FBQztJQUNaLFVBQUEsR0FBYSxFQUFFLENBQUM7SUFDaEIsbUJBQUcsSUFBSSxDQUFFLG1CQUFUO01BQ0UsVUFBQSxHQUFhLEVBQUcsQ0FBQSxJQUFJLENBQUMsVUFBTDthQUNoQixVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUEyQixRQUFBLENBQUEsQ0FBQTtlQUN6QixFQUFFLENBQUMsSUFBSCxnQkFBUSxJQUFJLENBQUUsZ0JBQWQ7TUFEeUIsQ0FBM0IsRUFGRjtLQUFBLE1BQUE7YUFLRSxVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUxGOztFQVBvQixDQUF0QjtBQURtQyxDQUFkOztBQWV2QixnQkFBQSxHQUFtQixRQUFBLENBQUMsS0FBRCxD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RUFBZ0M7UUFBQSxJQUFBLEVBQUs7TUFBTCxDQUFoQyxFQUErQyxPQUEvQztJQWRjLENBSGxCO0VBRFksQ0FBZDtBQURnQjs7QUFxQmxCLFVBQUEsR0FBYSxlQUFBLENBQUE7O0FBRWIsaUJBQUEsR0FBb0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0VBQ2hDLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsWUFBVjtJQUNBLEtBQUEsRUFBTyxNQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFIRixDQURGO0VBTUEsb0JBQUEsQ0FDRTtJQUFBLFFBQUEsRUFBVSxlQUFWO0lBQ0EsVUFBQSxFQUFZLEVBQUUsQ0FBQyxRQURmO0lBRUEsS0FBQSxFQUFPLFNBRlA7SUFHQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLFNBQU47TUFDQSxXQUFBLEVBQWE7SUFEYjtFQUpGLENBREY7U0FPQSxFQUFFLENBQUMsS0FBSCxDQUFTLDJCQUFULEVBQXNDO0lBQUEsSUFBQSxFQUFLLFFBQUw7SUFBZSxLQUFBLEVBQU07RUFBckIsQ0FBdEM7QUFkZ0MsQ0FBZDs7QUFpQnBCLE9BQUE7O0VBQ0Usb0JBREY7RUFFRSxnQkFGRjtFQUdFLG1CQUhGO0VBSUUsaUJBSkY7RUFLRSxlQUxGO0VBTUUsVUFORjtFQU9FLGlCQVBGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi4vdXRpbC9jYXBpdGFsaXplJ1xuXG5pZiBfX3VzZUNzc01vZHVsZXNfX1xuICByZXF1aXJlIFwiLi4vLi4vc2Fzcy9mb3Jtcy5zY3NzXCJcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBGb3JtIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuZm9ybV9ncm91cF9pbnB1dF9kaXYgPSB0Yy5yZW5kZXJhYmxlIChkYXRhKSAtPlxuICB0Yy5kaXYgJy5mb3JtLWdyb3VwJywgLT5cbiAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgZm9yOmRhdGEuaW5wdXRfaWRcbiAgICAgIGRhdGEubGFiZWxcbiAgICBzZWxlY3RvciA9IFwiIyN7ZGF0YS5pbnB1dF9pZH0uZm9ybS1jb250cm9sXCJcbiAgICBhdHRzID0gZGF0YS5pbnB1dF9hdHRyaWJ1dGVzXG4gICAgaW5wdXRfdHlwZSA9IHRjLmlucHV0XG4gICAgaWYgZGF0YT8uaW5wdXRfdHlwZVxuICAgICAgaW5wdXRfdHlwZSA9IHRjW2RhdGEuaW5wdXRfdHlwZV1cbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHMsIC0+XG4gICAgICAgIHRjLnRleHQgZGF0YT8uY29udGVudFxuICAgIGVsc2VcbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHNcblxubWFrZV9maWVsZF9pbnB1dCA9IChmaWVsZCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgIGlucHV0X2lkOiBcImlucHV0XyN7ZmllbGR9XCJcbiAgICAgIGxhYmVsOiBjYXBpdGFsaXplIGZpZWxkXG4gICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICBuYW1lOiBmaWVsZFxuICAgICAgICBwbGFjZWhvbGRlcjogZmllbGRcbiAgICAgICAgdmFsdWU6IG1vZGVsW2ZpZWxkXVxuICAgIFxubWFrZV9maWVsZF90ZXh0YXJlYSA9IChmaWVsZCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgIGlucHV0X2lkOiBcImlucHV0XyN7ZmllbGR9XCJcbiAgICAgIGlucHV0X3R5cGU6ICd0ZXh0YXJlYSdcbiAgICAgIGxhYmVsOiBjYXBpdGFsaXplIGZpZWxkXG4gICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICBuYW1lOiBmaWVsZFxuICAgICAgICBwbGFjZWhvbGRlcjogZmllbGRcbiAgICAgIGNvbnRlbnQ6IG1vZGVsW2ZpZWxkXVxuXG5tYWtlX2ZpZWxkX3NlbGVjdCA9IChmaWVsZCwgb3B0bGlzdCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgICBmb3I6XCJzZWxlY3RfI3tmaWVsZH1cIlxuICAgICAgY2FwaXRhbGl6ZSBmaWVsZFxuICAgIHRjLnNlbGVjdCAnLmZvcm0tY29udHJvbCcsIG5hbWU6XCJzZWxlY3RfI3tmaWVsZH1cIiwgLT5cbiAgICAgIGZvciBvcHQgaW4gb3B0bGlzdFxuICAgICAgICBpZiBtb2RlbFtmaWVsZF0gaXMgb3B0XG4gICAgICAgICAgdGMub3B0aW9uIHNlbGVjdGVkOm51bGwsIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy5vcHRpb24gdmFsdWU6b3B0LCBvcHRcbiAgICAgICAgICBcbm1ha2VfbG9naW5fZm9ybSA9IChhY3Rpb249Jy9sb2dpbicsIG1ldGhvZD0nUE9TVCcpIC0+XG4gIHRjLnJlbmRlcmFibGUgKHVzZXIpIC0+XG4gICAgdGMuZm9ybVxuICAgICAgcm9sZTonZm9ybSdcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICBhY3Rpb246IGFjdGlvbiwgLT5cbiAgICAgICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgICAgICBpbnB1dF9pZDogJ2lucHV0X3VzZXJuYW1lJ1xuICAgICAgICAgIGxhYmVsOiAnVXNlciBOYW1lJ1xuICAgICAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgICAgICBuYW1lOiAndXNlcm5hbWUnXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1VzZXIgTmFtZSdcbiAgICAgICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgICAgICBpbnB1dF9pZDogJ2lucHV0X3Bhc3N3b3JkJ1xuICAgICAgICAgIGxhYmVsOiAnUGFzc3dvcmQnXG4gICAgICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgICAgIG5hbWU6ICdwYXNzd29yZCdcbiAgICAgICAgICAgIHR5cGU6ICdwYXNzd29yZCdcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVHlwZSB5b3VyIHBhc3N3b3JkIGhlcmUuLi4uJ1xuICAgICAgICB0Yy5idXR0b24gJy5idG4uYnRuLXNlY29uZGFyeScsIHR5cGU6J3N1Ym1pdCcsICdsb2dpbidcblxubG9naW5fZm9ybSA9IG1ha2VfbG9naW5fZm9ybSgpXG5cbm5hbWVfY29udGVudF9mb3JtID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9uYW1lJ1xuICAgIGxhYmVsOiAnTmFtZSdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ25hbWUnXG4gICAgICBwbGFjZWhvbGRlcjogJ05hbWUnXG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9jb250ZW50J1xuICAgIGlucHV0X3R5cGU6IHRjLnRleHRhcmVhXG4gICAgbGFiZWw6ICdDb250ZW50J1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAnY29udGVudCdcbiAgICAgIHBsYWNlaG9sZGVyOiAnLi4uJ1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tc2Vjb25kYXJ5LmJ0bi1zbScsIHR5cGU6J3N1Ym1pdCcsIHZhbHVlOidBZGQnXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmV4cG9ydCB7XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gIG1ha2VfZmllbGRfaW5wdXRcbiAgbWFrZV9maWVsZF90ZXh0YXJlYVxuICBtYWtlX2ZpZWxkX3NlbGVjdFxuICBtYWtlX2xvZ2luX2Zvcm1cbiAgbG9naW5fZm9ybVxuICBuYW1lX2NvbnRlbnRfZm9ybVxuICB9XG4gIFxuIl19
