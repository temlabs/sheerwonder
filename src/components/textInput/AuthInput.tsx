import colors from '@/theme/colors';
import React, {useState} from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Text,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';

interface Props {
  textContentType?: TextInputProps['textContentType'];
  label?: string;
  placeHolder: TextInputProps['placeholder'];
  onSubmitEditing: TextInputProps['onSubmitEditing'];
}

export function AuthInput({
  textContentType,
  label,
  placeHolder,
  onSubmitEditing,
}: Props) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onChangeText = (newText: string) => {
    setText(newText);
  };

  return (
    <View style={containerViewStyle}>
      {label ? <Text style={labelTextStyle}>{label}</Text> : <></>}
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={[
          textInputStyle,
          {
            borderColor: isFocused
              ? colors.TEXT_WHITE
              : colors.BACKGROUND_BORDER,
          },
        ]}
        textContentType={textContentType}
        placeholder={placeHolder}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={colors.TEXT_PLACEHOLDER}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const containerViewStyle: ViewStyle = {
  gap: 20,
};

const textInputStyle: TextStyle = {
  borderWidth: 2,
  borderColor: colors.BACKGROUND_BORDER,
  width: '100%',
  fontSize: 20,
  color: colors.TEXT_WHITE,
  borderRadius: 16,
  height: 60,
  paddingHorizontal: 10,
  paddingVertical: 5,
};

const labelTextStyle: TextStyle = {
  textAlign: 'left',
};
