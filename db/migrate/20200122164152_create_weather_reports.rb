class CreateWeatherReports < ActiveRecord::Migration[5.2]
  def change
    create_table :weather_reports do |t|
      t.integer :time
      t.string :summary
      t.string :icon
      t.integer :sunrise_time
      t.integer :sunset_time
      t.integer :precip_probability
      t.integer :precip_accumulation
      t.integer :temperature_high
      t.integer :temperature_low
      t.integer :humidity
      t.integer :wind_speed

      t.timestamps
    end
  end
end
