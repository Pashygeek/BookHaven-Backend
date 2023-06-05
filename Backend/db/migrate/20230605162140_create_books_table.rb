class CreateBooksTable < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.text :description
      t.string :image_url
      t.integer :category_id
      t.timestamps
    end
  end
end
