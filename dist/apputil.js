var $, Backbone, _, camel_to_kebab, capitalize, create_model, create_new_approuter, get_model, handle_newlines, make_field_input_ui, make_json_post, make_json_post_settings, navbar_color_handlers, navbar_set_active, navigate_to_url, newline_2_br, random_choice, remove_trailing_slashes, scroll_top_fast, scroll_top_fast_jquery, string_endswith, string_startswith;

$ = require('jquery');

_ = require('underscore');

Backbone = require('backbone');

camel_to_kebab = function(str) {
  return str.replace(/([A-Z])/g, function($1) {
    return "-" + ($1.toLowerCase());
  });
};

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

create_model = function(collection, options) {
  var key, model, value;
  model = collection.create();
  for (key in options) {
    value = options[key];
    model.set(key, value);
  }
  collection.add(model);
  return collection.save();
};

create_new_approuter = function(channel, Router, Controller) {
  var controller, router;
  controller = new Controller;
  channel.reply('main-controller', function() {
    return controller;
  });
  router = new Router({
    controller: controller
  });
  return router;
};

get_model = function(collection, id) {
  var model;
  model = collection.get(id);
  if (model === void 0) {
    return new collection.model({
      id: id
    });
  } else {
    return model;
  }
};

handle_newlines = function(str) {
  console.warn("handle_newlines being replaced by newline_2_br");
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

make_field_input_ui = function(fieldlist) {
  var field, i, len, uiobject;
  uiobject = {};
  for (i = 0, len = fieldlist.length; i < len; i++) {
    field = fieldlist[i];
    uiobject[field] = "input[name=\"" + field + "\"]";
  }
  return uiobject;
};

make_json_post_settings = function(url, data, type) {
  var settings;
  if (type == null) {
    type = 'POST';
  }
  settings = {
    type: type,
    url: url,
    data: JSON.stringify(data),
    accepts: 'application/json',
    contentType: 'application/json'
  };
  return settings;
};

make_json_post = function(url, data, type) {
  var settings;
  if (type == null) {
    type = 'POST';
  }
  settings = make_json_post_settings(url, data, type);
  return $.ajax(settings);
};

navbar_color_handlers = function(channel, selector) {
  channel.reply('get-navbar-color', function() {
    var navbar;
    navbar = $(selector);
    return navbar.css('color');
  });
  return channel.reply('get-navbar-bg-color', function() {
    var navbar;
    navbar = $(selector);
    return navbar.css('background-color');
  });
};

navbar_set_active = function(path) {
  var i, len, li, liq, path_top, ref, results;
  path_top = path.split('/')[0];
  ref = $('#navbar-view li');
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    li = ref[i];
    liq = $(li);
    liq.removeClass('active');
    if (path_top === liq.attr('appname')) {
      results.push(liq.addClass('active'));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

navigate_to_url = function(url) {
  var r;
  if (url.split('/')[0] === '') {
    return window.location = url;
  } else {
    r = new Backbone.Router;
    return r.navigate(url, {
      trigger: true
    });
  }
};

newline_2_br = function(str) {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

random_choice = function(myArray) {
  var index;
  index = Math.floor(Math.random() * myArray.length);
  return myArray[index];
};

remove_trailing_slashes = function(path) {
  return path.replace(/\/$/, "");
};

scroll_top_fast = function() {
  return window.scrollTo(0, 0);
};

scroll_top_fast_jquery = function() {
  return $('html, body').animate({
    scrollTop: 0
  }, 'fast');
};

string_endswith = function(searchString, position) {
  var lastIndex, subjectString;
  subjectString = this.toString();
  if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
    position = subjectString.length;
  }
  position -= searchString.length;
  lastIndex = subjectString.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

string_startswith = function(searchString, position) {
  position = position || 0;
  return this.substr(position, searchString, position) === searchString;
};

module.exports = {
  camel_to_kebab: camel_to_kebab,
  capitalize: capitalize,
  create_model: create_model,
  create_new_approuter: create_new_approuter,
  get_model: get_model,
  handle_newlines: handle_newlines,
  make_field_input_ui: make_field_input_ui,
  make_json_post_settings: make_json_post_settings,
  make_json_post: make_json_post,
  navbar_color_handlers: navbar_color_handlers,
  navbar_set_active: navbar_set_active,
  navigate_to_url: navigate_to_url,
  random_choice: random_choice,
  remove_trailing_slashes: remove_trailing_slashes,
  scroll_top_fast: scroll_top_fast,
  scroll_top_fast_jquery: scroll_top_fast_jquery,
  string_endswith: string_endswith,
  string_startswith: string_startswith
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwdXRpbC5qcyIsInNvdXJjZXMiOlsiYXBwdXRpbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSOztBQUNKLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFLWCxjQUFBLEdBQWlCLFNBQUMsR0FBRDtTQUNmLEdBQUcsQ0FBQyxPQUFKLENBQVksVUFBWixFQUF3QixTQUFDLEVBQUQ7V0FBUSxHQUFBLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBSCxDQUFBLENBQUQ7RUFBWCxDQUF4QjtBQURlOztBQUdqQixVQUFBLEdBQWEsU0FBQyxHQUFEO1NBQ1gsR0FBRyxDQUFDLE1BQUosQ0FBVyxDQUFYLENBQWEsQ0FBQyxXQUFkLENBQUEsQ0FBQSxHQUE4QixHQUFHLENBQUMsS0FBSixDQUFVLENBQVY7QUFEbkI7O0FBR2IsWUFBQSxHQUFlLFNBQUMsVUFBRCxFQUFhLE9BQWI7QUFDYixNQUFBO0VBQUEsS0FBQSxHQUFRLFVBQVUsQ0FBQyxNQUFYLENBQUE7QUFDUixPQUFBLGNBQUE7O0lBQ0UsS0FBSyxDQUFDLEdBQU4sQ0FBVSxHQUFWLEVBQWUsS0FBZjtBQURGO0VBRUEsVUFBVSxDQUFDLEdBQVgsQ0FBZSxLQUFmO1NBQ0EsVUFBVSxDQUFDLElBQVgsQ0FBQTtBQUxhOztBQU9mLG9CQUFBLEdBQXVCLFNBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsVUFBbEI7QUFDckIsTUFBQTtFQUFBLFVBQUEsR0FBYSxJQUFJO0VBQ2pCLE9BQU8sQ0FBQyxLQUFSLENBQWMsaUJBQWQsRUFBaUMsU0FBQTtXQUMvQjtFQUQrQixDQUFqQztFQUVBLE1BQUEsR0FBUyxJQUFJLE1BQUosQ0FDUDtJQUFBLFVBQUEsRUFBWSxVQUFaO0dBRE87U0FFVDtBQU5xQjs7QUFRdkIsU0FBQSxHQUFZLFNBQUMsVUFBRCxFQUFhLEVBQWI7QUFDVixNQUFBO0VB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Z0IsY0FBaEI7RUFDQSxVQUFBLEVBQVksVUFEWjtFQUVBLFlBQUEsRUFBYyxZQUZkO0VBR0Esb0JBQUEsRUFBc0Isb0JBSHRCO0VBSUEsU0FBQSxFQUFXLFNBSlg7RUFLQSxlQUFBLEVBQWlCLGVBTGpCO0VBTUEsbUJBQUEsRUFBcUIsbUJBTnJCO0VBT0EsdUJBQUEsRUFBeUIsdUJBUHpCO0VBUUEsY0FBQSxFQUFnQixjQVJoQjtFQVNBLHFCQUFBLEVBQXVCLHFCQVR2QjtFQVVBLGlCQUFBLEVBQW1CLGlCQVZuQjtFQVdBLGVBQUEsRUFBaUIsZUFYakI7RUFZQSxhQUFBLEVBQWUsYUFaZjtFQWFBLHVCQUFBLEVBQXlCLHVCQWJ6QjtFQWNBLGVBQUEsRUFBaUIsZUFkakI7RUFlQSxzQkFBQSxFQUF3QixzQkFmeEI7RUFnQkEsZUFBQSxFQUFpQixlQWhCakI7RUFpQkEsaUJBQUEsRUFBbUIsaUJBakJuQiIsInNvdXJjZXNDb250ZW50IjpbIiQgPSByZXF1aXJlICdqcXVlcnknXG5fID0gcmVxdWlyZSAndW5kZXJzY29yZSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5cblxuXG4jaHR0cHM6Ly9naXRodWIuY29tL2dvb2RlZ2dzL3RlYWN1cC1jYW1lbC10by1rZWJhYlxuY2FtZWxfdG9fa2ViYWIgPSAoc3RyKSAtPlxuICBzdHIucmVwbGFjZSgvKFtBLVpdKS9nLCAoJDEpIC0+IFwiLSN7JDEudG9Mb3dlckNhc2UoKX1cIilcblxuY2FwaXRhbGl6ZSA9IChzdHIpIC0+XG4gIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxuXG5jcmVhdGVfbW9kZWwgPSAoY29sbGVjdGlvbiwgb3B0aW9ucykgLT5cbiAgbW9kZWwgPSBjb2xsZWN0aW9uLmNyZWF0ZSgpXG4gIGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcbiAgICBtb2RlbC5zZXQga2V5LCB2YWx1ZVxuICBjb2xsZWN0aW9uLmFkZCBtb2RlbFxuICBjb2xsZWN0aW9uLnNhdmUoKVxuXG5jcmVhdGVfbmV3X2FwcHJvdXRlciA9IChjaGFubmVsLCBSb3V0ZXIsIENvbnRyb2xsZXIpIC0+XG4gIGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlclxuICBjaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIGNvbnRyb2xsZXJcbiAgcm91dGVyID0gbmV3IFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgcm91dGVyXG4gIFxuZ2V0X21vZGVsID0gKGNvbGxlY3Rpb24sIGlkKSAtPlxuICBtb2RlbCA9IGNvbGxlY3Rpb24uZ2V0IGlkXG4gIGlmIG1vZGVsIGlzIHVuZGVmaW5lZFxuICAgIG5ldyBjb2xsZWN0aW9uLm1vZGVsXG4gICAgICBpZDogaWRcbiAgZWxzZVxuICAgIG1vZGVsXG4gIFxuaGFuZGxlX25ld2xpbmVzID0gKHN0cikgLT5cbiAgY29uc29sZS53YXJuIFwiaGFuZGxlX25ld2xpbmVzIGJlaW5nIHJlcGxhY2VkIGJ5IG5ld2xpbmVfMl9iclwiXG4gIHN0ci5yZXBsYWNlKC8oPzpcXHJcXG58XFxyfFxcbikvZywgJzxiciAvPicpXG5cbm1ha2VfZmllbGRfaW5wdXRfdWkgPSAoZmllbGRsaXN0KSAtPlxuICB1aW9iamVjdCA9IHt9XG4gIGZvciBmaWVsZCBpbiBmaWVsZGxpc3RcbiAgICB1aW9iamVjdFtmaWVsZF0gPSBcImlucHV0W25hbWU9XFxcIiN7ZmllbGR9XFxcIl1cIlxuICByZXR1cm4gdWlvYmplY3RcblxubWFrZV9qc29uX3Bvc3Rfc2V0dGluZ3MgPSAodXJsLCBkYXRhLCB0eXBlPSdQT1NUJykgLT5cbiAgc2V0dGluZ3MgPVxuICAgIHR5cGU6IHR5cGVcbiAgICB1cmw6IHVybFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5IGRhdGFcbiAgICBhY2NlcHRzOiAnYXBwbGljYXRpb24vanNvbidcbiAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIHJldHVybiBzZXR0aW5nc1xuXG5tYWtlX2pzb25fcG9zdCA9ICh1cmwsIGRhdGEsIHR5cGU9J1BPU1QnKSAtPlxuICBzZXR0aW5ncyA9IG1ha2VfanNvbl9wb3N0X3NldHRpbmdzIHVybCwgZGF0YSwgdHlwZVxuICAkLmFqYXggc2V0dGluZ3NcblxuIyBUaGVzZSBhcmUgaGFuZGxlcnMgdG8gcmV0cmlldmUgdGhlIGNvbG9yc1xuIyBmcm9tIHRoZSBuYXZiYXJzLCBhbmQgYXJlIHVzZWQgdG8gY3JlYXRlXG4jIHRoZSBkZWZhdWx0IGNvbG9yIGZvciB0aGUgZnVsbGNhbGVuZGFyXG4jIGV2ZW50cy5cbm5hdmJhcl9jb2xvcl9oYW5kbGVycyA9IChjaGFubmVsLCBzZWxlY3RvcikgLT5cbiAgY2hhbm5lbC5yZXBseSAnZ2V0LW5hdmJhci1jb2xvcicsIC0+XG4gICAgbmF2YmFyID0gJCBzZWxlY3RvclxuICAgIG5hdmJhci5jc3MgJ2NvbG9yJ1xuICBjaGFubmVsLnJlcGx5ICdnZXQtbmF2YmFyLWJnLWNvbG9yJywgLT5cbiAgICBuYXZiYXIgPSAkIHNlbGVjdG9yXG4gICAgbmF2YmFyLmNzcyAnYmFja2dyb3VuZC1jb2xvcidcbiAgICBcblxubmF2YmFyX3NldF9hY3RpdmUgPSAocGF0aCkgLT5cbiAgcGF0aF90b3AgPSBwYXRoLnNwbGl0KCcvJylbMF1cbiAgIyBGSVhNRSB0aGlzIHNob3VsZCBiZSBhdHRhY2hlZCB0byB2aWV3IG9yXG4gICMgYmUgYSBiZWhhdmlvclxuICBmb3IgbGkgaW4gJCgnI25hdmJhci12aWV3IGxpJylcbiAgICBsaXEgPSAkIGxpXG4gICAgbGlxLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgIGlmIHBhdGhfdG9wID09IGxpcS5hdHRyKCdhcHBuYW1lJylcbiAgICAgIGxpcS5hZGRDbGFzcygnYWN0aXZlJylcblxubmF2aWdhdGVfdG9fdXJsID0gKHVybCkgLT5cbiAgaWYgdXJsLnNwbGl0KCcvJylbMF0gPT0gJydcbiAgICB3aW5kb3cubG9jYXRpb24gPSB1cmxcbiAgZWxzZVxuICAgIHIgPSBuZXcgQmFja2JvbmUuUm91dGVyXG4gICAgci5uYXZpZ2F0ZSB1cmwsIHRyaWdnZXI6dHJ1ZVxuXG5uZXdsaW5lXzJfYnIgPSAoc3RyKSAtPlxuICBzdHIucmVwbGFjZSgvKD86XFxyXFxufFxccnxcXG4pL2csICc8YnIgLz4nKVxuXG5yYW5kb21fY2hvaWNlID0gKG15QXJyYXkpIC0+XG4gIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbXlBcnJheS5sZW5ndGgpXG4gIG15QXJyYXlbaW5kZXhdXG5cbnJlbW92ZV90cmFpbGluZ19zbGFzaGVzID0gKHBhdGgpIC0+XG4gIHBhdGgucmVwbGFjZSAvXFwvJC8sIFwiXCJcblxuIyBGSVhNRTogd2UgcmVhbGx5IG5lZWQgdGhlIGVxdWl2YWxlbnQgb2YgcHJlc3NpbmcgXCJob21lXCJcbiMgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTQ0ODA1L3Njcm9sbC10by10aGUtdG9wLW9mLXRoZS1wYWdlLXVzaW5nLWphdmFzY3JpcHQtanF1ZXJ5XG5zY3JvbGxfdG9wX2Zhc3QgPSAoKSAgLT5cbiAgIyQoJ2h0bWwsIGJvZHknKS5hbmltYXRlIHtzY3JvbGxUb3A6IDB9LCAnZmFzdCdcbiAgd2luZG93LnNjcm9sbFRvIDAsMFxuICBcbnNjcm9sbF90b3BfZmFzdF9qcXVlcnkgPSAoKSAgLT5cbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUge3Njcm9sbFRvcDogMH0sICdmYXN0J1xuXG4jIHVzZSBwb2x5ZmlsbCBmb3IgU3RyaW5nLmVuZHNXaXRoIGlmIG5lZWRlZFxuI2lmIG5vdCBTdHJpbmcucHJvdG90eXBlPy5lbmRzV2l0aFxuIyAgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IHN0cmluZ19lbmRzd2l0aFxuc3RyaW5nX2VuZHN3aXRoID0gKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIC0+XG4gIHN1YmplY3RTdHJpbmcgPSBAdG9TdHJpbmcoKVxuICBpZiB0eXBlb2YgcG9zaXRpb24gIT0gJ251bWJlcicgb3IgIWlzRmluaXRlKHBvc2l0aW9uKSBvciBNYXRoLmZsb29yKHBvc2l0aW9uKSAhPSBwb3NpdGlvbiBvciBwb3NpdGlvbiA+IHN1YmplY3RTdHJpbmcubGVuZ3RoXG4gICAgcG9zaXRpb24gPSBzdWJqZWN0U3RyaW5nLmxlbmd0aFxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoXG4gIGxhc3RJbmRleCA9IHN1YmplY3RTdHJpbmcuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKVxuICBsYXN0SW5kZXggIT0gLTEgYW5kIGxhc3RJbmRleCA9PSBwb3NpdGlvblxuXG5zdHJpbmdfc3RhcnRzd2l0aCA9IChzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSAtPlxuICBwb3NpdGlvbiA9IHBvc2l0aW9uIG9yIDBcbiAgcmV0dXJuIEBzdWJzdHIocG9zaXRpb24sIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID09IHNlYXJjaFN0cmluZ1xuICBcbiNpZiAhU3RyaW5nOjpzdGFydHNXaXRoXG4jICBTdHJpbmc6OnN0YXJ0c1dpdGggPSAoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgLT5cbiMgICAgcG9zaXRpb24gPSBwb3NpdGlvbiBvciAwXG4jICAgIEBzdWJzdHIocG9zaXRpb24sIHNlYXJjaFN0cmluZy5sZW5ndGgpID09IHNlYXJjaFN0cmluZ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGNhbWVsX3RvX2tlYmFiOiBjYW1lbF90b19rZWJhYlxuICBjYXBpdGFsaXplOiBjYXBpdGFsaXplXG4gIGNyZWF0ZV9tb2RlbDogY3JlYXRlX21vZGVsXG4gIGNyZWF0ZV9uZXdfYXBwcm91dGVyOiBjcmVhdGVfbmV3X2FwcHJvdXRlclxuICBnZXRfbW9kZWw6IGdldF9tb2RlbFxuICBoYW5kbGVfbmV3bGluZXM6IGhhbmRsZV9uZXdsaW5lc1xuICBtYWtlX2ZpZWxkX2lucHV0X3VpOiBtYWtlX2ZpZWxkX2lucHV0X3VpXG4gIG1ha2VfanNvbl9wb3N0X3NldHRpbmdzOiBtYWtlX2pzb25fcG9zdF9zZXR0aW5nc1xuICBtYWtlX2pzb25fcG9zdDogbWFrZV9qc29uX3Bvc3RcbiAgbmF2YmFyX2NvbG9yX2hhbmRsZXJzOiBuYXZiYXJfY29sb3JfaGFuZGxlcnNcbiAgbmF2YmFyX3NldF9hY3RpdmU6IG5hdmJhcl9zZXRfYWN0aXZlXG4gIG5hdmlnYXRlX3RvX3VybDogbmF2aWdhdGVfdG9fdXJsXG4gIHJhbmRvbV9jaG9pY2U6IHJhbmRvbV9jaG9pY2VcbiAgcmVtb3ZlX3RyYWlsaW5nX3NsYXNoZXM6IHJlbW92ZV90cmFpbGluZ19zbGFzaGVzXG4gIHNjcm9sbF90b3BfZmFzdDogc2Nyb2xsX3RvcF9mYXN0XG4gIHNjcm9sbF90b3BfZmFzdF9qcXVlcnk6IHNjcm9sbF90b3BfZmFzdF9qcXVlcnlcbiAgc3RyaW5nX2VuZHN3aXRoOiBzdHJpbmdfZW5kc3dpdGhcbiAgc3RyaW5nX3N0YXJ0c3dpdGg6IHN0cmluZ19zdGFydHN3aXRoXG4gIFxuXG5cblxuXG5cbiJdfQ==
