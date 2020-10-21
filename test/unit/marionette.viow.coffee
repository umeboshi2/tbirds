import { expect } from 'chai'
import { View } from 'backbone.marionette'
import AppRouter from '../../src/routers/approuter.coffee'
import assert from 'assert'
describe 'simple view', ->
  'use strict'
  afterEach ->
    window.location.hash = ''
    return
  describe 'when a view is created', -> # noqa
    beforeEach ->
      suite = this
      @View = View
    it 'should be a marionette view', ->
      view = new @View
      isView = view instanceof View
      assert.equal isView, true
      return
    it 'should take and get options', ->
      view = new View
        fooBar: 'baz'
      isView = view instanceof View
      isBaz = view.getOption('fooBar')
      assert.equal isBaz, 'baz'
  describe "when a view is created with options", ->
    beforeEach ->
      suite = this
      @View = View
    it 'should just work', ->
      view = new View
        fooBar: 'baz'
      isView = view instanceof View
      isBaz = view.getOption('fooBar')
      assert.equal isBaz, 'baz'
  describe "layout has proper regions", ->
    beforeEach ->
      suite = this
      @view = new View
        template: ->
        regions:
          navbar: '#navbar-view-container'
    it 'should have navbar region', ->
      region = @view.getRegion 'navbar'
      assert.equal region.el, '#navbar-view-container'
      
