var HasPackeryView;

import {
  Behavior
} from 'backbone.marionette';

import Packery from 'packery';

import imagesLoaded from 'imagesloaded';

HasPackeryView = (function() {
  class HasPackeryView extends Behavior {
    ui() {
      return {
        list: this.getOption('listContainer')
      };
    }

    setPackery() {
      var container, packeryOptions;
      container = this.getOption('listContainer');
      packeryOptions = this.getOption('packeryOptions');
      return this.view.packery = new Packery(container, packeryOptions);
    }

    setPackeryLayout() {
      var items, packeryOptions;
      console.log("USING PACKERY!!!!!!!!!!!!");
      packeryOptions = this.getOption('packeryOptions');
      items = this.$(packeryOptions.itemSelector);
      return imagesLoaded(items, () => {
        // FIXME we need to find a better option
        return setTimeout(() => {
          this.view.packery.reloadItems();
          return this.view.packery.layout();
        }, 700);
      });
    }

    onBeforeDestroy() {
      return this.view.packery.destroy();
    }

    onDomRefresh() {
      var ref;
      this.setPackery();
      this.setPackeryLayout();
      if ((ref = this.view) != null ? ref.afterDomRefresh : void 0) {
        return this.view.afterDomRefresh();
      }
    }

    collectionEvents() {
      var data;
      data = {};
      if (this.getOption('hasPageableCollection')) {
        data['pageable:state:change'] = 'setPackeryLayout';
      }
      return data;
    }

  };

  HasPackeryView.prototype.options = {
    listContainer: '.list-container',
    hasPageableCollection: false,
    packeryOptions: {
      gutter: 1,
      isInitLayout: false,
      itemSelector: '.item',
      columnWidth: 10,
      horizontalOrder: true
    }
  };

  HasPackeryView.prototype.regions = {
    list: '@ui.list'
  };

  return HasPackeryView;

}).call(this);

