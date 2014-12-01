class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.string :lat
      t.string :lon
      t.string :type
      t.timestamps
    end
  end
end
