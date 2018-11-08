Rails.application.routes.draw do
  resources :equipment do
    resources :reports
  end
  get '/trainings/upcoming', to: 'trainings#filter'
  get 'trainings/past', to: 'trainings#filter_past'
  resources :trainings
  resources :users
  resources :sessions

  root 'static#home'

  get '/auth/:provider/callback', to: 'sessions#create'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
