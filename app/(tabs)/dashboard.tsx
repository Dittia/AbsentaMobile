import { Calendar, TrendingUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

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

const dailyAttendance = [
  {
    date: "2024-01-15",
    day: "Senin",
    subject: "Pemrograman Web",
    teacher: "Pak Budi",
    status: "hadir",
    time: "07:00",
  },
  {
    date: "2024-01-15",
    day: "Senin",
    subject: "Basis Data",
    teacher: "Bu Siti",
    status: "hadir",
    time: "08:00",
  },
  {
    date: "2024-01-15",
    day: "Senin",
    subject: "Matematika",
    teacher: "Pak Ahmad",
    status: "alpa",
    time: "09:00",
  },
  {
    date: "2024-01-15",
    day: "Senin",
    subject: "Bahasa Inggris",
    teacher: "Bu Lisa",
    status: "hadir",
    time: "10:00",
  },
  {
    date: "2024-01-14",
    day: "Minggu",
    subject: "PKK",
    teacher: "Bu Dina",
    status: "alpa",
    time: "11:00",
  },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getStatusIcon(status: string) {
  switch (status) {
    case "hadir":
      return <TrendingUp color="#22c55e" size={18} />;
    case "sakit":
      return <TrendingUp color="#eab308" size={18} />;
    case "izin":
      return <TrendingUp color="#3b82f6" size={18} />;
    case "alpa":
      return <TrendingUp color="#ef4444" size={18} />;
    default:
      return <TrendingUp color="#a3a3a3" size={18} />;
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "hadir":
      return { color: "#22c55e", backgroundColor: "#dcfce7" };
    case "sakit":
      return { color: "#eab308", backgroundColor: "#fef9c3" };
    case "izin":
      return { color: "#3b82f6", backgroundColor: "#dbeafe" };
    case "alpa":
      return { color: "#ef4444", backgroundColor: "#fee2e2" };
    default:
      return { color: "#6b7280", backgroundColor: "#f3f4f6" };
  }
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update setiap detik
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.headerDashboard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.headerTitle}>Selamat Pagi, {user.name.split(" ")[0]}!</Text>
              <Text style={styles.headerSubtitle}>{user.class} • {user.nis}</Text>
            </View>
          </View>
          <View style={styles.clockBox}>
            <Text style={styles.clockText}>{formatTime(currentTime)}</Text>
            <Text style={styles.clockDate}>{formatDate(currentTime)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}><TrendingUp color="#3b82f6" size={18} /> Statistik Kehadiran</Text>
          <View style={styles.percentBox}>
            <Text style={styles.percentText}>{attendanceStats.percentage}%</Text>
            <Text style={styles.percentLabel}>Persentase Kehadiran</Text>
          </View>
          <View style={styles.statsRow}>
            <StatBox label="Hadir" value={attendanceStats.hadir} color="#22c55e" />
            <StatBox label="Alpa" value={attendanceStats.alpa} color="#ef4444" />
            <StatBox label="Sakit" value={attendanceStats.sakit} color="#eab308" />
            <StatBox label="Izin" value={attendanceStats.izin} color="#3b82f6" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}><Calendar color="#3b82f6" size={18} /> Kehadiran Terbaru</Text>
          {dailyAttendance.slice(0, 5).map((record, idx) => (
            <View key={idx} style={styles.attendanceRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {getStatusIcon(record.status)}
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.attendanceSubject}>{record.subject}</Text>
                  <Text style={styles.attendanceTeacher}>{record.teacher}</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <View style={[styles.statusBadge, getStatusStyle(record.status)]}>
                  <Text style={{ fontSize: 12, fontWeight: "bold", color: getStatusStyle(record.status).color }}>
                    {record.status.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.attendanceTime}>{record.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={[styles.statBox, { backgroundColor: color + "22" }]}>
      <Text style={{ color, fontWeight: "bold", fontSize: 16 }}>{value}</Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerDashboard: {
    backgroundColor: "#1e40af",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#a5b4fc",
    fontSize: 13,
    marginTop: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#e0e7ff",
    backgroundColor: "#fff",
  },
  clockBox: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
  },
  clockText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  clockDate: {
    color: "#a5b4fc",
    fontSize: 13,
    marginTop: 2,
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
  percentBox: {
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 18,
    marginBottom: 14,
  },
  percentText: {
    color: "#3b82f6",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 2,
  },
  percentLabel: {
    color: "#3b82f6",
    fontSize: 13,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  attendanceSubject: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1e293b",
  },
  attendanceTeacher: {
    color: "#64748b",
    fontSize: 12,
  },
  attendanceTime: {
    color: "#94a3b8",
    fontSize: 11,
    marginTop: 2,
    textAlign: "right",
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 2,
    alignSelf: "flex-end",
  },
});