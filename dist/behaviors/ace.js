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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2FjZS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2FjZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw4RkFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7QUFDTixTQUFBLEdBQVksT0FBQSxDQUFRLGlCQUFSOztBQUNaLGNBQUEsR0FBaUIsT0FBQSxDQUFRLHNCQUFSOztBQUNqQixhQUFBLEdBQWdCLE9BQUEsQ0FBUSxxQkFBUjs7QUFFaEIsQ0FBQTtFQUFBLFdBQUEsRUFDRTtJQUFBLFdBQUEsRUFBYSxvQkFBYjtJQUNBLFVBQUEsRUFBWSxlQURaO0dBREY7Q0FBQTs7QUFNTTs7Ozs7Ozt5QkFDSixFQUFBLEdBQ0U7SUFBQSxNQUFBLEVBQVEsYUFBUjs7O3lCQUNGLFFBQUEsR0FDRTtJQUFBLFdBQUEsRUFBYSxvQkFBYjtJQUNBLFVBQUEsRUFBWSxVQURaOzs7eUJBR0YsYUFBQSxHQUFlLFNBQUMsSUFBRDtBQUNiLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBYixDQUFBO1dBQ1YsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsV0FBQSxHQUFZLElBQTVCO0VBRmE7O3lCQUlmLFlBQUEsR0FBYyxTQUFBO0FBQ1osUUFBQTtJQUFBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixHQUFlLEdBQUcsQ0FBQyxJQUFKLENBQVMsSUFBQyxDQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQWhCLENBQXFCLElBQXJCLENBQVQ7SUFLZixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFiLEdBQStCO0lBQy9CLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQWIsQ0FBc0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUEvQjtJQUNBLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixTQUFoQixDQUFIO01BQ0UsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQWYsRUFERjs7SUFFQSxtQ0FBUSxDQUFFLHdCQUFWO2FBQ0UsSUFBQyxDQUFBLElBQUksQ0FBQyxlQUFOLENBQUEsRUFERjs7RUFWWTs7OztHQVhXLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBMEIvQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmFjZSA9IHJlcXVpcmUgJ2JyYWNlJ1xuaHRtbF9tb2RlID0gcmVxdWlyZSAnYnJhY2UvbW9kZS9odG1sJ1xudHdpbGlnaHRfdGhlbWUgPSByZXF1aXJlICdicmFjZS90aGVtZS90d2lsaWdodCdcbm1hcmtkb3duX21vZGUgPSByZXF1aXJlICdicmFjZS9tb2RlL21hcmtkb3duJ1xuXG5BQ0VERUZBVUxUUzpcbiAgZWRpdG9yVGhlbWU6ICdhY2UvdGhlbWUvdHdpbGlnaHQnXG4gIGVkaXRvck1vZGU6ICdhY2UvbW9kZS9odG1sJ1xuICBcbiMgdmlldyBtdXN0IGhhdmUgZWRpdG9yVGhlbWUgYW5kIGVkaXRvck1vZGUgc2V0XG4jIG9yIHNob3VsZD9cbmNsYXNzIEhhc0FjZUVkaXRvciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQmVoYXZpb3JcbiAgdWk6XG4gICAgZWRpdG9yOiAnI2FjZS1lZGl0b3InXG4gIGRlZmF1bHRzOlxuICAgIGVkaXRvclRoZW1lOiAnYWNlL3RoZW1lL3R3aWxpZ2h0J1xuICAgIGVkaXRvck1vZGU6ICdtYXJrZG93bidcblxuICBzZXRFZGl0b3JNb2RlOiAobW9kZSkgLT5cbiAgICBzZXNzaW9uID0gQHZpZXcuZWRpdG9yLmdldFNlc3Npb24oKVxuICAgIHNlc3Npb24uc2V0TW9kZSBcImFjZS9tb2RlLyN7bW9kZX1cIlxuICAgIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgQHZpZXcuZWRpdG9yID0gYWNlLmVkaXQgQHZpZXcudWkuZWRpdG9yLmF0dHIgJ2lkJ1xuICAgICMgZGlzYWJsZSB3YXJuaW5nOlxuICAgICMgQXV0b21hdGljYWxseSBzY3JvbGxpbmcgY3Vyc29yIGludG8gdmlldyBhZnRlciBzZWxlY3Rpb24gY2hhbmdlXG4gICAgIyB0aGlzIHdpbGwgYmUgZGlzYWJsZWQgaW4gdGhlIG5leHQgdmVyc2lvblxuICAgICMgc2V0IGVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eSB0byBkaXNhYmxlIHRoaXMgbWVzc2FnZVxuICAgIEB2aWV3LmVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eVxuICAgIEB2aWV3LmVkaXRvci5zZXRUaGVtZSBAb3B0aW9ucy5lZGl0b3JUaGVtZVxuICAgIGlmIEB2aWV3Lm1vZGVsLmhhcyAnZG9jdHlwZSdcbiAgICAgIEBzZXRFZGl0b3JNb2RlIEB2aWV3Lm1vZGVsLmdldCAnZG9jdHlwZSdcbiAgICBpZiBAdmlldz8uYWZ0ZXJEb21SZWZyZXNoXG4gICAgICBAdmlldy5hZnRlckRvbVJlZnJlc2goKVxuICAgIFxuICBcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IEhhc0FjZUVkaXRvclxuIl19
