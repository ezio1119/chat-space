class MessagesController < ApplicationController
  before_action :set_group
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)

    groups = []
    nomessage_groups = []
    Message.order("created_at DESC").includes(:group).each do |message|
      if current_user.groups.include?(message.group)
        groups << message.group
      end
    end
    @groups = (groups + current_user.groups.order("created_at DESC")).uniq

    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = Message.new(message_params)
    respond_to do |format|
      format.html {
        if @message.save
          redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
        else
          redirect_to group_messages_path(@group), alert: "メッセージを入力してください"
        end
      }
      format.json {@message.save}
    end
  end

  private
  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end
  def set_group
    @group = Group.find(params[:group_id])

  end
end
