var FormView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import _ from 'underscore';

import Marionette from 'backbone.marionette';

import Validation from 'backbone.validation';

export default FormView = (function() {
  class FormView extends Marionette.View {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZm9ybXZpZXcuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Zvcm12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxPQUFBLFFBQXFCO0VBQU4sTUFBQSxTQUFBLFFBQXVCLFVBQVUsQ0FBQyxLQUFsQztJQUNiLFdBQWEsQ0FBQSxDQUFBOztVQXNGYixDQUFBLFlBQUEsQ0FBQTtVQUtBLENBQUEsY0FBQSxDQUFBO01BeEZFLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixRQUFoQixFQUEwQixJQUFDLENBQUEscUJBQTNCO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLFFBQWhCLEVBQTBCLElBQUMsQ0FBQSxZQUEzQjtNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixtQkFBaEIsRUFBcUMsSUFBQyxDQUFBLE9BQXRDO01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLG1CQUFoQixFQUFxQyxJQUFDLENBQUEsT0FBdEM7SUFOVzs7SUFRYixjQUFnQixDQUFDLE1BQUQsQ0FBQTtNQUNkLElBQUMsQ0FBQSxFQUFELEdBQU0sQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFDLENBQUEsT0FBRCxDQUFBLENBQVQsRUFBcUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWUsSUFBZixDQUFyQjtNQUNOLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFDLENBQUEsV0FBRCxDQUFBLENBQVQsRUFBeUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWUsUUFBZixDQUF6QjtrQkFGWixDQUFBLGNBR0UsQ0FBTSxNQUFOO0lBSGM7O0lBT2hCLE9BQVMsQ0FBQSxDQUFBO2FB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LENBQUE7TUFDZixRQUFRLENBQUMsVUFBVSxDQUFDLE1BQXBCLENBQTJCLElBQTNCO2FBQ0EsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFwQixDQUF5QixJQUF6QixFQUNFO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO1FBQ0EsT0FBQSxFQUFTLElBQUMsQ0FBQTtNQURWLENBREY7SUFGZTs7SUFNakIsS0FBTyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsUUFBYixDQUFBOzZCQXZGWTthQXdGakIsSUFBQyxDQUFBLENBQUQsQ0FBRyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsSUFBcEIsQ0FBeUIsQ0FBekIsQ0FBSCxDQUNFLENBQUMsV0FESCxDQUNlLFNBRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxPQUZaO0lBREs7O0lBS1AsT0FBUyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsS0FBYixFQUFvQixRQUFwQixDQUFBOzZCQTVGVTtNQTZGakIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsS0FBVjthQUNBLElBQUMsQ0FBQSxDQUFELENBQUcsQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQXBCLENBQXlCLENBQXpCLENBQUgsQ0FDRSxDQUFDLFdBREgsQ0FDZSxPQURmLENBRUUsQ0FBQyxRQUZILENBRVksU0FGWjtJQUZPOztFQTVGSTs7cUJBY2IsT0FBQSxHQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tICdiYWNrYm9uZS52YWxpZGF0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlciBhcmd1bWVudHMuLi5cblxuICAgIEBsaXN0ZW5UbyB0aGlzLCAncmVuZGVyJywgQGhpZGVBY3Rpdml0eUluZGljYXRvclxuICAgIEBsaXN0ZW5UbyB0aGlzLCAncmVuZGVyJywgQHByZXBhcmVNb2RlbFxuICAgIEBsaXN0ZW5UbyB0aGlzLCAnc2F2ZTpmb3JtOnN1Y2Nlc3MnLCBAc3VjY2Vzc1xuICAgIEBsaXN0ZW5UbyB0aGlzLCAnc2F2ZTpmb3JtOmZhaWx1cmUnLCBAZmFpbHVyZVxuXG4gIGRlbGVnYXRlRXZlbnRzOiAoZXZlbnRzKS0+XG4gICAgQHVpID0gXy5leHRlbmQgQF9iYXNlVUkoKSwgXy5yZXN1bHQodGhpcywgJ3VpJylcbiAgICBAZXZlbnRzID0gXy5leHRlbmQgQF9iYXNlRXZlbnRzKCksIF8ucmVzdWx0KHRoaXMsICdldmVudHMnKVxuICAgIHN1cGVyIGV2ZW50c1xuXG4gIHRhZ05hbWU6ICdmb3JtJ1xuXG4gIF9iYXNlVUk6IC0+XG4gICAgc3VibWl0OiAnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXSdcbiAgICBhY3Rpdml0eUluZGljYXRvcjogJy5zcGlubmVyJ1xuXG4gIF9iYXNlRXZlbnRzOiAtPlxuICAgIGV2ZW50SGFzaCA9XG4gICAgICAnY2hhbmdlIFtkYXRhLXZhbGlkYXRpb25dJzogQHZhbGlkYXRlRmllbGRcbiAgICAgICdibHVyIFtkYXRhLXZhbGlkYXRpb25dJzogICBAdmFsaWRhdGVGaWVsZFxuICAgICAgJ2tleXVwIFtkYXRhLXZhbGlkYXRpb25dJzogIEB2YWxpZGF0ZUZpZWxkXG5cbiAgICBldmVudEhhc2hbXCJjbGljayAje0B1aS5zdWJtaXR9XCJdID0gQHByb2Nlc3NGb3JtXG4gICAgZXZlbnRIYXNoXG5cbiAgY3JlYXRlTW9kZWw6IC0+XG4gICAgdGhyb3cgbmV3IEVycm9yICdpbXBsZW1lbnQgI2NyZWF0ZU1vZGVsIGluIHlvdXIgRm9ybVZpZXcgc3ViY2xhc3MgdG8gcmV0dXJuIGEgQmFja2JvbmUgbW9kZWwnICMgbm9xYSBcblxuICBwcmVwYXJlTW9kZWw6IC0+XG4gICAgQG1vZGVsID0gQGNyZWF0ZU1vZGVsKClcbiAgICBAc2V0dXBWYWxpZGF0aW9uKClcblxuICB2YWxpZGF0ZUZpZWxkOiAoZSkgLT5cbiAgICB2YWxpZGF0aW9uID0gJChlLnRhcmdldCkuYXR0cignZGF0YS12YWxpZGF0aW9uJylcbiAgICB2YWx1ZSA9ICQoZS50YXJnZXQpLnZhbCgpXG4gICAgaWYgQG1vZGVsLnByZVZhbGlkYXRlIHZhbGlkYXRpb24sIHZhbHVlXG4gICAgICBAaW52YWxpZCBALCB2YWxpZGF0aW9uXG4gICAgZWxzZVxuICAgICAgQHZhbGlkIEAsIHZhbGlkYXRpb25cblxuICBwcm9jZXNzRm9ybTogKGUpIC0+XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgQHNob3dBY3Rpdml0eUluZGljYXRvcigpXG5cbiAgICBAdXBkYXRlTW9kZWwoKVxuICAgIEBzYXZlTW9kZWwoKVxuXG4gIHVwZGF0ZU1vZGVsOiAtPlxuICAgIHRocm93IG5ldyBFcnJvciAnaW1wbGVtZW50ICN1cGRhdGVNb2RlbCBpbiB5b3VyIEZvcm1WaWV3IHN1YmNsYXNzIHRvIHVwZGF0ZSB0aGUgYXR0cmlidXRlcyBvZiBAbW9kZWwnICMgbm9xYVxuXG4gIHNhdmVNb2RlbDogLT5cbiAgICBjYWxsYmFja3MgPVxuICAgICAgc3VjY2VzczogPT4gQHRyaWdnZXIgJ3NhdmU6Zm9ybTpzdWNjZXNzJywgQG1vZGVsXG4gICAgICBlcnJvcjogPT4gQHRyaWdnZXIgJ3NhdmU6Zm9ybTpmYWlsdXJlJywgQG1vZGVsXG5cbiAgICBAbW9kZWwuc2F2ZSB7fSwgY2FsbGJhY2tzXG5cbiAgc3VjY2VzczogKG1vZGVsKSAtPlxuICAgIEByZW5kZXIoKVxuICAgIEBvblN1Y2Nlc3MobW9kZWwpXG5cbiAgb25TdWNjZXNzOiAobW9kZWwpIC0+IG51bGxcblxuICBmYWlsdXJlOiAobW9kZWwpIC0+XG4gICAgQGhpZGVBY3Rpdml0eUluZGljYXRvcigpXG4gICAgQG9uRmFpbHVyZShtb2RlbClcblxuICBvbkZhaWx1cmU6IChtb2RlbCkgLT4gbnVsbFxuXG4gIHNob3dBY3Rpdml0eUluZGljYXRvcjogLT5cbiAgICBAdWkuYWN0aXZpdHlJbmRpY2F0b3Iuc2hvdygpXG4gICAgQHVpLnN1Ym1pdC5oaWRlKClcblxuICBoaWRlQWN0aXZpdHlJbmRpY2F0b3I6IC0+XG4gICAgQHVpLmFjdGl2aXR5SW5kaWNhdG9yLmhpZGUoKVxuICAgIEB1aS5zdWJtaXQuc2hvdygpXG5cbiAgc2V0dXBWYWxpZGF0aW9uOiAtPlxuICAgIEJhY2tib25lLlZhbGlkYXRpb24udW5iaW5kIHRoaXNcbiAgICBCYWNrYm9uZS5WYWxpZGF0aW9uLmJpbmQgdGhpcyxcbiAgICAgIHZhbGlkOiBAdmFsaWRcbiAgICAgIGludmFsaWQ6IEBpbnZhbGlkXG5cbiAgdmFsaWQ6ICh2aWV3LCBhdHRyLCBzZWxlY3RvcikgPT5cbiAgICBAJChcIltkYXRhLXZhbGlkYXRpb249I3thdHRyfV1cIilcbiAgICAgIC5yZW1vdmVDbGFzcygnaW52YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ3ZhbGlkJylcblxuICBpbnZhbGlkOiAodmlldywgYXR0ciwgZXJyb3IsIHNlbGVjdG9yKSA9PlxuICAgIEBmYWlsdXJlKEBtb2RlbClcbiAgICBAJChcIltkYXRhLXZhbGlkYXRpb249I3thdHRyfV1cIilcbiAgICAgIC5yZW1vdmVDbGFzcygndmFsaWQnKVxuICAgICAgLmFkZENsYXNzKCdpbnZhbGlkJylcblxuIl19
