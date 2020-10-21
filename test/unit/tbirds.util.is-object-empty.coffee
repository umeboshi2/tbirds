import assert from 'assert'
import isObjectEmpty from 'tbirds/util/is-object-empty'

describe "isObjectEmpty", ->
  describe "isObjectEmpty({foo:'bar'})", ->
    it "should return false", ->
      assert.equal isObjectEmpty({foo:'bar'}), false

  describe "isObjectEmpty({})", ->
    it "should return true", ->
      assert.equal isObjectEmpty({}), true

  
  describe "isObjectEmpty(new Object)", ->
    it "should return true", ->
      assert.equal isObjectEmpty(new Object), true
