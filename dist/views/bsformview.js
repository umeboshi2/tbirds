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
    boundMethodCheck(this, BootstrapFormView);
    return this.$(`[data-validation=${attr}]`).parent().removeClass('has-error').addClass('has-success');
  }

  invalid(view, attr, error, selector) {
    boundMethodCheck(this, BootstrapFormView);
    this.failure(this.model);
    return this.$(`[data-validation=${attr}]`).parent().removeClass('has-success').addClass('has-error');
  }

};

export default BootstrapFormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNmb3Jtdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNmb3Jtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUVNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsU0FBaEM7OztRQUNFLENBQUEsWUFBQSxDQUFBO1FBS0EsQ0FBQSxjQUFBLENBQUE7OztFQUxBLEtBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLFFBQWIsQ0FBQTsyQkFESDtXQUVGLElBQUMsQ0FBQSxDQUFELENBQUcsQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLENBQXpCLENBQUgsQ0FBK0IsQ0FBQyxNQUFoQyxDQUFBLENBQ0UsQ0FBQyxXQURILENBQ2UsV0FEZixDQUVFLENBQUMsUUFGSCxDQUVZLGFBRlo7RUFESzs7RUFLUCxPQUFTLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxLQUFiLEVBQW9CLFFBQXBCLENBQUE7MkJBTkw7SUFPRixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxLQUFWO1dBQ0EsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsQ0FBekIsQ0FBSCxDQUErQixDQUFDLE1BQWhDLENBQUEsQ0FDRSxDQUFDLFdBREgsQ0FDZSxhQURmLENBRUUsQ0FBQyxRQUZILENBRVksV0FGWjtFQUZPOztBQU5YOztBQVlBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb3JtVmlldyBmcm9tICcuL2Zvcm12aWV3J1xuXG5jbGFzcyBCb290c3RyYXBGb3JtVmlldyBleHRlbmRzIEZvcm1WaWV3XG4gIHZhbGlkOiAodmlldywgYXR0ciwgc2VsZWN0b3IpID0+XG4gICAgQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpLnBhcmVudCgpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpXG4gICAgICAuYWRkQ2xhc3MoJ2hhcy1zdWNjZXNzJylcblxuICBpbnZhbGlkOiAodmlldywgYXR0ciwgZXJyb3IsIHNlbGVjdG9yKSA9PlxuICAgIEBmYWlsdXJlKEBtb2RlbClcbiAgICBAJChcIltkYXRhLXZhbGlkYXRpb249I3thdHRyfV1cIikucGFyZW50KClcbiAgICAgIC5yZW1vdmVDbGFzcygnaGFzLXN1Y2Nlc3MnKVxuICAgICAgLmFkZENsYXNzKCdoYXMtZXJyb3InKVxuXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBGb3JtVmlld1xuIl19
