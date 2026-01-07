# memoryceipt - Receipt Photobooth

A beautifully designed mobile photobooth application for Samsung Galaxy Tab A11 that captures memories and prints them instantly on your XP T80A thermal printer via USB OTG.

## ✨ Features

### Beautiful Interface
- **Custom Branding**: Scenic landscape header with "memoryceipt" branding
- **Clean Design**: Minimalist, professional interface matching your brand
- **Black & White Preview**: Photos shown in classic black and white style
- **Multiple Templates**: Choose from 3 different photo layouts

### Photo Templates
1. **Single** (▢) - One large photo perfect for portraits
2. **Double** (▦) - Two photos stacked vertically for before/after or duo shots
3. **Quad** (▣) - Four photos in a 2x2 grid for photo booth strips

### Smart Capture System
- **3-Second Countdown**: Get ready before each photo
- **Auto Multi-Shot**: Automatically captures multiple photos for selected template
- **Progress Tracking**: Shows "Photo X of Y captured" between shots
- **Instant Printing**: Prints immediately after all photos captured

### Print Format
```
        memoryceipt
        ────────────────
        Jan 07, 2025, 01:30 PM
        ────────────────

        [Photo(s) - B&W]

        capture this memory
```

## 📱 User Experience

### Flow for Single Photo
1. Select "Single" template
2. Tap "capture this memory" button
3. See 3-second countdown (3... 2... 1...)
4. Photo captured and prints automatically
5. Done! Receive your printed memory

### Flow for Multiple Photos
1. Select "Double" or "Quad" template
2. Tap "capture this memory" button
3. First photo: 3-second countdown → capture
4. Brief pause with progress message
5. Second photo: 3-second countdown → capture
6. (Repeat for Quad template)
7. All photos print on one receipt
8. Done! Receive your photo strip

## 🎨 Interface Layout

```
┌─────────────────────────┐
│   🏞️ Landscape Scene    │
│                         │
│        with             │
│    memoryceipt          │
├─────────────────────────┤
│                         │
│  ┌─────────────────┐   │
│  │                 │   │
│  │  Camera Preview │   │
│  │   (Black/White) │   │
│  │                 │   │
│  └─────────────────┘   │
│                         │
├─────────────────────────┤
│   Choose Layout         │
│  ┌───┐ ┌───┐ ┌───┐    │
│  │ ▢ │ │ ▦ │ │ ▣ │    │
│  └───┘ └───┘ └───┘    │
├─────────────────────────┤
│                         │
│ capture this memory     │
│                         │
└─────────────────────────┘
```

## 🚀 Setup Instructions

### Hardware Requirements
- Samsung Galaxy Tab A11 (Android tablet)
- XP T80A Thermal Receipt Printer (80mm)
- USB OTG cable
- 80mm thermal receipt paper

### Installation Steps

1. **Connect Printer**
   ```
   Samsung Tab ← USB OTG Cable → XP T80A Printer
   ```
   - Plug USB OTG cable into tablet
   - Connect printer to cable
   - Turn on printer
   - Load thermal paper

2. **Install Expo Go**
   - Open Google Play Store
   - Search "Expo Go"
   - Install and open

3. **Load App**
   - Scan the QR code with Expo Go
   - Wait for app to load (30-60 seconds)
   - Grant camera permission when prompted

4. **Test Connection**
   - Look for green "capture this memory" button
   - If grayed out, printer not detected
   - Tap ⚠️ prompt to reconnect

## 📖 How to Use

### For Guests/Users

1. **Choose Your Style**
   - Tap one of the three layout buttons:
     - **▢ Single**: One big photo
     - **▦ Double**: Two photos stacked
     - **▣ Quad**: Four photo grid

2. **Get Ready**
   - Position yourself in the camera frame
   - Camera shows black and white preview
   - Tap the green "capture this memory" button

3. **Strike a Pose**
   - Watch the countdown: 3... 2... 1... SNAP!
   - For multi-photo templates:
     - Photo 1 captures
     - See "Photo 1 of 2 captured"
     - New countdown starts
     - Photo 2 captures
     - (Continue for Quad template)

4. **Receive Your Memory**
   - Printing happens automatically
   - Receipt prints with timestamp and your photos
   - Receipt auto-cuts when done
   - Take your memory strip!

### For Operators

**Setup Before Event:**
- Fully charge tablet
- Load plenty of paper in printer
- Test print to ensure connection
- Set default template based on event (optional)
- Position tablet at standing height

**During Event:**
- Keep an eye on paper supply
- Watch for paper jams
- If connection lost, tap ⚠️ prompt
- Can switch templates between users

**Troubleshooting:**
- Gray button = printer disconnected
- Tap reconnect prompt
- Check USB cable connection
- Ensure printer has power and paper

## 🎨 Design Details

### Colors
- **Primary**: #6B8E6F (Sage Green)
- **Text**: #2D2D2D (Dark Gray)
- **Background**: #FEFEFE (Off-White)
- **Sky**: #A8D5E2 (Light Blue)
- **Hills**: #7BA37C, #8CB889 (Green shades)

