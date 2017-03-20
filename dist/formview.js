var FormView, Marionette, Validation, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('underscore');

Marionette = require('backbone.marionette');

Validation = require('backbone.validation');

FormView = (function(superClass) {
  extend(FormView, superClass);

  function FormView() {
    this.invalid = bind(this.invalid, this);
    this.valid = bind(this.valid, this);
    FormView.__super__.constructor.apply(this, arguments);
    this.listenTo(this, 'render', this.hideActivityIndicator);
    this.listenTo(this, 'render', this.prepareModel);
    this.listenTo(this, 'save:form:success', this.success);
    this.listenTo(this, 'save:form:failure', this.failure);
  }

  FormView.prototype.delegateEvents = function(events) {
    this.ui = _.extend(this._baseUI(), _.result(this, 'ui'));
    this.events = _.extend(this._baseEvents(), _.result(this, 'events'));
    return FormView.__super__.delegateEvents.call(this, events);
  };

  FormView.prototype.tagName = 'form';

  FormView.prototype._baseUI = function() {
    return {
      submit: 'input[type="submit"]',
      activityIndicator: '.spinner'
    };
  };

  FormView.prototype._baseEvents = function() {
    var eventHash;
    eventHash = {
      'change [data-validation]': this.validateField,
      'blur [data-validation]': this.validateField,
      'keyup [data-validation]': this.validateField
    };
    eventHash["click " + this.ui.submit] = this.processForm;
    return eventHash;
  };

  FormView.prototype.createModel = function() {
    throw new Error('implement #createModel in your FormView subclass to return a Backbone model');
  };

  FormView.prototype.prepareModel = function() {
    this.model = this.createModel();
    return this.setupValidation();
  };

  FormView.prototype.validateField = function(e) {
    var validation, value;
    validation = $(e.target).attr('data-validation');
    value = $(e.target).val();
    if (this.model.preValidate(validation, value)) {
      return this.invalid(this, validation);
    } else {
      return this.valid(this, validation);
    }
  };

  FormView.prototype.processForm = function(e) {
    e.preventDefault();
    this.showActivityIndicator();
    this.updateModel();
    return this.saveModel();
  };

  FormView.prototype.updateModel = function() {
    throw new Error('implement #updateModel in your FormView subclass to update the attributes of @model');
  };

  FormView.prototype.saveModel = function() {
    var callbacks;
    callbacks = {
      success: (function(_this) {
        return function() {
          return _this.trigger('save:form:success', _this.model);
        };
      })(this),
      error: (function(_this) {
        return function() {
          return _this.trigger('save:form:failure', _this.model);
        };
      })(this)
    };
    return this.model.save({}, callbacks);
  };

  FormView.prototype.success = function(model) {
    this.render();
    return this.onSuccess(model);
  };

  FormView.prototype.onSuccess = function(model) {
    return null;
  };

  FormView.prototype.failure = function(model) {
    this.hideActivityIndicator();
    return this.onFailure(model);
  };

  FormView.prototype.onFailure = function(model) {
    return null;
  };

  FormView.prototype.showActivityIndicator = function() {
    this.ui.activityIndicator.show();
    return this.ui.submit.hide();
  };

  FormView.prototype.hideActivityIndicator = function() {
    this.ui.activityIndicator.hide();
    return this.ui.submit.show();
  };

  FormView.prototype.setupValidation = function() {
    Backbone.Validation.unbind(this);
    return Backbone.Validation.bind(this, {
      valid: this.valid,
      invalid: this.invalid
    });
  };

  FormView.prototype.valid = function(view, attr, selector) {
    return this.$("[data-validation=" + attr + "]").removeClass('invalid').addClass('valid');
  };

  FormView.prototype.invalid = function(view, attr, error, selector) {
    this.failure(this.model);
    return this.$("[data-validation=" + attr + "]").removeClass('valid').addClass('invalid');
  };

  return FormView;

})(Backbone.Marionette.View);

