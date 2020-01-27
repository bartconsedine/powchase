require 'rails_helper'

describe Api::V1::ReportController, type: :controller do
  describe 'GET index' do
    it 'renders json without errors' do
      get :index
      expect(response).to have_http_status(200)
    end
  end
end
