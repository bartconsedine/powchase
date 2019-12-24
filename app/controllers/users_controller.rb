class UsersController < ApiController

    before_action :set_user, only: [:username, :email, :password, :password_confirmation]
    
    
    # GET /ingredients
    def index
        @users = User.all

        render json: @users
    end

    # GET /users/1
    def show
        begin
            @users = User.find(params[:id])
            render json: @users, status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: {
                message: "User not found with that ID"
            }, status: 404
        rescue StandardError => e
            render json: {
                message: e.to_s
            }, status: 500
        end
    end 
    # POST /users
    def create
        @user = User.new(user_params)

        if @user.save
        render json: @user, status: :created, location: @user
        else
        render json: @user.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /users/1
    def update
        if @user.update(user_params)
        render json: @user
        else
        render json: @user.errors, status: :unprocessable_entity
        end
    end

    # DELETE /users/1
    def destroy
        @user.destroy
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:user_id, :username, :email, :password)
    end
end