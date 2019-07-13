import tc from 'teacup'

optValTable = tc.renderable (model) ->
  tc.table '.table', ->
    tc.thead '.table-info', ->
      tc.tr ->
        tc.th scope:'col', "Option"
        tc.th scope:'col', "Value"
    for prop of model
      tc.tr ->
        tc.td prop
        tc.td model[prop]

export default optValTable
