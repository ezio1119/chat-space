// $(function(){
//   function reloadGroups(){
    
//     var ids = $(".Sidebar__groups__group").map(function(index, element){
//       return element.getAttribute("data-id")
//     })

//     var id = Math.max.apply(null, ids)

//     $.ajax({
//       url: "/api/groups",
//       type: "GET",
//       data: {
//         id: id
//       },
//       dataType: "json",
//     })
//     .done(function() {
  
//     })

//   }



//   function appendGroup(group) {
//     var html =  `<div class="Sidebar__groups__group data-id="${group.id}">
//                   <a class="Sidebar__groups__group__link" href="/groups/${group.id}/messages">
//                     <h2>${group.name}</h2>
//                     <p>${group.show_last_message}</p>
//                   </a>
//                 </div>`
//     $(".Sidebar__groups").append(html)
//   }
//   reloadGroups()
//     // setInterval(reloadGroups, 1000)
// })
