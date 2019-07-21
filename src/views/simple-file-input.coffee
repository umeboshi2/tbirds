import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import tc from 'teacup'

class SimpleFileInput extends Marionette.View
  template: tc.renderable (model) ->
    noDisplay = style:'display:none'
    tc.div '.dropzone.card', ->
      tc.div '.card-header', ->
        tc.text model.headerMsg
      tc.div '.card-body', ->
        tc.div '.parse-btn.btn.btn-primary', noDisplay, ->
          tc.text 'upload dropped file'
      tc.div '.card-footer', ->
        tc.div '.file-input-wrapper', ->
          tc.input "##{model.inputId}", type:'file'
          tc.label 'for':model.inputId, "Choose File"
        tc.span '.parse-chosen-btn.btn.btn-primary', noDisplay, ->
          tc.text model.parseMsg
  templateContext: ->
    parseMsg: @getOption('parseMsg') or 'Parse file'
    headerMsg: @getOption('headerMsg') or 'Drop file'
    inputId: @getOption('inputId') or 'customFile'
  fileType: 'binary'
  ui:
    fileInput: '.file-input'
    parseBtn: '.parse-btn'
    chosenBtn: '.parse-chosen-btn'
    dropzone: '.dropzone'
    statusMsg: '.card-header'
  events:
    'dragover @ui.dropzone': 'handleDragOver'
    'dragenter @ui.dropzone': 'handleDragEnter'
    'drop @ui.dropzone': 'handleDrop'
    'click @ui.fileInput': 'fileInputClicked'
    'change @ui.fileInput': 'fileInputChanged'
    'click @ui.parseBtn': 'handleDroppedFile'
    'click @ui.chosenBtn': 'handleChosenFile'
    
  # https://stackoverflow.com/a/12102992
  fileInputClicked: (event) ->
    console.log "file_input_clicked", event
    @ui.fileInput.val null
    @ui.chosenBtn.hide()

  fileInputChanged: (event) ->
    console.log "file_input_changed", event
    @ui.chosenBtn.show()
    
  handleDrop: (event) ->
    event.preventDefault()
    @ui.dropzone.css 'border', '0px'
    dt = event.originalEvent.dataTransfer
    file = dt.files[0]
    @ui.statusMsg.text "File: #{file.name}"
    @droppedFile = file
    @ui.parseBtn.show()
    
  handleDragOver: (event) ->
    event.preventDefault()
    event.stopPropagation()
    
  handleDragEnter: (event) ->
    event.stopPropagation()
    event.preventDefault()
    @ui.dropzone.css 'border', '2px dotted'

  fileReaderOnLoad: (event) ->
    throw {msg:"Notimplementederror"}
    
      
  readFile: (file) ->
    reader = new FileReader()
    reader.onload = @fileReaderOnLoad
    reader.fileObject = file
    if @fileType == 'binary'
      reader.readAsBinaryString file
    else
      reader.readAsText file
      
    
  handleChosenFile: ->
    filename = @ui.fileInput.val()
    @ui.statusMsg.text "Reading chosen file...(#{filename})"
    file = @ui.fileInput[0].files[0]
    @ui.parseBtn.hide()
    @readFile file
    
  handleDroppedFile: ->
    @ui.statusMsg.text "Reading dropped file... (#{@droppedFile.name})"
    @ui.parseBtn.hide()
    @readFile @droppedFile

export default SimpleFileInput

