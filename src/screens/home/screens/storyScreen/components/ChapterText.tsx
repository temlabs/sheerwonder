import React from 'react';
import {Text, View} from 'react-native';
import {MarkdownIt, RenderRules} from 'react-native-markdown-display';
import {QuoteLeft} from '@/components/icons/QuoteLeft';
import {MarkdownText} from '@/components/text/MarkdownText';
import colors from '@/theme/colors';

export function ChapterText({text}: {text: string}): JSX.Element {
  const rules: RenderRules = {
    blockquote: (node, children, parent, styles) => {
      const text = node.children[0].children[0].children[0].content;
      const textSplit = text.split('cite:');
      const citation = textSplit.length > 1 ? textSplit[1] : '';
      const quote = textSplit[0];

      return (
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 10,
            width: '100%',
            overflow: 'hidden',
          }}>
          <QuoteLeft width={40} height={40} fill={colors.TEXT_PRIMARY} />
          <View style={{flexShrink: 1}}>
            <Text
              style={{
                fontSize: 28,
                color: colors.TEXT_PRIMARY,
                flexShrink: 0,
              }}>
              {quote}
            </Text>
            {citation ? (
              <Text
                style={{
                  fontSize: 16,
                  color: colors.TEXT_PRIMARY,
                  fontStyle: 'italic',
                  flexShrink: 0,
                }}>
                {citation}
              </Text>
            ) : null}
          </View>
        </View>
      );
    },
  };

  return (
    <MarkdownText
      rules={rules}
      text={text}
      markdownit={MarkdownIt({typographer: true}).disable(['table'])}
      style={{
        body: {fontSize: 18, color: colors.TEXT_PRIMARY},
        heading1: {fontSize: 18, fontWeight: '600', marginBottom: 20},
        blockquote: {
          backgroundColor: colors.TEXT_WHITE,
          fontSize: 28,
          marginBottom: 20,
          marginTop: 20,
          color: 'black',
          fontWeight: '600',
          fontStyle: 'italic',
        },
      }}
    />
  );
}
