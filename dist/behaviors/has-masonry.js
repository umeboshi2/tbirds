var HasMasonryView;

import {
  Behavior
} from 'backbone.marionette';

import Masonry from 'masonry-layout';

import imagesLoaded from 'imagesloaded';

HasMasonryView = (function() {
  class HasMasonryView extends Behavior {
    ui() {
      return {
        list: this.getOption('listContainer')
      };
    }

    setMasonry() {
      var container, masonryOptions;
      container = this.getOption('listContainer');
      masonryOptions = this.getOption('masonryOptions');
      return this.view.masonry = new Masonry(container, masonryOptions);
    }

    setMasonryLayout() {
      var items, masonryOptions;
      masonryOptions = this.getOption('masonryOptions');
      items = this.$(masonryOptions.itemSelector);
      return imagesLoaded(items, () => {
        // FIXME we need to find a better option
        return setTimeout(() => {
          this.view.masonry.reloadItems();
          return this.view.masonry.layout();
        }, 700);
      });
    }

    onBeforeDestroy() {
      return this.view.masonry.destroy();
    }

    onDomRefresh() {
      var ref;
      this.setMasonry();
      this.setMasonryLayout();
      if ((ref = this.view) != null ? ref.afterDomRefresh : void 0) {
        return this.view.afterDomRefresh();
      }
    }

    collectionEvents() {
      var data;
      data = {};
      if (this.getOption('hasPageableCollection')) {
        data['pageable:state:change'] = 'setMasonryLayout';
      }
      return data;
    }

  };

  HasMasonryView.prototype.options = {
    listContainer: '.list-container',
    hasPageableCollection: false,
    masonryOptions: {
      gutter: 1,
      isInitLayout: false,
      itemSelector: '.item',
      columnWidth: 10,
      horizontalOrder: true
    }
  };

  HasMasonryView.prototype.regions = {
    list: '@ui.list'
  };

  return HasMasonryView;

}).call(this);

