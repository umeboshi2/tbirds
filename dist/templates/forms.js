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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxVQUFBLEVBQUEsZ0JBQUEsRUFBQSxpQkFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sVUFBUCxNQUFBOztBQUVBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsdUJBQVIsRUFERjtDQUpBOzs7OztBQVVBLG9CQUFBLEdBQXVCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtTQUNuQyxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7QUFDcEIsUUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBO0lBQUEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxnQkFBVCxFQUNFO01BQUEsR0FBQSxFQUFJLElBQUksQ0FBQztJQUFULENBREYsRUFFRSxJQUFJLENBQUMsS0FGUDtJQUdBLFFBQUEsR0FBVyxDQUFBLENBQUEsQ0FBQSxDQUFJLElBQUksQ0FBQyxRQUFULENBQWtCLGFBQWxCO0lBQ1gsSUFBQSxHQUFPLElBQUksQ0FBQztJQUNaLFVBQUEsR0FBYSxFQUFFLENBQUM7SUFDaEIsbUJBQUcsSUFBSSxDQUFFLG1CQUFUO01BQ0UsVUFBQSxHQUFhLEVBQUcsQ0FBQSxJQUFJLENBQUMsVUFBTDtNQUNoQixVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUEyQixRQUFBLENBQUEsQ0FBQTtlQUN6QixFQUFFLENBQUMsSUFBSCxnQkFBUSxJQUFJLENBQUUsZ0JBQWQ7TUFEeUIsQ0FBM0IsRUFGRjtLQUFBLE1BQUE7TUFLRSxVQUFBLENBQVcsUUFBWCxFQUFxQixJQUFyQixFQUxGOztXQU1BLEVBQUUsQ0FBQyxHQUFILENBQU8sbUJBQVA7RUFib0IsQ0FBdEI7QUFEbUMsQ0FBZDs7QUFnQnZCLGdCQUFBLEdBQW1CLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDakIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ1osb0JBQUEsQ0FDRTtNQUFBLFFBQUEsRUFBVSxDQUFBLE1BQUEsQ0FBQSxDQUFTLEtBQVQsQ0FBQSxDQUFWO01BQ0EsS0FBQSxFQUFPLFVBQUEsQ0FBVyxLQUFYLENBRFA7TUFFQSxnQkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLEtBQU47UUFDQSxXQUFBLEVBQWEsS0FEYjtRQUVBLEtBQUEsRUFBTyxLQUFNLENBQUEsS0FBQSxDQUZiO1FBR0EsSUFBQSxFQUFLO1VBQUEsVUFBQSxFQUFZO1FBQVo7TUFITDtJQUhGLENBREY7RUFEWSxDQUFkO0FBRGlCOztBQVduQixtQkFBQSxHQUFzQixRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3BCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUNaLG9CQUFBLENBQ0U7TUFBQSxRQUFBLEVBQVUsQ0FBQSxNQUFBLENBQUEsQ0FBUyxLQUFULENBQUEsQ0FBVjtNQUNBLFVBQUEsRUFBWSxVQURaO01BRUEsS0FBQSxFQUFPLFVBQUEsQ0FBVyxLQUFYLENBRlA7TUFHQSxnQkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLEtBQU47UUFDQSxXQUFBLEVBQWEsS0FEYjtRQUVBLElBQUEsRUFBSztVQUFBLFVBQUEsRUFBWTtRQUFaO01BRkwsQ0FKRjtNQU9BLE9BQUEsRUFBUyxLQUFNLENBQUEsS0FBQTtJQVBmLENBREY7RUFEWSxDQUFkO0FBRG9COztBQVl0QixpQkFBQSxHQUFvQixRQUFBLENBQUMsS0FBRCxFQUFRLE9BQVIsQ0FBQTtTQUNsQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDWixFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7TUFDcEIsRUFBRSxDQUFDLEtBQUgsQ0FBUyxnQkFBVCxFQUNFO1FBQUEsR0FBQSxFQUFJLENBQUEsT0FBQSxDQUFBLENBQVUsS0FBVixDQUFBO01BQUosQ0FERjthQUVBLFVBQUEsQ0FBVyxLQUFYO0lBSG9CLENBQXRCO1dBSUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxlQUFWLEVBQTJCO01BQUEsSUFBQSxFQUFLLENBQUEsT0FBQSxDQUFBLENBQVUsS0FBVixDQUFBO0lBQUwsQ0FBM0IsRUFBbUQsUUFBQSxDQUFBLENBQUE7QUFDakQsVUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBO01BQUEsS0FBQSx5Q0FBQTs7UUFDRSxJQUFHLEtBQU0sQ0FBQSxLQUFBLENBQU4sS0FBZ0IsR0FBbkI7dUJBQ0UsRUFBRSxDQUFDLE1BQUgsQ0FBVTtZQUFBLFFBQUEsRUFBUyxJQUFUO1lBQWUsS0FBQSxFQUFNO1VBQXJCLENBQVYsRUFBb0MsR0FBcEMsR0FERjtTQUFBLE1BQUE7dUJBR0UsRUFBRSxDQUFDLE1BQUgsQ0FBVTtZQUFBLEtBQUEsRUFBTTtVQUFOLENBQVYsRUFBcUIsR0FBckIsR0FIRjs7TUFERixDQUFBOztJQURpRCxDQUFuRDtFQUxZLENBQWQ7QUFEa0I7O0FBYXBCLGVBQUEsR0FBa0IsUUFBQSxDQUFDLFNBQU8sUUFBUixFQUFrQixTQUFPLE1BQXpCLENBQUE7U0FDaEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUNaLEVBQUUsQ0FBQyxJQUFILENBQ0U7TUFBQSxJQUFBLEVBQUssTUFBTDtNQUNBLE1BQUEsRUFBUSxNQURSO01BRUEsTUFBQSxFQUFRO0lBRlIsQ0FERixFQUdrQixRQUFBLENBQUEsQ0FBQTtNQUNkLG9CQUFBLENBQ0U7UUFBQSxRQUFBLEVBQVUsZ0JBQVY7UUFDQSxLQUFBLEVBQU8sV0FEUDtRQUVBLGdCQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU0sVUFBTjtVQUNBLFdBQUEsRUFBYTtRQURiO01BSEYsQ0FERjtNQU1BLG9CQUFBLENBQ0U7UUFBQSxRQUFBLEVBQVUsZ0JBQVY7UUFDQSxLQUFBLEVBQU8sVUFEUDtRQUVBLGdCQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU0sVUFBTjtVQUNBLElBQUEsRUFBTSxVQUROO1VBRUEsV0FBQSxFQUFhO1FBRmI7TUFIRixDQURGO2FBT0EsRUFBRSxDQUFDLE1BQUgsQ0FBVSxvQkFBVixFQUFnQztRQUFBLElBQUEsRUFBSztNQUFMLENBQWhDLEVBQStDLE9BQS9DO0lBZGMsQ0FIbEI7RUFEWSxDQUFkO0FBRGdCOztBQXFCbEIsVUFBQSxHQUFhLGVBQUEsQ0FBQTs7QUFFYixpQkFBQSxHQUFvQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0VBQ2hDLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsWUFBVjtJQUNBLEtBQUEsRUFBTyxNQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsV0FBQSxFQUFhO0lBRGI7RUFIRixDQURGO0VBTUEsb0JBQUEsQ0FDRTtJQUFBLFFBQUEsRUFBVSxlQUFWO0lBQ0EsVUFBQSxFQUFZLEVBQUUsQ0FBQyxRQURmO0lBRUEsS0FBQSxFQUFPLFNBRlA7SUFHQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLFNBQU47TUFDQSxXQUFBLEVBQWE7SUFEYjtFQUpGLENBREY7U0FPQSxFQUFFLENBQUMsS0FBSCxDQUFTLDJCQUFULEVBQXNDO0lBQUEsSUFBQSxFQUFLLFFBQUw7SUFBZSxLQUFBLEVBQU07RUFBckIsQ0FBdEM7QUFkZ0MsQ0FBZDs7QUFpQnBCLE9BQUE7O0VBQ0Usb0JBREY7RUFFRSxnQkFGRjtFQUdFLG1CQUhGO0VBSUUsaUJBSkY7RUFLRSxlQUxGO0VBTUUsVUFORjtFQU9FLGlCQVBGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi4vdXRpbC9jYXBpdGFsaXplJ1xuXG5pZiBfX3VzZUNzc01vZHVsZXNfX1xuICByZXF1aXJlIFwiLi4vLi4vc2Fzcy9mb3Jtcy5zY3NzXCJcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBGb3JtIFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuZm9ybV9ncm91cF9pbnB1dF9kaXYgPSB0Yy5yZW5kZXJhYmxlIChkYXRhKSAtPlxuICB0Yy5kaXYgJy5mb3JtLWdyb3VwJywgLT5cbiAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgZm9yOmRhdGEuaW5wdXRfaWRcbiAgICAgIGRhdGEubGFiZWxcbiAgICBzZWxlY3RvciA9IFwiIyN7ZGF0YS5pbnB1dF9pZH0uZm9ybS1jb250cm9sXCJcbiAgICBhdHRzID0gZGF0YS5pbnB1dF9hdHRyaWJ1dGVzXG4gICAgaW5wdXRfdHlwZSA9IHRjLmlucHV0XG4gICAgaWYgZGF0YT8uaW5wdXRfdHlwZVxuICAgICAgaW5wdXRfdHlwZSA9IHRjW2RhdGEuaW5wdXRfdHlwZV1cbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHMsIC0+XG4gICAgICAgIHRjLnRleHQgZGF0YT8uY29udGVudFxuICAgIGVsc2VcbiAgICAgIGlucHV0X3R5cGUgc2VsZWN0b3IsIGF0dHNcbiAgICB0Yy5kaXYgJy5pbnZhbGlkLWZlZWRiYWNrJ1xuXG5tYWtlX2ZpZWxkX2lucHV0ID0gKGZpZWxkKSAtPlxuICB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgaW5wdXRfaWQ6IFwiaW5wdXRfI3tmaWVsZH1cIlxuICAgICAgbGFiZWw6IGNhcGl0YWxpemUgZmllbGRcbiAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgIG5hbWU6IGZpZWxkXG4gICAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZFxuICAgICAgICB2YWx1ZTogbW9kZWxbZmllbGRdXG4gICAgICAgIGRhdGE6dmFsaWRhdGlvbjogZmllbGRcbiAgICBcbm1ha2VfZmllbGRfdGV4dGFyZWEgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBpbnB1dF90eXBlOiAndGV4dGFyZWEnXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICAgIGRhdGE6dmFsaWRhdGlvbjogZmllbGRcbiAgICAgIGNvbnRlbnQ6IG1vZGVsW2ZpZWxkXVxuXG5tYWtlX2ZpZWxkX3NlbGVjdCA9IChmaWVsZCwgb3B0bGlzdCkgLT5cbiAgdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgICB0Yy5sYWJlbCAnLmNvbnRyb2wtbGFiZWwnLFxuICAgICAgICBmb3I6XCJzZWxlY3RfI3tmaWVsZH1cIlxuICAgICAgY2FwaXRhbGl6ZSBmaWVsZFxuICAgIHRjLnNlbGVjdCAnLmZvcm0tY29udHJvbCcsIG5hbWU6XCJzZWxlY3RfI3tmaWVsZH1cIiwgLT5cbiAgICAgIGZvciBvcHQgaW4gb3B0bGlzdFxuICAgICAgICBpZiBtb2RlbFtmaWVsZF0gaXMgb3B0XG4gICAgICAgICAgdGMub3B0aW9uIHNlbGVjdGVkOm51bGwsIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy5vcHRpb24gdmFsdWU6b3B0LCBvcHRcbiAgICAgICAgICBcbm1ha2VfbG9naW5fZm9ybSA9IChhY3Rpb249Jy9sb2dpbicsIG1ldGhvZD0nUE9TVCcpIC0+XG4gIHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5mb3JtXG4gICAgICByb2xlOidmb3JtJ1xuICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgIGFjdGlvbjogYWN0aW9uLCAtPlxuICAgICAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgICAgIGlucHV0X2lkOiAnaW5wdXRfdXNlcm5hbWUnXG4gICAgICAgICAgbGFiZWw6ICdVc2VyIE5hbWUnXG4gICAgICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgICAgIG5hbWU6ICd1c2VybmFtZSdcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVXNlciBOYW1lJ1xuICAgICAgICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgICAgICAgIGlucHV0X2lkOiAnaW5wdXRfcGFzc3dvcmQnXG4gICAgICAgICAgbGFiZWw6ICdQYXNzd29yZCdcbiAgICAgICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgbmFtZTogJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgdHlwZTogJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdUeXBlIHlvdXIgcGFzc3dvcmQgaGVyZS4uLi4nXG4gICAgICAgIHRjLmJ1dHRvbiAnLmJ0bi5idG4tc2Vjb25kYXJ5JywgdHlwZTonc3VibWl0JywgJ2xvZ2luJ1xuXG5sb2dpbl9mb3JtID0gbWFrZV9sb2dpbl9mb3JtKClcblxubmFtZV9jb250ZW50X2Zvcm0gPSB0Yy5yZW5kZXJhYmxlIC0+XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9uYW1lJ1xuICAgIGxhYmVsOiAnTmFtZSdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ25hbWUnXG4gICAgICBwbGFjZWhvbGRlcjogJ05hbWUnXG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9jb250ZW50J1xuICAgIGlucHV0X3R5cGU6IHRjLnRleHRhcmVhXG4gICAgbGFiZWw6ICdDb250ZW50J1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAnY29udGVudCdcbiAgICAgIHBsYWNlaG9sZGVyOiAnLi4uJ1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tc2Vjb25kYXJ5LmJ0bi1zbScsIHR5cGU6J3N1Ym1pdCcsIHZhbHVlOidBZGQnXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmV4cG9ydCB7XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gIG1ha2VfZmllbGRfaW5wdXRcbiAgbWFrZV9maWVsZF90ZXh0YXJlYVxuICBtYWtlX2ZpZWxkX3NlbGVjdFxuICBtYWtlX2xvZ2luX2Zvcm1cbiAgbG9naW5fZm9ybVxuICBuYW1lX2NvbnRlbnRfZm9ybVxuICB9XG4gIFxuIl19
