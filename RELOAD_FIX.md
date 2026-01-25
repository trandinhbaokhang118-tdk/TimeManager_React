# 🔄 Sửa lỗi Reload liên tục (Infinite Loop)

## ✅ Đã sửa

### 1. **NotificationListener - Gây 401 loop**
**Vấn đề**: Component này fetch notifications ngay cả khi chưa login → 401 error → redirect → loop

**Giải pháp**: Thêm `enabled: isAuthenticated` vào useQuery
```typescript
const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsService.getAll,
    enabled: isAuthenticated, // ✅ Chỉ fetch khi đã login
    refetchInterval: 30000,
});
```

### 2. **API Interceptor - Redirect loop**
**Vấn đề**: Khi 401, redirect về `/login`, nhưng nếu đang ở `/login` thì loop

**Giải pháp**: Check pathname trước khi redirect
```typescript
// Don't redirect if already on login page
if (window.location.pathname === '/login') {
    return Promise.reject(error);
}
```

### 3. **Auth Store - State không sync**
**Vấn đề**: localStorage có token nhưng Zustand state không sync

**Giải pháp**: Thêm `checkAuth()` method
```typescript
checkAuth: () => {
    const hasTokens = !!localStorage.getItem('accessToken');
    const currentState = get();
    
    if (hasTokens && !currentState.isAuthenticated && currentState.user) {
        set({ isAuthenticated: true });
    }
}
```

### 4. **PrivateRoute - Flash và loop**
**Vấn đề**: Component render trước khi check auth xong

**Giải pháp**: Thêm loading state
```typescript
const [isChecking, setIsChecking] = useState(true);

useEffect(() => {
    checkAuth();
    setIsChecking(false);
}, []);

if (isChecking) return null; // Prevent flash
```

### 5. **Login Page - Redirect khi đã login**
**Vấn đề**: Nếu đã login mà vào `/login`, có thể gây confusion

**Giải pháp**: Auto redirect về home
```typescript
useEffect(() => {
    if (isAuthenticated) {
        navigate('/', { replace: true });
    }
}, [isAuthenticated]);
```

---

## 🧪 Test

### 1. Test khi chưa login:
1. Xóa localStorage: `localStorage.clear()`
2. Reload trang
3. ✅ Phải redirect về `/login` 1 lần duy nhất
4. ✅ Không reload liên tục

### 2. Test khi đã login:
1. Login với `demo@timemanager.com` / `demo123`
2. Reload trang
3. ✅ Vẫn ở trang hiện tại
4. ✅ Không bị logout

### 3. Test token hết hạn:
1. Login
2. Đợi 15 phút (token expires)
3. Click vào một trang khác
4. ✅ Auto refresh token
5. ✅ Nếu refresh fail → redirect về login 1 lần

---

## 🔍 Debug

Nếu vẫn bị loop, mở Console và check:

```javascript
// Check auth state
debugAuth()

// Check nếu đang ở trang nào
console.log(window.location.pathname)

// Check localStorage
console.log({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    authStorage: localStorage.getItem('auth-storage')
})
```

---

## 🚨 Nguyên nhân phổ biến

1. **NotificationListener fetch khi chưa login** ✅ Fixed
2. **API interceptor redirect loop** ✅ Fixed
3. **Auth state không sync với localStorage** ✅ Fixed
4. **PrivateRoute render trước khi check auth** ✅ Fixed
5. **Multiple redirects cùng lúc** ✅ Fixed

---

## 📝 Checklist

- [x] NotificationListener có `enabled: isAuthenticated`
- [x] API interceptor check pathname trước redirect
- [x] Auth store có `checkAuth()` method
- [x] PrivateRoute có loading state
- [x] Login page redirect nếu đã authenticated
- [x] Không có console errors
- [x] Không reload liên tục

---

## ✨ Kết quả

- ✅ Không còn reload liên tục
- ✅ Smooth navigation
- ✅ Proper auth flow
- ✅ No flash of content
- ✅ Better UX
