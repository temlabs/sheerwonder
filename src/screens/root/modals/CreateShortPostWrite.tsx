import React, {useState} from 'react';
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
import {useAddPostMutation} from '@/tanstack/mutations/useAddPostMutation';
import {ShortPostProps} from '@/demo/types';
import {users} from '@/demo/users';

export function CreateShortPostWrite({
  navigation,
}: NativeStackScreenProps<
  RootStackParamList,
  typeof screens.CREATE_SHORT_POST_WRITE
>) {
  const shortPostDraft = useStore(state => state.shortPostDraft);

  const {mutate: addPost} = useAddPostMutation();

  const [inputText, setInputText] = useState(shortPostDraft?.text ?? '');
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
    setShortPostDraft({...shortPostDraft, text: inputText});
  };

  const onBlur = (text: string) => {
    setShortPostDraft({...shortPostDraft, text});
  };

  const publishPost = () => {
    const shortPost: ShortPostProps = {
      id: 'needtocreatethis' + track?.id + Date.now(),
      replies: 0,
      saves: 0,
      text: inputText.trim(),
      track: {
        duration: duration ?? 0,
        spotifyId: track?.id ?? '',
        trackArtist,
        trackArtwork,
        trackName: track?.name ?? '',
      },
      type: 'comment',
      upvotes: 0,
      user: users[users.length - 1],
      timeIn: shortPostDraft.in,
      timeOut: shortPostDraft.out,
    };

    addPost(shortPost);
    navigation.navigate(screens.HOME);
  };

  const stringLength = [...inputText.trim()].length;
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
            spotifyId={track.id}
            trackArtist={trackArtist}
            trackArtwork={trackArtwork}
            trackName={track.name}
            timeIn={inTime}
            timeOut={outTime}
          />
        ) : (
          <></>
        )}
        <View style={primaryButtonView}>
          <PrimaryButton
            text={'Publish!'}
            onPress={publishPost}
            disabled={textIsOverLimit || !inputText}
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
