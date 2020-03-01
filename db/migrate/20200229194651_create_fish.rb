class CreateFish < ActiveRecord::Migration[6.0]
  def change
    create_table :fish do |t|
      t.references :store, index: true
      t.string :name
      t.string :image
      t.string :desc
      t.string :price
      t.string :status

      t.timestamps null: false
    end
  end
end
