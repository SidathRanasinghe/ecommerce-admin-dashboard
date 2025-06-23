# E-commerce Admin Dashboard

A modern, full-stack e-commerce admin dashboard built with Next.js 13+, designed
for managing multiple online stores from a single, powerful interface.

![Dashboard Preview](https://via.placeholder.com/800x400/1f2937/ffffff?text=Dashboard+Preview)

## ✨ Features

### 🏪 Multi-Store Management

- Create and manage multiple stores from one dashboard
- Store-specific analytics and data isolation
- Easy store switching interface

### 📦 Product Management

- Complete CRUD operations for products
- Image upload and management with Cloudinary
- Category and size organization
- Featured and archived product states
- Real-time inventory tracking

### 📊 Analytics Dashboard

- Revenue tracking and visualization
- Sales count monitoring
- Stock level insights
- Monthly revenue graphs
- Real-time dashboard updates

### 🛒 Order Management

- Order tracking and status updates
- Payment status monitoring
- Customer information management
- Order history and analytics

### 🔐 Authentication & Security

- Secure user authentication with Clerk
- Protected routes and API endpoints
- User-specific data isolation
- Role-based access control

### 💳 Payment Integration

- Stripe payment processing
- Webhook handling for real-time updates
- Secure payment flow
- Transaction tracking

## 🚀 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Clerk
- **File Storage**: Cloudinary
- **Payments**: Stripe
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- MongoDB database (Atlas recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database
DATABASE_URL=your_mongodb_connection_string

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEB_HOOK_SECRET=your_stripe_webhook_secret

# Frontend Store URL (if you have a separate customer store)
NEXT_PUBLIC_STORE_URL=https://your-store-frontend.com
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📋 Required Service Setup

### Clerk Authentication

1. Create account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy API keys to your `.env.local`
4. Configure sign-in/sign-up pages

### MongoDB Database

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `DATABASE_URL` in `.env.local`

### Cloudinary (Image Storage)

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name from dashboard
3. Add to `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

### Stripe (Payments)

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from dashboard
3. Set up webhook endpoint for `/api/webhook`
4. Add keys to `.env.local`

## 🚀 Deployment

### Recommended: Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Alternative Platforms

- **Netlify**: Good Next.js support
- **Railway**: Full-stack with database hosting
- **Render**: Free tier available

## 📁 Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── (root)/            # Root pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── [feature]/        # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── prisma/               # Database schema
├── providers/            # Context providers
└── actions/              # Server actions
```

## 🎯 Usage

### Creating Your First Store

1. Sign up/Login to the dashboard
2. You'll be prompted to create your first store
3. Fill in store details and save
4. Start adding categories, sizes, and products

### Managing Products

1. Navigate to Products section
2. Click "Add New" to create products
3. Upload images, set categories, and pricing
4. Toggle featured/archived status as needed

### Viewing Analytics

- Dashboard shows real-time metrics
- Track revenue, sales, and inventory
- View monthly revenue trends
- Monitor store performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major
changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication
- [Prisma](https://prisma.io/) for database management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for components

## 📞 Support

If you have any questions or run into issues, please:

1. Check the existing issues
2. Create a new issue with detailed information
3. Contact: your-email@example.com

---

⭐ If you found this project helpful, please give it a star!

## 🗺️ Roadmap

- [ ] Dark mode support
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Advanced inventory management
- [ ] Customer management system
- [ ] Email notifications
- [ ] Export functionality
