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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1tYXNvbnJ5LmpzIiwic291cmNlcyI6WyJiZWhhdmlvcnMvaGFzLW1hc29ucnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sWUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFNBQTdCO0lBVUUsRUFBSSxDQUFBLENBQUE7YUFDRjtRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsU0FBRCxDQUFXLGVBQVg7TUFBTjtJQURFOztJQUtKLFVBQVksQ0FBQSxDQUFBO0FBQ1YsVUFBQSxTQUFBLEVBQUE7TUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYO01BQ1osY0FBQSxHQUFpQixJQUFDLENBQUEsU0FBRCxDQUFXLGdCQUFYO2FBQ2pCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixHQUFnQixJQUFJLE9BQUosQ0FBWSxTQUFaLEVBQXVCLGNBQXZCO0lBSE47O0lBS1osZ0JBQWtCLENBQUEsQ0FBQTtBQUNoQixVQUFBLEtBQUEsRUFBQTtNQUFBLGNBQUEsR0FBaUIsSUFBQyxDQUFBLFNBQUQsQ0FBVyxnQkFBWDtNQUNqQixLQUFBLEdBQVEsSUFBQyxDQUFBLENBQUQsQ0FBRyxjQUFjLENBQUMsWUFBbEI7YUFDUixZQUFBLENBQWEsS0FBYixFQUFvQixDQUFBLENBQUEsR0FBQSxFQUFBOztlQUVsQixVQUFBLENBQVcsQ0FBQSxDQUFBLEdBQUE7VUFDVCxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFkLENBQUE7aUJBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBZCxDQUFBO1FBRlMsQ0FBWCxFQUdFLEdBSEY7TUFGa0IsQ0FBcEI7SUFIZ0I7O0lBVWxCLGVBQWlCLENBQUEsQ0FBQTthQUNmLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWQsQ0FBQTtJQURlOztJQUdqQixZQUFjLENBQUEsQ0FBQTtBQUNaLFVBQUE7TUFBQSxJQUFDLENBQUEsVUFBRCxDQUFBO01BQ0EsSUFBQyxDQUFBLGdCQUFELENBQUE7TUFDQSxtQ0FBUSxDQUFFLHdCQUFWO2VBQ0UsSUFBQyxDQUFBLElBQUksQ0FBQyxlQUFOLENBQUEsRUFERjs7SUFIWTs7SUFNZCxnQkFBa0IsQ0FBQSxDQUFBO0FBQ2hCLFVBQUE7TUFBQSxJQUFBLEdBQU8sQ0FBQTtNQUNQLElBQUcsSUFBQyxDQUFBLFNBQUQsQ0FBVyx1QkFBWCxDQUFIO1FBQ0UsSUFBSyxDQUFBLHVCQUFBLENBQUwsR0FBZ0MsbUJBRGxDOztBQUVBLGFBQU87SUFKUzs7RUF2Q3BCOzsyQkFDRSxPQUFBLEdBQ0U7SUFBQSxhQUFBLEVBQWUsaUJBQWY7SUFDQSxxQkFBQSxFQUF1QixLQUR2QjtJQUVBLGNBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUSxDQUFSO01BQ0EsWUFBQSxFQUFjLEtBRGQ7TUFFQSxZQUFBLEVBQWMsT0FGZDtNQUdBLFdBQUEsRUFBYSxFQUhiO01BSUEsZUFBQSxFQUFpQjtJQUpqQjtFQUhGOzsyQkFVRixPQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU07RUFBTjs7Ozs7O0FBZ0NKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBNYXNvbnJ5IGZyb20gJ21hc29ucnktbGF5b3V0J1xuaW1wb3J0IGltYWdlc0xvYWRlZCBmcm9tICdpbWFnZXNsb2FkZWQnXG5cbmNsYXNzIEhhc01hc29ucnlWaWV3IGV4dGVuZHMgQmVoYXZpb3JcbiAgb3B0aW9uczpcbiAgICBsaXN0Q29udGFpbmVyOiAnLmxpc3QtY29udGFpbmVyJ1xuICAgIGhhc1BhZ2VhYmxlQ29sbGVjdGlvbjogZmFsc2VcbiAgICBtYXNvbnJ5T3B0aW9uczpcbiAgICAgIGd1dHRlcjogMVxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZVxuICAgICAgaXRlbVNlbGVjdG9yOiAnLml0ZW0nXG4gICAgICBjb2x1bW5XaWR0aDogMTBcbiAgICAgIGhvcml6b250YWxPcmRlcjogdHJ1ZVxuICB1aTogLT5cbiAgICBsaXN0OiBAZ2V0T3B0aW9uICdsaXN0Q29udGFpbmVyJ1xuICByZWdpb25zOlxuICAgIGxpc3Q6ICdAdWkubGlzdCdcbiAgICBcbiAgc2V0TWFzb25yeTogLT5cbiAgICBjb250YWluZXIgPSBAZ2V0T3B0aW9uICdsaXN0Q29udGFpbmVyJ1xuICAgIG1hc29ucnlPcHRpb25zID0gQGdldE9wdGlvbiAnbWFzb25yeU9wdGlvbnMnXG4gICAgQHZpZXcubWFzb25yeSA9IG5ldyBNYXNvbnJ5IGNvbnRhaW5lciwgbWFzb25yeU9wdGlvbnNcbiAgICBcbiAgc2V0TWFzb25yeUxheW91dDogLT5cbiAgICBtYXNvbnJ5T3B0aW9ucyA9IEBnZXRPcHRpb24gJ21hc29ucnlPcHRpb25zJ1xuICAgIGl0ZW1zID0gQCQgbWFzb25yeU9wdGlvbnMuaXRlbVNlbGVjdG9yXG4gICAgaW1hZ2VzTG9hZGVkIGl0ZW1zLCA9PlxuICAgICAgIyBGSVhNRSB3ZSBuZWVkIHRvIGZpbmQgYSBiZXR0ZXIgb3B0aW9uXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB2aWV3Lm1hc29ucnkucmVsb2FkSXRlbXMoKVxuICAgICAgICBAdmlldy5tYXNvbnJ5LmxheW91dCgpXG4gICAgICAsIDcwMFxuICAgICAgXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAdmlldy5tYXNvbnJ5LmRlc3Ryb3koKVxuICAgIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgQHNldE1hc29ucnkoKVxuICAgIEBzZXRNYXNvbnJ5TGF5b3V0KClcbiAgICBpZiBAdmlldz8uYWZ0ZXJEb21SZWZyZXNoXG4gICAgICBAdmlldy5hZnRlckRvbVJlZnJlc2goKVxuICAgIFxuICBjb2xsZWN0aW9uRXZlbnRzOiAtPlxuICAgIGRhdGEgPSB7fVxuICAgIGlmIEBnZXRPcHRpb24gJ2hhc1BhZ2VhYmxlQ29sbGVjdGlvbidcbiAgICAgIGRhdGFbJ3BhZ2VhYmxlOnN0YXRlOmNoYW5nZSddID0gJ3NldE1hc29ucnlMYXlvdXQnXG4gICAgcmV0dXJuIGRhdGFcbiAgICBcbmV4cG9ydCBkZWZhdWx0IEhhc01hc29ucnlWaWV3XG4iXX0=
