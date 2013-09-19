class Mailer < ActionMailer::Base
  default from: "hello@socialprintstudio.com"

  def photo_email(email, images)
    @email = email
    @images = images
    mail(to: @email, subject: "You have received photos from Social Print Studio Photobooth.")
  end

end
