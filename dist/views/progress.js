var ProgressBar, ProgressModel, ProgressView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

ProgressModel = (function() {
  class ProgressModel extends Backbone.Model {};

  ProgressModel.prototype.defaults = {
    valuemin: 0,
    valuemax: 100,
    valuenow: 0
  };

  return ProgressModel;

}).call(this);

ProgressBar = (function() {
  class ProgressBar extends View {
    className() {
      return this.getOption('className') || 'progress-bar progress-bar-striped';
    }

    attributes() {
      return {
        role: 'progressbar',
        style: `width: ${this.getWidth()}%;`
      };
    }

    templateContext() {
      var current, label, max;
      current = this.model.get('valuenow');
      max = this.model.get('valuemax');
      label = `${current} of ${max}`;
      return {
        textStyle: this.getOption('textStyle') || 'color:black;',
        textLabel: this.getOption('textLabel') || label
      };
    }

    getWidth() {
      var current, max;
      // width is a percentage
      current = this.model.get('valuenow');
      max = this.model.get('valuemax');
      return Math.floor(current / max * 100 + 0.5);
    }

    onRender() {
      return this.$el.css({
        width: `${this.getWidth()}%`
      });
    }

  };

  ProgressBar.prototype.template = tc.renderable(function(model) {
    return tc.span({
      style: model.textStyle
    }, tc.text(model.textLabel));
  });

  ProgressBar.prototype.modelEvents = {
    'change': 'render'
  };

  return ProgressBar;

}).call(this);

ProgressView = (function() {
  class ProgressView extends View {
    createModel(options) {
      return new ProgressModel(options);
    }

    templateContext() {
      return {
        wrapperClasses: this.getOption('wrapperClasses') || '.pb-wrapper'
      };
    }

    onRender() {
      var view, viewOptions;
      viewOptions = this.getOption('childViewOptions') || {};
      viewOptions.model = this.model;
      view = new ProgressBar(viewOptions);
      return this.showChildView('pbWrapper', view);
    }

  };

  ProgressView.prototype.className = 'progress';

  ProgressView.prototype.template = tc.renderable(function(model) {
    var wrapperClasses;
    wrapperClasses = ".pb-wrapper";
    if (model.wrapperClasses) {
      wrapperClasses = `.pb-wrapper.${model.wrapperClasses}`;
    }
    return tc.div(wrapperClasses);
  });

  ProgressView.prototype.ui = {
    pbWrapper: '.pb-wrapper'
  };

  ProgressView.prototype.regions = {
    pbWrapper: '@ui.pbWrapper'
  };

  return ProgressView;

}).call(this);

