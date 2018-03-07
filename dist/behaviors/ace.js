var Backbone, HasAceEditor, MainChannel, Marionette, ace, html_mode, markdown_mode, twilight_theme;

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

HasAceEditor = (function() {
  
  // view must have editorTheme and editorMode set
  // or should?
  class HasAceEditor extends Backbone.Marionette.Behavior {
    setEditorMode(mode) {
      var session;
      session = this.view.editor.getSession();
      return session.setMode(`ace/mode/${mode}`);
    }

    onDomRefresh() {
      var ref;
      this.view.editor = ace.edit(this.view.ui.editor.attr('id'));
      // disable warning:
      // Automatically scrolling cursor into view after selection change
      // this will be disabled in the next version
      // set editor.$blockScrolling = Infinity to disable this message
      this.view.editor.$blockScrolling = 2e308;
      this.view.editor.setTheme(this.options.editorTheme);
      if (this.view.model.has('doctype')) {
        this.setEditorMode(this.view.model.get('doctype'));
      }
      if ((ref = this.view) != null ? ref.afterDomRefresh : void 0) {
        return this.view.afterDomRefresh();
      }
    }

  };

  HasAceEditor.prototype.ui = {
    editor: '#ace-editor'
  };

  HasAceEditor.prototype.defaults = {
    editorTheme: 'ace/theme/twilight',
    editorMode: 'markdown'
  };

  return HasAceEditor;

}).call(this);

module.exports = HasAceEditor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2FjZS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2FjZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBLFdBQUEsRUFBQSxVQUFBLEVBQUEsR0FBQSxFQUFBLFNBQUEsRUFBQSxhQUFBLEVBQUE7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRWIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFZCxHQUFBLEdBQU0sT0FBQSxDQUFRLE9BQVI7O0FBQ04sU0FBQSxHQUFZLE9BQUEsQ0FBUSxpQkFBUjs7QUFDWixjQUFBLEdBQWlCLE9BQUEsQ0FBUSxzQkFBUjs7QUFDakIsYUFBQSxHQUFnQixPQUFBLENBQVEscUJBQVI7O0FBRWhCLENBQUE7RUFBQSxXQUFBLEVBQ0U7SUFBQSxXQUFBLEVBQWEsb0JBQWI7SUFDQSxVQUFBLEVBQVk7RUFEWjtBQURGLENBQUE7O0FBTU07Ozs7RUFBTixNQUFBLGFBQUEsUUFBMkIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUEvQztJQU9FLGFBQWUsQ0FBQyxJQUFELENBQUE7QUFDYixVQUFBO01BQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQWIsQ0FBQTthQUNWLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUEsU0FBQSxDQUFBLENBQVksSUFBWixDQUFBLENBQWhCO0lBRmE7O0lBSWYsWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBO01BQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWUsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFDLENBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBVCxFQUFmOzs7OztNQUtBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWIsR0FBK0I7TUFDL0IsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBYixDQUFzQixJQUFDLENBQUEsT0FBTyxDQUFDLFdBQS9CO01BQ0EsSUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQUg7UUFDRSxJQUFDLENBQUEsYUFBRCxDQUFlLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBZixFQURGOztNQUVBLG1DQUFRLENBQUUsd0JBQVY7ZUFDRSxJQUFDLENBQUEsSUFBSSxDQUFDLGVBQU4sQ0FBQSxFQURGOztJQVZZOztFQVhoQjs7eUJBQ0UsRUFBQSxHQUNFO0lBQUEsTUFBQSxFQUFRO0VBQVI7O3lCQUNGLFFBQUEsR0FDRTtJQUFBLFdBQUEsRUFBYSxvQkFBYjtJQUNBLFVBQUEsRUFBWTtFQURaOzs7Ozs7QUFzQkosTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5hY2UgPSByZXF1aXJlICdicmFjZSdcbmh0bWxfbW9kZSA9IHJlcXVpcmUgJ2JyYWNlL21vZGUvaHRtbCdcbnR3aWxpZ2h0X3RoZW1lID0gcmVxdWlyZSAnYnJhY2UvdGhlbWUvdHdpbGlnaHQnXG5tYXJrZG93bl9tb2RlID0gcmVxdWlyZSAnYnJhY2UvbW9kZS9tYXJrZG93bidcblxuQUNFREVGQVVMVFM6XG4gIGVkaXRvclRoZW1lOiAnYWNlL3RoZW1lL3R3aWxpZ2h0J1xuICBlZGl0b3JNb2RlOiAnYWNlL21vZGUvaHRtbCdcbiAgXG4jIHZpZXcgbXVzdCBoYXZlIGVkaXRvclRoZW1lIGFuZCBlZGl0b3JNb2RlIHNldFxuIyBvciBzaG91bGQ/XG5jbGFzcyBIYXNBY2VFZGl0b3IgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkJlaGF2aW9yXG4gIHVpOlxuICAgIGVkaXRvcjogJyNhY2UtZWRpdG9yJ1xuICBkZWZhdWx0czpcbiAgICBlZGl0b3JUaGVtZTogJ2FjZS90aGVtZS90d2lsaWdodCdcbiAgICBlZGl0b3JNb2RlOiAnbWFya2Rvd24nXG5cbiAgc2V0RWRpdG9yTW9kZTogKG1vZGUpIC0+XG4gICAgc2Vzc2lvbiA9IEB2aWV3LmVkaXRvci5nZXRTZXNzaW9uKClcbiAgICBzZXNzaW9uLnNldE1vZGUgXCJhY2UvbW9kZS8je21vZGV9XCJcbiAgICBcbiAgb25Eb21SZWZyZXNoOiAoKSAtPlxuICAgIEB2aWV3LmVkaXRvciA9IGFjZS5lZGl0IEB2aWV3LnVpLmVkaXRvci5hdHRyICdpZCdcbiAgICAjIGRpc2FibGUgd2FybmluZzpcbiAgICAjIEF1dG9tYXRpY2FsbHkgc2Nyb2xsaW5nIGN1cnNvciBpbnRvIHZpZXcgYWZ0ZXIgc2VsZWN0aW9uIGNoYW5nZVxuICAgICMgdGhpcyB3aWxsIGJlIGRpc2FibGVkIGluIHRoZSBuZXh0IHZlcnNpb25cbiAgICAjIHNldCBlZGl0b3IuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHkgdG8gZGlzYWJsZSB0aGlzIG1lc3NhZ2VcbiAgICBAdmlldy5lZGl0b3IuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHlcbiAgICBAdmlldy5lZGl0b3Iuc2V0VGhlbWUgQG9wdGlvbnMuZWRpdG9yVGhlbWVcbiAgICBpZiBAdmlldy5tb2RlbC5oYXMgJ2RvY3R5cGUnXG4gICAgICBAc2V0RWRpdG9yTW9kZSBAdmlldy5tb2RlbC5nZXQgJ2RvY3R5cGUnXG4gICAgaWYgQHZpZXc/LmFmdGVyRG9tUmVmcmVzaFxuICAgICAgQHZpZXcuYWZ0ZXJEb21SZWZyZXNoKClcbiAgICBcbiAgXG4gIFxubW9kdWxlLmV4cG9ydHMgPSBIYXNBY2VFZGl0b3JcbiJdfQ==
