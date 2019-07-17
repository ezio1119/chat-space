json.array! @groups do |group|
  json.id group.id
  json.name group.name
  json.show_last_message group.show_last_message
end
