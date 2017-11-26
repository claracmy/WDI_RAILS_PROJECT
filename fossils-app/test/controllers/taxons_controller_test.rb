require 'test_helper'

class TaxonsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @taxon = taxons(:one)
  end

  test "should get index" do
    get taxons_url, as: :json
    assert_response :success
  end

  test "should create taxon" do
    assert_difference('Taxon.count') do
      post taxons_url, params: { taxon: { genus: @taxon.genus } }, as: :json
    end

    assert_response 201
  end

  test "should show taxon" do
    get taxon_url(@taxon), as: :json
    assert_response :success
  end

  test "should update taxon" do
    patch taxon_url(@taxon), params: { taxon: { genus: @taxon.genus } }, as: :json
    assert_response 200
  end

  test "should destroy taxon" do
    assert_difference('Taxon.count', -1) do
      delete taxon_url(@taxon), as: :json
    end

    assert_response 204
  end
end
