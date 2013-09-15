Spsphotobooth::Application.routes.draw do
  match 'auth/:provider/callback', to: 'sessions#create'
  match 'auth/failure', to: redirect('/')
  match 'signout', to: 'sessions#destroy', as: 'signout'

  root :to => "root#root"
  post "/email", :to => "root#email"

  resource :session, :only => [:new, :create, :destroy]
  post "/session/email", :to => "sessions#email"

  resources :photos, :only => [:index, :show]
end
