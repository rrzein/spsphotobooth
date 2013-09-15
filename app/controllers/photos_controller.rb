class PhotosController < ApplicationController
  def index
    @photos = Photo.order("created_at DESC")
    render :json => @photos
  end

  def show
    @photo = Photo.find(params[:id])
    render :json => @photo
  end

end
