json.array! @messages do |message|
  json.user_name message.user.name
  json.created_at message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
  json.image message.image.to_s
  json.text message.text
  json.id message.id
end