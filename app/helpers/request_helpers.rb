
def delete_old_weather_reports(id)
  WeatherReport.where(ski_area_id: id).each do |old_report|
    if old_report.destroy
      puts "Deleted #{old_report.id}"
    end
  end
end
