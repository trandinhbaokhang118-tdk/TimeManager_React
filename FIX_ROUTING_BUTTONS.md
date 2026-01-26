# 🔧 Fix Routing Buttons

## Vấn đề
Các nút trong giao diện bị lỗi khi chuyển sang `/app` - redirect sai route.

## Đã sửa

### 1. **NotFound.tsx** - Nút "Go to Dashboard"
**Trước:**
```tsx
<Link to="/">  // Sai - trỏ về Landing
```

**Sau:**
```tsx
<Link to="/app">  // Đúng - trỏ về Dashboard
```

### 2. **AdminRoute.tsx** - Redirect khi không phải admin
**Trước:**
```tsx
return <Navigate to="/" replace />;  // Sai - về Landing
```

**Sau:**
```tsx
return <Navigate to="/app" replace />;  // Đúng - về Dashboard
```

## Cấu trúc routing đúng

```
/ (Landing)           → Trang chủ công khai
/login                → Đăng nhập
/register             → Đăng ký
/app                  → Dashboard (yêu cầu login)
/app/tasks            → Tasks page
/app/calendar         → Calendar page
/app/focus            → Focus page
/app/analytics        → Analytics page
/app/notifications    → Notifications page
/app/settings         → Settings page
/admin                → Admin panel (yêu cầu ADMIN role)
/404                  → Not found page
```

## Test cases

✅ User không phải admin truy cập `/admin` → Redirect về `/app`  
✅ User vào trang 404 → Click "Go to Dashboard" → Vào `/app`  
✅ User trong app click "Trang chủ" → Vào `/` (Landing)  
✅ User chưa login truy cập `/app` → Redirect về `/login`  

## Các link đúng

- **Về trang chủ (Landing):** `/`
- **Về Dashboard:** `/app`
- **Logout:** `/login`
- **Admin không có quyền:** `/app`
