class AddSkiAreaToWeatherReports < ActiveRecord::Migration[5.2]
  def change
    add_reference :weather_reports, :ski_area, foreign_key: true
  end
end
