var FormView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import _ from 'underscore';

import {
  View
} from 'backbone.marionette';

import Validation from 'backbone.validation';

export default FormView = (function() {
  class FormView extends View {
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

    validateInput(element) {
      var formGroup, invalidMessage, valid, validation, value;
      validation = element.attr('data-validation');
      value = element.val();
      valid = this.model.preValidate(validation, value);
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

  FormView.prototype.className = 'needs-validation';

  return FormView;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZm9ybXZpZXcuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Zvcm12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRUEsT0FBQSxRQUFxQjtFQUFOLE1BQUEsU0FBQSxRQUF1QixLQUF2QjtJQUNiLFdBQWEsQ0FBQSxDQUFBOztVQWdHYixDQUFBLFlBQUEsQ0FBQTtVQUtBLENBQUEsY0FBQSxDQUFBO01BbEdFLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixRQUFoQixFQUEwQixJQUFDLENBQUEscUJBQTNCO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLFFBQWhCLEVBQTBCLElBQUMsQ0FBQSxZQUEzQjtNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixtQkFBaEIsRUFBcUMsSUFBQyxDQUFBLE9BQXRDO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLG1CQUFoQixFQUFxQyxJQUFDLENBQUEsT0FBdEM7SUFOVzs7SUFRYixjQUFnQixDQUFDLE1BQUQsQ0FBQTtNQUNkLElBQUMsQ0FBQSxFQUFELEdBQU0sQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFDLENBQUEsT0FBRCxDQUFBLENBQVQsRUFBcUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWUsSUFBZixDQUFyQjtNQUNOLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFDLENBQUEsV0FBRCxDQUFBLENBQVQsRUFBeUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWUsUUFBZixDQUF6QjtrQkFGWixDQUFBLGNBR0UsQ0FBTSxNQUFOO0lBSGM7O0lBUWhCLE9BQVMsQ0FBQSxDQUFBO2FB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RkgsQ0FFWSxTQUZaO0lBRk87O0VBdEdJOztxQkFjYixPQUFBLEdBQVM7O3FCQUNULFNBQUEsR0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gJ2JhY2tib25lLnZhbGlkYXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1WaWV3IGV4dGVuZHMgVmlld1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlciBhcmd1bWVudHMuLi5cblxuICAgIEBsaXN0ZW5UbyB0aGlzLCAncmVuZGVyJywgQGhpZGVBY3Rpdml0eUluZGljYXRvclxuICAgIEBsaXN0ZW5UbyB0aGlzLCAncmVuZGVyJywgQHByZXBhcmVNb2RlbFxuICAgIEBsaXN0ZW5UbyB0aGlzLCAnc2F2ZTpmb3JtOnN1Y2Nlc3MnLCBAc3VjY2Vzc1xuICAgIEBsaXN0ZW5UbyB0aGlzLCAnc2F2ZTpmb3JtOmZhaWx1cmUnLCBAZmFpbHVyZVxuXG4gIGRlbGVnYXRlRXZlbnRzOiAoZXZlbnRzKS0+XG4gICAgQHVpID0gXy5leHRlbmQgQF9iYXNlVUkoKSwgXy5yZXN1bHQodGhpcywgJ3VpJylcbiAgICBAZXZlbnRzID0gXy5leHRlbmQgQF9iYXNlRXZlbnRzKCksIF8ucmVzdWx0KHRoaXMsICdldmVudHMnKVxuICAgIHN1cGVyIGV2ZW50c1xuXG4gIHRhZ05hbWU6ICdmb3JtJ1xuICBjbGFzc05hbWU6ICduZWVkcy12YWxpZGF0aW9uJ1xuXG4gIF9iYXNlVUk6IC0+XG4gICAgc3VibWl0OiAnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXSdcbiAgICBhY3Rpdml0eUluZGljYXRvcjogJy5zcGlubmVyJ1xuXG4gIF9iYXNlRXZlbnRzOiAtPlxuICAgIGV2ZW50SGFzaCA9XG4gICAgICAnY2hhbmdlIFtkYXRhLXZhbGlkYXRpb25dJzogQHZhbGlkYXRlRmllbGRcbiAgICAgICdibHVyIFtkYXRhLXZhbGlkYXRpb25dJzogICBAdmFsaWRhdGVGaWVsZFxuICAgICAgJ2tleXVwIFtkYXRhLXZhbGlkYXRpb25dJzogIEB2YWxpZGF0ZUZpZWxkXG5cbiAgICBldmVudEhhc2hbXCJjbGljayAje0B1aS5zdWJtaXR9XCJdID0gQHByb2Nlc3NGb3JtXG4gICAgZXZlbnRIYXNoXG5cbiAgY3JlYXRlTW9kZWw6IC0+XG4gICAgdGhyb3cgbmV3IEVycm9yICdpbXBsZW1lbnQgI2NyZWF0ZU1vZGVsIGluIHlvdXIgRm9ybVZpZXcgc3ViY2xhc3MgdG8gcmV0dXJuIGEgQmFja2JvbmUgbW9kZWwnICMgbm9xYSBcblxuICBwcmVwYXJlTW9kZWw6IC0+XG4gICAgQG1vZGVsID0gQGNyZWF0ZU1vZGVsKClcbiAgICBAc2V0dXBWYWxpZGF0aW9uKClcblxuICB2YWxpZGF0ZUlucHV0OiAoZWxlbWVudCkgLT5cbiAgICB2YWxpZGF0aW9uID0gZWxlbWVudC5hdHRyKCdkYXRhLXZhbGlkYXRpb24nKVxuICAgIHZhbHVlID0gZWxlbWVudC52YWwoKVxuICAgIHZhbGlkID0gQG1vZGVsLnByZVZhbGlkYXRlIHZhbGlkYXRpb24sIHZhbHVlXG4gICAgaW52YWxpZE1lc3NhZ2UgPSBAbW9kZWwucHJlVmFsaWRhdGUgdmFsaWRhdGlvbiwgdmFsdWVcbiAgICBpZiBpbnZhbGlkTWVzc2FnZVxuICAgICAgZm9ybUdyb3VwID0gZWxlbWVudC5wYXJlbnQoKVxuICAgICAgZm9ybUdyb3VwLmNoaWxkcmVuKCcuaW52YWxpZC1mZWVkYmFjaycpLnRleHQgaW52YWxpZE1lc3NhZ2VcbiAgICAgIEBpbnZhbGlkIEAsIHZhbGlkYXRpb25cbiAgICBlbHNlXG4gICAgICBAdmFsaWQgQCwgdmFsaWRhdGlvblxuXG4gIHZhbGlkYXRlRmllbGQ6IChldmVudCkgLT5cbiAgICBlbGVtZW50ID0gJChldmVudC50YXJnZXQpXG4gICAgQHZhbGlkYXRlSW5wdXQgZWxlbWVudFxuXG4gIHByb2Nlc3NGb3JtOiAoZXZlbnQpIC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIEBzaG93QWN0aXZpdHlJbmRpY2F0b3IoKVxuICAgIGVsID0gJCgnW2RhdGEtdmFsaWRhdGlvbl0nKVxuICAgIEB2YWxpZGF0ZUlucHV0IGVsXG4gICAgQHVwZGF0ZU1vZGVsKClcbiAgICBAc2F2ZU1vZGVsKClcblxuICB1cGRhdGVNb2RlbDogLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgJ2ltcGxlbWVudCAjdXBkYXRlTW9kZWwgaW4geW91ciBGb3JtVmlldyBzdWJjbGFzcyB0byB1cGRhdGUgdGhlIGF0dHJpYnV0ZXMgb2YgQG1vZGVsJyAjIG5vcWFcblxuICBzYXZlTW9kZWw6IC0+XG4gICAgY2FsbGJhY2tzID1cbiAgICAgIHN1Y2Nlc3M6ID0+IEB0cmlnZ2VyICdzYXZlOmZvcm06c3VjY2VzcycsIEBtb2RlbFxuICAgICAgZXJyb3I6ID0+IEB0cmlnZ2VyICdzYXZlOmZvcm06ZmFpbHVyZScsIEBtb2RlbFxuXG4gICAgQG1vZGVsLnNhdmUge30sIGNhbGxiYWNrc1xuXG4gIHN1Y2Nlc3M6IChtb2RlbCkgLT5cbiAgICBAcmVuZGVyKClcbiAgICBAb25TdWNjZXNzKG1vZGVsKVxuXG4gIG9uU3VjY2VzczogKG1vZGVsKSAtPiBudWxsXG5cbiAgZmFpbHVyZTogKG1vZGVsKSAtPlxuICAgIEBoaWRlQWN0aXZpdHlJbmRpY2F0b3IoKVxuICAgIEBvbkZhaWx1cmUobW9kZWwpXG5cbiAgb25GYWlsdXJlOiAobW9kZWwpIC0+IG51bGxcblxuICBzaG93QWN0aXZpdHlJbmRpY2F0b3I6IC0+XG4gICAgQHVpLmFjdGl2aXR5SW5kaWNhdG9yLnNob3coKVxuICAgIEB1aS5zdWJtaXQuaGlkZSgpXG5cbiAgaGlkZUFjdGl2aXR5SW5kaWNhdG9yOiAtPlxuICAgIEB1aS5hY3Rpdml0eUluZGljYXRvci5oaWRlKClcbiAgICBAdWkuc3VibWl0LnNob3coKVxuXG4gIHNldHVwVmFsaWRhdGlvbjogLT5cbiAgICBCYWNrYm9uZS5WYWxpZGF0aW9uLnVuYmluZCB0aGlzXG4gICAgQmFja2JvbmUuVmFsaWRhdGlvbi5iaW5kIHRoaXMsXG4gICAgICB2YWxpZDogQHZhbGlkXG4gICAgICBpbnZhbGlkOiBAaW52YWxpZFxuXG4gIHZhbGlkOiAodmlldywgYXR0ciwgc2VsZWN0b3IpID0+XG4gICAgQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKVxuICAgICAgLmFkZENsYXNzKCd2YWxpZCcpXG5cbiAgaW52YWxpZDogKHZpZXcsIGF0dHIsIGVycm9yLCBzZWxlY3RvcikgPT5cbiAgICBAZmFpbHVyZShAbW9kZWwpXG4gICAgQCQoXCJbZGF0YS12YWxpZGF0aW9uPSN7YXR0cn1dXCIpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ3ZhbGlkJylcbiAgICAgIC5hZGRDbGFzcygnaW52YWxpZCcpXG5cbiJdfQ==