module.exports = FormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXZpZXcuanMiLCJzb3VyY2VzIjpbImZvcm12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG1DQUFBO0VBQUE7Ozs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVI7O0FBQ0osVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUVQOzs7RUFDUyxrQkFBQTs7O0lBQ1gsMkNBQUEsU0FBQTtJQUVBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixRQUFoQixFQUEwQixJQUFDLENBQUEscUJBQTNCO0lBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLFFBQWhCLEVBQTBCLElBQUMsQ0FBQSxZQUEzQjtJQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixtQkFBaEIsRUFBcUMsSUFBQyxDQUFBLE9BQXRDO0lBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBQWdCLG1CQUFoQixFQUFxQyxJQUFDLENBQUEsT0FBdEM7RUFOVzs7cUJBUWIsY0FBQSxHQUFnQixTQUFDLE1BQUQ7SUFDZCxJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFULEVBQXFCLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFlLElBQWYsQ0FBckI7SUFDTixJQUFDLENBQUEsTUFBRCxHQUFVLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLFdBQUQsQ0FBQSxDQUFULEVBQXlCLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFlLFFBQWYsQ0FBekI7V0FDViw2Q0FBTSxNQUFOO0VBSGM7O3FCQUtoQixPQUFBLEdBQVM7O3FCQUVULE9BQUEsR0FBUyxTQUFBO1dBQ1A7TUFBQSxNQUFBLEVBQVEsc0JBQVI7TUFDQSxpQkFBQSxFQUFtQixVQURuQjs7RUFETzs7cUJBSVQsV0FBQSxHQUFh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QUFDLE1BQXBCLENBQTJCLElBQTNCO1dBQ0EsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFwQixDQUF5QixJQUF6QixFQUNFO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO01BQ0EsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQURWO0tBREY7RUFGZTs7cUJBTWpCLEtBQUEsR0FBTyxTQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsUUFBYjtXQUNMLElBQUMsQ0FBQSxDQUFELENBQUcsbUJBQUEsR0FBb0IsSUFBcEIsR0FBeUIsR0FBNUIsQ0FDRSxDQUFDLFdBREgsQ0FDZSxTQURmLENBRUUsQ0FBQyxRQUZILENBRVksT0FGWjtFQURLOztxQkFLUCxPQUFBLEdBQVMsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLEtBQWIsRUFBb0IsUUFBcEI7SUFDUCxJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxLQUFWO1dBQ0EsSUFBQyxDQUFBLENBQUQsQ0FBRyxtQkFBQSxHQUFvQixJQUFwQixHQUF5QixHQUE1QixDQUNFLENBQUMsV0FESCxDQUNlLE9BRGYsQ0FFRSxDQUFDLFFBRkgsQ0FFWSxTQUZaO0VBRk87Ozs7R0E1RlksUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFrRzNDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblZhbGlkYXRpb24gPSByZXF1aXJlICdiYWNrYm9uZS52YWxpZGF0aW9uJ1xuXG5jbGFzcyBGb3JtVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuXG4gICAgQGxpc3RlblRvIHRoaXMsICdyZW5kZXInLCBAaGlkZUFjdGl2aXR5SW5kaWNhdG9yXG4gICAgQGxpc3RlblRvIHRoaXMsICdyZW5kZXInLCBAcHJlcGFyZU1vZGVsXG4gICAgQGxpc3RlblRvIHRoaXMsICdzYXZlOmZvcm06c3VjY2VzcycsIEBzdWNjZXNzXG4gICAgQGxpc3RlblRvIHRoaXMsICdzYXZlOmZvcm06ZmFpbHVyZScsIEBmYWlsdXJlXG5cbiAgZGVsZWdhdGVFdmVudHM6IChldmVudHMpLT5cbiAgICBAdWkgPSBfLmV4dGVuZCBAX2Jhc2VVSSgpLCBfLnJlc3VsdCh0aGlzLCAndWknKVxuICAgIEBldmVudHMgPSBfLmV4dGVuZCBAX2Jhc2VFdmVudHMoKSwgXy5yZXN1bHQodGhpcywgJ2V2ZW50cycpXG4gICAgc3VwZXIgZXZlbnRzXG5cbiAgdGFnTmFtZTogJ2Zvcm0nXG5cbiAgX2Jhc2VVSTogLT5cbiAgICBzdWJtaXQ6ICdpbnB1dFt0eXBlPVwic3VibWl0XCJdJ1xuICAgIGFjdGl2aXR5SW5kaWNhdG9yOiAnLnNwaW5uZXInXG5cbiAgX2Jhc2VFdmVudHM6IC0+XG4gICAgZXZlbnRIYXNoID1cbiAgICAgICdjaGFuZ2UgW2RhdGEtdmFsaWRhdGlvbl0nOiBAdmFsaWRhdGVGaWVsZFxuICAgICAgJ2JsdXIgW2RhdGEtdmFsaWRhdGlvbl0nOiAgIEB2YWxpZGF0ZUZpZWxkXG4gICAgICAna2V5dXAgW2RhdGEtdmFsaWRhdGlvbl0nOiAgQHZhbGlkYXRlRmllbGRcblxuICAgIGV2ZW50SGFzaFtcImNsaWNrICN7QHVpLnN1Ym1pdH1cIl0gPSBAcHJvY2Vzc0Zvcm1cbiAgICBldmVudEhhc2hcblxuICBjcmVhdGVNb2RlbDogLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgJ2ltcGxlbWVudCAjY3JlYXRlTW9kZWwgaW4geW91ciBGb3JtVmlldyBzdWJjbGFzcyB0byByZXR1cm4gYSBCYWNrYm9uZSBtb2RlbCdcblxuICBwcmVwYXJlTW9kZWw6IC0+XG4gICAgQG1vZGVsID0gQGNyZWF0ZU1vZGVsKClcbiAgICBAc2V0dXBWYWxpZGF0aW9uKClcblxuICB2YWxpZGF0ZUZpZWxkOiAoZSkgLT5cbiAgICB2YWxpZGF0aW9uID0gJChlLnRhcmdldCkuYXR0cignZGF0YS12YWxpZGF0aW9uJylcbiAgICB2YWx1ZSA9ICQoZS50YXJnZXQpLnZhbCgpXG4gICAgaWYgQG1vZGVsLnByZVZhbGlkYXRlIHZhbGlkYXRpb24sIHZhbHVlXG4gICAgICBAaW52YWxpZCBALCB2YWxpZGF0aW9uXG4gICAgZWxzZVxuICAgICAgQHZhbGlkIEAsIHZhbGlkYXRpb25cblxuICBwcm9jZXNzRm9ybTogKGUpIC0+XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgQHNob3dBY3Rpdml0eUluZGljYXRvcigpXG5cbiAgICBAdXBkYXRlTW9kZWwoKVxuICAgIEBzYXZlTW9kZWwoKVxuXG4gIHVwZGF0ZU1vZGVsOiAtPlxuICAgIHRocm93IG5ldyBFcnJvciAnaW1wbGVtZW50ICN1cGRhdGVNb2RlbCBpbiB5b3VyIEZvcm1WaWV3IHN1YmNsYXNzIHRvIHVwZGF0ZSB0aGUgYXR0cmlidXRlcyBvZiBAbW9kZWwnXG5cbiAgc2F2ZU1vZGVsOiAtPlxuICAgIGNhbGxiYWNrcyA9XG4gICAgICBzdWNjZXNzOiA9PiBAdHJpZ2dlciAnc2F2ZTpmb3JtOnN1Y2Nlc3MnLCBAbW9kZWxcbiAgICAgIGVycm9yOiA9PiBAdHJpZ2dlciAnc2F2ZTpmb3JtOmZhaWx1cmUnLCBAbW9kZWxcblxuICAgIEBtb2RlbC5zYXZlIHt9LCBjYWxsYmFja3NcblxuICBzdWNjZXNzOiAobW9kZWwpIC0+XG4gICAgQHJlbmRlcigpXG4gICAgQG9uU3VjY2Vzcyhtb2RlbClcblxuICBvblN1Y2Nlc3M6IChtb2RlbCkgLT4gbnVsbFxuXG4gIGZhaWx1cmU6IChtb2RlbCkgLT5cbiAgICBAaGlkZUFjdGl2aXR5SW5kaWNhdG9yKClcbiAgICBAb25GYWlsdXJlKG1vZGVsKVxuXG4gIG9uRmFpbHVyZTogKG1vZGVsKSAtPiBudWxsXG5cbiAgc2hvd0FjdGl2aXR5SW5kaWNhdG9yOiAtPlxuICAgIEB1aS5hY3Rpdml0eUluZGljYXRvci5zaG93KClcbiAgICBAdWkuc3VibWl0LmhpZGUoKVxuXG4gIGhpZGVBY3Rpdml0eUluZGljYXRvcjogLT5cbiAgICBAdWkuYWN0aXZpdHlJbmRpY2F0b3IuaGlkZSgpXG4gICAgQHVpLnN1Ym1pdC5zaG93KClcblxuICBzZXR1cFZhbGlkYXRpb246IC0+XG4gICAgQmFja2JvbmUuVmFsaWRhdGlvbi51bmJpbmQgdGhpc1xuICAgIEJhY2tib25lLlZhbGlkYXRpb24uYmluZCB0aGlzLFxuICAgICAgdmFsaWQ6IEB2YWxpZFxuICAgICAgaW52YWxpZDogQGludmFsaWRcblxuICB2YWxpZDogKHZpZXcsIGF0dHIsIHNlbGVjdG9yKSA9PlxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICAgLnJlbW92ZUNsYXNzKCdpbnZhbGlkJylcbiAgICAgIC5hZGRDbGFzcygndmFsaWQnKVxuXG4gIGludmFsaWQ6ICh2aWV3LCBhdHRyLCBlcnJvciwgc2VsZWN0b3IpID0+XG4gICAgQGZhaWx1cmUoQG1vZGVsKVxuICAgIEAkKFwiW2RhdGEtdmFsaWRhdGlvbj0je2F0dHJ9XVwiKVxuICAgICAgLnJlbW92ZUNsYXNzKCd2YWxpZCcpXG4gICAgICAuYWRkQ2xhc3MoJ2ludmFsaWQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1WaWV3XG4iXX0=
