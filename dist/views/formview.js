var FormView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import _ from 'underscore';

import Marionette from 'backbone.marionette';

import Validation from 'backbone.validation';

export default FormView = (function() {
  class FormView extends Backbone.Marionette.View {
    constructor() {
      super(...arguments);
      this.valid = this.valid.bind(this);
      this.invalid = this.invalid.bind(this);
      this.listenTo(this, 'render', this.hideActivityIndicator);
      this.listenTo(this, 'render', this.prepareModel);
      this.listenTo(this, 'save:form:success', this.success);
      this.listenTo(this, 'save:form:failure', this.failure);
    }

    delegateEvents(events) {
      this.ui = _.extend(this._baseUI(), _.result(this, 'ui'));
      this.events = _.extend(this._baseEvents(), _.result(this, 'events'));
      return super.delegateEvents(events);
    }

    _baseUI() {
      return {
        submit: 'input[type="submit"]',
        activityIndicator: '.spinner'
      };
    }

    _baseEvents() {
      var eventHash;
      eventHash = {
        'change [data-validation]': this.validateField,
        'blur [data-validation]': this.validateField,
        'keyup [data-validation]': this.validateField
      };
      eventHash[`click ${this.ui.submit}`] = this.processForm;
      return eventHash;
    }

    createModel() {
      throw new Error('implement #createModel in your FormView subclass to return a Backbone model'); // noqa 
    }

    prepareModel() {
      this.model = this.createModel();
      return this.setupValidation();
    }

    validateField(e) {
      var validation, value;
      validation = $(e.target).attr('data-validation');
      value = $(e.target).val();
      if (this.model.preValidate(validation, value)) {
        return this.invalid(this, validation);
      } else {
        return this.valid(this, validation);
      }
    }

    processForm(e) {
      e.preventDefault();
      this.showActivityIndicator();
      this.updateModel();
      return this.saveModel();
    }

    updateModel() {
      throw new Error('implement #updateModel in your FormView subclass to update the attributes of @model'); // noqa
    }

    saveModel() {
      var callbacks;
      callbacks = {
        success: () => {
          return this.trigger('save:form:success', this.model);
        },
        error: () => {
          return this.trigger('save:form:failure', this.model);
        }
      };
      return this.model.save({}, callbacks);
    }

    success(model) {
      this.render();
      return this.onSuccess(model);
    }

    onSuccess(model) {
      return null;
    }

    failure(model) {
      this.hideActivityIndicator();
      return this.onFailure(model);
    }

    onFailure(model) {
      return null;
    }

    showActivityIndicator() {
      this.ui.activityIndicator.show();
      return this.ui.submit.hide();
    }

    hideActivityIndicator() {
      this.ui.activityIndicator.hide();
      return this.ui.submit.show();
    }

    setupValidation() {
      Backbone.Validation.unbind(this);
      return Backbone.Validation.bind(this, {
        valid: this.valid,
        invalid: this.invalid
      });
    }

    valid(view, attr, selector) {
      boundMethodCheck(this, FormView);
      return this.$(`[data-validation=${attr}]`).removeClass('invalid').addClass('valid');
    }

    invalid(view, attr, error, selector) {
      boundMethodCheck(this, FormView);
      this.failure(this.model);
      return this.$(`[data-validation=${attr}]`).removeClass('valid').addClass('invalid');
    }

  };

  FormView.prototype.tagName = 'form';

  return FormView;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZm9ybXZpZXcuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Zvcm12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxPQUFBLFFBQXFCO0VBQU4sTUFBQSxTQUFBLFFBQXVCLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBM0M7SUFDYixXQUFhLENBQUEsQ0FBQTs7VUFzRmIsQ0FBQSxZQUFBLENBQUE7VUFLQSxDQUFBLGNBQUEsQ0FBQTtNQXhGRSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsUUFBaEIsRUFBMEIsSUFBQyxDQUFBLHFCQUEzQjtNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixRQUFoQixFQUEwQixJQUFDLENBQUEsWUFBM0I7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsbUJBQWhCLEVBQXFDLElBQUMsQ0FBQSxPQUF0QztNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixtQkFBaEIsRUFBcUMsSUFBQyxDQUFBLE9BQXRDO0lBTlc7O0lBUWIsY0FBZ0IsQ0FBQyxNQUFELENBQUE7TUFDZCxJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFULEVBQXFCLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFlLElBQWYsQ0FBckI7TUFDTixJQUFDLENBQUEsTUFBRCxHQUFVLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLFdBQUQsQ0FBQSxDQUFULEVBQXlCLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFlLFFBQWYsQ0FBekI7a0JBRlosQ0FBQSxjQUdFLENBQU0sTUFBTjtJQUhjOztJQU9oQixPQUFTLENB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ZUFBaUIsQ0FBQSxDQUFBO01BQ2YsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFwQixDQUEyQixJQUEzQjthQUNBLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBcEIsQ0FBeUIsSUFBekIsRUFDRTtRQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FBUjtRQUNBLE9BQUEsRUFBUyxJQUFDLENBQUE7TUFEVixDQURGO0lBRmU7O0lBTWpCLEtBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLFFBQWIsQ0FBQTs2QkF2Rlk7YUF3RmpCLElBQUMsQ0FBQSxDQUFELENBQUcsQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLENBQXpCLENBQUgsQ0FDRSxDQUFDLFdBREgsQ0FDZSxTQURmLENBRUUsQ0FBQyxRQUZILENBRVksT0FGWjtJQURLOztJQUtQLE9BQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLEtBQWIsRUFBb0IsUUFBcEIsQ0FBQTs2QkE1RlU7TUE2RmpCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLEtBQVY7YUFDQSxJQUFDLENBQUEsQ0FBRCxDQUFHLENBQUEsaUJBQUEsQ0FBQSxDQUFvQixJQUFwQixDQUF5QixDQUF6QixDQUFILENBQ0UsQ0FBQyxXQURILENBQ2UsT0FEZixDQUVFLENBQUMsUUFGSCxDQUVZLFNBRlo7SUFGTzs7RUE1Rkk7O3FCQWNiLE9BQUEsR0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSAnYmFja2JvbmUudmFsaWRhdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXIgYXJndW1lbnRzLi4uXG5cbiAgICBAbGlzdGVuVG8gdGhpcywgJ3JlbmRlcicsIEBoaWRlQWN0aXZpdHlJbmRpY2F0b3JcbiAgICBAbGlzdGVuVG8gdGhpcywgJ3JlbmRlcicsIEBwcmVwYXJlTW9kZWxcbiAgICBAbGlzdGVuVG8gdGhpcywgJ3NhdmU6Zm9ybTpzdWNjZXNzJywgQHN1Y2Nlc3NcbiAgICBAbGlzdGVuVG8gdGhpcywgJ3NhdmU6Zm9ybTpmYWlsdXJlJywgQGZhaWx1cmVcblxuICBkZWxlZ2F0ZUV2ZW50czogKGV2ZW50cyktPlxuICAgIEB1aSA9IF8uZXh0ZW5kIEBfYmFzZVVJKCksIF8ucmVzdWx0KHRoaXMsICd1aScpXG4gICAgQGV2ZW50cyA9IF8uZXh0ZW5kIEBfYmFzZUV2ZW50cygpLCBfLnJlc3VsdCh0aGlzLCAnZXZlbnRzJylcbiAgICBzdXBlciBldmVudHNcblxuICB0YWdOYW1lOiAnZm9ybSdcblxuICBfYmFzZVVJOiAtPlxuICAgIHN1Ym1pdDogJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nXG4gICAgYWN0aXZpdHlJbmRpY2F0b3I6ICcuc3Bpbm5lcidcblxuICBfYmFzZUV2ZW50czogLT5cbiAgICBldmVudEhhc2ggPVxuICAgICAgJ2NoYW5nZSBbZGF0YS12YWxpZGF0aW9uXSc6IEB2YWxpZGF0ZUZpZWxkXG4gICAgICAnYmx1ciBbZGF0YS12YWxpZGF0aW9uXSc6ICAgQHZhbGlkYXRlRmllbGRcbiAgICAgICdrZXl1cCBbZGF0YS12YWxpZGF0aW9uXSc6ICBAdmFsaWRhdGVGaWVsZFxuXG4gICAgZXZlbnRIYXNoW1wiY2xpY2sgI3tAdWkuc3VibWl0fVwiXSA9IEBwcm9jZXNzRm9ybVxuICAgIGV2ZW50SGFzaFxuXG4gIGNyZWF0ZU1vZGVsOiAtPlxuICAgIHRocm93IG5ldyBFcnJvciAnaW1wbGVtZW50ICNjcmVhdGVNb2RlbCBpbiB5b3VyIEZvcm1WaWV3IHN1YmNsYXNzIHRvIHJldHVybiBhIEJhY2tib25lIG1vZGVsJyAjIG5vcWEgXG5cbiAgcHJlcGFyZU1vZGVsOiAtPlxuICAgIEBtb2RlbCA9IEBjcmVhdGVNb2RlbCgpXG4gICAgQHNldHVwVmFsaWRhdGlvbigpXG5cbiAgdmFsaWRhdGVGaWVsZDogKGUpIC0+XG4gICAgdmFsaWRhdGlvbiA9ICQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicpXG4gICAgdmFsdWUgPSAkKGUudGFyZ2V0KS52YWwoKVxuICAgIGlmIEBtb2RlbC5wcmVWYWxpZGF0ZSB2YWxpZGF0aW9uLCB2YWx1ZVxuICAgICAgQGludmFsaWQgQCwgdmFsaWRhdGlvblxuICAgIGVsc2VcbiAgICAgIEB2YWxpZCBALCB2YWxpZGF0aW9uXG5cbiAgcHJvY2Vzc0Zvcm06IChlKSAtPlxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIEBzaG93QWN0aXZpdHlJbmRpY2F0b3IoKVxuXG4gICAgQHVwZGF0ZU1vZGVsKClcbiAgICBAc2F2ZU1vZGVsKClcblxuICB1cGRhdGVNb2RlbDogLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgJ2ltcGxlbWVudCAjdXBkYXRlTW9kZWwgaW4geW91ciBGb3JtVmlldyBzdWJjbGFzcyB0byB1cGRhdGUgdGhlIGF0dHJpYnV0ZXMgb2YgQG1vZGVsJyAjIG5vcWFcblxuICBzYXZlTW9kZWw6IC0+XG4gICAgY2FsbGJhY2tzID1cbiAgICAgIHN1Y2Nlc3M6ID0+IEB0cmlnZ2VyICdzYXZlOmZvcm06c3VjY2VzcycsIEBtb2RlbFxuICAgICAgZXJyb3I6ID0+IEB0cmlnZ2VyICdzYXZlOmZvcm06ZmFpbHVyZScsIEBtb2RlbFxuXG4gICAgQG1vZGVsLnNhdmUge30sIGNhbGxiYWNrc1xuXG4gIHN1Y2Nlc3M6IChtb2RlbCkgLT5cbiAgICBAcmVuZGVyKClcbiAgICBAb25TdWNjZXNzKG1vZGVsKVxuXG4gIG9uU3VjY2VzczogKG1vZGVsKSAtPiBudWxsXG5cbiAgZmFpbHVyZTogKG1vZGVsKSAtPlxuICAgIEBoaWRlQWN0aXZpdHlJbmRpY2F0b3IoKVxuICAgIEBvbkZhaWx1cmUobW9kZWwpXG5cbiAgb25GYWlsdXJlOiAobW9kZWwpIC0+IG51bGxcblxuICBzaG93QWN0aXZpdHlJbmRpY2F0b3I6IC0+XG4gICAgQHVpLmFjdGl2aXR5SW5kaWNhdG9yLnNob3coKVxuICAgIEB1aS5zdWJtaXQuaGlkZSgpXG5cbiAgaGlkZUFjdGl2aXR5SW5kaWNhdG9yOiAtPlxuICAgIEB1aS5hY3Rpdml0eUluZGljYXRvci5oaWRlKClcbiAgICBAdWkuc3VibWl0LnNob3coKVxuXG4gIHNldHVwVmFsaWRhdGlvbjogLT5cbiAgICBCYWNrYm9uZS5WYWxpZGF0aW9uLnVuYmluZCB0aGlzXG4gICAgQmFja2JvbmUuVmFsaWRhdGlvbi5iaW5kIHRoaXMsXG4gICAgICB2YWxpZDogQHZhbGlkXG4gICAgICBpbnZhbGlkOiBAaW52YWxpZFxuXG4gIHZhbGlkOiAodmlldywgYXR0ciwgc2VsZWN0b3IpID0+XG4gICAgQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKVxuICAgICAgLmFkZENsYXNzKCd2YWxpZCcpXG5cbiAgaW52YWxpZDogKHZpZXcsIGF0dHIsIGVycm9yLCBzZWxlY3RvcikgPT5cbiAgICBAZmFpbHVyZShAbW9kZWwpXG4gICAgQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ3ZhbGlkJylcbiAgICAgIC5hZGRDbGFzcygnaW52YWxpZCcpXG5cbiJdfQ==
