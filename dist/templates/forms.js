var form_group_input_div, login_form, make_field_input, make_field_select, make_field_textarea, make_login_form, name_content_form;

import tc from 'teacup';

import capitalize from '../util/capitalize';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxVQUFBLEVBQUEsZ0JBQUEsRUFBQSxpQkFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sVUFBUCxNQUFBLHFCQUZBOzs7OztBQVFBLG9CQUFBLEdBQXVCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtTQUNuQyxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7QUFDcEIsUUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBO0lBQUEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxnQkFBVCxFQUNFO01BQUEsR0FBQSxFQUFJLElBQUksQ0FBQztJQUFULENBREYsRUFFRSxJQUFJLENBQUMsS0FGUDtJQUdBLFFBQUEsR0FBVyxDQUFBLENBQUEsQ0FBQSxDQUFJLElBQUksQ0FBQyxRQUFULENBQWtCLGFBQWxCO0lBQ1gsSUFBQSxHQUFPLElBQUksQ0FBQztJQUNaLFVBQUEsR0FBYSxFQUFFLENBQUM7SUFDaEIsbUJBQUcsSUFBSSxDQUFFLG1CQUFUO01BQ0UsVUFBQSxHQUFhLEVBQUcsQ0FBQSxJQUFJLENBQUMsVUFBTDthQUNoQixVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUEyQixRQUFBLENBQUEsQ0FBQTtlQUN6QixFQUFFLENBQUMsSUFBSCxnQkFBUSxJQUFJLENBQUUsZ0JBQWQ7TUFEeUIsQ0FBM0IsRUFGRjtLQUFBLE1BQUE7YUFLRSxVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUxGOztFQVBvQixDQUF0QjtBQURtQyxDQUFkOztBQWV2QixnQkFBQSxHQUFtQixRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ2pCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtB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QztJQWRjLENBSGxCO0VBRFksQ0FBZDtBQURnQjs7QUFxQmxCLFVBQUEsR0FBYSxlQUFBLENBQUE7O0FBRWIsaUJBQUEsR0FBb0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0VBQ2hDLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsWUFBVjtJQUNBLEtBQUEsRUFBTyxNQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFIRixDQURGO0VBTUEsb0JBQUEsQ0FDRTtJQUFBLFFBQUEsRUFBVSxlQUFWO0lBQ0EsVUFBQSxFQUFZLEVBQUUsQ0FBQyxRQURmO0lBRUEsS0FBQSxFQUFPLFNBRlA7SUFHQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLFNBQU47TUFDQSxXQUFBLEVBQWE7SUFEYjtFQUpGLENBREY7U0FPQSxFQUFFLENBQUMsS0FBSCxDQUFTLDJCQUFULEVBQXNDO0lBQUEsSUFBQSxFQUFLLFFBQUw7SUFBZSxLQUFBLEVBQU07RUFBckIsQ0FBdEM7QUFkZ0MsQ0FBZDs7QUFpQnBCLE9BQUE7O0VBQ0Usb0JBREY7RUFFRSxnQkFGRjtFQUdFLG1CQUhGO0VBSUUsaUJBSkY7RUFLRSxlQUxGO0VBTUUsVUFORjtFQU9FLGlCQVBGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi4vdXRpbC9jYXBpdGFsaXplJ1xuXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgRm9ybSBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmZvcm1fZ3JvdXBfaW5wdXRfZGl2ID0gdGMucmVuZGVyYWJsZSAoZGF0YSkgLT5cbiAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgdGMubGFiZWwgJy5jb250cm9sLWxhYmVsJyxcbiAgICAgIGZvcjpkYXRhLmlucHV0X2lkXG4gICAgICBkYXRhLmxhYmVsXG4gICAgc2VsZWN0b3IgPSBcIiMje2RhdGEuaW5wdXRfaWR9LmZvcm0tY29udHJvbFwiXG4gICAgYXR0cyA9IGRhdGEuaW5wdXRfYXR0cmlidXRlc1xuICAgIGlucHV0X3R5cGUgPSB0Yy5pbnB1dFxuICAgIGlmIGRhdGE/LmlucHV0X3R5cGVcbiAgICAgIGlucHV0X3R5cGUgPSB0Y1tkYXRhLmlucHV0X3R5cGVdXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzLCAtPlxuICAgICAgICB0Yy50ZXh0IGRhdGE/LmNvbnRlbnRcbiAgICBlbHNlXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzXG5cbm1ha2VfZmllbGRfaW5wdXQgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICAgIHZhbHVlOiBtb2RlbFtmaWVsZF1cbiAgICBcbm1ha2VfZmllbGRfdGV4dGFyZWEgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBpbnB1dF90eXBlOiAndGV4dGFyZWEnXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICBjb250ZW50OiBtb2RlbFtmaWVsZF1cblxubWFrZV9maWVsZF9zZWxlY3QgPSAoZmllbGQsIG9wdGxpc3QpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLmZvcm0tZ3JvdXAnLCAtPlxuICAgICAgdGMubGFiZWwgJy5jb250cm9sLWxhYmVsJyxcbiAgICAgICAgZm9yOlwic2VsZWN0XyN7ZmllbGR9XCJcbiAgICAgIGNhcGl0YWxpemUgZmllbGRcbiAgICB0Yy5zZWxlY3QgJy5mb3JtLWNvbnRyb2wnLCBuYW1lOlwic2VsZWN0XyN7ZmllbGR9XCIsIC0+XG4gICAgICBmb3Igb3B0IGluIG9wdGxpc3RcbiAgICAgICAgaWYgbW9kZWxbZmllbGRdIGlzIG9wdFxuICAgICAgICAgIHRjLm9wdGlvbiBzZWxlY3RlZDpudWxsLCB2YWx1ZTpvcHQsIG9wdFxuICAgICAgICBlbHNlXG4gICAgICAgICAgdGMub3B0aW9uIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgICAgXG5tYWtlX2xvZ2luX2Zvcm0gPSAoYWN0aW9uPScvbG9naW4nLCBtZXRob2Q9J1BPU1QnKSAtPlxuICB0Yy5yZW5kZXJhYmxlICh1c2VyKSAtPlxuICAgIHRjLmZvcm1cbiAgICAgIHJvbGU6J2Zvcm0nXG4gICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgYWN0aW9uOiBhY3Rpb24sIC0+XG4gICAgICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICAgICAgaW5wdXRfaWQ6ICdpbnB1dF91c2VybmFtZSdcbiAgICAgICAgICBsYWJlbDogJ1VzZXIgTmFtZSdcbiAgICAgICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgbmFtZTogJ3VzZXJuYW1lJ1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdVc2VyIE5hbWUnXG4gICAgICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICAgICAgaW5wdXRfaWQ6ICdpbnB1dF9wYXNzd29yZCdcbiAgICAgICAgICBsYWJlbDogJ1Bhc3N3b3JkJ1xuICAgICAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgICAgICBuYW1lOiAncGFzc3dvcmQnXG4gICAgICAgICAgICB0eXBlOiAncGFzc3dvcmQnXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1R5cGUgeW91ciBwYXNzd29yZCBoZXJlLi4uLidcbiAgICAgICAgdGMuYnV0dG9uICcuYnRuLmJ0bi1zZWNvbmRhcnknLCB0eXBlOidzdWJtaXQnLCAnbG9naW4nXG5cbmxvZ2luX2Zvcm0gPSBtYWtlX2xvZ2luX2Zvcm0oKVxuXG5uYW1lX2NvbnRlbnRfZm9ybSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfbmFtZSdcbiAgICBsYWJlbDogJ05hbWUnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICduYW1lJ1xuICAgICAgcGxhY2Vob2xkZXI6ICdOYW1lJ1xuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfY29udGVudCdcbiAgICBpbnB1dF90eXBlOiB0Yy50ZXh0YXJlYVxuICAgIGxhYmVsOiAnQ29udGVudCdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ2NvbnRlbnQnXG4gICAgICBwbGFjZWhvbGRlcjogJy4uLidcbiAgdGMuaW5wdXQgJy5idG4uYnRuLXNlY29uZGFyeS5idG4tc20nLCB0eXBlOidzdWJtaXQnLCB2YWx1ZTonQWRkJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5leHBvcnQge1xuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICBtYWtlX2ZpZWxkX2lucHV0XG4gIG1ha2VfZmllbGRfdGV4dGFyZWFcbiAgbWFrZV9maWVsZF9zZWxlY3RcbiAgbWFrZV9sb2dpbl9mb3JtXG4gIGxvZ2luX2Zvcm1cbiAgbmFtZV9jb250ZW50X2Zvcm1cbiAgfVxuICBcbiJdfQ==
