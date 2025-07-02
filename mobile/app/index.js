import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { router } from 'expo-router' // Add this import for Expo Router

export default function Index() {
  const handleLogin = () => {
    router.push('/Screen/Main'); // Navigate to main screen using Expo Router
  };

  // const handleRegister = () => {
  //   router.push('/register'); // Navigate to register screen
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.brandText}>Botibot</Text>
        </View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image 
              source={require('../assets/images/robot.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Smart Pill Dispensing</Text>
          <Text style={styles.subtitle}>
            Your personal medication assistant. Precise, reliable, and always on time with your prescriptions.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin} // Add this onPress handler
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.registerButton}
            // onPress={handleRegister} // Add this onPress handler
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Trusted by healthcare professionals</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

// Your existing styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1e8', // bamboo background
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  brandText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#4a6fa5', // denim
    letterSpacing: 1,
    marginTop: 50,
    fontFamily: 'Poppins-ExtraBold', // Use your custom font
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#4a6fa5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 3,
    borderColor: '#4a6fa5',
  },
  image: {
    width: 160,
    height: 160,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4a6fa5', // denim
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: 'Poppins-Bold', // Use your custom font
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular', // Use your custom font
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#4a6fa5', // denim
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#4a6fa5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  loginButtonText: {
    color: '#f5f1e8', // bamboo
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: 'Poppins-SemiBold', // Use your custom font
  },
  registerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4a6fa5', // denim
  },
  registerButtonText: {
    color: '#4a6fa5', // denim
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: 'Poppins-SemiBold', // Use your custom font
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
    fontStyle: 'italic',
    fontFamily: 'Poppins-Medium', // Use your custom font
  },
})