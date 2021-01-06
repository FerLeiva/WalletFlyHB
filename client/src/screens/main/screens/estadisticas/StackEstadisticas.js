import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Todo from "./screens/Todo";
import Ingresos from "./screens/Ingresos";
import Gastos from "./screens/Gastos";
import { Appbar } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();

export default function StackEstadisticas({ navigation }) {
  const { ingreso, gasto } = useSelector((state) => state.transacciones);

  const SumIngreso = () => {
    let suma = 0;
    ingreso &&
      ingreso.map((el) => {
        suma += el.total;
      });
    return suma;
  };
  const SumGastos = () => {
    let gastos = 0;
    gasto &&
      gasto.map((el) => {
        gastos += el.total;
      });
    return gastos;
  };
  const dataGrafico = [
    {
      name: "Ingresos",
      population: SumIngreso(),
      color: "#5ad0ef",
      legendFontColor: "#ffffff",
      legendFontSize: 15,
      legendFontFamily: "Bree-Serif",
    },
    {
      name: "Gastos",
      population: SumGastos(),
      color: "#e575ea",
      legendFontColor: "#ffffff",
      legendFontSize: 15,
      legendFontFamily: "Bree-Serif",
    },
  ];
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  return (
    <>
      <Appbar.Header
        style={{ backgroundColor: "#f23b6c", borderBottomColor: "#f23b6c" }}
      >
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Estadisticas" />
      </Appbar.Header>
      <View style={s.container}>
        <View>
          <LinearGradient
            colors={["#F23B6C", "#F23B6C", "#cb3065"]}
            style={s.buttonRelieve}
          >
            <Text style={s.balance}>
              Saldo Actual: $ {SumIngreso() - SumGastos()} ARS
            </Text>
          </LinearGradient>
        </View>

        <View>
          <LinearGradient
            colors={["#F23B6C", "#F23B6C", "#cb3065"]}
            style={s.grafico}
          >
            {ingreso.length && (
              <PieChart
                data={dataGrafico}
                width={Dimensions.get("screen").width}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
              />
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Ingresos")}>
                <View style={s.containerIngresos}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#fff",
                      fontFamily: "Bree-Serif",
                    }}
                  >
                    Ingresos
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      fontFamily: "Bree-Serif",
                    }}
                  >
                    $ {SumIngreso()} ARS
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Gastos")}>
                <View style={s.containerGastos}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#fff",
                      fontFamily: "Bree-Serif",
                    }}
                  >
                    Gastos
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      fontFamily: "Bree-Serif",
                    }}
                  >
                    $ {SumGastos()} ARS
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontFamily: "Bree-Serif", fontSize: 14 },
            activeTintColor: "#F23B6C",
            inactiveTintColor: "#cB3065",
            indicatorStyle: { backgroundColor: "#F23B6C" },
            style: {
              boxShadow: "rgb(181 141 232 / 50%) 0px 1px 1px",
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Tab.Screen name="Todo" component={Todo} />
          <Tab.Screen name="Ingresos" component={Ingresos} />
          <Tab.Screen name="Gastos" component={Gastos} />
        </Tab.Navigator>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  containerIngresos: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#5ad0ef",
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  containerGastos: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e575ea",
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonRelieve: {
    flex: 1,
    width: "80%",
    marginTop: "1rem",
    marginBottom: "1rem",
    alignSelf: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: 5,
  },
  balance: {
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: "1.3rem",
    fontFamily: "Bree-Serif",
  },
  grafico: {
    width: "100%",
    height: "18rem",
  },
});
