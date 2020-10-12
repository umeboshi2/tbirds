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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZm9ybXZpZXcuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Zvcm12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRU07RUFBTixNQUFBLFNBQUEsUUFBdUIsS0FBdkI7SUFDRSxXQUFhLENBQUEsQ0FBQTs7VUErRmIsQ0FBQSxZQUFBLENBQUE7O1VBTUEsQ0FBQSxjQUFBLENBQUE7TUFsR0UsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLFFBQWhCLEVBQTBCLElBQUMsQ0FBQSxxQkFBM0I7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsUUFBaEIsRUFBMEIsSUFBQyxDQUFBLFlBQTNCO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLG1CQUFoQixFQUFxQyxJQUFDLENBQUEsT0FBdEM7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsbUJBQWhCLEVBQXFDLElBQUMsQ0FBQSxPQUF0QztJQU5XOztJQVFiLGNBQWdCLENBQUMsTUFBRCxDQUFBO01BQ2QsSUFBQyxDQUFBLEVBQUQsR0FBTSxDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBVCxFQUFxQixDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZSxJQUFmLENBQXJCO01BQ04sSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBVCxFQUF5QixDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZSxRQUFmLENBQXpCO2tCQUZaLENBQUEsY0FHRSxDQUFNLE1BQU47SUFIYzs7SUFRaEIsT0FBUyxDQUFBLENBQUE7YUFDUDtRQUFBLE1B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Q0FBQTtNQUNyQixJQUFDLENBQUEsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQXRCLENBQUE7YUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFYLENBQUE7SUFGcUI7O0lBSXZCLHFCQUF1QixDQUFBLENBQUE7TUFDckIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUF0QixDQUFBO2FBQ0EsSUFBQyxDQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBWCxDQUFBO0lBRnFCOztJQUl2QixlQUFpQixDQUFBLENBQUE7TUFDZixVQUFVLENBQUMsTUFBWCxDQUFrQixJQUFsQjthQUNBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLElBQWhCLEVBQ0U7UUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVI7UUFDQSxPQUFBLEVBQVMsSUFBQyxDQUFBO01BRFYsQ0FERjtJQUZlOztJQU1qQixLQUFPLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBQTs2QkFoR0g7YUFpR0YsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBQSxDQUFBLENBQUgsQ0FDRSxDQUFDLFdBREgsQ0FDZSxTQURmLENBRUUsQ0FBQyxRQUZILENBRVksT0FGWjtJQURLOztJQU1QLE9BQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFBOzZCQXRHTDtNQXVHRixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxLQUFWO2FBQ0EsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBQSxDQUFBLENBQUgsQ0FDRSxDQUFDLFdBREgsQ0FDZSxPQURmLENBRUUsQ0FBQyxRQUZILENBRVksU0FGWjtJQUZPOztFQXRHWDs7cUJBY0UsT0FBQSxHQUFTOztxQkFDVCxTQUFBLEdBQVc7Ozs7OztBQTZGYixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gJ2JhY2tib25lLnZhbGlkYXRpb24nXG5cbmNsYXNzIEZvcm1WaWV3IGV4dGVuZHMgVmlld1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlciBhcmd1bWVudHMuLi5cblxuICAgIEBsaXN0ZW5UbyB0aGlzLCAncmVuZGVyJywgQGhpZGVBY3Rpdml0eUluZGljYXRvclxuICAgIEBsaXN0ZW5UbyB0aGlzLCAncmVuZGVyJywgQHByZXBhcmVNb2RlbFxuICAgIEBsaXN0ZW5UbyB0aGlzLCAnc2F2ZTpmb3JtOnN1Y2Nlc3MnLCBAc3VjY2Vzc1xuICAgIEBsaXN0ZW5UbyB0aGlzLCAnc2F2ZTpmb3JtOmZhaWx1cmUnLCBAZmFpbHVyZVxuXG4gIGRlbGVnYXRlRXZlbnRzOiAoZXZlbnRzKS0+XG4gICAgQHVpID0gXy5leHRlbmQgQF9iYXNlVUkoKSwgXy5yZXN1bHQodGhpcywgJ3VpJylcbiAgICBAZXZlbnRzID0gXy5leHRlbmQgQF9iYXNlRXZlbnRzKCksIF8ucmVzdWx0KHRoaXMsICdldmVudHMnKVxuICAgIHN1cGVyIGV2ZW50c1xuXG4gIHRhZ05hbWU6ICdmb3JtJ1xuICBjbGFzc05hbWU6ICduZWVkcy12YWxpZGF0aW9uJ1xuXG4gIF9iYXNlVUk6IC0+XG4gICAgc3VibWl0OiAnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXSdcbiAgICBhY3Rpdml0eUluZGljYXRvcjogJy5zcGlubmVyJ1xuXG4gIF9iYXNlRXZlbnRzOiAtPlxuICAgIGV2ZW50SGFzaCA9XG4gICAgICAnY2hhbmdlIFtkYXRhLXZhbGlkYXRpb25dJzogQHZhbGlkYXRlRmllbGRcbiAgICAgICdibHVyIFtkYXRhLXZhbGlkYXRpb25dJzogICBAdmFsaWRhdGVGaWVsZFxuICAgICAgJ2tleXVwIFtkYXRhLXZhbGlkYXRpb25dJzogIEB2YWxpZGF0ZUZpZWxkXG5cbiAgICBldmVudEhhc2hbXCJjbGljayAje0B1aS5zdWJtaXR9XCJdID0gQHByb2Nlc3NGb3JtXG4gICAgZXZlbnRIYXNoXG5cbiAgY3JlYXRlTW9kZWw6IC0+XG4gICAgdGhyb3cgbmV3IEVycm9yICdpbXBsZW1lbnQgI2NyZWF0ZU1vZGVsIGluIHlvdXIgRm9ybVZpZXcgc3ViY2xhc3MgdG8gcmV0dXJuIGEgQmFja2JvbmUgbW9kZWwnICMgbm9xYSBcblxuICBwcmVwYXJlTW9kZWw6IC0+XG4gICAgQG1vZGVsID0gQGNyZWF0ZU1vZGVsKClcbiAgICBAc2V0dXBWYWxpZGF0aW9uKClcblxuICB2YWxpZGF0ZUlucHV0OiAoZWxlbWVudCkgLT5cbiAgICB2YWxpZGF0aW9uID0gZWxlbWVudC5hdHRyKCdkYXRhLXZhbGlkYXRpb24nKVxuICAgIHZhbHVlID0gZWxlbWVudC52YWwoKVxuICAgIGludmFsaWRNZXNzYWdlID0gQG1vZGVsLnByZVZhbGlkYXRlIHZhbGlkYXRpb24sIHZhbHVlXG4gICAgaWYgaW52YWxpZE1lc3NhZ2VcbiAgICAgIGZvcm1Hcm91cCA9IGVsZW1lbnQucGFyZW50KClcbiAgICAgIGZvcm1Hcm91cC5jaGlsZHJlbignLmludmFsaWQtZmVlZGJhY2snKS50ZXh0IGludmFsaWRNZXNzYWdlXG4gICAgICBAaW52YWxpZCBALCB2YWxpZGF0aW9uXG4gICAgZWxzZVxuICAgICAgQHZhbGlkIEAsIHZhbGlkYXRpb25cblxuICB2YWxpZGF0ZUZpZWxkOiAoZXZlbnQpIC0+XG4gICAgZWxlbWVudCA9ICQoZXZlbnQudGFyZ2V0KVxuICAgIEB2YWxpZGF0ZUlucHV0IGVsZW1lbnRcblxuICBwcm9jZXNzRm9ybTogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBAc2hvd0FjdGl2aXR5SW5kaWNhdG9yKClcbiAgICBlbCA9ICQoJ1tkYXRhLXZhbGlkYXRpb25dJylcbiAgICBAdmFsaWRhdGVJbnB1dCBlbFxuICAgIEB1cGRhdGVNb2RlbCgpXG4gICAgQHNhdmVNb2RlbCgpXG5cbiAgdXBkYXRlTW9kZWw6IC0+XG4gICAgdGhyb3cgbmV3IEVycm9yICdpbXBsZW1lbnQgI3VwZGF0ZU1vZGVsIGluIHlvdXIgRm9ybVZpZXcgc3ViY2xhc3MgdG8gdXBkYXRlIHRoZSBhdHRyaWJ1dGVzIG9mIEBtb2RlbCcgIyBub3FhXG5cbiAgc2F2ZU1vZGVsOiAtPlxuICAgIGNhbGxiYWNrcyA9XG4gICAgICBzdWNjZXNzOiA9PiBAdHJpZ2dlciAnc2F2ZTpmb3JtOnN1Y2Nlc3MnLCBAbW9kZWxcbiAgICAgIGVycm9yOiA9PiBAdHJpZ2dlciAnc2F2ZTpmb3JtOmZhaWx1cmUnLCBAbW9kZWxcblxuICAgIEBtb2RlbC5zYXZlIHt9LCBjYWxsYmFja3NcblxuICBzdWNjZXNzOiAobW9kZWwpIC0+XG4gICAgQHJlbmRlcigpXG4gICAgQG9uU3VjY2Vzcyhtb2RlbClcblxuICBvblN1Y2Nlc3M6IC0+IG51bGxcblxuICBmYWlsdXJlOiAobW9kZWwpIC0+XG4gICAgQGhpZGVBY3Rpdml0eUluZGljYXRvcigpXG4gICAgQG9uRmFpbHVyZShtb2RlbClcblxuICBvbkZhaWx1cmU6IC0+IG51bGxcblxuICBzaG93QWN0aXZpdHlJbmRpY2F0b3I6IC0+XG4gICAgQHVpLmFjdGl2aXR5SW5kaWNhdG9yLnNob3coKVxuICAgIEB1aS5zdWJtaXQuaGlkZSgpXG5cbiAgaGlkZUFjdGl2aXR5SW5kaWNhdG9yOiAtPlxuICAgIEB1aS5hY3Rpdml0eUluZGljYXRvci5oaWRlKClcbiAgICBAdWkuc3VibWl0LnNob3coKVxuXG4gIHNldHVwVmFsaWRhdGlvbjogLT5cbiAgICBWYWxpZGF0aW9uLnVuYmluZCB0aGlzXG4gICAgVmFsaWRhdGlvbi5iaW5kIHRoaXMsXG4gICAgICB2YWxpZDogQHZhbGlkXG4gICAgICBpbnZhbGlkOiBAaW52YWxpZFxuXG4gIHZhbGlkOiAodmlldywgYXR0cikgPT5cbiAgICBAJChcIltkYXRhLXZhbGlkYXRpb249I3thdHRyfV1cIilcbiAgICAgIC5yZW1vdmVDbGFzcygnaW52YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ3ZhbGlkJylcblxuICAjaW52YWxpZDogKHZpZXcsIGF0dHIsIGVycm9yLCBzZWxlY3RvcikgPT5cbiAgaW52YWxpZDogKHZpZXcsIGF0dHIpID0+XG4gICAgQGZhaWx1cmUoQG1vZGVsKVxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICAgLnJlbW92ZUNsYXNzKCd2YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ2ludmFsaWQnKVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtVmlld1xuIl19
