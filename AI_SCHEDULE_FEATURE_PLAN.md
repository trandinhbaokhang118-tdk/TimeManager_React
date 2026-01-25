# 🤖 AI SCHEDULE OPTIMIZER - KẾ HOẠCH TRIỂN KHAI

## 📋 Tổng quan tính năng

Tính năng "Sắp xếp lịch bằng AI" sẽ:
1. Thu thập thông tin về lịch trình sinh hoạt hằng ngày
2. Phân tích thời gian rảnh trong tuần
3. Tích hợp Google Maps để tính toán di chuyển giữa các địa điểm
4. Đề xuất lịch trình tối ưu dựa trên AI

## 🎯 Các bước triển khai

### **BƯỚC 1: Tạo UI Components**
- [ ] Button "Sắp xếp bằng AI" trên trang Tasks/Calendar
- [ ] Modal/Dialog form thu thập thông tin
- [ ] Form wizard với nhiều bước (multi-step form)
- [ ] Google Maps integration component

### **BƯỚC 2: Form Thu Thập Thông Tin**

#### **Bước 1: Thông tin cơ bản**
- Giờ thức dậy thường ngày
- Giờ đi ngủ thường ngày
- Thời gian ăn sáng/trưa/tối
- Thời gian nghỉ ngơi cố định

#### **Bước 2: Lịch học tập/làm việc**
- Thứ 2-7: Giờ học/làm việc
- Địa điểm (tích hợp Google Maps)
- Thời gian di chuyển

#### **Bước 3: Hoạt động cố định**
- Thể thao/Gym
- Họp nhóm
- Hoạt động ngoại khóa
- Địa điểm + thời gian

#### **Bước 4: Ưu tiên cá nhân**
- Thời gian tập trung tốt nhất (sáng/chiều/tối)
- Thời gian nghỉ giữa các task
- Độ ưu tiên các loại công việc

### **BƯỚC 3: Backend API**

#### **Endpoint mới cần tạo:**
```typescript
POST /api/ai-schedule/analyze
- Input: User schedule data + current tasks
- Output: Optimized schedule suggestions

POST /api/ai-schedule/preferences
- Save user preferences

GET /api/ai-schedule/preferences
- Get saved preferences

POST /api/ai-schedule/apply
- Apply AI suggestions to calendar
```

#### **AI Logic (có thể dùng):**
- OpenAI API (GPT-4) cho phân tích thông minh
- Hoặc thuật toán tự viết (scheduling algorithm)
- Tính toán thời gian di chuyển qua Google Maps Distance Matrix API

### **BƯỚC 4: Google Maps Integration**

#### **APIs cần dùng:**
1. **Google Maps JavaScript API** - Hiển thị bản đồ
2. **Places API** - Tìm kiếm địa điểm
3. **Distance Matrix API** - Tính thời gian di chuyển
4. **Geocoding API** - Chuyển địa chỉ thành tọa độ

#### **Setup:**
```bash
# Cần Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### **BƯỚC 5: AI Scheduling Algorithm**

#### **Logic cơ bản:**
1. Parse tất cả tasks hiện có
2. Lọc thời gian rảnh dựa trên lịch cố định
3. Tính toán thời gian di chuyển giữa các địa điểm
4. Sắp xếp tasks theo:
   - Độ ưu tiên
   - Deadline
   - Thời gian tập trung tốt nhất của user
   - Tối ưu di chuyển (gom các task gần nhau)
5. Đề xuất lịch trình

## 📦 Cấu trúc files cần tạo

```
frontend/src/
├── components/
│   ├── ai-schedule/
│   │   ├── AIScheduleButton.tsx          # Button trigger
│   │   ├── AIScheduleWizard.tsx          # Main wizard
│   │   ├── steps/
│   │   │   ├── BasicInfoStep.tsx         # Bước 1
│   │   │   ├── WorkScheduleStep.tsx      # Bước 2
│   │   │   ├── FixedActivitiesStep.tsx   # Bước 3
│   │   │   ├── PreferencesStep.tsx       # Bước 4
│   │   │   └── ReviewStep.tsx            # Xem lại
│   │   ├── GoogleMapsInput.tsx           # Input với Maps
│   │   └── ScheduleSuggestions.tsx       # Hiển thị đề xuất
│   └── maps/
│       ├── MapPicker.tsx                 # Pick location
│       └── RoutePreview.tsx              # Preview route
├── services/
│   ├── ai-schedule.service.ts            # API calls
│   └── google-maps.service.ts            # Maps utilities
└── types/
    └── ai-schedule.types.ts              # TypeScript types

