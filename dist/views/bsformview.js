var BootstrapFormView, FormView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

FormView = require('./formview');

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

module.exports = BootstrapFormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNmb3Jtdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNmb3Jtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxpQkFBQSxFQUFBLFFBQUE7RUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVI7O0FBRUwsb0JBQU4sTUFBQSxrQkFBQSxRQUFnQyxTQUFoQzs7O1FBQ0UsQ0FBQSxZQUFBLENBQUE7UUFLQSxDQUFBLGNBQUEsQ0FBQTs7O0VBTEEsS0FBTyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsUUFBYixDQUFBOzJCQURIO1dBRUYsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsQ0FBekIsQ0FBSCxDQUErQixDQUFDLE1BQWhDLENBQUEsQ0FDRSxDQUFDLFdBREgsQ0FDZSxXQURmLENBRUUsQ0FBQyxRQUZILENBRVksYUFGWjtFQURLOztFQUtQLE9BQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLEtBQWIsRUFBb0IsUUFBcEIsQ0FBQTsyQkFOTDtJQU9GLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLEtBQVY7V0FDQSxJQUFDLENBQUEsQ0FBRCxDQUFHLENBQUEsaUJBQUEsQ0FBQSxDQUFvQixJQUFwQixDQUF5QixDQUF6QixDQUFILENBQStCLENBQUMsTUFBaEMsQ0FBQSxDQUNFLENBQUMsV0FESCxDQUNlLGFBRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxXQUZaO0VBRk87O0FBTlg7O0FBWUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJGb3JtVmlldyA9IHJlcXVpcmUgJy4vZm9ybXZpZXcnXG5cbmNsYXNzIEJvb3RzdHJhcEZvcm1WaWV3IGV4dGVuZHMgRm9ybVZpZXdcbiAgdmFsaWQ6ICh2aWV3LCBhdHRyLCBzZWxlY3RvcikgPT5cbiAgICBAJChcIltkYXRhLXZhbGlkYXRpb249I3thdHRyfV1cIikucGFyZW50KClcbiAgICAgIC5yZW1vdmVDbGFzcygnaGFzLWVycm9yJylcbiAgICAgIC5hZGRDbGFzcygnaGFzLXN1Y2Nlc3MnKVxuXG4gIGludmFsaWQ6ICh2aWV3LCBhdHRyLCBlcnJvciwgc2VsZWN0b3IpID0+XG4gICAgQGZhaWx1cmUoQG1vZGVsKVxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKS5wYXJlbnQoKVxuICAgICAgLnJlbW92ZUNsYXNzKCdoYXMtc3VjY2VzcycpXG4gICAgICAuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpXG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdHN0cmFwRm9ybVZpZXdcbiJdfQ==
