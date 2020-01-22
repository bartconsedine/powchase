require 'dark_sky'
class RequestController < ApplicationController
  def index
    @ski_areas = SkiArea.all
    @data = []
    @ski_areas.each do |area|
      @data.push(DarkSky.make_request(area.latitude, area.longitude))
    end

    respond_to do |format|
      format.json {render json: @data}
    end
  end
end
