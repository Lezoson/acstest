// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { Image, Stack, Text } from '@fluentui/react';
import {
  endCallContainerStyle,
  endCallTitleStyle,
  mainStackTokens,
  buttonsStackTokens,
  upperStackTokens,
  bottomStackFooterStyle,

} from '../styles/EndCall.styles';
import { imgStyle } from '../styles/HomeScreen.styles';
import heroSVG from '../../assets/Logo.svg';
// import { baseurl } from '../utils/AppUtils';
// import { SpinnerIos20Filled, Video20Filled } from '@fluentui/react-icons';

export interface CallErrorProps {
  title: string;
  reason: string;
  rejoinHandler(): void;
  homeHandler(): void;
}

export const CallError = (props: CallErrorProps): JSX.Element => {
  // const goHomePage = 'Go to Homepage';
  // const rejoinCall = 'Retry Call';
  const imageProps = { src: heroSVG.toString() };
  return (
    <Stack
      horizontal
      wrap
      horizontalAlign="center"
      verticalAlign="center"
      tokens={mainStackTokens}
      className={endCallContainerStyle}
    >
      <Stack tokens={upperStackTokens}>
        <Image alt="GTS VirtualHealth Logo" className={imgStyle} {...imageProps} style={{ objectFit: 'contain' }} />
        <Text role={'heading'} aria-level={1} className={endCallTitleStyle}>
          {props.title}
        </Text>
        <Stack horizontal tokens={buttonsStackTokens} className={endCallContainerStyle}>
         
<Stack style={{display:'flex',justifyContent:'center'}} horizontal
      wrap
      horizontalAlign="center"
      verticalAlign="center"
      tokens={mainStackTokens}
      className={endCallContainerStyle}>
         {/* <PrimaryButton
            className={buttonStyle}
            styles={buttonWithIconStyles}
            text={"rejoinCall"}
            onClick={props.rejoinHandler}
            onRenderIcon={() => <Video20Filled className={videoCameraIconStyle} primaryFill="currentColor" />}
          /> 
      <PrimaryButton  
            className={buttonStyle}
            styles={buttonWithIconStyles}
            text={"Retrying"}
            onClick={props.rejoinHandler}
            onRenderIcon={() => <Spinner className={videoCameraIconStyle} />}
          />  */}
        </Stack>
        </Stack>
        <div className={bottomStackFooterStyle}>{props.reason}</div>
      </Stack>
    </Stack>
  );
};
