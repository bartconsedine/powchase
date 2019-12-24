Rails.application.routes.draw do
  
  # resources :excerpts
  # resources :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  scope '/api' do
    resources :users
    resources :excerpts
    resources :mountains
  end

end
