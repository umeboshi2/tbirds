var Backbone, Controller, DocChannel, FrontdoorLayout, MainChannel, MainController, Marionette, MessageChannel, SlideDownRegion, frontdoor_template, login_form, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainController = require('../../controllers').MainController;

login_form = require('../../templates/forms').login_form;

SlideDownRegion = require('agate/src/regions').SlideDownRegion;

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

DocChannel = Backbone.Radio.channel('static-documents');

tc = require('teacup');

frontdoor_template = tc.renderable(function() {
  return tc.div('#main-content.col-sm-12');
});

FrontdoorLayout = (function(superClass) {
  extend(FrontdoorLayout, superClass);

  function FrontdoorLayout() {
    return FrontdoorLayout.__super__.constructor.apply(this, arguments);
  }

  FrontdoorLayout.prototype.template = frontdoor_template;

  FrontdoorLayout.prototype.regions = function() {
    return {
      content: new SlideDownRegion({
        el: '#main-content',
        speed: 'slow'
      })
    };
  };

  return FrontdoorLayout;

})(Backbone.Marionette.View);

Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.layoutClass = FrontdoorLayout;

  Controller.prototype._view_resource = function(doc) {
    this.setup_layout_if_needed();
    return require.ensure([], (function(_this) {
      return function() {
        var FrontDoorMainView, view;
        FrontDoorMainView = require('./views').FrontDoorMainView;
        view = new FrontDoorMainView({
          model: doc
        });
        return _this.layout.showChildView('content', view);
      };
    })(this), 'frontdoor-main-view');
  };

  Controller.prototype._view_login = function() {
    return require.ensure([], (function(_this) {
      return function() {
        var LoginView, view;
        LoginView = require('./loginview');
        view = new LoginView;
        return _this.layout.showChildView('content', view);
      };
    })(this), 'frontdoor-login-view');
  };

  Controller.prototype.view_page = function(name) {
    var doc, response;
    doc = DocChannel.request('get-document', name);
    response = doc.fetch();
    response.done((function(_this) {
      return function() {
        return _this._view_resource(doc);
      };
    })(this));
    return response.fail((function(_this) {
      return function() {
        return MessageChannel.request('danger', 'Failed to get document');
      };
    })(this));
  };

  Controller.prototype.frontdoor_needuser = function() {
    var user;
    user = MainChannel.request('current-user');
    if (user.has('name')) {
      return this.frontdoor_hasuser(user);
    } else {
      return this.show_login();
    }
  };

  Controller.prototype.show_login = function() {
    return this._view_login();
  };

  Controller.prototype.frontdoor_hasuser = function(user) {
    return this.default_view();
  };

  Controller.prototype.default_view = function() {
    this.setup_layout_if_needed();
    return this.view_page('intro');
  };

  Controller.prototype.frontdoor = function() {
    var appmodel;
    appmodel = MainChannel.request('main:app:appmodel');
    if (appmodel.get('needUser')) {
      console.log('needUser is true');
      return this.frontdoor_needuser();
    } else {
      return this.default_view();
    }
  };

  return Controller;

})(MainController);

