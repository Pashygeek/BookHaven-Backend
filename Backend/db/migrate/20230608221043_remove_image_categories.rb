class RemoveImageCategories < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :images
  end
end
