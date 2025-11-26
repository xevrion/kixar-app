import { useBooking } from "@/context/BookingContext";
import turfData from "@/data/turfData.json";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router } from "expo-router";
import React, { useState } from "react";

import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function BookingPageScreen() {
  const { currentBooking, updateCurrentBooking, addBooking } = useBooking();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>("noon");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<string>("Court B");
  const [playerCount, setPlayerCount] = useState(5);

  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = dayjs().add(i, "day");
    return {
      day: d.format("ddd").toUpperCase(),
      date: d.format("DD"),
      full: d.toISOString(), // <— REAL date
    };
  });

  const periods = Object.entries(turfData.timeSlots).map(([key, value]) => ({
    id: key,
    label: value.label,
    icon:
      key === "morning"
        ? "sunny-outline"
        : key === "noon"
          ? "sunny"
          : key === "evening"
            ? "moon-outline"
            : "moon",
    slots: value.slots.length,
  }));

  const timeSlots = selectedPeriod
    ? turfData.timeSlots[selectedPeriod].slots
    : [];

  const isFormValid = selectedDate && selectedSlot && selectedCourt;

  const currentCourt = turfData.courts.find((c) => c.id === selectedCourt);
  const maxPlayers = currentCourt?.capacity ?? 22;

  const totalSlots = Object.values(turfData.timeSlots).reduce(
    (sum, period) => sum + period.slots.length,
    0
  );

  const handleNext = () => {
    if (isFormValid) {
      addBooking({
        turfId: currentBooking.turfId || "",
        turfName: currentBooking.turfName,
        date: dayjs(selectedDate).toISOString(),

        timeSlot: selectedSlot,
        timePeriod: selectedPeriod || "",
        court: selectedCourt,
        playerCount: playerCount,
        pricePerHour: currentBooking.pricePerHour,
      });

      router.push("/(tabs)/mybookings");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Date Selector */}
        <View className="px-5 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-semibold text-black">
              Select Date
            </Text>
            <TouchableOpacity>
              <Ionicons name="calendar-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm text-brand mb-3 font-medium">
            {dayjs().format("MMMM YYYY")}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5"
          >
            {dates.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`items-center py-3 px-4 mr-3 rounded-xl min-w-[60px] ${
                  selectedDate === item.full ? "bg-brand" : "bg-slate-50"
                }`}
                onPress={() => setSelectedDate(item.full)} // <— use the stored ISO date
              >
                <Text
                  className={`text-[11px] mb-1 font-medium ${
                    selectedDate === item.full ? "text-white" : "text-slate-600"
                  }`}
                >
                  {item.day}
                </Text>

                <Text
                  className={`text-base font-semibold ${
                    selectedDate === item.full ? "text-white" : "text-black"
                  }`}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Period */}
        <View className="px-5 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-semibold text-black">
              Select Time
            </Text>
            {/* <Text className="text-xs text-slate-600">
              {selectedPeriod
                ? `${turfData.timeSlots[selectedPeriod].slots.length} slots available`
                : "Select a time period"}
            </Text> */}
            <Text className="text-xs text-slate-600">
              {totalSlots} slots available today.
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                className={`flex-row items-center gap-2 py-3 px-4 rounded-xl ${
                  selectedPeriod === period.id ? "bg-black" : "bg-slate-50"
                }`}
                style={{ minWidth: width / 2 - 26 }}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Ionicons
                  name={period.icon as any}
                  size={18}
                  color={selectedPeriod === period.id ? "#FFF" : "#64748B"}
                />
                <Text
                  className={`text-sm font-medium flex-1 ${
                    selectedPeriod === period.id ? "text-white" : "text-black"
                  }`}
                >
                  {period.label}
                </Text>
                <View
                  className={`px-2 py-0.5 rounded-[10px] ${
                    selectedPeriod === period.id
                      ? "bg-gray-700"
                      : "bg-slate-300"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedPeriod === period.id ? "text-white" : "text-black"
                    }`}
                  >
                    {period.slots}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {selectedPeriod && (
            <Text className="text-sm text-slate-600 mt-3 text-center">
              {turfData.timeSlots[selectedPeriod].timeRange}
            </Text>
          )}
        </View>

        {/* Timeline Slots */}
        <View className="px-5 mt-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row py-5">
              {timeSlots.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  className="items-center mr-10"
                  onPress={() => setSelectedSlot(time)}
                >
                  <Text className="text-xs text-slate-600 mb-2">{time}</Text>
                  <View
                    className={`w-8 h-8 rounded-full border-2 justify-center items-center ${
                      selectedSlot === time
                        ? "bg-brand border-brand"
                        : "bg-white border-slate-300"
                    }`}
                  >
                    {selectedSlot === time && (
                      <Ionicons name="checkmark" size={16} color="#FFF" />
                    )}
                  </View>
                  {index < timeSlots.length - 1 && (
                    <View
                      className={`absolute left-8 w-[60px] h-0.5 ${
                        selectedSlot === time ? "bg-brand" : "bg-slate-300"
                      }`}
                      style={{ top: 44 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Court Selection */}
        <View className="px-5 mt-6">
          <Text className="text-base font-semibold text-black">
            Select Court
          </Text>

          <View className="flex-row gap-3 mt-3 flex-wrap">
            {turfData.courts.map((court) => (
              <TouchableOpacity
                key={court.id}
                className={`flex-1 flex-row items-center gap-3 py-4 px-4 rounded-xl border ${
                  selectedCourt === court.id
                    ? "border-brand bg-green-50"
                    : "border-slate-300 bg-white"
                }`}
                onPress={() => setSelectedCourt(court.id)}
              >
                <View
                  className={`w-5 h-5 rounded-full border-2 justify-center items-center ${
                    selectedCourt === court.id
                      ? "border-brand"
                      : "border-slate-300"
                  }`}
                >
                  {selectedCourt === court.id && (
                    <View className="w-2.5 h-2.5 rounded-full bg-brand" />
                  )}
                </View>

                <Text
                  className={`text-sm font-medium ${
                    selectedCourt === court.id
                      ? "text-brand font-semibold"
                      : "text-slate-600"
                  }`}
                >
                  {court.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Player Count */}
        <View className="px-5 mt-6">
          <Text className="text-base font-semibold text-black">
            Select Players Count
          </Text>
          <View className="flex-row items-center justify-center gap-6 py-4 bg-slate-50 rounded-xl mt-3">
            <TouchableOpacity
              className="w-10 h-10 rounded-lg bg-slate-300 justify-center items-center"
              onPress={() => setPlayerCount(Math.max(1, playerCount - 1))}
            >
              <Ionicons name="remove" size={20} color="#000" />
            </TouchableOpacity>
            <Text className="text-base font-semibold text-black min-w-[100px] text-center">
              {playerCount} Players
            </Text>
            <TouchableOpacity
              className="w-10 h-10 rounded-lg bg-slate-300 justify-center items-center"
              onPress={() =>
                setPlayerCount(Math.min(maxPlayers, playerCount + 1))
              }
            >
              <Ionicons name="add" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pricing */}
        <View className="px-5 mt-6">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-semibold text-black">
              ₹ {currentBooking.pricePerHour}
            </Text>
            <Text className="text-sm text-slate-600">
              | ₹{Math.round(currentBooking.pricePerHour / playerCount)} per
              player
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-[13px] text-brand mt-2 font-medium">
              View Price Breakdown
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-[100px]" />
      </ScrollView>

      {/* Bottom Bar */}
      <View className="px-5 py-4 bg-white border-t border-slate-300">
        <TouchableOpacity
          className={`flex-row items-center justify-center py-4 rounded-lg gap-2 ${
            isFormValid ? "bg-brand" : "bg-slate-400"
          }`}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text className="text-base font-semibold text-white">Next</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
