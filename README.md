GhostDetector
GhostDetector is a mobile app built with React Native and Expo that uses your phone's sensors to detect environmental anomalies in real-time.

Features
Uses gyroscope and microphone to collect sensor data
Displays real-time analysis of surroundings
Supports custom themes and splash screen
Simple and intuitive interface
Tech Stack
React Native + Expo
TypeScript
Expo Router
Custom Hooks for sensor handling
What I Learned
Handling Android microphone and storage permissions
Working with real device sensors (magnetometer)
Managing asynchronous sensor and audio lifecycles
Debugging real-device issues with Expo

Getting Started

## Demo

Download and watch the demo video: [demo.mp4](demo.mp4)

In the demo video, the EMF spike is intentionally triggered by bringing the phone close to laptop speakers to demonstrate real sensor response.

Clone the repository:
git clone https://github.com/xxdtx/GhostDetector.git
cd GhostDetector

npm install

npx expo start