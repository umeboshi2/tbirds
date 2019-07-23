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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcHJvZ3Jlc3MuanMiLCJzb3VyY2VzIjpbInZpZXdzL3Byb2dyZXNzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFFBQVEsQ0FBQyxNQUFyQyxDQUFBOzswQkFDRSxRQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVUsQ0FBVjtJQUNBLFFBQUEsRUFBVSxHQURWO0lBRUEsUUFBQSxFQUFVO0VBRlY7Ozs7OztBQUlFO0VBQU4sTUFBQSxZQUFBLFFBQTBCLEtBQTFCO0lBQ0UsU0FBVyxDQUFBLENBQUE7QUFDVCxhQUFPLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQUFBLElBQTJCO0lBRHpCOztJQUVYLFVBQVksQ0FBQSxDQUFBO2FBQ1Y7UUFBQSxJQUFBLEVBQU0sYUFBTjtRQUNBLEtBQUEsRUFBTyxDQUFBLE9BQUEsQ0FBQSxDQUFVLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBVixDQUFzQixFQUF0QjtNQURQO0lBRFU7O0lBTVosZUFBaUIsQ0FBQSxDQUFBO0FBQ2YsVUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO01BQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVg7TUFDVixHQUFBLEdBQU0sSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWDtNQUNOLEtBQUEsR0FBUSxDQUFBLENBQUEsQ0FBRyxPQUFILENBQVcsSUFBWCxDQUFBLENBQWlCLEdBQWpCLENBQUE7QUFDUixhQUNFO1FBQUEsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQUFBLElBQTJCLGNBQXRDO1FBQ0EsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQUFBLElBQTJCO01BRHRDO0lBTGE7O0lBT2pCLFFBQVUsQ0FBQSxDQUFBO0FBRVIsVUFBQSxPQUFBLEVBQUEsR0FBQTs7TUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWDtNQUNWLEdBQUEsR0FBTSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxVQUFYO0FBQ04sYUFBTyxJQUFJLENBQUMsS0FBTCxDQUFXLE9BQUEsR0FBVSxHQUFWLEdBQWdCLEdBQWhCLEdBQXNCLEdBQWpDO0lBSkM7O0lBT1YsUUFBVSxDQUFBLENBQUE7YUFDUixJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsQ0FDRTtRQUFBLEtBQUEsRUFBTyxDQUFBLENBQUEsQ0FBRyxJQUFDLENBQUEsUUFBRCxDQUFBLENBQUgsQ0FBZSxDQUFmO01BQVAsQ0FERjtJQURROztFQXZCWjs7d0JBTUUsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsSUFBSCxDQUFRO01BQUEsS0FBQSxFQUFNLEtBQUssQ0FBQztJQUFaLENBQVIsRUFDRSxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxTQUFkLENBREY7RUFEc0IsQ0FBZDs7d0JBZVYsV0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVO0VBQVY7Ozs7OztBQUtFO0VBQU4sTUFBQSxhQUFBLFFBQTJCLEtBQTNCO0lBRUUsV0FBYSxDQUFDLE9BQUQsQ0FBQTtBQUNYLGFBQU8sSUFBSSxhQUFKLENBQWtCLE9BQWxCO0lBREk7O0lBT2IsZUFBaUIsQ0FBQSxDQUFBO2FBQ2Y7UUFBQSxjQUFBLEVBQWdCLElBQUMsQ0FBQSxTQUFELENBQVcsZ0JBQVgsQ0FBQSxJQUFnQztNQUFoRDtJQURlOztJQU1qQixRQUFVLENBQUEsQ0FBQTtBQUNSLFVBQUEsSUFBQSxFQUFBO01BQUEsV0FBQSxHQUFjLElBQUMsQ0FBQSxTQUFELENBQVcsa0JBQVgsQ0FBQSxJQUFrQyxDQUFBO01BQ2hELFdBQVcsQ0FBQyxLQUFaLEdBQW9CLElBQUMsQ0FBQTtNQUNyQixJQUFBLEdBQU8sSUFBSSxXQUFKLENBQWdCLFdBQWhCO2FBQ1AsSUFBQyxDQUFBLGFBQUQsQ0FBZSxXQUFmLEVBQTRCLElBQTVCO0lBSlE7O0VBZlo7O3lCQUNFLFNBQUEsR0FBVzs7eUJBR1gsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUN0QixRQUFBO0lBQUEsY0FBQSxHQUFpQjtJQUNqQixJQUFHLEtBQUssQ0FBQyxjQUFUO01BQ0UsY0FBQSxHQUFpQixDQUFBLFlBQUEsQ0FBQSxDQUFlLEtBQUssQ0FBQyxjQUFyQixDQUFBLEVBRG5COztXQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sY0FBUDtFQUpzQixDQUFkOzt5QkFPVixFQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVc7RUFBWDs7eUJBQ0YsT0FBQSxHQUNFO0lBQUEsU0FBQSxFQUFXO0VBQVg7Ozs7OztBQVFKLE9BQUE7RUFDRSxhQURGO0VBRUUsWUFGRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuY2xhc3MgUHJvZ3Jlc3NNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHZhbHVlbWluOiAwXG4gICAgdmFsdWVtYXg6IDEwMFxuICAgIHZhbHVlbm93OiAwXG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgVmlld1xuICBjbGFzc05hbWU6IC0+XG4gICAgcmV0dXJuIEBnZXRPcHRpb24oJ2NsYXNzTmFtZScpIG9yICdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN0cmlwZWQnXG4gIGF0dHJpYnV0ZXM6IC0+XG4gICAgcm9sZTogJ3Byb2dyZXNzYmFyJ1xuICAgIHN0eWxlOiBcIndpZHRoOiAje0BnZXRXaWR0aCgpfSU7XCJcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLnNwYW4gc3R5bGU6bW9kZWwudGV4dFN0eWxlLFxuICAgICAgdGMudGV4dCBtb2RlbC50ZXh0TGFiZWxcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIGN1cnJlbnQgPSBAbW9kZWwuZ2V0KCd2YWx1ZW5vdycpXG4gICAgbWF4ID0gQG1vZGVsLmdldCgndmFsdWVtYXgnKVxuICAgIGxhYmVsID0gXCIje2N1cnJlbnR9IG9mICN7bWF4fVwiXG4gICAgcmV0dXJuXG4gICAgICB0ZXh0U3R5bGU6IEBnZXRPcHRpb24oJ3RleHRTdHlsZScpIG9yICdjb2xvcjpibGFjazsnXG4gICAgICB0ZXh0TGFiZWw6IEBnZXRPcHRpb24oJ3RleHRMYWJlbCcpIG9yIGxhYmVsXG4gIGdldFdpZHRoOiAtPlxuICAgICMgd2lkdGggaXMgYSBwZXJjZW50YWdlXG4gICAgY3VycmVudCA9IEBtb2RlbC5nZXQoJ3ZhbHVlbm93JylcbiAgICBtYXggPSBAbW9kZWwuZ2V0KCd2YWx1ZW1heCcpXG4gICAgcmV0dXJuIE1hdGguZmxvb3IgY3VycmVudCAvIG1heCAqIDEwMCArIDAuNVxuICBtb2RlbEV2ZW50czpcbiAgICAnY2hhbmdlJzogJ3JlbmRlcidcbiAgb25SZW5kZXI6IC0+XG4gICAgQCRlbC5jc3NcbiAgICAgIHdpZHRoOiBcIiN7QGdldFdpZHRoKCl9JVwiXG4gICAgICBcbmNsYXNzIFByb2dyZXNzVmlldyBleHRlbmRzIFZpZXdcbiAgY2xhc3NOYW1lOiAncHJvZ3Jlc3MnXG4gIGNyZWF0ZU1vZGVsOiAob3B0aW9ucykgLT5cbiAgICByZXR1cm4gbmV3IFByb2dyZXNzTW9kZWwgb3B0aW9uc1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgd3JhcHBlckNsYXNzZXMgPSBcIi5wYi13cmFwcGVyXCJcbiAgICBpZiBtb2RlbC53cmFwcGVyQ2xhc3Nlc1xuICAgICAgd3JhcHBlckNsYXNzZXMgPSBcIi5wYi13cmFwcGVyLiN7bW9kZWwud3JhcHBlckNsYXNzZXN9XCJcbiAgICB0Yy5kaXYgd3JhcHBlckNsYXNzZXNcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIHdyYXBwZXJDbGFzc2VzOiBAZ2V0T3B0aW9uKCd3cmFwcGVyQ2xhc3NlcycpIG9yICcucGItd3JhcHBlcidcbiAgdWk6XG4gICAgcGJXcmFwcGVyOiAnLnBiLXdyYXBwZXInXG4gIHJlZ2lvbnM6XG4gICAgcGJXcmFwcGVyOiAnQHVpLnBiV3JhcHBlcidcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlld09wdGlvbnMgPSBAZ2V0T3B0aW9uKCdjaGlsZFZpZXdPcHRpb25zJykgb3Ige31cbiAgICB2aWV3T3B0aW9ucy5tb2RlbCA9IEBtb2RlbFxuICAgIHZpZXcgPSBuZXcgUHJvZ3Jlc3NCYXIgdmlld09wdGlvbnNcbiAgICBAc2hvd0NoaWxkVmlldyAncGJXcmFwcGVyJywgdmlld1xuICAgIFxuICAgIFxuZXhwb3J0IHtcbiAgUHJvZ3Jlc3NNb2RlbFxuICBQcm9ncmVzc1ZpZXdcbiAgfVxuIl19
