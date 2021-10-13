# ClearquoteDashboard

This is user management application.

## Frontend on Angular
Inorder to run Frontend i.e. angular app, Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
It provides 2model Admin and user
Where admin can manage every user edit and view, and self id

user can able to view see self id and edit easily.

## Backend on Nodejs
To run nodejs server run `node backend/server`, in backend you will get Following api's
Login with jwt token and validate password with bcrypt method:POST

Signup which create user with unique emailid,  store password in hash with the help of bcrypt compare. method:POST

edit user with the existing user method:PUT

Delete user from existing user data method: Delete


Existing some id.

Userid
Email:dash@test.com
Password:123456

Admin id
Email:test@admin.com
Password:123456
