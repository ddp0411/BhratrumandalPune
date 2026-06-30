import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomTabBar, { TabKey } from '../components/BottomTabBar';
import { useWishlist } from '../context/WishlistContext';
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { colors } from '../theme';

// Custom tab host. We manage the active tab ourselves (no bottom-tabs dependency)
// and render the floating BottomTabBar on top. Screens receive `onNavigate` so
// their headers and empty-state CTAs can switch tabs.
export default function MainTabs() {
  const [active, setActive] = useState<TabKey>('Home');
  const { liked, shortlisted } = useWishlist();

  const onNavigate = (tab: TabKey) => setActive(tab);

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        {active === 'Home' && <HomeScreen onNavigate={onNavigate} />}
        {active === 'Search' && <SearchScreen />}
        {active === 'Matches' && <MatchesScreen onNavigate={onNavigate} />}
        {active === 'Wishlist' && <WishlistScreen onNavigate={onNavigate} />}
        {active === 'Profile' && <ProfileScreen />}
      </View>

      <BottomTabBar
        active={active}
        onChange={setActive}
        badges={{ Matches: liked.size, Wishlist: shortlisted.size }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
  },
});
