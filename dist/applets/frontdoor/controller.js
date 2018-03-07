var Backbone, Controller, DocChannel, FrontdoorLayout, MainChannel, MainController, Marionette, MessageChannel, SlideDownRegion, frontdoor_template, login_form, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

({MainController} = require('../../controllers'));

({login_form} = require('../../templates/forms'));

({SlideDownRegion} = require('agate/src/regions'));

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

DocChannel = Backbone.Radio.channel('static-documents');

tc = require('teacup');

frontdoor_template = tc.renderable(function() {
  return tc.div('#main-content.col-sm-12');
});

FrontdoorLayout = (function() {
  class FrontdoorLayout extends Backbone.Marionette.View {
    regions() {
      return {
        content: new SlideDownRegion({
          el: '#main-content',
          speed: 'slow'
        })
      };
    }

  };

  FrontdoorLayout.prototype.template = frontdoor_template;

  return FrontdoorLayout;

}).call(this);

Controller = (function() {
  class Controller extends MainController {
    _view_resource(doc) {
      this.setup_layout_if_needed();
      return require.ensure([], () => {
        var FrontDoorMainView, view;
        ({FrontDoorMainView} = require('./views'));
        view = new FrontDoorMainView({
          model: doc
        });
        return this.layout.showChildView('content', view);
      // name the chunk
      }, 'frontdoor-main-view');
    }

    _view_login() {
      return require.ensure([], () => {
        var LoginView, view;
        LoginView = require('./loginview');
        view = new LoginView;
        return this.layout.showChildView('content', view);
      //@_show_content view
      // name the chunk
      }, 'frontdoor-login-view');
    }

    view_page(name) {
      var doc, response;
      doc = DocChannel.request('get-document', name);
      response = doc.fetch();
      response.done(() => {
        return this._view_resource(doc);
      });
      return response.fail(() => {
        return MessageChannel.request('danger', 'Failed to get document');
      });
    }

    frontdoor_needuser() {
      var user;
      user = MainChannel.request('current-user');
      if (user.has('name')) {
        return this.frontdoor_hasuser(user);
      } else {
        return this.show_login();
      }
    }

    show_login() {
      return this._view_login();
    }

    frontdoor_hasuser(user) {
      return this.default_view();
    }

    default_view() {
      this.setup_layout_if_needed();
      return this.view_page('intro');
    }

    frontdoor() {
      var appmodel;
      appmodel = MainChannel.request('main:app:appmodel');
      if (appmodel.get('needUser')) {
        console.log('needUser is true');
        return this.frontdoor_needuser();
      } else {
        return this.default_view();
      }
    }

  };

  Controller.prototype.layoutClass = FrontdoorLayout;

  return Controller;

}).call(this);

