ActiveAdmin.register User do


  permit_params :user_id, :username, :email, :password, :password_confirmation
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :username, :email, :password_digest, :goal
  #
  # or
  #
  # permit_params do
  #   permitted = [:username, :email, :password_digest, :goal]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
