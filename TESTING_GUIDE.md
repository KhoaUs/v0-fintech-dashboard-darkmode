# Testing Guide - Mock Data System

## Cách Thay Đổi Vai Trò (Change Current Role)

Mở file: `/lib/mock-data.ts`

Tìm dòng khoảng 104:
```typescript
// Current user - Change the index to test different roles
// 0 = admin, 1 = team_leader, 2 = account_owner, 3 = customer
export const currentUser: User = users[0]  // ← Thay đổi số ở đây
```

**Giá trị có thể:**
- `users[0]` = **Admin** - Xem tất cả 8 portfolios + admin console
- `users[1]` = **Team Leader** (John Thompson) - Xem 2 portfolios của team-1 (Asia Pacific)
- `users[2]` = **Account Owner** (Sarah Chen) - Xem 6 portfolios
- `users[3]` = **Customer** (Michael Rodriguez) - Xem 1 portfolio

Sau khi thay đổi, refresh trang web để thấy kết quả.

---

## Mock Data Structure

### 1. Users (4 người dùng)

| ID | Name | Email | Role | Team | Mô Tả |
|---|---|---|---|---|---|
| user-admin | Admin User | admin@globalfund.com | admin | - | Quản lý toàn hệ thống |
| user-leader | John Thompson | john.thompson@globalfund.com | team_leader | team-1 | Lãnh đạo Asia Pacific team |
| user-owner | Sarah Chen | sarah.chen@globalfund.com | account_owner | team-2 | Chủ tài khoản European Markets |
| user-customer | Michael Rodriguez | michael.rodriguez@globalfund.com | customer | - | Khách hàng cá nhân |

### 2. Organization

- **Tên:** Global Investment Fund
- **Tổng AUM:** $2.85 Tỷ
- **Tổng Return:** 18.5%
- **Portfolios:** 8
- **Team Members:** 18

### 3. Teams (4 nhóm)

1. **Team 1: Asia Pacific Growth**
   - Leader: John Thompson
   - Members: 5
   - Portfolios: 2 (AGF, ITI)
   - Total AUM: $730M

2. **Team 2: European Markets**
   - Leader: Sarah Chen
   - Members: 4
   - Portfolios: 2 (EVP, SIF)
   - Total AUM: $590M

3. **Team 3: US Equities & Tech**
   - Leader: Michael Rodriguez
   - Members: 6
   - Portfolios: 2 (USTL, DIP)
   - Total AUM: $840M

4. **Team 4: Fixed Income & Bonds**
   - Leader: Michael Rodriguez
   - Members: 3
   - Portfolios: 2 (CBF, GBP)
   - Total AUM: $690M

### 4. Portfolios (8 danh mục)

| Mã | Tên | Team | NAV | Return | Risk |
|---|---|---|---|---|---|
| AGF | Asia Growth Fund | team-1 | $450M | 22.5% | High |
| ITI | India Tech Innovations | team-1 | $280M | 28.3% | High |
| EVP | European Value Portfolio | team-2 | $380M | 15.8% | Medium |
| SIF | Sustainable Impact Fund | team-2 | $210M | 18.7% | Medium |
| USTL | US Tech Leaders | team-3 | $520M | 31.5% | High |
| DIP | Dividend Income Portfolio | team-3 | $320M | 12.4% | Low |
| CBF | Corporate Bond Fund | team-4 | $340M | 9.2% | Low |
| GBP | Global Balanced Portfolio | team-4 | $350M | 14.9% | Medium |

### 5. Asset Holdings (Ví dụ: Tài sản trong portfolios)

**Portfolio-1 (AGF): 5 holdings**
- TATA (Tata Consultancy Services) - $175M (38.8%)
- INFY (Infosys) - $72M (16.0%)
- RELIANCE (Reliance Industries) - $87.5M (19.4%)
- HDFC (HDFC Bank) - $57M (12.6%)
- BHARTIARTL (Bharti Airtel) - $23M (5.1%)

**Portfolio-3 (EVP): 4 holdings**
- ASML (ASML Holding) - $127.5M (33.6%)
- SIEMENS (Siemens AG) - $33M (8.7%)
- SAP (SAP SE) - $19.8M (5.2%)
- UNILEVER (Unilever PLC) - $17.5M (4.6%)

**Portfolio-5 (USTL): 5 holdings**
- NVDA (NVIDIA) - $105M (20.2%)
- MSFT (Microsoft) - $62.25M (11.9%)
- AAPL (Apple) - $36M (6.9%)
- TSLA (Tesla) - $24M (4.6%)
- GOOGL (Alphabet) - $14.8M (2.8%)

### 6. Transactions (Giao dịch)

