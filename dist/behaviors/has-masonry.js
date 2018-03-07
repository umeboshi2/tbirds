var Backbone, HasMasonryView, Marionette, Masonry, imagesLoaded;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Masonry = require('masonry-layout');

imagesLoaded = require('imagesloaded');

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

module.exports = HasMasonryView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1tYXNvbnJ5LmpzIiwic291cmNlcyI6WyJiZWhhdmlvcnMvaGFzLW1hc29ucnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLGNBQUEsRUFBQSxVQUFBLEVBQUEsT0FBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLE9BQUEsR0FBVSxPQUFBLENBQVEsZ0JBQVI7O0FBQ1YsWUFBQSxHQUFlLE9BQUEsQ0FBUSxjQUFSOztBQUVUO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFVBQVUsQ0FBQyxTQUF4QztJQVVFLEVBQUksQ0FBQSxDQUFBO2FBQ0Y7UUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYO01BQU47SUFERTs7SUFLSixVQUFZLENBQUEsQ0FBQTtBQUNWLFVBQUEsU0FBQSxFQUFBO01BQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxTQUFELENBQVcsZUFBWDtNQUNaLGNBQUEsR0FBaUIsSUFBQyxDQUFBLFNBQUQsQ0FBVyxnQkFBWDthQUNqQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sR0FBZ0IsSUFBSSxPQUFKLENBQVksU0FBWixFQUF1QixjQUF2QjtJQUhOOztJQUtaLGdCQUFrQixDQUFBLENBQUE7QUFDaEIsVUFBQSxLQUFBLEVBQUE7TUFBQSxjQUFBLEdBQWlCLElBQUMsQ0FBQSxTQUFELENBQVcsZ0JBQVg7TUFDakIsS0FBQSxHQUFRLElBQUMsQ0FBQSxDQUFELENBQUcsY0FBYyxDQUFDLFlBQWxCO2FBQ1IsWUFBQSxDQUFhLEtBQWIsRUFBb0IsQ0FBQSxDQUFBLEdBQUE7UUFDbEIsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBZCxDQUFBO2VBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBZCxDQUFBO01BRmtCLENBQXBCO0lBSGdCOztJQU9sQixlQUFpQixDQUFBLENBQUE7YUFDZixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFkLENBQUE7SUFEZTs7SUFHakIsWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBO01BQUEsSUFBQyxDQUFBLFVBQUQsQ0FBQTtNQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO01BQ0EsbUNBQVEsQ0FBRSx3QkFBVjtlQUNFLElBQUMsQ0FBQSxJQUFJLENBQUMsZUFBTixDQUFBLEVBREY7O0lBSFk7O0VBOUJoQjs7MkJBQ0UsT0FBQSxHQUNFO0lBQUEsYUFBQSxFQUFlLGlCQUFmO0lBQ0EsT0FBQSxFQUFTLFFBRFQ7SUFFQSxjQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVEsQ0FBUjtNQUNBLFlBQUEsRUFBYyxLQURkO01BRUEsWUFBQSxFQUFjLE9BRmQ7TUFHQSxXQUFBLEVBQWEsRUFIYjtNQUlBLGVBQUEsRUFBaUI7SUFKakI7RUFIRjs7MkJBVUYsT0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNO0VBQU47Ozs7OztBQXdCSixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbk1hc29ucnkgPSByZXF1aXJlICdtYXNvbnJ5LWxheW91dCdcbmltYWdlc0xvYWRlZCA9IHJlcXVpcmUgJ2ltYWdlc2xvYWRlZCdcblxuY2xhc3MgSGFzTWFzb25yeVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG4gIG9wdGlvbnM6XG4gICAgbGlzdENvbnRhaW5lcjogJy5saXN0LWNvbnRhaW5lcidcbiAgICBjaGFubmVsOiAnZ2xvYmFsJ1xuICAgIG1hc29ucnlPcHRpb25zOlxuICAgICAgZ3V0dGVyOiAxXG4gICAgICBpc0luaXRMYXlvdXQ6IGZhbHNlXG4gICAgICBpdGVtU2VsZWN0b3I6ICcuaXRlbSdcbiAgICAgIGNvbHVtbldpZHRoOiAxMFxuICAgICAgaG9yaXpvbnRhbE9yZGVyOiB0cnVlXG4gIHVpOiAtPlxuICAgIGxpc3Q6IEBnZXRPcHRpb24gJ2xpc3RDb250YWluZXInXG4gIHJlZ2lvbnM6XG4gICAgbGlzdDogJ0B1aS5saXN0J1xuICAgIFxuICBzZXRNYXNvbnJ5OiAtPlxuICAgIGNvbnRhaW5lciA9IEBnZXRPcHRpb24gJ2xpc3RDb250YWluZXInXG4gICAgbWFzb25yeU9wdGlvbnMgPSBAZ2V0T3B0aW9uICdtYXNvbnJ5T3B0aW9ucydcbiAgICBAdmlldy5tYXNvbnJ5ID0gbmV3IE1hc29ucnkgY29udGFpbmVyLCBtYXNvbnJ5T3B0aW9uc1xuICAgIFxuICBzZXRNYXNvbnJ5TGF5b3V0OiAtPlxuICAgIG1hc29ucnlPcHRpb25zID0gQGdldE9wdGlvbiAnbWFzb25yeU9wdGlvbnMnXG4gICAgaXRlbXMgPSBAJCBtYXNvbnJ5T3B0aW9ucy5pdGVtU2VsZWN0b3JcbiAgICBpbWFnZXNMb2FkZWQgaXRlbXMsID0+XG4gICAgICBAdmlldy5tYXNvbnJ5LnJlbG9hZEl0ZW1zKClcbiAgICAgIEB2aWV3Lm1hc29ucnkubGF5b3V0KClcblxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQHZpZXcubWFzb25yeS5kZXN0cm95KClcbiAgICBcbiAgb25Eb21SZWZyZXNoOiAoKSAtPlxuICAgIEBzZXRNYXNvbnJ5KClcbiAgICBAc2V0TWFzb25yeUxheW91dCgpXG4gICAgaWYgQHZpZXc/LmFmdGVyRG9tUmVmcmVzaFxuICAgICAgQHZpZXcuYWZ0ZXJEb21SZWZyZXNoKClcbiAgICBcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IEhhc01hc29ucnlWaWV3XG4iXX0=