export {
  ProgressModel,
  ProgressView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcHJvZ3Jlc3MuanMiLCJzb3VyY2VzIjpbInZpZXdzL3Byb2dyZXNzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFFBQVEsQ0FBQyxNQUFyQyxDQUFBOzswQkFDRSxRQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVUsQ0FBVjtJQUNBLFFBQUEsRUFBVSxHQURWO0lBRUEsUUFBQSxFQUFVO0VBRlY7Ozs7OztBQUlFO0VBQU4sTUFBQSxZQUFBLFFBQTBCLEtBQTFCO0lBQ0UsU0FBVyxDQUFBLENBQUE7QUFDVCxhQUFPLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQUFBLElBQTJCO0lBRHpCOztJQUVYLFVBQVksQ0FBQSxDQUFBO2FBQ1Y7UUFBQSxJQUFBLEVBQU0sYUFBTjtRQUNBLEtBQUEsRUFBTyxDQUFBLE9BQUEsQ0FBQSxDQUFVLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBVixDQUFBLEVBQUE7TUFEUDtJQURVOztJQU1aLGVBQWlCLENBQUEsQ0FBQTtBQUNuQixVQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7TUFBSSxPQUFBLEdBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWDtNQUNWLEdBQUEsR0FBTSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxVQUFYO01BQ04sS0FBQSxHQUFRLENBQUEsQ0FBQSxDQUFHLE9BQUgsQ0FBQSxJQUFBLENBQUEsQ0FBaUIsR0FBakIsQ0FBQTtBQUNSLGFBQ0U7UUFBQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYLENBQUEsSUFBMkIsY0FBdEM7UUFDQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYLENBQUEsSUFBMkI7TUFEdEM7SUFMYTs7SUFPakIsUUFBVSxDQUFBLENBQUE7QUFDWixVQUFBLE9BQUEsRUFBQSxHQUFBOztNQUNJLE9BQUEsR0FBVSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxVQUFYO01BQ1YsR0FBQSxHQUFNLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVg7QUFDTixhQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsT0FBQSxHQUFVLEdBQVYsR0FBZ0IsR0FBaEIsR0FBc0IsR0FBakM7SUFKQzs7SUFPVixRQUFVLENBQUEsQ0FBQTthQUNSLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUNFO1FBQUEsS0FBQSxFQUFPLENBQUEsQ0FBQSxDQUFHLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBSCxDQUFBLENBQUE7TUFBUCxDQURGO0lBRFE7O0VBdkJaOzt3QkFNRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxJQUFILENBQVE7TUFBQSxLQUFBLEVBQU0sS0FBSyxDQUFDO0lBQVosQ0FBUixFQUNFLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLFNBQWQsQ0FERjtFQURzQixDQUFkOzt3QkFlVixXQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVU7RUFBVjs7Ozs7O0FBS0U7RUFBTixNQUFBLGFBQUEsUUFBMkIsS0FBM0I7SUFFRSxXQUFhLENBQUMsT0FBRCxDQUFBO0FBQ1gsYUFBTyxJQUFJLGFBQUosQ0FBa0IsT0FBbEI7SUFESTs7SUFPYixlQUFpQixDQUFBLENBQUE7YUFDZjtRQUFBLGNBQUEsRUFBZ0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxnQkFBWCxDQUFBLElBQWdDO01BQWhEO0lBRGU7O0lBTWpCLFFBQVUsQ0FBQSxDQUFBO0FBQ1osVUFBQSxJQUFBLEVBQUE7TUFBSSxXQUFBLEdBQWMsSUFBQyxDQUFBLFNBQUQsQ0FBVyxrQkFBWCxDQUFBLElBQWtDLENBQUE7TUFDaEQsV0FBVyxDQUFDLEtBQVosR0FBb0IsSUFBQyxDQUFBO01BQ3JCLElBQUEsR0FBTyxJQUFJLFdBQUosQ0FBZ0IsV0FBaEI7YUFDUCxJQUFDLENBQUEsYUFBRCxDQUFlLFdBQWYsRUFBNEIsSUFBNUI7SUFKUTs7RUFmWjs7eUJBQ0UsU0FBQSxHQUFXOzt5QkFHWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQzFCLFFBQUE7SUFBSSxjQUFBLEdBQWlCO0lBQ2pCLElBQUcsS0FBSyxDQUFDLGNBQVQ7TUFDRSxjQUFBLEdBQWlCLENBQUEsWUFBQSxDQUFBLENBQWUsS0FBSyxDQUFDLGNBQXJCLENBQUEsRUFEbkI7O1dBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxjQUFQO0VBSnNCLENBQWQ7O3lCQU9WLEVBQUEsR0FDRTtJQUFBLFNBQUEsRUFBVztFQUFYOzt5QkFDRixPQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVc7RUFBWDs7Ozs7O0FBUUosT0FBQTtFQUNFLGFBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5jbGFzcyBQcm9ncmVzc01vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgdmFsdWVtaW46IDBcbiAgICB2YWx1ZW1heDogMTAwXG4gICAgdmFsdWVub3c6IDBcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBWaWV3XG4gIGNsYXNzTmFtZTogLT5cbiAgICByZXR1cm4gQGdldE9wdGlvbignY2xhc3NOYW1lJykgb3IgJ3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3RyaXBlZCdcbiAgYXR0cmlidXRlczogLT5cbiAgICByb2xlOiAncHJvZ3Jlc3NiYXInXG4gICAgc3R5bGU6IFwid2lkdGg6ICN7QGdldFdpZHRoKCl9JTtcIlxuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuc3BhbiBzdHlsZTptb2RlbC50ZXh0U3R5bGUsXG4gICAgICB0Yy50ZXh0IG1vZGVsLnRleHRMYWJlbFxuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgY3VycmVudCA9IEBtb2RlbC5nZXQoJ3ZhbHVlbm93JylcbiAgICBtYXggPSBAbW9kZWwuZ2V0KCd2YWx1ZW1heCcpXG4gICAgbGFiZWwgPSBcIiN7Y3VycmVudH0gb2YgI3ttYXh9XCJcbiAgICByZXR1cm5cbiAgICAgIHRleHRTdHlsZTogQGdldE9wdGlvbigndGV4dFN0eWxlJykgb3IgJ2NvbG9yOmJsYWNrOydcbiAgICAgIHRleHRMYWJlbDogQGdldE9wdGlvbigndGV4dExhYmVsJykgb3IgbGFiZWxcbiAgZ2V0V2lkdGg6IC0+XG4gICAgIyB3aWR0aCBpcyBhIHBlcmNlbnRhZ2VcbiAgICBjdXJyZW50ID0gQG1vZGVsLmdldCgndmFsdWVub3cnKVxuICAgIG1heCA9IEBtb2RlbC5nZXQoJ3ZhbHVlbWF4JylcbiAgICByZXR1cm4gTWF0aC5mbG9vciBjdXJyZW50IC8gbWF4ICogMTAwICsgMC41XG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2UnOiAncmVuZGVyJ1xuICBvblJlbmRlcjogLT5cbiAgICBAJGVsLmNzc1xuICAgICAgd2lkdGg6IFwiI3tAZ2V0V2lkdGgoKX0lXCJcbiAgICAgIFxuY2xhc3MgUHJvZ3Jlc3NWaWV3IGV4dGVuZHMgVmlld1xuICBjbGFzc05hbWU6ICdwcm9ncmVzcydcbiAgY3JlYXRlTW9kZWw6IChvcHRpb25zKSAtPlxuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NNb2RlbCBvcHRpb25zXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB3cmFwcGVyQ2xhc3NlcyA9IFwiLnBiLXdyYXBwZXJcIlxuICAgIGlmIG1vZGVsLndyYXBwZXJDbGFzc2VzXG4gICAgICB3cmFwcGVyQ2xhc3NlcyA9IFwiLnBiLXdyYXBwZXIuI3ttb2RlbC53cmFwcGVyQ2xhc3Nlc31cIlxuICAgIHRjLmRpdiB3cmFwcGVyQ2xhc3Nlc1xuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgd3JhcHBlckNsYXNzZXM6IEBnZXRPcHRpb24oJ3dyYXBwZXJDbGFzc2VzJykgb3IgJy5wYi13cmFwcGVyJ1xuICB1aTpcbiAgICBwYldyYXBwZXI6ICcucGItd3JhcHBlcidcbiAgcmVnaW9uczpcbiAgICBwYldyYXBwZXI6ICdAdWkucGJXcmFwcGVyJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3T3B0aW9ucyA9IEBnZXRPcHRpb24oJ2NoaWxkVmlld09wdGlvbnMnKSBvciB7fVxuICAgIHZpZXdPcHRpb25zLm1vZGVsID0gQG1vZGVsXG4gICAgdmlldyA9IG5ldyBQcm9ncmVzc0JhciB2aWV3T3B0aW9uc1xuICAgIEBzaG93Q2hpbGRWaWV3ICdwYldyYXBwZXInLCB2aWV3XG4gICAgXG4gICAgXG5leHBvcnQge1xuICBQcm9ncmVzc01vZGVsXG4gIFByb2dyZXNzVmlld1xuICB9XG4iXX0=
