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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZm9ybXZpZXcuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Zvcm12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRUEsT0FBQSxRQUFxQjtFQUFOLE1BQUEsU0FBQSxRQUF1QixLQUF2QjtJQUNiLFdBQWEsQ0FBQSxDQUFBOztVQXNGYixDQUFBLFlBQUEsQ0FBQTtVQUtBLENBQUEsY0FBQSxDQUFBO01BeEZFLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixRQUFoQixFQUEwQixJQUFDLENBQUEscUJBQTNCO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLFFBQWhCLEVBQTBCLElBQUMsQ0FBQSxZQUEzQjtNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixtQkFBaEIsRUFBcUMsSUFBQyxDQUFBLE9BQXRDO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLG1CQUFoQixFQUFxQyxJQUFDLENBQUEsT0FBdEM7SUFOVzs7SUFRYixjQUFnQixDQUFDLE1BQUQsQ0FBQTtNQUNkLElBQUMsQ0FBQSxFQUFELEdBQU0sQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFDLENBQUEsT0FBRCxDQUFBLENBQVQsRUFBcUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWUsSUFBZixDQUFyQjtNQUNOLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFDLENBQUEsV0FBRCxDQUFBLENBQVQsRUFBeUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWUsUUFBZixDQUF6QjtrQkFGWixDQUFBLGNBR0UsQ0FBTSxNQUFOO0lBSGM7O0lBT2hCLE9BQVMsQ0FBQSxDQUFBO2FB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LENBQUE7TUFDZixRQUFRLENBQUMsVUFBVSxDQUFDLE1BQXBCLENBQTJCLElBQTNCO2FBQ0EsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFwQixDQUF5QixJQUF6QixFQUNFO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO1FBQ0EsT0FBQSxFQUFTLElBQUMsQ0FBQTtNQURWLENBREY7SUFGZTs7SUFNakIsS0FBTyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsUUFBYixDQUFBOzZCQXZGWTthQXdGakIsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsQ0FBekIsQ0FBSCxDQUNFLENBQUMsV0FESCxDQUNlLFNBRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxPQUZaO0lBREs7O0lBS1AsT0FBUyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsS0FBYixFQUFvQixRQUFwQixDQUFBOzZCQTVGVTtNQTZGakIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsS0FBVjthQUNBLElBQUMsQ0FBQSxDQUFELENBQUcsQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLENBQXpCLENBQUgsQ0FDRSxDQUFDLFdBREgsQ0FDZSxPQURmLENBRUUsQ0FBQyxRQUZILENBRVksU0FGWjtJQUZPOztFQTVGSTs7cUJBY2IsT0FBQSxHQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSAnYmFja2JvbmUudmFsaWRhdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZpZXcgZXh0ZW5kcyBWaWV3XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyIGFyZ3VtZW50cy4uLlxuXG4gICAgQGxpc3RlblRvIHRoaXMsICdyZW5kZXInLCBAaGlkZUFjdGl2aXR5SW5kaWNhdG9yXG4gICAgQGxpc3RlblRvIHRoaXMsICdyZW5kZXInLCBAcHJlcGFyZU1vZGVsXG4gICAgQGxpc3RlblRvIHRoaXMsICdzYXZlOmZvcm06c3VjY2VzcycsIEBzdWNjZXNzXG4gICAgQGxpc3RlblRvIHRoaXMsICdzYXZlOmZvcm06ZmFpbHVyZScsIEBmYWlsdXJlXG5cbiAgZGVsZWdhdGVFdmVudHM6IChldmVudHMpLT5cbiAgICBAdWkgPSBfLmV4dGVuZCBAX2Jhc2VVSSgpLCBfLnJlc3VsdCh0aGlzLCAndWknKVxuICAgIEBldmVudHMgPSBfLmV4dGVuZCBAX2Jhc2VFdmVudHMoKSwgXy5yZXN1bHQodGhpcywgJ2V2ZW50cycpXG4gICAgc3VwZXIgZXZlbnRzXG5cbiAgdGFnTmFtZTogJ2Zvcm0nXG5cbiAgX2Jhc2VVSTogLT5cbiAgICBzdWJtaXQ6ICdpbnB1dFt0eXBlPVwic3VibWl0XCJdJ1xuICAgIGFjdGl2aXR5SW5kaWNhdG9yOiAnLnNwaW5uZXInXG5cbiAgX2Jhc2VFdmVudHM6IC0+XG4gICAgZXZlbnRIYXNoID1cbiAgICAgICdjaGFuZ2UgW2RhdGEtdmFsaWRhdGlvbl0nOiBAdmFsaWRhdGVGaWVsZFxuICAgICAgJ2JsdXIgW2RhdGEtdmFsaWRhdGlvbl0nOiAgIEB2YWxpZGF0ZUZpZWxkXG4gICAgICAna2V5dXAgW2RhdGEtdmFsaWRhdGlvbl0nOiAgQHZhbGlkYXRlRmllbGRcblxuICAgIGV2ZW50SGFzaFtcImNsaWNrICN7QHVpLnN1Ym1pdH1cIl0gPSBAcHJvY2Vzc0Zvcm1cbiAgICBldmVudEhhc2hcblxuICBjcmVhdGVNb2RlbDogLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgJ2ltcGxlbWVudCAjY3JlYXRlTW9kZWwgaW4geW91ciBGb3JtVmlldyBzdWJjbGFzcyB0byByZXR1cm4gYSBCYWNrYm9uZSBtb2RlbCcgIyBub3FhIFxuXG4gIHByZXBhcmVNb2RlbDogLT5cbiAgICBAbW9kZWwgPSBAY3JlYXRlTW9kZWwoKVxuICAgIEBzZXR1cFZhbGlkYXRpb24oKVxuXG4gIHZhbGlkYXRlRmllbGQ6IChlKSAtPlxuICAgIHZhbGlkYXRpb24gPSAkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nKVxuICAgIHZhbHVlID0gJChlLnRhcmdldCkudmFsKClcbiAgICBpZiBAbW9kZWwucHJlVmFsaWRhdGUgdmFsaWRhdGlvbiwgdmFsdWVcbiAgICAgIEBpbnZhbGlkIEAsIHZhbGlkYXRpb25cbiAgICBlbHNlXG4gICAgICBAdmFsaWQgQCwgdmFsaWRhdGlvblxuXG4gIHByb2Nlc3NGb3JtOiAoZSkgLT5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBAc2hvd0FjdGl2aXR5SW5kaWNhdG9yKClcblxuICAgIEB1cGRhdGVNb2RlbCgpXG4gICAgQHNhdmVNb2RlbCgpXG5cbiAgdXBkYXRlTW9kZWw6IC0+XG4gICAgdGhyb3cgbmV3IEVycm9yICdpbXBsZW1lbnQgI3VwZGF0ZU1vZGVsIGluIHlvdXIgRm9ybVZpZXcgc3ViY2xhc3MgdG8gdXBkYXRlIHRoZSBhdHRyaWJ1dGVzIG9mIEBtb2RlbCcgIyBub3FhXG5cbiAgc2F2ZU1vZGVsOiAtPlxuICAgIGNhbGxiYWNrcyA9XG4gICAgICBzdWNjZXNzOiA9PiBAdHJpZ2dlciAnc2F2ZTpmb3JtOnN1Y2Nlc3MnLCBAbW9kZWxcbiAgICAgIGVycm9yOiA9PiBAdHJpZ2dlciAnc2F2ZTpmb3JtOmZhaWx1cmUnLCBAbW9kZWxcblxuICAgIEBtb2RlbC5zYXZlIHt9LCBjYWxsYmFja3NcblxuICBzdWNjZXNzOiAobW9kZWwpIC0+XG4gICAgQHJlbmRlcigpXG4gICAgQG9uU3VjY2Vzcyhtb2RlbClcblxuICBvblN1Y2Nlc3M6IChtb2RlbCkgLT4gbnVsbFxuXG4gIGZhaWx1cmU6IChtb2RlbCkgLT5cbiAgICBAaGlkZUFjdGl2aXR5SW5kaWNhdG9yKClcbiAgICBAb25GYWlsdXJlKG1vZGVsKVxuXG4gIG9uRmFpbHVyZTogKG1vZGVsKSAtPiBudWxsXG5cbiAgc2hvd0FjdGl2aXR5SW5kaWNhdG9yOiAtPlxuICAgIEB1aS5hY3Rpdml0eUluZGljYXRvci5zaG93KClcbiAgICBAdWkuc3VibWl0LmhpZGUoKVxuXG4gIGhpZGVBY3Rpdml0eUluZGljYXRvcjogLT5cbiAgICBAdWkuYWN0aXZpdHlJbmRpY2F0b3IuaGlkZSgpXG4gICAgQHVpLnN1Ym1pdC5zaG93KClcblxuICBzZXR1cFZhbGlkYXRpb246IC0+XG4gICAgQmFja2JvbmUuVmFsaWRhdGlvbi51bmJpbmQgdGhpc1xuICAgIEJhY2tib25lLlZhbGlkYXRpb24uYmluZCB0aGlzLFxuICAgICAgdmFsaWQ6IEB2YWxpZFxuICAgICAgaW52YWxpZDogQGludmFsaWRcblxuICB2YWxpZDogKHZpZXcsIGF0dHIsIHNlbGVjdG9yKSA9PlxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICAgLnJlbW92ZUNsYXNzKCdpbnZhbGlkJylcbiAgICAgIC5hZGRDbGFzcygndmFsaWQnKVxuXG4gIGludmFsaWQ6ICh2aWV3LCBhdHRyLCBlcnJvciwgc2VsZWN0b3IpID0+XG4gICAgQGZhaWx1cmUoQG1vZGVsKVxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICAgLnJlbW92ZUNsYXNzKCd2YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ2ludmFsaWQnKVxuXG4iXX0=
