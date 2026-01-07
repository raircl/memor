import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import EscPosPrinter from 'react-native-esc-pos-printer';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PhotoboothScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isPrinting, setIsPrinting] = useState(false);
  const [printerConnected, setPrinterConnected] = useState(false);
  const [printerInfo, setPrinterInfo] = useState<string>('');
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    initPrinter();
  }, []);

  const initPrinter = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Not Supported', 'USB printing is only supported on Android devices');
      return;
    }

    try {
      const printers = await EscPosPrinter.discover({
        type: EscPosPrinter.PrinterTypes.USB,
      });
      
      if (printers.length === 0) {
        setPrinterInfo('No USB printer detected. Please connect your XP T80A printer via USB OTG cable.');
        return;
      }

      // Connect to the first available USB printer
      const printer = printers[0];
      setPrinterConnected(true);
      setPrinterInfo(`Printer connected: ${printer.name || 'XP T80A'}`);
      
    } catch (error) {
      console.error('Printer initialization error:', error);
      setPrinterInfo('Failed to connect to printer. Make sure USB OTG cable is connected.');
    }
  };

  const handleCapture = async () => {
    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera not ready');
      return;
    }

    if (!printerConnected) {
      Alert.alert('Printer Not Connected', 'Please connect your USB printer first.');
      return;
    }

    try {
      setIsPrinting(true);

      // Capture photo
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      // Process and print
      await processAndPrint(photo.uri);

    } catch (error) {
      console.error('Capture error:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    } finally {
      setIsPrinting(false);
    }
  };

  const processAndPrint = async (imageUri: string) => {
    try {
      // Get list of USB printers
      const printers = await EscPosPrinter.discover({
        type: EscPosPrinter.PrinterTypes.USB,
      });

      if (printers.length === 0) {
        throw new Error('No printer found');
      }

      const printer = printers[0];

      // Resize image to fit thermal printer width (384 pixels for 80mm printer)
      const manipResult = await manipulateAsync(
        imageUri,
        [{ resize: { width: 384 } }],
        { compress: 0.8, format: SaveFormat.JPEG, base64: true }
      );

      if (!manipResult.base64) {
        throw new Error('Failed to convert image to base64');
      }

      // Get current timestamp
      const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      // Print receipt with timestamp and image
      await EscPosPrinter.printFormattedText({
        printerAddress: printer.address,
        printerType: EscPosPrinter.PrinterTypes.USB,
        text: [
          { text: '\n' },
          { text: 'PHOTO RECEIPT\n', align: 'center', fontFamily: 'A', fontSize: 2 },
          { text: '================\n', align: 'center' },
          { text: `${timestamp}\n`, align: 'center' },
          { text: '================\n', align: 'center' },
          { text: '\n' },
        ],
      });

      // Print the image
      await EscPosPrinter.printImage({
        printerAddress: printer.address,
        printerType: EscPosPrinter.PrinterTypes.USB,
        imageBase64: manipResult.base64,
        imageWidth: 384,
      });

      // Feed paper and cut
      await EscPosPrinter.printFormattedText({
        printerAddress: printer.address,
        printerType: EscPosPrinter.PrinterTypes.USB,
        text: [
          { text: '\n\n\n' },
        ],
        cutPaper: true,
      });

      Alert.alert('Success', 'Photo printed successfully!');

    } catch (error) {
      console.error('Print error:', error);
      Alert.alert('Print Error', 'Failed to print photo. Please check printer connection.');
      throw error;
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          {/* Header with printer status */}
          <View style={styles.header}>
            <Text style={styles.title}>PHOTO BOOTH</Text>
            <View style={[
              styles.printerStatus,
              { backgroundColor: printerConnected ? '#4CAF50' : '#f44336' }
            ]}>
              <Text style={styles.printerStatusText}>
                {printerConnected ? '● Printer Ready' : '● No Printer'}
              </Text>
            </View>
            {printerInfo ? (
              <Text style={styles.printerInfo}>{printerInfo}</Text>
            ) : null}
          </View>

          {/* Center guide frame */}
          <View style={styles.centerContainer}>
            <View style={styles.frameGuide}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>

          {/* Bottom controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
            >
              <Text style={styles.flipButtonText}>🔄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.captureButton, isPrinting && styles.captureButtonDisabled]}
              onPress={handleCapture}
              disabled={isPrinting || !printerConnected}
            >
              {isPrinting ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.reconnectButton}
              onPress={initPrinter}
            >
              <Text style={styles.reconnectButtonText}>🔌</Text>
            </TouchableOpacity>
          </View>

          {isPrinting && (
            <View style={styles.printingOverlay}>
              <Text style={styles.printingText}>Printing...</Text>
            </View>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.75)',
  },
  printerStatus: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  printerStatusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  printerInfo: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameGuide: {
    width: 280,
    height: 360,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fff',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  flipButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  flipButtonText: {
    fontSize: 28,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
  reconnectButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  reconnectButtonText: {
    fontSize: 28,
  },
  printingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  printingText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
});
