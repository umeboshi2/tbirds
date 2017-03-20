var Backbone, MainChannel, Marionette, create_app, prepare_app;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

create_app = function(appmodel) {
  return new Marionette.Application({
    region: appmodel.get('appRegion'),
    onStart: function() {
      var applet, frontdoor, hasUser, i, len, ref, signal, userprofile;
      frontdoor = appmodel.get('frontdoor_app');
      MainChannel.request("applet:" + frontdoor + ":route");
      hasUser = appmodel.get('hasUser');
      if (hasUser) {
        userprofile = appmodel.get('userprofile_app');
        MainChannel.request("applet:" + userprofile + ":route");
      }
      ref = appmodel.get('applets');
      for (i = 0, len = ref.length; i < len; i++) {
        applet = ref[i];
        if (applet != null ? applet.appname : void 0) {
          signal = "applet:" + applet.appname + ":route";
          MainChannel.request(signal);
        }
      }
      MainChannel.request('mainpage:init', appmodel);
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    }
  });
};

prepare_app = function(appmodel) {
  var app;
  app = create_app(appmodel);
  MainChannel.reply('main:app:object', function() {
    return app;
  });
  return app;
};

module.exports = prepare_app;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByZXBhcmUuanMiLCJzb3VyY2VzIjpbImFwcC1wcmVwYXJlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBR2QsVUFBQSxHQUFhLFNBQUMsUUFBRDtTQUNYLElBQUksVUFBVSxDQUFDLFdBQWYsQ0FDRTtJQUFBLE1BQUEsRUFBUSxRQUFRLENBQUMsR0FBVCxDQUFhLFdBQWIsQ0FBUjtJQUNBLE9BQUEsRUFBUyxTQUFBO0FBTVAsVUFBQTtNQUFBLFNBQUEsR0FBWSxRQUFRLENBQUMsR0FBVCxDQUFhLGVBQWI7TUFDWixXQUFXLENBQUMsT0FBWixDQUFvQixTQUFBLEdBQVUsU0FBVixHQUFvQixRQUF4QztNQUNBLE9BQUEsR0FBVSxRQUFRLENBQUMsR0FBVCxDQUFhLFNBQWI7TUFDVixJQUFHLE9BQUg7UUFDRSxXQUFBLEdBQWMsUUFBUSxDQUFDLEdBQVQsQ0FBYSxpQkFBYjtRQUNkLFdBQVcsQ0FBQyxPQUFaLENBQW9CLFNBQUEsR0FBVSxXQUFWLEdBQXNCLFFBQTFDLEVBRkY7O0FBR0E7QUFBQSxXQUFBLHFDQUFBOztRQUNFLHFCQUFHLE1BQU0sQ0FBRSxnQkFBWDtVQUNFLE1BQUEsR0FBUyxTQUFBLEdBQVUsTUFBTSxDQUFDLE9BQWpCLEdBQXlCO1VBRWxDLFdBQVcsQ0FBQyxPQUFaLENBQW9CLE1BQXBCLEVBSEY7O0FBREY7TUFNQSxXQUFXLENBQUMsT0FBWixDQUFvQixlQUFwQixFQUFxQyxRQUFyQztNQUNBLElBQUEsQ0FBZ0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFqRDtlQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBakIsQ0FBQSxFQUFBOztJQW5CTyxDQURUO0dBREY7QUFEVzs7QUEwQmIsV0FBQSxHQUFjLFNBQUMsUUFBRDtBQUNaLE1BQUE7RUFBQSxHQUFBLEdBQU0sVUFBQSxDQUFXLFFBQVg7RUFFTixXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsU0FBQTtXQUNuQztFQURtQyxDQUFyQztBQUVBLFNBQU87QUFMSzs7QUFPZCxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cblxuY3JlYXRlX2FwcCA9IChhcHBtb2RlbCkgLT5cbiAgbmV3IE1hcmlvbmV0dGUuQXBwbGljYXRpb25cbiAgICByZWdpb246IGFwcG1vZGVsLmdldCAnYXBwUmVnaW9uJ1xuICAgIG9uU3RhcnQ6IC0+XG4gICAgICAjIGJ1aWxkIHJvdXRlc1xuICAgICAgIyBzdGFydCB0aGUgYXBwcm91dGVzXG4gICAgICAjIGFwcGxldHMgbmVlZCB0byBiZSByZXF1aXJlZCBiZWZvcmUgYXBwLnN0YXJ0KClcbiAgICAgICMgdGhlICdmcm9udGRvb3JfYXBwJyBzaG91bGQgaGFuZGxlIHRoZSAnJyA8Ymxhbms+XG4gICAgICAjIHJvdXRlIGZvciB0aGUgaW5pdGlhbCBwYWdlLlxuICAgICAgZnJvbnRkb29yID0gYXBwbW9kZWwuZ2V0ICdmcm9udGRvb3JfYXBwJ1xuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCBcImFwcGxldDoje2Zyb250ZG9vcn06cm91dGVcIlxuICAgICAgaGFzVXNlciA9IGFwcG1vZGVsLmdldCAnaGFzVXNlcidcbiAgICAgIGlmIGhhc1VzZXJcbiAgICAgICAgdXNlcnByb2ZpbGUgPSBhcHBtb2RlbC5nZXQgJ3VzZXJwcm9maWxlX2FwcCdcbiAgICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCBcImFwcGxldDoje3VzZXJwcm9maWxlfTpyb3V0ZVwiXG4gICAgICBmb3IgYXBwbGV0IGluIGFwcG1vZGVsLmdldCAnYXBwbGV0cydcbiAgICAgICAgaWYgYXBwbGV0Py5hcHBuYW1lXG4gICAgICAgICAgc2lnbmFsID0gXCJhcHBsZXQ6I3thcHBsZXQuYXBwbmFtZX06cm91dGVcIlxuICAgICAgICAgICNjb25zb2xlLmxvZyBcImNyZWF0ZSBzaWduYWwgI3tzaWduYWx9XCJcbiAgICAgICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0IHNpZ25hbFxuICAgICAgIyBidWlsZCBtYWluIHBhZ2UgbGF5b3V0XG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWlucGFnZTppbml0JywgYXBwbW9kZWxcbiAgICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKSB1bmxlc3MgQmFja2JvbmUuaGlzdG9yeS5zdGFydGVkXG4gICAgICBcbiAgXG5cbnByZXBhcmVfYXBwID0gKGFwcG1vZGVsKSAtPlxuICBhcHAgPSBjcmVhdGVfYXBwIGFwcG1vZGVsXG4gICMgc2V0IG1vcmUgbWFpbjphcHAgaGFuZGxlcnNcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOm9iamVjdCcsIC0+XG4gICAgYXBwXG4gIHJldHVybiBhcHAgXG5cbm1vZHVsZS5leHBvcnRzID0gcHJlcGFyZV9hcHBcblxuXG4iXX0=
