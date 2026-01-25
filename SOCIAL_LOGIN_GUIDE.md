# Hướng dẫn sử dụng Social Login

## Tính năng đã thêm

✅ **Đăng nhập với Google** - OAuth 2.0
✅ **Đăng nhập với Facebook** - OAuth 2.0  
✅ **Đăng nhập với số điện thoại** - OTP qua SMS

## Cách sử dụng

### 1. Đăng nhập với Email (có sẵn)
- Nhập email và mật khẩu
- Click "Đăng nhập"

### 2. Đăng nhập với Google
- Click nút "Đăng nhập với Google"
- Chọn tài khoản Google
- Cho phép quyền truy cập
- Tự động đăng nhập vào hệ thống

### 3. Đăng nhập với Facebook
- Click nút "Đăng nhập với Facebook"
- Đăng nhập Facebook (nếu chưa)
- Cho phép quyền truy cập
- Tự động đăng nhập vào hệ thống

### 4. Đăng nhập với số điện thoại
- Chuyển sang tab "Số điện thoại"
- Nhập số điện thoại (10 chữ số)
- Click "Gửi mã OTP"
- Nhập mã OTP nhận được (qua SMS hoặc console log)
- Click "Xác thực"

## Cấu hình Backend

### Bước 1: Cài đặt dependencies
```bash
cd backend
npm install axios
```

### Bước 2: Chạy migration database
```bash
npx prisma migrate dev
```

### Bước 3: Cấu hình OAuth (xem file `backend/OAUTH_SETUP.md`)

**Google OAuth:**
1. Tạo project tại Google Cloud Console
2. Lấy Client ID và Client Secret
3. Thêm vào `.env`

**Facebook OAuth:**
1. Tạo app tại Facebook Developers
2. Lấy App ID và App Secret
3. Thêm vào `.env`

**SMS/OTP (Twilio):**
1. Đăng ký Twilio
2. Lấy Account SID, Auth Token, Phone Number
3. Thêm vào `.env`
4. Cài đặt: `npm install twilio`
5. Uncomment code trong `auth.service.ts`

### Bước 4: Khởi động backend
```bash
npm run start:dev
```

## Cấu hình Frontend

Frontend đã được cấu hình sẵn, chỉ cần:

```bash
cd frontend
npm run dev
```

## Testing

### Test trong Development

**OTP Mode (Console Log):**
- Mã OTP sẽ được in ra console của backend
- Không cần cấu hình SMS service
- Phù hợp cho development

**Production Mode:**
- Cấu hình Twilio hoặc SMS service khác
- Uncomment code trong `auth.service.ts`
- Mã OTP sẽ được gửi qua SMS thật

### Test OAuth

1. Đảm bảo backend chạy ở `http://localhost:3000`
2. Frontend chạy ở `http://localhost:5173`
3. Cấu hình redirect URIs đúng trong Google/Facebook console
4. Test flow đăng nhập

## Bảo mật

- ✅ OTP hết hạn sau 5 phút
- ✅ OTP chỉ dùng được 1 lần
- ✅ OAuth tokens được validate
- ✅ User tự động tạo nếu chưa tồn tại
- ⚠️ Nên thêm rate limiting cho endpoint OTP
- ⚠️ Nên dùng Redis thay vì Map trong production

## Troubleshooting

**Lỗi "Invalid redirect URI":**
- Kiểm tra lại redirect URI trong Google/Facebook console
- Đảm bảo khớp với `GOOGLE_REDIRECT_URI` / `FACEBOOK_REDIRECT_URI` trong `.env`

**Không nhận được OTP:**
- Check console log của backend
- Nếu dùng Twilio, check Twilio dashboard
- Kiểm tra số điện thoại có đúng format không

**OAuth callback không hoạt động:**
- Kiểm tra `FRONTEND_URL` trong backend `.env`
- Đảm bảo route `/auth/callback` tồn tại ở frontend
- Check browser console để xem lỗi

## API Endpoints

```
POST /auth/login              - Email login
POST /auth/register           - Register
POST /auth/send-otp           - Send OTP to phone
POST /auth/verify-otp         - Verify OTP and login
GET  /auth/google             - Redirect to Google OAuth
GET  /auth/google/callback    - Google OAuth callback
GET  /auth/facebook           - Redirect to Facebook OAuth
GET  /auth/facebook/callback  - Facebook OAuth callback
GET  /auth/me                 - Get current user (requires token)
POST /auth/refresh            - Refresh access token
POST /auth/logout             - Logout
```

## Demo Accounts

Email login vẫn hoạt động với các tài khoản demo:
- `demo@timemanager.com` / `demo123`
- `admin@timemanager.com` / `admin123`
