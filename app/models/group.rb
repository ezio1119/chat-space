class Group < ApplicationRecord
  has_many :members, foreign_key: "group_id"
  has_many :users, through: :members, source: :user


  has_many :messages
  validates :name, presence: true



  def show_last_message
    if (last_message = messages.last).present?
      last_message.text? ? last_message.text : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end

end
