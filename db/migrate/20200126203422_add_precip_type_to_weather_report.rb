class AddPrecipTypeToWeatherReport < ActiveRecord::Migration[5.2]
  def change
    add_column :weather_reports, :precip_type, :string
  end
end
