# frozen_string_literal: true

module Types
  class ArticleType < BaseObject
    field :uuid, ID, null: false
    field :title, String, null: false
    field :intro, String, null: false
    field :content, String, null: true
    field :asset_id, String, null: false
    field :price, Float, null: false

    field :author, Types::UserType, null: false

    def content
      return unless object.authorize?(context[:current_user])

      object.content
    end
  end
end