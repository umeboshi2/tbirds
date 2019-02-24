var AppChannel, BaseModalView, MainChannel, MessageChannel,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

AppChannel = Backbone.Radio.channel('ebcsv');

BaseModalView = (function() {
  class BaseModalView extends View {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNtb2RhbC5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNtb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxVQUFBLEVBQUEsYUFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBQ2pCLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBRVA7RUFBTixNQUFBLGNBQUEsUUFBNEIsS0FBNUI7OztVQUtFLENBQUEscUJBQUEsQ0FBQTs7O0lBQUEsY0FBZ0IsQ0FBQyxZQUFELENBQUE7QUFDZCxVQUFBOzZCQU5FO01BTUYsT0FBQSxHQUFVLFlBQVksQ0FBQyxRQUF2Qjs7O01BR0EsSUFBRyxPQUFBLEtBQVcsRUFBZDtlQUNFLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQWQsQ0FBQSxFQURGOztJQUpjOztJQU9oQixZQUFjLENBQUEsQ0FBQTthQUNaLElBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQVQsQ0FBaUIsSUFBQyxDQUFBLGNBQWxCO0lBRFk7O0lBR2QsZUFBaUIsQ0FBQSxDQUFBO2FBQ2YsSUFBQyxDQUFBLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBVCxDQUFnQixTQUFoQixFQUEyQixJQUFDLENBQUEsY0FBNUI7SUFEZTs7RUFmbkI7OzBCQUNFLEVBQUEsR0FDRTtJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsU0FBQSxFQUFXO0VBRFg7Ozs7OztBQWdCSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuQXBwQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2ViY3N2J1xuXG5jbGFzcyBCYXNlTW9kYWxWaWV3IGV4dGVuZHMgVmlld1xuICB1aTpcbiAgICBodG1sOiAnaHRtbCdcbiAgICBjbG9zZV9idG46ICcjY2xvc2UtbW9kYWwgZGl2J1xuICAgIFxuICBrZXlkb3duSGFuZGxlcjogKGV2ZW50X29iamVjdCkgPT5cbiAgICBrZXlDb2RlID0gZXZlbnRfb2JqZWN0LmtleUNvZGVcbiAgICAjY29uc29sZS5sb2cgXCJrZXlDb2RlXCIsIGtleUNvZGVcbiAgICAjIGhhbmRsZSBlc2NhcGUoJ2VzYycpIGtleVxuICAgIGlmIGtleUNvZGUgPT0gMjdcbiAgICAgIEB1aS5jbG9zZV9idG4uY2xpY2soKVxuICAgICAgXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBAdWkuaHRtbC5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAdWkuaHRtbC51bmJpbmQgJ2tleWRvd24nLCBAa2V5ZG93bkhhbmRsZXJcbiAgXG5leHBvcnQgZGVmYXVsdCBCYXNlTW9kYWxWaWV3XG5cblxuIl19
