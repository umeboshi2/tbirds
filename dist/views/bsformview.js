var BootstrapFormView, FormView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FormView = require('./formview');

BootstrapFormView = (function(superClass) {
  extend(BootstrapFormView, superClass);

  function BootstrapFormView() {
    this.invalid = bind(this.invalid, this);
    this.valid = bind(this.valid, this);
    return BootstrapFormView.__super__.constructor.apply(this, arguments);
  }

  BootstrapFormView.prototype.valid = function(view, attr, selector) {
    return this.$("[data-validation=" + attr + "]").parent().removeClass('has-error').addClass('has-success');
  };

  BootstrapFormView.prototype.invalid = function(view, attr, error, selector) {
    this.failure(this.model);
    return this.$("[data-validation=" + attr + "]").parent().removeClass('has-success').addClass('has-error');
  };

  return BootstrapFormView;

})(FormView);

module.exports = BootstrapFormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNmb3Jtdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNmb3Jtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwyQkFBQTtFQUFBOzs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxZQUFSOztBQUVMOzs7Ozs7Ozs7OEJBQ0osS0FBQSxHQUFPLFNBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxRQUFiO1dBQ0wsSUFBQyxDQUFBLENBQUQsQ0FBRyxtQkFBQSxHQUFvQixJQUFwQixHQUF5QixHQUE1QixDQUErQixDQUFDLE1BQWhDLENBQUEsQ0FDRSxDQUFDLFdBREgsQ0FDZSxXQURmLENBRUUsQ0FBQyxRQUZILENBRVksYUFGWjtFQURLOzs4QkFLUCxPQUFBLEdBQVMsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLEtBQWIsRUFBb0IsUUFBcEI7SUFDUCxJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxLQUFWO1dBQ0EsSUFBQyxDQUFBLENBQUQsQ0FBRyxtQkFBQSxHQUFvQixJQUFwQixHQUF5QixHQUE1QixDQUErQixDQUFDLE1BQWhDLENBQUEsQ0FDRSxDQUFDLFdBREgsQ0FDZSxhQURmLENBRUUsQ0FBQyxRQUZILENBRVksV0FGWjtFQUZPOzs7O0dBTnFCOztBQVloQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkZvcm1WaWV3ID0gcmVxdWlyZSAnLi9mb3JtdmlldydcblxuY2xhc3MgQm9vdHN0cmFwRm9ybVZpZXcgZXh0ZW5kcyBGb3JtVmlld1xuICB2YWxpZDogKHZpZXcsIGF0dHIsIHNlbGVjdG9yKSA9PlxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKS5wYXJlbnQoKVxuICAgICAgLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKVxuICAgICAgLmFkZENsYXNzKCdoYXMtc3VjY2VzcycpXG5cbiAgaW52YWxpZDogKHZpZXcsIGF0dHIsIGVycm9yLCBzZWxlY3RvcikgPT5cbiAgICBAZmFpbHVyZShAbW9kZWwpXG4gICAgQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpLnBhcmVudCgpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2hhcy1zdWNjZXNzJylcbiAgICAgIC5hZGRDbGFzcygnaGFzLWVycm9yJylcblxubW9kdWxlLmV4cG9ydHMgPSBCb290c3RyYXBGb3JtVmlld1xuIl19
