$(function(){
  
  function scroller(){
    $('.Contents__messages').animate({scrollTop: $(".Contents__messages")[0].scrollHeight},'fast')
  }
  scroller()
  
  function appendHTML(message){
   
    var html =  `<div class="Contents__messages__box">
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
      errorHTML("メッセージを入力してください")
      $(".Contents__sendmessage--sendbtn").prop('disabled', false);
    })

    $("#new_message")[0].reset()
  })
  })

})