json.array! @ski_areas do |area|
  json.id area.id
  json.ski_area_name area.ski_area_name
  json.latitude area.latitude
  json.longitude area.longitude
  json.pass area.pass
  json.address area.address
  json.site_url area.site_url
  json.weather_reports area.weather_reports
end
