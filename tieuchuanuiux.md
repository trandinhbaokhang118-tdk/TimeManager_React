# UI/UX & Color Standard — Time Manager Web (React)

Phiên bản: v1.0  
Mục tiêu: Giao diện **đẹp, trending, hiện đại**, thống nhất từ User → Admin; ưu tiên **quản lý thời gian** (Task/Calendar/Focus/Analytics).

---

## 1) Design Principles
- **Clarity > Decoration**: thông tin “Hôm nay / Ưu tiên / Lịch” phải nổi bật.
- **Fast actions**: thao tác chính ≤ 3 click (Quick Add, Start Focus, Schedule).
- **Consistency**: 1 hệ token, 1 hệ component dùng lại.
- **Accessible by default**: keyboard + focus rõ ràng.

---

## 2) Layout & Grid
- Grid: **8px system** (4/8/12/16/24/32/48).
- Container: max-width 1200–1280px; padding: 16 (mobile), 24 (tablet), 32 (desktop).
- App Shell:
  - Desktop: **Sidebar + Topbar**
  - Mobile: **Bottom nav hoặc Drawer**
- Elevation tiers:
  - **Surface-1** (card) < **Surface-2** (popover) < **Surface-3** (modal)

---

## 3) Typography
- Font: Inter / System UI (fallback).
- Scale:
  - H1 28–32 / 700
  - H2 22–24 / 700
  - H3 18–20 / 600
  - Body 14–16 / 400–500
  - Caption 12–13 / 400
- Line-height: 1.4–1.6
- **Heading luôn đậm hơn body**; secondary text giảm tương phản.

---

## 4) Color Tokens (CSS Variables)
> Light: **Galaxy Aqua** (xanh thiên hà).  
> Dark: **Deep Glossy Black** (đen bóng thẳm sâu) + neon nổi bật.

### 4.1 Light Mode (Galaxy Aqua)
```css
:root[data-theme="light"]{
  --bg: #F6FBFF;
  --bg-gradient: radial-gradient(1200px 600px at 20% 10%, rgba(61,214,255,.22), transparent 60%),
                 radial-gradient(900px 500px at 80% 30%, rgba(138,92,246,.14), transparent 55%),
                 linear-gradient(180deg, #F6FBFF 0%, #F2F9FF 40%, #F7FBFF 100%);
  --surface-1: rgba(255,255,255,.78);
  --surface-2: rgba(255,255,255,.90);
  --surface-3: rgba(255,255,255,.96);

  --border: rgba(15,23,42,.10);
  --shadow: 0 10px 30px rgba(2,8,23,.08);

  --text: #0B1220;
  --text-2: rgba(11,18,32,.72);
  --text-3: rgba(11,18,32,.52);

  --primary: #12C2FF;
  --primary-2: #3B82F6;
  --primary-gradient: linear-gradient(135deg, #12C2FF 0%, #3B82F6 55%, #8B5CF6 100%);
  --focus: rgba(18,194,255,.55);

  --success: #16A34A;
  --warning: #F59E0B;
  --danger:  #EF4444;
  --info:    #3B82F6;
}
:root[data-theme="dark"]{
  --bg: #070A0F;
  --bg-gradient: radial-gradient(900px 500px at 20% 10%, rgba(18,194,255,.10), transparent 60%),
                 radial-gradient(900px 600px at 80% 30%, rgba(139,92,246,.10), transparent 55%),
                 linear-gradient(180deg, #070A0F 0%, #05070B 60%, #070A0F 100%);
  --surface-1: rgba(15,23,42,.55);
  --surface-2: rgba(15,23,42,.68);
  --surface-3: rgba(15,23,42,.80);

  --border: rgba(148,163,184,.14);
  --shadow: 0 18px 60px rgba(0,0,0,.55);

  --text: rgba(248,250,252,.92);
  --text-2: rgba(248,250,252,.72);
  --text-3: rgba(248,250,252,.52);

  --primary: #12C2FF;
  --primary-2: #8B5CF6;
  --primary-gradient: linear-gradient(135deg, #12C2FF 0%, #3B82F6 50%, #8B5CF6 100%);
  --focus: rgba(18,194,255,.60);

  --success: #22C55E;
  --warning: #FBBF24;
  --danger:  #F87171;
  --info:    #60A5FA;
}
5) Visual Hierarchy Rules (bắt buộc)

CTA Primary luôn dùng --primary-gradient hoặc --primary + glow nhẹ (dark).

Text levels:

Primary: --text

Secondary: --text-2

Muted: --text-3

Borders mảnh, không dùng trắng đặc trên dark.

Glow/neon chỉ dùng cho: CTA + focus + active state (không lạm dụng).

6) Components Standard
Buttons

Variants: Primary / Secondary / Ghost / Danger

Primary:

bg: --primary-gradient

text: white

hover: tăng sáng 6–10%, nâng shadow

Focus ring: 2px --focus (bắt buộc)

Inputs

Height: 40–44px, radius 10–12

Default: surface + border

Focus: border --primary + ring --focus

Error: border --danger + helper text

Cards / Panels

bg: --surface-1, border --border, shadow --shadow

radius: 12–16

Badges (Status/Priority)

Status:

TODO: info

IN_PROGRESS: warning

DONE: success

OVERDUE: danger

Badge style: subtle bg + border + text đậm (không neon full)

7) States (mọi trang đều phải có)

Loading: skeleton (không chỉ spinner)

Empty: icon + title + action (Create/Refresh)

Error: message rõ + nút Retry

Success: toast

Destructive: confirm dialog (Delete/Ban)

8) Accessibility & Interaction

Keyboard:

Tab/Shift+Tab đi được mọi control

Enter submit form

ESC đóng modal/drawer

Focus: luôn thấy ring --focus

Click targets ≥ 40px (mobile)

Contrast: text quan trọng đạt tương phản tốt (ưu tiên WCAG AA)

9) Responsive Breakpoints

Mobile: < 640px

Tablet: 640–1024px

Desktop: ≥ 1024px
Quy tắc:

Sidebar chỉ desktop; mobile dùng bottom nav/drawer.

Filter bar trên Tasks/Calendar: collapse thành drawer/filter sheet trên mobile.

10) Page UI Requirements (tối thiểu)

Dashboard: summary cards + today plan + quick add + focus CTA

Tasks: filter/search sticky + list + detail drawer + bulk actions

Calendar: week/month switch + drag/drop block + overlap error

Focus: timer + zen mode + session history

Admin: table chuẩn (sort/filter/pagination) + confirm actions + audit log UI

11) Do/Don’t

Do

Dùng token, không hardcode màu rải rác

Giữ spacing/typography nhất quán

Ưu tiên thông tin “Today / Priority / Schedule”

Don’t

Lạm dụng neon/glow

Dùng nền phẳng đơn sắc gây mỏi mắt

Trộn nhiều font/màu không theo token