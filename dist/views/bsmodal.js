var AppChannel, BaseModalView, MainChannel, MessageChannel,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

AppChannel = Backbone.Radio.channel('ebcsv');

BaseModalView = (function() {
  class BaseModalView extends Marionette.View {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    keydownHandler(event_object) {
      var keyCode;
      boundMethodCheck(this, BaseModalView);
      keyCode = event_object.keyCode;
      //console.log "keyCode", keyCode
      // handle escape('esc') key
      if (keyCode === 27) {
        return this.ui.close_btn.click();
      }
    }

    onDomRefresh() {
      return this.ui.html.keydown(this.keydownHandler);
    }

    onBeforeDestroy() {
      return this.ui.html.unbind('keydown', this.keydownHandler);
    }

  };

  BaseModalView.prototype.ui = {
    html: 'html',
    close_btn: '#close-modal div'
  };

  return BaseModalView;

}).call(this);

export default BaseModalView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNtb2RhbC5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNtb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxVQUFBLEVBQUEsYUFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFDakIsVUFBQSxHQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixPQUF2Qjs7QUFFUDtFQUFOLE1BQUEsY0FBQSxRQUE0QixVQUFVLENBQUMsS0FBdkM7OztVQUtFLENBQUEscUJBQUEsQ0FBQTs7O0lBQUEsY0FBZ0IsQ0FBQyxZQUFELENBQUE7QUFDZCxVQUFBOzZCQU5FO01BTUYsT0FBQSxHQUFVLFlBQVksQ0FBQyxRQUF2Qjs7O01BR0EsSUFBRyxPQUFBLEtBQVcsRUFBZDtlQUNFLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQWQsQ0FBQSxFQURGOztJQUpjOztJQU9oQixZQUFjLENBQUEsQ0FBQTthQUNaLElBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQVQsQ0FBaUIsSUFBQyxDQUFBLGNBQWxCO0lBRFk7O0lBR2QsZUFBaUIsQ0FBQSxDQUFBO2FBQ2YsSUFBQyxDQUFBLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBVCxDQUFnQixTQUFoQixFQUEyQixJQUFDLENBQUEsY0FBNUI7SUFEZTs7RUFmbkI7OzBCQUNFLEVBQUEsR0FDRTtJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsU0FBQSxFQUFXO0VBRFg7Ozs7OztBQWdCSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5BcHBDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZWJjc3YnXG5cbmNsYXNzIEJhc2VNb2RhbFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdWk6XG4gICAgaHRtbDogJ2h0bWwnXG4gICAgY2xvc2VfYnRuOiAnI2Nsb3NlLW1vZGFsIGRpdidcbiAgICBcbiAga2V5ZG93bkhhbmRsZXI6IChldmVudF9vYmplY3QpID0+XG4gICAga2V5Q29kZSA9IGV2ZW50X29iamVjdC5rZXlDb2RlXG4gICAgI2NvbnNvbGUubG9nIFwia2V5Q29kZVwiLCBrZXlDb2RlXG4gICAgIyBoYW5kbGUgZXNjYXBlKCdlc2MnKSBrZXlcbiAgICBpZiBrZXlDb2RlID09IDI3XG4gICAgICBAdWkuY2xvc2VfYnRuLmNsaWNrKClcbiAgICAgIFxuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQHVpLmh0bWwua2V5ZG93biBAa2V5ZG93bkhhbmRsZXJcblxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQHVpLmh0bWwudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gIFxuZXhwb3J0IGRlZmF1bHQgQmFzZU1vZGFsVmlld1xuXG5cbiJdfQ==
