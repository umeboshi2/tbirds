var Backbone, HasMasonryView, Marionette, Masonry, imagesLoaded,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Masonry = require('masonry-layout');

imagesLoaded = require('imagesloaded');

HasMasonryView = (function(superClass) {
  extend(HasMasonryView, superClass);

  function HasMasonryView() {
    return HasMasonryView.__super__.constructor.apply(this, arguments);
  }

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

  HasMasonryView.prototype.ui = function() {
    return {
      list: this.getOption('listContainer')
    };
  };

  HasMasonryView.prototype.regions = {
    list: '@ui.list'
  };

  HasMasonryView.prototype.setMasonry = function() {
    var container, masonryOptions;
    container = this.getOption('listContainer');
    masonryOptions = this.getOption('masonryOptions');
    return this.view.masonry = new Masonry(container, masonryOptions);
  };

  HasMasonryView.prototype.setMasonryLayout = function() {
    var items, masonryOptions;
    masonryOptions = this.getOption('masonryOptions');
    items = this.$(masonryOptions.itemSelector);
    return imagesLoaded(items, (function(_this) {
      return function() {
        _this.view.masonry.reloadItems();
        return _this.view.masonry.layout();
      };
    })(this));
  };

  HasMasonryView.prototype.onBeforeDestroy = function() {
    return this.view.masonry.destroy();
  };

  HasMasonryView.prototype.onDomRefresh = function() {
    var ref;
    this.setMasonry();
    this.setMasonryLayout();
    if ((ref = this.view) != null ? ref.afterDomRefresh : void 0) {
      return this.view.afterDomRefresh();
    }
  };

  return HasMasonryView;

})(Marionette.Behavior);

module.exports = HasMasonryView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1tYXNvbnJ5LmpzIiwic291cmNlcyI6WyJiZWhhdmlvcnMvaGFzLW1hc29ucnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsMkRBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsT0FBQSxHQUFVLE9BQUEsQ0FBUSxnQkFBUjs7QUFDVixZQUFBLEdBQWUsT0FBQSxDQUFRLGNBQVI7O0FBRVQ7Ozs7Ozs7MkJBQ0osT0FBQSxHQUNFO0lBQUEsYUFBQSxFQUFlLGlCQUFmO0lBQ0EsT0FBQSxFQUFTLFFBRFQ7SUFFQSxjQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVEsQ0FBUjtNQUNBLFlBQUEsRUFBYyxLQURkO01BRUEsWUFBQSxFQUFjLE9BRmQ7TUFHQSxXQUFBLEVBQWEsRUFIYjtNQUlBLGVBQUEsRUFBaUIsSUFKakI7S0FIRjs7OzJCQVFGLEVBQUEsR0FBSSxTQUFBO1dBQ0Y7TUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFNBQUQsQ0FBVyxlQUFYLENBQU47O0VBREU7OzJCQUVKLE9BQUEsR0FDRTtJQUFBLElBQUEsRUFBTSxVQUFOOzs7MkJBRUYsVUFBQSxHQUFZLFNBQUE7QUFDVixRQUFBO0lBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxTQUFELENBQVcsZUFBWDtJQUNaLGNBQUEsR0FBaUIsSUFBQyxDQUFBLFNBQUQsQ0FBVyxnQkFBWDtXQUNqQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sR0FBZ0IsSUFBSSxPQUFKLENBQVksU0FBWixFQUF1QixjQUF2QjtFQUhOOzsyQkFLWixnQkFBQSxHQUFrQixTQUFBO0FBQ2hCLFFBQUE7SUFBQSxjQUFBLEdBQWlCLElBQUMsQ0FBQSxTQUFELENBQVcsZ0JBQVg7SUFDakIsS0FBQSxHQUFRLElBQUMsQ0FBQSxDQUFELENBQUcsY0FBYyxDQUFDLFlBQWxCO1dBQ1IsWUFBQSxDQUFhLEtBQWIsRUFBb0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ2xCLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQWQsQ0FBQTtlQUNBLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQWQsQ0FBQTtNQUZrQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEI7RUFIZ0I7OzJCQU9sQixlQUFBLEdBQWlCLFNBQUE7V0FDZixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFkLENBQUE7RUFEZTs7MkJBR2pCLFlBQUEsR0FBYyxTQUFBO0FBQ1osUUFBQTtJQUFBLElBQUMsQ0FBQSxVQUFELENBQUE7SUFDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQUNBLG1DQUFRLENBQUUsd0JBQVY7YUFDRSxJQUFDLENBQUEsSUFBSSxDQUFDLGVBQU4sQ0FBQSxFQURGOztFQUhZOzs7O0dBOUJhLFVBQVUsQ0FBQzs7QUFxQ3hDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuTWFzb25yeSA9IHJlcXVpcmUgJ21hc29ucnktbGF5b3V0J1xuaW1hZ2VzTG9hZGVkID0gcmVxdWlyZSAnaW1hZ2VzbG9hZGVkJ1xuXG5jbGFzcyBIYXNNYXNvbnJ5VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcbiAgb3B0aW9uczpcbiAgICBsaXN0Q29udGFpbmVyOiAnLmxpc3QtY29udGFpbmVyJ1xuICAgIGNoYW5uZWw6ICdnbG9iYWwnXG4gICAgbWFzb25yeU9wdGlvbnM6XG4gICAgICBndXR0ZXI6IDFcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2VcbiAgICAgIGl0ZW1TZWxlY3RvcjogJy5pdGVtJ1xuICAgICAgY29sdW1uV2lkdGg6IDEwXG4gICAgICBob3Jpem9udGFsT3JkZXI6IHRydWVcbiAgdWk6IC0+XG4gICAgbGlzdDogQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgcmVnaW9uczpcbiAgICBsaXN0OiAnQHVpLmxpc3QnXG4gICAgXG4gIHNldE1hc29ucnk6IC0+XG4gICAgY29udGFpbmVyID0gQGdldE9wdGlvbiAnbGlzdENvbnRhaW5lcidcbiAgICBtYXNvbnJ5T3B0aW9ucyA9IEBnZXRPcHRpb24gJ21hc29ucnlPcHRpb25zJ1xuICAgIEB2aWV3Lm1hc29ucnkgPSBuZXcgTWFzb25yeSBjb250YWluZXIsIG1hc29ucnlPcHRpb25zXG4gICAgXG4gIHNldE1hc29ucnlMYXlvdXQ6IC0+XG4gICAgbWFzb25yeU9wdGlvbnMgPSBAZ2V0T3B0aW9uICdtYXNvbnJ5T3B0aW9ucydcbiAgICBpdGVtcyA9IEAkIG1hc29ucnlPcHRpb25zLml0ZW1TZWxlY3RvclxuICAgIGltYWdlc0xvYWRlZCBpdGVtcywgPT5cbiAgICAgIEB2aWV3Lm1hc29ucnkucmVsb2FkSXRlbXMoKVxuICAgICAgQHZpZXcubWFzb25yeS5sYXlvdXQoKVxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAdmlldy5tYXNvbnJ5LmRlc3Ryb3koKVxuICAgIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgQHNldE1hc29ucnkoKVxuICAgIEBzZXRNYXNvbnJ5TGF5b3V0KClcbiAgICBpZiBAdmlldz8uYWZ0ZXJEb21SZWZyZXNoXG4gICAgICBAdmlldy5hZnRlckRvbVJlZnJlc2goKVxuICAgIFxuICBcbm1vZHVsZS5leHBvcnRzID0gSGFzTWFzb25yeVZpZXdcbiJdfQ==
