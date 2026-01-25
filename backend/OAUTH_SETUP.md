# OAuth Setup Guide

## Google OAuth Setup

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Chọn **Web application**
6. Thêm **Authorized redirect URIs**:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)
7. Copy **Client ID** và **Client Secret** vào file `.env`:
   ```
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/callback"
   ```

## Facebook OAuth Setup

1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới hoặc chọn app có sẵn
3. Vào **Settings** > **Basic**
4. Copy **App ID** và **App Secret**
5. Vào **Facebook Login** > **Settings**
6. Thêm **Valid OAuth Redirect URIs**:
   - `http://localhost:3000/auth/facebook/callback` (development)
   - `https://yourdomain.com/auth/facebook/callback` (production)
7. Thêm vào file `.env`:
   ```
   FACEBOOK_APP_ID="your-app-id"
   FACEBOOK_APP_SECRET="your-app-secret"
   FACEBOOK_REDIRECT_URI="http://localhost:3000/auth/facebook/callback"
   ```

## SMS/OTP Setup (Twilio)

1. Đăng ký tài khoản tại [Twilio](https://www.twilio.com/)
2. Vào **Console Dashboard**
3. Copy **Account SID** và **Auth Token**
4. Mua số điện thoại hoặc dùng số test
5. Thêm vào file `.env`:
   ```
   TWILIO_ACCOUNT_SID="your-account-sid"
   TWILIO_AUTH_TOKEN="your-auth-token"
   TWILIO_PHONE_NUMBER="+1234567890"
   ```

### Cài đặt Twilio SDK (nếu muốn dùng thật)

```bash
npm install twilio
```

Sau đó uncomment code trong `auth.service.ts` method `sendSms()`.

## Testing

### Test Google Login
1. Truy cập: `http://localhost:3000/auth/google`
2. Đăng nhập với Google account
3. Sẽ redirect về frontend với token

### Test Facebook Login
1. Truy cập: `http://localhost:3000/auth/facebook`
2. Đăng nhập với Facebook account
3. Sẽ redirect về frontend với token

### Test Phone OTP
1. POST `/auth/send-otp` với body: `{ "phone": "0912345678" }`
2. Check console log để lấy OTP (hoặc check SMS nếu đã setup Twilio)
3. POST `/auth/verify-otp` với body: `{ "phone": "0912345678", "otp": "123456" }`

## Security Notes

- Luôn dùng HTTPS trong production
- Không commit file `.env` vào git
- Rotate secrets định kỳ
- Validate redirect URIs cẩn thận
- Rate limit các endpoints OTP để tránh spam
