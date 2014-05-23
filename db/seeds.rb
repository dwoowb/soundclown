# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

dwoowb = User.create!({username: 'dwoowb', email: 'dwoowb@gmail.com', password: 'foobar', fname: "Daniel", lname: "Woo", city: "Los Angeles", avatar: File.open(Rails.root.join("seed_data", "images", "dwoowb.png"))})
gavin = User.create!({username: 'FRENCH EXPRESS', email: 'frenchexpress@gmail.com', password: 'foobar', city: "Champagne", avatar: File.open(Rails.root.join("seed_data", "images", "french_express.jpg"))})
dillon = User.create!({username: 'DILLONFRANCIS', email: 'dillonfrancis@gmail.com', password: 'foobar', fname: "Dillon", lname: "Francis", city: "Los Angeles", avatar: File.open(Rails.root.join("seed_data", "images", "dillon.jpg"))})
andrew = User.create!({username: 'Majestic Casual', email: 'majesticcasual@gmail.com', password: 'foobar', city: "Berlin", avatar: File.open(Rails.root.join("seed_data", "images", "majestic_casual.jpg"))})
jorge = User.create!({username: 'jorgerro', email: 'jorgerro@gmail.com', password: 'foobar', fname: "Jorge", lname: "Rodriguez", city: "Itaewon", avatar: File.open(Rails.root.join("seed_data", "images", "jorgerro.jpg"))})
sam = User.create!({username: 'Televisor', email: 'televisor@gmail.com', password: 'foobar', city: "Las Vegas", avatar: File.open(Rails.root.join("seed_data", "images", "televisor.jpg"))})
daniel = User.create!({username: 'd.aniellacos.se', email: 'daniellacosse@gmail.com', password: 'foobar', fname: "Daniel", lname: "Lacosse", city: "Durham", avatar: File.open(Rails.root.join("seed_data", "images", "lacosse.jpg"))})




dwoowb.tracks.create!({title: 'Paradise Awaits', artist: 'ZHU'})
dwoowb.tracks.create!({title: 'Love Strong', artist: 'Moon Boots'})
dwoowb.tracks.create!({title: 'Feel it in my Bones', artist: 'Tiesto'})
dwoowb.tracks.create!({title: 'Promise Me', artist: 'Motez'})
dwoowb.tracks.create!({title: 'Miami 82 (Kygo Remix)', artist: 'Syn Cole', music_file: File.open(Rails.root.join("seed_data", "sounds", "Syn Cole - Miami 82 (Kygo Remix).mp3"))})

gavin.tracks.create!({title: 'Your Heart will Lead You Home', artist: 'Kenny Loggins'})
gavin.tracks.create!({title: 'La Gasolina', artist: 'Pitbull'})
gavin.tracks.create!({title: 'Hey Brother', artist: 'Avicii'})
gavin.tracks.create!({title: 'A Bumpy Ride', artist: 'Mohombi'})

dillon.tracks.create!({title: 'GET LOW', artist: 'Dillon Francis & DJ Snake'})
dillon.tracks.create!({title: 'IDGAFOS', artist: 'Dillon Francis'})
dillon.tracks.create!({title: 'Flight 4555', artist: 'Dillon Francis'})
dillon.tracks.create!({title: 'Masta Blasta', artist: 'Dillon Francis'})
dillon.tracks.create!({title: 'Music is Dead', artist: 'Doctor P & Dillon Francis'})
dillon.tracks.create!({title: 'Money Makin\'', artist: 'A-Trak & Dillon Francis'})
dillon.tracks.create!({title: 'Beautician 2.0', artist: 'Dillon Francis'})
dillon.tracks.create!({title: 'Hits Me Like A Rock (Dillon Francis Remix)', artist: 'CSS'})



# demo_user = User.create!({username: 'demo-user', email: 'demo@gmail.com', password: 'foobar', fname: "Kenny", lname: "Loggins", city: "Danger Zone"})