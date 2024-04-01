import React, {useDeferredValue, useState} from 'react';
import {View, ViewStyle, TextInput, TextStyle, Text} from 'react-native';
import {modalViewStyle} from './styles';
import {useHeaderHeight} from '@react-navigation/elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {screens} from '@/navigators/config';
import {RootStackParamList} from '@/navigators/types';
import {useStore} from '@/store/useStore';
import colors from '@/theme/colors';
import {TrackCard} from '@/components/trackCard/TrackCard';
import {MAX_CHARACTER_COUNT, SHORT_POST_ID} from '@/config/postConfig';
import {PrimaryButton} from '@/components/buttons/PrimaryButton';
import {ShortPostDraft} from '@/shortPosts/shortPostTypes';
import {useStytchUser} from '@stytch/react-native';
import {useAddShortPost} from '@/shortPosts/useAddShortPost';

export function CreateShortPostWrite({
  navigation,
}: NativeStackScreenProps<
  RootStackParamList,
  typeof screens.CREATE_SHORT_POST_WRITE
>) {
  const shortPostDraft = useStore(state => state.shortPostDraft);

  const user = useStytchUser();
  const userId = user.user?.user_id;

  const {mutate: addShortPost} = useAddShortPost();

  const [inputText, setInputText] = useState(shortPostDraft?.text ?? '');
  const deferredInputText = useDeferredValue(inputText);
  const setShortPostDraft = useStore(state => state.setShortPostDraft);
  const track = shortPostDraft.track;
  const duration = track?.duration_ms;
  const trackArtist = track?.artists.map(a => a.name).join(', ') ?? '';
  const trackArtwork = track?.album.images[0].url ?? '';
  const inTime = shortPostDraft.in;
  const outTime = shortPostDraft.out;
  const headerHeight = useHeaderHeight();

  const onChangeText = (text: string) => {
    setInputText(text);
    // setShortPostDraft({...shortPostDraft, text: inputText});
  };

  const onBlur = (text: string) => {
    setShortPostDraft({...shortPostDraft, text});
  };

  const trackIsCompletelyDefined =
    shortPostDraft.in !== undefined && !!shortPostDraft.out;

  const publishPost = () => {
    if (!trackIsCompletelyDefined || !shortPostDraft.out || !userId) {
      return;
    }
    const shortPost: ShortPostDraft = {
      text: inputText.trim(),
      track: {
        duration: duration ?? 0,
        spotify_id: track?.id ?? '',
        artist: trackArtist,
        artwork: trackArtwork,
        name: track?.name ?? '',
      },
      time_in: shortPostDraft.in ?? 0,
      time_out: shortPostDraft.out,
      user_id: userId,
    };

    addShortPost(shortPost);
    navigation.navigate(screens.HOME);
  };

  const stringLength = inputText.trim().length;
  const characterCountText = `${stringLength}/${MAX_CHARACTER_COUNT}`;
  const textIsOverLimit = stringLength > MAX_CHARACTER_COUNT;

  const permittedText = inputText.slice(0, MAX_CHARACTER_COUNT);
  const excessText = inputText.slice(MAX_CHARACTER_COUNT);

  return (
    <View
      pointerEvents="box-none"
      style={[
        modalViewStyle,
        {
          paddingTop: headerHeight + 20,
        },
        topViewStyle,
      ]}>
      <TextInput
        multiline={true}
        autoFocus={true}
        textAlignVertical="top"
        returnKeyType="default"
        style={textInputStyle}
        placeholder="What do you think?"
        placeholderTextColor={colors.TEXT_PLACEHOLDER}
        // value={inputText}
        onChangeText={onChangeText}
        onBlur={e => onBlur(e.nativeEvent.text)}
        underlineColorAndroid="transparent">
        <Text>{permittedText}</Text>
        <Text style={excessTextStyle}>{excessText}</Text>
      </TextInput>
      <View style={trackCardView}>
        <Text style={characterTextStyle(textIsOverLimit)}>
          {characterCountText}
        </Text>
        {duration ? (
          <TrackCard
            duration={duration}
            id={SHORT_POST_ID}
            spotify_id={track.id}
            artist={trackArtist}
            artwork={trackArtwork}
            name={track.name}
            time_in={inTime ?? 0}
            time_out={outTime !== undefined ? outTime : 0.5 * duration}
          />
        ) : (
          <></>
        )}
        <View style={primaryButtonView}>
          <PrimaryButton
            text={'Publish!'}
            onPress={publishPost}
            disabled={
              textIsOverLimit || !inputText || !trackIsCompletelyDefined
            }
          />
        </View>
      </View>
    </View>
  );
}

const topViewStyle: ViewStyle = {
  maxHeight: '100%',
  overflow: 'hidden',
  justifyContent: 'space-between',
  gap: 30,
};

const textInputStyle: TextStyle = {
  fontSize: 18,
  color: colors.TEXT_WHITE,
  width: '100%',
  flexGrow: 1,
};

const trackCardView: ViewStyle = {
  gap: 10,
  paddingBottom: 10,
};

const characterTextStyle: (
  isOverLimit: boolean,
) => TextStyle = isOverLimit => ({
  textAlign: 'right',
  width: '100%',
  fontSize: 14,
  color: colors.TEXT_WHITE,
  opacity: 0.6,
  paddingVertical: 10,
  textDecorationColor: colors.PRIMARY,
  textDecorationLine: isOverLimit ? 'underline' : 'none',
});

const excessTextStyle: TextStyle = {
  backgroundColor: colors.PRIMARY,
};

const primaryButtonView: ViewStyle = {
  alignItems: 'flex-end',
  justifyContent: 'center',
  flexGrow: 1,
};
