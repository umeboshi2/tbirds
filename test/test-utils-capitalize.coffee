import assert from 'assert'
import capitalize from 'tbirds/util/capitalize'

describe 'capitalize', ->
  describe 'capitalize(str)', ->
    it 'should return "Str"', ->
      assert.equal capitalize('str'), 'Str'

  describe 'capitalize("foobar")', ->
    it 'should return "Foobar"', ->
      assert.equal capitalize('foobar'), 'Foobar'

  describe 'capitalize("Foobar")', ->
    it 'should return "Foobar"', ->
      assert.equal capitalize('Foobar'), 'Foobar'
      
