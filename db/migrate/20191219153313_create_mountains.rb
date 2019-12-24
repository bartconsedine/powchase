class CreateMountains < ActiveRecord::Migration[5.2]
  def change
    create_table :mountains do |t|
      t.string :ski-area
      t.text :description
      t.string :town
      t.float :latitude
      t.float :longitude
      t.string :pass

      t.timestamps
    end
  end
end
