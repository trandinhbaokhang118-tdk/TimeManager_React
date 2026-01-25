# Test AI Chatbot với OpenAI API

## Đã hoàn thành:
✅ Thêm OpenAI API key vào backend/.env
✅ Cập nhật system prompt để cho phép trả lời mọi câu hỏi
✅ Restart backend thành công (đang chạy tại http://localhost:3000)

## Hướng dẫn test:
1. Mở ứng dụng frontend tại http://localhost:5173
2. Đăng nhập với tài khoản: trandinhbaokhang118@gmail.com / Khang11082005@
3. Click vào icon chatbot (góc dưới bên phải)
4. Thử các câu hỏi sau:

### Test câu hỏi toán học:
- "2 + 2 bằng mấy?"
- "5 x 7 = ?"
- "Căn bậc 2 của 16 là bao nhiêu?"

### Test câu hỏi kiến thức chung:
- "React là gì?"
- "Thủ đô của Việt Nam là gì?"
- "Ai phát minh ra bóng đèn?"

### Test câu hỏi về task management:
- "Tạo task mới cho tôi"
- "Xem công việc hôm nay"
- "Thống kê năng suất"

## Kiểm tra logs:
Mở Console trong trình duyệt (F12) để xem:
- Request gửi đến backend
- Response từ OpenAI API
- Bất kỳ lỗi nào

## Nếu vẫn không hoạt động:
1. Kiểm tra OpenAI API key có hợp lệ không
2. Xem backend logs: Process ID 8
3. Kiểm tra network tab trong DevTools