backend/src/
├── ai-schedule/
│   ├── ai-schedule.controller.ts
│   ├── ai-schedule.service.ts
│   ├── ai-schedule.module.ts
│   ├── dto/
│   │   ├── schedule-preferences.dto.ts
│   │   └── schedule-analysis.dto.ts
│   └── algorithms/
│       ├── time-slot-finder.ts           # Tìm thời gian rảnh
│       ├── task-optimizer.ts             # Sắp xếp tasks
│       └── travel-calculator.ts          # Tính di chuyển
└── prisma/
    └── schema.prisma                     # Add new models
```

## 🗄️ Database Schema mới

```prisma
model SchedulePreference {
  id                String   @id @default(uuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Basic info
  wakeUpTime        String   // "06:00"
  sleepTime         String   // "23:00"
  breakfastTime     String?
  lunchTime         String?
  dinnerTime        String?
  
  // Work/Study schedule (JSON)
  weeklySchedule    Json     // { monday: [{start, end, location}], ... }
  
  // Fixed activities (JSON)
  fixedActivities   Json     // [{name, day, start, end, location}]
  
  // Preferences
  bestFocusTime     String   // "morning" | "afternoon" | "evening"
  breakDuration     Int      @default(15) // minutes
  travelBuffer      Int      @default(15) // minutes
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Location {
  id                String   @id @default(uuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name              String
  address           String
  latitude          Float
  longitude         Float
  placeId           String?  // Google Place ID
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([userId])
}
```

## 🚀 Triển khai từng bước

### **Phase 1: UI Basic (1-2 giờ)**
1. Tạo button "Sắp xếp bằng AI"
2. Tạo modal wizard cơ bản
3. Form bước 1: Thông tin cơ bản

### **Phase 2: Google Maps (2-3 giờ)**
1. Setup Google Maps API
2. Tạo MapPicker component
3. Tích hợp vào form

### **Phase 3: Backend API (3-4 giờ)**
1. Tạo database models
2. Tạo API endpoints
3. Implement scheduling algorithm cơ bản

### **Phase 4: AI Integration (2-3 giờ)**
1. Tích hợp OpenAI API (optional)
2. Hoặc thuật toán tự viết
3. Test và optimize

### **Phase 5: Polish (1-2 giờ)**
1. UI/UX improvements
2. Error handling
3. Loading states

## 💰 Chi phí dự kiến

### **Google Maps APIs:**
- Maps JavaScript API: $7/1000 loads
- Places API: $17/1000 requests
- Distance Matrix API: $5/1000 elements
- **Miễn phí**: $200 credit/tháng

### **OpenAI API (optional):**
- GPT-4: ~$0.03/1K tokens
- GPT-3.5-turbo: ~$0.002/1K tokens
- **Alternative**: Viết thuật toán riêng (free)

## 🎨 UI/UX Design

### **Button placement:**
- Trang Tasks: Header, bên cạnh "Tạo công việc"
- Trang Calendar: Toolbar
- Icon: Sparkles + Brain hoặc Wand

### **Wizard flow:**
```
[Bước 1] → [Bước 2] → [Bước 3] → [Bước 4] → [Xem lại] → [Kết quả]
```

### **Kết quả hiển thị:**
- Timeline view với các task được sắp xếp
- Màu sắc theo priority
- Hiển thị thời gian di chuyển
- Nút "Áp dụng" hoặc "Chỉnh sửa"

## ❓ Câu hỏi cần xác nhận

1. **Có muốn dùng OpenAI API không?** (tốn phí nhưng thông minh hơn)
2. **Google Maps API key đã có chưa?** (cần đăng ký)
3. **Có muốn lưu lịch sử các lần optimize không?**
4. **Có muốn share schedule với người khác không?**

## 🎯 Bắt đầu từ đâu?

Tôi khuyên bắt đầu với **Phase 1** - tạo UI cơ bản trước:
1. Button + Modal
2. Form wizard đơn giản
3. Mock data để test UI

Sau đó mới tích hợp Maps và Backend.

---

**Bạn muốn tôi bắt đầu từ Phase nào?** 🚀
