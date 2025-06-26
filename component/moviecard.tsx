import React from 'react';
import { Image, Text, View } from 'react-native';
import { Movie } from '../app/(tabs)/index';

const Moviecard = ({id, title, overview, poster_path, vote_average, release_date} : Movie) => {
  return (
    <View className="rounded-lg mb-4 flex-1 max-w-[30%]">
      <Image 
        source={{uri: `https://image.tmdb.org/t/p/w500${poster_path}`}}
        className="w-full h-40 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-white text-sm font-medium mb-1" numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

export default Moviecard;