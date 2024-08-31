// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { ReactNode } from 'react';
import { IStyle, IStackTokens, mergeStyles, Stack, Text, Image } from '@fluentui/react';
import { imgStyle } from '../styles/HomeScreen.styles';
import heroSVG from '../../assets/Logo.svg';

/**
 * Generic page with a title and more details text for serving up a notice to the user.
 */
const imageProps = { src: heroSVG.toString() };

export const NoticePage = (props: { title: string; moreDetails?: ReactNode; icon?: ReactNode }): JSX.Element => (
  
  <Stack verticalFill verticalAlign="center" horizontalAlign="center">
  <Image alt="GTS VirtualHealth Logo" className={imgStyle} {...imageProps}  style={{ objectFit: 'contain' }} />
    <Stack className={mergeStyles(containerStyle)} tokens={containerItemGap}>
      {props.icon && <Text className={mergeStyles(titleStyles)}>{props.icon}</Text>}
      <Text className={mergeStyles(titleStyles)}>{props.title}</Text>
      <Text className={mergeStyles(moreDetailsStyles)}>{props.moreDetails}</Text>
    </Stack>
  </Stack>
);

const containerStyle: IStyle = {
  maxWidth: '22.5rem',
  margin: '1rem'
};

const containerItemGap: IStackTokens = {
  childrenGap: '0.5rem'
};

const titleStyles: IStyle = {
  fontSize: '1.25rem',
  fontWeight: 600
};

const moreDetailsStyles: IStyle = {
  fontSize: '1rem'
};
