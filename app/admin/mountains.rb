ActiveAdmin.register Excerpt do


    permit_params :ski-area, :description, :town, :latitude, :longitude, :pass

 
    # See permitted parameters documentation:
    # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
    #
    # Uncomment all parameters which should be permitted for assignment
    #
    # permit_params :title, :author, :chapter, :excerpts
    #
    # or
    #
    # permit_params do
    #   permitted = [:title, :author, :chapter, :excerpts]
    #   permitted << :other if params[:action] == 'create' && current_user.admin?
    #   permitted
    # end
    
  end
  