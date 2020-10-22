import { expect } from 'chai'
import assert from 'assert'
import Layout from '../../src/tklayout'

describe 'TK Layout', ->
  'use strict'
  afterEach ->
    window.location.hash = ''
    return
  describe "layout has proper regions", ->
    regions = [ 'messages', 'navbar', 'modal', 'applet']
    describe "check regions", ->
      view = new Layout
      regions.forEach (name) ->
        it "should have #{name} region", ->
          region = view.getRegion name
          assert.equal name, region._name
        
