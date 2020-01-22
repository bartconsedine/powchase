require 'dark_sky'
class RequestController < ApplicationController
  def index
    @ski_areas = SkiArea.all
    @data = { data: [] }
    @ski_areas.each do |area|
      @data[:data].push(DarkSky.make_request(area.latitude, area.longitude))
    end
    render json: @data
  end
end
