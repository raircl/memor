# memoryceipt - Visual Interface Guide

## Complete Interface Preview

### 1. Landing Screen (Camera Permission)
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         memoryceipt             │
│                                 │
│  Camera permission is required  │
│                                 │
│     ┌─────────────────┐        │
│     │ Grant Permission │        │
│     └─────────────────┘        │
│                                 │
└─────────────────────────────────┘
```

### 2. Main Interface (After Permission Granted)
```
┌─────────────────────────────────┐
│      🌤️                🌤️      │
│  🟢🟢🟢    🟢🟢🟢    🟢🟢🟢  │  ← Landscape header
│  🟢🟢🟢🟢  🟢🟢🟢🟢  🟢🟢🟢🟢│    (hills & sky)
│                                 │
│           with                  │
│       memoryceipt               │  ← Brand name
│       ─────────                 │    (memory in black
│                                 │     ceipt in green)
├─────────────────────────────────┤
│                                 │
│   ┌─────────────────────┐      │
│   │                     │      │
│   │                     │      │
│   │   Camera Preview    │      │  ← Black camera box
│   │   (Black & White)   │      │    (shows live feed)
│   │                     │      │
│   │                     │      │
│   └─────────────────────┘      │
│                                 │
├─────────────────────────────────┤
│      Choose Layout              │  ← Template selection
│                                 │
│   ┌───┐    ┌───┐    ┌───┐     │
│   │ ▢ │    │ ▦ │    │ ▣ │     │  ← Template buttons
│   │   │    │   │    │   │     │    (Single/Double/Quad)
│   └───┘    └───┘    └───┘     │
│  Single   Double    Quad       │
│                                 │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ capture this memory     │   │  ← Main action button
│  └─────────────────────────┘   │    (green background)
│                                 │
└─────────────────────────────────┘
```

## UI States

### 3. Countdown State (During Capture)
```
┌─────────────────────────────────┐
│      Landscape Header...        │
│       memoryceipt              │
├─────────────────────────────────┤
│   ┌─────────────────────┐      │
│   │                     │      │
│   │        3            │      │  ← Big countdown
│   │                     │      │    number overlays
│   │                     │      │    camera
│   └─────────────────────┘      │
│                                 │
│  [Template buttons grayed out] │
│  [Button disabled]              │
└─────────────────────────────────┘
```

### 4. Multi-Photo Progress
```
┌─────────────────────────────────┐
│      Landscape Header...        │
│       memoryceipt              │
├─────────────────────────────────┤
│   ┌─────────────────────┐      │
│   │  Photo 1 of 2       │      │  ← Progress indicator
│   │    captured          │      │    at top of camera
│   │                     │      │
│   │  1 more to go...    │      │
│   └─────────────────────┘      │
│                                 │
│  [Next countdown starting...]   │
└─────────────────────────────────┘
```

### 5. Printing State
```
┌─────────────────────────────────┐
│      Landscape Header...        │
│       memoryceipt              │
├─────────────────────────────────┤
│   ┌─────────────────────┐      │
│   │         ⏳          │      │
│   │                     │      │  ← Loading spinner
│   │  Printing your      │      │    with message
│   │    memory...        │      │
│   └─────────────────────┘      │
│                                 │
│  [All controls disabled]        │
└─────────────────────────────────┘
```

### 6. Printer Disconnected State
```
┌─────────────────────────────────┐
│      Normal interface...        │
│                                 │
│  [Camera preview visible]       │
│  [Templates visible]            │
│                                 │
│  ┌─────────────────────────┐   │
│  │ capture this memory     │   │  ← Button grayed out
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ⚠️ Tap to connect      │   │  ← Warning prompt
│  │    printer              │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

## Color Palette

### Primary Colors
- **Sage Green**: `#6B8E6F` - Buttons, accents, "ceipt"
- **Dark Gray**: `#2D2D2D` - Main text, "memory"
- **Off White**: `#FEFEFE` - Background
- **Light Gray**: `#F5F5F5` - Inactive template buttons

### Landscape Colors
- **Sky Blue**: `#A8D5E2` - Sky background
- **Cloud White**: `#FFFFFF` - Clouds
- **Hill Green 1**: `#7BA37C` - Outer hills
- **Hill Green 2**: `#8CB889` - Center hill

### State Colors
- **Active**: `#E8F4E9` - Selected template background
- **Warning**: `#FFF3CD` - Printer warning background
- **Warning Text**: `#856404` - Warning text

