import { getmoviedetail } from '@/service/movieapi';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { linkTo } from 'expo-router/build/global-state/routing';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function MovieDetail() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      const response = await getmoviedetail({ id: String(id) });
      setMovie(response);
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#0B0C1E]"
      contentContainerStyle={{
        paddingBottom: 100,
        
      }}
    >
      {/* Hero */}
      <View className="relative mb-8">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}` }}
          className='w-full h-[500px]'
        />
        <LinearGradient
          colors={['transparent', '#0B0C1E']}
          style={{ position: 'absolute', bottom: 0, width, height: 220 }}
        />
        <TouchableOpacity className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full justify-center items-center shadow-md">
          <Feather name="play" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title & Tagline */}
      <View className="mb-6 space-y-2 pl-6 pr-6">
        <Text className="text-white text-3xl font-bold">{movie.title}</Text>
        {movie.tagline ? (
          <Text className="text-rose-400 italic text-base">{movie.tagline}</Text>
        ) : null}
      </View>

      {/* Meta Section */}
      <View className="flex-row items-center mb-6 space-x-4 pl-6 pr-6">
        <View className="flex-row items-center bg-[#1c1c2e] px-4 py-2 rounded-full">
          <AntDesign name="star" size={16} color="#facc15" />
          <Text className="text-white ml-2 text-base">{movie.vote_average.toFixed(1)}/10</Text>
        </View>
        <Text className="text-gray-400 text-sm">
          {movie.vote_count?.toLocaleString()} votes
        </Text>
      </View>

      {/* Detailed Info Section */}
      <View className="px-4 py-6">
        <View className="space-y-6">  {/* Increased gap between cards */}
          {/* Release Date */}
          <View className="bg-gray-900/40 rounded-xl p-5">  {/* Increased padding */}
            <View className="flex-row items-center space-x-4">  {/* Increased icon spacing */}
              <MaterialCommunityIcons name="calendar-month" size={24} color="#9ca3af" />
              <View className="space-y-1">  {/* Added gap between label and value */}
                <Text className="text-gray-400 text-xs uppercase tracking-wider">Release Date</Text>
                <Text className="text-white text-lg font-semibold">{movie.release_date}</Text>
              </View>
            </View>
          </View>

          {/* Runtime */}
          <View className="bg-gray-900/40 rounded-xl p-5">
            <View className="flex-row items-center space-x-4">
              <MaterialCommunityIcons name="clock-outline" size={24} color="#9ca3af" />
              <View className="space-y-1">
                <Text className="text-gray-400 text-xs uppercase tracking-wider">Runtime</Text>
                <Text className="text-white text-lg font-semibold">
                  {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                </Text>
              </View>
            </View>
          </View>

          {/* Language */}
          <View className="bg-gray-900/40 rounded-xl p-5">
            <View className="flex-row items-center space-x-4">
              <MaterialCommunityIcons name="web" size={24} color="#9ca3af" />
              <View className="space-y-1">
                <Text className="text-gray-400 text-xs uppercase tracking-wider">Language</Text>
                <Text className="text-white text-lg font-semibold">
                  {movie.spoken_languages?.[0]?.english_name || 'N/A'}
                </Text>
              </View>
            </View>
          </View>

          {/* Budget & Revenue */}
          <View className="bg-gray-900/40 rounded-xl p-5">
            <View className="flex-row items-center space-x-4">
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#9ca3af" />
              <View className="space-y-4">  {/* Increased spacing between budget and revenue */}
                <View className="space-y-1">
                  <Text className="text-gray-400 text-xs uppercase tracking-wider">Budget</Text>
                  <Text className="text-white text-lg font-semibold">
                    ${(movie.budget / 1_000_000).toFixed(1)}M
                  </Text>
                </View>
                <View className="space-y-1">
                  <Text className="text-gray-400 text-xs uppercase tracking-wider">Revenue</Text>
                  <Text className="text-white text-lg font-semibold">
                    ${(movie.revenue / 1_000_000).toFixed(1)}M
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Genres */}
      {movie.genres?.length > 0 && (
        <View className="mb-6 pl-6 pr-6">
          <Text className="text-white font-semibold text-base mb-3">Genres</Text>
          <View className="flex-row flex-wrap gap-3">
            {movie.genres.map((genre: any) => (
              <Text
                key={genre.id}
                className="text-sm bg-[#1c1c2e] px-4 py-2 rounded-full text-white"
              >
                {genre.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Overview */}
      <View className="mb-6 pl-6 pr-6" >
        <Text className="text-white font-semibold text-base mb-3">Overview</Text>
        <Text className="text-gray-300 text-base leading-6">{movie.overview}</Text>
      </View>

      {/* Production */}
      <DetailItem
        label="Production"
        value={movie.production_companies?.map((c: any) => c.name).join(' · ')}
      />

      {/* Countries */}
      <DetailItem
        label="Countries"
        value={movie.production_countries?.map((c: any) => c.name).join(' · ')}
      />

      {/* Homepage */}
      {movie.homepage && (
        <TouchableOpacity
          className="bg-indigo-600 mt-10 py-4 rounded-xl flex-row items-center justify-center mb-16"
          onPress={() => linkTo('/(tabs)')}
        >
          <Text className="text-white text-lg font-medium mr-2">Visit Homepage</Text>
          <Feather name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const DetailRow = ({
  left,
  right,
}: {
  left: { label: string; value: string };
  right: { label: string; value: string };
}) => (
  <View className="flex-row justify-between space-x-6 pl-6 pr-6">
    <View className="flex-1 space-y-1">
      <Text className="text-white text-sm font-semibold">{left.label}</Text>
      <Text className="text-gray-300 text-sm">{left.value}</Text>
    </View>
    <View className="flex-1 space-y-1">
      <Text className="text-white text-sm font-semibold">{right.label}</Text>
      <Text className="text-gray-300 text-sm">{right.value}</Text>
    </View>
  </View>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => {
  if (!value) return null;
  return (
    <View className="mb-6 space-y-1 pl-6 pr-6">
      <Text className="text-white text-sm font-semibold">{label}</Text>
      <Text className="text-gray-400 text-sm">{value}</Text>
    </View>
  );
};
