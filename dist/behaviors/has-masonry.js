var HasMasonryView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Masonry from 'masonry-layout';

import imagesLoaded from 'imagesloaded';

HasMasonryView = (function() {
  class HasMasonryView extends Marionette.Behavior {
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
        this.view.masonry.reloadItems();
        return this.view.masonry.layout();
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

  };

  HasMasonryView.prototype.options = {
    listContainer: '.list-container',
    channel: 'global',
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1tYXNvbnJ5LmpzIiwic291cmNlcyI6WyJiZWhhdmlvcnMvaGFzLW1hc29ucnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxZQUFQLE1BQUE7O0FBRU07RUFBTixNQUFBLGVBQUEsUUFBNkIsVUFBVSxDQUFDLFNBQXhDO0lBVUUsRUFBSSxDQUFBLENBQUE7YUFDRjtRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsU0FBRCxDQUFXLGVBQVg7TUFBTjtJQURFOztJQUtKLFVBQVksQ0FBQSxDQUFBO0FBQ1YsVUFBQSxTQUFBLEVBQUE7TUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYO01BQ1osY0FBQSxHQUFpQixJQUFDLENBQUEsU0FBRCxDQUFXLGdCQUFYO2FBQ2pCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixHQUFnQixJQUFJLE9BQUosQ0FBWSxTQUFaLEVBQXVCLGNBQXZCO0lBSE47O0lBS1osZ0JBQWtCLENBQUEsQ0FBQTtBQUNoQixVQUFBLEtBQUEsRUFBQTtNQUFBLGNBQUEsR0FBaUIsSUFBQyxDQUFBLFNBQUQsQ0FBVyxnQkFBWDtNQUNqQixLQUFBLEdBQVEsSUFBQyxDQUFBLENBQUQsQ0FBRyxjQUFjLENBQUMsWUFBbEI7YUFDUixZQUFBLENBQWEsS0FBYixFQUFvQixDQUFBLENBQUEsR0FBQTtRQUNsQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFkLENBQUE7ZUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFkLENBQUE7TUFGa0IsQ0FBcEI7SUFIZ0I7O0lBT2xCLGVBQWlCLENBQUEsQ0FBQTthQUNmLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWQsQ0FBQTtJQURlOztJQUdqQixZQUFjLENBQUEsQ0FBQTtBQUNaLFVBQUE7TUFBQSxJQUFDLENBQUEsVUFBRCxDQUFBO01BQ0EsSUFBQyxDQUFBLGdCQUFELENBQUE7TUFDQSxtQ0FBUSxDQUFFLHdCQUFWO2VBQ0UsSUFBQyxDQUFBLElBQUksQ0FBQyxlQUFOLENBQUEsRUFERjs7SUFIWTs7RUE5QmhCOzsyQkFDRSxPQUFBLEdBQ0U7SUFBQSxhQUFBLEVBQWUsaUJBQWY7SUFDQSxPQUFBLEVBQVMsUUFEVDtJQUVBLGNBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUSxDQUFSO01BQ0EsWUFBQSxFQUFjLEtBRGQ7TUFFQSxZQUFBLEVBQWMsT0FGZDtNQUdBLFdBQUEsRUFBYSxFQUhiO01BSUEsZUFBQSxFQUFpQjtJQUpqQjtFQUhGOzsyQkFVRixPQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU07RUFBTjs7Ozs7O0FBd0JKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgTWFzb25yeSBmcm9tICdtYXNvbnJ5LWxheW91dCdcbmltcG9ydCBpbWFnZXNMb2FkZWQgZnJvbSAnaW1hZ2VzbG9hZGVkJ1xuXG5jbGFzcyBIYXNNYXNvbnJ5VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcbiAgb3B0aW9uczpcbiAgICBsaXN0Q29udGFpbmVyOiAnLmxpc3QtY29udGFpbmVyJ1xuICAgIGNoYW5uZWw6ICdnbG9iYWwnXG4gICAgbWFzb25yeU9wdGlvbnM6XG4gICAgICBndXR0ZXI6IDFcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2VcbiAgICAgIGl0ZW1TZWxlY3RvcjogJy5pdGVtJ1xuICAgICAgY29sdW1uV2lkdGg6IDEwXG4gICAgICBob3Jpem9udGFsT3JkZXI6IHRydWVcbiAgdWk6IC0+XG4gICAgbGlzdDogQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgcmVnaW9uczpcbiAgICBsaXN0OiAnQHVpLmxpc3QnXG4gICAgXG4gIHNldE1hc29ucnk6IC0+XG4gICAgY29udGFpbmVyID0gQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgICBtYXNvbnJ5T3B0aW9ucyA9IEBnZXRPcHRpb24gJ21hc29ucnlPcHRpb25zJ1xuICAgIEB2aWV3Lm1hc29ucnkgPSBuZXcgTWFzb25yeSBjb250YWluZXIsIG1hc29ucnlPcHRpb25zXG4gICAgXG4gIHNldE1hc29ucnlMYXlvdXQ6IC0+XG4gICAgbWFzb25yeU9wdGlvbnMgPSBAZ2V0T3B0aW9uICdtYXNvbnJ5T3B0aW9ucydcbiAgICBpdGVtcyA9IEAkIG1hc29ucnlPcHRpb25zLml0ZW1TZWxlY3RvclxuICAgIGltYWdlc0xvYWRlZCBpdGVtcywgPT5cbiAgICAgIEB2aWV3Lm1hc29ucnkucmVsb2FkSXRlbXMoKVxuICAgICAgQHZpZXcubWFzb25yeS5sYXlvdXQoKVxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAdmlldy5tYXNvbnJ5LmRlc3Ryb3koKVxuICAgIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgQHNldE1hc29ucnkoKVxuICAgIEBzZXRNYXNvbnJ5TGF5b3V0KClcbiAgICBpZiBAdmlldz8uYWZ0ZXJEb21SZWZyZXNoXG4gICAgICBAdmlldy5hZnRlckRvbVJlZnJlc2goKVxuICAgIFxuICBcbmV4cG9ydCBkZWZhdWx0IEhhc01hc29ucnlWaWV3XG4iXX0=
