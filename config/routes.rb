Rails.application.routes.draw do
  resources :ski_area
  get 'request/index'
  scope module: :api, defaults: {format: 'json'} do
    namespace :v1 do
      get 'report/index'
    end
  end

end
