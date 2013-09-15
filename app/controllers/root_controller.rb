class RootController < ApplicationController
  before_filter :authenticate_user
  before_filter :query_new_photos

  def root
    render :root
  end

  def email
    @email = session[:email]
    @images = params[:images].split(",").map(&:to_i)
    Mailer.photo_email(@email, @images).deliver
    return
  end

end
