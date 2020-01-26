require 'httparty'
require_relative 'time_format'

module DarkSky
  class << self
    API_KEY = "433344de7c77dc31d5f56c5c61e45ea7"
    URL = "https://api.darksky.net/forecast"
    def make_request(lat, lon, id, name)
      request_url = "#{URL}/#{API_KEY}/#{lat},#{lon}"
      response = HTTParty.get(request_url)
      parse_request(response.parsed_response, id, name)
    end

    def parse_request(body, id, name)
      data = {}
      data[:ski_area_name] = name
      data[:tracking_id] = id
      data[:latitude] = body['latitude'].to_f
      data[:longitude] = body['longitude'].to_f
      data[:time] = TimeFormat.format_time(body['currently']['time'])
      data[:summary] = body['currently']['summary']
      data[:icon] = body['currently']['icon']
      data[:week_forcast] = format_week(body['daily']['data'])
      data
    end

    def format_week(week)
      week_forcast = []
      week.each do |day|
        hash = {}
        date = TimeFormat.format_time(day['time'])
        hash[:formatted_date] = date
        hash[:time] = day['time']
        hash[:icon] = day['icon']
        hash[:summary] = day['summary']
        hash[:sunrise_time] = day['sunriseTime']
        hash[:sunset_time] = day['sunsetTime']
        hash[:precip_probability] = day['precipProbability']
        hash[:precip_type] = day['precipType'] || 'none expected'
        hash[:precip_accumulation] = day['precipAccumulation'] || 0
        hash[:temperature_high] = day['temperatureHigh']
        hash[:temperature_low] = day['temperatureLow']
        hash[:humidity] = day['humidity']
        hash[:wind_speed] = day['windSpeed']
        week_forcast.push(hash)
      end
      week_forcast
    end
  end
end

# DarkSky.make_request(30.244, -20.30, 0, 'My Moutain')
