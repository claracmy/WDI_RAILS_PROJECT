class AddNocToTaxon < ActiveRecord::Migration[5.1]
  def change
    add_column :taxons, :noc, :integer
    add_column :taxons, :img, :string
  end
end
