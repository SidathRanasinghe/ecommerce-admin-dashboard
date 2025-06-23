Make sure the MongoDB Atlas cluster is running and active.

![activ cluster](./screenshots/image.png)

Now you need to get the connection string. Here's what to do:

---

## **Step 1: Get Your Connection String**

1. **Click the "Connect" button** (I can see it in your screenshot next to "View
   Monitoring")

2. You'll see connection options. **Choose "Connect your application"**

3. **Select "Node.js"** as the driver and choose the latest version

4. **Copy the connection string** - it will look like:
   ```
   mongodb+srv://<username>:<password>@dev-cluster-1.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## **Step 2: Modify the Connection String**

You need to add a database name to the connection string. Change it from:

```
mongodb+srv://<username>:<password>@dev-cluster-1.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

To:

```
mongodb+srv://<username>:<password>@dev-cluster-1.xxxxx.mongodb.net/ecommerce-dashboard?retryWrites=true&w=majority
```

Notice I added `/ecommerce-dashboard` before the `?` - this is your database
name. This should be a string that precentage encoded (as a URL).
![see more](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding)

## **Step 3: Update Your .env File**

Replace the `DATABASE_URL` in your `.env` file with the modified connection
string:

```env
DATABASE_URL="mongodb+srv://your-username:your-password@dev-cluster-1.xxxxx.mongodb.net/ecommerce-dashboard?retryWrites=true&w=majority"
```

**Important:** Replace:

- `your-username` with your actual MongoDB username
- `your-password` with your actual MongoDB password
- The cluster details with what you get from Atlas

## **Step 4: Check Network Access**

1. In your Atlas dashboard, click on **"Network Access"** in the left sidebar
2. Make sure your current IP address is whitelisted
3. For development, you can temporarily add `0.0.0.0/0` (allows all IPs) - but
   remove this in production

## **Step 5: Check Database Access**

1. Click on **"Database Access"** in the left sidebar
2. Make sure your database user has proper permissions (should be "Read and
   write to any database")

## **Step 6: Test the Connection**

After updating your `.env` file:

```bash
# Generate Prisma client
npx prisma generate

# Push your schema to create the database and collections
npx prisma db push

# Start your development server
npm run dev
```

## **Quick Troubleshooting:**

If you're still having issues, you can also:

1. **Create the database manually** (optional):
   - Click "Browse Collections"
   - Click "Create Database"
   - Name it `ecommerce-dashboard`
   - Create a temporary collection (Prisma will handle the rest)

2. **Test the connection string** using MongoDB Compass or any MongoDB client
   tool

The key is getting that connection string with the database name included. Once
you do that, Prisma will automatically create all the collections based on your
schema when you run `npx prisma db push`.