### Typography
- **Brand**: Large, bold sans-serif
- **Body**: Clean, readable sans-serif
- **Emphasis**: Green accent on "ceipt"

### Layout Philosophy
- **Spacious**: Generous white space
- **Centered**: All elements aligned center
- **Touch-Friendly**: Large tap targets
- **Clear Hierarchy**: Important elements prominent

## 🔧 Technical Details

### Image Processing
- **Resolution**: 384px width (optimal for 80mm printer)
- **Format**: JPEG with 85% compression
- **Effect**: Converted to grayscale for classic look
- **Aspect Ratio**: Preserved from original

### Multi-Photo Layouts

**Single (1 photo):**
```
[Header]
[Photo - 384px wide]
[Footer]
```

**Double (2 photos):**
```
[Header]
[Photo 1 - 384px wide]
[Small gap]
[Photo 2 - 384px wide]
[Footer]
```

**Quad (4 photos):**
```
[Header]
[Photo 1 - 384px wide]
[Small gap]
[Photo 2 - 384px wide]
[Small gap]
[Photo 3 - 384px wide]
[Small gap]
[Photo 4 - 384px wide]
[Footer]
```

### Print Specifications
- **Printer**: XP T80A (ESC/POS compatible)
- **Paper Width**: 80mm
- **Print Width**: 72mm (384 pixels)
- **Resolution**: 203 DPI
- **Auto-Cut**: Yes, after 3 line feeds

### Tech Stack
- **Platform**: Expo (React Native)
- **Camera**: expo-camera
- **Image Processing**: expo-image-manipulator
- **Printing**: react-native-thermal-receipt-printer
- **Target**: Android (USB OTG required)

## 📊 Usage Scenarios

### Perfect For:
- **Weddings**: Guest memories with multiple poses
- **Birthday Parties**: Fun photo strips for kids
- **Corporate Events**: Professional single shots
- **Festivals**: Quick memory captures
- **Trade Shows**: Brand activation with custom template
- **Photo Booths**: Classic 4-photo strips

### Template Recommendations:
- **Formal Events**: Single template for professional look
- **Parties**: Quad template for fun photo strips
- **Couples**: Double template for duo shots
- **Kids Events**: Quad for multiple silly faces

## 🔐 Privacy & Data

- **No Storage**: Photos are NOT saved anywhere
- **Instant Only**: Each photo exists only during printing
- **No Cloud**: Everything stays local
- **No Accounts**: No login or registration needed
- **Privacy First**: Your memories stay yours

## ⚡ Performance Tips

1. **Lighting**: Good lighting = better prints
2. **Paper Quality**: Use high-quality thermal paper
3. **Clean Printer**: Clean print head regularly
4. **Battery**: Keep tablet charged during events
5. **Storage Space**: App needs minimal space

## 🎯 Event Setup Guide

### 30 Minutes Before Event:
- [ ] Charge tablet fully
- [ ] Test printer connection
- [ ] Load fresh paper roll
- [ ] Test print all templates
- [ ] Position at optimal height
- [ ] Set up lighting if needed

### During Event:
- [ ] Monitor paper level
- [ ] Watch for jams
- [ ] Assist guests if needed
- [ ] Keep area tidy

### After Event:
- [ ] Power down printer
- [ ] Disconnect tablet
- [ ] Store securely

## 📝 FAQs

**Q: Can I see a preview before printing?**
A: No, it prints immediately after capture for speed and simplicity.

**Q: Are photos saved anywhere?**
A: No, photos are printed and immediately discarded for privacy.

**Q: Can I change the number of photos after starting?**
A: No, select your template before starting. You can change between sessions.

**Q: What if I blink in a multi-photo template?**
A: Each photo is separate. You'll have other chances in the same session.

**Q: Can I print color photos?**
A: No, the XP T80A is a thermal printer that only prints in black and white.

**Q: How long does printing take?**
A: About 10-15 seconds for a full receipt with photos.

**Q: Can I customize the header/branding?**
A: Yes! Contact the developer to customize for your event or brand.

## 🛠️ Customization Options

Want to personalize for your event? You can customize:
- Event name/logo in header
- Landscape scene design
- Template options
- Button text
- Color scheme
- Print layout

## 📞 Support

For technical issues:
1. Check printer connection (USB OTG cable)
2. Verify printer has power and paper
3. Tap reconnect prompt if button grayed out
4. Restart app if needed
5. Restart tablet if problems persist

## 🎉 Credits

**memoryceipt** - Where memories become receipts you'll actually keep.

Built with care for creating instant, tangible memories in our digital world.

---

**Version**: 2.0.0  
**Platform**: Android (Expo/React Native)  
**Printer**: XP T80A (ESC/POS)  
**License**: Custom for event use

*Capture memories. Print instantly. Keep forever.* 🎉📸🖨️
