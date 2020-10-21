import { expect } from 'chai'
import assert from 'assert'
import Layout from '../../src/tklayout'

describe 'app router', ->
  'use strict'
  afterEach ->
    window.location.hash = ''
    return
  describe 'when a view is created', -> # noqa
    beforeEach ->
      suite = this
      @View = Layout
    it "whould be coo;", ->
      return
  describe "layout has proper regions", ->
    regions = [ 'messages', 'navbar', 'modal', 'applet']
    describe "check regions", ->
      view = new Layout
      regions.forEach (name) ->
        it "should have #{name} region", ->
          region = view.getRegion name
          assert.equal name, region._name
        
