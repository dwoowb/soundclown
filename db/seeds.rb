# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

dwoowb = User.create!({username: 'dwoowb', email: 'dwoowb@gmail.com', password: 'foobar', fname: "Daniel", lname: "Woo", city: "Los Angeles"})
gavin = User.create!({username: 'gavin', email: 'gavin@gmail.com', password: 'foobar', fname: "Gavin", lname: "Uathuvikul", city: "Hong Kong"})
dillon = User.create!({username: 'DILLONFRANCIS', email: 'dillon@gmail.com', password: 'foobar', fname: "Dillon", lname: "Francis", city: "Los Angeles"})

andrew = User.create!({username: 'andrew', email: 'andrew@gmail.com', password: 'foobar', fname: "Andrew", lname: "Kayvanfar", city: "Los Angeles"})
jorge = User.create!({username: 'jorge', email: 'jorge@gmail.com', password: 'foobar', fname: "Jorge", lname: "Rodriguez", city: "Itaewon"})
sam = User.create!({username: 'sam', email: 'sam@gmail.com', password: 'foobar', fname: "Sam", lname: "Sweeney", city: "Las Vegas"})
daniel = User.create!({username: 'lacosse', email: 'lacosse@gmail.com', password: 'foobar', fname: "Daniel", lname: "Lacosse", city: "Durham"})




dwoowb.tracks.create!({title: 'Paradise Awaits', artist: 'ZHU'})
dwoowb.tracks.create!({title: 'Love Strong', artist: 'Moon Boots'})
dwoowb.tracks.create!({title: 'Feel it in my Bones', artist: 'Tiesto'})
dwoowb.tracks.create!({title: 'Promise Me', artist: 'Motez'})


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