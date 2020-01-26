require 'dark_sky'
class RequestController < ApplicationController
  def index
    @ski_areas = SkiArea.all.sample(2)
    # @data = { data: [] }
    @ski_areas.each do |area|
      @response = DarkSky.make_request(area.latitude, area.longitude, area.id, area.ski_area_name)
      @response[:week_forcast].each do |day|
        @report  = area.weather_reports.build(day)
        @report.save
      end
    end
  end
end
