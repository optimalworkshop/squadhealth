Rails.application.routes.draw do
  get '/*path' => 'squads#index'

  root to: 'squads#index'
end
