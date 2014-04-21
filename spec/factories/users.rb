FactoryGirl.define do
  factory :user do
    email { |e| Faker::Email.email }
    password { |p| Faker::Internet.password }
  end
end