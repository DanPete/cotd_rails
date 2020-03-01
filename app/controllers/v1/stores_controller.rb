class V1::StoresController < ApplicationController
  def index
    @stores = Store.order(:id)

    render json: @stores
  end

  def create
    @store = Store.new(store_params)

    if @store.save
      render json: @list, status: :created
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  private

  def store_params
    params.require(:store).permit(:name)
  end
end