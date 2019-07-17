$(function(){
  function getAddedID(){
    var addedIDs = []
    $(".js-chat-member").each( function(index, Element){
      addedIDs.push(Element.getAttribute("id"))
    })
    return addedIDs
  }


  function createUser(user){
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    $("#user-search-result").append(html)
  }

  function addUser(user_name, user_id){
    var html =  `<div class="chat-group-user clearfix js-chat-member added-user" id=${user_id}>
                  <input value=${user_id} name="group[user_ids][]" type="hidden" id="group_user_ids">
                  <p class="chat-group-user__name">${user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    $(".chat-group-users.js-add-user").append(html)
  }

  function notfound(){
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    $("#user-search-result").append(html)
  }

  $(document).on('turbolinks:load', function() {

    $("#user-search-field").on("keyup", function(){
      $("#user-search-result").empty()
      
      var input = $(this).val()

      if (input == ""){return false}

      $.ajax({
        url: "/users",
        type: "GET",
        data: {
              input: input,
          addedIDs: getAddedID()
        },
        dataType: 'json'
      })

      .done(function(users){
        if (users.length == 0) {
          notfound()
        }
        else {
          $.each(users, function(index, user){
            createUser(user)
          })
        }
      })

      .fail(function(){
        alert("エラ〜")
      })
    })

    $("#user-search-result").on("click", ".user-search-add", function(){
      var user_name = $(this).attr("data-user-name")
      var user_id = $(this).attr("data-user-id")
      
      addUser(user_name, user_id)
      $(this).parent().remove()
    })

    $(".js-add-user").on("click", ".js-remove-btn", function(){
      $(this).parent().remove()
    })
  })
})