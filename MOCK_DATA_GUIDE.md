## 📋 Hướng Dẫn Mock Data & Thay Đổi Vai Trò

### Vị Trí File Mock Data
Tất cả dữ liệu mock được lưu tại: **`lib/mock-data.ts`**

---

## 1. Mock User (Người Dùng)

### Người Dùng Hiện Tại
```typescript
export const currentUser: User = {
  id: 'user-1',
  name: 'Khoa Nguyễn',
  email: 'khoa@fintech.com',
  role: 'admin',  // ← Thay đổi role ở đây
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khoa',
}
```

### Các Vai Trò Có Sẵn
1. **'admin'** - Quản trị viên (xem toàn bộ dữ liệu)
2. **'team_leader'** - Trưởng nhóm (xem portfolios của nhóm)
3. **'account_owner'** - Chủ tài khoản (xem 6 portfolios)
4. **'customer'** - Khách hàng (xem 1 portfolio)

### Cách Thay Đổi Vai Trò
Mở file `lib/mock-data.ts` và tìm dòng:
```typescript
role: 'admin',
```

Thay thành một trong các vai trò trên, ví dụ:
```typescript
role: 'team_leader',  // Chuyển sang trưởng nhóm
```

---

## 2. Organization (Tổ Chức)

```typescript
export const mockOrganization: Organization = {
  id: 'org-1',
  name: 'Global Investment Fund',  // ← Tên tổ chức
  description: 'Premier global investment portfolio management platform',
  totalAUM: 2850000000,  // ← Tổng tài sản
  totalReturn: 18.5,  // ← Lợi tức tổng
  portfolioCount: 12,
  teamMemberCount: 24,
}
```

**Có thể chỉnh sửa:**
- `name` - Tên tổ chức
- `description` - Mô tả
- `totalAUM` - Tổng AUM (Asset Under Management)
- `totalReturn` - Lợi tức (%)
- `portfolioCount` - Số portfolios
- `teamMemberCount` - Số thành viên

---

## 3. Teams (Nhóm)

```typescript
export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Asia Pacific',
    leaderId: 'user-2',
    memberCount: 6,
  },
  // ... thêm 3 nhóm khác
]
```

Có 4 nhóm mặc định:
1. Asia Pacific
2. European Markets
3. US Equities
4. Fixed Income

---

## 4. Portfolios (Danh Mục Đầu Tư)

Có 8 portfolios mặc định:

| Portfolio | Code | NAV | Return | Team | Status |
|-----------|------|-----|--------|------|--------|
| Asia Growth Fund | AGF | $450M | +22.5% | Asia Pacific | active |
| European Value | EVP | $380M | +15.8% | European Markets | active |
| US Tech Leaders | USTL | $520M | +28.3% | US Equities | active |
| Corporate Bond Fund | CBF | $320M | +9.2% | Fixed Income | active |
| Emerging Markets | EMF | $280M | +31.5% | Asia Pacific | active |
| Dividend Income | DIP | $410M | +12.4% | US Equities | active |
| Sustainable Impact | SIF | $195M | +18.7% | European Markets | active |
| Global Balanced | GBP | $295M | +14.9% | Fixed Income | active |

### Thay Đổi Portfolio
```typescript
{
  id: 'portfolio-1',
  name: 'Asia Growth Fund',  // ← Tên
  code: 'AGF',  // ← Mã
  nav: 450000000,  // ← NAV
  return: 22.5,  // ← Lợi tức
  allocation: [
    { label: 'Equities', value: 65, color: '#3b82f6' },
    { label: 'Bonds', value: 25, color: '#10b981' },
    { label: 'Cash', value: 10, color: '#f59e0b' },
  ],
  teamId: 'team-1',  // ← Thuộc nhóm nào
  status: 'active',  // ← Trạng thái
  lastUpdated: '2026-04-04',
}
```

---

## 5. Role-Based Access Control

Mỗi vai trò nhìn thấy một số portfolios khác nhau:

```typescript
export function getAccessiblePortfolios(user: User): Portfolio[] {
  switch (user.role) {
    case 'customer':
      return mockPortfolios.slice(0, 1)  // Chỉ 1 portfolio
    case 'account_owner':
      return mockPortfolios.slice(0, 6)  // 6 portfolios
    case 'team_leader':
      return mockPortfolios.filter(p => p.teamId === 'team-1')  // Nhóm 1
    case 'admin':
      return mockPortfolios  // Tất cả 8 portfolios
    default:
      return []
  }
}
```

---

## 6. Các Hàm Helper

**Định dạng tiền tệ:**
```typescript
formatCurrency(2850000000)  // → "$2.9B"
```

**Định dạng phần trăm:**
```typescript
formatPercent(22.5)  // → "+22.50%"
formatPercent(-5.2)  // → "-5.20%"
```

---

## 🔄 Workflow: Thay Đổi Vai Trò

1. Mở file: `/lib/mock-data.ts`
2. Tìm dòng: `role: 'admin',` (khoảng dòng 50)
3. Thay đổi thành một trong: `'customer'`, `'account_owner'`, `'team_leader'`, `'admin'`
4. Lưu file (Ctrl+S / Cmd+S)
5. Ứng dụng sẽ tự động load lại - kiểm tra preview để thấy kết quả!

---

## 📌 Ví Dụ: Thay Đổi Vai Trò Thành Team Leader

**Trước:**
```typescript
export const currentUser: User = {
  id: 'user-1',
  name: 'Khoa Nguyễn',
  email: 'khoa@fintech.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khoa',
}
```

**Sau:**
```typescript
export const currentUser: User = {
  id: 'user-1',
  name: 'Khoa Nguyễn',
  email: 'khoa@fintech.com',
  role: 'team_leader',  // ← Thay đổi từ 'admin'
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khoa',
}
```

Kết quả: Chỉ nhìn thấy portfolios từ "Asia Pacific" team thay vì tất cả 8 portfolios!

---

## 🎨 Thay Đổi Colors (Màu Sắc)

Trong mỗi portfolio allocation, bạn có thể thay đổi màu sắc:

```typescript
allocation: [
  { label: 'Equities', value: 65, color: '#3b82f6' },  // Blue
  { label: 'Bonds', value: 25, color: '#10b981' },     // Green
  { label: 'Cash', value: 10, color: '#f59e0b' },      // Amber
]
```

Các màu hex phổ biến:
- `#3b82f6` - Blue
- `#10b981` - Green
- `#f59e0b` - Amber
- `#ef4444` - Red
- `#8b5cf6` - Purple
- `#ec4899` - Pink
