import { useRouter } from 'expo-router';
import React from 'react';
import { TextInput, View } from 'react-native';

const SearchBar = () => {
  
  const router = useRouter();

  return (
    <View>
      <TextInput 
       placeholder='Search Movie'
       className='h-14 text-[#1c3032]'
       placeholderTextColor="#89CFF0"
       onPress={() => router.navigate('/(tabs)/search')}
      />
    </View>
  )
}

export default SearchBar