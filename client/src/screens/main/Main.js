import React from "react";
import { StyleSheet } from "react-native";
// componentes
import Home from "./screens/Home";
import UserProfile from "./screens/userProfile/UserProfile";
import Contactos from "./screens/Contactos";
// react navigation
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StackEstadisticas from "./screens/estadisticas/StackEstadisticas";

const Tab = createMaterialBottomTabNavigator();

export default function Footer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ffffff"
      labelStyle={{ fontFamily: "Bree-Serif" }}
      style={{ backgroundColor: "rgb(242, 59, 108)" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={26} color={"#cb3065"} />
          ),
        }}
      />
      <Tab.Screen
        name="Estadisticas"
        component={StackEstadisticas}
        options={{
          tabBarLabel: "Estadisticas",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chart-bar"
              size={26}
              color={"#cb3065"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={26}
              color={"#cb3065"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contactos"
        component={Contactos}
        options={{
          tabBarLabel: "Contactos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-plus"
              size={26}
              color={"#cb3065"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