export default HasPackeryView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1wYWNrZXJ5LmpzIiwic291cmNlcyI6WyJiZWhhdmlvcnMvaGFzLXBhY2tlcnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sWUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFNBQTdCO0lBVUUsRUFBSSxDQUFBLENBQUE7YUFDRjtRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsU0FBRCxDQUFXLGVBQVg7TUFBTjtJQURFOztJQUtKLFVBQVksQ0FBQSxDQUFBO0FBQ2QsVUFBQSxTQUFBLEVBQUE7TUFBSSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYO01BQ1osY0FBQSxHQUFpQixJQUFDLENBQUEsU0FBRCxDQUFXLGdCQUFYO2FBQ2pCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixHQUFnQixJQUFJLE9BQUosQ0FBWSxTQUFaLEVBQXVCLGNBQXZCO0lBSE47O0lBS1osZ0JBQWtCLENBQUEsQ0FBQTtBQUNwQixVQUFBLEtBQUEsRUFBQTtNQUFJLE9BQU8sQ0FBQyxHQUFSLENBQVksMkJBQVo7TUFDQSxjQUFBLEdBQWlCLElBQUMsQ0FBQSxTQUFELENBQVcsZ0JBQVg7TUFDakIsS0FBQSxHQUFRLElBQUMsQ0FBQSxDQUFELENBQUcsY0FBYyxDQUFDLFlBQWxCO2FBQ1IsWUFBQSxDQUFhLEtBQWIsRUFBb0IsQ0FBQSxDQUFBLEdBQUEsRUFBQTs7ZUFFbEIsVUFBQSxDQUFXLENBQUEsQ0FBQSxHQUFBO1VBQ1QsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBZCxDQUFBO2lCQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQWQsQ0FBQTtRQUZTLENBQVgsRUFHRSxHQUhGO01BRmtCLENBQXBCO0lBSmdCOztJQVdsQixlQUFpQixDQUFBLENBQUE7YUFDZixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFkLENBQUE7SUFEZTs7SUFHakIsWUFBYyxDQUFBLENBQUE7QUFDaEIsVUFBQTtNQUFJLElBQUMsQ0FBQSxVQUFELENBQUE7TUFDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQTtNQUNBLG1DQUFRLENBQUUsd0JBQVY7ZUFDRSxJQUFDLENBQUEsSUFBSSxDQUFDLGVBQU4sQ0FBQSxFQURGOztJQUhZOztJQU1kLGdCQUFrQixDQUFBLENBQUE7QUFDcEIsVUFBQTtNQUFJLElBQUEsR0FBTyxDQUFBO01BQ1AsSUFBRyxJQUFDLENBQUEsU0FBRCxDQUFXLHVCQUFYLENBQUg7UUFDRSxJQUFJLENBQUMsdUJBQUQsQ0FBSixHQUFnQyxtQkFEbEM7O0FBRUEsYUFBTztJQUpTOztFQXhDcEI7OzJCQUNFLE9BQUEsR0FDRTtJQUFBLGFBQUEsRUFBZSxpQkFBZjtJQUNBLHFCQUFBLEVBQXVCLEtBRHZCO0lBRUEsY0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRLENBQVI7TUFDQSxZQUFBLEVBQWMsS0FEZDtNQUVBLFlBQUEsRUFBYyxPQUZkO01BR0EsV0FBQSxFQUFhLEVBSGI7TUFJQSxlQUFBLEVBQWlCO0lBSmpCO0VBSEY7OzJCQVVGLE9BQUEsR0FDRTtJQUFBLElBQUEsRUFBTTtFQUFOOzs7Ozs7QUFpQ0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFBhY2tlcnkgZnJvbSAncGFja2VyeSdcbmltcG9ydCBpbWFnZXNMb2FkZWQgZnJvbSAnaW1hZ2VzbG9hZGVkJ1xuXG5jbGFzcyBIYXNQYWNrZXJ5VmlldyBleHRlbmRzIEJlaGF2aW9yXG4gIG9wdGlvbnM6XG4gICAgbGlzdENvbnRhaW5lcjogJy5saXN0LWNvbnRhaW5lcidcbiAgICBoYXNQYWdlYWJsZUNvbGxlY3Rpb246IGZhbHNlXG4gICAgcGFja2VyeU9wdGlvbnM6XG4gICAgICBndXR0ZXI6IDFcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2VcbiAgICAgIGl0ZW1TZWxlY3RvcjogJy5pdGVtJ1xuICAgICAgY29sdW1uV2lkdGg6IDEwXG4gICAgICBob3Jpem9udGFsT3JkZXI6IHRydWVcbiAgdWk6IC0+XG4gICAgbGlzdDogQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgcmVnaW9uczpcbiAgICBsaXN0OiAnQHVpLmxpc3QnXG4gICAgXG4gIHNldFBhY2tlcnk6IC0+XG4gICAgY29udGFpbmVyID0gQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgICBwYWNrZXJ5T3B0aW9ucyA9IEBnZXRPcHRpb24gJ3BhY2tlcnlPcHRpb25zJ1xuICAgIEB2aWV3LnBhY2tlcnkgPSBuZXcgUGFja2VyeSBjb250YWluZXIsIHBhY2tlcnlPcHRpb25zXG4gICAgXG4gIHNldFBhY2tlcnlMYXlvdXQ6IC0+XG4gICAgY29uc29sZS5sb2cgXCJVU0lORyBQQUNLRVJZISEhISEhISEhISEhXCJcbiAgICBwYWNrZXJ5T3B0aW9ucyA9IEBnZXRPcHRpb24gJ3BhY2tlcnlPcHRpb25zJ1xuICAgIGl0ZW1zID0gQCQgcGFja2VyeU9wdGlvbnMuaXRlbVNlbGVjdG9yXG4gICAgaW1hZ2VzTG9hZGVkIGl0ZW1zLCA9PlxuICAgICAgIyBGSVhNRSB3ZSBuZWVkIHRvIGZpbmQgYSBiZXR0ZXIgb3B0aW9uXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB2aWV3LnBhY2tlcnkucmVsb2FkSXRlbXMoKVxuICAgICAgICBAdmlldy5wYWNrZXJ5LmxheW91dCgpXG4gICAgICAsIDcwMFxuICAgICAgXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAdmlldy5wYWNrZXJ5LmRlc3Ryb3koKVxuICAgIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgQHNldFBhY2tlcnkoKVxuICAgIEBzZXRQYWNrZXJ5TGF5b3V0KClcbiAgICBpZiBAdmlldz8uYWZ0ZXJEb21SZWZyZXNoXG4gICAgICBAdmlldy5hZnRlckRvbVJlZnJlc2goKVxuICAgIFxuICBjb2xsZWN0aW9uRXZlbnRzOiAtPlxuICAgIGRhdGEgPSB7fVxuICAgIGlmIEBnZXRPcHRpb24gJ2hhc1BhZ2VhYmxlQ29sbGVjdGlvbidcbiAgICAgIGRhdGFbJ3BhZ2VhYmxlOnN0YXRlOmNoYW5nZSddID0gJ3NldFBhY2tlcnlMYXlvdXQnXG4gICAgcmV0dXJuIGRhdGFcbiAgICBcbmV4cG9ydCBkZWZhdWx0IEhhc1BhY2tlcnlWaWV3XG4iXX0=
