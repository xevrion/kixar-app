import { useBooking } from '@/context/BookingContext';
import turfData from '@/data/turfData.json';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import "../../globals.css";

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Banner Image with Carousel Dots */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: turfData.bannerImage }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.carouselDots}>
            {[...Array(5)].map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === 0 && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Turf Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.headerRow}>
            <Text style={styles.turfName}>{turfData.name}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{turfData.rating}</Text>
              <Ionicons name="star" size={14} color="#FFF" />
            </View>
            <Text style={styles.reviewCount}>{turfData.reviewCount} Ratings</Text>
          </View>

          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={18} color="#64748B" />
            <Text style={styles.addressText}>{turfData.address}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.directionButton}>
              <Text style={styles.directionButtonText}>Get Direction</Text>
              <Ionicons name="chevron-forward" size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'policies' && styles.activeTab]}
            onPress={() => setActiveTab('policies')}
          >
            <Text style={[styles.tabText, activeTab === 'policies' && styles.activeTabText]}>
              Policies
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About '{turfData.name}</Text>
          <Text style={styles.aboutText}>
            {turfData.about.substring(0, 120)}...{' '}
            <Text style={styles.readMore}>read more</Text>
          </Text>
        </View>

        {/* Timings Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timings Information</Text>
          <TouchableOpacity
            style={styles.timingRow}
            onPress={() => setExpandedDay(expandedDay === 'Monday' ? null : 'Monday')}
          >
            <Text style={styles.dayText}>Monday</Text>
            <View style={styles.timingRight}>
              <Text style={styles.timingText}>{turfData.timing.weekdays}</Text>
              <Ionicons
                name={expandedDay === 'Monday' ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#64748B"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Facilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {turfData.amenities.slice(0, 4).map((amenity, index) => (
              <View key={index} style={styles.facilityChip}>
                <Ionicons name="checkmark-circle" size={16} color="#64748B" />
                <Text style={styles.facilityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Available Sports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Sports & Types</Text>
          <View style={styles.sportsRow}>
            {turfData.sports.slice(0, 3).map((sport, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.sportChip, index === 0 && styles.activeSportChip]}
              >
                <Ionicons name="football" size={16} color={index === 0 ? '#FFF' : '#000'} />
                <Text style={[styles.sportText, index === 0 && styles.activeSportText]}>
                  {sport === 'Football' ? 'Foot Ball' : sport}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.turfCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400' }}
              style={styles.turfImage}
              resizeMode="contain"
            />
            <Text style={styles.turfCardTitle}>Turf - Foot Ball & Cricket</Text>
            <Text style={styles.turfCardSubtitle}>7v7</Text>
          </View>
        </View>

        {/* Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offers</Text>
          <View style={styles.offerCard}>
            <View style={styles.offerIcon}>
              <Ionicons name="pricetag" size={20} color="#22C55E" />
              <Text style={styles.offerBadge}>FIRSTBOOK</Text>
            </View>
            <Text style={styles.offerText}>
              Get a 20% Offer on your first turf booking with Kixar App
            </Text>
          </View>
        </View>

        {/* Ratings & Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
          <View style={styles.ratingSummary}>
            <View style={styles.ratingBadgeLarge}>
              <Text style={styles.ratingLargeText}>{turfData.rating}</Text>
              <Ionicons name="star" size={18} color="#FFF" />
            </View>
            <Text style={styles.ratingSummaryText}>
              {turfData.reviewCount} Ratings · {turfData.reviews.length} Reviews
            </Text>
          </View>

          {turfData.reviews.slice(0, 2).map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.avatarText}>{review.userName.charAt(0)}</Text>
                </View>
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewerName}>{review.userName}</Text>
                  <View style={styles.reviewMeta}>
                    <Text style={styles.reviewRating}>{review.rating}.0</Text>
                    <Ionicons name="star" size={12} color="#FFA500" />
                  </View>
                </View>
              </View>
              <Text style={styles.reviewDate}>2 days ago · {review.date}</Text>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}

          <TouchableOpacity>
            <Text style={styles.seeAllReviews}>See All Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Map View */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Map View</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Map View Placeholder</Text>
          </View>
          <TouchableOpacity style={styles.mapDirectionButton}>
            <Text style={styles.mapDirectionText}>Get Direction</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.offerBanner}>
          <Text style={styles.offerBannerText}>15% OFF ends in 01:50 s</Text>
        </View>
        <View style={styles.bottomContent}>
          <View>
            <Text style={styles.priceLabel}>₹ {turfData.pricePerHour} / 1 hour</Text>
            <Text style={styles.priceSub}>per player cost in next step</Text>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>Book Now</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
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
  bannerContainer: {
    position: 'relative',
    width: width,
    height: 250,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topActions: {
    position: 'absolute',
    top: 50,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselDots: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeDot: {
    backgroundColor: '#22C55E',
    width: 24,
  },
  infoCard: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  turfName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  verifiedBadge: {},
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  reviewCount: {
    fontSize: 14,
    color: '#64748B',
  },
  addressRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  addressText: {
    fontSize: 13,
    color: '#64748B',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  directionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  directionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFF',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  readMore: {
    color: '#22C55E',
    fontWeight: '500',
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  timingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timingText: {
    fontSize: 13,
    color: '#64748B',
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  facilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  facilityText: {
    fontSize: 13,
    color: '#000',
  },
  sportsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFF',
  },
  activeSportChip: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sportText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
  activeSportText: {
    color: '#FFF',
  },
  turfCard: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  turfImage: {
    width: 250,
    height: 120,
    marginBottom: 12,
  },
  turfCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  turfCardSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  offerCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    gap: 12,
  },
  offerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  offerBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C55E',
  },
  offerText: {
    flex: 1,
    fontSize: 13,
    color: '#166534',
    lineHeight: 18,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  ratingBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ratingLargeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  ratingSummaryText: {
    fontSize: 14,
    color: '#64748B',
  },
  reviewCard: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewRating: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  reviewDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  seeAllReviews: {
    fontSize: 14,
    fontWeight: '500',
    color: '#22C55E',
    textAlign: 'center',
    marginTop: 8,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapText: {
    fontSize: 14,
    color: '#64748B',
  },
  mapDirectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 6,
  },
  mapDirectionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  bottomBar: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  offerBanner: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 8,
    alignItems: 'center',
  },
  offerBannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  priceSub: {
    fontSize: 11,
    color: '#64748B',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
  },
});
