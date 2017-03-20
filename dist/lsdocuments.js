var Backbone, BaseLocalStorageCollection, Document, DocumentCollection, MainChannel, MessageChannel, ResourceChannel, app_documents, make_new_doc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

BaseLocalStorageCollection = require('lscollection').BaseLocalStorageCollection;

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

ResourceChannel = Backbone.Radio.channel('resources');

Document = (function(superClass) {
  extend(Document, superClass);

  function Document() {
    return Document.__super__.constructor.apply(this, arguments);
  }

  Document.prototype.idAttribute = 'name';

  Document.prototype.defaults = {
    name: '',
    doctype: 'markdown',
    title: '',
    content: '',
    description: ''
  };

  return Document;

})(Backbone.Model);

DocumentCollection = (function(superClass) {
  extend(DocumentCollection, superClass);

  function DocumentCollection() {
    return DocumentCollection.__super__.constructor.apply(this, arguments);
  }

  DocumentCollection.prototype.local_storage_key = 'ls_documents';

  DocumentCollection.prototype.model = Document;

  return DocumentCollection;

})(BaseLocalStorageCollection);

app_documents = new DocumentCollection;

ResourceChannel.reply('ls-documents', function() {
  return app_documents;
});

ResourceChannel.reply('get-ls-document', function(name) {
  return app_documents.get(name);
});

ResourceChannel.reply('delete-ls-document', function(name, save) {
  var doc;
  if (save == null) {
    save = true;
  }
  doc = app_documents.remove(name);
  if (save) {
    app_documents.save();
  }
  return doc;
});

make_new_doc = function(name, title, content) {
  return new Document({
    name: name,
    title: title,
    content: content
  });
};

ResourceChannel.reply('new-ls-document', function(name, title, content) {
  return make_new_doc(name, title, content);
});

ResourceChannel.reply('add-ls-document', function(name, title, content) {
  var doc;
  doc = make_new_doc(name, title, content);
  app_documents.add(doc);
  app_documents.save();
  return doc;
});

