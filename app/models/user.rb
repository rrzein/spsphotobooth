class User < ActiveRecord::Base
  attr_accessible :name, :session_token

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  def self.save_from_email_session(email)
    user = self.where(:name => email).first
    unless user
      user = self.new
      user.name = email
      user.save!
    end
  end

  def facebook
    @facebook ||= Koala::Facebook::API.new(self.oauth_token)
  end

end
