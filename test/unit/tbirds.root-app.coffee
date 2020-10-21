import { expect } from 'chai'
import assert from 'assert'
import RootApp from '../../src/root-app'
describe 'root app', ->
  describe 'just saying new RootApp', ->
    beforeEach ->
      foo = 'Bar'
      @bar = "FOOOOO"
    it "should just say FOOOOO", ->
      assert.equal @bar, 'FOOOOO'
    return
