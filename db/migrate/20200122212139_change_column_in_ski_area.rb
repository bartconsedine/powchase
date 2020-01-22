class ChangeColumnInSkiArea < ActiveRecord::Migration[5.2]
  def change
    change_column :ski_areas, :latitude, :float
    change_column :ski_areas, :longitude, :float
  end
end
