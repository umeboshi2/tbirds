var form_group_input_div, login_form, make_field_input, make_field_select, make_field_textarea, make_login_form, name_content_form;

import tc from 'teacup';

import {
  capitalize
} from 'lodash';

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
  return tc.renderable(function() {
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

name_content_form = tc.renderable(function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxVQUFBLEVBQUEsZ0JBQUEsRUFBQSxpQkFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxVQUFUO0NBQUEsTUFBQTs7QUFFQSxJQUFHLGlCQUFIO0VBQ0UsT0FBQSxDQUFRLHVCQUFSLEVBREY7Q0FIQTs7Ozs7QUFTQSxvQkFBQSxHQUF1QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxJQUFELENBQUE7U0FDbkMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLFFBQUEsQ0FBQSxDQUFBO0FBQ3hCLFFBQUEsSUFBQSxFQUFBLFVBQUEsRUFBQTtJQUFJLEVBQUUsQ0FBQyxLQUFILENBQVMsZ0JBQVQsRUFDRTtNQUFBLEdBQUEsRUFBSSxJQUFJLENBQUM7SUFBVCxDQURGLEVBRUUsSUFBSSxDQUFDLEtBRlA7SUFHQSxRQUFBLEdBQVcsQ0FBQSxDQUFBLENBQUEsQ0FBSSxJQUFJLENBQUMsUUFBVCxDQUFBLGFBQUE7SUFDWCxJQUFBLEdBQU8sSUFBSSxDQUFDO0lBQ1osVUFBQSxHQUFhLEVBQUUsQ0FBQztJQUNoQixtQkFBRyxJQUFJLENBQUUsbUJBQVQ7TUFDRSxVQUFBLEdBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFOO01BQ2YsVUFBQSxDQUFXLFFBQVgsRUFBcUIsSUFBckIsRUFBMkIsUUFBQSxDQUFBLENBQUE7ZUFDekIsRUFBRSxDQUFDLElBQUgsZ0JBQVEsSUFBSSxDQUFFLGdCQUFkO01BRHlCLENBQTNCLEVBRkY7S0FBQSxNQUFBO01BS0UsVUFBQSxDQUFXLFFBQVgsRUFBcUIsSUFBckIsRUFMRjs7V0FNQSxFQUFFLENBQUMsR0FBSCxDQUFPLG1CQUFQO0VBYm9CLENBQXRCO0FBRG1DLENB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QSxnQkFBQSxFQUNFO1VBQUEsSUFBQSxFQUFNLFVBQU47VUFDQSxJQUFBLEVBQU0sVUFETjtVQUVBLFdBQUEsRUFBYTtRQUZiO01BSEYsQ0FERjthQU9BLEVBQUUsQ0FBQyxNQUFILENBQVUsb0JBQVYsRUFBZ0M7UUFBQSxJQUFBLEVBQUs7TUFBTCxDQUFoQyxFQUErQyxPQUEvQztJQWRjLENBSGxCO0VBRFksQ0FBZDtBQURnQjs7QUFxQmxCLFVBQUEsR0FBYSxlQUFBLENBQUE7O0FBRWIsaUJBQUEsR0FBb0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtFQUNoQyxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLFlBQVY7SUFDQSxLQUFBLEVBQU8sTUFEUDtJQUVBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLFdBQUEsRUFBYTtJQURiO0VBSEYsQ0FERjtFQU1BLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsZUFBVjtJQUNBLFVBQUEsRUFBWSxFQUFFLENBQUMsUUFEZjtJQUVBLEtBQUEsRUFBTyxTQUZQO0lBR0EsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFKRixDQURGO1NBT0EsRUFBRSxDQUFDLEtBQUgsQ0FBUywyQkFBVCxFQUFzQztJQUFBLElBQUEsRUFBSyxRQUFMO0lBQWUsS0FBQSxFQUFNO0VBQXJCLENBQXRDO0FBZGdDLENBQWQ7O0FBaUJwQixPQUFBOztFQUNFLG9CQURGO0VBRUUsZ0JBRkY7RUFHRSxtQkFIRjtFQUlFLGlCQUpGO0VBS0UsZUFMRjtFQU1FLFVBTkY7RUFPRSxpQkFQRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgeyBjYXBpdGFsaXplIH0gZnJvbSAnbG9kYXNoJ1xuXG5pZiBfX3VzZUNzc01vZHVsZXNfX1xuICByZXF1aXJlIFwiLi4vLi4vc2Fzcy9mb3Jtcy5zY3NzXCJcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBGb3JtIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuZm9ybV9ncm91cF9pbnB1dF9kaXYgPSB0Yy5yZW5kZXJhYmxlIChkYXRhKSAtPlxuICB0Yy5kaXYgJy5mb3JtLWdyb3VwJywgLT5cbiAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgZm9yOmRhdGEuaW5wdXRfaWRcbiAgICAgIGRhdGEubGFiZWxcbiAgICBzZWxlY3RvciA9IFwiIyN7ZGF0YS5pbnB1dF9pZH0uZm9ybS1jb250cm9sXCJcbiAgICBhdHRzID0gZGF0YS5pbnB1dF9hdHRyaWJ1dGVzXG4gICAgaW5wdXRfdHlwZSA9IHRjLmlucHV0XG4gICAgaWYgZGF0YT8uaW5wdXRfdHlwZVxuICAgICAgaW5wdXRfdHlwZSA9IHRjW2RhdGEuaW5wdXRfdHlwZV1cbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHMsIC0+XG4gICAgICAgIHRjLnRleHQgZGF0YT8uY29udGVudFxuICAgIGVsc2VcbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHNcbiAgICB0Yy5kaXYgJy5pbnZhbGlkLWZlZWRiYWNrJ1xuXG5tYWtlX2ZpZWxkX2lucHV0ID0gKGZpZWxkKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgaW5wdXRfaWQ6IFwiaW5wdXRfI3tmaWVsZH1cIlxuICAgICAgbGFiZWw6IGNhcGl0YWxpemUgZmllbGRcbiAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgIG5hbWU6IGZpZWxkXG4gICAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZFxuICAgICAgICB2YWx1ZTogbW9kZWxbZmllbGRdXG4gICAgICAgIGRhdGE6dmFsaWRhdGlvbjogZmllbGRcbiAgICBcbm1ha2VfZmllbGRfdGV4dGFyZWEgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBpbnB1dF90eXBlOiAndGV4dGFyZWEnXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICAgIGRhdGE6dmFsaWRhdGlvbjogZmllbGRcbiAgICAgIGNvbnRlbnQ6IG1vZGVsW2ZpZWxkXVxuXG5tYWtlX2ZpZWxkX3NlbGVjdCA9IChmaWVsZCwgb3B0bGlzdCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgICBmb3I6XCJzZWxlY3RfI3tmaWVsZH1cIlxuICAgICAgY2FwaXRhbGl6ZSBmaWVsZFxuICAgIHRjLnNlbGVjdCAnLmZvcm0tY29udHJvbCcsIG5hbWU6XCJzZWxlY3RfI3tmaWVsZH1cIiwgLT5cbiAgICAgIGZvciBvcHQgaW4gb3B0bGlzdFxuICAgICAgICBpZiBtb2RlbFtmaWVsZF0gaXMgb3B0XG4gICAgICAgICAgdGMub3B0aW9uIHNlbGVjdGVkOm51bGwsIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy5vcHRpb24gdmFsdWU6b3B0LCBvcHRcbiAgICAgICAgICBcbm1ha2VfbG9naW5fZm9ybSA9IChhY3Rpb249Jy9sb2dpbicsIG1ldGhvZD0nUE9TVCcpIC0+XG4gIHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5mb3JtXG4gICAgICByb2xlOidmb3JtJ1xuICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgIGFjdGlvbjogYWN0aW9uLCAtPlxuICAgICAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgICAgIGlucHV0X2lkOiAnaW5wdXRfdXNlcm5hbWUnXG4gICAgICAgICAgbGFiZWw6ICdVc2VyIE5hbWUnXG4gICAgICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgICAgIG5hbWU6ICd1c2VybmFtZSdcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVXNlciBOYW1lJ1xuICAgICAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgICAgIGlucHV0X2lkOiAnaW5wdXRfcGFzc3dvcmQnXG4gICAgICAgICAgbGFiZWw6ICdQYXNzd29yZCdcbiAgICAgICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgbmFtZTogJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgdHlwZTogJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdUeXBlIHlvdXIgcGFzc3dvcmQgaGVyZS4uLi4nXG4gICAgICAgIHRjLmJ1dHRvbiAnLmJ0bi5idG4tc2Vjb25kYXJ5JywgdHlwZTonc3VibWl0JywgJ2xvZ2luJ1xuXG5sb2dpbl9mb3JtID0gbWFrZV9sb2dpbl9mb3JtKClcblxubmFtZV9jb250ZW50X2Zvcm0gPSB0Yy5yZW5kZXJhYmxlIC0+XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9uYW1lJ1xuICAgIGxhYmVsOiAnTmFtZSdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ25hbWUnXG4gICAgICBwbGFjZWhvbGRlcjogJ05hbWUnXG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9jb250ZW50J1xuICAgIGlucHV0X3R5cGU6IHRjLnRleHRhcmVhXG4gICAgbGFiZWw6ICdDb250ZW50J1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAnY29udGVudCdcbiAgICAgIHBsYWNlaG9sZGVyOiAnLi4uJ1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tc2Vjb25kYXJ5LmJ0bi1zbScsIHR5cGU6J3N1Ym1pdCcsIHZhbHVlOidBZGQnXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmV4cG9ydCB7XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gIG1ha2VfZmllbGRfaW5wdXRcbiAgbWFrZV9maWVsZF90ZXh0YXJlYVxuICBtYWtlX2ZpZWxkX3NlbGVjdFxuICBtYWtlX2xvZ2luX2Zvcm1cbiAgbG9naW5fZm9ybVxuICBuYW1lX2NvbnRlbnRfZm9ybVxuICB9XG4gIFxuIl19
