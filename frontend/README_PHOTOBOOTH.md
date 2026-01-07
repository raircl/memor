# Receipt Photobooth App

A simple mobile photobooth application for Samsung Galaxy Tab A11 that captures photos and prints them immediately to an XP T80A thermal printer via USB OTG.

## Features

- **Simple Camera Interface**: Clean, full-screen camera preview with easy-to-use controls
- **Immediate Printing**: Photos print automatically after capture with timestamp
- **USB OTG Printing**: Direct printing to XP T80A thermal receipt printer
- **Status Indicators**: Real-time printer connection status
- **Android Optimized**: Built specifically for Samsung Galaxy Tab A11

## Requirements

### Hardware
- Samsung Galaxy Tab A11 (Android tablet)
- XP T80A Thermal Receipt Printer (80mm)
- USB OTG cable
- Receipt paper (80mm width)

### Software
- Expo Go app installed on the tablet
- This app running on the tablet

## Setup Instructions

### 1. Connect the Printer
1. Connect the XP T80A printer to your Samsung Galaxy Tab using the USB OTG cable
2. Turn on the printer
3. Load receipt paper into the printer

### 2. Install and Run the App
1. Install Expo Go from Google Play Store on your tablet
2. Scan the QR code provided by the development server
3. The app will load on your tablet

### 3. Grant Camera Permission
- When the app first opens, it will request camera permission
- Tap "Grant Permission" to allow the app to use the camera

### 4. Connect to Printer
- The app will automatically attempt to detect your USB printer
- If the printer shows as "Not Connected", tap the 🔌 button to reconnect
- When connected, you'll see "● Printer Ready" in green

## How to Use

### Taking and Printing Photos

1. **Position**: Stand in front of the camera within the frame guides
2. **Capture**: Tap the large white circle button at the bottom
3. **Automatic Print**: The photo will immediately print with a timestamp header
4. **Done**: The printed receipt will cut automatically

### Controls

- **Left Button (🔄)**: Switch between front and back camera
- **Center Button (⚪)**: Capture photo and print
- **Right Button (🔌)**: Reconnect to printer if disconnected

## Printed Receipt Format

```
        PHOTO RECEIPT
        ================
        01/07/2025, 12:30:45 PM
        ================

        [Your Photo Here]



        [Auto-cut]
```

## Troubleshooting

### Printer Not Detected
- Ensure USB OTG cable is properly connected
- Check that the printer is powered on
- Tap the 🔌 reconnect button
- Try unplugging and reconnecting the USB cable

### Photo Not Printing
- Verify printer has paper loaded
- Check printer power and connection
- Ensure "● Printer Ready" status shows in green
- Try capturing another photo

### Camera Not Working
- Grant camera permission when prompted
- Check that no other app is using the camera
- Restart the app if needed

### Print Quality Issues
- Use good quality thermal receipt paper
- Ensure printer head is clean
- Check that photos are well-lit for better print quality

## Technical Details

### Photo Processing
- Images are automatically resized to 384px width (optimal for 80mm thermal printers)
- JPEG format with 80% compression
- Base64 encoding for thermal printer compatibility

### Print Specifications
- Printer: XP T80A (ESC/POS compatible)
- Paper width: 80mm
- Print width: 72mm (384 pixels)
- Resolution: 203 DPI

### Supported Platforms
- Android only (USB OTG printing requires Android)
- Tested on Samsung Galaxy Tab A11
- Requires Android 5.0 or higher

## Development

### Technologies Used
- **Frontend**: React Native + Expo
- **Camera**: expo-camera
- **Image Processing**: expo-image-manipulator
- **Printing**: react-native-thermal-receipt-printer
- **Platform**: Expo (React Native)

### Project Structure
```
/app/frontend/
├── app/
│   └── index.tsx          # Main photobooth screen
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## Notes

- Photos are **not saved** - they are printed and immediately discarded (as per requirements)
- Each print includes a timestamp for record-keeping
- The app prints immediately without preview (as requested)
- Optimized for fast operation - perfect for events and gatherings

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all hardware connections
3. Ensure USB OTG is enabled on your device
4. Test printer with another app to confirm it's working

---

**Built with ❤️ for instant photo printing**
