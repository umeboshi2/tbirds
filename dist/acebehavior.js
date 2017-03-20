var Backbone, HasAceEditor, MainChannel, Marionette, ace, html_mode, markdown_mode, twilight_theme,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

ace = require('brace');

html_mode = require('brace/mode/html');

twilight_theme = require('brace/theme/twilight');

markdown_mode = require('brace/mode/markdown');

({
  ACEDEFAULTS: {
    editorTheme: 'ace/theme/twilight',
    editorMode: 'ace/mode/html'
  }
});

HasAceEditor = (function(superClass) {
  extend(HasAceEditor, superClass);

  function HasAceEditor() {
    return HasAceEditor.__super__.constructor.apply(this, arguments);
  }

  HasAceEditor.prototype.ui = {
    editor: '#ace-editor'
  };

  HasAceEditor.prototype.defaults = {
    editorTheme: 'ace/theme/twilight',
    editorMode: 'markdown'
  };

  HasAceEditor.prototype.setEditorMode = function(mode) {
    var session;
    session = this.view.editor.getSession();
    return session.setMode("ace/mode/" + mode);
  };

  HasAceEditor.prototype.onDomRefresh = function() {
    var ref;
    this.view.editor = ace.edit(this.view.ui.editor.attr('id'));
    this.view.editor.$blockScrolling = 2e308;
    this.view.editor.setTheme(this.options.editorTheme);
    if (this.view.model.has('doctype')) {
      this.setEditorMode(this.view.model.get('doctype'));
    }
    if ((ref = this.view) != null ? ref.afterDomRefresh : void 0) {
      return this.view.afterDomRefresh();
    }
  };

  return HasAceEditor;

})(Backbone.Marionette.Behavior);

module.exports = HasAceEditor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNlYmVoYXZpb3IuanMiLCJzb3VyY2VzIjpbImFjZWJlaGF2aW9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhGQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRWQsR0FBQSxHQUFNLE9BQUEsQ0FBUSxPQUFSOztBQUNOLFNBQUEsR0FBWSxPQUFBLENBQVEsaUJBQVI7O0FBQ1osY0FBQSxHQUFpQixPQUFBLENBQVEsc0JBQVI7O0FBQ2pCLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLHFCQUFSOztBQUVoQixDQUFBO0VBQUEsV0FBQSxFQUNFO0lBQUEsV0FBQSxFQUFhLG9CQUFiO0lBQ0EsVUFBQSxFQUFZLGVBRFo7R0FERjtDQUFBOztBQU1NOzs7Ozs7O3lCQUNKLEVBQUEsR0FDRTtJQUFBLE1BQUEsRUFBUSxhQUFSOzs7eUJBQ0YsUUFBQSxHQUNFO0lBQUEsV0FBQSxFQUFhLG9CQUFiO0lBQ0EsVUFBQSxFQUFZLFVBRFo7Ozt5QkFHRixhQUFBLEdBQWUsU0FBQyxJQUFEO0FBQ2IsUUFBQTtJQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFiLENBQUE7V0FDVixPQUFPLENBQUMsT0FBUixDQUFnQixXQUFBLEdBQVksSUFBNUI7RUFGYTs7eUJBSWYsWUFBQSxHQUFjLFNBQUE7QUFDWixRQUFBO0lBQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWUsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFDLENBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBVDtJQUtmLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWIsR0FBK0I7SUFDL0IsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBYixDQUFzQixJQUFDLENBQUEsT0FBTyxDQUFDLFdBQS9CO0lBQ0EsSUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQUg7TUFDRSxJQUFDLENBQUEsYUFBRCxDQUFlLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBZixFQURGOztJQUVBLG1DQUFRLENBQUUsd0JBQVY7YUFDRSxJQUFDLENBQUEsSUFBSSxDQUFDLGVBQU4sQ0FBQSxFQURGOztFQVZZOzs7O0dBWFcsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUEwQi9DLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuYWNlID0gcmVxdWlyZSAnYnJhY2UnXG5odG1sX21vZGUgPSByZXF1aXJlICdicmFjZS9tb2RlL2h0bWwnXG50d2lsaWdodF90aGVtZSA9IHJlcXVpcmUgJ2JyYWNlL3RoZW1lL3R3aWxpZ2h0J1xubWFya2Rvd25fbW9kZSA9IHJlcXVpcmUgJ2JyYWNlL21vZGUvbWFya2Rvd24nXG5cbkFDRURFRkFVTFRTOlxuICBlZGl0b3JUaGVtZTogJ2FjZS90aGVtZS90d2lsaWdodCdcbiAgZWRpdG9yTW9kZTogJ2FjZS9tb2RlL2h0bWwnXG4gIFxuIyB2aWV3IG11c3QgaGF2ZSBlZGl0b3JUaGVtZSBhbmQgZWRpdG9yTW9kZSBzZXRcbiMgb3Igc2hvdWxkP1xuY2xhc3MgSGFzQWNlRWRpdG9yIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5CZWhhdmlvclxuICB1aTpcbiAgICBlZGl0b3I6ICcjYWNlLWVkaXRvcidcbiAgZGVmYXVsdHM6XG4gICAgZWRpdG9yVGhlbWU6ICdhY2UvdGhlbWUvdHdpbGlnaHQnXG4gICAgZWRpdG9yTW9kZTogJ21hcmtkb3duJ1xuXG4gIHNldEVkaXRvck1vZGU6IChtb2RlKSAtPlxuICAgIHNlc3Npb24gPSBAdmlldy5lZGl0b3IuZ2V0U2Vzc2lvbigpXG4gICAgc2Vzc2lvbi5zZXRNb2RlIFwiYWNlL21vZGUvI3ttb2RlfVwiXG4gICAgXG4gIG9uRG9tUmVmcmVzaDogKCkgLT5cbiAgICBAdmlldy5lZGl0b3IgPSBhY2UuZWRpdCBAdmlldy51aS5lZGl0b3IuYXR0ciAnaWQnXG4gICAgIyBkaXNhYmxlIHdhcm5pbmc6XG4gICAgIyBBdXRvbWF0aWNhbGx5IHNjcm9sbGluZyBjdXJzb3IgaW50byB2aWV3IGFmdGVyIHNlbGVjdGlvbiBjaGFuZ2VcbiAgICAjIHRoaXMgd2lsbCBiZSBkaXNhYmxlZCBpbiB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgIyBzZXQgZWRpdG9yLiRibG9ja1Njcm9sbGluZyA9IEluZmluaXR5IHRvIGRpc2FibGUgdGhpcyBtZXNzYWdlXG4gICAgQHZpZXcuZWRpdG9yLiRibG9ja1Njcm9sbGluZyA9IEluZmluaXR5XG4gICAgQHZpZXcuZWRpdG9yLnNldFRoZW1lIEBvcHRpb25zLmVkaXRvclRoZW1lXG4gICAgaWYgQHZpZXcubW9kZWwuaGFzICdkb2N0eXBlJ1xuICAgICAgQHNldEVkaXRvck1vZGUgQHZpZXcubW9kZWwuZ2V0ICdkb2N0eXBlJ1xuICAgIGlmIEB2aWV3Py5hZnRlckRvbVJlZnJlc2hcbiAgICAgIEB2aWV3LmFmdGVyRG9tUmVmcmVzaCgpXG4gICAgXG4gIFxuICBcbm1vZHVsZS5leHBvcnRzID0gSGFzQWNlRWRpdG9yXG4iXX0=
