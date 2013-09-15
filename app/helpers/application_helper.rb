module ApplicationHelper

  def current_user
    return nil unless session[:user_id]
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def email?
    session[:email]
  end

  def authenticate_user
    redirect_to new_session_url unless logged_in? || email?
  end

  def query_new_photos
    Photo.query_new_photos
  end

  def email
    session[:email]
  end

end
