class SessionsController < ApplicationController

  def new
    session[:email] = nil
    session[:user_id] = nil
    render :new
  end

  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    redirect_to root_url
  end

  def destroy
    @user = current_user
    if @user
      session[:user_id] = nil
      redirect_to "http://www.facebook.com/logout.php?api_key=#{'639929902730301'}&session_key=#{@user.oauth_token}&confirm=1&next=#{new_session_url}"
      return
    end

    if session[:email]
      session[:email] = nil
      redirect_to root_url
    end
  end

  def email
    session[:email] = params[:email]
    User.save_from_email_session(params[:email])
    redirect_to "/#email"
  end

end
