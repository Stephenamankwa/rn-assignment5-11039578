import * as React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Image, SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeContext = React.createContext();

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require ('./assets/profile.png' )}
          style={styles.avatar}
        />
       <View style={styles.useerDetails}>
        <Paragraph style={styles.paragraph}> Welcome Back</Paragraph>
        <Paragraph style={styles.userName}>Eric Atsu</Paragraph>
      </View>
        <IconButton icon="magnify" size={24} onPress={() => {}} />
      </View>
      <Image
          source={require ('./assets/Card.png' )}
          style={styles.cardDetails}
        />
      <View style={styles.actions}>
        <IconButton  icon={require ('./assets/send.png' )} onPress={() => {}} />
        <IconButton  icon={require ('./assets/recieve.png' )} onPress={() => {}} />
        <IconButton icon={require ('./assets/loan.png' )} onPress={() => {}} />
        <IconButton icon={require ('./assets/topUp.png' )} onPress={() => {}} />
      </View>
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Transaction</Text>
        <Text style={styles.sellAll}>Sell All</Text>
      </View>
      <ScrollView style={styles.transactionList}>
        {/* Sample transactions */}
        <View style={styles.transaction}>
          <Icon name="apple" size={24} />
          <Text style={styles.transactionText}>Apple Store</Text>
          <Text style={styles.transactionAmount}>- $58.99</Text>
        </View>
        <View style={styles.transaction}>
          <Icon name="spotify" size={24} />
          <Text style={styles.transactionText}>Spotify</Text>
          <Text style={styles.transactionAmount}>- $12.99</Text>
        </View>
        <View style={styles.transaction}>
          <Icon name="cash" size={24} />
          <Text style={styles.transactionText}>Money Transfer</Text>
          <Text style={styles.transactionAmount}>$300</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsScreen = () => {
  const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Language</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>My Profile</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Contact Us</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Change Password</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Privacy Policy</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Theme</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const MyCardsScreen = () => (
  <View style={styles.screen}>
    <Text>My Cards</Text>
  </View>
);

const StatisticsScreen = () => (
  <View style={styles.screen}>
    <Text>Statistics</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
          iconName = 'home';
          } else if (route.name === 'My Cards') {
            iconName = 'credit-card';
          } else if (route.name === 'Statistics') {
            iconName = 'chart-line';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Cards" component={MyCardsScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const CombinedDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MyTabs" component={MyTabs} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 22,
    alignItems: 'left',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#2E86C1',
    borderRadius: 10,
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    color: '#ffffff',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    color: '#ffffff',
  },
  cardLogo: {
    width: 50,
    height: 30,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sellAll: {
    color: 'tomato',
  },
  transactionList: {
    flex: 1,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 18,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
