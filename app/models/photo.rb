class Photo < ActiveRecord::Base
  require 'aws-sdk'

  attr_accessible :filename, :url
  validates_uniqueness_of :filename

  after_create :upload_photo

  def self.query_new_photos
    @files = Dir.glob("public/photos/*.{jpg, JPG, jpeg, JPEG}")
    @files.each do |file|
      filename = File.basename(file)
      localpath = "photos/" + filename
      Photo.create(:filename => localpath)
    end
  end

  def upload_photo
    s3 = AWS::S3.new
    bucket = s3.buckets['sps-photobooth']
    key = SecureRandom::urlsafe_base64
    obj = bucket.objects[key]
    obj.write(Pathname.new("public/" + self.filename), :acl => :public_read)
    s3_url = obj.public_url.to_s
    self.url = s3_url
    self.save!
  end

end
