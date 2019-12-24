class ExcerptsController < ApiController

    before_action :set_excerpt, only: [:show, :update, :destroy]

    # GET /ingredients
    def index
        @excerpts = Excerpt.all

        render json: @excerpts
    end

    # GET /excerpts/1
    def show
        render json: @excerpt
    end

    # POST /excerpts
    def create
        @excerpt = Excerpt.new(excerpt_params)

        if @excerpt.save
        render json: @excerpt, status: :created, location: @excerpt
        else
        render json: @excerpt.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /excerpts/1
    def update
        if @excerpt.update(excerpt_params)
        render json: @excerpt
        else
        render json: @excerpt.errors, status: :unprocessable_entity
        end
    end

    # DELETE /excerpts/1
    def destroy
        @excerpt.destroy
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_excerpt
      @excerpt = Excerpt.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def excerpt_params
      params.require(:excerpt).permit(:excerpt_id, :title, :author, :chapter, :excerpts)
    end

end