// explore.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Alert } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';

export default function ExploreScreen() {
  const [magnetometerData, setMagnetometerData] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [anomalyDetected, setAnomalyDetected] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const sensitivity = 100; // Adjusted sensitivity threshold
  const alertEnabled = true; // Vibration alert

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = () => {
    const magSubscription = Magnetometer.addListener((data) => {
      const { x, y, z } = data;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      setMagnetometerData(magnitude);

      if (magnitude > sensitivity) {
        if (!anomalyDetected) {
          setAnomalyDetected(true);
          if (alertEnabled) {
            Vibration.vibrate(500);
          }
        }
      } else {
        setAnomalyDetected(false);
      }
    });
    setSubscription(magSubscription);
    setIsScanning(true);
  };

  const stopScanning = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setIsScanning(false);
    setAnomalyDetected(false);
  };

  const toggleScanning = () => {
    if (isScanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      // Request permissions
      const micPermission = await Audio.requestPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();

      if (micPermission.status !== 'granted' || mediaPermission.status !== 'granted') {
        Alert.alert('Permission Denied', 'Permissions are required to record and save audio.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (error) {
      console.error('Failed to start recording', error);
      Alert.alert('Error', 'An error occurred while starting the recording.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      const asset = await MediaLibrary.createAssetAsync(uri!);
      await MediaLibrary.createAlbumAsync('Ghost Detector Recordings', asset, false);

      Alert.alert('Recording Saved', 'Your recording has been saved to the media library.');

      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording', error);
      Alert.alert('Error', 'An error occurred while stopping the recording.');
      setRecording(null);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Function to get color based on EMF value
  const getGaugeColor = (value: number) => {
    if (value < sensitivity * 0.5) {
      return '#00ff00'; // Green
    } else if (value < sensitivity) {
      return '#ffff00'; // Yellow
    } else {
      return '#ff0000'; // Red
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EMF Scanner</Text>
      <AnimatedCircularProgress
        size={220}
        width={15}
        fill={Math.min((magnetometerData / 200) * 100, 100)} // Adjusted normalization
        tintColor={getGaugeColor(magnetometerData)}
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
        duration={200}
      >
        {() => (
          <View style={styles.gaugeContent}>
            <Text style={styles.gaugeText}>{magnetometerData.toFixed(2)} μT</Text>
            {anomalyDetected && <Text style={styles.anomalyText}>Anomaly Detected!</Text>}
          </View>
        )}
      </AnimatedCircularProgress>
      <TouchableOpacity
        style={isScanning ? styles.stopButton : styles.startButton}
        onPress={toggleScanning}
      >
        <Text style={styles.buttonText}>{isScanning ? 'Stop Scanning' : 'Start Scanning'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={recording ? styles.stopRecordButton : styles.recordButton}
        onPress={toggleRecording}
      >
        <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Record Sound'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FF5555',
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gaugeContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  anomalyText: {
    fontSize: 20,
    color: '#FF5555',
    marginTop: 10,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#28a745',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  stopButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  stopRecordButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
