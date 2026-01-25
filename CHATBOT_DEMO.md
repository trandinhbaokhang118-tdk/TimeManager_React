# 🎬 AI CHATBOT - DEMO & EXAMPLES

## 🚀 Quick Start

### 1. Khởi động Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Khởi động Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Mở trình duyệt
- Truy cập: http://localhost:5173
- Đăng nhập vào ứng dụng
- Click vào icon ✨ ở góc dưới phải

## 💬 Ví dụ hội thoại

### Scenario 1: Tạo Task mới

**User**: "Tạo task học React"

**AI**: "Tôi có thể giúp bạn tạo task mới. Hãy cho tôi biết: tiêu đề, mô tả, độ ưu tiên và thời hạn nhé!"

**User**: "Tiêu đề: Học React Hooks, độ ưu tiên cao, deadline ngày mai 5h chiều"

**AI**: "Đã tạo task 'Học React Hooks' với độ ưu tiên cao, deadline 25/01/2026 17:00. Bạn muốn thêm gì nữa không?"

---

### Scenario 2: Xem công việc hôm nay

**User**: "Xem công việc hôm nay"

**AI**: "Hôm nay bạn có 3 tasks:
1. Học React Hooks (HIGH) - 17:00
2. Họp team (MEDIUM) - 14:00  
3. Viết báo cáo (LOW) - 20:00

Bạn muốn tôi giúp gì với các tasks này?"

---

### Scenario 3: Lên lịch thông minh

**User**: "Khi nào tôi rảnh để học?"

**AI**: "Dựa trên lịch của bạn, bạn có thời gian rảnh:
- Sáng nay: 9:00 - 11:30
- Chiều nay: 15:00 - 16:30
- Tối nay: 21:00 - 23:00

Tôi đề xuất học vào buổi sáng vì đó là thời gian tập trung tốt nhất của bạn!"

---

### Scenario 4: Thống kê năng suất

**User**: "Thống kê công việc tuần này"

**AI**: "📊 Thống kê tuần này (20-26/01):
- Tổng tasks: 15
- Hoàn thành: 10 (67%)
- Đang làm: 3 (20%)
- Chưa bắt đầu: 2 (13%)

Năng suất của bạn tốt! Hãy tiếp tục phát huy nhé! 💪"

---

### Scenario 5: Đề xuất tối ưu

**User**: "Làm sao để hoàn thành nhiều việc hơn?"

**AI**: "Dựa trên phân tích, tôi có một số đề xuất:

1. **Ưu tiên tasks quan trọng**: Làm tasks HIGH priority trước
2. **Time blocking**: Chia nhỏ công việc thành các khối 25-50 phút
3. **Tránh multitasking**: Tập trung vào 1 việc tại 1 thời điểm
4. **Nghỉ ngơi đủ**:休息 15 phút sau mỗi 2 giờ làm việc

Bạn muốn tôi giúp lên lịch cụ thể không?"

---

## 🎯 Test Cases

### Test 1: Chatbot mở/đóng
- [ ] Click icon ✨ → Chatbot mở
- [ ] Click X → Chatbot đóng
- [ ] State được giữ khi đóng/mở lại

### Test 2: Gửi tin nhắn
- [ ] Nhập text → Click Send → Tin nhắn hiển thị
- [ ] Enter → Gửi tin nhắn
- [ ] Loading state hiển thị khi đang xử lý
- [ ] Response từ AI hiển thị đúng

### Test 3: Suggestions
- [ ] Suggestions hiển thị sau mỗi response
- [ ] Click suggestion → Gửi tin nhắn tự động
- [ ] Suggestions cập nhật theo context

### Test 4: Error Handling
- [ ] Backend offline → Hiển thị error message
- [ ] Invalid token → Redirect to login
- [ ] Network error → Retry option

### Test 5: Responsive
- [ ] Desktop: Chatbot 400x600px góc phải
- [ ] Mobile: Chatbot full screen
- [ ] Tablet: Chatbot responsive

### Test 6: Dark/Light Mode
- [ ] Light mode: Galaxy Aqua theme
- [ ] Dark mode: Deep Black theme
- [ ] Smooth transition giữa modes

### Test 7: Performance
- [ ] Scroll smooth khi có nhiều messages
- [ ] Input không lag
- [ ] Animation mượt mà

## 🔧 Debug Tips

### Check Backend Connection
```bash
curl -X POST http://localhost:3000/ai-chat/suggestions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### Check Frontend Console
```javascript
// Open DevTools Console
localStorage.getItem('token') // Check token
```

### Test OpenAI Integration
```bash
# In backend/.env
OPENAI_API_KEY=sk-test-key

# Restart backend
npm run dev
```

## 📸 Screenshots

### Desktop View
```
┌─────────────────────────────────────┐
│  Time Manager Dashboard             │
│                                     │
│  [Tasks] [Calendar] [Focus]         │
│                                     │
│                                     │
│                          ┌────────┐ │
│                          │ AI Bot │ │
│                          │        │ │
│                          │ Chat   │ │
│                          │ Window │ │
│                          │        │ │
│                          └────────┘ │
│                              ✨     │
└─────────────────────────────────────┘
```

### Mobile View
```
┌─────────────────┐
│ Time Manager    │
├─────────────────┤
│                 │
│  AI Chatbot     │
│  ┌───────────┐  │
│  │ Messages  │  │
│  │           │  │
│  │           │  │
│  │           │  │
│  └───────────┘  │
│  [Input] [Send] │
└─────────────────┘
```

## 🎨 UI Components

### Floating Button
- Size: 56x56px
- Background: Gradient (primary)
- Icon: Sparkles
- Shadow: 0 8px 24px rgba(18, 194, 255, 0.3)
- Hover: Scale 1.1
- Animation: Ping effect

### Chat Window
- Size: 400x600px (desktop)
- Border radius: 16px
- Backdrop blur: 20px
- Shadow: var(--shadow)
- Border: 1px solid var(--border)

### Message Bubble
- User: Right aligned, primary gradient
- AI: Left aligned, surface-3
- Avatar: 32x32px circle
- Timestamp: Small text, opacity 0.7
- Border radius: 16px (8px on corner)

### Input Field
- Height: 44px
- Border radius: 12px
- Focus: Primary border + ring
- Placeholder: "Nhập tin nhắn..."

### Suggestions
- Pills style
- Border radius: 20px
- Padding: 6px 12px
- Hover: Scale 1.05
- Background: surface-3

## 🚀 Performance Metrics

### Target Metrics
- First paint: < 1s
- Time to interactive: < 2s
- Message send latency: < 500ms
- AI response time: < 3s (with OpenAI)
- Scroll FPS: 60fps

### Optimization
- Lazy load chatbot component
- Debounce input
- Virtualize long message lists
- Cache suggestions
- Compress images

## 📝 Notes

1. **OpenAI API Key**: Optional, chatbot hoạt động với fallback logic
2. **Rate Limiting**: Implement để tránh spam
3. **Message History**: Hiện tại không lưu, có thể thêm sau
4. **Multi-language**: Hiện tại chỉ tiếng Việt
5. **Voice Input**: Sẽ thêm trong version sau

---

**Happy Chatting! 🤖✨**
