import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/color';
import Button from '../components/Button';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Upcomming = ({ navigation }) => {
    const [eventdata, seteventdata] = useState("")
    const [userimage, setuserimage] = useState("")
    const [newuser,setnewuser]=useState("")
    useEffect(() => {
        const getdata = async () => {
            try {

                const data = await axios.get('https://event-api-1frf.onrender.com/api/user/getevent')
                seteventdata(data.data)
                console.log(data.data)
            }
            catch (err) {
                console.log(err)
            }
            const user = await AsyncStorage.getItem("user")
            const userdata = JSON.parse(user)
            setnewuser(userdata)
            setuserimage(JSON.parse(userdata.profileImage).url)

        }
        getdata()
    }, [])
    const approveevent = async (id,roles) => {
        try {
            const { data } = await axios.put(`https://event-api-1frf.onrender.com/api/user/approvedevent`, {eventId:id,roles:roles});
            alert("approved event")
            const getdata = async () => {
                try {
    
                    const data = await axios.get('https://event-api-1frf.onrender.com/api/user/getevent')
                    seteventdata(data.data)
                    console.log(data.data)
                }
                catch (err) {
                    console.log(err)
                }
                const user = await AsyncStorage.getItem("user")
                const userdata = JSON.parse(user)
                setnewuser(userdata)
                setuserimage(JSON.parse(userdata.profileImage).url)
    
            }
            getdata()
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <SafeAreaView style={{ flex: 1, width: "100%", height: "10%", backgroundColor: COLORS.white }}>
            <View style={{ margin: 22 }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginBottom: 12,
                        color: COLORS.black,

                    }}>
                        New Upcomming events
                    </Text>
                    {
                        userimage ? (<Image
                            style={{ width: 50, height: 50, borderRadius: 100 }}
                            source={{ uri: userimage }}
                            resizeMode={'cover'}
                        />) : ""
                    }
                </View>

                <Button
                    title="Add Events"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={() => navigation.navigate("addevent")}
                />
            </View>
            <ScrollView >
                {eventdata.data && Array.isArray(eventdata.data) ? (
                    eventdata.data.map((item, index) => {
                        // console.log(item)
                        return (
                            <View key={item._id} style={{ margin: 10, display: 'flex', flexDirection: "row", alignItems: "center", width: "100%", height: 250 }}>
                                <Image
                                    style={{ width: '40%', height: 230 }}
                                    source={{ uri: JSON.parse(item.poster).url }}
                                    resizeMode={'cover'}
                                />
                                <View style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", padding: 10, width: "60%", height: "100%" }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                        {item.eventname}
                                    </Text>
                                    <View style={{ display: "flex", flexWrap: "wrap" }}>
                                        <View>
                                            <Text >
                                                <Text style={{ fontWeight: "bold" }}>Description : </Text> {item.about}
                                            </Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 15 }}>
                                            <Text style={{ fontWeight: "bold" }}>Date</Text> : {item.date.split('T')[0]}
                                        </Text>
                                        <Text style={{ fontSize: 15 }}>
                                            <Text style={{ fontWeight: "bold" }}>Timings</Text> : {item.start.split('T')[1].split(":")[0]} To {item.end.split('T')[1].split(":")[0]}
                                        </Text>
                                        <Text>
                                            <Text style={{ fontWeight: "bold" }}>Location : </Text> {item.location} Seminar Hall
                                        </Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", width: "100%" }}>
                                        <View style={{ backgroundColor: COLORS.black, width: "45%", display: "flex", justifyContent: "center", alignItems: "center", padding: 10, marginTop: 15, borderRadius: 5 }}>
                                            <Text style={{ color: "#fff" }}>
                                                Edit
                                            </Text>
                                        </View>
                                        <View style={{ backgroundColor: "#D80032", width: "45%", display: "flex", justifyContent: "center", alignItems: "center", padding: 10, marginTop: 15, borderRadius: 5 }}>
                                            <Text style={{ color: "#fff" }}>
                                                Delete
                                            </Text>
                                        </View>
                                        {
                                            item.approvedb.length > 0 ? (<View style={{ backgroundColor: "#78D6C6", width: "95%", display: "flex", justifyContent: "center", alignItems: "center", padding: 10, marginTop: 10, borderRadius: 5 }}>
                                                <Text style={{ color: "#fff" }}>
                                                    Approved
                                                </Text>
                                            </View>) : (<View style={{ backgroundColor: COLORS.black, width: "95%", display: "flex", justifyContent: "center", alignItems: "center", padding: 10, marginTop: 10, borderRadius: 5 }}>
                                                <Pressable
                                                onPress={()=>approveevent(item._id,newuser.role)}
                                                >
                                                    <Text style={{ color: "#fff" }}>
                                                        Approve event
                                                    </Text>
                                                </Pressable>
                                            </View>)
                                        }

                                    </View>



                                </View>
                            </View>
                        )
                    })
                ) : <Text>No data Currently!</Text>
                }
            </ScrollView>

        </SafeAreaView>
    )
}

export default Upcomming