class SessionsController < ApplicationController
  before_action :require_signed_out!, only: [:new, :create]
  before_action :require_signed_in!, only: [:destroy]

  def new
  end

  def create
    @user = User.find_by_credentials(
      user_params[:email],
      user_params[:password]
      )
    if @user
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email/password combination"]
      render :new
    end
  end

  def destroy
    sign_out
    render :new
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :session_token)
  end
end
