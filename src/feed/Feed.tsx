import React from 'react';
import {FlatList, FlatListProps, ListRenderItem, ViewStyle} from 'react-native';
import {ShortPostListItem} from '@/shortPosts/components/ShortPostListItem';
import {ShortPost, ShortPostDraft} from '@/shortPosts/shortPostTypes';
import {isShortPostDraft} from '@/shortPosts/shortPostTypeUtils';
import {ShortPostDraftListItem} from '@/shortPosts/components/ShortPostDraftListItem';

interface Props<T extends ShortPost | ShortPostDraft> {
  data: Array<T>;
  style?: ViewStyle;
  contentContainerStyle?: FlatListProps<T>['contentContainerStyle'];
  ListHeaderComponent?: FlatListProps<T>['ListHeaderComponent'];
}

export function Feed<T extends ShortPost | ShortPostDraft>({
  data,
  style,
  contentContainerStyle,
  ListHeaderComponent,
}: Props<T>) {
  const renderItem: ListRenderItem<ShortPost | ShortPostDraft> = item => {
    const post = item.item;
    if (isShortPostDraft(post)) {
      return <ShortPostDraftListItem {...post} />;
    } else {
      return <ShortPostListItem {...post} />;
    }
  };

  return (
    <FlatList<ShortPost | ShortPostDraft>
      style={style}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      maxToRenderPerBatch={5}
      keyExtractor={item => (isShortPostDraft(item) ? 'draft' : item.id)}
      data={data ?? []}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      fadingEdgeLength={10}
    />
  );
}
