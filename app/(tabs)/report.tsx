import { AlertTriangle, CheckCircle, Clock, Filter, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Dummy data, copy from dashboard.tsx
const user = {
  name: "Andi Wijaya",
  class: "XII RPL 1",
  nis: "123456",
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
const weeklyData = [
  {
    week: "Minggu ke-1",
    hadir: 28,
    sakit: 1,
    izin: 0,
    alpa: 1,
    percentage: 93.3,
  },
  {
    week: "Minggu ke-2",
    hadir: 30,
    sakit: 0,
    izin: 0,
    alpa: 0,
    percentage: 100,
  },
  {
    week: "Minggu ke-3",
    hadir: 27,
    sakit: 2,
    izin: 1,
    alpa: 0,
    percentage: 90,
  },
  {
    week: "Minggu ke-4",
    hadir: 29,
    sakit: 0,
    izin: 0,
    alpa: 1,
    percentage: 96.7,
  },
];
const monthlyData = [
  {
    month: "Januari 2024",
    hadir: 114,
    sakit: 3,
    izin: 1,
    alpa: 2,
    percentage: 95,
  },
  {
    month: "Desember 2023",
    hadir: 108,
    sakit: 2,
    izin: 2,
    alpa: 1,
    percentage: 95.6,
  },
  {
    month: "November 2023",
    hadir: 112,
    sakit: 1,
    izin: 1,
    alpa: 1,
    percentage: 97.4,
  },
  {
    month: "Oktober 2023",
    hadir: 118,
    sakit: 2,
    izin: 0,
    alpa: 0,
    percentage: 98.3,
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
      return <CheckCircle color="#22c55e" size={18} />;
    case "sakit":
      return <AlertTriangle color="#eab308" size={18} />;
    case "izin":
      return <Clock color="#3b82f6" size={18} />;
    case "alpa":
      return <XCircle color="#ef4444" size={18} />;
    default:
      return <AlertTriangle color="#a3a3a3" size={18} />;
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

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={[styles.statBox, { backgroundColor: color + "22" }]}>
      <Text style={{ color, fontWeight: "bold", fontSize: 16 }}>{value}</Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>{label}</Text>
    </View>
  );
}

export default function Report() {
  const [reportType, setReportType] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");
  const [selectedDate] = useState("2024-01-15");
  const [currentTime] = useState(new Date());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.headerReports}>
          <Text style={styles.headerTitle}>Laporan Kehadiran</Text>
          <Text style={styles.headerSubtitle}>{user.name} • {user.class}</Text>
          <View style={styles.clockBox}>
            <Text style={styles.clockText}>{formatTime(currentTime)}</Text>
            <Text style={styles.clockDate}>{formatDate(currentTime)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}><Filter color="#22c55e" size={18} /> Jenis Laporan</Text>
          <View style={styles.reportTypeRow}>
            {[
              { key: "daily", label: "Harian" },
              { key: "weekly", label: "Mingguan" },
              { key: "monthly", label: "Bulanan" },
              { key: "yearly", label: "Tahunan" },
            ].map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.reportTypeBtn,
                  reportType === type.key && styles.reportTypeBtnActive,
                ]}
                onPress={() => setReportType(type.key as any)}
              >
                <Text style={[
                  styles.reportTypeText,
                  reportType === type.key && styles.reportTypeTextActive,
                ]}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {reportType === "daily" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kehadiran Harian - {selectedDate}</Text>
            {dailyAttendance
              .filter((record) => record.date === selectedDate)
              .map((record, idx) => (
                <View key={idx} style={styles.attendanceRow}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {getStatusIcon(record.status)}
                    <View style={{ marginLeft: 8 }}>
                      <Text style={styles.attendanceSubject}>{record.subject}</Text>
                      <Text style={styles.attendanceTeacher}>{record.teacher} • {record.time}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, getStatusStyle(record.status)]}>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: getStatusStyle(record.status).color }}>
                      {record.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}

        {reportType === "weekly" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Laporan Mingguan</Text>
            {weeklyData.map((week, idx) => (
              <View key={idx} style={styles.weekMonthRow}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text style={styles.attendanceSubject}>{week.week}</Text>
                  <Text style={{ color: "#22c55e", fontWeight: "bold" }}>{week.percentage}%</Text>
                </View>
                <View style={styles.statsRow}>
                  <StatBox label="Hadir" value={week.hadir} color="#22c55e" />
                  <StatBox label="Sakit" value={week.sakit} color="#eab308" />
                  <StatBox label="Izin" value={week.izin} color="#3b82f6" />
                  <StatBox label="Alpa" value={week.alpa} color="#ef4444" />
                </View>
              </View>
            ))}
          </View>
        )}

        {reportType === "monthly" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Laporan Bulanan</Text>
            {monthlyData.map((month, idx) => (
              <View key={idx} style={styles.weekMonthRow}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text style={styles.attendanceSubject}>{month.month}</Text>
                  <Text style={{ color: "#22c55e", fontWeight: "bold" }}>{month.percentage}%</Text>
                </View>
                <View style={styles.statsRow}>
                  <StatBox label="Hadir" value={month.hadir} color="#22c55e" />
                  <StatBox label="Sakit" value={month.sakit} color="#eab308" />
                  <StatBox label="Izin" value={month.izin} color="#3b82f6" />
                  <StatBox label="Alpa" value={month.alpa} color="#ef4444" />
                </View>
              </View>
            ))}
          </View>
        )}

        {reportType === "yearly" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Laporan Tahunan 2024</Text>
            <View style={styles.yearlyBox}>
              <Text style={{ fontSize: 32, fontWeight: "bold", color: "#22c55e" }}>{attendanceStats.percentage}%</Text>
              <Text style={{ color: "#6b7280" }}>Persentase Kehadiran Keseluruhan</Text>
            </View>
            <View style={styles.statsRow}>
              <StatBox label="Hadir" value={attendanceStats.hadir} color="#22c55e" />
              <StatBox label="Alpa" value={attendanceStats.alpa} color="#ef4444" />
              <StatBox label="Sakit" value={attendanceStats.sakit} color="#eab308" />
              <StatBox label="Izin" value={attendanceStats.izin} color="#3b82f6" />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerReports: {
    backgroundColor: "#166534",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    alignItems: "center",
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
  reportTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 8,
  },
  reportTypeBtn: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 2,
    alignItems: "center",
  },
  reportTypeBtnActive: {
    backgroundColor: "#22c55e",
  },
  reportTypeText: {
    color: "#64748b",
    fontWeight: "bold",
  },
  reportTypeTextActive: {
    color: "#fff",
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
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 2,
    alignSelf: "flex-end",
  },
  weekMonthRow: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
  yearlyBox: {
    alignItems: "center",
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
});
