class TaxonsController < ApplicationController
  before_action :set_taxon, only: [:show, :update, :destroy]

  # GET /taxons
  def index
    @taxons = Taxon.all

    render json: @taxons
  end

  # GET /taxons/1
  def show
    render json: @taxon
  end

  # POST /taxons
  def create
    @taxon = Taxon.new(taxon_params)

    if @taxon.save
      render json: @taxon, status: :created, location: @taxon
    else
      render json: @taxon.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /taxons/1
  def update
    if @taxon.update(taxon_params)
      render json: @taxon
    else
      render json: @taxon.errors, status: :unprocessable_entity
    end
  end

  # DELETE /taxons/1
  def destroy
    @taxon.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_taxon
      @taxon = Taxon.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def taxon_params
      params.require(:taxon).permit(:genus)
    end
end
