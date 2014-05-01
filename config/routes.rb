Soundclown::Application.routes.draw do

  root to: "root#root"



  namespace :api, defaults: { format: :json } do
    resource  :session, only: [:create, :new, :destroy]
    resources :users do
      resources :tracks, only: [:index, :new, :create]
    end
  end

  # namespacing api for backbone is entirely different from the normal rails routes
  resource  :session, only: [:create, :new, :destroy]

  resources :users, except: [:index] do
    resources :tracks, only: [:index, :new, :create]
    resource  :follow, only: [:create, :destroy]
    resources :playlists, only: [:index]
    resources :likes, only: [:index]
    resources :comments, only: [:index]
    member do
      get "followers"
      get "followees"
    end
    get "stream", on: :collection
  end

  resources :notifications, only: [:index]

  resources :comments, only: [:create, :destroy]

  resources :playlists, except: [:index] do
    member do
      patch "add_track"
      patch "remove_track"
    end
  end
  resources :tracks, only: [:show, :destroy]

  resource :reblog, only: [:create, :destroy]
  resource :like, only: [:create, :destroy]

  # patch "/playlists/:id/add", action: "add_track", controller: "playlists", as: "add_to_playlist"
#     patch "/playlists/:id/remove", action: "remove_track", controller: "playlists", as: "remove_from_playlist"
end
