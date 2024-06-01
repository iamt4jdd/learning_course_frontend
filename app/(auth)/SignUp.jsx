import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    citizen: "",
    dob: new Date(),
    password: "",
    pin: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleSelectDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange("dob", selectedDate);
    }
  };
  console.log(user);
  const handleChange = (name, value) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="p-5">
          <View className="bg-gradient-to-r from-blue-1 to-blue-2 h-9"></View>
          <Text className="text-center font-bold text-[28px]">Sign up</Text>
          <View className="flex gap-3">
            <View>
              <Text>Your name</Text>
              <TextInput
                value={user.name}
                onChangeText={(value) => {
                  handleChange("name", value);
                }}
                placeholder="user@gmail.com"
                className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
            </View>
            <View>
              <Text>Email</Text>
              <TextInput
                value={user.email}
                onChangeText={(value) => {
                  handleChange("email", value);
                }}
                placeholder="user@gmail.com"
                className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
            </View>
            <View>
              <Text>Phone number</Text>
              <TextInput
                value={user.phone}
                onChangeText={(value) => {
                  handleChange("phone", value);
                }}
                placeholder="035881225"
                className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
            </View>
            <View>
              <Text>Citizen Identity (*)</Text>
              <TextInput
                value={user.citizen}
                onChangeText={(value) => {
                  handleChange("citizen", value);
                }}
                placeholder="35656166"
                className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
            </View>
            <View>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={user.dob}
                  onChange={handleSelectDate}
                />
              )}
              <Text>Date of Birth</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="justify-center h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              >
                <Text>
                  {user.dob instanceof Date
                    ? user.dob.toISOString().split("T")[0]
                    : ""}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                value={user.password}
                onChangeText={(value) => {
                  handleChange("password", value);
                }}
                secureTextEntry
                placeholder="*********"
                className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
            </View>
            <View>
              <Text>Pin Number</Text>
              <TextInput
                value={user.pin}
                onChangeText={(value) => {
                  handleChange("pin", value);
                }}
                placeholder="1234"
                className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
            </View>
            <TouchableOpacity className="bg-black p-2 flex flex-row rounded-xl h-[53px] items-center  justify-center">
              <Text className="text-slate-50 text-center font-bold pr-2">
                Create new account
              </Text>
              <FontAwesomeIcon
                icon={faArrowRight}
                className=" text-white"
                style={{ color: "white" }} // Set the color directly in the style attribute
              />
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-2 justify-center">
              <Text>Already have an account?</Text>
              <Link href="/Login">
                <Text className="text-blue-500 font-bold">Sign in now</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
