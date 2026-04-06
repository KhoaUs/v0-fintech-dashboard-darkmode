# Quick Start Guide

## Ứng Dụng Đã Sẵn Sàng Chạy!

Hệ thống portfolio management dashboard với multi-tier organization đã hoàn tất và sẵn sàng để chạy.

### Cách Chạy Ứng Dụng

Ứng dụng đang chạy ở chế độ Demo Mode (không cần đăng nhập). Bạn có thể:

1. **Xem Home Page** - Danh sách tất cả portfolios với KPI tổng quan
2. **Click vào Portfolio** - Xem chi tiết từng portfolio
3. **Xem Team Management** - Quản lý teams (phụ thuộc vào vai trò)
4. **Xem Admin Console** - Hệ thống quản lý admin (chỉ admin mới thấy)

### Vai Trò Demo (Mock Data)

Ứng dụng hiện sử dụng mock data với 4 vai trò:

- **Admin** - Truy cập toàn bộ hệ thống + Admin Console
- **Team Leader** - Quản lý multiple teams
- **Account Owner** - Quản lý một team
- **Customer** - Xem portfolios riêng

Để thay đổi vai trò, edit `lib/mock-data.ts` dòng:
```typescript
export const currentUser = users[3] // Thay số này (0=admin, 1=leader, 2=owner, 3=customer)
```

### Các Trang Chính

| Trang | Mô Tả |
|-------|-------|
| `/` | Home - Danh sách portfolios + KPI overview |
| `/dashboard/[id]` | Chi tiết portfolio |
| `/teams/[id]` | Quản lý team |
| `/settings` | Admin console (admin only) |

### Tính Năng Hiện Tại

✓ Responsive design (mobile, tablet, desktop)
✓ Dark mode support
✓ Role-based UI (giao diện thay đổi theo vai trò)
✓ Portfolio visualization (Recharts)
✓ Mock data system
✓ Professional theme colors (teal/slate)

### Giai Đoạn Tiếp Theo

Để chuyển từ mock data sang production:

1. **Database Setup** - Chạy SQL migrations từ `/scripts` folder
   - PostgreSQL/Supabase/Neon
   
2. **Authentication** - Kích hoạt NextAuth (đã setup sẵn)
   - `.env.local` đã được cấu hình
   
3. **Database Integration** - Thay thế mock data bằng database queries
   - `lib/db.ts` chứa template cho database functions

### File Quan Trọng

- `lib/mock-data.ts` - Toàn bộ mock data
- `app/page.tsx` - Home page
- `components/home/*` - Home page components
- `components/admin/*` - Admin console components
- `app/settings/page.tsx` - Admin console
- `.env.development.local` - Environment variables

### Support

Tất cả SQL migration scripts đã chuẩn bị sẵn trong `/scripts`:
- `001_create_core_tables.sql` - Tạo core tables
- `002_create_portfolio_data_tables.sql` - Portfolio data
- `003_setup_row_level_security.sql` - RLS policies
- `004_insert_sample_data.sql` - Sample data

Hãy tham khảo `DATABASE_SETUP.md` và `DATABASE_INTEGRATION.md` để setup database.
