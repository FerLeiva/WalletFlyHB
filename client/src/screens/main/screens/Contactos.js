import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
} from "react-native";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Contactos() {
  const [text, setText] = useState({ email: "" });
  const [contacts, setContacts] = useState([]);
  const user = useSelector((state) => state.userLogin);

  const addContact = () => {
    axios
      .get(`http://localhost:3001/users/getUserByEmail/email=${text.email}`)
      .then(({ data }) => {
        axios
          .post(
            `http://localhost:3001/contacts/${user.id}?contactId=${data.id}`
          )
          .then((data) => {
            setContacts([...contacts, data]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (contacto) => {
    axios
      .delete(`http://localhost:3001/contacts/${user.id}?contactId=${contacto}`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // axios.get(`http://localhost:3001/contacts/${user.id}`).then ((data) => {setContacts(data)}).catch((error) => {console.log(error)});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/contacts/${user.id}`)
      .then((data) => {
        setContacts(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTextChange = (name, value) => {
    setText({ ...text, [name]: value });
  };

  return (
    <View style={s.container}>
      <Text style={s.textContato}>Contactos WalletFly</Text>
      <ScrollView>
        {contacts &&
          contacts.map((el) => (
            <View style={s.containerView} key={el.id}>
              <Avatar />
              <View style={s.containerViewNameTransferencia}>
                <Text style={s.name}>{el.name}</Text>
                <Text style={s.tranferencia}>{el.tranferencia}</Text>
              </View>
              <Button
                onPress={() => handleDelete(el.id)}
                title="Eliminar Contacto"
              />
              <View>
                <Text>Agregar contacto por Email</Text>
                <TextInput
                  placeholder="Ingrese el email"
                  onChangeText={(value) => handleTextChange("email", value)}
                ></TextInput>
                <Button onPress={() => addContact()} title="+" />
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    backgroundColor: "#232323",
    width: "100%",
    flex: 1,
  },
  textContato: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#fff",
  },
  containerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  containerViewNameTransferencia: {
    marginLeft: 5,
  },
  name: {
    fontSize: 16,
    color: "#fff",
  },
  tranferencia: {
    fontSize: 11,
    color: "#aaa",
  },
});
