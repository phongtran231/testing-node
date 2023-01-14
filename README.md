# NOTES: I place my .env here to make sure you do not need to do anything to run my testing app
# of course .env should not be here ^^ but it will save your time 
# please use my docker to start testing

### after start docker please exec to container by this command `docker-compose exec app bash`
### run command `npm run typeorm:run-migrations`
### if you want to revert migration please you `npm run typeorm:revert-migration`
### exec into database container and create `test` for testing e2e
### I created 2 routers for seeding data 
1. http://localhost:3009/seeder/run-seed
2. to revert seed (http://localhost:3009/seeder/revert-seed)

# thanks for your time :D 


