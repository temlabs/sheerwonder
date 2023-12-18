import {TextStyle} from 'react-native';
import Markdown, {MarkdownProps} from 'react-native-markdown-display';
import React from 'react';

export function MarkdownText(
  props: MarkdownProps & {style?: MarkdownStyle; text: string},
): JSX.Element {
  return (
    <Markdown rules={props.rules} style={props.style}>
      {props.text}
    </Markdown>
  );
}

const markdownElements = [
  'body',
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
  'hr',
  'strong',
  'em',
  's',
  'blockquote',
  'bullet_list',
  'ordered_list',
  'list_item',
  'code_inline',
  'code_block',
  'fence',
  'table',
  'thead',
  'tbody',
  'th',
  'tr',
  'td',
  'link',
  'blocklink',
  'image',
  'text',
  'textgroup',
  'paragraph',
  'hardbreak',
  'softbreak',
  'pre',
  'inline',
  'span',
] as const;

type MarkdownElement = (typeof markdownElements)[number];

type MarkdownStyle = Partial<{[key in MarkdownElement]: TextStyle}>;
