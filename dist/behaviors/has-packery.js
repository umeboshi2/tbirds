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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1wYWNrZXJ5LmpzIiwic291cmNlcyI6WyJiZWhhdmlvcnMvaGFzLXBhY2tlcnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sWUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFNBQTdCO0lBVUUsRUFBSSxDQUFBLENBQUE7YUFDRjtRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsU0FBRCxDQUFXLGVBQVg7TUFBTjtJQURFOztJQUtKLFVBQVksQ0FBQSxDQUFBO0FBQ1YsVUFBQSxTQUFBLEVBQUE7TUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYO01BQ1osY0FBQSxHQUFpQixJQUFDLENBQUEsU0FBRCxDQUFXLGdCQUFYO2FBQ2pCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixHQUFnQixJQUFJLE9BQUosQ0FBWSxTQUFaLEVBQXVCLGNBQXZCO0lBSE47O0lBS1osZ0JBQWtCLENBQUEsQ0FBQTtBQUNoQixVQUFBLEtBQUEsRUFBQTtNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMkJBQVo7TUFDQSxjQUFBLEdBQWlCLElBQUMsQ0FBQSxTQUFELENBQVcsZ0JBQVg7TUFDakIsS0FBQSxHQUFRLElBQUMsQ0FBQSxDQUFELENBQUcsY0FBYyxDQUFDLFlBQWxCO2FBQ1IsWUFBQSxDQUFhLEtBQWIsRUFBb0IsQ0FBQSxDQUFBLEdBQUEsRUFBQTs7ZUFFbEIsVUFBQSxDQUFXLENBQUEsQ0FBQSxHQUFBO1VBQ1QsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBZCxDQUFBO2lCQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQWQsQ0FBQTtRQUZTLENBQVgsRUFHRSxHQUhGO01BRmtCLENBQXBCO0lBSmdCOztJQVdsQixlQUFpQixDQUFBLENBQUE7YUFDZixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFkLENBQUE7SUFEZTs7SUFHakIsWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBO01BQUEsSUFBQyxDQUFBLFVBQUQsQ0FBQTtNQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO01BQ0EsbUNBQVEsQ0FBRSx3QkFBVjtlQUNFLElBQUMsQ0FBQSxJQUFJLENBQUMsZUFBTixDQUFBLEVBREY7O0lBSFk7O0lBTWQsZ0JBQWtCLENBQUEsQ0FBQTtBQUNoQixVQUFBO01BQUEsSUFBQSxHQUFPLENBQUE7TUFDUCxJQUFHLElBQUMsQ0FBQSxTQUFELENBQVcsdUJBQVgsQ0FBSDtRQUNFLElBQUssQ0FBQSx1QkFBQSxDQUFMLEdBQWdDLG1CQURsQzs7QUFFQSxhQUFPO0lBSlM7O0VBeENwQjs7MkJBQ0UsT0FBQSxHQUNFO0lBQUEsYUFBQSxFQUFlLGlCQUFmO0lBQ0EscUJBQUEsRUFBdUIsS0FEdkI7SUFFQSxjQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVEsQ0FBUjtNQUNBLFlBQUEsRUFBYyxLQURkO01BRUEsWUFBQSxFQUFjLE9BRmQ7TUFHQSxXQUFBLEVBQWEsRUFIYjtNQUlBLGVBQUEsRUFBaUI7SUFKakI7RUFIRjs7MkJBVUYsT0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNO0VBQU47Ozs7OztBQWlDSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgUGFja2VyeSBmcm9tICdwYWNrZXJ5J1xuaW1wb3J0IGltYWdlc0xvYWRlZCBmcm9tICdpbWFnZXNsb2FkZWQnXG5cbmNsYXNzIEhhc1BhY2tlcnlWaWV3IGV4dGVuZHMgQmVoYXZpb3JcbiAgb3B0aW9uczpcbiAgICBsaXN0Q29udGFpbmVyOiAnLmxpc3QtY29udGFpbmVyJ1xuICAgIGhhc1BhZ2VhYmxlQ29sbGVjdGlvbjogZmFsc2VcbiAgICBwYWNrZXJ5T3B0aW9uczpcbiAgICAgIGd1dHRlcjogMVxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZVxuICAgICAgaXRlbVNlbGVjdG9yOiAnLml0ZW0nXG4gICAgICBjb2x1bW5XaWR0aDogMTBcbiAgICAgIGhvcml6b250YWxPcmRlcjogdHJ1ZVxuICB1aTogLT5cbiAgICBsaXN0OiBAZ2V0T3B0aW9uICdsaXN0Q29udGFpbmVyJ1xuICByZWdpb25zOlxuICAgIGxpc3Q6ICdAdWkubGlzdCdcbiAgICBcbiAgc2V0UGFja2VyeTogLT5cbiAgICBjb250YWluZXIgPSBAZ2V0T3B0aW9uICdsaXN0Q29udGFpbmVyJ1xuICAgIHBhY2tlcnlPcHRpb25zID0gQGdldE9wdGlvbiAncGFja2VyeU9wdGlvbnMnXG4gICAgQHZpZXcucGFja2VyeSA9IG5ldyBQYWNrZXJ5IGNvbnRhaW5lciwgcGFja2VyeU9wdGlvbnNcbiAgICBcbiAgc2V0UGFja2VyeUxheW91dDogLT5cbiAgICBjb25zb2xlLmxvZyBcIlVTSU5HIFBBQ0tFUlkhISEhISEhISEhISFcIlxuICAgIHBhY2tlcnlPcHRpb25zID0gQGdldE9wdGlvbiAncGFja2VyeU9wdGlvbnMnXG4gICAgaXRlbXMgPSBAJCBwYWNrZXJ5T3B0aW9ucy5pdGVtU2VsZWN0b3JcbiAgICBpbWFnZXNMb2FkZWQgaXRlbXMsID0+XG4gICAgICAjIEZJWE1FIHdlIG5lZWQgdG8gZmluZCBhIGJldHRlciBvcHRpb25cbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHZpZXcucGFja2VyeS5yZWxvYWRJdGVtcygpXG4gICAgICAgIEB2aWV3LnBhY2tlcnkubGF5b3V0KClcbiAgICAgICwgNzAwXG4gICAgICBcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIEB2aWV3LnBhY2tlcnkuZGVzdHJveSgpXG4gICAgXG4gIG9uRG9tUmVmcmVzaDogKCkgLT5cbiAgICBAc2V0UGFja2VyeSgpXG4gICAgQHNldFBhY2tlcnlMYXlvdXQoKVxuICAgIGlmIEB2aWV3Py5hZnRlckRvbVJlZnJlc2hcbiAgICAgIEB2aWV3LmFmdGVyRG9tUmVmcmVzaCgpXG4gICAgXG4gIGNvbGxlY3Rpb25FdmVudHM6IC0+XG4gICAgZGF0YSA9IHt9XG4gICAgaWYgQGdldE9wdGlvbiAnaGFzUGFnZWFibGVDb2xsZWN0aW9uJ1xuICAgICAgZGF0YVsncGFnZWFibGU6c3RhdGU6Y2hhbmdlJ10gPSAnc2V0UGFja2VyeUxheW91dCdcbiAgICByZXR1cm4gZGF0YVxuICAgIFxuZXhwb3J0IGRlZmF1bHQgSGFzUGFja2VyeVZpZXdcbiJdfQ==
