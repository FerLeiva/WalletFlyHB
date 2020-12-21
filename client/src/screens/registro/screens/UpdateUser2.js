import React, { useState } from "react";
import axios from "axios";
import { View, TextInput, Text } from "react-native";
import { useDispatch } from "react-redux";
import api from '../../../reducer/ActionCreator';
import { Button, Dialog, Paragraph } from 'react-native-paper'
import stylesInputs from './styles/inputs/s';

export default function UpdateUserScreen({ route, navigation }) {
  
  const [state, setState] = useState({
    id: route.params.id,
    birthdate: route.params.birthdate,
    documentNumber: route.params.documentNumber,
    email: route.params.email,
    firstName: route.params.firstName,
    lastName: route.params.lastName,
    phone: route.params.phone,
    address: "",
    addressNumber: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
    active: true
  });
  const [visible, setVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const hideDialog = () => {
    setVisible(!visible)
  }
  const { USER } = api;
  const dispatch = useDispatch();
  const handleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const createUser = () => {
    if (
      state.address === "" ||
      state.addressNumber === "" ||
      state.postalCode === "" ||
      state.city === "" ||
      state.province === "" ||
      state.country === ""
    ) {
      setAlertMessage("Debes completar todos los campos antes de continuar.")
      setVisible(!visible)
    } else {
      axios.put(`http://192.168.0.2:3001/users/${state.id}/userAccount`, state)
        .then(({ data }) => {
          dispatch({
            type: USER,
            payload: data
          })
        })
        .catch(err => {
          setAlertMessage(`Error! ${err}`)
          setVisible(!visible)
        });
    }
  };

  return (
    <>
      <View>
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Dirección"
          onChangeText={(value) => handleTextChange("address", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Número"
          onChangeText={(value) => handleTextChange("addressNumber", value)}
        />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Código Postal"
          onChangeText={(value) => handleTextChange("postalCode", value)} />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Ciudad"
          onChangeText={(value) => handleTextChange("city", value)} />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="Provincia"
          onChangeText={(value) => handleTextChange("province", value)} />
        <TextInput
          style={stylesInputs.inputs}
          placeholder="País"
          onChangeText={(value) => handleTextChange("country", value)} />
        <Button mode="contained" onPress={() => createUser()}>
          Crear Usuario
      </Button>
      </View>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{alertMessage}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(!visible)}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

