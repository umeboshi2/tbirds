var BootstrapFormView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import FormView from './formview';

BootstrapFormView = class BootstrapFormView extends FormView {
  constructor() {
    super(...arguments);
    this.valid = this.valid.bind(this);
    this.invalid = this.invalid.bind(this);
  }

  valid(view, attr) {
    var element, parent;
    boundMethodCheck(this, BootstrapFormView);
    element = this.$(`[data-validation=${attr}]`);
    // parent is form-group div
    parent = element.parent();
    parent.removeClass('has-danger').addClass('has-success');
    return element.removeClass('is-invalid').addClass('is-valid');
  }

  invalid(view, attr) {
    var element, parent;
    boundMethodCheck(this, BootstrapFormView);
    this.failure(this.model);
    element = this.$(`[data-validation=${attr}]`);
    // parent is form-group div
    parent = element.parent();
    parent.removeClass('has-success').addClass('has-danger');
    return element.removeClass('is-valid').addClass('is-invalid');
  }

};

export default BootstrapFormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNmb3Jtdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNmb3Jtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUVNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsU0FBaEM7OztRQUNFLENBQUEsWUFBQSxDQUFBO1FBV0EsQ0FBQSxjQUFBLENBQUE7OztFQVhBLEtBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFBO0FBQ0wsUUFBQSxPQUFBLEVBQUE7MkJBRkU7SUFFRixPQUFBLEdBQVUsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsQ0FBekIsQ0FBSCxFQUFWOztJQUVBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFBO0lBQ1QsTUFDRSxDQUFDLFdBREgsQ0FDZSxZQURmLENBRUUsQ0FBQyxRQUZILENBRVksYUFGWjtXQUdBLE9BQ0UsQ0FBQyxXQURILENBQ2UsWUFEZixDQUVFLENBQUMsUUFGSCxDQUVZLFVBRlo7RUFQSzs7RUFXUCxPQUFTLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBQTtBQUNQLFFBQUEsT0FBQSxFQUFBOzJCQWJFO0lBYUYsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsS0FBVjtJQUNBLE9BQUEsR0FBVSxJQUFDLENBQUEsQ0FBRCxDQUFHLENBQUEsaUJBQUEsQ0FBQSxDQUFvQixJQUFwQixDQUF5QixDQUF6QixDQUFILEVBRFY7O0lBR0EsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQUE7SUFDVCxNQUNFLENBQUMsV0FESCxDQUNlLGFBRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxZQUZaO1dBR0EsT0FDRSxDQUFDLFdBREgsQ0FDZSxVQURmLENBRUUsQ0FBQyxRQUZILENBRVksWUFGWjtFQVJPOztBQVpYOztBQXdCQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRm9ybVZpZXcgZnJvbSAnLi9mb3JtdmlldydcblxuY2xhc3MgQm9vdHN0cmFwRm9ybVZpZXcgZXh0ZW5kcyBGb3JtVmlld1xuICB2YWxpZDogKHZpZXcsIGF0dHIpID0+XG4gICAgZWxlbWVudCA9IEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICMgcGFyZW50IGlzIGZvcm0tZ3JvdXAgZGl2XG4gICAgcGFyZW50ID0gZWxlbWVudC5wYXJlbnQoKVxuICAgIHBhcmVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdoYXMtZGFuZ2VyJylcbiAgICAgIC5hZGRDbGFzcygnaGFzLXN1Y2Nlc3MnKVxuICAgIGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ2lzLXZhbGlkJylcblxuICBpbnZhbGlkOiAodmlldywgYXR0cikgPT5cbiAgICBAZmFpbHVyZShAbW9kZWwpXG4gICAgZWxlbWVudCA9IEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICMgcGFyZW50IGlzIGZvcm0tZ3JvdXAgZGl2XG4gICAgcGFyZW50ID0gZWxlbWVudC5wYXJlbnQoKVxuICAgIHBhcmVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdoYXMtc3VjY2VzcycpXG4gICAgICAuYWRkQ2xhc3MoJ2hhcy1kYW5nZXInKVxuICAgIGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnaXMtdmFsaWQnKVxuICAgICAgLmFkZENsYXNzKCdpcy1pbnZhbGlkJylcblxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwRm9ybVZpZXdcbiJdfQ==
