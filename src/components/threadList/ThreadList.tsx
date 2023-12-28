import {Thread} from '@/demo/types';
import colors from '@/theme/colors';
import React, {ReactElement} from 'react';
import {View, FlatList, Text, ListRenderItem} from 'react-native';

interface Props {
  header: ReactElement;
  threads?: Thread[];
}

export function ThreadList({threads, header}: Props) {
  const renderItem: ListRenderItem<Thread> = ({item: thread}) => {
    return <ThreadComp thread={thread} />;
  };

  return (
    <FlatList
      data={threads ?? []}
      renderItem={renderItem}
      ListHeaderComponent={header}
    />
  );
}

function ThreadComp({thread}: {thread: Thread}) {
  return (
    <View>
      {thread.map((comment, index) => (
        <Text key={comment.id} style={{color: colors.TEXT_WHITE}}>
          {index === 0 ? 'first one' : ''} {comment.text}
        </Text>
      ))}
      {
        // add a show more button if the length of the thread is different to the number of items in the thread array
      }
    </View>
  );
}
