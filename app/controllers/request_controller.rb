require 'dark_sky'
class RequestController < ApplicationController
  def index
    @ski_areas = SkiArea.all.sample(2)
    @data = { data: [] }
    @ski_areas.each do |area|
    @data[:data].push(DarkSky.make_request(area.latitude, area.longitude, area.id, area.ski_area_name))
    end
    render json: @data
  end
end
