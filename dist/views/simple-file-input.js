var SimpleFileInput;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

SimpleFileInput = (function() {
  class SimpleFileInput extends Marionette.View {
    templateContext() {
      return {
        parseMsg: this.getOption('parseMsg') || 'Parse file',
        headerMsg: this.getOption('headerMsg') || 'Drop file',
        inputId: this.getOption('inputId') || 'customFile'
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
        tc.div('.file-input-wrapper', function() {
          tc.input(`#${model.inputId}`, {
            type: 'file'
          });
          return tc.label({
            'for': model.inputId
          }, "Choose File");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLWZpbGUtaW5wdXQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3NpbXBsZS1maWxlLWlucHV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxnQkFBQSxRQUE4QixVQUFVLENBQUMsS0FBekM7SUFlRSxlQUFpQixDQUFBLENBQUE7YUFDZjtRQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsU0FBRCxDQUFXLFVBQVgsQ0FBQSxJQUEwQixZQUFwQztRQUNBLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVgsQ0FBQSxJQUEyQixXQUR0QztRQUVBLE9BQUEsRUFBUyxJQUFDLENBQUEsU0FBRCxDQUFXLFNBQVgsQ0FBQSxJQUF5QjtNQUZsQztJQURlLENBZGpCOzs7O0lBbUNBLGdCQUFrQixDQUFDLEtBQUQsQ0FBQTtNQUNoQixPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLEtBQWxDO01BQ0EsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBZCxDQUFrQixJQUFsQjthQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQWQsQ0FBQTtJQUhnQjs7SUFLbEIsZ0JBQWtCLENBQUMsS0FBRCxDQUFBO01BQ2hCLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsS0FBbEM7YUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQUE7SUFGZ0I7O0lBSWxCLFVBQVksQ0FBQyxLQUFELENBQUE7QUFDVixVQUFBLEVBQUEsRUFBQTtNQUFBLEtBQUssQ0FBQyxjQUFOLENBQUE7TUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFiLENBQWlCLFFBQWpCLEVBQTJCLEtBQTNCO01BQ0EsRUFBQSxHQUFLLEtBQUssQ0FBQyxhQUFhLENBQUM7TUFDekIsSUFBQSxHQUFPLEVBQUUsQ0FBQyxLQUFNLENBQUEsQ0FBQTtNQUNoQixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLENBQUEsTUFBQSxDQUFBLENBQVMsSUFBSSxDQUFDLElBQWQsQ0FBQSxDQUFuQjtNQUNBLElBQUMsQ0FBQSxXQUFELEdBQWU7YUFDZixJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFiLENBQUE7SUFQVTs7SUFTWixjQUFnQixDQUFDLEtBQUQsQ0FBQTtNQUNkLEtBQUssQ0FBQyxjQUFOLENBQUE7YUFDQSxLQUFLLENBQUMsZUFBTixDQUFBO0lBRmM7O0lBSWhCLGVBQWlCLENBQUMsS0FBRCxDQUFBO01BQ2YsS0FBSyxDQUFDLGVBQU4sQ0FBQTtNQUNBLEtBQUssQ0FBQyxjQUFOLENBQUE7YUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFiLENBQWlCLFFBQWpCLEVBQTJCLFlBQTNCO0lBSGU7O0lBS2pCLGdCQUFrQixDQUFDLEtBQUQsQ0FBQTtNQUNoQixNQUFNO1FBQUMsR0FBQSxFQUFJO01BQUw7SUFEVTs7SUFJbEIsUUFBVSxDQUFDLElBQUQsQ0FBQTtBQUNSLFVBQUE7TUFBQSxNQUFBLEdBQVMsSUFBSSxVQUFKLENBQUE7TUFDVCxNQUFNLENBQUMsTUFBUCxHQUFnQixJQUFDLENBQUE7TUFDakIsTUFBTSxDQUFDLFVBQVAsR0FBb0I7TUFDcEIsSUFBRyxJQUFDLENBQUEsUUFBRCxLQUFhLFFBQWhCO2VBQ0UsTUFBTSxDQUFDLGtCQUFQLENBQTBCLElBQTFCLEVBREY7T0FBQSxNQUFBO2VBR0UsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEIsRUFIRjs7SUFKUTs7SUFVVixnQkFBa0IsQ0FBQSxDQUFBO0FBQ2hCLFVBQUEsSUFBQSxFQUFBO01BQUEsUUFBQSxHQUFXLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQWQsQ0FBQTtNQUNYLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQWQsQ0FBbUIsQ0FBQSx1QkFBQSxDQUFBLENBQTBCLFFBQTFCLENBQW1DLENBQW5DLENBQW5CO01BQ0EsSUFBQSxHQUFPLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBVSxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQU0sQ0FBQSxDQUFBO01BQzlCLElBQUMsQ0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQWIsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtJQUxnQjs7SUFPbEIsaUJBQW1CLENBQUEsQ0FBQTtNQUNqQixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLENBQUEseUJBQUEsQ0FBQSxDQUE0QixJQUFDLENBQUEsV0FBVyxDQUFDLElBQXpDLENBQThDLENBQTlDLENBQW5CO01BQ0EsSUFBQyxDQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBYixDQUFBO2FBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBWDtJQUhpQjs7RUFwRnJCOzs0QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ3RCLFFBQUE7SUFBQSxTQUFBLEdBQVk7TUFBQSxLQUFBLEVBQU07SUFBTjtXQUNaLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxjQUFQLEVBQXVCLFFBQUEsQ0FBQSxDQUFBO2VBQ3JCLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLFNBQWQ7TUFEcUIsQ0FBdkI7TUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLFlBQVAsRUFBcUIsUUFBQSxDQUFBLENBQUE7ZUFDbkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyw0QkFBUCxFQUFxQyxTQUFyQyxFQUFnRCxRQUFBLENBQUEsQ0FBQTtpQkFDOUMsRUFBRSxDQUFDLElBQUgsQ0FBUSxxQkFBUjtRQUQ4QyxDQUFoRDtNQURtQixDQUFyQjthQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sY0FBUCxFQUF1QixRQUFBLENBQUEsQ0FBQTtRQUNyQixFQUFFLENBQUMsR0FBSCxDQUFPLHFCQUFQLEVBQThCLFFBQUEsQ0FBQSxDQUFBO1VBQzVCLEVBQUUsQ0FBQyxLQUFILENBQVMsQ0FBQSxDQUFBLENBQUEsQ0FBSSxLQUFLLENBQUMsT0FBVixDQUFBLENBQVQsRUFBOEI7WUFBQSxJQUFBLEVBQUs7VUFBTCxDQUE5QjtpQkFDQSxFQUFFLENBQUMsS0FBSCxDQUFTO1lBQUEsS0FBQSxFQUFNLEtBQUssQ0FBQztVQUFaLENBQVQsRUFBOEIsYUFBOUI7UUFGNEIsQ0FBOUI7ZUFHQSxFQUFFLENBQUMsSUFBSCxDQUFRLG1DQUFSLEVBQTZDLFNBQTdDLEVBQXdELFFBQUEsQ0FBQSxDQUFBO2lCQUN0RCxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxRQUFkO1FBRHNELENBQXhEO01BSnFCLENBQXZCO0lBTnVCLENBQXpCO0VBRnNCLENBQWQ7OzRCQWtCVixRQUFBLEdBQVU7OzRCQUNWLEVBQUEsR0FDRTtJQUFBLFNBQUEsRUFBVyxhQUFYO0lBQ0EsUUFBQSxFQUFVLFlBRFY7SUFFQSxTQUFBLEVBQVcsbUJBRlg7SUFHQSxRQUFBLEVBQVUsV0FIVjtJQUlBLFNBQUEsRUFBVztFQUpYOzs0QkFLRixNQUFBLEdBQ0U7SUFBQSx1QkFBQSxFQUF5QixnQkFBekI7SUFDQSx3QkFBQSxFQUEwQixpQkFEMUI7SUFFQSxtQkFBQSxFQUFxQixZQUZyQjtJQUdBLHFCQUFBLEVBQXVCLGtCQUh2QjtJQUlBLHNCQUFBLEVBQXdCLGtCQUp4QjtJQUtBLG9CQUFBLEVBQXNCLG1CQUx0QjtJQU1BLHFCQUFBLEVBQXVCO0VBTnZCOzs7Ozs7QUE4REosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmNsYXNzIFNpbXBsZUZpbGVJbnB1dCBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgbm9EaXNwbGF5ID0gc3R5bGU6J2Rpc3BsYXk6bm9uZSdcbiAgICB0Yy5kaXYgJy5kcm9wem9uZS5jYXJkJywgLT5cbiAgICAgIHRjLmRpdiAnLmNhcmQtaGVhZGVyJywgLT5cbiAgICAgICAgdGMudGV4dCBtb2RlbC5oZWFkZXJNc2dcbiAgICAgIHRjLmRpdiAnLmNhcmQtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnLnBhcnNlLWJ0bi5idG4uYnRuLXByaW1hcnknLCBub0Rpc3BsYXksIC0+XG4gICAgICAgICAgdGMudGV4dCAndXBsb2FkIGRyb3BwZWQgZmlsZSdcbiAgICAgIHRjLmRpdiAnLmNhcmQtZm9vdGVyJywgLT5cbiAgICAgICAgdGMuZGl2ICcuZmlsZS1pbnB1dC13cmFwcGVyJywgLT5cbiAgICAgICAgICB0Yy5pbnB1dCBcIiMje21vZGVsLmlucHV0SWR9XCIsIHR5cGU6J2ZpbGUnXG4gICAgICAgICAgdGMubGFiZWwgJ2Zvcic6bW9kZWwuaW5wdXRJZCwgXCJDaG9vc2UgRmlsZVwiXG4gICAgICAgIHRjLnNwYW4gJy5wYXJzZS1jaG9zZW4tYnRuLmJ0bi5idG4tcHJpbWFyeScsIG5vRGlzcGxheSwgLT5cbiAgICAgICAgICB0Yy50ZXh0IG1vZGVsLnBhcnNlTXNnXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBwYXJzZU1zZzogQGdldE9wdGlvbigncGFyc2VNc2cnKSBvciAnUGFyc2UgZmlsZSdcbiAgICBoZWFkZXJNc2c6IEBnZXRPcHRpb24oJ2hlYWRlck1zZycpIG9yICdEcm9wIGZpbGUnXG4gICAgaW5wdXRJZDogQGdldE9wdGlvbignaW5wdXRJZCcpIG9yICdjdXN0b21GaWxlJ1xuICBmaWxlVHlwZTogJ2JpbmFyeSdcbiAgdWk6XG4gICAgZmlsZUlucHV0OiAnLmZpbGUtaW5wdXQnXG4gICAgcGFyc2VCdG46ICcucGFyc2UtYnRuJ1xuICAgIGNob3NlbkJ0bjogJy5wYXJzZS1jaG9zZW4tYnRuJ1xuICAgIGRyb3B6b25lOiAnLmRyb3B6b25lJ1xuICAgIHN0YXR1c01zZzogJy5jYXJkLWhlYWRlcidcbiAgZXZlbnRzOlxuICAgICdkcmFnb3ZlciBAdWkuZHJvcHpvbmUnOiAnaGFuZGxlRHJhZ092ZXInXG4gICAgJ2RyYWdlbnRlciBAdWkuZHJvcHpvbmUnOiAnaGFuZGxlRHJhZ0VudGVyJ1xuICAgICdkcm9wIEB1aS5kcm9wem9uZSc6ICdoYW5kbGVEcm9wJ1xuICAgICdjbGljayBAdWkuZmlsZUlucHV0JzogJ2ZpbGVJbnB1dENsaWNrZWQnXG4gICAgJ2NoYW5nZSBAdWkuZmlsZUlucHV0JzogJ2ZpbGVJbnB1dENoYW5nZWQnXG4gICAgJ2NsaWNrIEB1aS5wYXJzZUJ0bic6ICdoYW5kbGVEcm9wcGVkRmlsZSdcbiAgICAnY2xpY2sgQHVpLmNob3NlbkJ0bic6ICdoYW5kbGVDaG9zZW5GaWxlJ1xuICAgIFxuICAjIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMjEwMjk5MlxuICBmaWxlSW5wdXRDbGlja2VkOiAoZXZlbnQpIC0+XG4gICAgY29uc29sZS5sb2cgXCJmaWxlX2lucHV0X2NsaWNrZWRcIiwgZXZlbnRcbiAgICBAdWkuZmlsZUlucHV0LnZhbCBudWxsXG4gICAgQHVpLmNob3NlbkJ0bi5oaWRlKClcblxuICBmaWxlSW5wdXRDaGFuZ2VkOiAoZXZlbnQpIC0+XG4gICAgY29uc29sZS5sb2cgXCJmaWxlX2lucHV0X2NoYW5nZWRcIiwgZXZlbnRcbiAgICBAdWkuY2hvc2VuQnRuLnNob3coKVxuICAgIFxuICBoYW5kbGVEcm9wOiAoZXZlbnQpIC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIEB1aS5kcm9wem9uZS5jc3MgJ2JvcmRlcicsICcwcHgnXG4gICAgZHQgPSBldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlclxuICAgIGZpbGUgPSBkdC5maWxlc1swXVxuICAgIEB1aS5zdGF0dXNNc2cudGV4dCBcIkZpbGU6ICN7ZmlsZS5uYW1lfVwiXG4gICAgQGRyb3BwZWRGaWxlID0gZmlsZVxuICAgIEB1aS5wYXJzZUJ0bi5zaG93KClcbiAgICBcbiAgaGFuZGxlRHJhZ092ZXI6IChldmVudCkgLT5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBcbiAgaGFuZGxlRHJhZ0VudGVyOiAoZXZlbnQpIC0+XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgQHVpLmRyb3B6b25lLmNzcyAnYm9yZGVyJywgJzJweCBkb3R0ZWQnXG5cbiAgZmlsZVJlYWRlck9uTG9hZDogKGV2ZW50KSAtPlxuICAgIHRocm93IHttc2c6XCJOb3RpbXBsZW1lbnRlZGVycm9yXCJ9XG4gICAgXG4gICAgICBcbiAgcmVhZEZpbGU6IChmaWxlKSAtPlxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIub25sb2FkID0gQGZpbGVSZWFkZXJPbkxvYWRcbiAgICByZWFkZXIuZmlsZU9iamVjdCA9IGZpbGVcbiAgICBpZiBAZmlsZVR5cGUgPT0gJ2JpbmFyeSdcbiAgICAgIHJlYWRlci5yZWFkQXNCaW5hcnlTdHJpbmcgZmlsZVxuICAgIGVsc2VcbiAgICAgIHJlYWRlci5yZWFkQXNUZXh0IGZpbGVcbiAgICAgIFxuICAgIFxuICBoYW5kbGVDaG9zZW5GaWxlOiAtPlxuICAgIGZpbGVuYW1lID0gQHVpLmZpbGVJbnB1dC52YWwoKVxuICAgIEB1aS5zdGF0dXNNc2cudGV4dCBcIlJlYWRpbmcgY2hvc2VuIGZpbGUuLi4oI3tmaWxlbmFtZX0pXCJcbiAgICBmaWxlID0gQHVpLmZpbGVJbnB1dFswXS5maWxlc1swXVxuICAgIEB1aS5wYXJzZUJ0bi5oaWRlKClcbiAgICBAcmVhZEZpbGUgZmlsZVxuICAgIFxuICBoYW5kbGVEcm9wcGVkRmlsZTogLT5cbiAgICBAdWkuc3RhdHVzTXNnLnRleHQgXCJSZWFkaW5nIGRyb3BwZWQgZmlsZS4uLiAoI3tAZHJvcHBlZEZpbGUubmFtZX0pXCJcbiAgICBAdWkucGFyc2VCdG4uaGlkZSgpXG4gICAgQHJlYWRGaWxlIEBkcm9wcGVkRmlsZVxuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVGaWxlSW5wdXRcblxuIl19
