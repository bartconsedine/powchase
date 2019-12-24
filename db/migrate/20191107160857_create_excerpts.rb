class CreateExcerpts < ActiveRecord::Migration[5.2]
  def change
    create_table :excerpts do |t|
      t.string :title
      t.string :title
      t.string :author
      t.string :chapter
      t.text :excerpts

      t.timestamps
    end
  end
end
