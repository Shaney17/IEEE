$(function(){
          var socket = io();
          $('#froala-editor').on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
              var data = editor.html.get();
              socket.emit('cliSendData', data);
          }).froalaEditor();

          socket.on('serSendData', function(data){
              $('#froala-editor').froalaEditor('html.set', data);
          });
      });