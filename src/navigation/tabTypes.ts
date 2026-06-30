import { TabKey } from '../components/BottomTabBar';

// Props passed to each tab screen so headers / CTAs can switch tabs without a
// nested navigator (the custom MainTabs owns the active tab state).
export interface TabScreenProps {
  onNavigate: (tab: TabKey) => void;
}
