class AddFormattedTimeToWeatherReport < ActiveRecord::Migration[5.2]
  def change
    add_column :weather_reports, :formatted_date, :string
  end
end
