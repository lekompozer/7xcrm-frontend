# 7x CRM Admin Dashboard

Trang admin quản lý subscription và customers cho ứng dụng 7x CRM được xây dựng với Next.js và TypeScript.

## Tính năng chính

### 🏠 Dashboard (Home)
- Tổng quan thống kê hệ thống
- Biểu đồ doanh thu và khách hàng
- Hoạt động gần đây

### 💳 Subscription Management
- Quản lý thông tin subscription
- Phân loại theo loại subscription
- Theo dõi trạng thái thanh toán
- Quản lý billing cycles

### 👥 Customer Management
- Quản lý thông tin khách hàng
- Tìm kiếm và lọc khách hàng
- Theo dõi trạng thái subscription
- Lịch sử giao dịch

### 📢 Marketing Assistant Management
- Quản lý dịch vụ marketing assistant
- Automated email campaigns
- Social media management
- SMS marketing campaigns
- Push notifications

### ⚙️ Settings
#### User Management
- Quản lý tài khoản quản trị
- 2 loại tài khoản: Admin và User
- Phân quyền chi tiết
- Reset password

#### Payment Management
- Quản lý tài khoản thanh toán
- Stripe, PayPal, Bank Transfer
- Theo dõi giao dịch
- Cấu hình payment gateways

## Công nghệ sử dụng

- **Framework**: Next.js 15 với App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: React Hooks
- **Build Tool**: npm

## Cấu trúc thư mục

```
src/
├── app/
│   ├── (dashboard)/          # Dashboard routes group
│   │   ├── home/            # Trang chính
│   │   ├── subscription-management/  # Quản lý subscription
│   │   ├── marketing-assistant/      # Marketing assistant
│   │   └── settings/        # Cài đặt hệ thống
│   │       ├── user-management/      # Quản lý user
│   │       └── payment-management/   # Quản lý thanh toán
│   └── layout.tsx           # Root layout
├── components/
│   ├── layout/              # Layout components
│   │   ├── Sidebar.tsx      # Left navigation menu
│   │   ├── Header.tsx       # Top header
│   │   └── DashboardLayout.tsx  # Main layout wrapper
│   └── ui/                  # Reusable UI components
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
└── hooks/                   # Custom React hooks
```

## Cài đặt và chạy

1. **Cài đặt dependencies**
   ```bash
   npm install
   ```

2. **Chạy development server**
   ```bash
   npm run dev
   ```

3. **Mở trình duyệt**
   ```
   http://localhost:3000
   ```

## Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Lint code với ESLint

## Navigation Menu

### Left Sidebar Menu gồm 5 tab chính:

1. **Home** - Dashboard tổng quan
2. **Subscription Management** - Quản lý subscription theo loại
3. **Customer Management** - Quản lý thông tin khách hàng
4. **Marketing Assistant Management** - Quản lý dịch vụ marketing
5. **Settings** - Cài đặt hệ thống
   - User Management - Quản lý tài khoản admin/user
   - Payment Management - Quản lý thanh toán

## Responsive Design

- Tối ưu cho desktop và mobile
- Sidebar responsive với collapsed state
- Tables với horizontal scroll trên mobile
- Grid layouts adaptive

## Future Enhancements

- [ ] Authentication & Authorization
- [ ] Real-time notifications
- [ ] Data export functionality
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode support
- [ ] API integration
- [ ] Database connection
