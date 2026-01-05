// index.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const handleScanPress = () => {
    router.push('/explore');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ghost EMF Detector</Text>
      <Text style={styles.sectionTitle}>Welcome!</Text>
      <Text style={styles.description}>
        This app uses your device's sensors to detect electromagnetic field (EMF) fluctuations in your environment.
      </Text>

      <Text style={styles.sectionTitle}>Understanding EMF Readings</Text>
      <Text style={styles.description}>
        **EMF (Electromagnetic Field) readings** measure the strength of magnetic fields around you, expressed in microteslas (μT).
      </Text>
      <Text style={styles.description}>
        - **Low Readings (0-50 μT):** Typical background levels in homes or offices, generally considered safe.
      </Text>
      <Text style={styles.description}>
        - **Moderate Readings (50-100 μT):** Usually indicates nearby electronic devices or wiring.
      </Text>
      <Text style={styles.description}>
        - **High Readings (100+ μT):** Could suggest strong magnetic sources or potential anomalies. High readings near electronics or appliances are expected.
      </Text>

      <Text style={styles.sectionTitle}>Best Conditions for Detection</Text>
      <Text style={styles.description}>
        For more intriguing results, use the app in places with minimal electronic interference:
      </Text>
      <Text style={styles.description}>
        - **Abandoned Buildings:** Less electronic equipment means unexpected high readings could be interesting.
      </Text>
      <Text style={styles.description}>
        - **Forests or Remote Areas:** Natural settings without electronic devices provide a clean environment for detection.
      </Text>
      <Text style={styles.description}>
        - **Historical Sites:** Locations with rich histories might offer unusual readings.
      </Text>
      <Text style={styles.note}>
        *Please remember that high EMF readings in these areas could be due to natural magnetic minerals or underground formations.*
      </Text>

      <Text style={styles.sectionTitle}>Factors Affecting EMF Levels</Text>
      <Text style={styles.description}>
        EMF readings can be influenced by:
      </Text>
      <Text style={styles.description}>
        - Electronic devices (phones, TVs, appliances)
      </Text>
      <Text style={styles.description}>
        - Electrical wiring and power lines
      </Text>
      <Text style={styles.description}>
        - Metal objects and magnets
      </Text>
      <Text style={styles.description}>
        - Natural magnetic fields (Earth's magnetic field)
      </Text>

      <Text style={styles.sectionTitle}>How to Use the App</Text>
      <Text style={styles.description}>
        - Press **SCAN** to start detecting EMF levels.
      </Text>
      <Text style={styles.description}>
        - Observe the gauge and numerical values.
      </Text>
      <Text style={styles.description}>
        - In low-EMF environments, unexpected high readings may be of interest.
      </Text>
      <Text style={styles.description}>
        - Recalibrate the magnetometer by moving your device in a figure-eight motion for more accurate EMF readings.
      </Text>

      <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
        <Text style={styles.buttonText}>SCAN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1D',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FF5555',
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FF5555',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  note: {
    fontSize: 16,
    color: '#AAAAAA',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#28a745',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
