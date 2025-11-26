import { useBooking } from '@/context/BookingContext';
import turfData from '@/data/turfData.json';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


const { width } = Dimensions.get('window');

export default function TurfDetailsScreen() {
  const { updateCurrentBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<'about' | 'policies'>('about');
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const handleBookNow = () => {
    updateCurrentBooking({
      turfId: turfData.id,
      turfName: turfData.name,
      pricePerHour: turfData.pricePerHour,
    });
    router.push('/booking');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner Image with Carousel Dots */}
        <View className="relative" style={{ width, height: 250 }}>
          <Image
            source={{ uri: turfData.bannerImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity className="absolute top-[50px] left-4 w-10 h-10 rounded-full  justify-center items-center">
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View className="absolute top-[50px] right-4 flex-row gap-3">
            <TouchableOpacity className="w-10 h-10 rounded-full  justify-center items-center">
              <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full  justify-center items-center">
              <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View className="absolute bottom-4 self-center flex-row gap-1.5">
            {[...Array(5)].map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded ${index === 0 ? 'w-6 bg-[#2DB0A3]' : 'w-2 bg-white/50'}`}
              />
            ))}
          </View>
        </View>

        {/* Turf Info Card */}
        <View className="p-5 bg-white">
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-xl font-semibold text-black">{turfData.name}</Text>
            <Ionicons name="checkmark-circle" size={20} color="#2DB0A3" />
          </View>

          <View className="flex-row items-center gap-2 mb-3">
            <View className="flex-row items-center gap-1 bg-[#2DB0A3] px-2 py-1 rounded">
              <Text className="text-sm font-semibold text-white">{turfData.rating}</Text>
              <Ionicons name="star" size={14} color="#FFF" />
            </View>
            <Text className="text-sm text-slate-600">{turfData.reviewCount} Ratings</Text>
          </View>

          <View className="flex-row gap-1.5 mb-4">
            <Ionicons name="location-outline" size={18} color="#64748B" />
            <Text className="text-[13px] text-slate-600 flex-1">{turfData.address}</Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 rounded-lg border border-slate-200">
              <Text className="text-sm font-medium text-black mr-1">Get Direction</Text>
              <Ionicons name="chevron-forward" size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-lg border border-slate-200 justify-center items-center">
              <Ionicons name="call" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row px-5 gap-3 mb-4">
          <TouchableOpacity
            className={`px-5 py-2.5 rounded-full ${activeTab === 'about' ? 'bg-black' : 'bg-slate-100'}`}
            onPress={() => setActiveTab('about')}
          >
            <Text className={`text-sm font-medium ${activeTab === 'about' ? 'text-white' : 'text-slate-600'}`}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-5 py-2.5 rounded-full ${activeTab === 'policies' ? 'bg-black' : 'bg-slate-100'}`}
            onPress={() => setActiveTab('policies')}
          >
            <Text className={`text-sm font-medium ${activeTab === 'policies' ? 'text-white' : 'text-slate-600'}`}>
              Policies
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">About '{turfData.name}</Text>
          <Text className="text-sm text-slate-600 leading-5">
            {turfData.about.substring(0, 120)}...{' '}
            <Text className="text-[#2DB0A3] font-medium">read more</Text>
          </Text>
        </View>

        {/* Timings Information */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">Timings Information</Text>
          <TouchableOpacity
            className="flex-row justify-between items-center py-3 px-4 bg-slate-50 rounded-lg"
            onPress={() => setExpandedDay(expandedDay === 'Monday' ? null : 'Monday')}
          >
            <Text className="text-sm font-medium text-black">Monday</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-[13px] text-slate-600">{turfData.timing.weekdays}</Text>
              <Ionicons
                name={expandedDay === 'Monday' ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#64748B"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Facilities */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">Facilities</Text>
          <View className="flex-row flex-wrap gap-2">
            {turfData.amenities.slice(0, 4).map((amenity, index) => (
              <View key={index} className="flex-row items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg">
                <Ionicons name="checkmark-circle" size={16} color="#64748B" />
                <Text className="text-[13px] text-black">{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Available Sports */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">Available Sports & Types</Text>
          <View className="flex-row gap-3 mb-4">
            {turfData.sports.slice(0, 3).map((sport, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center gap-1.5 px-4 py-2.5 rounded-full border ${
                  index === 0 ? 'bg-black border-black' : 'bg-white border-slate-200'
                }`}
              >
                <Ionicons name="football" size={16} color={index === 0 ? '#FFF' : '#000'} />
                <Text className={`text-[13px] font-medium ${index === 0 ? 'text-white' : 'text-black'}`}>
                  {sport === 'Football' ? 'Foot Ball' : sport}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="items-center py-5">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400' }}
              className="w-[250px] h-[120px] mb-3"
              resizeMode="contain"
            />
            <Text className="text-[15px] font-semibold text-black mb-1">Turf - Foot Ball & Cricket</Text>
            <Text className="text-[13px] text-slate-600">7v7</Text>
          </View>
        </View>

        {/* Offers */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">Offers</Text>
          <View className="flex-row p-4 bg-[#F4FBFA] rounded-xl border border-[#CAEBE8] gap-3">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="pricetag" size={20} color="#2DB0A3" />
              <Text className="text-xs font-semibold text-black">FIRSTBOOK</Text>
            </View>
            <Text className="flex-1 text-[13px] text-black leading-[18px]">
              Get a 20% Offer on your first turf booking with Kixar App
            </Text>
          </View>
        </View>

        {/* Ratings & Reviews */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">Ratings & Reviews</Text>
          <View className="flex-row items-center gap-3 mb-4">
            <View className="flex-row items-center gap-1.5 bg-[#2DB0A3] px-3 py-2 rounded-full">
              <Text className="text-base font-semibold text-white">{turfData.rating}</Text>
              <Ionicons name="star" size={18} color="#FFCC00" />
            </View>
            <Text className="text-sm text-slate-600">
              {turfData.reviewCount} Ratings · {turfData.reviews.length} Reviews
            </Text>
          </View>

          {turfData.reviews.slice(0, 2).map((review) => (
            <View key={review.id} className="mb-4 pb-4 border-b border-slate-100">
              <View className="flex-row gap-3 mb-2">
                <View className="w-10 h-10 rounded-full bg-slate-200 justify-center items-center">
                  <Text className="text-base font-semibold text-slate-600">
                    {review.userName.charAt(0)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-black mb-0.5">{review.userName}</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-xs font-medium text-black">{review.rating}.0</Text>
                    <Ionicons name="star" size={12} color="#FFA500" />
                  </View>
                </View>
              </View>
              <Text className="text-xs text-slate-400 mb-2">2 days ago · {review.date}</Text>
              <Text className="text-[13px] text-slate-600 leading-[18px]">{review.comment}</Text>
            </View>
          ))}

          <TouchableOpacity>
            <Text className="text-sm font-medium text-[#2DB0A3] text-center mt-2">See All Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Map View */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">Map View</Text>
          <View className="h-[200px] bg-slate-200 rounded-xl justify-center items-center mb-3">
            <Text className="text-sm text-slate-600">Map View Placeholder</Text>
          </View>
          <TouchableOpacity className="flex-row items-center justify-center bg-black py-3.5 rounded-lg gap-1.5">
            <Text className="text-sm font-semibold text-white">Get Direction</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View className="h-[100px]" />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="bg-white border-t border-slate-200 shadow-2xl">
        <View className="bg-[#D5EFED] py-2 items-center">
          <Text className="text-xs font-semibold text-[#2DB0A3]">15% OFF ends in 01:50 s</Text>
        </View>
        <View className="flex-row justify-between items-center px-5 py-3">
          <View>
            <Text className="text-base font-semibold text-black">
              ₹ {turfData.pricePerHour} / 1 hour
            </Text>
            <Text className="text-[11px] text-slate-600">per player cost in next step</Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center bg-[#2DB0A3] px-6 py-3 rounded-lg gap-1.5"
            onPress={handleBookNow}
          >
            <Text className="text-[15px] font-semibold text-white">Book Now</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
