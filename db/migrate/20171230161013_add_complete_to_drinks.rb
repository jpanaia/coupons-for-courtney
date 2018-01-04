class AddCompleteToDrinks < ActiveRecord::Migration[5.1]
  def change
    add_column :drinks, :complete, :boolean
  end
end