module.exports = {
  DocumentCollection: DocumentCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNkb2N1bWVudHMuanMiLCJzb3VyY2VzIjpbImxzZG9jdW1lbnRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDZJQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFFVCw2QkFBK0IsT0FBQSxDQUFRLGNBQVI7O0FBRWpDLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBQ2pCLGVBQUEsR0FBa0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFdBQXZCOztBQUVaOzs7Ozs7O3FCQUNKLFdBQUEsR0FBYTs7cUJBQ2IsUUFBQSxHQUVFO0lBQUEsSUFBQSxFQUFNLEVBQU47SUFFQSxPQUFBLEVBQVMsVUFGVDtJQUdBLEtBQUEsRUFBTyxFQUhQO0lBSUEsT0FBQSxFQUFTLEVBSlQ7SUFLQSxXQUFBLEVBQWEsRUFMYjs7Ozs7R0FKbUIsUUFBUSxDQUFDOztBQVkxQjs7Ozs7OzsrQkFDSixpQkFBQSxHQUFtQjs7K0JBQ25CLEtBQUEsR0FBTzs7OztHQUZ3Qjs7QUFJakMsYUFBQSxHQUFnQixJQUFJOztBQUNwQixlQUFlLENBQUMsS0FBaEIsQ0FBc0IsY0FBdEIsRUFBc0MsU0FBQTtTQUNwQztBQURvQyxDQUF0Qzs7QUFHQSxlQUFlLENBQUMsS0FBaEIsQ0FBc0IsaUJBQXRCLEVBQXlDLFNBQUMsSUFBRDtTQUN2QyxhQUFhLENBQUMsR0FBZCxDQUFrQixJQUFsQjtBQUR1QyxDQUF6Qzs7QUFHQSxlQUFlLENBQUMsS0FBaEIsQ0FBc0Isb0JBQXRCLEVBQTRDLFNBQUMsSUFBRCxFQUFPLElBQVA7QUFDMUMsTUFBQTs7SUFEaUQsT0FBTzs7RUFDeEQsR0FBQSxHQUFNLGFBQWEsQ0FBQyxNQUFkLENBQXFCLElBQXJCO0VBQ04sSUFBRyxJQUFIO0lBQ0UsYUFBYSxDQUFDLElBQWQsQ0FBQSxFQURGOztTQUVBO0FBSjBDLENBQTVDOztBQU1BLFlBQUEsR0FBZSxTQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsT0FBZDtTQUNiLElBQUksUUFBSixDQUNFO0lBQUEsSUFBQSxFQUFNLElBQU47SUFDQSxLQUFBLEVBQU8sS0FEUDtJQUVBLE9BQUEsRUFBUyxPQUZUO0dBREY7QUFEYTs7QUFNZixlQUFlLENBQUMsS0FBaEIsQ0FBc0IsaUJBQXRCLEVBQXlDLFNBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxPQUFkO1NBQ3ZDLFlBQUEsQ0FBYSxJQUFiLEVBQW1CLEtBQW5CLEVBQTBCLE9BQTFCO0FBRHVDLENBQXpDOztBQUlBLGVBQWUsQ0FBQyxLQUFoQixDQUFzQixpQkFBdEIsRUFBeUMsU0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLE9BQWQ7QUFDdkMsTUFBQTtFQUFBLEdBQUEsR0FBTSxZQUFBLENBQWEsSUFBYixFQUFtQixLQUFuQixFQUEwQixPQUExQjtFQUNOLGFBQWEsQ0FBQyxHQUFkLENBQWtCLEdBQWxCO0VBQ0EsYUFBYSxDQUFDLElBQWQsQ0FBQTtTQUNBO0FBSnVDLENBQXpDOztBQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxrQkFBQSxFQUFvQixrQkFBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuXG57IEJhc2VMb2NhbFN0b3JhZ2VDb2xsZWN0aW9uIH0gPSByZXF1aXJlICdsc2NvbGxlY3Rpb24nXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblJlc291cmNlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ3Jlc291cmNlcydcblxuY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBpZEF0dHJpYnV0ZTogJ25hbWUnXG4gIGRlZmF1bHRzOlxuICAgICMgbmFtZSBpcyBwa2V5XG4gICAgbmFtZTogJydcbiAgICAjIGRvY3R5cGUgaXMgZWl0aGVyIG1hcmtkb3duIG9yIGh0bWxcbiAgICBkb2N0eXBlOiAnbWFya2Rvd24nXG4gICAgdGl0bGU6ICcnXG4gICAgY29udGVudDogJydcbiAgICBkZXNjcmlwdGlvbjogJydcbiAgXG5cbmNsYXNzIERvY3VtZW50Q29sbGVjdGlvbiBleHRlbmRzIEJhc2VMb2NhbFN0b3JhZ2VDb2xsZWN0aW9uXG4gIGxvY2FsX3N0b3JhZ2Vfa2V5OiAnbHNfZG9jdW1lbnRzJ1xuICBtb2RlbDogRG9jdW1lbnRcbiAgICAgIFxuYXBwX2RvY3VtZW50cyA9IG5ldyBEb2N1bWVudENvbGxlY3Rpb25cblJlc291cmNlQ2hhbm5lbC5yZXBseSAnbHMtZG9jdW1lbnRzJywgLT5cbiAgYXBwX2RvY3VtZW50c1xuXG5SZXNvdXJjZUNoYW5uZWwucmVwbHkgJ2dldC1scy1kb2N1bWVudCcsIChuYW1lKSAtPlxuICBhcHBfZG9jdW1lbnRzLmdldCBuYW1lXG5cblJlc291cmNlQ2hhbm5lbC5yZXBseSAnZGVsZXRlLWxzLWRvY3VtZW50JywgKG5hbWUsIHNhdmUgPSB0cnVlKSAtPlxuICBkb2MgPSBhcHBfZG9jdW1lbnRzLnJlbW92ZSBuYW1lXG4gIGlmIHNhdmVcbiAgICBhcHBfZG9jdW1lbnRzLnNhdmUoKVxuICBkb2NcblxubWFrZV9uZXdfZG9jID0gKG5hbWUsIHRpdGxlLCBjb250ZW50KSAtPlxuICBuZXcgRG9jdW1lbnRcbiAgICBuYW1lOiBuYW1lXG4gICAgdGl0bGU6IHRpdGxlXG4gICAgY29udGVudDogY29udGVudFxuXG5SZXNvdXJjZUNoYW5uZWwucmVwbHkgJ25ldy1scy1kb2N1bWVudCcsIChuYW1lLCB0aXRsZSwgY29udGVudCkgLT5cbiAgbWFrZV9uZXdfZG9jIG5hbWUsIHRpdGxlLCBjb250ZW50XG4gIFxuXG5SZXNvdXJjZUNoYW5uZWwucmVwbHkgJ2FkZC1scy1kb2N1bWVudCcsIChuYW1lLCB0aXRsZSwgY29udGVudCkgLT5cbiAgZG9jID0gbWFrZV9uZXdfZG9jIG5hbWUsIHRpdGxlLCBjb250ZW50XG4gIGFwcF9kb2N1bWVudHMuYWRkIGRvY1xuICBhcHBfZG9jdW1lbnRzLnNhdmUoKVxuICBkb2NcbiAgXG4gIFxubW9kdWxlLmV4cG9ydHMgPVxuICBEb2N1bWVudENvbGxlY3Rpb246IERvY3VtZW50Q29sbGVjdGlvblxuXG4iXX0=
