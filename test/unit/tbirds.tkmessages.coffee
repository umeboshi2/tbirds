import { expect } from 'chai'
import '../../src/routers/filtered-router'
import MessagesApp from '../../src/tkmessages'
describe 'app router', ->
  'use strict'
  afterEach ->
    window.location.hash = ''
    return
  describe 'when top app is init with generic config', -> # noqa
    it 'should be ok', ->
      return
    return
