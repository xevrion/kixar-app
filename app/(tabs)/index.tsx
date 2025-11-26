import { useBooking } from "@/context/BookingContext";
import turfData from "@/data/turfData.json";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function TurfDetailsScreen() {
  const { updateCurrentBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<"about" | "policies">("about");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const progress = useSharedValue(0);
  const [expanded, setExpanded] = useState(false);

  const handleBookNow = () => {
    updateCurrentBooking({
      turfId: turfData.id,
      turfName: turfData.name,
      pricePerHour: turfData.pricePerHour,
    });
    router.push("/booking");
  };

  const width = Dimensions.get("window").width;

  const images = [
    "https://res.cloudinary.com/dgmstygkd/image/upload/v1762888049/kixar/owners/6905c09cdd4345bc15392878/jfnivh84bt3wcogtuliy.webp",
    "https://res.cloudinary.com/dgmstygkd/image/upload/v1763182708/kixar/owners/68f6718f92a28c0109ade099/yvggjbbxumfavprui9x6.png",
    "https://res.cloudinary.com/dgmstygkd/image/upload/v1761598822/kixar/owners/68f6718f92a28c0109ade099/rwluwokz9k0dhqos2xdv.png",
    "https://res.cloudinary.com/dgmstygkd/image/upload/v1761678600/kixar/owners/68f6718f92a28c0109ade099/yli8tzeqsllgmg2ufksv.png",
    "https://res.cloudinary.com/dgmstygkd/image/upload/v1761587832/kixar/owners/68dff819b2a88c27da6c4ba6/vvpsojljasldfrmovtoj.png",
  ];

  type TimingType = "weekdays" | "weekends";

  const days: { name: string; type: TimingType }[] = [
    { name: "Monday", type: "weekdays" },
    { name: "Tuesday", type: "weekdays" },
    { name: "Wednesday", type: "weekdays" },
    { name: "Thursday", type: "weekdays" },
    { name: "Friday", type: "weekdays" },
    { name: "Saturday", type: "weekends" },
    { name: "Sunday", type: "weekends" },
  ];

  const amenityIcons: Record<string, { icon: string; color?: string }> = {
    "Changing Rooms": { icon: "shirt-outline", color: "#4B5563" },
    Parking: { icon: "car-outline", color: "#4B5563" },
    "Drinking Water": { icon: "water-outline", color: "#4B5563" },
    "First Aid": { icon: "medical-outline", color: "#EF4444" },
    Washrooms: { icon: "man-outline", color: "#4B5563" },
    Cafeteria: { icon: "cafe-outline", color: "#4B5563" },
    Lighting: { icon: "bulb-outline", color: "#EAB308" },
    "Seating Area": { icon: "people-outline", color: "#4B5563" },
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner Image with Carousel Dots */}
        <View className="relative" style={{ width, height: 250 }}>
          {/* <Image
            source={{ uri: turfData.bannerImage }}
            className="w-full h-full"
            resizeMode="cover"
          /> */}
          <Carousel
            width={width}
            height={250}
            data={images}
            scrollAnimationDuration={600}
            onProgressChange={(_, absoluteProgress) =>
              (progress.value = absoluteProgress)
            }
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                className="w-full h-full"
                resizeMode="cover"
              />
            )}
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
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-2">
            {images.map((_, index) => {
              const animatedStyle = useAnimatedStyle(() => {
                const width = interpolate(
                  progress.value,
                  [index - 1, index, index + 1],
                  [8, 24, 8]
                );

                const opacity = interpolate(
                  progress.value,
                  [index - 1, index, index + 1],
                  [0.3, 1, 0.3]
                );

                return {
                  width,
                  opacity,
                };
              });

              return (
                <Animated.View
                  key={index}
                  className="h-2 rounded-full bg-brand"
                  style={animatedStyle}
                />
              );
            })}
          </View>
        </View>

        {/* Turf Info Card */}
        <View className="p-5 bg-white">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-semibold text-black">
                {turfData.name}
              </Text>
              <Ionicons name="checkmark-circle" size={20} color="#2DB0A3" />
            </View>

            <View
              className="flex-row items-center bg-white rounded-full px-4 py-1.5"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 3,
              }}
            >
              {/* Rating + Star */}
              <View className="flex-row items-center">
                <Text className="text-[13px] font-semibold text-black">
                  {turfData.rating}
                </Text>

                <Ionicons
                  name="star"
                  size={14}
                  color="#FFCC00"
                  style={{ marginLeft: 4 }}
                />
              </View>

              {/* Divider */}
              <Text className="text-[13px] text-slate-500 ml-2">|</Text>

              {/* Ratings count */}
              <Text className="text-[13px] text-slate-500 ml-2">
                {turfData.reviewCount} Ratings
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2 mb-3"></View>

          <View className="flex-row gap-1.5 mb-4">
            <Ionicons name="location-outline" size={18} color="#64748B" />
            <Text className="text-[13px] text-slate-600 flex-1">
              {turfData.address}
            </Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 rounded-full border border-slate-200">
              <Text className="text-sm font-medium text-black mr-1">
                Get Direction
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full border border-slate-200 justify-center items-center">
              <Ionicons name="call-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        {/* <View className="flex-row px-5 gap-3 mb-4">
          <TouchableOpacity
            className={`px-5 py-2.5 rounded-full ${activeTab === "about" ? "bg-black" : "bg-slate-100"}`}
            onPress={() => setActiveTab("about")}
          >
            <Text
              className={`text-sm font-medium ${activeTab === "about" ? "text-white" : "text-slate-600"}`}
            >
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-5 py-2.5 rounded-full ${activeTab === "policies" ? "bg-black" : "bg-slate-100"}`}
            onPress={() => setActiveTab("policies")}
          >
            <Text
              className={`text-sm font-medium ${activeTab === "policies" ? "text-white" : "text-slate-600"}`}
            >
              Policies
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* About Section */}
        {/* <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">
            About '{turfData.name}
          </Text>
          <Text className="text-sm text-slate-600 leading-5">
            {turfData.about.substring(0, 120)}...{" "}
            <Text className="text-brand font-medium">read more</Text>
          </Text>
        </View> */}

        <View className="flex-row px-5 gap-3 mb-4">
          {["about", "policies"].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`px-5 py-2.5 rounded-full ${
                activeTab === tab ? "bg-black" : "bg-slate-100"
              }`}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={`text-sm font-medium ${
                  activeTab === tab ? "text-white" : "text-slate-600"
                }`}
              >
                {tab === "about" ? "About" : "Policies"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "about" && (
          <View className="px-5 mb-6">
            <Text className="text-base font-semibold text-black mb-3">
              About '{turfData.name}'
            </Text>

            <Text className="text-sm text-slate-600 leading-5">
              {expanded
                ? turfData.about
                : `${turfData.about.substring(0, 120)}... `}

              <Text
                className="text-brand font-semibold"
                onPress={() => setExpanded(!expanded)}
              >
                {expanded ? "read less" : "read more"}
              </Text>
            </Text>
          </View>
        )}

        {activeTab === "policies" && (
          <View className="px-5 mb-6">
            <Text className="text-base font-semibold text-black mb-3">
              Policies
            </Text>

            {/* Cancellation Policy */}
            <Text className="text-sm text-slate-700 leading-5 mb-4">
              {turfData.policies.cancellation}
            </Text>

            {/* Rules */}
            <View className="space-y-2">
              {turfData.policies.rules.map((rule, index) => (
                <View key={index} className="flex-row items-start gap-2">
                  <Text className="text-brand">•</Text>
                  <Text className="text-sm text-slate-600 leading-5">
                    {rule}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Timings Information */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">
            Timings Information
          </Text>

          {days.map((day) => {
            const isOpen = expandedDay === day.name;

            return (
              <View key={day.name} className="mb-2">
                {/* Header */}
                <TouchableOpacity
                  className="flex-row justify-between items-center py-3 px-4 bg-slate-50 rounded-lg"
                  onPress={() => setExpandedDay(isOpen ? null : day.name)}
                >
                  <Text className="text-sm font-medium text-black">
                    {day.name}
                  </Text>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-[13px] text-slate-600">
                      {turfData.timing[day.type]}
                    </Text>
                    <Ionicons
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#64748B"
                    />
                  </View>
                </TouchableOpacity>

                {/* Expanded Body */}
                {isOpen && (
                  <View className="bg-white px-4 py-3 rounded-b-lg border border-slate-200 border-t-0">
                    <Text className="text-[13px] text-slate-600 leading-5">
                      Open hours: {turfData.timing[day.type]}
                    </Text>
                    <Text className="text-[13px] text-slate-600 leading-5 mt-1">
                      Booking available all day.
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Facilities */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">
            Facilities
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {turfData.amenities.map((amenity, index) => {
              const iconData = amenityIcons[amenity] || {
                icon: "checkbox-outline",
                color: "#64748B",
              };

              return (
                <View
                  key={index}
                  className="flex-row items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg"
                >
                  <Ionicons
                    name={iconData.icon}
                    size={16}
                    // color={iconData.color}
                  />
                  <Text className="text-[13px] text-black">{amenity}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Available Sports */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">
            Available Sports & Types
          </Text>
          <View className="flex-row gap-3 mb-4">
            {turfData.sports.slice(0, 3).map((sport, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center gap-1.5 px-4 py-2.5 rounded-full border ${
                  index === 0
                    ? "bg-black border-black"
                    : "bg-white border-slate-200"
                }`}
              >
                <Ionicons
                  name="football"
                  size={16}
                  color={index === 0 ? "#FFF" : "#000"}
                />
                <Text
                  className={`text-[13px] font-medium ${index === 0 ? "text-white" : "text-black"}`}
                >
                  {sport === "Football" ? "Foot Ball" : sport}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="items-center py-5">
            <Image
              source={require("../../assets/images/turf.png")}
              className="w-[250px] h-[120px] mb-3"
              resizeMode="contain"
            />
            <Text className="text-[15px] font-semibold text-black mb-1">
              Turf - Foot Ball & Cricket
            </Text>
            <Text className="text-[13px] text-slate-600">7v7</Text>
          </View>
        </View>

        {/* Offers */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">
            Offers
          </Text>
          <View className="flex-col p-4 bg-[#F4FBFA] rounded-xl border border-[#CAEBE8] gap-3">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="pricetag" size={20} color="#2DB0A3" />
              <Text className="text-base font-extrabold">
                FIRSTBOOK
              </Text>
            </View>
            <Text className="flex-1 text-[15px] text-black leading-[18px]">
              Get a 20% Offer on your first turf booking with Kixar App
            </Text>
          </View>
        </View>

        {/* Ratings & Reviews */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">
            Ratings & Reviews
          </Text>
          <View className="flex-row items-center gap-3 mb-4">
            <View className="flex-row items-center gap-1.5 bg-brand px-3 py-2 rounded-full">
              <Text className="text-base font-semibold text-white">
                {turfData.rating}
              </Text>
              <Ionicons name="star" size={18} color="#FFCC00" />
            </View>
            <Text className="text-sm text-slate-600">
              {turfData.reviewCount} Ratings · {turfData.reviews.length} Reviews
            </Text>
          </View>

          {turfData.reviews.slice(0, 2).map((review) => (
            <View
              key={review.id}
              className="mb-4 pb-4 border-b border-slate-100"
            >
              <View className="flex-row gap-3 mb-2">
                <View className="w-10 h-10 rounded-full bg-slate-200 justify-center items-center">
                  <Text className="text-base font-semibold text-slate-600">
                    {review.userName.charAt(0)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-black mb-0.5">
                    {review.userName}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-xs font-medium text-black">
                      {review.rating}.0
                    </Text>
                    <Ionicons name="star" size={12} color="#FFA500" />
                  </View>
                </View>
              </View>
              <Text className="text-xs text-slate-400 mb-2">
                2 days ago · {review.date}
              </Text>
              <Text className="text-[13px] text-slate-600 leading-[18px]">
                {review.comment}
              </Text>
            </View>
          ))}

          <TouchableOpacity>
            <Text className="text-sm font-medium text-brand text-center mt-2">
              See All Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Map View */}
        <View className="px-5 mb-6">
          <Text className="text-base font-semibold text-black mb-3">
            Map View
          </Text>
          <View className="h-[200px] bg-slate-200 rounded-xl justify-center items-center mb-3">
            <Text className="text-sm text-slate-600">Map View Placeholder</Text>
          </View>
          <TouchableOpacity className="flex-row items-center justify-center bg-black py-3.5 rounded-lg gap-1.5">
            <Text className="text-sm font-semibold text-white">
              Get Direction
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View className="h-[100px]" />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="bg-white border-t border-slate-200 shadow-2xl">
        <View className="bg-[#D5EFED] py-2 items-center">
          <Text className="text-xs font-semibold text-brand">
            15% OFF ends in 01:50 s
          </Text>
        </View>
        <View className="flex-row justify-between items-center px-5 py-3">
          <View>
            <Text className="text-base font-semibold text-black">
              ₹ {turfData.pricePerHour} / 1 hour
            </Text>
            <Text className="text-[11px] text-slate-600">
              per player cost in next step
            </Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center bg-brand px-6 py-3 rounded-lg gap-1.5"
            onPress={handleBookNow}
          >
            <Text className="text-[15px] font-semibold text-white">
              Book Now
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
