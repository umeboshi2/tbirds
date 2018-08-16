# FIXME
# use file-saver instead
# npm install file-saver
# 

#sampleOptions =
#  data: 'bytes'
#  filename: 'file.bin'
#  elId: 'exported-file-anchor'
  
  
export default (options) ->
  data = encodeURIComponent(options.data)
  link = "#{options.type},#{data}"
  filename = options.filename or "exported"
  a = document.createElement 'a'
  a.id = options.elId or 'exported-file-anchor'
  a.href = link
  a.download = filename
  a.innerHTML = "Download #{filename}"
  a.style.display = 'none'
  document.body.appendChild a
  a.click()
  document.body.removeChild a
  


