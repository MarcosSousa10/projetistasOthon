import axios from "axios";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {Button, Icon } from 'react-native-elements';
import { Text } from "react-native-elements";
import RNFetchBlob from 'rn-fetch-blob';
export default function Historico({ route, navigation }) {
    const [data, setData] = useState([]);

    const { num_projeto, cliente, num_orcamento, token } = route.params;


 const openPageInChrome = async () => {
   const fileUrl = `http://192.168.2.181:5555/relatorio?NumOrcamento=${num_orcamento}`;
   const fileExt = '.pdf'; // Extensão do arquivo PDF
   const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/relatorio${fileExt}`; // Caminho e nome do arquivo PDF a ser salvo
 
   const headers = {
     Authorization: `Bearer ${token}`,
   };
 
   try {
     const response = await RNFetchBlob.config({
       fileCache: true,
       addAndroidDownloads: {
         useDownloadManager: true,
         notification: true,
         mime: 'application/pdf',
         path: filePath,
         description: 'Baixando relatório de vendas',
       },
     }).fetch('GET', fileUrl, headers);
 
     console.log('Download do PDF concluído: ', response.path());
 
     // Aqui você pode fazer algo com o arquivo PDF, como abrir em um visualizador ou compartilhar
   } catch (error) {
     console.error('Erro ao baixar o PDF: ', error);
   }
 };
 

    
    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarUsuarios = async () => {
        try {
            await axios.get(`http://192.168.2.181:5555/Historico/${num_projeto}`, {
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
            <View style={{
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{ fontSize: 30, color: 'red' }}>{cliente}</Text>
                <Text style={{ fontSize: 20 }}>Numero do Projeto: {num_projeto}</Text>
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
            <Button
                icon={
                    <Icon
                        name="clipboard-outline"
                        type="ionicon"
                        color="#ffffff"
                        iconStyle={{ marginRight: 1 }}
                    />
                }
                title="GerarRelatorio"
                onPress={openPageInChrome}
            />
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