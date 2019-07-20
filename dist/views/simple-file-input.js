var SimpleFileInput;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

SimpleFileInput = (function() {
  class SimpleFileInput extends Marionette.View {
    templateContext() {
      return {
        parseMsg: this.getOption('parseMsg') || 'Parse file',
        headerMsg: this.getOption('headerMsg') || 'Drop file'
      };
    }

    
    // https://stackoverflow.com/a/12102992
    fileInputClicked(event) {
      console.log("file_input_clicked", event);
      this.ui.fileInput.val(null);
      return this.ui.chosenBtn.hide();
    }

    fileInputChanged(event) {
      console.log("file_input_changed", event);
      return this.ui.chosenBtn.show();
    }

    handleDrop(event) {
      var dt, file;
      event.preventDefault();
      this.ui.dropzone.css('border', '0px');
      dt = event.originalEvent.dataTransfer;
      file = dt.files[0];
      this.ui.statusMsg.text(`File: ${file.name}`);
      this.droppedFile = file;
      return this.ui.parseBtn.show();
    }

    handleDragOver(event) {
      event.preventDefault();
      return event.stopPropagation();
    }

    handleDragEnter(event) {
      event.stopPropagation();
      event.preventDefault();
      return this.ui.dropzone.css('border', '2px dotted');
    }

    fileReaderOnLoad(event) {
      throw {
        msg: "Notimplementederror"
      };
    }

    readFile(file) {
      var reader;
      reader = new FileReader();
      reader.onload = this.fileReaderOnLoad;
      reader.fileObject = file;
      if (this.fileType === 'binary') {
        return reader.readAsBinaryString(file);
      } else {
        return reader.readAsText(file);
      }
    }

    handleChosenFile() {
      var file, filename;
      filename = this.ui.fileInput.val();
      this.ui.statusMsg.text(`Reading chosen file...(${filename})`);
      file = this.ui.fileInput[0].files[0];
      this.ui.parseBtn.hide();
      return this.readFile(file);
    }

    handleDroppedFile() {
      this.ui.statusMsg.text(`Reading dropped file... (${this.droppedFile.name})`);
      this.ui.parseBtn.hide();
      return this.readFile(this.droppedFile);
    }

  };

  SimpleFileInput.prototype.template = tc.renderable(function(model) {
    var noDisplay;
    noDisplay = {
      style: 'display:none'
    };
    return tc.div('.dropzone.card', function() {
      tc.div('.card-header', function() {
        return tc.text(model.headerMsg);
      });
      tc.div('.card-body', function() {
        return tc.div('.parse-btn.btn.btn-primary', noDisplay, function() {
          return tc.text('upload dropped file');
        });
      });
      return tc.div('.card-footer', function() {
        tc.input('.file-input.input.btn.btn-success', {
          type: 'file'
        });
        return tc.span('.parse-chosen-btn.btn.btn-primary', noDisplay, function() {
          return tc.text(model.parseMsg);
        });
      });
    });
  });

  SimpleFileInput.prototype.fileType = 'binary';

  SimpleFileInput.prototype.ui = {
    fileInput: '.file-input',
    parseBtn: '.parse-btn',
    chosenBtn: '.parse-chosen-btn',
    dropzone: '.dropzone',
    statusMsg: '.card-header'
  };

  SimpleFileInput.prototype.events = {
    'dragover @ui.dropzone': 'handleDragOver',
    'dragenter @ui.dropzone': 'handleDragEnter',
    'drop @ui.dropzone': 'handleDrop',
    'click @ui.fileInput': 'fileInputClicked',
    'change @ui.fileInput': 'fileInputChanged',
    'click @ui.parseBtn': 'handleDroppedFile',
    'click @ui.chosenBtn': 'handleChosenFile'
  };

  return SimpleFileInput;

}).call(this);

