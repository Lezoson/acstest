import React, { useState, useEffect } from 'react';
import { Stack, PrimaryButton, Image, IChoiceGroupOption, Text } from '@fluentui/react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

import heroSVG from '../../assets/Logo.svg';
import {
  imgStyle,
  infoContainerStyle,
  configContainerStyle,
  configContainerStackTokens,
  containerStyle,
  containerTokens,
  headerStyle,
  buttonStyle,
  NotFoundContainerStyle
} from '../styles/HomeScreen.styles';

import { localStorageAvailable } from '../utils/localStorage';
import { getDisplayNameFromLocalStorage, saveDisplayNameToLocalStorage } from '../utils/localStorage';
import { DisplayNameField } from './DisplayNameField';
import { RoomLocator, TeamsMeetingLinkLocator, TeamsMeetingIdLocator } from '@azure/communication-calling';
import { CallAdapterLocator } from '@azure/communication-react';
// import { getRoomIdFromUrl } from '../utils/AppUtils';
// import { getRoomIdFromCookie } from '../utils/CookiesUtils';
import { getRoomIdFromUrl } from '../utils/AppUtils';
import { getRoomIdFromCookie } from '../utils/CookiesUtils';

export type CallOption = 'ACSCall' | 'TeamsMeeting' | 'Rooms' | 'StartRooms' | 'TeamsIdentity' | 'TeamsAdhoc';

export interface HomeScreenProps {
  startCallHandler(callDetails: {
    displayName: string;
    callLocator?: CallAdapterLocator | TeamsMeetingLinkLocator | RoomLocator | TeamsMeetingIdLocator;
    option?: CallOption;
    role?: string;
    teamsToken?: string;
    teamsId?: string;
    outboundTeamsUsers?: string[];
  }): void;
  joiningExistingCall: boolean;
}

type ICallChoiceGroupOption = IChoiceGroupOption & { key: CallOption };

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const imageProps = { src: heroSVG.toString() };
  const [roomIdAvailable, setRoomIdAvailable] = useState<boolean>(false);

 
  useEffect(() => {
    const fetchRoomId = async () => {
      const roomId = getRoomIdFromUrl() || getRoomIdFromCookie();
      if (roomId) {
        setRoomIdAvailable(true);
        setloading(false);
      }
    };
    fetchRoomId();
  }, []);

  const headerTitle = roomIdAvailable ? 'Join Call' : 'Start a call';
  const callOptions: ICallChoiceGroupOption[] = [{ key: 'StartRooms', text: 'Start a Rooms call' }];
  const roomRoleOptions: IChoiceGroupOption[] = [
    { key: 'Presenter', text: 'Presenter' },
    { key: 'Attendee', text: 'Attendee' }
  ];

  const buttonText = roomIdAvailable ? 'Join Video Conference' : 'Start Video Conference';
  const defaultDisplayName = localStorageAvailable ? getDisplayNameFromLocalStorage() : null;
  const [displayName, setDisplayName] = useState<string | undefined>(defaultDisplayName ?? undefined);
  const [chosenCallOption] = useState<ICallChoiceGroupOption>(callOptions[0]);
  const [callLocator] = useState<RoomLocator | undefined>();
  const [chosenRoomsRoleOption] = useState<IChoiceGroupOption>(roomRoleOptions[0]);
  const [teamsToken] = useState<string>();
  const [teamsId] = useState<string>();
  const [outboundTeamsUsers] = useState<string | undefined>();
  const [loading, setloading] = useState<boolean | undefined>(true)
  const startGroupCall: boolean = chosenCallOption.key === 'ACSCall';
  const teamsCallChosen: boolean = chosenCallOption.key === 'TeamsMeeting';
  const teamsIdentityChosen = chosenCallOption.key === 'TeamsIdentity';
  const teamsAdhocChosen: boolean = chosenCallOption.key === 'TeamsAdhoc';

  const buttonEnabled =
    (displayName || teamsToken) &&
    (startGroupCall ||
      (teamsCallChosen && callLocator) ||
      (((chosenCallOption.key === 'Rooms' && callLocator) || chosenCallOption.key === 'StartRooms') &&
        chosenRoomsRoleOption) ||
      (teamsAdhocChosen && outboundTeamsUsers) ||
      (teamsIdentityChosen && callLocator && teamsToken && teamsId));

  let showDisplayNameField = true;
  showDisplayNameField = !teamsIdentityChosen;

  return (
    <>

      {roomIdAvailable ? (
        <Stack wrap horizontalAlign="center" tokens={containerTokens} className={containerStyle}>
          <Image alt="GTS VirtualHealth Logo" className={imgStyle} {...imageProps} style={{ objectFit: 'contain' }} />
          <JoinCall
            headerTitle={headerTitle}
            showDisplayNameField={showDisplayNameField}
            displayName={displayName}
            setDisplayName={setDisplayName}
            buttonEnabled={buttonEnabled}
            buttonText={buttonText}
            callLocator={callLocator}
            chosenCallOption={chosenCallOption}
            chosenRoomsRoleOption={chosenRoomsRoleOption}
            teamsToken={teamsToken}
            teamsId={teamsId}
            outboundTeamsUsers={outboundTeamsUsers}
            startCallHandler={props.startCallHandler}
          />
          <Text>
            Copyright © 2017-2024 <b>Global Telehealth Services.</b> All Rights Reserved.
          </Text>
        </Stack>
      ) : (
        <Stack wrap horizontalAlign="center" tokens={containerTokens} className={containerStyle} verticalAlign="center">
          <Image alt="GTS VirtualHealth Logo" className={imgStyle} {...imageProps} style={{ objectFit: 'contain' }} />
          {loading ? <Spinner size={SpinnerSize.large} label={'Loading '} ariaLive="polite"  labelPosition="bottom" /> : <RoomIdNotFound />}
          <Text>
            Copyright © 2017-2024 <b>Global Telehealth Services.</b> All Rights Reserved.
          </Text>
        </Stack>
      )}
    </>
  );
};

