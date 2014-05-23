# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

dwoowb = User.create!({username: 'dwoowb', email: 'dwoowb@gmail.com', password: 'foobar', fname: "Daniel", lname: "Woo", city: "Los Angeles", avatar: File.open(Rails.root.join("seed_data", "images", "dwoowb.png"))})
french = User.create!({username: 'FRENCH EXPRESS', email: 'frenchexpress@gmail.com', password: 'foobar', city: "Champagne", avatar: File.open(Rails.root.join("seed_data", "images", "french_express.jpg"))})
daft = User.create!({username: 'Daft Punk', email: 'daftpunk@gmail.com', password: 'foobar', fname: "Manuel", lname: "Bangalter", city: "Paris", avatar: File.open(Rails.root.join("seed_data", "images", "daftpunk.jpg"))})
disclosure = User.create!({username: 'Disclosure', email: 'disclosure@gmail.com', password: 'foobar' city: "London", avatar: File.open(Rails.root.join("seed_data", "images", "disclosure.jpg"))})


dwoowb.tracks.create!({title: 'Flowers', artist: 'Nujabes', music_file: File.open(Rails.root.join("seed_data", "sounds", "11 flowers.mp3"))})
dwoowb.tracks.create!({title: 'Cocoa Butter Kisses', artist: 'Chance The Rapper', music_file: File.open(Rails.root.join("seed_data", "sounds", "03 - Cocoa Butter Kisses (ft Vic Mensa & Twista) (Prod by Cam for JUSTICE League & Peter Cottont.mp3"))})
dwoowb.tracks.create!({title: 'Trying to be Cool (Breakbot Remix)', artist: 'Phoenix', music_file: File.open(Rails.root.join("seed_data", "sounds", "Trying To Be Cool (Breakbot Remix) (1).mp3"))})
dwoowb.tracks.create!({title: 'Miami 82 (Kygo Remix)', artist: 'Syn Cole', music_file: File.open(Rails.root.join("seed_data", "sounds", "Syn Cole - Miami 82 (Kygo Remix).mp3"))})

french.tracks.create!({title: 'Love Strong', artist: 'Moon Boots', music_file: File.open(Rails.root.join("seed_data", "sounds", "Moon Boots - Love Strong.mp3"))})
french.tracks.create!({title: 'Night Call', artist: 'Kavinsky', music_file: File.open(Rails.root.join("seed_data", "sounds", "01 Nightcall (Featuring Lovefoxxx).mp3"))})
french.tracks.create!({title: 'Soon It Will Be Cold Enough to Build Fires', artist: 'Emancipator', music_file: File.open(Rails.root.join("seed_data", "sounds", "Soon it Will be Cold Enough to Build Fires.mp3"))})

disclosure.tracks.create!({title: 'When A Fire Starts To Burn', artist: 'Disclosure', music_file: File.open(Rails.root.join("seed_data", "sounds", "02 When A Fire Starts To Burn.mp3"))})
disclosure.tracks.create!({title: 'Latch (ft. Sam Smith)', artist: 'Disclosure', music_file: File.open(Rails.root.join("seed_data", "sounds", "03 Latch (ft. Sam Smith).mp3"))})
disclosure.tracks.create!({title: 'F For You', artist: 'Disclosure', music_file: File.open(Rails.root.join("seed_data", "sounds", "04 F For You.mp3"))})


daft.tracks.create!({title: 'Give Life Back To Music', artist: 'Daft Punk', music_file: File.open(Rails.root.join("seed_data", "sounds", "01 - Give life back to music (1).mp3"))})
daft.tracks.create!({title: 'Instant Crush', artist: 'Daft Punk', music_file: File.open(Rails.root.join("seed_data", "sounds", "05  Instant crush.mp3"))})
daft.tracks.create!({title: 'Fragments of Time', artist: 'Daft Punk', music_file: File.open(Rails.root.join("seed_data", "sounds", "11 - Fragments of time.mp3"))})
daft.tracks.create!({title: 'Doin\' it Right', artist: 'Daft Punk', music_file: File.open(Rails.root.join("seed_data", "sounds", "12 Doin' it right.mp3"))})
daft.tracks.create!({title: 'Technologic', artist: 'Daft Punk', music_file: File.open(Rails.root.join("seed_data", "sounds", "09 Technologic.mp3"))})
daft.tracks.create!({title: 'Lose Yourself to Dance', artist: 'Daft Punk', music_file: File.open(Rails.root.join("seed_data", "sounds", "06 Lose yourself to dance.mp3"))})




# demo_user = User.create!({username: 'demo-user', email: 'demo@gmail.com', password: 'foobar', fname: "Kenny", lname: "Loggins", city: "Danger Zone"})