import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '@/context/BookingContext';
import turfData from '@/data/turfData.json';

const { width } = Dimensions.get('window');

export default function BookingPageScreen() {
  const { currentBooking, updateCurrentBooking, addBooking } = useBooking();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>('noon');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<string>('Court B');
  const [playerCount, setPlayerCount] = useState(5);

  const dates = [
    { day: 'MON', date: '24' },
    { day: 'TUE', date: '25' },
    { day: 'WED', date: '26' },
    { day: 'THU', date: '27' },
    { day: 'FRI', date: '28' },
    { day: 'SAT', date: '29' },
    { day: 'SUN', date: '30' },
  ];

  const periods = [
    { id: 'morning', label: 'Morning', icon: 'sunny-outline', slots: 4 },
    { id: 'noon', label: 'Noon', icon: 'sunny', slots: 4 },
    { id: 'evening', label: 'moon-outline', slots: 2 },
    { id: 'twilight', label: 'Twilight', icon: 'moon', slots: 1 },
  ];

  const timeSlots = ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

  const isFormValid = selectedDate && selectedSlot && selectedCourt;

  const handleNext = () => {
    if (isFormValid) {
      addBooking({
        turfId: currentBooking.turfId || '',
        turfName: currentBooking.turfName,
        date: selectedDate,
        timeSlot: selectedSlot,
        timePeriod: selectedPeriod || '',
        court: selectedCourt,
        playerCount: playerCount,
        pricePerHour: currentBooking.pricePerHour,
      });

      router.push('/(tabs)/mybookings');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Date Selector */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <TouchableOpacity>
              <Ionicons name="calendar-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.monthText}>November 2025</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesScroll}>
            {dates.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateChip,
                  selectedDate === item.date && styles.dateChipActive,
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === item.date && styles.dayTextActive,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === item.date && styles.dateTextActive,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Period */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <Text style={styles.slotsAvailable}>8 slots available for today.</Text>
          </View>

          <View style={styles.periodsGrid}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodChip,
                  selectedPeriod === period.id && styles.periodChipActive,
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Ionicons
                  name={period.icon as any}
                  size={18}
                  color={selectedPeriod === period.id ? '#FFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period.id && styles.periodTextActive,
                  ]}
                >
                  {period.label}
                </Text>
                <View
                  style={[
                    styles.slotBadge,
                    selectedPeriod === period.id && styles.slotBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.slotBadgeText,
                      selectedPeriod === period.id && styles.slotBadgeTextActive,
                    ]}
                  >
                    {period.slots}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {selectedPeriod === 'noon' && (
            <Text style={styles.timeRange}>12:00 PM - 04:00 PM</Text>
          )}
        </View>

        {/* Timeline Slots */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.timeline}>
              {timeSlots.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.timeSlotContainer}
                  onPress={() => setSelectedSlot(time)}
                >
                  <Text style={styles.timeLabel}>{time}</Text>
                  <View
                    style={[
                      styles.timeMarker,
                      selectedSlot === time && styles.timeMarkerActive,
                    ]}
                  >
                    {selectedSlot === time && (
                      <Ionicons name="checkmark" size={16} color="#FFF" />
                    )}
                  </View>
                  {index < timeSlots.length - 1 && (
                    <View
                      style={[
                        styles.timeConnector,
                        selectedSlot === time && styles.timeConnectorActive,
                      ]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Court Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Cricket Court</Text>
          <View style={styles.courtRow}>
            <TouchableOpacity
              style={[
                styles.courtButton,
                selectedCourt === 'Court A' && styles.courtButtonActive,
              ]}
              onPress={() => setSelectedCourt('Court A')}
            >
              <View
                style={[
                  styles.courtRadio,
                  selectedCourt === 'Court A' && styles.courtRadioActive,
                ]}
              >
                {selectedCourt === 'Court A' && (
                  <View style={styles.courtRadioInner} />
                )}
              </View>
              <Text
                style={[
                  styles.courtText,
                  selectedCourt === 'Court A' && styles.courtTextActive,
                ]}
              >
                Court A
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.courtButton,
                selectedCourt === 'Court B' && styles.courtButtonActive,
              ]}
              onPress={() => setSelectedCourt('Court B')}
            >
              <View
                style={[
                  styles.courtRadio,
                  selectedCourt === 'Court B' && styles.courtRadioActive,
                ]}
              >
                {selectedCourt === 'Court B' && (
                  <View style={styles.courtRadioInner} />
                )}
              </View>
              <Text
                style={[
                  styles.courtText,
                  selectedCourt === 'Court B' && styles.courtTextActive,
                ]}
              >
                Court B
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Player Count */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Players Count</Text>
          <View style={styles.playerCounter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setPlayerCount(Math.max(1, playerCount - 1))}
            >
              <Ionicons name="remove" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.playerCountText}>{playerCount} Players</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setPlayerCount(playerCount + 1)}
            >
              <Ionicons name="add" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>₹ {currentBooking.pricePerHour}</Text>
            <Text style={styles.priceDetail}>| ₹{Math.round(currentBooking.pricePerHour / playerCount)} per player</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.priceBreakdown}>View Price Breakdown</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  slotsAvailable: {
    fontSize: 12,
    color: '#64748B',
  },
  monthText: {
    fontSize: 14,
    color: '#22C55E',
    marginBottom: 12,
    fontWeight: '500',
  },
  datesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dateChip: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    minWidth: 60,
  },
  dateChipActive: {
    backgroundColor: '#22C55E',
  },
  dayText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '500',
  },
  dayTextActive: {
    color: '#FFF',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dateTextActive: {
    color: '#FFF',
  },
  periodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  periodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    minWidth: width / 2 - 26,
  },
  periodChipActive: {
    backgroundColor: '#000',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  periodTextActive: {
    color: '#FFF',
  },
  slotBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  slotBadgeActive: {
    backgroundColor: '#374151',
  },
  slotBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  slotBadgeTextActive: {
    color: '#FFF',
  },
  timeRange: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
    textAlign: 'center',
  },
  timeline: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  timeSlotContainer: {
    alignItems: 'center',
    marginRight: 40,
  },
  timeLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  timeMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeMarkerActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  timeConnector: {
    position: 'absolute',
    top: 44,
    left: 32,
    width: 60,
    height: 2,
    backgroundColor: '#E2E8F0',
  },
  timeConnectorActive: {
    backgroundColor: '#22C55E',
  },
  courtRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  courtButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFF',
  },
  courtButtonActive: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  courtRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courtRadioActive: {
    borderColor: '#22C55E',
  },
  courtRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },
  courtText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  courtTextActive: {
    color: '#22C55E',
    fontWeight: '600',
  },
  playerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginTop: 12,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    minWidth: 100,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  priceDetail: {
    fontSize: 14,
    color: '#64748B',
  },
  priceBreakdown: {
    fontSize: 13,
    color: '#22C55E',
    marginTop: 8,
    fontWeight: '500',
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
