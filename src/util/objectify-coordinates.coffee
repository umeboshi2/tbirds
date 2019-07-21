import coordinateFields from './coordinate-fields'

export default (coords) ->
  newCoords = {}
  coordinateFields.forEach (field) ->
    value = coords[field]
    newCoords[field] = value
  return newCoords
  
  
