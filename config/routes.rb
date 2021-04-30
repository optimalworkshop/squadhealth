Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'

  mount ActionCable.server, at: '/cable'

  get '/*path' => 'squads#index'

  root to: 'squads#index'
end
