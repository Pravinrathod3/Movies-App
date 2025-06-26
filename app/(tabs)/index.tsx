import Moviecard from '@/component/moviecard';
import SearchBar from '@/component/SearchBar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getmovie } from '../../service/movieapi';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}


export default function Home() {
  
  const [data, setdata] = useState<Movie[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
   const fetchmovies = async () => {
     try {
        const res = await getmovie();
        setdata(res.results)
     } catch (error) {
       console.log("error in ",error);
     }finally{
      setloading(false);
     }
   };

   fetchmovies();
  }, [])

  return (
    <LinearGradient
    colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 pt-12 px-4 p-5">
        <ScrollView 
          className='flex-1 px-5'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 20
          }}
        >
          <View>
            <Image 
            source={require('../../assets/icons/logo.jpeg')} 
            className='w-10 h-10 m-10 mx-auto'
            />

            <View className='flex-1 flex-row mb-30 bg-slate-500 rounded-full'>
            <AntDesign name="search1" size={24} color="#89CFF0" className='mt-3 mr-3' />
              <SearchBar />
            </View>
          </View>  
          
          <View className='flex-1 mt-5'>
            <Text className='text-gray-500 text-lg'>Latest Movie</Text>
            <FlatList 
            numColumns={3}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <Moviecard 
                {...item}
              />
            )}
            scrollEnabled={false}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 20,
              paddingRight: 3,
              marginBottom: 10
      
            }}
            className='mt-7 pb-32'
            
          />
          </View>
          

          
        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  );
}
