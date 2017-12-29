class DrinksController < ApplicationController
  # GET /drinks
  def index
    @drinks = Drink.select("id, title").all

    render json: @drinks
  end

  def show
     @drink = Drink.find(params[:id])
     render json: @drink.to_json(:include => { :ingredients => { :only => [:id, :description] }})
   end
end
