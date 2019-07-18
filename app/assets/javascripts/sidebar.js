$(function(){
  function reloadGroups(){
    var path = location.pathname

    if ( (path.match(/groups/) && path.match(/messages/) ) || path == "\/" ) {
      $.ajax({
        url: "/",
        type: "GET",
        dataType: "json",
      })

      .done(function(groups) {
        $(".Sidebar__groups__group").remove()
        $.each(groups, function(index, group) {
          appendGroup(group)
        })
      })

      .fail(function(){
        $(".alert, .notice").remove()
        errorHTML("メッセージを入力してください")
      })
    }
    else {
      clearInterval(reloadGroups)
    }
  }

  function appendGroup(group) {
    var html =  `<div class="Sidebar__groups__group" data-id="${group.id}">
                  <a class="Sidebar__groups__group__link" href="/groups/${group.id}/messages">
                    <h2>${group.name}</h2>
                    <p>${group.show_last_message}</p>
                  </a>
                </div>`
    $(".Sidebar__groups").append(html)
  }

    setInterval(reloadGroups, 1000)
})