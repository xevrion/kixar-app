import { useBooking } from '@/context/BookingContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MyBookingsScreen() {
  const { bookings, deleteBooking } = useBooking();

  const renderBookingItem = ({ item }: any) => (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-slate-100">
        <Text className="text-lg font-semibold text-black flex-1">{item.turfName}</Text>
        <TouchableOpacity onPress={() => deleteBooking(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center gap-2.5 mb-2.5">
        <Ionicons name="calendar-outline" size={16} color="#64748B" />
        <Text className="text-sm text-slate-600">Date: {item.date} Nov 2025</Text>
      </View>

      <View className="flex-row items-center gap-2.5 mb-2.5">
        <Ionicons name="time-outline" size={16} color="#64748B" />
        <Text className="text-sm text-slate-600">Time: {item.timeSlot}</Text>
      </View>

      <View className="flex-row items-center gap-2.5 mb-2.5">
        <Ionicons name="basketball-outline" size={16} color="#64748B" />
        <Text className="text-sm text-slate-600">Court: {item.court}</Text>
      </View>

      <View className="flex-row items-center gap-2.5 mb-2.5">
        <Ionicons name="people-outline" size={16} color="#64748B" />
        <Text className="text-sm text-slate-600">Players: {item.playerCount}</Text>
      </View>

      <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-slate-100">
        <View className="bg-green-50 px-3 py-1.5 rounded-lg">
          <Text className="text-[15px] font-semibold text-[#2DB0A3]">₹{item.pricePerHour}/hour</Text>
        </View>
        <View className="bg-blue-100 px-3 py-1.5 rounded-lg">
          <Text className="text-xs font-semibold text-blue-800">Confirmed</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center p-10">
      <View className="mb-6">
        <Ionicons name="calendar-outline" size={64} color="#CBD5E1" />
      </View>
      <Text className="text-[22px] font-semibold text-slate-600 mb-2">No bookings yet</Text>
      <Text className="text-sm text-slate-400 text-center leading-5">
        Your bookings will appear here once you make a reservation
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50">
      <View className="bg-white px-5 py-5 pt-[60px] border-b border-slate-300">
        <Text className="text-[28px] font-bold text-black mb-1">My Bookings</Text>
        <Text className="text-sm text-slate-600">
          {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
        </Text>
      </View>

      {bookings.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