export default SimpleFileInput;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLWZpbGUtaW5wdXQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3NpbXBsZS1maWxlLWlucHV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxnQkFBQSxRQUE4QixVQUFVLENBQUMsS0FBekM7SUFhRSxlQUFpQixDQUFBLENBQUE7YUFDZjtRQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsU0FBRCxDQUFXLFVBQVgsQ0FBQSxJQUEwQixZQUFwQztRQUNBLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVgsQ0FBQSxJQUEyQjtNQUR0QztJQURlLENBWmpCOzs7O0lBZ0NBLGdCQUFrQixDQUFDLEtBQUQsQ0FBQTtNQUNoQixPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLEtBQWxDO01BQ0EsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBZCxDQUFrQixJQUFsQjthQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQWQsQ0FBQTtJQUhnQjs7SUFLbEIsZ0JBQWtCLENBQUMsS0FBRCxDQUFBO01BQ2hCLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsS0FBbEM7YUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQUE7SUFGZ0I7O0lBSWxCLFVBQVksQ0FBQyxLQUFELENBQUE7QUFDVixVQUFBLEVBQUEsRUFBQTtNQUFBLEtBQUssQ0FBQyxjQUFOLENBQUE7TUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFiLENBQWlCLFFBQWpCLEVBQTJCLEtBQTNCO01BQ0EsRUFBQSxHQUFLLEtBQUssQ0FBQyxhQUFhLENBQUM7TUFDekIsSUFBQSxHQUFPLEVBQUUsQ0FBQyxLQUFNLENBQUEsQ0FBQTtNQUNoQixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLENBQUEsTUFBQSxDQUFBLENBQVMsSUFBSSxDQUFDLElBQWQsQ0FBQSxDQUFuQjtNQUNBLElBQUMsQ0FBQSxXQUFELEdBQWU7YUFDZixJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFiLENBQUE7SUFQVTs7SUFTWixjQUFnQixDQUFDLEtBQUQsQ0FBQTtNQUNkLEtBQUssQ0FBQyxjQUFOLENBQUE7YUFDQSxLQUFLLENBQUMsZUFBTixDQUFBO0lBRmM7O0lBSWhCLGVBQWlCLENBQUMsS0FBRCxDQUFBO01BQ2YsS0FBSyxDQUFDLGVBQU4sQ0FBQTtNQUNBLEtBQUssQ0FBQyxjQUFOLENBQUE7YUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFiLENBQWlCLFFBQWpCLEVBQTJCLFlBQTNCO0lBSGU7O0lBS2pCLGdCQUFrQixDQUFDLEtBQUQsQ0FBQTtNQUNoQixNQUFNO1FBQUMsR0FBQSxFQUFJO01BQUw7SUFEVTs7SUFJbEIsUUFBVSxDQUFDLElBQUQsQ0FBQTtBQUNSLFVBQUE7TUFBQSxNQUFBLEdBQVMsSUFBSSxVQUFKLENBQUE7TUFDVCxNQUFNLENBQUMsTUFBUCxHQUFnQixJQUFDLENBQUE7TUFDakIsTUFBTSxDQUFDLFVBQVAsR0FBb0I7TUFDcEIsSUFBRyxJQUFDLENBQUEsUUFBRCxLQUFhLFFBQWhCO2VBQ0UsTUFBTSxDQUFDLGtCQUFQLENBQTBCLElBQTFCLEVBREY7T0FBQSxNQUFBO2VBR0UsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEIsRUFIRjs7SUFKUTs7SUFVVixnQkFBa0IsQ0FBQSxDQUFBO0FBQ2hCLFVBQUEsSUFBQSxFQUFBO01BQUEsUUFBQSxHQUFXLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQWQsQ0FBQTtNQUNYLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQWQsQ0FBbUIsQ0FBQSx1QkFBQSxDQUFBLENBQTBCLFFBQTFCLENBQW1DLENBQW5DLENBQW5CO01BQ0EsSUFBQSxHQUFPLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBVSxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQU0sQ0FBQSxDQUFBO01BQzlCLElBQUMsQ0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQWIsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtJQUxnQjs7SUFPbEIsaUJBQW1CLENBQUEsQ0FBQTtNQUNqQixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLENBQUEseUJBQUEsQ0FBQSxDQUE0QixJQUFDLENBQUEsV0FBVyxDQUFDLElBQXpDLENBQThDLENBQTlDLENBQW5CO01BQ0EsSUFBQyxDQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBYixDQUFBO2FBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBWDtJQUhpQjs7RUFqRnJCOzs0QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ3RCLFFBQUE7SUFBQSxTQUFBLEdBQVk7TUFBQSxLQUFBLEVBQU07SUFBTjtXQUNaLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxjQUFQLEVBQXVCLFFBQUEsQ0FBQSxDQUFBO2VBQ3JCLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLFNBQWQ7TUFEcUIsQ0FBdkI7TUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLFlBQVAsRUFBcUIsUUFBQSxDQUFBLENBQUE7ZUFDbkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyw0QkFBUCxFQUFxQyxTQUFyQyxFQUFnRCxRQUFBLENBQUEsQ0FBQTtpQkFDOUMsRUFBRSxDQUFDLElBQUgsQ0FBUSxxQkFBUjtRQUQ4QyxDQUFoRDtNQURtQixDQUFyQjthQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sY0FBUCxFQUF1QixRQUFBLENBQUEsQ0FBQTtRQUNyQixFQUFFLENBQUMsS0FBSCxDQUFTLG1DQUFULEVBQThDO1VBQUEsSUFBQSxFQUFLO1FBQUwsQ0FBOUM7ZUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLG1DQUFSLEVBQTZDLFNBQTdDLEVBQXdELFFBQUEsQ0FBQSxDQUFBO2lCQUN0RCxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxRQUFkO1FBRHNELENBQXhEO01BRnFCLENBQXZCO0lBTnVCLENBQXpCO0VBRnNCLENBQWQ7OzRCQWVWLFFBQUEsR0FBVTs7NEJBQ1YsRUFBQSxHQUNFO0lBQUEsU0FBQSxFQUFXLGFBQVg7SUFDQSxRQUFBLEVBQVUsWUFEVjtJQUVBLFNBQUEsRUFBVyxtQkFGWDtJQUdBLFFBQUEsRUFBVSxXQUhWO0lBSUEsU0FBQSxFQUFXO0VBSlg7OzRCQUtGLE1BQUEsR0FDRTtJQUFBLHVCQUFBLEVBQXlCLGdCQUF6QjtJQUNBLHdCQUFBLEVBQTBCLGlCQUQxQjtJQUVBLG1CQUFBLEVBQXFCLFlBRnJCO0lBR0EscUJBQUEsRUFBdUIsa0JBSHZCO0lBSUEsc0JBQUEsRUFBd0Isa0JBSnhCO0lBS0Esb0JBQUEsRUFBc0IsbUJBTHRCO0lBTUEscUJBQUEsRUFBdUI7RUFOdkI7Ozs7OztBQThESixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuY2xhc3MgU2ltcGxlRmlsZUlucHV0IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBub0Rpc3BsYXkgPSBzdHlsZTonZGlzcGxheTpub25lJ1xuICAgIHRjLmRpdiAnLmRyb3B6b25lLmNhcmQnLCAtPlxuICAgICAgdGMuZGl2ICcuY2FyZC1oZWFkZXInLCAtPlxuICAgICAgICB0Yy50ZXh0IG1vZGVsLmhlYWRlck1zZ1xuICAgICAgdGMuZGl2ICcuY2FyZC1ib2R5JywgLT5cbiAgICAgICAgdGMuZGl2ICcucGFyc2UtYnRuLmJ0bi5idG4tcHJpbWFyeScsIG5vRGlzcGxheSwgLT5cbiAgICAgICAgICB0Yy50ZXh0ICd1cGxvYWQgZHJvcHBlZCBmaWxlJ1xuICAgICAgdGMuZGl2ICcuY2FyZC1mb290ZXInLCAtPlxuICAgICAgICB0Yy5pbnB1dCAnLmZpbGUtaW5wdXQuaW5wdXQuYnRuLmJ0bi1zdWNjZXNzJywgdHlwZTonZmlsZSdcbiAgICAgICAgdGMuc3BhbiAnLnBhcnNlLWNob3Nlbi1idG4uYnRuLmJ0bi1wcmltYXJ5Jywgbm9EaXNwbGF5LCAtPlxuICAgICAgICAgIHRjLnRleHQgbW9kZWwucGFyc2VNc2dcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIHBhcnNlTXNnOiBAZ2V0T3B0aW9uKCdwYXJzZU1zZycpIG9yICdQYXJzZSBmaWxlJ1xuICAgIGhlYWRlck1zZzogQGdldE9wdGlvbignaGVhZGVyTXNnJykgb3IgJ0Ryb3AgZmlsZSdcbiAgZmlsZVR5cGU6ICdiaW5hcnknXG4gIHVpOlxuICAgIGZpbGVJbnB1dDogJy5maWxlLWlucHV0J1xuICAgIHBhcnNlQnRuOiAnLnBhcnNlLWJ0bidcbiAgICBjaG9zZW5CdG46ICcucGFyc2UtY2hvc2VuLWJ0bidcbiAgICBkcm9wem9uZTogJy5kcm9wem9uZSdcbiAgICBzdGF0dXNNc2c6ICcuY2FyZC1oZWFkZXInXG4gIGV2ZW50czpcbiAgICAnZHJhZ292ZXIgQHVpLmRyb3B6b25lJzogJ2hhbmRsZURyYWdPdmVyJ1xuICAgICdkcmFnZW50ZXIgQHVpLmRyb3B6b25lJzogJ2hhbmRsZURyYWdFbnRlcidcbiAgICAnZHJvcCBAdWkuZHJvcHpvbmUnOiAnaGFuZGxlRHJvcCdcbiAgICAnY2xpY2sgQHVpLmZpbGVJbnB1dCc6ICdmaWxlSW5wdXRDbGlja2VkJ1xuICAgICdjaGFuZ2UgQHVpLmZpbGVJbnB1dCc6ICdmaWxlSW5wdXRDaGFuZ2VkJ1xuICAgICdjbGljayBAdWkucGFyc2VCdG4nOiAnaGFuZGxlRHJvcHBlZEZpbGUnXG4gICAgJ2NsaWNrIEB1aS5jaG9zZW5CdG4nOiAnaGFuZGxlQ2hvc2VuRmlsZSdcbiAgICBcbiAgIyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTIxMDI5OTJcbiAgZmlsZUlucHV0Q2xpY2tlZDogKGV2ZW50KSAtPlxuICAgIGNvbnNvbGUubG9nIFwiZmlsZV9pbnB1dF9jbGlja2VkXCIsIGV2ZW50XG4gICAgQHVpLmZpbGVJbnB1dC52YWwgbnVsbFxuICAgIEB1aS5jaG9zZW5CdG4uaGlkZSgpXG5cbiAgZmlsZUlucHV0Q2hhbmdlZDogKGV2ZW50KSAtPlxuICAgIGNvbnNvbGUubG9nIFwiZmlsZV9pbnB1dF9jaGFuZ2VkXCIsIGV2ZW50XG4gICAgQHVpLmNob3NlbkJ0bi5zaG93KClcbiAgICBcbiAgaGFuZGxlRHJvcDogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBAdWkuZHJvcHpvbmUuY3NzICdib3JkZXInLCAnMHB4J1xuICAgIGR0ID0gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXJcbiAgICBmaWxlID0gZHQuZmlsZXNbMF1cbiAgICBAdWkuc3RhdHVzTXNnLnRleHQgXCJGaWxlOiAje2ZpbGUubmFtZX1cIlxuICAgIEBkcm9wcGVkRmlsZSA9IGZpbGVcbiAgICBAdWkucGFyc2VCdG4uc2hvdygpXG4gICAgXG4gIGhhbmRsZURyYWdPdmVyOiAoZXZlbnQpIC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgXG4gIGhhbmRsZURyYWdFbnRlcjogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIEB1aS5kcm9wem9uZS5jc3MgJ2JvcmRlcicsICcycHggZG90dGVkJ1xuXG4gIGZpbGVSZWFkZXJPbkxvYWQ6IChldmVudCkgLT5cbiAgICB0aHJvdyB7bXNnOlwiTm90aW1wbGVtZW50ZWRlcnJvclwifVxuICAgIFxuICAgICAgXG4gIHJlYWRGaWxlOiAoZmlsZSkgLT5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLm9ubG9hZCA9IEBmaWxlUmVhZGVyT25Mb2FkXG4gICAgcmVhZGVyLmZpbGVPYmplY3QgPSBmaWxlXG4gICAgaWYgQGZpbGVUeXBlID09ICdiaW5hcnknXG4gICAgICByZWFkZXIucmVhZEFzQmluYXJ5U3RyaW5nIGZpbGVcbiAgICBlbHNlXG4gICAgICByZWFkZXIucmVhZEFzVGV4dCBmaWxlXG4gICAgICBcbiAgICBcbiAgaGFuZGxlQ2hvc2VuRmlsZTogLT5cbiAgICBmaWxlbmFtZSA9IEB1aS5maWxlSW5wdXQudmFsKClcbiAgICBAdWkuc3RhdHVzTXNnLnRleHQgXCJSZWFkaW5nIGNob3NlbiBmaWxlLi4uKCN7ZmlsZW5hbWV9KVwiXG4gICAgZmlsZSA9IEB1aS5maWxlSW5wdXRbMF0uZmlsZXNbMF1cbiAgICBAdWkucGFyc2VCdG4uaGlkZSgpXG4gICAgQHJlYWRGaWxlIGZpbGVcbiAgICBcbiAgaGFuZGxlRHJvcHBlZEZpbGU6IC0+XG4gICAgQHVpLnN0YXR1c01zZy50ZXh0IFwiUmVhZGluZyBkcm9wcGVkIGZpbGUuLi4gKCN7QGRyb3BwZWRGaWxlLm5hbWV9KVwiXG4gICAgQHVpLnBhcnNlQnRuLmhpZGUoKVxuICAgIEByZWFkRmlsZSBAZHJvcHBlZEZpbGVcblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlRmlsZUlucHV0XG5cbiJdfQ==
