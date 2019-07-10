class UsersController < ApplicationController
  def index
    added_users = User.where(id: params[:addedIDs])
    @users = User.where("name LIKE ?","#{params[:input]}%") - added_users
  end
end
