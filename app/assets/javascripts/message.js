$(function(){
  
  function reloadMessages() {
    if (location.pathname.match(/message/)) {
    
      var id = $(".Contents__messages__box").last().data("id")
      var group_id = location.pathname.replace(/\/groups\//,"")
      var group_id = group_id.replace(/\/messages/, "")

      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: "GET",
        data: {
          id: id
        },
        dataType: 'json'
      })
    
      .done(function(messages) {
        $.each(messages, function(index, message) {
          appendHTML(message)
        })
      })

      .fail(function(){
        $(".alert, .notice").remove()
        errorHTML("自動更新に失敗しました。")
      })
    }
    else {
      clearInterval(reloadMessages)
    }
  }

  function scroller(){
    $('.Contents__messages').animate({scrollTop: $(".Contents__messages")[0].scrollHeight},'fast')
  }

  function appendHTML(message){

    var html =  `<div class="Contents__messages__box" data-id=${message.id}>
                  <h2>
                    ${message.user_name}
                    <span>
                      ${message.created_at}
                    </span>
                  </h2>
                  <p>
                    ${message.text}
                  </p>
                  <img src= ${message.image}>
                </div>`
    
    $(".Contents__messages").append(html)
    scroller()
  }

  function errorHTML(error) {
    var html = `<div class="alert">${error}</div>`
    $(".notification").append(html)
  }

  $(document).on('turbolinks:load', function() {
    $("#new_message").on("submit", function(e){
      e.preventDefault()
      $(".alert").remove()

      var fd = new FormData(this)
      var url = $(this).attr("action")
      $.ajax({
        url: url,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        dataType: 'json'
      })

      .done(function(message) {
        appendHTML(message)
        $(".Contents__sendmessage--sendbtn").prop('disabled', false);
        scroller()
      })

      .fail(function(){
        $(".alert, .notice").remove()
        errorHTML("メッセージを入力してください")
        $(".Contents__sendmessage--sendbtn").prop('disabled', false);
      })

      $("#new_message")[0].reset()
    })
  })

  setInterval(reloadMessages, 5000)
})