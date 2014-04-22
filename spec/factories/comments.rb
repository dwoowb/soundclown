# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :comment do
    body { |b| Faker::Lorem.paragraph }
  end
end
