# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

dwoowb = User.create!({username: 'dwoowb', email: 'dwoowb@gmail.com', password: 'foobar', fname: "Daniel", city: "Los Angeles"})
gavin = User.create!({username: 'gavin', email: 'gavin@gmail.com', password: 'foobar', fname: "Gavin", city: "Hong Kong"})

dwoowb.tracks.create!({title: 'Paradise Awaits', artist: 'ZHU'})
dwoowb.tracks.create!({title: 'Love Strong', artist: 'Moon Boots'})
dwoowb.tracks.create!({title: 'Feel it in my Bones', artist: 'Tiesto'})
dwoowb.tracks.create!({title: 'Promise Me', artist: 'Motez'})


gavin.tracks.create!({title: 'Your Heart will Lead You Home', artist: 'Kenny Loggins'})
gavin.tracks.create!({title: 'La Gasolina', artist: 'Pitbull'})
gavin.tracks.create!({title: 'Hey Brother', artist: 'Avicii'})
gavin.tracks.create!({title: 'A Bumpy Ride', artist: 'Mohombi'})


