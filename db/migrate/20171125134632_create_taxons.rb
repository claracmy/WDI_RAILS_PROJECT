class CreateTaxons < ActiveRecord::Migration[5.1]
  def change
    create_table :taxons do |t|
      t.string :genus

      t.timestamps
    end
  end
end
