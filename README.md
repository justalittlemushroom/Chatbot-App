# Personal AI Chatbot App

A full-stack React Native mobile application featuring real-time messaging, user authentication, conversation management, and local AI integration. Built with Firebase backend and designed for cross-platform deployment with on-device AI processing.

## 🚀 Features

- **Complete Authentication System**: Email/password registration, login, and password reset via Firebase Auth
- **Real-Time Messaging**: Live message synchronization across devices with conversation threading
- **Conversation Management**: Create, delete, rename conversations with real-time updates
- **Local AI Integration**: On-device AI processing using Microsoft Phi-2 model (no external API costs)
- **Professional Mobile UI**: Clean, conversation-focused interface with custom typography

## 🛠 Tech Stack

- **Frontend**: React Native with Expo, TypeScript
- **UI Design**: Figma mockups translated to React Native
- **Backend**: Firebase (Authentication + Firestore), Python Flask
- **AI/ML**: Microsoft Phi-2 model with MLX framework
- **Navigation**: React Navigation (Stack Navigator)
- **Database**: Real-time Firestore with conversation threading

## 🎨 Design & Development Process

**Timeline**: 4 days from concept to deployment

- **Day 1**: Mobile app design in Figma + Login/Sign up page implementation
- **Day 2**: Home and Chat screens + Authentication system + Password reset functionality
- **Day 3**: Explored Claude API (discovered costs) + Set up Node.js/Express.js + Message persistence + Message/conversation deletion and renaming
- **Day 4**: Fine-tuning experiments with Mistral, Phi-2, and Qwen models + Integrated baseline Phi-2 model

## 🔧 Technical Highlights

### Authentication & Data Management
- Firebase Auth with email/password and display name support
- Real-time Firestore listeners for live message updates
- Secure user session management and data isolation

### AI Integration
- Local Flask server for AI inference (no external API dependencies)
- Microsoft Phi-2 model running via MLX framework
- On-device processing for privacy and cost efficiency
- Conversation context handling across message exchanges

### Mobile Development
- Cross-platform compatibility (iOS/Android)
- Custom design system with imported fonts (Raleway, Kaisei Harunoumi, Sorts Mill Goudy)
- Mobile-optimized keyboard handling and navigation
- Gradient-based styling architecture

## 💡 Key Development Decisions

### Local AI Processing
Chose local model hosting over external APIs for cost efficiency, privacy, and independence from third-party services. Experimented with multiple models before settling on Phi-2 for optimal performance.

### Real-Time Architecture
Implemented Firebase real-time listeners throughout the app for instant message synchronization and dynamic conversation management.

### Authentication Strategy
Used Firebase Auth for robust user management with email verification and password reset capabilities.

## 🎯 Learning Outcomes

- React Native mobile development with TypeScript
- Firebase integration (Auth + Firestore real-time database)
- Local AI model deployment and inference
- MLX framework and model fine-tuning experimentation
- Cross-platform mobile UI/UX design
- Real-time data synchronization patterns

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.11+ with MLX support (Apple Silicon recommended)
- Expo CLI
- Firebase project

### Quick Start
```bash
# Install dependencies
npm install

# Set up Python environment
python3 -m venv .venv
source .venv/bin/activate
pip install flask mlx mlx-lm

# Configure environment variables
# Create .env.local with Firebase config

# Download and start AI model
python -m mlx_lm.convert --hf-path microsoft/phi-2
python phi2_server.py

# Start the app
npx expo start
```

![image0](https://github.com/user-attachments/assets/a6059302-4088-40fa-aa6f-67bd923c5c7b)
![image1](https://github.com/user-attachments/assets/421d9c41-1317-465b-ba14-c0fb875fe1d4)


---

*Built to demonstrate full-stack mobile development, AI/ML integration, real-time systems, and complete product workflow.*
