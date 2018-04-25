import tc from 'teacup'

#export default (size='5x') ->
#  return tc.renderable
export default tc.renderable (size='5x') ->
  tc.span ".fa-stack.fa-#{size}", ->
    tc.i ".fa.fa-image.fa-stack-1x"
    tc.i ".fa.fa-ban.fa-stack-2x.text-danger"
    
