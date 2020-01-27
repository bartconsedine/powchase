class SkiAreaSerializer < ActiveModel::Serializer
  attributes :id, :ski_area_name, :latitude, :longitude, :address, :pass, :site_url

  has_many :weather_reports
end
