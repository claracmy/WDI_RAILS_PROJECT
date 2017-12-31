class TaxonSerializer < ActiveModel::Serializer
  attributes :id, :genus, :noc, :img
end
