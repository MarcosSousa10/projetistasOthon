import axios from "axios";
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('')
  const [data, setData] = React.useState('');
  const [pegarVersao, setPegarVersao] = React.useState('')

  const test = (a) => {

    axios.get('http://192.168.2.181:5555/tudoProjetos', {
      headers: { 'Authorization': `Bearer ${a}` },
    }).then(Response => {
      navigation.navigate('Principal', {
        token: a,
    });
    setUsuario("");
        setSenha("");
    }
    ).catch(
      Response => {
        alert("gay")

      }
    )
  }
  const login = () => {
    axios.post('http://192.168.2.181:5555/auth/login', {

      login: usuario.toUpperCase(),
      password: senha.toUpperCase()
    }).then(Response => {
     const a = Response.data.token;
     test(a);
    }
    ).catch(Response => {
      alert('Usuario e/ou a senha estão incorretas')
    })
  }

  return (
    <View style={styles.centered}>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <Image style={styles.imageForeground}
          source={require('../../Image/othon.png')} />
      </View>
      <Text>Versão:{data.vesao}</Text>
      <TextInput
        onChangeText={setUsuario}
        value={usuario}
        placeholder="Usuario"
        keyboardType="text"
        style={{
          padding: 7,
          color: 'black',
          borderRadius: 70,
          margin: 15,
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 2,
        }}
      />
      <TextInput
        onChangeText={setSenha}
        value={senha}
        placeholder="Senha"
        keyboardType="text"
        secureTextEntry={true}
        style={{
          padding: 7,
          color: 'black',
          borderRadius: 70,
          margin: 15,
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 2,
        }}
      />

      <View style={{
        display: "flex", flexDirection: "row", alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TouchableOpacity onPress={() => login()}>
          <View style={{
            backgroundColor: '#1a9ce8',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            padding: 20,
            margin: 10,
            paddingLeft: 40,
            paddingRight: 40
          }}
          >
            <Text style={{ color: 'white' }}>Entrar</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <Image style={styles.imageForeground}
          source={require('../../Image/download.png')} />
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightgrey",
  },
  imageForeground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  }, centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    // alignItems: "center",
  },
});