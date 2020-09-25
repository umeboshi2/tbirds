import tc from 'teacup'

# exampleOpts =
#   dropHeader: 'drop a file'
#   uploadLabel: 'upload dropped file'
#   parseMsg: 'parse dropped file'


dropzone_template = tc.renderable (options) ->
  tc.div '.dropzone.card', ->
    tc.div '.card-header', ->
      tc.text options.dropHeader
    tc.div '.card-body', ->
      tc.div '.parse-btn.btn.btn-primary', style:'display:none', ->
        tc.text options.uploadLabel
      tc.input '.file-input.input', type:'file'
      tc.span '.parse-chosen-btn.btn.btn-primary',
      style:'display:none', ->
        tc.text options.parseMsg
        
export default dropzone_template
