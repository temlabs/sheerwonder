import colors from '@/theme/colors';
import React, {forwardRef, useState} from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Text,
} from 'react-native';

interface Props {
  textContentType?: TextInputProps['textContentType'];
  label?: string;
  placeHolder: TextInputProps['placeholder'];
  onSubmitEditing: TextInputProps['onSubmitEditing'];
  onBlur?: TextInputProps['onBlur'];
  initialValue?: string;
  autoFocus?: TextInputProps['autoFocus'];
  blurOnSubmit?: TextInputProps['blurOnSubmit'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
}

export const AuthInput = forwardRef<TextInput, Props>(function AuthInput(
  {
    textContentType,
    label,
    placeHolder,
    onSubmitEditing,
    onBlur,
    initialValue,
    autoFocus,
    blurOnSubmit,
    secureTextEntry,
  }: Props,
  ref,
) {
  const [text, setText] = useState(initialValue ?? '');

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
        onBlur={e => {
          e.nativeEvent.text = text;
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        blurOnSubmit={blurOnSubmit !== undefined ? blurOnSubmit : true}
        ref={ref}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
});

const containerViewStyle: ViewStyle = {
  gap: 20,
};

const textInputStyle: TextStyle = {
  borderWidth: 2,
  borderColor: colors.BACKGROUND_BORDER,
  width: '100%',
  fontSize: 20,
  color: colors.TEXT_WHITE,
  borderRadius: 20,
  height: 60,
  paddingHorizontal: 10,
  paddingVertical: 5,
};

const labelTextStyle: TextStyle = {
  textAlign: 'left',
};
