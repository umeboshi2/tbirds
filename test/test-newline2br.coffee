import assert from 'assert'
import newlineToBr from 'tbirds/util/newline-to-br'

describe 'newlineToBr', ->
  describe 'newlineToBr("\\n")', ->
    it 'should return "<br />"', ->
      assert.equal newlineToBr('\n'), '<br />'
      

  describe 'newlineToBr("\\r\\n")', ->
    it 'should return "<br />"', ->
      assert.equal newlineToBr('\r\n'), '<br />'
      
