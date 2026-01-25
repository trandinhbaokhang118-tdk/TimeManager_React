# 🧪 Testing Guide - Verify All Fixes

## Quick Test Checklist

---

## 1. 📅 **Calendar Page** - Test Time Blocks

### Test Steps:
1. Navigate to `/calendar`
2. Click "Add Time Block" button
3. Fill in the form:
   - Title: "Team Meeting"
   - Date: Tomorrow
   - Start Time: 09:00
   - End Time: 10:00
4. Click "Create"

### Expected Results:
- ✅ Modal opens without errors
- ✅ Form validates correctly
- ✅ Time block appears on calendar
- ✅ No TypeScript errors in console

### Test Invalid Data:
1. Try End Time = 08:00 (before Start Time)
2. Expected: ❌ Error message "End time must be after start time"

---

## 2. ⏱️ **Focus Page** - Test Pomodoro Timer

### Test Steps:
1. Navigate to `/focus`
2. Click Play button
3. Wait 5 seconds
4. Click Pause button
5. Click Reset button
6. Click Zen Mode button

### Expected Results:
- ✅ Timer counts down correctly
- ✅ Pause/Resume works
- ✅ Reset works
- ✅ Zen mode opens fullscreen
- ✅ No console errors
- ✅ No memory leaks

### Test Auto-Switch:
1. Set timer to 1 second (for testing)
2. Let it complete
3. Expected: ✅ Auto-switches to break mode

---

## 3. ✅ **Tasks Page** - Test Task Creation

### Test Steps:
1. Navigate to `/tasks`
2. Click "Tạo mới" button
3. Fill in the form:
   - Title: "Complete Report"
   - Start Time: Today 09:00
   - Due Time: Today 17:00
   - Priority: HIGH
4. Click "Tạo"

### Expected Results:
- ✅ Task created successfully
- ✅ Appears in task list
- ✅ Shows correct times
- ✅ No errors

### Test Invalid Data:
1. Try Due Time = 08:00 (before Start Time = 09:00)
2. Expected: ❌ Error "Thời gian kết thúc phải sau thời gian bắt đầu"

---

## 4. 🔍 **Validation Tests**

### Test dueAt Validation:

#### Frontend Test:
```
1. Create task with:
   - startAt: 2026-01-20 10:00
   - dueAt: 2026-01-20 09:00 (BEFORE startAt)
   
Expected: ❌ Frontend error before API call
```

#### Backend Test:
```
1. Send API request:
POST /api/tasks
{
  "title": "Test",
  "startAt": "2026-01-20T10:00:00Z",
  "dueAt": "2026-01-20T09:00:00Z"
}

Expected: ❌ 400 Bad Request
{
  "code": "INVALID_TIME_RANGE",
  "message": "Due time must be after start time"
}
```

---

## 5. 🎨 **UI/UX Tests**

### Test Glass Morphism:
1. Check all pages have glass effect cards
2. Verify backdrop blur is visible
3. Check hover animations work

### Test Dark Mode:
1. Toggle dark mode
2. Verify:
   - ✅ Neon glow on buttons
   - ✅ Text is readable
   - ✅ Colors are correct
   - ✅ No white flashes

### Test Responsive:
1. Resize browser window
2. Verify:
   - ✅ Mobile layout works
   - ✅ Sidebar collapses
   - ✅ Cards stack properly

---

## 6. 🔄 **Integration Tests**

### Test Task → Reminder Flow:
```
1. Create task with:
   - startAt: 15 minutes from now
   - reminderMinutes: 10
   
2. Wait 5 minutes

3. Expected: 
   ✅ Reminder created in database
   ✅ Will trigger in 5 more minutes
```

### Test Calendar → Time Block:
```
1. Create time block for today
2. Check it appears on correct day
3. Delete time block
4. Verify it's removed
```

---

## 7. 🐛 **Error Handling Tests**

### Test Network Errors:
1. Disconnect internet
2. Try to create task
3. Expected: ❌ Error toast "Không thể tạo công việc"

### Test Invalid Tokens:
1. Clear localStorage
2. Try to access protected page
3. Expected: ✅ Redirect to /login

---

## 8. 🚀 **Performance Tests**

### Test Page Load:
1. Open DevTools → Network
2. Navigate to each page
3. Verify:
   - ✅ Load time < 1 second
   - ✅ No unnecessary requests
   - ✅ Images optimized

### Test Memory Leaks:
1. Open DevTools → Memory
2. Take heap snapshot
3. Navigate between pages 10 times
4. Take another snapshot
5. Verify: ✅ Memory doesn't grow significantly

---

## 9. ♿ **Accessibility Tests**

### Test Keyboard Navigation:
1. Use Tab key to navigate
2. Verify:
   - ✅ Focus ring visible
   - ✅ Can reach all buttons
   - ✅ Can submit forms with Enter

### Test Screen Reader:
1. Enable screen reader
2. Navigate pages
3. Verify:
   - ✅ Headings announced
   - ✅ Buttons have labels
   - ✅ Forms have labels

---

## 10. 🔐 **Security Tests**

### Test XSS Protection:
```
1. Try to create task with:
   title: "<script>alert('XSS')</script>"
   
Expected: ✅ Rendered as text, not executed
```

### Test SQL Injection:
```
1. Try to search with:
   search: "'; DROP TABLE tasks; --"
   
Expected: ✅ No database error, treated as text
```

---

## ✅ **Quick Smoke Test** (5 minutes)

Run this quick test to verify everything works:

```bash
# 1. Start backend
cd backend
npm run start:dev

# 2. Start frontend  
cd frontend
npm run dev

# 3. Open browser
http://localhost:5173

# 4. Quick checks:
✅ Login works
✅ Dashboard loads
✅ Create task works
✅ Calendar loads
✅ Focus timer works
✅ Dark mode toggles
✅ No console errors
```

---

## 🎯 **Expected Results Summary**

### All Tests Should Pass:
- ✅ 0 TypeScript errors
- ✅ 0 runtime errors
- ✅ All validations work
- ✅ All pages load
- ✅ All features work
- ✅ Dark mode works
- ✅ Responsive works
- ✅ No memory leaks

---

## 🐛 **If You Find Bugs**

### Report Format:
```
Page: [Calendar/Focus/Tasks/etc]
Action: [What you did]
Expected: [What should happen]
Actual: [What happened]
Error: [Console error if any]
```

---

## 📝 **Test Results Template**

```
Date: ___________
Tester: ___________

Calendar Tests:     ✅ / ❌
Focus Tests:        ✅ / ❌
Tasks Tests:        ✅ / ❌
Validation Tests:   ✅ / ❌
UI/UX Tests:        ✅ / ❌
Integration Tests:  ✅ / ❌
Error Handling:     ✅ / ❌
Performance:        ✅ / ❌
Accessibility:      ✅ / ❌
Security:           ✅ / ❌

Overall: ✅ PASS / ❌ FAIL

Notes:
_______________________
_______________________
```

---

**Status**: 📋 **READY FOR TESTING**
**Date**: January 19, 2026