const JoinCall = ({
  headerTitle,
  showDisplayNameField,
  displayName,
  setDisplayName,
  buttonEnabled,
  buttonText,
  callLocator,
  chosenCallOption,
  chosenRoomsRoleOption,
  teamsToken,
  teamsId,
  outboundTeamsUsers,
  startCallHandler
}: any) => (
  
  <Stack className={infoContainerStyle}>
    <Text role={'heading'} aria-level={1} className={headerStyle}>
      {headerTitle}
    </Text>
    <Stack className={configContainerStyle} tokens={configContainerStackTokens}>
      {showDisplayNameField && <DisplayNameField defaultName={displayName} setName={setDisplayName} />}
      <PrimaryButton
        disabled={!buttonEnabled}
        className={buttonStyle}
        text={buttonText}
        onClick={() => {
          if (displayName || chosenCallOption.key === 'TeamsIdentity') {
            displayName && saveDisplayNameToLocalStorage(displayName);

            const teamsParticipantsToCall = parseParticipants(outboundTeamsUsers);

            startCallHandler({
              displayName: !displayName ? 'Teams UserName PlaceHolder' : displayName,
              callLocator: callLocator,
              option: chosenCallOption.key,
              role: chosenRoomsRoleOption.key,
              teamsToken,
              teamsId,
              outboundTeamsUsers: teamsParticipantsToCall
            });
          }
        }}
      />
    </Stack>
  </Stack>
);

const RoomIdNotFound = () => (
  <Stack className={NotFoundContainerStyle}>
    <Text role={'heading'} aria-level={1} className={headerStyle}>
      Room Not Found
    </Text>
  </Stack>
);


/**
 * Splits the participant Id's so we can call multiple people.
 */
const parseParticipants = (participantsString?: string): string[] | undefined => {
  if (participantsString) {
    return participantsString.replaceAll(' ', '').split(',');
  } else {
    return undefined;
  }
};
