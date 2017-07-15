$(function() {
        // Define data source for At.JS.
        var datasource = [" <i>Luật Doanh nghiệp số  68/2014/QH13 được Quốc hội nước Cộng hoà xã hội chủ nghĩa Việt Nam thông qua ngày 01/7/2015</i>",
            " <i>Nghị định số 36/2012/NĐ-CP ngày 18 tháng 4 năm 2012 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ, cơ quan ngang Bộ</i>",
            " <i>Nghị định số 74/2012/NĐ-CP ngày 29 tháng 9 năm 2012 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Văn phòng Chính phủ</i>",
            " <i>Nghị định số 58/2014/NĐ-CP ngày 16 tháng 6 năm 2014 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Nội vụ</i>",
            " <i>Nghị định số 24/2014/NĐ-CP ngày 04 tháng 4 năm 2014 của Chính phủ quy định tổ chức các cơ quan chuyên môn thuộc Ủy ban nhân dân tỉnh, thành phố trực thuộc Trung ương</i>",
        ] ;

        // Build data to be used in At.JS config.
        var names = $.map(datasource, function (value, i) {
            return {
                'id': i, 'name': value
            };
        });

        // Define config for At.JS.
        var config = {
            at: "Căn cứ ",
            match: /\b(\w{2,})$/,
            data: names,
            displayTpl: '<li>${name}</li>',
            limit: 10
        }
  
      // Initialize editor.
      $('#froala-editor')
        .on('froalaEditor.initialized', function (e, editor) {
          editor.$el.atwho(config);
  
          editor.events.on('keydown', function (e) {
            if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
              return false;
            }
          }, true);
        })
        .froalaEditor({
            height: 550
        })
    });