export default HasMasonryView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1tYXNvbnJ5LmpzIiwic291cmNlcyI6WyJiZWhhdmlvcnMvaGFzLW1hc29ucnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sWUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFNBQTdCO0lBVUUsRUFBSSxDQUFBLENBQUE7YUFDRjtRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsU0FBRCxDQUFXLGVBQVg7TUFBTjtJQURFOztJQUtKLFVBQVksQ0FBQSxDQUFBO0FBQ2QsVUFBQSxTQUFBLEVBQUE7TUFBSSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYO01BQ1osY0FBQSxHQUFpQixJQUFDLENBQUEsU0FBRCxDQUFXLGdCQUFYO2FBQ2pCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixHQUFnQixJQUFJLE9BQUosQ0FBWSxTQUFaLEVBQXVCLGNBQXZCO0lBSE47O0lBS1osZ0JBQWtCLENBQUEsQ0FBQTtBQUNwQixVQUFBLEtBQUEsRUFBQTtNQUFJLGNBQUEsR0FBaUIsSUFBQyxDQUFBLFNBQUQsQ0FBVyxnQkFBWDtNQUNqQixLQUFBLEdBQVEsSUFBQyxDQUFBLENBQUQsQ0FBRyxjQUFjLENBQUMsWUFBbEI7YUFDUixZQUFBLENBQWEsS0FBYixFQUFvQixDQUFBLENBQUEsR0FBQSxFQUFBOztlQUVsQixVQUFBLENBQVcsQ0FBQSxDQUFBLEdBQUE7VUFDVCxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFkLENBQUE7aUJBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBZCxDQUFBO1FBRlMsQ0FBWCxFQUdFLEdBSEY7TUFGa0IsQ0FBcEI7SUFIZ0I7O0lBVWxCLGVBQWlCLENBQUEsQ0FBQTthQUNmLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWQsQ0FBQTtJQURlOztJQUdqQixZQUFjLENBQUEsQ0FBQTtBQUNoQixVQUFBO01BQUksSUFBQyxDQUFBLFVBQUQsQ0FBQTtNQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO01BQ0EsbUNBQVEsQ0FBRSx3QkFBVjtlQUNFLElBQUMsQ0FBQSxJQUFJLENBQUMsZUFBTixDQUFBLEVBREY7O0lBSFk7O0lBTWQsZ0JBQWtCLENBQUEsQ0FBQTtBQUNwQixVQUFBO01BQUksSUFBQSxHQUFPLENBQUE7TUFDUCxJQUFHLElBQUMsQ0FBQSxTQUFELENBQVcsdUJBQVgsQ0FBSDtRQUNFLElBQUksQ0FBQyx1QkFBRCxDQUFKLEdBQWdDLG1CQURsQzs7QUFFQSxhQUFPO0lBSlM7O0VBdkNwQjs7MkJBQ0UsT0FBQSxHQUNFO0lBQUEsYUFBQSxFQUFlLGlCQUFmO0lBQ0EscUJBQUEsRUFBdUIsS0FEdkI7SUFFQSxjQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVEsQ0FBUjtNQUNBLFlBQUEsRUFBYyxLQURkO01BRUEsWUFBQSxFQUFjLE9BRmQ7TUFHQSxXQUFBLEVBQWEsRUFIYjtNQUlBLGVBQUEsRUFBaUI7SUFKakI7RUFIRjs7MkJBVUYsT0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNO0VBQU47Ozs7OztBQWdDSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgTWFzb25yeSBmcm9tICdtYXNvbnJ5LWxheW91dCdcbmltcG9ydCBpbWFnZXNMb2FkZWQgZnJvbSAnaW1hZ2VzbG9hZGVkJ1xuXG5jbGFzcyBIYXNNYXNvbnJ5VmlldyBleHRlbmRzIEJlaGF2aW9yXG4gIG9wdGlvbnM6XG4gICAgbGlzdENvbnRhaW5lcjogJy5saXN0LWNvbnRhaW5lcidcbiAgICBoYXNQYWdlYWJsZUNvbGxlY3Rpb246IGZhbHNlXG4gICAgbWFzb25yeU9wdGlvbnM6XG4gICAgICBndXR0ZXI6IDFcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2VcbiAgICAgIGl0ZW1TZWxlY3RvcjogJy5pdGVtJ1xuICAgICAgY29sdW1uV2lkdGg6IDEwXG4gICAgICBob3Jpem9udGFsT3JkZXI6IHRydWVcbiAgdWk6IC0+XG4gICAgbGlzdDogQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgcmVnaW9uczpcbiAgICBsaXN0OiAnQHVpLmxpc3QnXG4gICAgXG4gIHNldE1hc29ucnk6IC0+XG4gICAgY29udGFpbmVyID0gQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgICBtYXNvbnJ5T3B0aW9ucyA9IEBnZXRPcHRpb24gJ21hc29ucnlPcHRpb25zJ1xuICAgIEB2aWV3Lm1hc29ucnkgPSBuZXcgTWFzb25yeSBjb250YWluZXIsIG1hc29ucnlPcHRpb25zXG4gICAgXG4gIHNldE1hc29ucnlMYXlvdXQ6IC0+XG4gICAgbWFzb25yeU9wdGlvbnMgPSBAZ2V0T3B0aW9uICdtYXNvbnJ5T3B0aW9ucydcbiAgICBpdGVtcyA9IEAkIG1hc29ucnlPcHRpb25zLml0ZW1TZWxlY3RvclxuICAgIGltYWdlc0xvYWRlZCBpdGVtcywgPT5cbiAgICAgICMgRklYTUUgd2UgbmVlZCB0byBmaW5kIGEgYmV0dGVyIG9wdGlvblxuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdmlldy5tYXNvbnJ5LnJlbG9hZEl0ZW1zKClcbiAgICAgICAgQHZpZXcubWFzb25yeS5sYXlvdXQoKVxuICAgICAgLCA3MDBcbiAgICAgIFxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQHZpZXcubWFzb25yeS5kZXN0cm95KClcbiAgICBcbiAgb25Eb21SZWZyZXNoOiAoKSAtPlxuICAgIEBzZXRNYXNvbnJ5KClcbiAgICBAc2V0TWFzb25yeUxheW91dCgpXG4gICAgaWYgQHZpZXc/LmFmdGVyRG9tUmVmcmVzaFxuICAgICAgQHZpZXcuYWZ0ZXJEb21SZWZyZXNoKClcbiAgICBcbiAgY29sbGVjdGlvbkV2ZW50czogLT5cbiAgICBkYXRhID0ge31cbiAgICBpZiBAZ2V0T3B0aW9uICdoYXNQYWdlYWJsZUNvbGxlY3Rpb24nXG4gICAgICBkYXRhWydwYWdlYWJsZTpzdGF0ZTpjaGFuZ2UnXSA9ICdzZXRNYXNvbnJ5TGF5b3V0J1xuICAgIHJldHVybiBkYXRhXG4gICAgXG5leHBvcnQgZGVmYXVsdCBIYXNNYXNvbnJ5Vmlld1xuIl19
