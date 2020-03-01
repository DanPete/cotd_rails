Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    get 'fishes', to: 'fishes#index'
    get 'stores', to: 'stores#index'
    resources :stores
    resources :fishes, only: [:index, :create, :update, :destroy]
  end

  get '*page', to: 'static#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end

  root 'static#index'
end
