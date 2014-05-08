json.(user,
:id, :email,
:fname, :lname,
:username, :city,
:tracks_count
)

json.followers_count user.followers.size