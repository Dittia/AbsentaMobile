import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Dummy data, copy from dashboard.tsx
const user = {
  name: "Andi Wijaya",
  class: "XII RPL 1",
  nis: "123456",
  avatar: "https://ui-avatars.com/api/?name=Andi+Wijaya"
};
const attendanceStats = {
  percentage: 87.2,
  hadir: 156,
  sakit: 8,
  izin: 5,
  alpa: 6,
  totalDays: 175,
};

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            router.replace("/login-form");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.headerProfile}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileClass}>{user.class} • {user.nis}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informasi Pribadi</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nama Lengkap</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>NIS</Text>
            <Text style={styles.infoValue}>{user.nis}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kelas</Text>
            <Text style={styles.infoValue}>{user.class}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={[styles.infoValue, { color: "#22c55e" }]}>Aktif</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ringkasan Kehadiran</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Persentase Kehadiran</Text>
            <Text style={[styles.infoValue, { color: "#22c55e" }]}>{attendanceStats.percentage}%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Hari Efektif</Text>
            <Text style={styles.infoValue}>{attendanceStats.totalDays} hari</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Hadir</Text>
            <Text style={styles.infoValue}>{attendanceStats.hadir} hari</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Sakit</Text>
            <Text style={styles.infoValue}>{attendanceStats.sakit} hari</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Izin</Text>
            <Text style={styles.infoValue}>{attendanceStats.izin} hari</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Alpa</Text>
            <Text style={[styles.infoValue, { color: "#ef4444" }]}>{attendanceStats.alpa} hari</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerProfile: {
    backgroundColor: "#1e40af",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#e0e7ff",
    backgroundColor: "#fff",
  },
  profileName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileClass: {
    color: "#a5b4fc",
    fontSize: 13,
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: "#334155",
    padding: 8,
    borderRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    color: "#1e293b",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoLabel: {
    color: "#64748b",
    fontSize: 13,
  },
  infoValue: {
    color: "#1e293b",
    fontWeight: "bold",
    fontSize: 13,
  },
});
