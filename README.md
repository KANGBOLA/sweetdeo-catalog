# Sweetdeo Catalog

> E-commerce platform for allergen-free and health-conscious desserts

Sweetdeo Catalog is a modern e-commerce website specializing in allergen-free desserts with integrated payment processing, inventory management, and admin dashboard.

## ✨ Features

- 🛒 **Product Catalog** - Browse allergen-free desserts with filtering
- 🏷️ **Free-From Labels** - Gluten-free, dairy-free, sugar-free, vegan options
- 💳 **Payment Integration** - TossPayments for secure Korean payment processing
- 📦 **Order Management** - Track orders from placement to delivery
- 👨‍💼 **Admin Dashboard** - Manage orders and inventory
- 🗄️ **Supabase Backend** - Real-time database and storage
- 🎨 **Modern Design** - Clean, responsive UI with Tailwind CSS
- 📱 **Mobile Optimized** - Seamless experience on all devices

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Payments:** TossPayments SDK
- **State Management:** Zustand
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/KANGBOLA/sweetdeo-catalog.git
cd sweetdeo-catalog

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

## 🔑 Environment Variables

Create a `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# TossPayments Configuration
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_toss_client_key
TOSS_SECRET_KEY=your_toss_secret_key

# Admin Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

### Get API Keys

- **Supabase:** https://supabase.com/dashboard
- **TossPayments:** https://docs.tosspayments.com/

## 🎯 Quick Start

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📱 Main Features

### Customer Features

#### Product Browsing
- Filter by category (쿠키, 케이크, 초콜릿, etc.)
- Filter by allergen-free options
- Product detail view with ingredients
- High-quality product images

#### Shopping Cart
- Add/remove items
- Quantity adjustment
- Real-time price calculation
- Cart persistence

#### Checkout Flow
1. Review cart items
2. Enter shipping information
3. Select payment method
4. Confirm payment with TossPayments
5. View order confirmation

#### Order Tracking
- Search orders by order number
- View order status
- Track delivery progress

### Admin Features

#### Order Management
- View all orders
- Update order status
- Process cancellations/refunds
- Export order data

#### Dashboard Analytics
- Total sales
- Order statistics
- Popular products
- Revenue tracking

## 📂 Project Structure

```
sweetdeo-catalog/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── orders/             # Order API routes
│   │   │   ├── payments/           # Payment processing
│   │   │   └── admin/              # Admin API routes
│   │   ├── admin/
│   │   │   ├── login/              # Admin login
│   │   │   └── orders/             # Order management
│   │   ├── cart/                   # Shopping cart
│   │   ├── checkout/               # Checkout flow
│   │   │   ├── success/            # Payment success
│   │   │   └── fail/               # Payment failure
│   │   ├── orders/[orderNumber]/   # Order tracking
│   │   └── page.tsx                # Product catalog
│   ├── components/
│   │   ├── FilterBar.tsx           # Category/allergen filter
│   │   ├── ProductGrid.tsx         # Product display
│   │   ├── CartButton.tsx          # Cart indicator
│   │   └── Header.tsx              # Site header
│   ├── data/
│   │   └── products.ts             # Product data
│   ├── store/
│   │   └── cart.ts                 # Cart state management
│   ├── lib/
│   │   └── gtag.ts                 # Google Analytics
│   └── config/
│       └── env.ts                  # Environment config
└── public/                         # Static assets
```

## 🛒 Product Data Structure

Products are defined in `src/data/products.ts`:

```typescript
{
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  freeFrom: FreeFrom[];
  description: string;
}
```

### Categories
- 쿠키 (Cookies)
- 케이크 (Cakes)
- 초콜릿 (Chocolate)
- 빵 (Bread)

### Free-From Labels
- 글루텐프리 (Gluten-free)
- 유제품프리 (Dairy-free)
- 무설탕 (Sugar-free)
- 비건 (Vegan)

## 💳 Payment Flow

### TossPayments Integration

1. Customer clicks "결제하기"
2. TossPayments widget loads
3. Customer selects payment method
4. Payment processed by TossPayments
5. Webhook confirms payment
6. Order created in Supabase
7. Redirect to success/fail page

### Supported Payment Methods
- Credit/Debit Cards
- Bank Transfer
- Kakao Pay
- Naver Pay
- Samsung Pay

## 🗄️ Database Schema

### Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  order_number TEXT UNIQUE,
  customer_name TEXT,
  customer_phone TEXT,
  customer_address TEXT,
  items JSONB,
  total_price INTEGER,
  payment_key TEXT,
  status TEXT,
  created_at TIMESTAMP
);
```

## 🔧 Configuration

### Payment Currency

Edit `src/config/env.ts`:

```typescript
export const clientEnv = {
  currency: "KRW",
  locale: "ko-KR"
};
```

### Admin Access

Set admin password in `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

Access admin at: `/admin/login`

## 📊 Analytics

Google Analytics is integrated via `gtag.js`:

```typescript
// Track purchase
gtag.event("purchase", {
  transaction_id: orderId,
  value: totalAmount,
  currency: "KRW"
});
```

## 🐛 Troubleshooting

### Payment Fails

```
Error: Payment verification failed
```

**Solutions:**
- Verify TossPayments API keys
- Check network connectivity
- Ensure amount matches cart total
- Review TossPayments dashboard for errors

### Supabase Connection Error

```
Error: Failed to connect to Supabase
```

**Solutions:**
- Verify Supabase URL and anon key
- Check Supabase project status
- Ensure RLS policies are configured

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

### Environment Variables Checklist
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ NEXT_PUBLIC_TOSS_CLIENT_KEY
- ✅ TOSS_SECRET_KEY
- ✅ NEXT_PUBLIC_ADMIN_PASSWORD

### Custom Domain

Configure in Vercel:
1. Add domain in project settings
2. Update DNS records
3. Enable SSL certificate

## 🔒 Security

- **Payment Security:** PCI-DSS compliant via TossPayments
- **API Keys:** Server-side secrets never exposed to client
- **Admin Auth:** Password-protected admin routes
- **HTTPS Required:** Enforced in production
- **Input Validation:** All user inputs sanitized

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- Product review system
- Wishlist functionality
- Subscription orders
- Loyalty points program
- Multi-language support
- Mobile app (React Native)

## 📝 License

MIT License - Free to use and modify

## 🔗 Links

- **Repository:** https://github.com/KANGBOLA/sweetdeo-catalog
- **Issues:** https://github.com/KANGBOLA/sweetdeo-catalog/issues
- **Supabase:** https://supabase.com
- **TossPayments:** https://www.tosspayments.com/

## 🙏 Acknowledgments

- **TossPayments** - Payment processing
- **Supabase** - Backend infrastructure
- **Zustand** - State management
- **Next.js** - React framework
- **Tailwind CSS** - Styling

---

**Made with ❤️ for allergen-free dessert lovers**
