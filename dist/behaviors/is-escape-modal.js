var $, Backbone, IsEscapeModal, Marionette,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

IsEscapeModal = (function(superClass) {
  extend(IsEscapeModal, superClass);

  function IsEscapeModal() {
    this.keydownHandler = bind(this.keydownHandler, this);
    return IsEscapeModal.__super__.constructor.apply(this, arguments);
  }

  IsEscapeModal.prototype.events = {
    'click @ui.close_btn': 'onBeforeDestroy'
  };

  IsEscapeModal.prototype.keydownHandler = function(event_object) {
    var keyCode;
    keyCode = event_object.keyCode;
    if (keyCode === 27) {
      this.ui.close_btn.children().click();
      return $('html').unbind('keydown', this.keydownHandler);
    }
  };

  IsEscapeModal.prototype.onDomRefresh = function() {
    return $('html').keydown(this.keydownHandler);
  };

  IsEscapeModal.prototype.onBeforeDestroy = function() {
    return $('html').unbind('keydown', this.keydownHandler);
  };

  return IsEscapeModal;

})(Marionette.Behavior);

module.exports = IsEscapeModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxzQ0FBQTtFQUFBOzs7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUVQOzs7Ozs7OzswQkFDSixNQUFBLEdBQ0U7SUFBQSxxQkFBQSxFQUF1QixpQkFBdkI7OzswQkFDRixjQUFBLEdBQWdCLFNBQUMsWUFBRDtBQUNkLFFBQUE7SUFBQSxPQUFBLEdBQVUsWUFBWSxDQUFDO0lBRXZCLElBQUcsT0FBQSxLQUFXLEVBQWQ7TUFJRSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFkLENBQUEsQ0FBd0IsQ0FBQyxLQUF6QixDQUFBO2FBSUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsU0FBakIsRUFBNEIsSUFBQyxDQUFBLGNBQTdCLEVBUkY7O0VBSGM7OzBCQVloQixZQUFBLEdBQWMsU0FBQTtXQUNaLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxPQUFWLENBQWtCLElBQUMsQ0FBQSxjQUFuQjtFQURZOzswQkFFZCxlQUFBLEdBQWlCLFNBQUE7V0FDZixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFqQixFQUE0QixJQUFDLENBQUEsY0FBN0I7RUFEZTs7OztHQWpCUyxVQUFVLENBQUM7O0FBb0J2QyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiQgPSByZXF1aXJlICdqcXVlcnknXG5CYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbmNsYXNzIElzRXNjYXBlTW9kYWwgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmNsb3NlX2J0bic6ICdvbkJlZm9yZURlc3Ryb3knXG4gIGtleWRvd25IYW5kbGVyOiAoZXZlbnRfb2JqZWN0KSA9PlxuICAgIGtleUNvZGUgPSBldmVudF9vYmplY3Qua2V5Q29kZVxuICAgICMgaGFuZGxlIGVzY2FwZSgnZXNjJykga2V5XG4gICAgaWYga2V5Q29kZSA9PSAyN1xuICAgICAgIyBOT1RFIHNlbmRpbmcgY2xpY2sgdG8gdGhlIGNoaWxkcmVuXG4gICAgICAjIHNpbmNlIEB1aS5jbG9zZV9idG4gbWF5IGp1c3QgYmUgYVxuICAgICAgIyBjb250YWluZXIgZm9yIHRoZSBtb2RhbF9jbG9zZV9idXR0b25cbiAgICAgIEB1aS5jbG9zZV9idG4uY2hpbGRyZW4oKS5jbGljaygpXG4gICAgICAjIE5PVEVcbiAgICAgICMgd2UgbWFrZSBzdXJlIHRoYXQgd2UgdW5iaW5kIHRoZSBrZXlkb3duSGFuZGxlclxuICAgICAgIyBAb25CZWZvcmVEZXN0cm95IHNlZW1zIHRvIGJlIHNraXBwZWQgb24ga2V5cHJlc3NcbiAgICAgICQoJ2h0bWwnKS51bmJpbmQgJ2tleWRvd24nLCBAa2V5ZG93bkhhbmRsZXJcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgICQoJ2h0bWwnKS5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgJCgnaHRtbCcpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBJc0VzY2FwZU1vZGFsXG4iXX0=
