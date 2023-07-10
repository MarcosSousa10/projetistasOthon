import axios from "axios";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

export default function Historico({ route, navigation }) {
    const [data, setData] = useState([]);

    const { num_projeto, cliente, num_orcamento,token } = route.params;


    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarUsuarios = async () => {
        try {
            await axios.get(`http://192.168.2.181:8080/Historico/${num_projeto}`, {
                headers: { 'Authorization': `Bearer ${token}` },
              }).then(Response => {
                setData(Response.data);
            }).catch(error => {
                alert("Erro ao carregar histórico");
                navigation.navigate('Historico');
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{
            flexDirection: "column"
        }}>
            <View style={{flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: "center"}}>
                <Text style={{fontSize:30, color:'red'}}>{cliente}</Text>
                <Text style={{fontSize:20}}>Numero do Projeto: {num_projeto}</Text>
            </View>

            {data.map((item, index) => (

                <View key={index} style={{ margin: 0, padding: 0 }}  >


                    {
                        item.descricao != null
                            ?
                            <View style={{}}>
                                <Text style={{ marginBottom: 10, color: 'purple', fontSize: 20 }}></Text>
                                <Text style={{ color: 'purple', fontSize: 20 }}>
                                    Data: {item.data_acao}
                                </Text>
                                <Text style={{
                                    color: 'purple', fontSize: 20
                                }} >
                                    Descrição:
                                    <Text>
                                        {item.descricao}
                                    </Text>
                                </Text>
                                <Text style={{ marginBottom: 8, color: 'purple', fontSize: 20 }}>
                                    Responsavel: <Text>{item.responsavel}</Text> 
                                </Text>
                            </View>
                            :
                            <Text style={{ marginBottom: 10, textAlign: 'center', color: 'purple', fontSize: 25 }}>Não a Historico</Text>
                    }

                </View>

            ))}

        </View>
    )
} const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffc2c2",
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
    },
    subtitle: {
        fontSize: 14,
        color: "#888",
    },
});