## Typography

### Font Sizes
- **Brand Name**: 36px, bold
- **"with" text**: 14px, regular
- **Button Text**: 18px, semi-bold
- **Template Labels**: 12px, medium
- **Countdown**: 120px, bold
- **Progress**: 18px, semi-bold

### Font Styles
- **Primary Font**: Sans-serif (system default)
- **Weight**: 400 (regular), 600 (semi-bold), 700 (bold)
- **Letter Spacing**: 0.5px on buttons

## Spacing & Layout

### Margins
- **Screen Padding**: 24px horizontal
- **Header Top**: 40px
- **Section Gaps**: 20px between major sections

### Element Sizes
- **Camera Preview**: ~45% of screen height
- **Template Buttons**: 80px wide, with 16px gap
- **Main Button**: Full width minus 48px (24px each side)
- **Button Height**: 56px (main), 48px (templates)

### Border Radius
- **Camera Preview**: 16px
- **Main Button**: 30px (pill shape)
- **Template Buttons**: 12px
- **Landscape Elements**: 15-120px (various)

## Touch Targets

### Minimum Sizes (Following iOS/Android Guidelines)
- **Main Button**: 56px height ✓ (exceeds 44px minimum)
- **Template Buttons**: 48px x 48px ✓
- **Permission Button**: 48px height ✓

### Tap Areas
All interactive elements have adequate spacing to prevent mis-taps:
- Template buttons: 16px gap between
- Main button: 24px clearance on sides
- Reconnect prompt: Full width for easy tap

## Animations & Transitions

### Countdown
- **Duration**: 1 second per number
- **Effect**: Fade in/out
- **Size**: Large (120px) for visibility

### Template Selection
- **Effect**: Smooth color transition
- **Duration**: 200ms
- **Property**: Background color + border

### Button States
- **Hover**: N/A (touch interface)
- **Pressed**: Slight opacity change (0.8)
- **Disabled**: Opacity 0.6, no interaction

### Printing Overlay
- **Effect**: Fade in dark overlay
- **Duration**: 300ms
- **Spinner**: Continuous rotation

## Accessibility

### Color Contrast
- **Text on Background**: High contrast (WCAG AA+)
- **Button Text**: White on sage green (passes)
- **Warning Text**: Dark on yellow (passes)

### Touch Targets
- All buttons exceed 44x44px minimum
- Adequate spacing between tap targets
- Clear visual feedback on interaction

### Visual Feedback
- **Selected State**: Color change + border
- **Disabled State**: Grayed out appearance
- **Progress**: Text + visual indicators
- **Errors**: Warning banner with icon

## Print Layout Preview

### Single Photo Receipt
```
    memoryceipt
    ────────────────
    Jan 07, 2025, 01:30 PM
    ────────────────

    ┌──────────────┐
    │              │
    │   Photo 1    │
    │   (384px)    │
    │              │
    └──────────────┘

    capture this memory


    [Cut line]
```

### Double Photo Receipt
```
    memoryceipt
    ────────────────
    Jan 07, 2025, 01:30 PM
    ────────────────

    ┌──────────────┐
    │   Photo 1    │
    └──────────────┘

    ┌──────────────┐
    │   Photo 2    │
    └──────────────┘

    capture this memory


    [Cut line]
```

### Quad Photo Receipt
```
    memoryceipt
    ────────────────
    Jan 07, 2025, 01:30 PM
    ────────────────

    ┌──────────────┐
    │   Photo 1    │
    └──────────────┘

    ┌──────────────┐
    │   Photo 2    │
    └──────────────┘

    ┌──────────────┐
    │   Photo 3    │
    └──────────────┘

    ┌──────────────┐
    │   Photo 4    │
    └──────────────┘

    capture this memory


    [Cut line]
```

---

## Implementation Notes

### Camera Preview
- Uses `expo-camera` with CameraView component
- Automatically switches between front/back cameras
- Shows live preview in real-time
- B&W conversion happens during processing, not live

### Template System
- State managed with useState hook
- Changes disabled during capture/print
- Visual feedback for active selection
- Icons use Unicode box drawing characters

### Countdown Timer
- useEffect hook manages timer
- Full-screen overlay during countdown
- Automatically triggers capture at 0
- Can't be interrupted once started

### Multi-Photo Flow
- Captures stored in array state
- Progress tracked and displayed
- Automatic countdown between shots
- All photos printed together at end

---

**Ready to capture memories!** 🎉📸
