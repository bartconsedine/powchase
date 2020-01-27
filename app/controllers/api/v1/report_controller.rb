class Api::V1::ReportController < ApplicationController

  def index
    @ski_areas = SkiArea.includes(:weather_reports).all
    @ski_areas
  end
end
