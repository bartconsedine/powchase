class Api::V1::ReportController < ApplicationController
  def index
    @ski_areas = SkiArea.includes(:weather_reports)
    render json: @ski_areas
  end
end
