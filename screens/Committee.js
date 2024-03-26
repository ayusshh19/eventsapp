import { View, Text, Image , Pressable, TextInput, TouchableOpacity,Button } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/color';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

const Committee = ({ navigation }) => {
    const [eventdata, seteventdata] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
    useEffect(() => {
        const getdata = async () => {
            try {

                const data = await axios.get('https://event-api-1frf.onrender.com/api/user/getcommittee')
                seteventdata(data.data.data)
                console.log(data.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getdata()
    }, [])
    const renderModal=()=>{
        return(
            <Modal isVisible={isModalVisible} animationIn={true}>
                <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#2342"}}>
                    <Text>
                        hello world
                    </Text>
                    </View>
            </Modal>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Have a look on Committee
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around"}}>
                    {eventdata.map((item)=>{
                        console.log(item.logo.url)
                       return (
                       <View key={item._id} style={{margin:10}} onPress={()=>setModalVisible(true)}>
                        <Image
                            style={{ width: 120, height: 120,borderRadius:20}}
                            source={{ uri: JSON.parse(item.logo).url }}
                            resizeMode={'cover'}
                        />
                        </View>
                       )
                    })}
                </View>
                {renderModal()}

                
            </View>
        </SafeAreaView>
    )
}

export default Committee