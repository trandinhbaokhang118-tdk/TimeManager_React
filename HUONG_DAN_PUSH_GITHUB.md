# 📤 Hướng dẫn Push code lên GitHub

## ⚠️ Lỗi Authentication

Bạn đang gặp lỗi: **"Password authentication is not supported"**

GitHub không còn hỗ trợ đăng nhập bằng password. Bạn cần dùng **Personal Access Token (PAT)**.

---

## 🔑 Cách 1: Tạo Personal Access Token (Khuyên dùng)

### Bước 1: Tạo Token trên GitHub

1. Đăng nhập GitHub: https://github.com
2. Click avatar (góc phải) → **Settings**
3. Kéo xuống dưới → Click **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Điền thông tin:
   - **Note:** `TimeManager Local Dev`
   - **Expiration:** `90 days` (hoặc `No expiration`)
   - **Select scopes:** Tick ✅ **repo** (toàn bộ)
7. Click **Generate token**
8. **QUAN TRỌNG:** Copy token ngay (chỉ hiện 1 lần!)
   - VD: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Bước 2: Push với Token

```bash
# Xóa remote cũ
git remote remove origin

# Thêm remote mới với token
git remote add origin https://ghp_YOUR_TOKEN_HERE@github.com/trandinhbaokhang118-tdk/TimeManager_React.git

# Push
git push -u origin main
```

**Thay `ghp_YOUR_TOKEN_HERE` bằng token bạn vừa copy!**

---

## 🔑 Cách 2: Dùng GitHub CLI (Đơn giản hơn)

### Bước 1: Cài GitHub CLI
Download: https://cli.github.com/

### Bước 2: Login
```bash
gh auth login
```

Chọn:
- **GitHub.com**
- **HTTPS**
- **Login with a web browser**
- Copy code và paste vào browser

### Bước 3: Push
```bash
git push -u origin main
```

---

## 🔑 Cách 3: Dùng SSH (Bảo mật nhất)

### Bước 1: Tạo SSH Key
```bash
ssh-keygen -t ed25519 -C "trandinhbaokhang118@gmail.com"
```

Nhấn Enter 3 lần (không cần passphrase)

### Bước 2: Copy public key
```bash
type %USERPROFILE%\.ssh\id_ed25519.pub
```

Copy toàn bộ output (bắt đầu bằng `ssh-ed25519...`)

### Bước 3: Thêm SSH key vào GitHub
1. GitHub → Settings → SSH and GPG keys
2. Click **New SSH key**
3. Title: `My PC`
4. Paste key vào
5. Click **Add SSH key**

### Bước 4: Đổi remote sang SSH
```bash
git remote remove origin
git remote add origin git@github.com:trandinhbaokhang118-tdk/TimeManager_React.git
git push -u origin main
```

---

## ✅ Sau khi push thành công

Repository sẽ có tại:
```
https://github.com/trandinhbaokhang118-tdk/TimeManager_React
```

---

## 🚀 Quick Commands

### Kiểm tra remote
```bash
git remote -v
```

### Xem status
```bash
git status
```

### Push lần sau (đã setup)
```bash
git add .
git commit -m "Update: your message"
git push
```

---

## 💡 Tips

### Lưu credentials (không cần nhập lại)
```bash
git config --global credential.helper store
```

### Xem git config
```bash
git config --list
```

### Xóa credentials cũ
```bash
git credential-manager-core erase
```

---

## ⚠️ Lưu ý Bảo mật

1. **KHÔNG** commit file `.env` (đã được gitignore)
2. **KHÔNG** share Personal Access Token
3. **KHÔNG** commit API keys, passwords
4. Kiểm tra `.gitignore` trước khi push

---

## 🆘 Troubleshooting

### Lỗi: "remote origin already exists"
```bash
git remote remove origin
git remote add origin <URL>
```

### Lỗi: "failed to push some refs"
```bash
git pull origin main --rebase
git push -u origin main
```

### Lỗi: "Permission denied (publickey)"
Kiểm tra SSH key đã add vào GitHub chưa

---

## 📞 Cần giúp đỡ?

Nếu vẫn gặp lỗi, hãy:
1. Copy toàn bộ error message
2. Kiểm tra GitHub repository đã tạo chưa
3. Thử lại với Personal Access Token
