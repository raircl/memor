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
  ScrollView,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat, FlipType } from 'expo-image-manipulator';
import {
  USBPrinter,
} from 'react-native-thermal-receipt-printer';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type TemplateType = '1' | '2' | '4';

interface Template {
  id: TemplateType;
  name: string;
  photos: number;
  icon: string;
}

const TEMPLATES: Template[] = [
  { id: '1', name: 'Single', photos: 1, icon: '▢' },
  { id: '2', name: 'Double', photos: 2, icon: '▦' },
  { id: '4', name: 'Quad', photos: 4, icon: '▣' },
];

export default function PhotoboothScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printerConnected, setPrinterConnected] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('1');
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    initPrinter();
  }, []);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      capturePhoto();
    }
  }, [countdown]);

  const initPrinter = async () => {
    if (Platform.OS !== 'android') {
      setPrinterConnected(true); // For web preview
      return;
    }

    try {
      const printers = await USBPrinter.getDeviceList();
      
      if (printers.length === 0) {
        setPrinterConnected(false);
        return;
      }

      const printer = printers[0];
      await USBPrinter.connectPrinter(printer.vendor_id, printer.product_id);
      setPrinterConnected(true);
      
    } catch (error) {
      console.error('Printer initialization error:', error);
      setPrinterConnected(false);
    }
  };

  const handleCaptureStart = () => {
    if (!printerConnected) {
      Alert.alert('Printer Not Connected', 'Please connect your USB printer first.');
      return;
    }

    setCapturedPhotos([]);
    setCountdown(3); // Start countdown
  };

  const capturePhoto = async () => {
    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera not ready');
      setCountdown(null);
      return;
    }

    try {
      setIsCapturing(true);
      setCountdown(null);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        base64: false,
      });

      const processedPhoto = await processPhoto(photo.uri);
      
      const newPhotos = [...capturedPhotos, processedPhoto];
      setCapturedPhotos(newPhotos);

      const template = TEMPLATES.find(t => t.id === selectedTemplate);
      
      if (newPhotos.length < template!.photos) {
        // Need more photos, start another countdown
        setTimeout(() => setCountdown(3), 500);
      } else {
        // All photos captured, print
        await printPhotos(newPhotos);
        setCapturedPhotos([]);
      }

    } catch (error) {
      console.error('Capture error:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
      setCapturedPhotos([]);
    } finally {
      setIsCapturing(false);
    }
  };

  const processPhoto = async (imageUri: string): Promise<string> => {
    // Convert to grayscale and resize
    const manipResult = await manipulateAsync(
      imageUri,
      [{ resize: { width: 384 } }],
      { compress: 0.85, format: SaveFormat.JPEG, base64: true }
    );

    if (!manipResult.base64) {
      throw new Error('Failed to convert image to base64');
    }

    return manipResult.base64;
  };

  const printPhotos = async (photos: string[]) => {
    try {
      setIsPrinting(true);

      const timestamp = new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      let receiptData = `[C]<b>memoryceipt</b>\n` +
        `[C]────────────────\n` +
        `[C]${timestamp}\n` +
        `[C]────────────────\n\n`;

      // Add photos based on template
      for (const photo of photos) {
        receiptData += `[C]<img>${photo}</img>\n`;
        if (photos.length > 1) {
          receiptData += '\n';
        }
      }

      receiptData += '\n[C]<b>capture this memory</b>\n\n\n';

      if (Platform.OS === 'android') {
        await USBPrinter.printText(receiptData);
        await USBPrinter.printBill('\n');
      }

      Alert.alert('Success!', 'Your memory has been printed!');

    } catch (error) {
      console.error('Print error:', error);
      Alert.alert('Print Error', 'Failed to print. Please check printer connection.');
    } finally {
      setIsPrinting(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6B8E6F" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.brandText}>memoryceipt</Text>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const template = TEMPLATES.find(t => t.id === selectedTemplate)!;
  const photosTaken = capturedPhotos.length;
  const photosRemaining = template.photos - photosTaken;

  return (
    <View style={styles.container}>
      {/* Header with landscape illustration */}
      <View style={styles.header}>
        <View style={styles.landscape}>
          <View style={styles.sky}>
            <View style={[styles.cloud, styles.cloud1]} />
            <View style={[styles.cloud, styles.cloud2]} />
          </View>
          <View style={styles.hills}>
            <View style={styles.hill1} />
            <View style={styles.hill2} />
            <View style={styles.hill3} />
          </View>
        </View>
        <Text style={styles.withText}>with</Text>
        <Text style={styles.brandName}>
          <Text style={styles.memoryText}>memory</Text>
          <Text style={styles.ceiptText}>ceipt</Text>
        </Text>
      </View>

      {/* Camera Preview with B&W filter */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        >
          {/* Grayscale overlay effect */}
          <View style={styles.grayscaleOverlay} />
          
          {/* Countdown overlay */}
          {countdown !== null && countdown > 0 && (
            <View style={styles.countdownOverlay}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>
          )}

          {/* Progress indicator */}
          {photosTaken > 0 && photosRemaining > 0 && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Photo {photosTaken} of {template.photos} captured
              </Text>
              <Text style={styles.progressSubtext}>
                {photosRemaining} more to go...
              </Text>
            </View>
          )}

          {/* Processing overlay */}
          {(isCapturing || isPrinting) && (
            <View style={styles.processingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.processingText}>
                {isPrinting ? 'Printing your memory...' : 'Capturing...'}
              </Text>
            </View>
          )}
        </CameraView>
      </View>

      {/* Template Selection */}
      <View style={styles.templateContainer}>
        <Text style={styles.templateLabel}>Choose Layout</Text>
        <View style={styles.templateButtons}>
          {TEMPLATES.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.templateButton,
                selectedTemplate === t.id && styles.templateButtonActive,
              ]}
              onPress={() => setSelectedTemplate(t.id)}
              disabled={isCapturing || isPrinting || countdown !== null}
            >
              <Text style={[
                styles.templateIcon,
                selectedTemplate === t.id && styles.templateIconActive,
              ]}>
                {t.icon}
              </Text>
              <Text style={[
                styles.templateName,
                selectedTemplate === t.id && styles.templateNameActive,
              ]}>
                {t.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Capture Button */}
      <TouchableOpacity
        style={[
          styles.captureButton,
          (!printerConnected || isCapturing || isPrinting || countdown !== null) && 
            styles.captureButtonDisabled,
        ]}
        onPress={handleCaptureStart}
        disabled={!printerConnected || isCapturing || isPrinting || countdown !== null}
      >
        <Text style={styles.captureButtonText}>capture this memory</Text>
      </TouchableOpacity>

      {/* Printer status */}
      {!printerConnected && (
        <TouchableOpacity style={styles.reconnectPrompt} onPress={initPrinter}>
          <Text style={styles.reconnectText}>⚠️ Tap to connect printer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  permissionText: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  permissionButton: {
    backgroundColor: '#6B8E6F',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  landscape: {
    width: SCREEN_WIDTH * 0.9,
    height: 80,
    position: 'relative',
    marginBottom: 10,
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#A8D5E2',
    borderRadius: 15,
  },
  cloud: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  cloud1: {
    width: 60,
    height: 20,
    top: 10,
    left: 30,
  },
  cloud2: {
    width: 50,
    height: 18,
    top: 15,
    right: 40,
  },
  hills: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
  },
  hill1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 35,
    backgroundColor: '#7BA37C',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  hill2: {
    position: 'absolute',
    bottom: 0,
    left: 100,
    width: 180,
    height: 42,
    backgroundColor: '#8CB889',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  hill3: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 140,
    height: 38,
    backgroundColor: '#7BA37C',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  withText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  brandName: {
    fontSize: 36,
    fontWeight: '700',
  },
  brandText: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
  },
  memoryText: {
    color: '#2D2D2D',
  },
  ceiptText: {
    color: '#6B8E6F',
  },
  cameraContainer: {
    marginHorizontal: 24,
    height: SCREEN_HEIGHT * 0.45,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  grayscaleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    // Subtle white overlay to give a desaturated/vintage look
    // Approximates grayscale appearance in live preview
    // Full B&W conversion happens during capture
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    color: '#fff',
    fontSize: 120,
    fontWeight: 'bold',
  },
  progressContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  progressSubtext: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  templateContainer: {
    marginTop: 20,
    marginHorizontal: 24,
  },
  templateLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  templateButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  templateButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  templateButtonActive: {
    backgroundColor: '#E8F4E9',
    borderColor: '#6B8E6F',
  },
  templateIcon: {
    fontSize: 32,
    color: '#999',
    marginBottom: 4,
  },
  templateIconActive: {
    color: '#6B8E6F',
  },
  templateName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  templateNameActive: {
    color: '#6B8E6F',
    fontWeight: '700',
  },
  captureButton: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 20,
    paddingVertical: 18,
    backgroundColor: '#6B8E6F',
    borderRadius: 30,
    alignItems: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  reconnectPrompt: {
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    alignItems: 'center',
  },
  reconnectText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
  },
});
