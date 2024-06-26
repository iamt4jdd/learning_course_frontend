import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import CustomerService from "../../services/CustomerService";
import InputItem from "../../components/InputItem";
import { router } from "expo-router";

// Initial state for changePasswordData
const initialChangePasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};


// Author: Trieu
// This component is used to display the account screen, which allows users to change their password
const Account = () => {
  const { customerId } = useAuth();
  const [changePasswordData, setChangePasswordData] = useState(
    initialChangePasswordData
  );
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { ChangePassword } = CustomerService();

  const handleChange = (field, value) => {
    setChangePasswordData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleChangePassword = async () => {
    const { newPassword, confirmPassword, currentPassword } =
      changePasswordData;

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match");
      return;
    }

    if (
      newPassword.length < 8 ||
      newPassword.length > 20 ||
      !/\d/.test(newPassword) ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      Alert.alert(
        "Error",
        "New password does not meet the required conditions"
      );
      return;
    }

    setLoading(true);

    try {
      await ChangePassword(
        {
          password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        customerId
      );
      Alert.alert(
        "Success",
        "Password changed successfully",
        [{ text: "OK", onPress: () => router.replace("/Login") }],
        { cancelable: false }
      );
      setChangePasswordData(initialChangePasswordData);
    } catch (error) {
      Alert.alert("Error", "Couldn't change password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="pt-5 bg-gray-200 px-2">
      <View className="h-[107px] w-full mb-5 bg-slate-50 p-2 justify-center rounded-md">
        <InputItem
          secureTextEntry={!showCurrentPassword}
          value={changePasswordData.currentPassword}
          title="Your Current Password"
          onChangeText={(value) => handleChange("currentPassword", value)}
        />
        <TouchableOpacity
          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          className="absolute right-4 top-3 mt-9 mr-2"
        >
          <FontAwesomeIcon
            icon={showCurrentPassword ? faEyeSlash : faEye}
            className="text-gray-600"
          />
        </TouchableOpacity>
      </View>
      <View className="w-full bg-slate-50 p-2 py-6 mb-10 justify-center rounded-md">
        <View className="mb-3 p-2 bg-blue-200 bg-opacity-20 rounded-md">
          <Text className="font-bold">
            Password must satisfy the following conditions:
          </Text>
          <View className="p-3 gap-2">
            <Text>
              - The length of the password must be from 8 to 20 characters
            </Text>
            <Text>
              - Contains at least 1 digit, 1 letter, and 1 special character
            </Text>
          </View>
          <Text>For example: b&1A2c3d; B@123456; 12345678a*</Text>
        </View>
        <View className="relative">
          <InputItem
            secureTextEntry={!showNewPassword}
            title="New Password"
            value={changePasswordData.newPassword}
            onChangeText={(value) => handleChange("newPassword", value)}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-3 mt-5"
          >
            <FontAwesomeIcon
              icon={showNewPassword ? faEyeSlash : faEye}
              className="text-gray-600"
            />
          </TouchableOpacity>
        </View>
        <View className="relative mt-4">
          <InputItem
            secureTextEntry={!showConfirmPassword}
            title="Confirm Password"
            value={changePasswordData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-3 mt-5"
          >
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="text-gray-600"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="mt-4 bg-black p-2 flex flex-row rounded-xl h-[48px] items-center justify-center"
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-stone-50 text-center font-bold pr-2">
              Change Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Account;
