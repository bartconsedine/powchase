require 'dark_sky'
class RequestController < ApplicationController
  def index
    @request = DarkSky.make_request("37.82", "-122.423")

    render json: @request
  end
end
