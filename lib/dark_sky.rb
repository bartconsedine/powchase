require 'httparty'
require 'json'
require 'date'

module DarkSky
  class << self
    API_KEY = "433344de7c77dc31d5f56c5c61e45ea7"
    URL = "https://api.darksky.net/forecast"
    def make_request(lat, lon)
      request_url = "#{URL}/#{API_KEY}/#{lat},#{lon}"
      response = HTTParty.get(request_url)
      # @res_body = JSON.parse response.body, symbolize_name: true
      parse_request(response.parsed_response)
    end

    def parse_request(body)
      # p body
      data = {}
      data[:latitude] = body['latitude'].to_f
      data[:longitude] = body['longitude'].to_f
      data[:time] = format_time(body['currently']['time'])
      data[:summary] = body['currently']['summary']
      data[:icon] = body['currently']['icon']
      data[:week_forcast] = format_week(body['daily']['data'])
    end
    
    def format_time(time)
      Date.strptime(time.to_s,'%s').strftime('%m/%d/%Y')
    end
    
    def format_week(week)
      week_forcast = []
      week.each do |day|
        hash = {}
        time = format_time(day['time'])
        hash[:date] = time
        week_forcast.push(hash)
      end
      puts week_forcast
    end 
  end
end

DarkSky.make_request(30.244, -20.30)

