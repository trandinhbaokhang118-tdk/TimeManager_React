# Cập nhật DateTimePicker - Chọn thời gian thay vì gõ tay

## Đã hoàn thành ✅

### 1. Tạo DateTimePicker Component
**File**: `frontend/src/components/ui/DateTimePicker.tsx`

**Tính năng**:
- ✅ Date picker với icon Calendar
- ✅ Time picker với icon Clock
- ✅ Responsive grid layout (2 cột)
- ✅ Dark mode support
- ✅ Focus states với ring effect
- ✅ Label tùy chỉnh (hỗ trợ ReactNode)
- ✅ Auto-update khi value thay đổi

**UI/UX**:
- Input có icon bên trái
- Border và focus ring theo design system
- Smooth transitions
- Cursor pointer để dễ nhận biết có thể click

### 2. Tích hợp vào Tasks Page
**File**: `frontend/src/pages/Tasks.tsx`

**Thay đổi**:
- ❌ Cũ: `<Input type="datetime-local">` - phải gõ tay
- ✅ Mới: `<DateTimePicker>` - chọn từ picker

**Vị trí áp dụng**:
- Thời gian bắt đầu (startAt)
- Thời gian kết thúc (dueAt)

### 3. Export Component
**File**: `frontend/src/components/ui/index.ts`
- ✅ Thêm export DateTimePicker

## Cách sử dụng

```tsx
<DateTimePicker
    label="Thời gian bắt đầu"
    value={new Date()}
    onChange={(date) => console.log(date)}
/>
```

## Lợi ích

1. **UX tốt hơn**: Người dùng chọn thay vì gõ
2. **Ít lỗi hơn**: Không lo format sai
3. **Nhanh hơn**: Click chọn nhanh hơn gõ
4. **Responsive**: Hoạt động tốt trên mobile
5. **Accessible**: Native HTML5 date/time inputs

## Test

1. Mở http://localhost:5173/tasks
2. Click "Tạo công việc mới"
3. Click vào ô "Thời gian bắt đầu" → Hiện date picker
4. Click vào ô "Thời gian kết thúc" → Hiện time picker
5. Chọn ngày và giờ từ picker thay vì gõ tay

## Screenshots

**Trước**: Input text phải gõ "2024-01-23T14:30"
**Sau**: Click chọn từ calendar và clock picker
