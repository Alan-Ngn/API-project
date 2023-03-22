## database-setup branch
1. Steps
    - git checkout -b database-setup

    - Migration and Model Setup

        - npx sequelize model:generate --name ReviewImage --attributes reviewId:integer,url:string
        - npx sequelize model:generate --name Booking --attributes spotId:integer,userId:integer,startDate:date,endDate:date
        - npx sequelize model:generate --name Review --attributes spotId:integer,userId:integer,review:string,stars:integer
        - npx sequelize model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:decimal
        - npx sequelize model:generate --name SpotImage --attributes spotId:integer,url:string,preview:boolean

    - Seeder Setup

        - npx sequelize seed:generate --name demo-spots
        - npx sequelize seed:generate --name demo-booking
        - npx sequelize seed:generate --name demo-review
        - npx sequelize seed:generate --name demo-review-image
        - npx sequelize seed:generate --name demo-spot-image


## Tuesday SCRUM
  - What did I accomplish yesterday?
    - I made models/migrations and their associations
  - What do I hope to accomplish today?
    - Make seeders for associations and start doing GET routes
  - What obstacles or impediments prevent me from making progress?
    - Lack of experience with seeders on join tables. Looking at examples from assessment


## Wednesday SCRUM
  - What did I accomplish yesterday?
    - I made dyanmic seeders and started the first route
  - What do I hope to accomplish today?
    - Finish my routes for spots
  - What obstacles or impediments prevent me from making progress?
    - I've only tested in localhost and not render.
