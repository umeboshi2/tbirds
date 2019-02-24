var IsEscapeModal,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import Backbone from 'backbone';

import {
  Behavior
} from 'backbone.marionette';

export default IsEscapeModal = (function() {
  class IsEscapeModal extends Behavior {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    keydownHandler(event_object) {
      var keyCode;
      boundMethodCheck(this, IsEscapeModal);
      keyCode = event_object.keyCode;
      // handle escape('esc') key
      if (keyCode === 27) {
        // NOTE sending click to the children
        // since @ui.close_btn may just be a
        // container for the modal_close_button
        this.ui.close_btn.children().click();
        // NOTE
        // we make sure that we unbind the keydownHandler
        // @onBeforeDestroy seems to be skipped on keypress
        return $('html').unbind('keydown', this.keydownHandler);
      }
    }

    onDomRefresh() {
      return $('html').keydown(this.keydownHandler);
    }

    onBeforeDestroy() {
      return $('html').unbind('keydown', this.keydownHandler);
    }

  };

  IsEscapeModal.prototype.events = {
    'click @ui.close_btn': 'onBeforeDestroy'
  };

  return IsEscapeModal;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBO0VBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsUUFBcUI7RUFBTixNQUFBLGNBQUEsUUFBNEIsU0FBNUI7OztVQUdiLENBQUEscUJBQUEsQ0FBQTs7O0lBQUEsY0FBZ0IsQ0FBQyxZQUFELENBQUE7QUFDZCxVQUFBOzZCQUppQjtNQUlqQixPQUFBLEdBQVUsWUFBWSxDQUFDLFFBQXZCOztNQUVBLElBQUcsT0FBQSxLQUFXLEVBQWQ7Ozs7UUFJRSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFkLENBQUEsQ0FBd0IsQ0FBQyxLQUF6QixDQUFBLEVBQUE7Ozs7ZUFJQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFqQixFQUE0QixJQUFDLENBQUEsY0FBN0IsRUFSRjs7SUFIYzs7SUFZaEIsWUFBYyxDQUFBLENBQUE7YUFDWixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsT0FBVixDQUFrQixJQUFDLENBQUEsY0FBbkI7SUFEWTs7SUFFZCxlQUFpQixDQUFBLENBQUE7YUFDZixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFqQixFQUE0QixJQUFDLENBQUEsY0FBN0I7SUFEZTs7RUFqQko7OzBCQUNiLE1BQUEsR0FDRTtJQUFBLHFCQUFBLEVBQXVCO0VBQXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc0VzY2FwZU1vZGFsIGV4dGVuZHMgQmVoYXZpb3JcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2VfYnRuJzogJ29uQmVmb3JlRGVzdHJveSdcbiAga2V5ZG93bkhhbmRsZXI6IChldmVudF9vYmplY3QpID0+XG4gICAga2V5Q29kZSA9IGV2ZW50X29iamVjdC5rZXlDb2RlXG4gICAgIyBoYW5kbGUgZXNjYXBlKCdlc2MnKSBrZXlcbiAgICBpZiBrZXlDb2RlID09IDI3XG4gICAgICAjIE5PVEUgc2VuZGluZyBjbGljayB0byB0aGUgY2hpbGRyZW5cbiAgICAgICMgc2luY2UgQHVpLmNsb3NlX2J0biBtYXkganVzdCBiZSBhXG4gICAgICAjIGNvbnRhaW5lciBmb3IgdGhlIG1vZGFsX2Nsb3NlX2J1dHRvblxuICAgICAgQHVpLmNsb3NlX2J0bi5jaGlsZHJlbigpLmNsaWNrKClcbiAgICAgICMgTk9URVxuICAgICAgIyB3ZSBtYWtlIHN1cmUgdGhhdCB3ZSB1bmJpbmQgdGhlIGtleWRvd25IYW5kbGVyXG4gICAgICAjIEBvbkJlZm9yZURlc3Ryb3kgc2VlbXMgdG8gYmUgc2tpcHBlZCBvbiBrZXlwcmVzc1xuICAgICAgJCgnaHRtbCcpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgJCgnaHRtbCcpLmtleWRvd24gQGtleWRvd25IYW5kbGVyXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICAkKCdodG1sJykudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4iXX0=
