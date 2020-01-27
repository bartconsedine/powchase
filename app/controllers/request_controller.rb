require 'dark_sky'
class RequestController < ApplicationController
  def index
    # Don't use this more than once a day
    FetchWeatherJob.perform_later
  end
end
