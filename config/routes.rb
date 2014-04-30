Soundclown::Application.routes.draw do

  root to: "sessions#new"

  resource  :session, only: [:create, :new, :destroy]

  resources :users do
    resources :tracks, only: [:index, :new, :create] # users' show pages of uploaded/reblogged tracks
    resource :follow, only: [:create, :destroy]
    resources :playlists, only: [:index]
    resources :likes, only: [:index]
    resources :comments, only: [:index]
  end

  get "/users/:user_id/followers", action: "followers", controller: "users", as: "followers"
  get "/users/:user_id/followees", action: "followees", controller: "users", as: "followees"

  resources :notifications, only: [:index]

  resources :comments, only: [:create, :destroy]

  resources :playlists, except: [:index]
  resources :tracks, only: [:show, :destroy]

  resource :reblog, only: [:create, :destroy]
  resource :like, only: [:create, :destroy]

  patch "/playlists/:id/add", action: "add_track", controller: "playlists", as: "add_to_playlist"
  patch "/playlists/:id/remove", action: "remove_track", controller: "playlists", as: "remove_from_playlist"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
