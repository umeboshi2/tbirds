var ShowInitialEmptyContent;

import {
  Behavior
} from 'backbone.marionette';

import EmptyView from '../views/empty';

ShowInitialEmptyContent = (function() {
  class ShowInitialEmptyContent extends Behavior {
    onDomRefresh() {
      var View, view;
      View = this.getOption('emptyView');
      view = new View();
      return this.view.showChildView('content', view);
    }

  };

  ShowInitialEmptyContent.prototype.options = {
    emptyView: EmptyView
  };

  return ShowInitialEmptyContent;

}).call(this);

export default ShowInitialEmptyContent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBTyxTQUFQLE1BQUE7O0FBRU07RUFBTixNQUFBLHdCQUFBLFFBQXNDLFNBQXRDO0lBR0UsWUFBYyxDQUFBLENBQUE7QUFDaEIsVUFBQSxJQUFBLEVBQUE7TUFBSSxJQUFBLEdBQU8sSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BQ1AsSUFBQSxHQUFPLElBQUksSUFBSixDQUFBO2FBQ1AsSUFBQyxDQUFBLElBQUksQ0FBQyxhQUFOLENBQW9CLFNBQXBCLEVBQStCLElBQS9CO0lBSFk7O0VBSGhCOztvQ0FDRSxPQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVc7RUFBWDs7Ozs7O0FBTUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5pbXBvcnQgRW1wdHlWaWV3IGZyb20gJy4uL3ZpZXdzL2VtcHR5J1xuXG5jbGFzcyBTaG93SW5pdGlhbEVtcHR5Q29udGVudCBleHRlbmRzIEJlaGF2aW9yXG4gIG9wdGlvbnM6XG4gICAgZW1wdHlWaWV3OiBFbXB0eVZpZXdcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIFZpZXcgPSBAZ2V0T3B0aW9uICdlbXB0eVZpZXcnXG4gICAgdmlldyA9IG5ldyBWaWV3XG4gICAgQHZpZXcuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnRcbiJdfQ==
