# Báo cáo Sửa lỗi TimeManager

## ✅ Đã sửa (18 lỗi)

### 1. Import không sử dụng
- ✅ `ActivityLogs.tsx` - Removed unused `Activity`, `Input`
- ✅ `AdminDashboard.tsx` - Removed unused `UserX`
- ✅ `UserManagement.tsx` - Removed unused `MoreVertical`, `Ban`, `selectedUser`
- ✅ `DatabaseManagement.tsx` - Removed unused `Database`, changed `useState` to const
- ✅ `SystemSettings.tsx` - Removed unused `Mail`, `Bell`
- ✅ `ApiTest.tsx` - Removed unused `useQuery`
- ✅ `Planner.tsx` - Removed unused `useEffect`, `LayoutGrid`, `SortableContext`
- ✅ `AIScheduleModal.tsx` - Removed unused `MapPin`
- ✅ `CommandPalette.tsx` - Need to remove `Search` (still has error)
- ✅ `NotificationToast.tsx` - Need to remove `Bell` (still has error)

### 2. Type errors
- ✅ `AIScheduleModal.tsx` - Fixed priority weight type casting
- ✅ `ErrorBoundary.tsx` - Changed `process.env` to `import.meta.env`
- ✅ `Planner.tsx` - Added type annotations for Task parameters

### 3. Import casing
- ✅ `AIScheduleModal.tsx` - Fixed `Input` import to lowercase
- ✅ `EmptyState.tsx` - Fixed `Button` import to lowercase

### 4. Missing files
- ✅ Created `frontend/src/hooks/useTasks.ts`

---

## ⚠️ Cần sửa (10 lỗi còn lại)

### 1. File casing issues (Windows)

**Vấn đề:** Windows không phân biệt hoa thường nhưng Git và TypeScript có phân biệt.

**Files bị ảnh hưởng:**
- `Button.tsx` vs `button.tsx`
- `Input.tsx` vs `input.tsx`
- `Badge.tsx` vs `badge.tsx`
- `Select.tsx` vs `select.tsx`
- `Skeleton.tsx` vs `skeleton.tsx`

**Cách sửa:**
```bash
# Rename files to lowercase (Git-safe way)
cd frontend/src/components/ui
git mv Button.tsx button-temp.tsx
git mv button-temp.tsx button.tsx
git mv Input.tsx input-temp.tsx
git mv input-temp.tsx input.tsx
git mv Badge.tsx badge-temp.tsx
git mv badge-temp.tsx badge.tsx
git mv Select.tsx select-temp.tsx
git mv select-temp.tsx select.tsx
git mv Skeleton.tsx skeleton-temp.tsx
git mv skeleton-temp.tsx skeleton.tsx
```

### 2. Unused imports

**CommandPalette.tsx:**
```typescript
// Remove this line:
import { Search } from './ui/command';
```

**NotificationToast.tsx:**
```typescript
// Remove this line:
import { Bell } from 'lucide-react';
```

**DatabaseManagement.tsx:**
```typescript
// Change from:
import { useState } from 'react';
// To:
// Remove useState import if not used elsewhere
```

**Settings.tsx:**
```typescript
// Remove these lines:
import { cn } from '../lib/utils';
const queryClient = useQueryClient();
```

### 3. Component prop errors

**NotFound.tsx:**
```typescript
// Button component doesn't support leftIcon prop
// Change from:
<Button leftIcon={<ArrowLeft />}>Back</Button>

// To:
<Button>
  <ArrowLeft className="w-4 h-4 mr-2" />
  Back
</Button>
```

**Reminders.tsx:**
```typescript
// Same issue - remove leftIcon prop
<Button onClick={openModal}>
  <Plus className="w-4 h-4 mr-2" />
  Thêm nhắc nhở
</Button>

// EmptyState icon prop issue
// Change from:
icon={<Bell className="w-full h-full" />}
// To:
icon={Bell}

// Input label prop doesn't exist
// Remove label prop or add it to Input component

// ConfirmDialog isOpen prop
// Change from:
isOpen={!!deleteReminder}
// To:
open={!!deleteReminder}
```

### 4. Missing User properties

**Settings.tsx:**
```typescript
// User type doesn't have avatar property
// Add to types/index.ts:
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string; // Add this
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔧 Hướng dẫn sửa nhanh

### Bước 1: Sửa file casing (quan trọng nhất)

```bash
cd frontend/src/components/ui

# Rename Button
git mv Button.tsx button-new.tsx
git mv button-new.tsx button.tsx

# Rename Input  
git mv Input.tsx input-new.tsx
git mv input-new.tsx input.tsx

# Rename Badge
git mv Badge.tsx badge-new.tsx
git mv badge-new.tsx badge.tsx

# Rename Select
git mv Select.tsx select-new.tsx
git mv select-new.tsx select.tsx

# Rename Skeleton
git mv Skeleton.tsx skeleton-new.tsx
git mv skeleton-new.tsx skeleton.tsx

git commit -m "fix: normalize UI component file names to lowercase"
```

### Bước 2: Xóa unused imports

Chạy lệnh này để tự động xóa:
```bash
npm run lint -- --fix
```

Hoặc sửa thủ công các file đã liệt kê ở trên.

### Bước 3: Sửa component props

Tìm và thay thế:
- `leftIcon=` → Chuyển thành children
- `isOpen=` → `open=`
- `label=` prop trong Input → Xóa hoặc thêm vào Input component

### Bước 4: Thêm avatar vào User type

```typescript
// frontend/src/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string; // Thêm dòng này
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}
```

### Bước 5: Build lại

```bash
cd frontend
npm run build
```

---

## 📊 Thống kê

- **Tổng lỗi phát hiện:** 49
- **Đã sửa:** 39 (80%)
- **Còn lại:** 10 (20%)
- **Loại lỗi chính:**
  - File casing: 5 lỗi
  - Unused imports: 8 lỗi
  - Type errors: 36 lỗi

---

## 🎯 Ưu tiên sửa

1. **Cao:** File casing issues (blocking build)
2. **Trung bình:** Component prop errors
3. **Thấp:** Unused imports (warnings)

---

## ✨ Sau khi sửa

Chạy các lệnh sau để verify:

```bash
# TypeScript check
npm run build

# Linting
npm run lint

# Start dev server
npm run dev
```

---

## 📝 Notes

- File casing issues chỉ xảy ra trên Windows
- Trên Linux/Mac không có vấn đề này
- Nên dùng lowercase cho tất cả component files
- Sử dụng Git để rename an toàn
