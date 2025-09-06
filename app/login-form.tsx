import { Eye, EyeOff, Lock, Smartphone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dummy login function
  const login = async (username: string, password: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(username.startsWith('siswa') && password === '12345');
      }, 1000);
    });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Username dan password harus diisi');
      return;
    }
    setIsLoading(true);
    const success = await login(username, password);
    if (success) {
      alert('Login berhasil!');
    } else {
      alert('Username atau password salah');
    }
    setIsLoading(false);
  };

  const testCredentials = [
    { name: 'Andi Wijaya', username: 'siswa1', class: 'XII RPL 1' },
    { name: 'Sari Dewi', username: 'siswa2', class: 'XII RPL 1' },
    { name: 'Budi Santoso', username: 'siswa3', class: 'XI TKJ 2' }
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#1e293b' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Smartphone color="#fff" size={40} />
          </View>
          <Text style={styles.title}>ABSENTA</Text>
          <Text style={styles.subtitle}>Sistem Absensi Digital</Text>
          <Text style={styles.school}>SMKN 13 Jakarta - Portal Siswa</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Username */}
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <User color="#a5b4fc" size={18} style={styles.iconLeft} />
            <TextInput
              style={styles.input}
              placeholder="Masukkan username"
              placeholderTextColor="#a5b4fc"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Lock color="#a5b4fc" size={18} style={styles.iconLeft} />
            <TextInput
              style={styles.input}
              placeholder="Masukkan password"
              placeholderTextColor="#a5b4fc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.iconRight}
              onPress={() => setShowPassword(!showPassword)}
              accessibilityLabel="Toggle password visibility"
            >
              {showPassword ? <EyeOff color="#a5b4fc" size={18} /> : <Eye color="#a5b4fc" size={18} />}
            </TouchableOpacity>
          </View>

          {/* Remember Me */}
          <TouchableOpacity
            style={styles.rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
            accessibilityLabel="Ingat saya"
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
            <Text style={styles.rememberMeText}>Ingat saya</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            accessibilityLabel="Masuk"
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Masuk</Text>}
          </TouchableOpacity>

          {/* Test Credentials */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Akun demo siswa (password: 12345):</Text>
            {testCredentials.map((cred) => (
              <TouchableOpacity
                key={cred.username}
                style={styles.demoButton}
                onPress={() => {
                  setUsername(cred.username);
                  setPassword('12345');
                }}
                accessibilityLabel={`Gunakan akun demo ${cred.name}`}
              >
                <Text style={styles.demoName}>{cred.name}</Text>
                <Text style={styles.demoInfo}>{cred.class} • {cred.username}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 SMKN 13 Jakarta. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1e293b',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#a5b4fc',
    fontSize: 14,
  },
  school: {
    color: '#c7d2fe',
    fontSize: 12,
    marginTop: 2,
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 24,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 10,
    paddingLeft: 36,
    paddingRight: 36,
    height: 48,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    height: 48,
  },
  iconLeft: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  iconRight: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#a5b4fc',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  rememberMeText: {
    color: '#a5b4fc',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  demoContainer: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    paddingTop: 14,
  },
  demoTitle: {
    color: '#a5b4fc',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  demoButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 10,
    marginBottom: 8,
  },
  demoName: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  demoInfo: {
    color: '#a5b4fc',
    fontSize: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  footerText: {
    color: '#a5b4fc',
    fontSize: 12,
  },
});