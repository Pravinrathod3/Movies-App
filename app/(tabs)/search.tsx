import Moviecard from '@/component/moviecard';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import { getmovie } from '../../service/movieapi';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}


export default function Search() {
  
  const [data, setdata] = useState<Movie[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [query, setquery] = useState<string>('');

  useEffect(() => {
   const fetchmovies = async () => {
     try {
        const res = await getmovie({query});
        setdata(res.results)
     } catch (error) {
       console.log("error in ",error);
     }finally{
      setloading(false);
     }
   };

   fetchmovies();
  }, [query])

  return (
    <LinearGradient
    colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 pt-12 px-4 p-5"> 
          
          {loading && (
              <View className="my-10 items-center">
              <View className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-blue-500" />
              <Text className="text-white mt-4 text-base">Loading...</Text>
            </View>
          )}
          
          <View className='flex-1 mt-5'>
            
            <FlatList 
            numColumns={3}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <Moviecard 
                {...item}
              />
            )}

            ListHeaderComponent={
              <View className='m-5'>
              <View className='flex-1 flex-row mb-30 bg-slate-500 rounded-full'>
               <AntDesign name="search1" size={24} color="#89CFF0" className='mt-3 ml-3' />
               <TextInput 
                 onChangeText={(text) => setquery(text)}
                 value={query}
                 placeholder='Type movie name'
                 className='w-full'
               />
              </View>
              {query && (
                <Text className='text-white pt-6'>Search For: <Text className=' text-rose-600'>{query}</Text></Text>
              ) 
            }
              
            </View>
            }
            

            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 20,
              paddingRight: 3,
              marginBottom: 10
      
            }}
            className='mt-7 pb-32'
            
          />
          </View>
  

      </SafeAreaView>
    </LinearGradient>
  );
}
