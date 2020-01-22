require 'httparty'

module DarkSky
  API_KEY = "433344de7c77dc31d5f56c5c61e45ea7"
  URL = "https://api.darksky.net/forecast"

  class << self
    def make_request(lat, lon)
      request_URL = "#{URL}/#{API_KEY}/#{lat},#{lon}"
      puts request_URL
      response = HTTParty.get(request_URL)
      puts response.code
      puts response.body
      response.body
    end
  end
end


