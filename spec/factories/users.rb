require 'faker'

FactoryGirl.define do
  factory :user do
    email { |e| Faker::Internet.email }
    password { |p| Faker::Internet.password }
  end
end