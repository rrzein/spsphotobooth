class AddAttrsToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :filename, :string
    add_column :photos, :url, :string
  end
end
