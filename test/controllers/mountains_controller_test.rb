require 'test_helper'

class MountainsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mountain = mountains(:one)
  end

  test "should get index" do
    get mountains_url, as: :json
    assert_response :success
  end

  test "should create mountain" do
    assert_difference('Mountain.count') do
      post mountains_url, params: { mountain: { description: @mountain.description, latitude: @mountain.latitude, longitude: @mountain.longitude, pass: @mountain.pass, ski-area: @mountain.ski-area, town: @mountain.town } }, as: :json
    end

    assert_response 201
  end

  test "should show mountain" do
    get mountain_url(@mountain), as: :json
    assert_response :success
  end

  test "should update mountain" do
    patch mountain_url(@mountain), params: { mountain: { description: @mountain.description, latitude: @mountain.latitude, longitude: @mountain.longitude, pass: @mountain.pass, ski-area: @mountain.ski-area, town: @mountain.town } }, as: :json
    assert_response 200
  end

  test "should destroy mountain" do
    assert_difference('Mountain.count', -1) do
      delete mountain_url(@mountain), as: :json
    end

    assert_response 204
  end
end
