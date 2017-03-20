var Backbone, EmptyView, MainChannel, Marionette, ShowInitialEmptyContent,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

EmptyView = require('../views/empty');

ShowInitialEmptyContent = (function(superClass) {
  extend(ShowInitialEmptyContent, superClass);

  function ShowInitialEmptyContent() {
    return ShowInitialEmptyContent.__super__.constructor.apply(this, arguments);
  }

  ShowInitialEmptyContent.prototype.onDomRefresh = function() {
    var view;
    view = new EmptyView;
    return this.view.showChildView('content', view);
  };

  return ShowInitialEmptyContent;

})(Backbone.Marionette.Behavior);

module.exports = ShowInitialEmptyContent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxxRUFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLFNBQUEsR0FBWSxPQUFBLENBQVEsZ0JBQVI7O0FBRU47Ozs7Ozs7b0NBQ0osWUFBQSxHQUFjLFNBQUE7QUFDWixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUk7V0FDWCxJQUFDLENBQUEsSUFBSSxDQUFDLGFBQU4sQ0FBb0IsU0FBcEIsRUFBK0IsSUFBL0I7RUFGWTs7OztHQURzQixRQUFRLENBQUMsVUFBVSxDQUFDOztBQUsxRCxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbkVtcHR5VmlldyA9IHJlcXVpcmUgJy4uL3ZpZXdzL2VtcHR5J1xuXG5jbGFzcyBTaG93SW5pdGlhbEVtcHR5Q29udGVudCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQmVoYXZpb3JcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIHZpZXcgPSBuZXcgRW1wdHlWaWV3XG4gICAgQHZpZXcuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICBcbm1vZHVsZS5leHBvcnRzID0gU2hvd0luaXRpYWxFbXB0eUNvbnRlbnRcblxuIl19
