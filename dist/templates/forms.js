var capitalize, form_group_input_div, login_form, make_field_input, make_field_select, make_field_textarea, make_login_form, name_content_form, tc;

tc = require('teacup');

capitalize = require('../util/capitalize');

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

//#######################################
module.exports = {
  form_group_input_div: form_group_input_div,
  make_field_input: make_field_input,
  make_field_textarea: make_field_textarea,
  make_field_select: make_field_select,
  make_login_form: make_login_form,
  login_form: login_form,
  name_content_form: name_content_form
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Zvcm1zLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZm9ybXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsVUFBQSxFQUFBLG9CQUFBLEVBQUEsVUFBQSxFQUFBLGdCQUFBLEVBQUEsaUJBQUEsRUFBQSxtQkFBQSxFQUFBLGVBQUEsRUFBQSxpQkFBQSxFQUFBOztBQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxVQUFBLEdBQWEsT0FBQSxDQUFRLG9CQUFSLEVBRmI7Ozs7O0FBUUEsb0JBQUEsR0FBdUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsSUFBRCxDQUFBO1NBQ25DLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtBQUNwQixRQUFBLElBQUEsRUFBQSxVQUFBLEVBQUE7SUFBQSxFQUFFLENBQUMsS0FBSCxDQUFTLGdCQUFULEVBQ0U7TUFBQSxHQUFBLEVBQUksSUFBSSxDQUFDO0lBQVQsQ0FERixFQUVFLElBQUksQ0FBQyxLQUZQO0lBR0EsUUFBQSxHQUFXLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBSSxDQUFDLFFBQVQsQ0FBa0IsYUFBbEI7SUFDWCxJQUFBLEdBQU8sSUFBSSxDQUFDO0lBQ1osVUFBQSxHQUFhLEVBQUUsQ0FBQztJQUNoQixtQkFBRyxJQUFJLENBQUUsbUJBQVQ7TUFDRSxVQUFBLEdBQWEsRUFBRyxDQUFBLElBQUksQ0FBQyxVQUFMO2FBQ2hCLFVBQUEsQ0FBVyxRQUFYLEVBQXFCLElBQXJCLEVBQTJCLFFBQUEsQ0FBQSxDQUFBO2VBQ3pCLEVBQUUsQ0FBQyxJQUFILGdCQUFRLElBQUksQ0FBRSxnQkFBZDtNQUR5QixDQUEzQixFQUZGO0tBQUEsTUFBQTthQUtFLFVBQUEsQ0FBVyxRQUFYLEVBQXFCLElBQXJCLEVBTEY7O0VBUG9CLENBQXRCO0FBRG1DLENBQWQ7O0FBZXZCLGdCQUFBLEdBQW1CLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDakIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ1osb0JBQUEsQ0FDRTtNQUFBLFFBQUEsRUFBVSxDQUFBLE1BQUEsQ0FBQSxDQUFTLEtBQVQsQ0FBQSxDQUFWO01BQ0EsS0FBQSxFQUFPLFVBQUEsQ0FBVyxLQUFYLENBRFA7TUFFQSxnQkFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLEtBQU47UUFDQSxXQUFBLEVBQWEsS0FEYjtRQUVBLEtBQUEsRUFBTyxLQUFNLENBQUEsS0FBQTtNQUZiO0lBSEYsQ0FERjtFQURZLENBQWQ7QUFEaUI7O0FBVW5CLG1CQUFBLEdBQXNCLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDcEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ1osb0JBQUEsQ0FDRTtNQUFBLFFBQUEsRUFBVSxDQUFBLE1BQUEsQ0FBQSxDQUFTLEtBQVQsQ0FBQSxDQUFWO01BQ0EsVUFBQSxFQUFZLFVBRFo7TUFFQSxLQUFBLEVBQU8sVUFBQSxDQUFXLEtBQVgsQ0FGUDtNQUdBLGdCQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sS0FBTjtRQUNBLFdBQUEsRUFBYTtNQURiLENBSkY7TUFNQSxPQUFBLEVBQVMsS0FBTSxDQUFBLEtBQUE7SUFOZixDQURGO0VBRFksQ0FBZDtBQURvQjs7QUFXdEIsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQUE7U0FDbEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ1osRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLFFBQUEsQ0FBQSxDQUFBO01BQ3BCLEVBQUUsQ0FBQyxLQUFILENBQVMsZ0JBQVQsRUFDRTtRQUFBLEdBQUEsRUFBSSxDQUFBLE9BQUEsQ0FBQSxDQUFVLEtBQVYsQ0FBQTtNQUFKLENBREY7YUFFQSxVQUFBLENBQVcsS0FBWDtJQUhvQixDQUF0QjtXQUlBLEVBQUUsQ0FBQyxNQUFILENBQVUsZUFBVixFQUEyQjtNQUFBLElBQUEsRUFBSyxDQUFBLE9BQUEsQ0FBQSxDQUFVLEtBQVYsQ0FBQTtJQUFMLENBQTNCLEVBQW1ELFFBQUEsQ0FBQSxDQUFBO0FBQ2pELFVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQTtNQUFBLEtBQUEseUNBQUE7O1FBQ0UsSUFBRyxLQUFNLENBQUEsS0FBQSxDQUFOLEtBQWdCLEdBQW5CO3VCQUNFLEVBQUUsQ0FBQyxNQUFILENBQVU7WUFBQSxRQUFBLEVBQVMsSUFBVDtZQUFlLEtBQUEsRUFBTTtVQUFyQixDQUFWLEVBQW9DLEdBQXBDLEdBREY7U0FBQSxNQUFBO3VCQUdFLEVBQUUsQ0FBQyxNQUFILENBQVU7WUFBQSxLQUFBLEVBQU07VUFBTixDQUFWLEVBQXFCLEdBQXJCLEdBSEY7O01BREYsQ0FBQTs7SUFEaUQsQ0FBbkQ7RUFMWSxDQUFkO0FBRGtCOztBQWFwQixlQUFBLEdBQWtCLFFBQUEsQ0FBQyxTQUFPLFFBQVIsRUFBa0IsU0FBTyxNQUF6QixDQUFBO1NBQ2hCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtXQUNaLEVBQUUsQ0FBQyxJQUFILENBQ0U7TUFBQSxJQUFBLEVBQUssTUFBTDtNQUNBLE1BQUEsRUFBUSxNQURSO01BRUEsTUFBQSxFQUFRO0lBRlIsQ0FERixFQUdrQixRQUFBLENBQUEsQ0FBQTtNQUNkLG9CQUFBLENBQ0U7UUFBQSxRQUFBLEVBQVUsZ0JBQVY7UUFDQSxLQUFBLEVBQU8sV0FEUDtRQUVBLGdCQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU0sVUFBTjtVQUNBLFdBQUEsRUFBYTtRQURiO01BSEYsQ0FERjtNQU1BLG9CQUFBLENBQ0U7UUFBQSxRQUFBLEVBQVUsZ0JBQVY7UUFDQSxLQUFBLEVBQU8sVUFEUDtRQUVBLGdCQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU0sVUFBTjtVQUNBLElBQUEsRUFBTSxVQUROO1VBRUEsV0FBQSxFQUFhO1FBRmI7TUFIRixDQURGO2FBT0EsRUFBRSxDQUFDLE1BQUgsQ0FBVSxrQkFBVixFQUE4QjtRQUFBLElBQUEsRUFBSztNQUFMLENBQTlCLEVBQTZDLE9BQTdDO0lBZGMsQ0FIbEI7RUFEWSxDQUFkO0FBRGdCOztBQXFCbEIsVUFBQSxHQUFhLGVBQUEsQ0FBQTs7QUFFYixpQkFBQSxHQUFvQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7RUFDaEMsb0JBQUEsQ0FDRTtJQUFBLFFBQUEsRUFBVSxZQUFWO0lBQ0EsS0FBQSxFQUFPLE1BRFA7SUFFQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxXQUFBLEVBQWE7SUFEYjtFQUhGLENBREY7RUFNQSxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLGVBQVY7SUFDQSxVQUFBLEVBQVksRUFBRSxDQUFDLFFBRGY7SUFFQSxLQUFBLEVBQU8sU0FGUDtJQUdBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLFdBQUEsRUFBYTtJQURiO0VBSkYsQ0FERjtTQU9BLEVBQUUsQ0FBQyxLQUFILENBQVMseUJBQVQsRUFBb0M7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLEtBQUEsRUFBTTtFQUFyQixDQUFwQztBQWRnQyxDQUFkLEVBaEZwQjs7O0FBaUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxvQkFBQSxFQUFzQixvQkFBdEI7RUFDQSxnQkFBQSxFQUFrQixnQkFEbEI7RUFFQSxtQkFBQSxFQUFxQixtQkFGckI7RUFHQSxpQkFBQSxFQUFtQixpQkFIbkI7RUFJQSxlQUFBLEVBQWlCLGVBSmpCO0VBS0EsVUFBQSxFQUFZLFVBTFo7RUFNQSxpQkFBQSxFQUFtQjtBQU5uQiIsInNvdXJjZXNDb250ZW50IjpbInRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5jYXBpdGFsaXplID0gcmVxdWlyZSAnLi4vdXRpbC9jYXBpdGFsaXplJ1xuXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgRm9ybSBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmZvcm1fZ3JvdXBfaW5wdXRfZGl2ID0gdGMucmVuZGVyYWJsZSAoZGF0YSkgLT5cbiAgdGMuZGl2ICcuZm9ybS1ncm91cCcsIC0+XG4gICAgdGMubGFiZWwgJy5jb250cm9sLWxhYmVsJyxcbiAgICAgIGZvcjpkYXRhLmlucHV0X2lkXG4gICAgICBkYXRhLmxhYmVsXG4gICAgc2VsZWN0b3IgPSBcIiMje2RhdGEuaW5wdXRfaWR9LmZvcm0tY29udHJvbFwiXG4gICAgYXR0cyA9IGRhdGEuaW5wdXRfYXR0cmlidXRlc1xuICAgIGlucHV0X3R5cGUgPSB0Yy5pbnB1dFxuICAgIGlmIGRhdGE/LmlucHV0X3R5cGVcbiAgICAgIGlucHV0X3R5cGUgPSB0Y1tkYXRhLmlucHV0X3R5cGVdXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzLCAtPlxuICAgICAgICB0Yy50ZXh0IGRhdGE/LmNvbnRlbnRcbiAgICBlbHNlXG4gICAgICBpbnB1dF90eXBlIHNlbGVjdG9yLCBhdHRzXG5cbm1ha2VfZmllbGRfaW5wdXQgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICAgIHZhbHVlOiBtb2RlbFtmaWVsZF1cbiAgICBcbm1ha2VfZmllbGRfdGV4dGFyZWEgPSAoZmllbGQpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICBpbnB1dF9pZDogXCJpbnB1dF8je2ZpZWxkfVwiXG4gICAgICBpbnB1dF90eXBlOiAndGV4dGFyZWEnXG4gICAgICBsYWJlbDogY2FwaXRhbGl6ZSBmaWVsZFxuICAgICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgICAgbmFtZTogZmllbGRcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZpZWxkXG4gICAgICBjb250ZW50OiBtb2RlbFtmaWVsZF1cblxubWFrZV9maWVsZF9zZWxlY3QgPSAoZmllbGQsIG9wdGxpc3QpIC0+XG4gIHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLmZvcm0tZ3JvdXAnLCAtPlxuICAgICAgdGMubGFiZWwgJy5jb250cm9sLWxhYmVsJyxcbiAgICAgICAgZm9yOlwic2VsZWN0XyN7ZmllbGR9XCJcbiAgICAgIGNhcGl0YWxpemUgZmllbGRcbiAgICB0Yy5zZWxlY3QgJy5mb3JtLWNvbnRyb2wnLCBuYW1lOlwic2VsZWN0XyN7ZmllbGR9XCIsIC0+XG4gICAgICBmb3Igb3B0IGluIG9wdGxpc3RcbiAgICAgICAgaWYgbW9kZWxbZmllbGRdIGlzIG9wdFxuICAgICAgICAgIHRjLm9wdGlvbiBzZWxlY3RlZDpudWxsLCB2YWx1ZTpvcHQsIG9wdFxuICAgICAgICBlbHNlXG4gICAgICAgICAgdGMub3B0aW9uIHZhbHVlOm9wdCwgb3B0XG4gICAgICAgICAgXG5tYWtlX2xvZ2luX2Zvcm0gPSAoYWN0aW9uPScvbG9naW4nLCBtZXRob2Q9J1BPU1QnKSAtPlxuICB0Yy5yZW5kZXJhYmxlICh1c2VyKSAtPlxuICAgIHRjLmZvcm1cbiAgICAgIHJvbGU6J2Zvcm0nXG4gICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgYWN0aW9uOiBhY3Rpb24sIC0+XG4gICAgICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICAgICAgaW5wdXRfaWQ6ICdpbnB1dF91c2VybmFtZSdcbiAgICAgICAgICBsYWJlbDogJ1VzZXIgTmFtZSdcbiAgICAgICAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgbmFtZTogJ3VzZXJuYW1lJ1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdVc2VyIE5hbWUnXG4gICAgICAgIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgICAgICAgaW5wdXRfaWQ6ICdpbnB1dF9wYXNzd29yZCdcbiAgICAgICAgICBsYWJlbDogJ1Bhc3N3b3JkJ1xuICAgICAgICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICAgICAgICBuYW1lOiAncGFzc3dvcmQnXG4gICAgICAgICAgICB0eXBlOiAncGFzc3dvcmQnXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1R5cGUgeW91ciBwYXNzd29yZCBoZXJlLi4uLidcbiAgICAgICAgdGMuYnV0dG9uICcuYnRuLmJ0bi1kZWZhdWx0JywgdHlwZTonc3VibWl0JywgJ2xvZ2luJ1xuXG5sb2dpbl9mb3JtID0gbWFrZV9sb2dpbl9mb3JtKClcblxubmFtZV9jb250ZW50X2Zvcm0gPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X25hbWUnXG4gICAgbGFiZWw6ICdOYW1lJ1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAnbmFtZSdcbiAgICAgIHBsYWNlaG9sZGVyOiAnTmFtZSdcbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X2NvbnRlbnQnXG4gICAgaW5wdXRfdHlwZTogdGMudGV4dGFyZWFcbiAgICBsYWJlbDogJ0NvbnRlbnQnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICdjb250ZW50J1xuICAgICAgcGxhY2Vob2xkZXI6ICcuLi4nXG4gIHRjLmlucHV0ICcuYnRuLmJ0bi1kZWZhdWx0LmJ0bi14cycsIHR5cGU6J3N1Ym1pdCcsIHZhbHVlOidBZGQnXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzID1cbiAgZm9ybV9ncm91cF9pbnB1dF9kaXY6IGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gIG1ha2VfZmllbGRfaW5wdXQ6IG1ha2VfZmllbGRfaW5wdXRcbiAgbWFrZV9maWVsZF90ZXh0YXJlYTogbWFrZV9maWVsZF90ZXh0YXJlYVxuICBtYWtlX2ZpZWxkX3NlbGVjdDogbWFrZV9maWVsZF9zZWxlY3RcbiAgbWFrZV9sb2dpbl9mb3JtOiBtYWtlX2xvZ2luX2Zvcm1cbiAgbG9naW5fZm9ybTogbG9naW5fZm9ybVxuICBuYW1lX2NvbnRlbnRfZm9ybTogbmFtZV9jb250ZW50X2Zvcm1cbiJdfQ==
