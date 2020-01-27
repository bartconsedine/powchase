require 'dark_sky'
class FetchWeatherJob < ApplicationJob
  queue_as :default

  discard_on NoMethodError

  def perform(*args)
    # Do something later
    @ski_areas = SkiArea.all
    @ski_areas.each do |area|
      puts 'HERE'
      @response = DarkSky.make_request(area.latitude, area.longitude, area.id, area.ski_area_name)

      WeatherReport.where(ski_area_id: area.id).each do |old_report|
        if old_report.destroy
          puts "Deleted #{old_report.id}"
        end
      end

      @response[:week_forcast].each do |day|
        @report  = area.weather_reports.build(day)
        if @report.save
          puts "SAVED #{@report.id}"
        else
          puts "ERROR SAVING"
        end
      end
    end
    puts 'Success'
  end
end
