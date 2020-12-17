import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import api from '../../../../reducer/ActionCreator';
import Axios from "axios";

export default function Enviar(props) {
  const [text, setText] = useState({
    email: "",
    amount: 0,
    title: "",
    description: "",
  });

  const user = useSelector(state => state.userLogin);
  const emailRegister = useSelector(state => state.email)
  const dispatch = useDispatch()
  const { SALDO } = api
  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
  };
  console.log(emailRegister)
  console.log(user.email)
  const sendMoney = () => {
    Axios.get(`http://localhost:3001/users/getUserByEmail?email=${text.email}`) //trae el destinatario
      .then(({ data }) => {
        var contact = data;

        Axios.get(
          `http://localhost:3001/users/getUserByEmail/?email=${user ? user.email: emailRegister}`
        )
          .then(({ data }) => {
            console.log(data)
            if (data.accounts[0].balance < text.amount) {
              alert("no posees el saldo suficiente");
            } else {
              Axios.post(
                `http://localhost:3001/transaction/${data.accounts[0].id}`,
                {
                  title: text.title,
                  description: text.description,
                  type: "egreso",
                  total: parseInt(text.amount, 10),
                }
              )
                .then(({data}) => {
                  dispatch({
                    type: SALDO,
                    payload: data.balance
                  })
                  Axios.post(
                    `http://localhost:3001/transaction/${contact.accounts[0].id}`,
                    {
                      title: text.title,
                      description: text.description,
                      type: "ingreso",
                      total: parseInt(text.amount, 10),
                    }
                  )
                    .then(({ data }) => {
                      alert("Envio de dinero realizado con exito");
                      props.navigation.navigate('Home')
                    })
                    .catch((error) => {
                      console.log("error en el destinatario");
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log("error en el envio");
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        alert("el email no corresponde a un usuario");
      });
  };

  return (
    <View>
      <Text>Email del destinatario</Text>
      <TextInput
        placeholder="Ingrese el email"
        onChangeText={(value) => handleTextChange("email", value)}
      ></TextInput>
      <Text>Titulo</Text>
      <TextInput
        placeholder="Ingrese un titulo"
        onChangeText={(value) => handleTextChange("title", value)}
      ></TextInput>
      <Text>Descripcion</Text>
      <TextInput
        placeholder="Ingrese una descripcion"
        onChangeText={(value) => handleTextChange("description", value)}
      ></TextInput>
      <Text>Monto del envio</Text>
      <TextInput
        placeholder="ingrese el monto"
        onChangeText={(value) => handleTextChange("amount", value)}
      ></TextInput>
      <Button title="Enviar" onPress={() => sendMoney()}/>
    </View>
  );
}
