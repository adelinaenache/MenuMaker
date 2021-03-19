# MenuMaker
Interactive restaurant menu creation engine

# Intended feature list:

### MVP features
Restaurant admins: Create menu items for their restaurant
Restaurant admins: Generate QR codes linking to the menu
Clients: Scan the QR code to open the menu
Clients: Place orders from the opened menu
Restaurant admins: View all active orders, change the order status (PENDING, PREPARING, DONE)

### Ideal features
Generate distinct QR codes per table for easy on-premis table identification
Generate PDF version of menu
Ability to customize the look of the PDF version of the menu
Payment via our platform

# Technologies used:
* Next.js - Static / SSR React framework
* NestJS - Opinionated Node.js backend framework
* Chakra UI - Styling library
* GraphQL - API Query language
* PostgreSQL - The DB layer
* Prisma - Typescript ORM language for database interfacing
* Docker - for hosting the PostgreSQL instance
