import CopyButton from '@/src/components/CopyButton';
import HomeHeader from '@/src/components/HomeHeader';
import MacroGrid from '@/src/components/MacroGrid';
import RecentMeals from '@/src/components/RecentMeals';
import ReminderToggle from '@/src/components/ReminderToggle';
import ShareButton from '@/src/components/ShareButton';
import { getMeals, Meal } from '@/src/storage/meals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
    console.log('Loaded meals:', data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>MacroZone</Text>
        <ShareButton meals={meals} />
      </View>
      <CopyButton meals={meals} />
      <HomeHeader />
      <MacroGrid meals={meals} />
      <ReminderToggle />
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}