module.exports = Controller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxlQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxVQUFBLEVBQUEsY0FBQSxFQUFBLGVBQUEsRUFBQSxrQkFBQSxFQUFBLFVBQUEsRUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixDQUFBLENBQUUsY0FBRixDQUFBLEdBQXFCLE9BQUEsQ0FBUSxtQkFBUixDQUFyQjs7QUFDQSxDQUFBLENBQUUsVUFBRixDQUFBLEdBQWlCLE9BQUEsQ0FBUSx1QkFBUixDQUFqQjs7QUFDQSxDQUFBLENBQUUsZUFBRixDQUFBLEdBQXNCLE9BQUEsQ0FBUSxtQkFBUixDQUF0Qjs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUNqQixVQUFBLEdBQWEsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLGtCQUF2Qjs7QUFFYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsa0JBQUEsR0FBcUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtTQUNqQyxFQUFFLENBQUMsR0FBSCxDQUFPLHlCQUFQO0FBRGlDLENBQWQ7O0FBR2Y7RUFBTixNQUFBLGdCQUFBLFFBQThCLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBbEQ7SUFFRSxPQUFTLENBQUEsQ0FBQTthQUNQO1FBQUEsT0FBQSxFQUFTLElBQUksZUFBSixDQUNQO1VBQUEsRUFBQSxFQUFJLGVBQUo7VUFDQSxLQUFBLEVBQU87UUFEUCxDQURPO01BQVQ7SUFETzs7RUFGWDs7NEJBQ0UsUUFBQSxHQUFVOzs7Ozs7QUFPTjtFQUFOLE1BQUEsV0FBQSxRQUF5QixlQUF6QjtJQUdFLGNBQWdCLENBQUMsR0FBRCxDQUFBO01BQ2QsSUFBQyxDQUFBLHNCQUFELENBQUE7YUFDQSxPQUFPLENBQUMsTUFBUixDQUFlLEVBQWYsRUFBbUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsWUFBQSxpQkFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFFLGlCQUFGLENBQUEsR0FBd0IsT0FBQSxDQUFRLFNBQVIsQ0FBeEI7UUFDQSxJQUFBLEdBQU8sSUFBSSxpQkFBSixDQUNMO1VBQUEsS0FBQSxFQUFPO1FBQVAsQ0FESztlQUVQLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQyxFQUppQjs7TUFBQSxDQUFuQixFQU1FLHFCQU5GO0lBRmM7O0lBV2hCLFdBQWEsQ0FBQSxDQUFBO2FBQ1gsT0FBTyxDQUFDLE1BQVIsQ0FBZSxFQUFmLEVBQW1CLENBQUEsQ0FBQSxHQUFBO0FBQ2pCLFlBQUEsU0FBQSxFQUFBO1FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxhQUFSO1FBQ1osSUFBQSxHQUFPLElBQUk7ZUFDWCxJQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakMsRUFIaUI7OztNQUFBLENBQW5CLEVBTUUsc0JBTkY7SUFEVzs7SUFTYixTQUFXLENBQUMsSUFBRCxDQUFBO0FBQ1QsVUFBQSxHQUFBLEVBQUE7TUFBQSxHQUFBLEdBQU0sVUFBVSxDQUFDLE9BQVgsQ0FBbUIsY0FBbkIsRUFBbUMsSUFBbkM7TUFDTixRQUFBLEdBQVcsR0FBRyxDQUFDLEtBQUosQ0FBQTtNQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBQSxDQUFBLEdBQUE7ZUFDWixJQUFDLENBQUEsY0FBRCxDQUFnQixHQUFoQjtNQURZLENBQWQ7YUFFQSxRQUFRLENBQUMsSUFBVCxDQUFjLENBQUEsQ0FBQSxHQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsd0JBQWpDO01BRFksQ0FBZDtJQUxTOztJQVNYLGtCQUFvQixDQUFBLENBQUE7QUFDbEIsVUFBQTtNQUFBLElBQUEsR0FBTyxXQUFXLENBQUMsT0FBWixDQUFvQixjQUFwQjtNQUNQLElBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxNQUFULENBQUg7ZUFDRSxJQUFDLENBQUEsaUJBQUQsQ0FBbUIsSUFBbkIsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBSEY7O0lBRmtCOztJQU9wQixVQUFZLENBQUEsQ0FBQTthQUNWLElBQUMsQ0FBQSxXQUFELENBQUE7SUFEVTs7SUFHWixpQkFBbUIsQ0FBQyxJQUFELENBQUE7YUFDakIsSUFBQyxDQUFBLFlBQUQsQ0FBQTtJQURpQjs7SUFHbkIsWUFBYyxDQUFBLENBQUE7TUFDWixJQUFDLENBQUEsc0JBQUQsQ0FBQTthQUNBLElBQUMsQ0FBQSxTQUFELENBQVcsT0FBWDtJQUZZOztJQUlkLFNBQVcsQ0FBQSxDQUFBO0FBQ1QsVUFBQTtNQUFBLFFBQUEsR0FBVyxXQUFXLENBQUMsT0FBWixDQUFvQixtQkFBcEI7TUFDWCxJQUFHLFFBQVEsQ0FBQyxHQUFULENBQWEsVUFBYixDQUFIO1FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxrQkFBWjtlQUNBLElBQUMsQ0FBQSxrQkFBRCxDQUFBLEVBRkY7T0FBQSxNQUFBO2VBSUUsSUFBQyxDQUFBLFlBQUQsQ0FBQSxFQUpGOztJQUZTOztFQWpEYjs7dUJBQ0UsV0FBQSxHQUFhOzs7Ozs7QUF3RGYsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbnsgTWFpbkNvbnRyb2xsZXIgfSA9IHJlcXVpcmUgJy4uLy4uL2NvbnRyb2xsZXJzJ1xueyBsb2dpbl9mb3JtIH0gPSByZXF1aXJlICcuLi8uLi90ZW1wbGF0ZXMvZm9ybXMnXG57IFNsaWRlRG93blJlZ2lvbiB9ID0gcmVxdWlyZSAnYWdhdGUvc3JjL3JlZ2lvbnMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcbkRvY0NoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdzdGF0aWMtZG9jdW1lbnRzJ1xuXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuZnJvbnRkb29yX3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAoKSAtPlxuICB0Yy5kaXYgJyNtYWluLWNvbnRlbnQuY29sLXNtLTEyJ1xuICBcbmNsYXNzIEZyb250ZG9vckxheW91dCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogZnJvbnRkb29yX3RlbXBsYXRlXG4gIHJlZ2lvbnM6IC0+XG4gICAgY29udGVudDogbmV3IFNsaWRlRG93blJlZ2lvblxuICAgICAgZWw6ICcjbWFpbi1jb250ZW50J1xuICAgICAgc3BlZWQ6ICdzbG93J1xuICBcblxuY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIE1haW5Db250cm9sbGVyXG4gIGxheW91dENsYXNzOiBGcm9udGRvb3JMYXlvdXRcbiAgXG4gIF92aWV3X3Jlc291cmNlOiAoZG9jKSAtPlxuICAgIEBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkKClcbiAgICByZXF1aXJlLmVuc3VyZSBbXSwgKCkgPT5cbiAgICAgIHsgRnJvbnREb29yTWFpblZpZXcgfSA9IHJlcXVpcmUgJy4vdmlld3MnXG4gICAgICB2aWV3ID0gbmV3IEZyb250RG9vck1haW5WaWV3XG4gICAgICAgIG1vZGVsOiBkb2NcbiAgICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICAjIG5hbWUgdGhlIGNodW5rXG4gICAgLCAnZnJvbnRkb29yLW1haW4tdmlldydcbiAgICBcblxuICBfdmlld19sb2dpbjogLT5cbiAgICByZXF1aXJlLmVuc3VyZSBbXSwgKCkgPT5cbiAgICAgIExvZ2luVmlldyA9IHJlcXVpcmUgJy4vbG9naW52aWV3J1xuICAgICAgdmlldyA9IG5ldyBMb2dpblZpZXdcbiAgICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICAgICNAX3Nob3dfY29udGVudCB2aWV3XG4gICAgIyBuYW1lIHRoZSBjaHVua1xuICAgICwgJ2Zyb250ZG9vci1sb2dpbi12aWV3J1xuICAgIFxuICB2aWV3X3BhZ2U6IChuYW1lKSAtPlxuICAgIGRvYyA9IERvY0NoYW5uZWwucmVxdWVzdCAnZ2V0LWRvY3VtZW50JywgbmFtZVxuICAgIHJlc3BvbnNlID0gZG9jLmZldGNoKClcbiAgICByZXNwb25zZS5kb25lID0+XG4gICAgICBAX3ZpZXdfcmVzb3VyY2UgZG9jXG4gICAgcmVzcG9uc2UuZmFpbCA9PlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgJ0ZhaWxlZCB0byBnZXQgZG9jdW1lbnQnXG4gICAgICBcblxuICBmcm9udGRvb3JfbmVlZHVzZXI6IC0+XG4gICAgdXNlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ2N1cnJlbnQtdXNlcidcbiAgICBpZiB1c2VyLmhhcyAnbmFtZSdcbiAgICAgIEBmcm9udGRvb3JfaGFzdXNlciB1c2VyXG4gICAgZWxzZVxuICAgICAgQHNob3dfbG9naW4oKVxuICAgICAgXG4gIHNob3dfbG9naW46IC0+XG4gICAgQF92aWV3X2xvZ2luKClcbiAgICBcbiAgZnJvbnRkb29yX2hhc3VzZXI6ICh1c2VyKSAtPlxuICAgIEBkZWZhdWx0X3ZpZXcoKVxuXG4gIGRlZmF1bHRfdmlldzogLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgQHZpZXdfcGFnZSAnaW50cm8nXG4gICAgICBcbiAgZnJvbnRkb29yOiAtPlxuICAgIGFwcG1vZGVsID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6YXBwbW9kZWwnXG4gICAgaWYgYXBwbW9kZWwuZ2V0ICduZWVkVXNlcidcbiAgICAgIGNvbnNvbGUubG9nICduZWVkVXNlciBpcyB0cnVlJ1xuICAgICAgQGZyb250ZG9vcl9uZWVkdXNlcigpXG4gICAgZWxzZVxuICAgICAgQGRlZmF1bHRfdmlldygpXG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbGxlclxuXG4iXX0=
