class CreateSkiAreas < ActiveRecord::Migration[5.2]
  def change
    create_table :ski_areas do |t|
      t.string :ski_area_name
      t.integer :latitude
      t.integer :longitude
      t.string :address
      t.string :pass
      t.string :site_url

      t.timestamps
    end
  end
end