module.exports = Controller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwrSkFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFWCxpQkFBbUIsT0FBQSxDQUFRLG1CQUFSOztBQUNuQixhQUFlLE9BQUEsQ0FBUSx1QkFBUjs7QUFDZixrQkFBb0IsT0FBQSxDQUFRLG1CQUFSOztBQUV0QixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUNqQixVQUFBLEdBQWEsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLGtCQUF2Qjs7QUFFYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsa0JBQUEsR0FBcUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO1NBQ2pDLEVBQUUsQ0FBQyxHQUFILENBQU8seUJBQVA7QUFEaUMsQ0FBZDs7QUFHZjs7Ozs7Ozs0QkFDSixRQUFBLEdBQVU7OzRCQUNWLE9BQUEsR0FBUyxTQUFBO1dBQ1A7TUFBQSxPQUFBLEVBQVMsSUFBSSxlQUFKLENBQ1A7UUFBQSxFQUFBLEVBQUksZUFBSjtRQUNBLEtBQUEsRUFBTyxNQURQO09BRE8sQ0FBVDs7RUFETzs7OztHQUZtQixRQUFRLENBQUMsVUFBVSxDQUFDOztBQVE1Qzs7Ozs7Ozt1QkFDSixXQUFBLEdBQWE7O3VCQUViLGNBQUEsR0FBZ0IsU0FBQyxHQUFEO0lBQ2QsSUFBQyxDQUFBLHNCQUFELENBQUE7V0FDQSxPQUFPLENBQUMsTUFBUixDQUFlLEVBQWYsRUFBbUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO0FBQ2pCLFlBQUE7UUFBRSxvQkFBc0IsT0FBQSxDQUFRLFNBQVI7UUFDeEIsSUFBQSxHQUFPLElBQUksaUJBQUosQ0FDTDtVQUFBLEtBQUEsRUFBTyxHQUFQO1NBREs7ZUFFUCxLQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakM7TUFKaUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLEVBTUUscUJBTkY7RUFGYzs7dUJBV2hCLFdBQUEsR0FBYSxTQUFBO1dBQ1gsT0FBTyxDQUFDLE1BQVIsQ0FBZSxFQUFmLEVBQW1CLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtBQUNqQixZQUFBO1FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxhQUFSO1FBQ1osSUFBQSxHQUFPLElBQUk7ZUFDWCxLQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakM7TUFIaUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLEVBTUUsc0JBTkY7RUFEVzs7dUJBU2IsU0FBQSxHQUFXLFNBQUMsSUFBRDtBQUNULFFBQUE7SUFBQSxHQUFBLEdBQU0sVUFBVSxDQUFDLE9BQVgsQ0FBbUIsY0FBbkIsRUFBbUMsSUFBbkM7SUFDTixRQUFBLEdBQVcsR0FBRyxDQUFDLEtBQUosQ0FBQTtJQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ1osS0FBQyxDQUFBLGNBQUQsQ0FBZ0IsR0FBaEI7TUFEWTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZDtXQUVBLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsd0JBQWpDO01BRFk7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQ7RUFMUzs7dUJBU1gsa0JBQUEsR0FBb0IsU0FBQTtBQUNsQixRQUFBO0lBQUEsSUFBQSxHQUFPLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGNBQXBCO0lBQ1AsSUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLE1BQVQsQ0FBSDthQUNFLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixJQUFuQixFQURGO0tBQUEsTUFBQTthQUdFLElBQUMsQ0FBQSxVQUFELENBQUEsRUFIRjs7RUFGa0I7O3VCQU9wQixVQUFBLEdBQVksU0FBQTtXQUNWLElBQUMsQ0FBQSxXQUFELENBQUE7RUFEVTs7dUJBR1osaUJBQUEsR0FBbUIsU0FBQyxJQUFEO1dBQ2pCLElBQUMsQ0FBQSxZQUFELENBQUE7RUFEaUI7O3VCQUduQixZQUFBLEdBQWMsU0FBQTtJQUNaLElBQUMsQ0FBQSxzQkFBRCxDQUFBO1dBQ0EsSUFBQyxDQUFBLFNBQUQsQ0FBVyxPQUFYO0VBRlk7O3VCQUlkLFNBQUEsR0FBVyxTQUFBO0FBQ1QsUUFBQTtJQUFBLFFBQUEsR0FBVyxXQUFXLENBQUMsT0FBWixDQUFvQixtQkFBcEI7SUFDWCxJQUFHLFFBQVEsQ0FBQyxHQUFULENBQWEsVUFBYixDQUFIO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxrQkFBWjthQUNBLElBQUMsQ0FBQSxrQkFBRCxDQUFBLEVBRkY7S0FBQSxNQUFBO2FBSUUsSUFBQyxDQUFBLFlBQUQsQ0FBQSxFQUpGOztFQUZTOzs7O0dBakRZOztBQXlEekIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbnsgTWFpbkNvbnRyb2xsZXIgfSA9IHJlcXVpcmUgJy4uLy4uL2NvbnRyb2xsZXJzJ1xueyBsb2dpbl9mb3JtIH0gPSByZXF1aXJlICcuLi8uLi90ZW1wbGF0ZXMvZm9ybXMnXG57IFNsaWRlRG93blJlZ2lvbiB9ID0gcmVxdWlyZSAnYWdhdGUvc3JjL3JlZ2lvbnMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcbkRvY0NoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdzdGF0aWMtZG9jdW1lbnRzJ1xuXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuZnJvbnRkb29yX3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAoKSAtPlxuICB0Yy5kaXYgJyNtYWluLWNvbnRlbnQuY29sLXNtLTEyJ1xuICBcbmNsYXNzIEZyb250ZG9vckxheW91dCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogZnJvbnRkb29yX3RlbXBsYXRlXG4gIHJlZ2lvbnM6IC0+XG4gICAgY29udGVudDogbmV3IFNsaWRlRG93blJlZ2lvblxuICAgICAgZWw6ICcjbWFpbi1jb250ZW50J1xuICAgICAgc3BlZWQ6ICdzbG93J1xuICBcblxuY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIE1haW5Db250cm9sbGVyXG4gIGxheW91dENsYXNzOiBGcm9udGRvb3JMYXlvdXRcbiAgXG4gIF92aWV3X3Jlc291cmNlOiAoZG9jKSAtPlxuICAgIEBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkKClcbiAgICByZXF1aXJlLmVuc3VyZSBbXSwgKCkgPT5cbiAgICAgIHsgRnJvbnREb29yTWFpblZpZXcgfSA9IHJlcXVpcmUgJy4vdmlld3MnXG4gICAgICB2aWV3ID0gbmV3IEZyb250RG9vck1haW5WaWV3XG4gICAgICAgIG1vZGVsOiBkb2NcbiAgICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICAjIG5hbWUgdGhlIGNodW5rXG4gICAgLCAnZnJvbnRkb29yLW1haW4tdmlldydcbiAgICBcblxuICBfdmlld19sb2dpbjogLT5cbiAgICByZXF1aXJlLmVuc3VyZSBbXSwgKCkgPT5cbiAgICAgIExvZ2luVmlldyA9IHJlcXVpcmUgJy4vbG9naW52aWV3J1xuICAgICAgdmlldyA9IG5ldyBMb2dpblZpZXdcbiAgICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICAgICNAX3Nob3dfY29udGVudCB2aWV3XG4gICAgIyBuYW1lIHRoZSBjaHVua1xuICAgICwgJ2Zyb250ZG9vci1sb2dpbi12aWV3J1xuICAgIFxuICB2aWV3X3BhZ2U6IChuYW1lKSAtPlxuICAgIGRvYyA9IERvY0NoYW5uZWwucmVxdWVzdCAnZ2V0LWRvY3VtZW50JywgbmFtZVxuICAgIHJlc3BvbnNlID0gZG9jLmZldGNoKClcbiAgICByZXNwb25zZS5kb25lID0+XG4gICAgICBAX3ZpZXdfcmVzb3VyY2UgZG9jXG4gICAgcmVzcG9uc2UuZmFpbCA9PlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgJ0ZhaWxlZCB0byBnZXQgZG9jdW1lbnQnXG4gICAgICBcblxuICBmcm9udGRvb3JfbmVlZHVzZXI6IC0+XG4gICAgdXNlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ2N1cnJlbnQtdXNlcidcbiAgICBpZiB1c2VyLmhhcyAnbmFtZSdcbiAgICAgIEBmcm9udGRvb3JfaGFzdXNlciB1c2VyXG4gICAgZWxzZVxuICAgICAgQHNob3dfbG9naW4oKVxuICAgICAgXG4gIHNob3dfbG9naW46IC0+XG4gICAgQF92aWV3X2xvZ2luKClcbiAgICBcbiAgZnJvbnRkb29yX2hhc3VzZXI6ICh1c2VyKSAtPlxuICAgIEBkZWZhdWx0X3ZpZXcoKVxuXG4gIGRlZmF1bHRfdmlldzogLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgQHZpZXdfcGFnZSAnaW50cm8nXG4gICAgICBcbiAgZnJvbnRkb29yOiAtPlxuICAgIGFwcG1vZGVsID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6YXBwbW9kZWwnXG4gICAgaWYgYXBwbW9kZWwuZ2V0ICduZWVkVXNlcidcbiAgICAgIGNvbnNvbGUubG9nICduZWVkVXNlciBpcyB0cnVlJ1xuICAgICAgQGZyb250ZG9vcl9uZWVkdXNlcigpXG4gICAgZWxzZVxuICAgICAgQGRlZmF1bHRfdmlldygpXG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbGxlclxuXG4iXX0=
