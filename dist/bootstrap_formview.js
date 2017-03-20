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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwX2Zvcm12aWV3LmpzIiwic291cmNlcyI6WyJib290c3RyYXBfZm9ybXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsMkJBQUE7RUFBQTs7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUjs7QUFFTDs7Ozs7Ozs7OzhCQUNKLEtBQUEsR0FBTyxTQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsUUFBYjtXQUNMLElBQUMsQ0FBQSxDQUFELENBQUcsbUJBQUEsR0FBb0IsSUFBcEIsR0FBeUIsR0FBNUIsQ0FBK0IsQ0FBQyxNQUFoQyxDQUFBLENBQ0UsQ0FBQyxXQURILENBQ2UsV0FEZixDQUVFLENBQUMsUUFGSCxDQUVZLGFBRlo7RUFESzs7OEJBS1AsT0FBQSxHQUFTLFNBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxLQUFiLEVBQW9CLFFBQXBCO0lBQ1AsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsS0FBVjtXQUNBLElBQUMsQ0FBQSxDQUFELENBQUcsbUJBQUEsR0FBb0IsSUFBcEIsR0FBeUIsR0FBNUIsQ0FBK0IsQ0FBQyxNQUFoQyxDQUFBLENBQ0UsQ0FBQyxXQURILENBQ2UsYUFEZixDQUVFLENBQUMsUUFGSCxDQUVZLFdBRlo7RUFGTzs7OztHQU5xQjs7QUFZaEMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJGb3JtVmlldyA9IHJlcXVpcmUgJy4vZm9ybXZpZXcnXG5cbmNsYXNzIEJvb3RzdHJhcEZvcm1WaWV3IGV4dGVuZHMgRm9ybVZpZXdcbiAgdmFsaWQ6ICh2aWV3LCBhdHRyLCBzZWxlY3RvcikgPT5cbiAgICBAJChcIltkYXRhLXZhbGlkYXRpb249I3thdHRyfV1cIikucGFyZW50KClcbiAgICAgIC5yZW1vdmVDbGFzcygnaGFzLWVycm9yJylcbiAgICAgIC5hZGRDbGFzcygnaGFzLXN1Y2Nlc3MnKVxuXG4gIGludmFsaWQ6ICh2aWV3LCBhdHRyLCBlcnJvciwgc2VsZWN0b3IpID0+XG4gICAgQGZhaWx1cmUoQG1vZGVsKVxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKS5wYXJlbnQoKVxuICAgICAgLnJlbW92ZUNsYXNzKCdoYXMtc3VjY2VzcycpXG4gICAgICAuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpXG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdHN0cmFwRm9ybVZpZXdcbiJdfQ==
