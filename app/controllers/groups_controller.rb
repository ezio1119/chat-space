class GroupsController < ApplicationController
  before_action :set_group, only: [:update, :edit]

  def index
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

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render action: :new
    end
  end

  def edit
    @users = @group.users - [current_user]
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      @users = @group.users - [current_user]
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end

end