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
      input_type(selector, atts, function() {
        return tc.text(data != null ? data.content : void 0);
      });
    } else {
      input_type(selector, atts);
    }
    return tc.div('.invalid-feedback');
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
        value: model[field],
        data: {
          validation: field
        }
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
        placeholder: field,
        data: {
          validation: field
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxVQUFBLEVBQUEsZ0JBQUEsRUFBQSxpQkFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sVUFBUCxNQUFBOztBQUVBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsdUJBQVIsRUFERjtDQUpBOzs7OztBQVVBLG9CQUFBLEdBQXVCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtTQUNuQyxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7QUFDcEIsUUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBO0lBQUEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxnQkFBVCxFQUNFO01BQUEsR0FBQSxFQUFJLElBQUksQ0FBQztJQUFULENBREYsRUFFRSxJQUFJLENBQUMsS0FGUDtJQUdBLFFBQUEsR0FBVyxDQUFBLENBQUEsQ0FBQSxDQUFJLElBQUksQ0FBQyxRQUFULENBQWtCLGFBQWxCO0lBQ1gsSUFBQSxHQUFPLElBQUksQ0FBQztJQUNaLFVBQUEsR0FBYSxFQUFFLENBQUM7SUFDaEIsbUJBQUcsSUFBSSxDQUFFLG1CQUFUO01BQ0UsVUFBQSxHQUFhLEVBQUcsQ0FBQSxJQUFJLENBQUMsVUFBTDtNQUNoQixVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUEyQixRQUFBLENBQUEsQ0FBQTtlQUN6QixFQUFFLENBQUMsSUFBSCxnQkFBUSxJQUFJLENBQUUsZ0JBQWQ7TUFEeUIsQ0FBM0IsRUFGRjtLQUFBLE1BQUE7TUFLRSxVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUxGOztXQU1BLEVBQUUsQ0FBQyxHQUFILENBQU8sbUJBQVA7RUFib0IsQ0FBdEI7QUFEbUMsQ0FBZDs7QUFn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Z0JBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1VBQ0EsSUFBQSxFQUFNLFVBRE47VUFFQSxXQUFBLEVBQWE7UUFGYjtNQUhGLENBREY7YUFPQSxFQUFFLENBQUMsTUFBSCxDQUFVLG9CQUFWLEVBQWdDO1FBQUEsSUFBQSxFQUFLO01BQUwsQ0FBaEMsRUFBK0MsT0FBL0M7SUFkYyxDQUhsQjtFQURZLENBQWQ7QUFEZ0I7O0FBcUJsQixVQUFBLEdBQWEsZUFBQSxDQUFBOztBQUViLGlCQUFBLEdBQW9CLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtFQUNoQyxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLFlBQVY7SUFDQSxLQUFBLEVBQU8sTUFEUDtJQUVBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLFdBQUEsRUFBYTtJQURiO0VBSEYsQ0FERjtFQU1BLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsZUFBVjtJQUNBLFVBQUEsRUFBWSxFQUFFLENBQUMsUUFEZjtJQUVBLEtBQUEsRUFBTyxTQUZQO0lBR0EsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFKRixDQURGO1NBT0EsRUFBRSxDQUFDLEtBQUgsQ0FBUywyQkFBVCxFQUFzQztJQUFBLElBQUEsRUFBSyxRQUFMO0lBQWUsS0FBQSxFQUFNO0VBQXJCLENBQXRDO0FBZGdDLENBQWQ7O0FBaUJwQixPQUFBOztFQUNFLG9CQURGO0VBRUUsZ0JBRkY7RUFHRSxtQkFIRjtFQUlFLGlCQUpGO0VBS0UsZUFMRjtFQU1FLFVBTkY7RUFPRSxpQkFQRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBjYXBpdGFsaXplIGZyb20gJy4uL3V0aWwvY2FwaXRhbGl6ZSdcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uLy4uL3Nhc3MvZm9ybXMuc2Nzc1wiXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgRm9ybSBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmZvcm1fZ3JvdXBfaW5wdXRfZGl2ID0gdGMucmVuZGVyYWJsZSAoZGF0YSkgLT5cbiAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgdGMubGFiZWwgJy5jb250cm9sLWxhYmVsJyxcbiAgICAgIGZvcjpkYXRhLmlucHV0X2lkXG4gICAgICBkYXRhLmxhYmVsXG4gICAgc2VsZWN0b3IgPSBcIiMje2RhdGEuaW5wdXRfaWR9LmZvcm0tY29udHJvbFwiXG4gICAgYXR0cyA9IGRhdGEuaW5wdXRfYXR0cmlidXRlc1xuICAgIGlucHV0X3R5cGUgPSB0Yy5pbnB1dFxuICAgIGlmIGRhdGE/LmlucHV0X3R5cGVcbiAgICAgIGlucHV0X3R5cGUgPSB0Y1tkYXRhLmlucHV0X3R5cGVdXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzLCAtPlxuICAgICAgICB0Yy50ZXh0IGRhdGE/LmNvbnRlbnRcbiAgICBlbHNlXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzXG4gICAgdGMuZGl2ICcuaW52YWxpZC1mZWVkYmFjaydcblxubWFrZV9maWVsZF9pbnB1dCA9IChmaWVsZCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICAgIGlucHV0X2lkOiBcImlucHV0XyN7ZmllbGR9XCJcbiAgICAgIGxhYmVsOiBjYXBpdGFsaXplIGZpZWxkXG4gICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICBuYW1lOiBmaWVsZFxuICAgICAgICBwbGFjZWhvbGRlcjogZmllbGRcbiAgICAgICAgdmFsdWU6IG1vZGVsW2ZpZWxkXVxuICAgICAgICBkYXRhOnZhbGlkYXRpb246IGZpZWxkXG4gICAgXG5tYWtlX2ZpZWxkX3RleHRhcmVhID0gKGZpZWxkKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgaW5wdXRfaWQ6IFwiaW5wdXRfI3tmaWVsZH1cIlxuICAgICAgaW5wdXRfdHlwZTogJ3RleHRhcmVhJ1xuICAgICAgbGFiZWw6IGNhcGl0YWxpemUgZmllbGRcbiAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgIG5hbWU6IGZpZWxkXG4gICAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZFxuICAgICAgICBkYXRhOnZhbGlkYXRpb246IGZpZWxkXG4gICAgICBjb250ZW50OiBtb2RlbFtmaWVsZF1cblxubWFrZV9maWVsZF9zZWxlY3QgPSAoZmllbGQsIG9wdGxpc3QpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLmZvcm0tZ3JvdXAnLCAtPlxuICAgICAgdGMubGFiZWwgJy5jb250cm9sLWxhYmVsJyxcbiAgICAgICAgZm9yOlwic2VsZWN0XyN7ZmllbGR9XCJcbiAgICAgIGNhcGl0YWxpemUgZmllbGRcbiAgICB0Yy5zZWxlY3QgJy5mb3JtLWNvbnRyb2wnLCBuYW1lOlwic2VsZWN0XyN7ZmllbGR9XCIsIC0+XG4gICAgICBmb3Igb3B0IGluIG9wdGxpc3RcbiAgICAgICAgaWYgbW9kZWxbZmllbGRdIGlzIG9wdFxuICAgICAgICAgIHRjLm9wdGlvbiBzZWxlY3RlZDpudWxsLCB2YWx1ZTpvcHQsIG9wdFxuICAgICAgICBlbHNlXG4gICAgICAgICAgdGMub3B0aW9uIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgICAgXG5tYWtlX2xvZ2luX2Zvcm0gPSAoYWN0aW9uPScvbG9naW4nLCBtZXRob2Q9J1BPU1QnKSAtPlxuICB0Yy5yZW5kZXJhYmxlICh1c2VyKSAtPlxuICAgIHRjLmZvcm1cbiAgICAgIHJvbGU6J2Zvcm0nXG4gICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgYWN0aW9uOiBhY3Rpb24sIC0+XG4gICAgICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICAgICAgaW5wdXRfaWQ6ICdpbnB1dF91c2VybmFtZSdcbiAgICAgICAgICBsYWJlbDogJ1VzZXIgTmFtZSdcbiAgICAgICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgbmFtZTogJ3VzZXJuYW1lJ1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdVc2VyIE5hbWUnXG4gICAgICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICAgICAgaW5wdXRfaWQ6ICdpbnB1dF9wYXNzd29yZCdcbiAgICAgICAgICBsYWJlbDogJ1Bhc3N3b3JkJ1xuICAgICAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgICAgICBuYW1lOiAncGFzc3dvcmQnXG4gICAgICAgICAgICB0eXBlOiAncGFzc3dvcmQnXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1R5cGUgeW91ciBwYXNzd29yZCBoZXJlLi4uLidcbiAgICAgICAgdGMuYnV0dG9uICcuYnRuLmJ0bi1zZWNvbmRhcnknLCB0eXBlOidzdWJtaXQnLCAnbG9naW4nXG5cbmxvZ2luX2Zvcm0gPSBtYWtlX2xvZ2luX2Zvcm0oKVxuXG5uYW1lX2NvbnRlbnRfZm9ybSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfbmFtZSdcbiAgICBsYWJlbDogJ05hbWUnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICduYW1lJ1xuICAgICAgcGxhY2Vob2xkZXI6ICdOYW1lJ1xuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfY29udGVudCdcbiAgICBpbnB1dF90eXBlOiB0Yy50ZXh0YXJlYVxuICAgIGxhYmVsOiAnQ29udGVudCdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ2NvbnRlbnQnXG4gICAgICBwbGFjZWhvbGRlcjogJy4uLidcbiAgdGMuaW5wdXQgJy5idG4uYnRuLXNlY29uZGFyeS5idG4tc20nLCB0eXBlOidzdWJtaXQnLCB2YWx1ZTonQWRkJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5leHBvcnQge1xuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICBtYWtlX2ZpZWxkX2lucHV0XG4gIG1ha2VfZmllbGRfdGV4dGFyZWFcbiAgbWFrZV9maWVsZF9zZWxlY3RcbiAgbWFrZV9sb2dpbl9mb3JtXG4gIGxvZ2luX2Zvcm1cbiAgbmFtZV9jb250ZW50X2Zvcm1cbiAgfVxuICBcbiJdfQ==
