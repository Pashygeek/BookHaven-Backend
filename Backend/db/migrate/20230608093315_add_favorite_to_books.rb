class AddFavoriteToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :favorite, :boolean, default: false
  end
end
