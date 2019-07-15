var BootstrapFormView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import FormView from './formview';

BootstrapFormView = class BootstrapFormView extends FormView {
  constructor() {
    super(...arguments);
    this.valid = this.valid.bind(this);
    this.invalid = this.invalid.bind(this);
  }

  valid(view, attr, selector) {
    var element, parent;
    boundMethodCheck(this, BootstrapFormView);
    element = this.$(`[data-validation=${attr}]`);
    // parent is form-group div
    parent = element.parent();
    parent.removeClass('has-danger').addClass('has-success');
    return element.removeClass('is-invalid').addClass('is-valid');
  }

  invalid(view, attr, error, selector) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNmb3Jtdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNmb3Jtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUVNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsU0FBaEM7OztRQUNFLENBQUEsWUFBQSxDQUFBO1FBV0EsQ0FBQSxjQUFBLENBQUE7OztFQVhBLEtBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLFFBQWIsQ0FBQTtBQUNMLFFBQUEsT0FBQSxFQUFBOzJCQUZFO0lBRUYsT0FBQSxHQUFVLElBQUMsQ0FBQSxDQUFELENBQUcsQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLENBQXpCLENBQUgsRUFBVjs7SUFFQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBQTtJQUNULE1BQ0UsQ0FBQyxXQURILENBQ2UsWUFEZixDQUVFLENBQUMsUUFGSCxDQUVZLGFBRlo7V0FHQSxPQUNFLENBQUMsV0FESCxDQUNlLFlBRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxVQUZaO0VBUEs7O0VBV1AsT0FBUyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsS0FBYixFQUFvQixRQUFwQixDQUFBO0FBQ1AsUUFBQSxPQUFBLEVBQUE7MkJBYkU7SUFhRixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxLQUFWO0lBQ0EsT0FBQSxHQUFVLElBQUMsQ0FBQSxDQUFELENBQUcsQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLENBQXpCLENBQUgsRUFEVjs7SUFHQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBQTtJQUNULE1BQ0UsQ0FBQyxXQURILENBQ2UsYUFEZixDQUVFLENBQUMsUUFGSCxDQUVZLFlBRlo7V0FHQSxPQUNFLENBQUMsV0FESCxDQUNlLFVBRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxZQUZaO0VBUk87O0FBWlg7O0FBd0JBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb3JtVmlldyBmcm9tICcuL2Zvcm12aWV3J1xuXG5jbGFzcyBCb290c3RyYXBGb3JtVmlldyBleHRlbmRzIEZvcm1WaWV3XG4gIHZhbGlkOiAodmlldywgYXR0ciwgc2VsZWN0b3IpID0+XG4gICAgZWxlbWVudCA9IEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICMgcGFyZW50IGlzIGZvcm0tZ3JvdXAgZGl2XG4gICAgcGFyZW50ID0gZWxlbWVudC5wYXJlbnQoKVxuICAgIHBhcmVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdoYXMtZGFuZ2VyJylcbiAgICAgIC5hZGRDbGFzcygnaGFzLXN1Y2Nlc3MnKVxuICAgIGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ2lzLXZhbGlkJylcblxuICBpbnZhbGlkOiAodmlldywgYXR0ciwgZXJyb3IsIHNlbGVjdG9yKSA9PlxuICAgIEBmYWlsdXJlKEBtb2RlbClcbiAgICBlbGVtZW50ID0gQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpXG4gICAgIyBwYXJlbnQgaXMgZm9ybS1ncm91cCBkaXZcbiAgICBwYXJlbnQgPSBlbGVtZW50LnBhcmVudCgpXG4gICAgcGFyZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2hhcy1zdWNjZXNzJylcbiAgICAgIC5hZGRDbGFzcygnaGFzLWRhbmdlcicpXG4gICAgZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpcy12YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKVxuXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBGb3JtVmlld1xuIl19
