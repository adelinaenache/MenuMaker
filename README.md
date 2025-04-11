# MenuMaker
Restaurant menu management site

# Start up guide. 
In the root of the project open run: 
```
docker compose up 
```

This will start the database.


To install the backend dependencies: 
Install the dependencies with `yarn`: 
```
cd backend
yarn install
```
To migrate the DB run: 
```
npx primsa migrate deploy 
npx prisma generate
```

Now, we can start the backend with 
```
yarn start:dev
```

To install the frontend: 
```
cd frontend
yarn install
```

To run the frontend: 
```
yarn dev
```

Close the warnings. 
# Intended feature list:

### MVP features
* Restaurant admins: Create and manage menus and their items for each restaurant they've created
* Restaurant admins: Generate QR codes linking to the menu
* Clients: Can scan the generated QR codes to open the restaurants' menus
* Clients: See a list of all restaurants available on the platform and details about them and their menus

### Ideal features
* Clients: Place orders from the opened menu
* Restaurant admins: View all active orders, change the order status (PENDING, PREPARING, DONE)
* Generate distinct QR codes per table for easy on-premis table identification
* Generate PDF version of menu
* Ability to customize the look of the PDF version of the menu
* Payment via our platform

# Technologies used:
* Next.js - Static / SSR React framework
* NestJS - Opinionated Node.js backend framework
* Chakra UI - Styling library
* GraphQL - API Query language
* PostgreSQL - The DB layer
* Prisma - Typescript ORM language for database interfacing
* Docker - for hosting the PostgreSQL instance

# User stories:
* As a restaurant admin,
  I want to be able to log-in
  so that I can access the restaurants I manage.
* As a restaurant admin,
  I want to be able to log-out
  so that I can change accounts.
* As a restaurant admin,
  I want to be able to add a restaurant
  so that I can make use of this service functionalities.
* As a restaurant admin,
  I want to be able to edit a restaurant information
  to add modifications or corrections.
* As a restaurant admin,
  I want to be able to manage multiple restaurants.  
* As a restaurant client,
  I want to be able to view the restaurant page when I scan the qr
  so that I can see and interact with it.
* As a restaurant client,
  I want to be able to rate a restaurant
  so that others can see my opinion and experience of the restaurant.
* As a restaurant admin,
  I want to be able to add a location to a restaurant,
  so that others can see where it is located.
* As a restaurant admin,
  I want to be able to change the theme of my restaurant,
  so that it matches with the restaurant touch and feel.
* As a restaurant client,
  I want to be able to add an item to my order.
* As a restaurant client,
  I want to be able to place an order from the app
  so that the order doesn't have to go through a middleman.
* As a restaurant admin,
  I want to change the status of an order
  so that clients can see status updates in real time.