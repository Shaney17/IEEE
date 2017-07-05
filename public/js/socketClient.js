$(function(){
          var socket = io();
          $('#edit').on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
              var data = editor.html.get();
              socket.emit('cliSendData', data);
          }).froalaEditor();

          socket.on('serSendData', function(data){
              $('#edit').froalaEditor('html.set', data);
          });
      });