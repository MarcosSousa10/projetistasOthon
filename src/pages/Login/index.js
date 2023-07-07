import axios from "axios";
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
export default function Login({ navigation }) {
  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('')
  const [data, setData] = React.useState('');
  const [pegarVersao, setPegarVersao] = React.useState('')
  function validaSenha(senha) {
    const regexLetras = /[a-zA-Z]/;
    const regexEspecial = /[^a-zA-Z0-9]/;
    const regexNumeros = /[0-9]/;

    if (senha.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return false;
    }
    if (!regexLetras.test(senha)) {
      alert("A senha deve conter pelo menos um letra.");
      return false;
    }

    if (!regexEspecial.test(senha)) {
      alert("A senha deve conter pelo menos um caracter especial.");
      return false;
    }

    if (!regexNumeros.test(senha)) {
      alert("A senha deve conter pelo menos um número.");
      return false;
    }
    return true;
  }

  function Entrar() {
    if (data.id) {
      altomatico();
      altomaticoData();
      navigation.navigate('Principal');
    }
    altomatico();
  }
  function Entrars() {
    if (data.id) {
      altomatico();
      altomaticoData();
      Conferencia();
    }
    altomatico();
  }
  function Cadastro() {
    if (usuario == 'administrador' && senha == 'admin') {
      navigation.navigate('Cadastro');
    } else {
      alert("e necessario fornecer o usuario e a senha do administrador!")
    }
  }
  const datas = async()=>{
    await axios.get("http://192.168.2.181:4444/tudoo").then(certo => {
    })
  }
  function Conferencia() {
      navigation.navigate('MercadoriasNovas');

  }
  const altomatico = async () => {
    await axios.put("http://187.72.17.137:4444/validarCadastro/" + 5 + "/" + data.id).then(certo => {

    }).catch(error => {
      alert(error)
    })
  }
  const altomaticoData = async () => {
    await axios.put("http://187.72.17.137:4444/validarData/" + '2023-06-23 13:56:26' + "/" + data.id).then(certo => {

    }).catch(error => {
      alert(error)
    })
  }
  const versao = async cod => {
    await axios
      .get(`http://187.72.17.137:4444/versaoget/${data.vesao}`)
      .then(Responses => {
        const respostas = Responses.data
        if (data.id) {
          if (respostas == "" || data.vesao == "0") {
            Entrar();
          } else {
            versa()
            alert("Este App Esta Desatualizado.Tente Novamente ou Atualize Para a Versão " + pegarVersao)

          }
        }else{
          versao()
        }
      }).catch(
    )
  }
  const versaos = async cod => {
    await axios
      .get(`http://187.72.17.137:4444/versaoget/${data.vesao}`)
      .then(Responses => {
        const respostas = Responses.data
        if (data.id) {
          if (respostas == "" || data.vesao == "0") {
            Entrars();
          } else {
            versa()
            alert("Este App Esta Desatualizado.Tente Novamente ou Atualize Para a Versão " + pegarVersao)

          }
        }else{
          versao()
        }
      }).catch(
    )
  }

  const versa = async cod => {
    await axios
      .get(`http://187.72.17.137:4444/numeroVersao/${data.vesao}`)
      .then(Responses => {
        if (Responses == 1) {
          setPegarVersao("0")
        } else { setPegarVersao(Responses.data.vesao) }

      }).catch(error => {
        alert(error)
      })
  }

  const ValidarLogin = async cod => {
    await axios
      .get(`http://187.72.17.137:4444/login/${usuario}/${senha}`)
      .then(Response => {
        const resposta = Response.data
        setData(resposta);
        if (resposta != "Usuario não encontrado.") {
          altomatico();
          altomaticoData();
          versao();
        } else {
          alert("Usuario Ou Senha Incorreta")

        }

      }).catch(erro => {
        alert("Ops Ocorreu um erro")
      });
  };
  const ValidarCadastro = async cod => {
    await axios
      .get(`http://187.72.17.137:4444/login/${usuario}/${senha}`)
      .then(Response => {
        const resposta = Response.data
        setData(resposta);
        if (resposta != "Usuario não encontrado.") {
          altomatico();
          altomaticoData();
          versaos();
        } else {
          alert("Usuario Ou Senha Incorreta")

        }

      }).catch(erro => {
        alert("Ops Ocorreu um erro")
      });
  };
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
      {/* <Button
        title="Entrar"
        // onPress={() => navigation.navigate('Principal')}
      /> */}
      <View style={{
        display: "flex", flexDirection: "row", alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TouchableOpacity onPress={() => ValidarLogin()}>
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
        {
          usuario == 'administrador' && senha == 'admin' ?
            <TouchableOpacity onPress={() => Cadastro()}>
              <View style={{
                backgroundColor: '#1a9ce8',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                padding: 20,
                margin: 10,
                paddingLeft: 30,
                paddingRight: 30
              }}
              >
                <Text style={{ color: 'white' }}>Cadastro</Text>
              </View>
            </TouchableOpacity> :
            print("não e administrador")
        }

            <TouchableOpacity onPress={() => ValidarCadastro()}>
              <View style={{
                backgroundColor: '#1a9ce8',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                padding: 20,
                margin: 10,
                paddingLeft: 30,
                paddingRight: 30
              }}
              >
                <Text style={{ color: 'white' }}>Conferencia</Text>
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