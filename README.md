# Campaign Manger Project

- npm install
- npm run dev

* .env file containing DATABASE_URL is also incorporated in the repository for ease of use. The database user will be removed after project review.
* Prisma is used as ORM alongwith MongoDb as the database to store campaigns

**Prisma commands**
- npx prisma generate
- npx prisma db push

**Features Implemented**
- Adding a new Campaign
- Editing/Modifying an existing Campaign
- Validation Error/Feedback provided on scheduling of a campaign using Zod.
- dispalying existing campaigns

**Features to implement for further improvement**
- Deleting an existing campaign once its running period is over
