import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Router, Route, Link } from "./react-router";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import UpdateUser from "./src/screens/UpdateUser";
import UpdateUser2 from "./src/screens/UpdateUser2";
import Register from "./src/screens/Register";
import UserProfile from "./src/screens/userProfile/UserProfile";
import Footer from "./src/screens/footer/Footer";
import DatosPersonales from "./src/screens/userProfile/DatosPersonales";
import Transacciones from "./src/screens/main/Transacciones";
import Home from "./src/screens/main/Home";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="UpdateUser2" component={UpdateUser2} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Transacciones" component={Transacciones} />
      <Stack.Screen name="DatosPersonales" component={DatosPersonales} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="footer" component={Footer} />
    </Stack.Navigator>
  );
}

// const Home = () => <Text>Home</Text>;

const About = () => <Text>About</Text>;

const App = () => (
  <Router>
    <NavigationContainer>
      <MyStack />
      <Footer />
    </NavigationContainer>
  </Router>
);

export default App;
