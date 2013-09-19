OmniAuth.config.logger = Rails.logger
OmniAuth.config.on_failure = RootController.action(:root)

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '639929902730301', '05ec209b43fc16f8d850233d9b91565e', scope: "email, publish_stream"
end