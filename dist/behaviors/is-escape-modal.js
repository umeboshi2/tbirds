var IsEscapeModal, MainChannel,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import {
  Radio
} from 'backbone';

import {
  Behavior
} from 'backbone.marionette';

MainChannel = Radio.channel('global');

IsEscapeModal = class IsEscapeModal extends Behavior {
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
      // we don't need to listen anymore
      $('html').unbind('keydown', this.keydownHandler);
      return this.emptyModal();
    }
  }

  onDomRefresh() {
    return $('html').keydown(this.keydownHandler);
  }

  onBeforeDestroy() {
    return $('html').unbind('keydown', this.keydownHandler);
  }

  emptyModal() {
    var region;
    region = MainChannel.request('main:app:modal-region');
    return region.empty();
  }

};

export default IsEscapeModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsV0FBQTtFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFUixnQkFBTixNQUFBLGNBQUEsUUFBNEIsU0FBNUI7OztRQUNFLENBQUEscUJBQUEsQ0FBQTs7O0VBQUEsY0FBZ0IsQ0FBQyxZQUFELENBQUE7QUFDbEIsUUFBQTsyQkFGTTtJQUVGLE9BQUEsR0FBVSxZQUFZLENBQUMsUUFBM0I7O0lBRUksSUFBRyxPQUFBLEtBQVcsRUFBZDs7TUFFRSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFqQixFQUE0QixJQUFDLENBQUEsY0FBN0I7YUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBSEY7O0VBSGM7O0VBT2hCLFlBQWMsQ0FBQSxDQUFBO1dBQ1osQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE9BQVYsQ0FBa0IsSUFBQyxDQUFBLGNBQW5CO0VBRFk7O0VBRWQsZUFBaUIsQ0FBQSxDQUFBO1dBQ2YsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsU0FBakIsRUFBNEIsSUFBQyxDQUFBLGNBQTdCO0VBRGU7O0VBRWpCLFVBQVksQ0FBQSxDQUFBO0FBQ2QsUUFBQTtJQUFJLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQix1QkFBcEI7V0FDVCxNQUFNLENBQUMsS0FBUCxDQUFBO0VBRlU7O0FBWmQ7O0FBZ0JBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBJc0VzY2FwZU1vZGFsIGV4dGVuZHMgQmVoYXZpb3JcbiAga2V5ZG93bkhhbmRsZXI6IChldmVudF9vYmplY3QpID0+XG4gICAga2V5Q29kZSA9IGV2ZW50X29iamVjdC5rZXlDb2RlXG4gICAgIyBoYW5kbGUgZXNjYXBlKCdlc2MnKSBrZXlcbiAgICBpZiBrZXlDb2RlID09IDI3XG4gICAgICAjIHdlIGRvbid0IG5lZWQgdG8gbGlzdGVuIGFueW1vcmVcbiAgICAgICQoJ2h0bWwnKS51bmJpbmQgJ2tleWRvd24nLCBAa2V5ZG93bkhhbmRsZXJcbiAgICAgIEBlbXB0eU1vZGFsKClcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgICQoJ2h0bWwnKS5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgJCgnaHRtbCcpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICBlbXB0eU1vZGFsOiAtPlxuICAgIHJlZ2lvbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm1vZGFsLXJlZ2lvbidcbiAgICByZWdpb24uZW1wdHkoKVxuXG5leHBvcnQgZGVmYXVsdCBJc0VzY2FwZU1vZGFsXG4iXX0=
