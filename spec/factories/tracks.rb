# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'

FactoryGirl.define do
  factory :track do
    title { |t| Faker::Name.name }
    artist { |a| Faker::Name.name }
  end
end
