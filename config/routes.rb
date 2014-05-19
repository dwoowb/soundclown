Soundclown::Application.routes.draw do

  root to: "root#root"

  # Backbone

  namespace :api do
    resources :users, except: [:index] do
      resources :tracks, only: [:index, :new, :create]
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
    resources :follows, only: [:create, :destroy]
    resources :playlist_tracks, only: [:create, :destroy]
    resources :playlists, except: [:index]
    resources :tracks, only: [:show, :destroy]

    resources :reblogs, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
  end




  # Rails API

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
