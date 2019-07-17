$(function(){
  function reloadGroups(){
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


  var path = location.pathname
  if ( (path.match(/groups/) && path.match(/messages/) ) || path == "\/" ) {
    setInterval(reloadGroups, 5000)
  }

  // var path = location.pathname
  // var regexp = RegExp('messages')

  // var set = setInterval(function(){
  //   if ( regexp.test(path) == false && path != "\/" ) { 
  //     console.log("aaaaa")
  //     clearInterval(set)
  //   }
  //   else {
  //     reloadGroups()
  //   }
  // }, 5000)


})
