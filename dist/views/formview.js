var FormView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import _ from 'lodash';

import {
  View
} from 'backbone.marionette';

import Validation from 'backbone.validation';

FormView = (function() {
  class FormView extends View {
    constructor() {
      super(...arguments);
      this.valid = this.valid.bind(this);
      //invalid: (view, attr, error, selector) =>
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

    validateInput(element) {
      var formGroup, invalidMessage, validation, value;
      validation = element.attr('data-validation');
      value = element.val();
      invalidMessage = this.model.preValidate(validation, value);
      if (invalidMessage) {
        formGroup = element.parent();
        formGroup.children('.invalid-feedback').text(invalidMessage);
        return this.invalid(this, validation);
      } else {
        return this.valid(this, validation);
      }
    }

    validateField(event) {
      var element;
      element = $(event.target);
      return this.validateInput(element);
    }

    processForm(event) {
      var el;
      event.preventDefault();
      this.showActivityIndicator();
      el = $('[data-validation]');
      this.validateInput(el);
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

    onSuccess() {
      return null;
    }

    failure(model) {
      this.hideActivityIndicator();
      return this.onFailure(model);
    }

    onFailure() {
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
      Validation.unbind(this);
      return Validation.bind(this, {
        valid: this.valid,
        invalid: this.invalid
      });
    }

    valid(view, attr) {
      boundMethodCheck(this, FormView);
      return this.$(`[data-validation=${attr}]`).removeClass('invalid').addClass('valid');
    }

    invalid(view, attr) {
      boundMethodCheck(this, FormView);
      this.failure(this.model);
      return this.$(`[data-validation=${attr}]`).removeClass('valid').addClass('invalid');
    }

  };

  FormView.prototype.tagName = 'form';

  FormView.prototype.className = 'needs-validation';

  return FormView;

}).call(this);

export default FormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZm9ybXZpZXcuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Zvcm12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRU07RUFBTixNQUFBLFNBQUEsUUFBdUIsS0FBdkI7SUFDRSxXQUFhLENBQUEsQ0FBQTs7VUErRmIsQ0FBQSxZQUFBLENBQUE7O1VBTUEsQ0FBQSxjQUFBLENBQUE7TUFsR0UsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLFFBQWhCLEVBQTBCLElBQUMsQ0FBQSxxQkFBM0I7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsUUFBaEIsRUFBMEIsSUFBQyxDQUFBLFlBQTNCO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLG1CQUFoQixFQUFxQyxJQUFDLENBQUEsT0FBdEM7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsbUJBQWhCLEVBQXFDLElBQUMsQ0FBQSxPQUF0QztJQU5XOztJQVFiLGNBQWdCLENBQUMsTUFBRCxDQUFBO01BQ2QsSUFBQyxDQUFBLEVBQUQsR0FBTSxDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBVCxFQUFxQixDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZSxJQUFmLENBQXJCO01BQ04sSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBVCxFQUF5QixDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZSxRQUFmLENBQXpCO2tCQUZaLENBQUEsY0FHRSxDQUFNLE1BQU47SUFIYzs7SUFRaEIsT0FBUyxDQUFBLENBQUE7YUFDUDtRQUFBLE1B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QUE7TUFDckIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUF0QixDQUFBO2FBQ0EsSUFBQyxDQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBWCxDQUFBO0lBRnFCOztJQUl2QixxQkFBdUIsQ0FBQSxDQUFBO01BQ3JCLElBQUMsQ0FBQSxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBdEIsQ0FBQTthQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQVgsQ0FBQTtJQUZxQjs7SUFJdkIsZUFBaUIsQ0FBQSxDQUFBO01BQ2YsVUFBVSxDQUFDLE1BQVgsQ0FBa0IsSUFBbEI7YUFDQSxVQUFVLENBQUMsSUFBWCxDQUFnQixJQUFoQixFQUNFO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO1FBQ0EsT0FBQSxFQUFTLElBQUMsQ0FBQTtNQURWLENBREY7SUFGZTs7SUFNakIsS0FBTyxDQUFDLElBQUQsRUFBTyxJQUFQLENBQUE7NkJBaEdIO2FBaUdGLElBQUMsQ0FBQSxDQUFELENBQUcsQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLENBQXpCLENBQUgsQ0FDRSxDQUFDLFdBREgsQ0FDZSxTQURmLENBRUUsQ0FBQyxRQUZILENBRVksT0FGWjtJQURLOztJQU1QLE9BQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFBOzZCQXRHTDtNQXVHRixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxLQUFWO2FBQ0EsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsQ0FBekIsQ0FBSCxDQUNFLENBQUMsV0FESCxDQUNlLE9BRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxTQUZaO0lBRk87O0VBdEdYOztxQkFjRSxPQUFBLEdBQVM7O3FCQUNULFNBQUEsR0FBVzs7Ozs7O0FBNkZiLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSAnYmFja2JvbmUudmFsaWRhdGlvbidcblxuY2xhc3MgRm9ybVZpZXcgZXh0ZW5kcyBWaWV3XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyIGFyZ3VtZW50cy4uLlxuXG4gICAgQGxpc3RlblRvIHRoaXMsICdyZW5kZXInLCBAaGlkZUFjdGl2aXR5SW5kaWNhdG9yXG4gICAgQGxpc3RlblRvIHRoaXMsICdyZW5kZXInLCBAcHJlcGFyZU1vZGVsXG4gICAgQGxpc3RlblRvIHRoaXMsICdzYXZlOmZvcm06c3VjY2VzcycsIEBzdWNjZXNzXG4gICAgQGxpc3RlblRvIHRoaXMsICdzYXZlOmZvcm06ZmFpbHVyZScsIEBmYWlsdXJlXG5cbiAgZGVsZWdhdGVFdmVudHM6IChldmVudHMpLT5cbiAgICBAdWkgPSBfLmV4dGVuZCBAX2Jhc2VVSSgpLCBfLnJlc3VsdCh0aGlzLCAndWknKVxuICAgIEBldmVudHMgPSBfLmV4dGVuZCBAX2Jhc2VFdmVudHMoKSwgXy5yZXN1bHQodGhpcywgJ2V2ZW50cycpXG4gICAgc3VwZXIgZXZlbnRzXG5cbiAgdGFnTmFtZTogJ2Zvcm0nXG4gIGNsYXNzTmFtZTogJ25lZWRzLXZhbGlkYXRpb24nXG5cbiAgX2Jhc2VVSTogLT5cbiAgICBzdWJtaXQ6ICdpbnB1dFt0eXBlPVwic3VibWl0XCJdJ1xuICAgIGFjdGl2aXR5SW5kaWNhdG9yOiAnLnNwaW5uZXInXG5cbiAgX2Jhc2VFdmVudHM6IC0+XG4gICAgZXZlbnRIYXNoID1cbiAgICAgICdjaGFuZ2UgW2RhdGEtdmFsaWRhdGlvbl0nOiBAdmFsaWRhdGVGaWVsZFxuICAgICAgJ2JsdXIgW2RhdGEtdmFsaWRhdGlvbl0nOiAgIEB2YWxpZGF0ZUZpZWxkXG4gICAgICAna2V5dXAgW2RhdGEtdmFsaWRhdGlvbl0nOiAgQHZhbGlkYXRlRmllbGRcblxuICAgIGV2ZW50SGFzaFtcImNsaWNrICN7QHVpLnN1Ym1pdH1cIl0gPSBAcHJvY2Vzc0Zvcm1cbiAgICBldmVudEhhc2hcblxuICBjcmVhdGVNb2RlbDogLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgJ2ltcGxlbWVudCAjY3JlYXRlTW9kZWwgaW4geW91ciBGb3JtVmlldyBzdWJjbGFzcyB0byByZXR1cm4gYSBCYWNrYm9uZSBtb2RlbCcgIyBub3FhIFxuXG4gIHByZXBhcmVNb2RlbDogLT5cbiAgICBAbW9kZWwgPSBAY3JlYXRlTW9kZWwoKVxuICAgIEBzZXR1cFZhbGlkYXRpb24oKVxuXG4gIHZhbGlkYXRlSW5wdXQ6IChlbGVtZW50KSAtPlxuICAgIHZhbGlkYXRpb24gPSBlbGVtZW50LmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicpXG4gICAgdmFsdWUgPSBlbGVtZW50LnZhbCgpXG4gICAgaW52YWxpZE1lc3NhZ2UgPSBAbW9kZWwucHJlVmFsaWRhdGUgdmFsaWRhdGlvbiwgdmFsdWVcbiAgICBpZiBpbnZhbGlkTWVzc2FnZVxuICAgICAgZm9ybUdyb3VwID0gZWxlbWVudC5wYXJlbnQoKVxuICAgICAgZm9ybUdyb3VwLmNoaWxkcmVuKCcuaW52YWxpZC1mZWVkYmFjaycpLnRleHQgaW52YWxpZE1lc3NhZ2VcbiAgICAgIEBpbnZhbGlkIEAsIHZhbGlkYXRpb25cbiAgICBlbHNlXG4gICAgICBAdmFsaWQgQCwgdmFsaWRhdGlvblxuXG4gIHZhbGlkYXRlRmllbGQ6IChldmVudCkgLT5cbiAgICBlbGVtZW50ID0gJChldmVudC50YXJnZXQpXG4gICAgQHZhbGlkYXRlSW5wdXQgZWxlbWVudFxuXG4gIHByb2Nlc3NGb3JtOiAoZXZlbnQpIC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIEBzaG93QWN0aXZpdHlJbmRpY2F0b3IoKVxuICAgIGVsID0gJCgnW2RhdGEtdmFsaWRhdGlvbl0nKVxuICAgIEB2YWxpZGF0ZUlucHV0IGVsXG4gICAgQHVwZGF0ZU1vZGVsKClcbiAgICBAc2F2ZU1vZGVsKClcblxuICB1cGRhdGVNb2RlbDogLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgJ2ltcGxlbWVudCAjdXBkYXRlTW9kZWwgaW4geW91ciBGb3JtVmlldyBzdWJjbGFzcyB0byB1cGRhdGUgdGhlIGF0dHJpYnV0ZXMgb2YgQG1vZGVsJyAjIG5vcWFcblxuICBzYXZlTW9kZWw6IC0+XG4gICAgY2FsbGJhY2tzID1cbiAgICAgIHN1Y2Nlc3M6ID0+IEB0cmlnZ2VyICdzYXZlOmZvcm06c3VjY2VzcycsIEBtb2RlbFxuICAgICAgZXJyb3I6ID0+IEB0cmlnZ2VyICdzYXZlOmZvcm06ZmFpbHVyZScsIEBtb2RlbFxuXG4gICAgQG1vZGVsLnNhdmUge30sIGNhbGxiYWNrc1xuXG4gIHN1Y2Nlc3M6IChtb2RlbCkgLT5cbiAgICBAcmVuZGVyKClcbiAgICBAb25TdWNjZXNzKG1vZGVsKVxuXG4gIG9uU3VjY2VzczogLT4gbnVsbFxuXG4gIGZhaWx1cmU6IChtb2RlbCkgLT5cbiAgICBAaGlkZUFjdGl2aXR5SW5kaWNhdG9yKClcbiAgICBAb25GYWlsdXJlKG1vZGVsKVxuXG4gIG9uRmFpbHVyZTogLT4gbnVsbFxuXG4gIHNob3dBY3Rpdml0eUluZGljYXRvcjogLT5cbiAgICBAdWkuYWN0aXZpdHlJbmRpY2F0b3Iuc2hvdygpXG4gICAgQHVpLnN1Ym1pdC5oaWRlKClcblxuICBoaWRlQWN0aXZpdHlJbmRpY2F0b3I6IC0+XG4gICAgQHVpLmFjdGl2aXR5SW5kaWNhdG9yLmhpZGUoKVxuICAgIEB1aS5zdWJtaXQuc2hvdygpXG5cbiAgc2V0dXBWYWxpZGF0aW9uOiAtPlxuICAgIFZhbGlkYXRpb24udW5iaW5kIHRoaXNcbiAgICBWYWxpZGF0aW9uLmJpbmQgdGhpcyxcbiAgICAgIHZhbGlkOiBAdmFsaWRcbiAgICAgIGludmFsaWQ6IEBpbnZhbGlkXG5cbiAgdmFsaWQ6ICh2aWV3LCBhdHRyKSA9PlxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICAgLnJlbW92ZUNsYXNzKCdpbnZhbGlkJylcbiAgICAgIC5hZGRDbGFzcygndmFsaWQnKVxuXG4gICNpbnZhbGlkOiAodmlldywgYXR0ciwgZXJyb3IsIHNlbGVjdG9yKSA9PlxuICBpbnZhbGlkOiAodmlldywgYXR0cikgPT5cbiAgICBAZmFpbHVyZShAbW9kZWwpXG4gICAgQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ3ZhbGlkJylcbiAgICAgIC5hZGRDbGFzcygnaW52YWxpZCcpXG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1WaWV3XG4iXX0=
