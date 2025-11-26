import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  date: string;
  timeSlot: string;
  timePeriod: string;
  court: string;
  playerCount: number;
  pricePerHour: number;
  bookingDate: string;
}

interface CurrentBooking {
  turfId: string | null;
  turfName: string;
  date: string | null;
  timeSlot: string | null;
  timePeriod: string | null;
  court: string | null;
  playerCount: number;
  pricePerHour: number;
}

interface BookingContextType {
  bookings: Booking[];
  currentBooking: CurrentBooking;
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => void;
  updateCurrentBooking: (updates: Partial<CurrentBooking>) => void;
  resetCurrentBooking: () => void;
  deleteBooking: (bookingId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<CurrentBooking>({
    turfId: null,
    turfName: '',
    date: null,
    timeSlot: null,
    timePeriod: null,
    court: null,
    playerCount: 5,
    pricePerHour: 0,
  });

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      saveBookings();
    }
  }, [bookings]);

  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const saveBookings = async () => {
    try {
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'bookingDate'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, newBooking]);
    resetCurrentBooking();
  };

  const updateCurrentBooking = (updates: Partial<CurrentBooking>) => {
    setCurrentBooking((prev) => ({ ...prev, ...updates }));
  };

  const resetCurrentBooking = () => {
    setCurrentBooking({
      turfId: null,
      turfName: '',
      date: null,
      timeSlot: null,
      timePeriod: null,
      court: null,
      playerCount: 5,
      pricePerHour: 0,
    });
  };

  const deleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
  };

  const value: BookingContextType = {
    bookings,
    currentBooking,
    addBooking,
    updateCurrentBooking,
    resetCurrentBooking,
    deleteBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