Có 6 giao dịch mẫu:
- **BUY**: Mua TATA (04/04) - $17.5M
- **DIVIDEND**: Nhận cổ tức từ RELIANCE (04/03) - $2.1M
- **SELL**: Bán SIEMENS (04/02) - $495K
- **BUY**: Mua NVDA (04/01) - $8.75M
- **FEE**: Phí quản lý hàng tháng (03/31) - $130K
- **BUY**: Mua INFY (03/28) - $7.2M

---

## Các Tính Năng Có Thể Test

### Với vai trò Admin
✅ Xem tất cả 8 portfolios
✅ Truy cập Admin Console (/settings)
✅ Xem tất cả teams
✅ Xem thống kê toàn hệ thống

### Với vai trò Team Leader
✅ Xem 2 portfolios của team mình (team-1)
✅ Xem thông tin team members
✅ Không truy cập Admin Console

### Với vai trò Account Owner
✅ Xem 6 portfolios
✅ Xem thông tin team
✅ Không truy cập Admin Console

### Với vai trò Customer
✅ Xem 1 portfolio (portfolio-1)
✅ Xem chi tiết holdings
✅ Xem lịch sử giao dịch
✅ Không truy cập admin/team features

---

## API Functions Có Sẵn

```typescript
// Lấy portfolios theo vai trò người dùng
getAccessiblePortfolios(user)

// Lấy holdings của một portfolio
getPortfolioHoldings(portfolioId)

// Lấy giao dịch của một portfolio
getPortfolioTransactions(portfolioId)

// Lấy thành viên của một team
getTeamMembers(teamId)

// Lấy thông tin user theo ID
getUserById(userId)

// Lấy tất cả thành viên của organization
getOrganizationMembers(orgId)

// Format tiền tệ
formatCurrency(amount)

// Format phần trăm
formatPercent(percentage)
```

---

## Sơ Đồ Truy Cập Dữ Liệu (Access Control)

```
┌─ Admin
│  └─ Xem: Tất cả 8 portfolios, tất cả teams, tất cả users
│
├─ Team Leader (John Thompson - team-1)
│  └─ Xem: 2 portfolios (AGF, ITI), team-1 members, team stats
│
├─ Account Owner (Sarah Chen - team-2)
│  └─ Xem: 6 portfolios (0-5), 1 team (team-2), team members
│
└─ Customer (Michael Rodriguez)
   └─ Xem: 1 portfolio (portfolio-1), holdings, transactions
```

---

## Cách Test Từng Feature

### 1. Test Role-Based Access
- Thay đổi `users[X]` để test từng role
- Kiểm tra Portfolio Grid sẽ hiển thị số portfolios khác nhau

### 2. Test Portfolio Details
- Click vào bất kỳ portfolio card nào
- Sẽ thấy holdings và transactions

### 3. Test Team Management
- Với Team Leader: Click "Teams" in sidebar
- Sẽ thấy team information (với mock data)

### 4. Test Admin Console
- Với Admin: Click "System Settings" in sidebar
- Sẽ thấy Organizations, Users, Teams tabs

### 5. Test Data Filtering
- Admin: thấy 8 portfolios + tất cả metrics
- Team Leader: thấy 2 portfolios từ team-1
- Account Owner: thấy 6 portfolios
- Customer: thấy 1 portfolio

---

## Mở Rộng Mock Data

Để thêm dữ liệu mới, edit `/lib/mock-data.ts`:

```typescript
// Thêm user mới
export const users: User[] = [
  // ... existing users
  {
    id: 'user-new',
    name: 'New User',
    email: 'new@globalfund.com',
    role: 'team_leader',
    organizationId: 'org-1',
    teamId: 'team-1',
    createdAt: '2026-04-05',
  }
]

// Thêm portfolio mới
export const mockPortfolios: Portfolio[] = [
  // ... existing portfolios
  {
    id: 'portfolio-9',
    name: 'New Portfolio',
    // ... other fields
  }
]

// Thêm holdings mới
export const mockAssetHoldings: AssetHolding[] = [
  // ... existing holdings
  {
    id: 'holding-15',
    portfolioId: 'portfolio-9',
    // ... other fields
  }
]
```

---

## Quick Checklist

- [ ] Thay đổi vai trò và kiểm tra Portfolio Grid hiển thị đúng số lượng
- [ ] Kiểm tra mỗi portfolio có holdings details
- [ ] Kiểm tra transactions history
- [ ] Test Admin Console (chỉ admin)
- [ ] Test Teams sidebar (team_leader + account_owner)
- [ ] Kiểm tra metrics tính toán đúng
- [ ] Test responsive design trên mobile
- [ ] Test dark mode
