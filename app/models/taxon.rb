class Taxon < ApplicationRecord
  validates :genus, uniqueness: true 
end
