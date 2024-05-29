import React from "react";
import { Text, TextInput, View } from "react-native";

const InputItem = ({
  title,
  value,
  onChangeText,
  editable = true,
  secureTextEntry = false,
}) => {
  return (
    <View className="mb-3">
      <Text className="text-xs mb-[2px] ml-1">{title}</Text>
      <TextInput
        placeholder={`Enter ${title}`}
        className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default InputItem;
