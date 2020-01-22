require 'httparty'

module DarkSky
  class << self
    API_KEY = "433344de7c77dc31d5f56c5c61e45ea7"
    URL = "https://api.darksky.net/forecast"
    def make_request(lat, lon)
      request_url = "#{URL}/#{API_KEY}/#{lat},#{lon}"
      response = HTTParty.get(request_url)
      @res_body = response.body
      return parse_request(@res_body)
    end

    def parse_request(body)
      return body
    end
  end
end


