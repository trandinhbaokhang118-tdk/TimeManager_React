# 🎉 Feature Update - Thời gian bắt đầu & Reminder tự động

## ✅ Đã hoàn thành (2026-01-18)

### 1. **Cải thiện Dark Mode** 🌙
**Vấn đề**: Chữ bị mờ trong dark mode, khó đọc

**Giải pháp**:
- ✅ Headings (h1-h4): `rgb(255 255 255)` thay vì mặc định
- ✅ Body text: `rgb(249 250 251)` thay vì `rgb(243 244 246)`
- ✅ Caption: `rgb(229 231 235)` thay vì `rgb(209 213 219)`
- ✅ Small text: `rgb(209 213 219)` thay vì `rgb(156 163 175)`

**Kết quả**: Chữ rõ ràng, dễ đọc hơn nhiều trong dark mode

---

### 2. **Thời gian bắt đầu cho Tasks** ⏰

#### Backend Changes:

**Prisma Schema**:
```prisma
model Task {
  startAt         DateTime?
  dueAt           DateTime?
  reminderMinutes Int?      @default(15)
}
```

**Migration**: `add_task_start_time_and_reminder`

**DTO Updates**:
- `startAt`: DateTime (optional) - Thời gian bắt đầu
- `dueAt`: DateTime (optional) - Thời gian kết thúc
- `reminderMinutes`: Int (5-1440) - Nhắc trước bao nhiêu phút

**Validation**:
- `reminderMinutes`: Min 5 phút, Max 1440 phút (1 ngày)
- `dueAt` phải sau `startAt` (nếu cả 2 đều có)

#### Frontend Changes:

**Form Fields**:
- ✅ Thời gian bắt đầu (datetime-local input)
- ✅ Hạn hoàn thành (datetime-local input)
- ✅ Nhắc trước (dropdown: 5/10/15/30/60/120/1440 phút)

**Display**:
- ✅ Hiển thị thời gian bắt đầu với icon đồng hồ
- ✅ Hiển thị hạn với icon lịch
- ✅ Format: "Bắt đầu: 09:00" / "Hạn: 10:00"

---

### 3. **Auto Reminder System** 🔔

#### Cách hoạt động:

1. **Khi tạo task có `startAt`**:
   - Tự động tạo reminder
   - Thời gian trigger = `startAt - reminderMinutes`
   - Message: "Sắp đến giờ: [Task Title]"

2. **Validation**:
   - Chỉ tạo reminder nếu thời gian trigger > hiện tại
   - Không tạo reminder cho task trong quá khứ

3. **Scheduler**:
   - Backend có scheduler check reminders mỗi phút
   - Tự động gửi notification khi đến giờ
   - Mark reminder as triggered

#### Example:

```typescript
// Task: "Họp team" lúc 14:00
// Reminder: 15 phút trước
// → Notification lúc 13:45: "Sắp đến giờ: Họp team"
```

---

## 🎯 Use Cases

### 1. Lên lịch công việc
```
Tiêu đề: Họp với khách hàng
Bắt đầu: 2026-01-18 14:00
Kết thúc: 2026-01-18 15:00
Nhắc trước: 15 phút
→ Nhận thông báo lúc 13:45
```

### 2. Task cả ngày
```
Tiêu đề: Viết báo cáo
Bắt đầu: 2026-01-18 09:00
Kết thúc: 2026-01-18 17:00
Nhắc trước: 30 phút
→ Nhận thông báo lúc 08:30
```

### 3. Deadline quan trọng
```
Tiêu đề: Nộp hồ sơ
Kết thúc: 2026-01-20 23:59
Nhắc trước: 1 ngày (1440 phút)
→ Nhận thông báo lúc 2026-01-19 23:59
```

---

## 📊 Database Schema

```sql
-- Tasks table
ALTER TABLE tasks ADD COLUMN start_at TIMESTAMP;
ALTER TABLE tasks ADD COLUMN reminder_minutes INTEGER DEFAULT 15;
CREATE INDEX idx_tasks_start_at ON tasks(start_at);

-- Reminders table (existing)
-- Auto-created when task has startAt
```

---

## 🔧 API Endpoints

### Create Task with Start Time
```http
POST /tasks
Content-Type: application/json

{
  "title": "Họp team",
  "startAt": "2026-01-18T14:00:00Z",
  "dueAt": "2026-01-18T15:00:00Z",
  "reminderMinutes": 15,
  "priority": "HIGH"
}
```

### Response
```json
{
  "data": {
    "id": "uuid",
    "title": "Họp team",
    "startAt": "2026-01-18T14:00:00Z",
    "dueAt": "2026-01-18T15:00:00Z",
    "reminderMinutes": 15,
    "status": "TODO",
    "priority": "HIGH"
  }
}
```

---

## 🧪 Testing

### 1. Test tạo task với thời gian
```
1. Vào trang Tasks
2. Click "Tạo mới"
3. Nhập:
   - Tiêu đề: "Test task"
   - Thời gian bắt đầu: Chọn 5 phút sau
   - Nhắc trước: 5 phút
4. Lưu
5. Đợi 5 phút
6. ✅ Nhận notification
```

### 2. Test validation
```
1. Tạo task
2. Chọn thời gian kết thúc TRƯỚC thời gian bắt đầu
3. ✅ Hiển thị lỗi: "Thời gian kết thúc phải sau thời gian bắt đầu"
```

### 3. Test hiển thị
```
1. Tạo task có startAt và dueAt
2. Vào trang Tasks
3. ✅ Thấy "🕐 Bắt đầu: 14:00"
4. ✅ Thấy "📅 Hạn: 15:00"
```

---

## 📝 Files Changed

### Backend
1. `backend/prisma/schema.prisma` - Added startAt, reminderMinutes
2. `backend/src/tasks/dto/create-task.dto.ts` - Added fields
3. `backend/src/tasks/tasks.service.ts` - Auto-create reminder

### Frontend
1. `frontend/src/index.css` - Improved dark mode contrast
2. `frontend/src/types/index.ts` - Added Task fields
3. `frontend/src/pages/Tasks.tsx` - Added form fields & display

---

## ✨ Benefits

1. **Better Planning**: Biết chính xác khi nào bắt đầu công việc
2. **Never Miss**: Nhận thông báo tự động trước khi bắt đầu
3. **Flexible**: Tùy chỉnh thời gian nhắc từ 5 phút đến 1 ngày
4. **Visual**: Dễ dàng phân biệt thời gian bắt đầu và kết thúc
5. **Dark Mode**: Chữ rõ ràng, dễ đọc

---

## 🚀 Next Steps

- [ ] Calendar view với time blocks
- [ ] Drag & drop để thay đổi thời gian
- [ ] Recurring tasks (lặp lại)
- [ ] Multiple reminders per task
- [ ] Integration với Google Calendar

---

## 📞 Support

Nếu có vấn đề:
1. Check backend logs
2. Check database có reminder được tạo không
3. Check scheduler đang chạy không
4. Test với thời gian gần (5 phút) để debug nhanh
