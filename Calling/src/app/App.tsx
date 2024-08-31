import React, { useEffect, useState } from 'react';
import {
  getGroupIdFromUrl,
  getTeamsLinkFromUrl,
  isLandscape,
  isOnIphoneAndNotSafari,
  navigateToHomePage,
  WEB_APP_TITLE,
  addUserToRoom,
  getTokenResponse,
} from './utils/AppUtils';
import { useIsMobile } from './utils/useIsMobile';
import { CallError } from './views/CallError';
import { CallScreen } from './views/CallScreen';
import { CallOption, HomeScreen } from './views/HomeScreen';
import { UnsupportedBrowserPage } from './views/UnsupportedBrowserPage';
import { getMeetingIdFromUrl } from './utils/AppUtils';
import { getRoomIdFromCookie } from './utils/CookiesUtils';
import { setLogLevel } from '@azure/logger';
import { initializeIcons, Spinner } from '@fluentui/react';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import { CallAdapterLocator, StartCallIdentifier } from '@azure/communication-react';
import { RoomLocator, TeamsMeetingIdLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { useQuery } from '@tanstack/react-query';

setLogLevel('error');
initializeIcons();

type AppPages = 'home' | 'call' | 'loading' | 'error';

const App = (): JSX.Element => {
  const [page, setPage] = useState<AppPages>('loading');
  const [callLocator, setCallLocator] = useState<CallAdapterLocator>();
  const [targetCallees] = useState<StartCallIdentifier[]>([]);
  const [displayName, setDisplayName] = useState<string>('');

  const { isLoading, error, data } = useQuery({
    queryKey: ['fetchTokenResponse'],
    queryFn: async () => {
      const response = await getTokenResponse();
      return response;
    },
    staleTime: Infinity, // Do not refetch the data automatically
    refetchOnWindowFocus: false, // Do not refetch when window is focused
    refetchOnMount: false, // Do not refetch on component mount if d
    retry: 2, // Retry twice if the request fails
  });

  useEffect(() => {
    if (data) {
      if (data.RoomId && data.DisplayName) {
        setDisplayName(data.DisplayName);
        setCallLocator({ roomId: data.RoomId });
        const user: CommunicationUserIdentifier = {
          communicationUserId: data.AcsUserIdentity,
        };

        const role = data.ParticipantType === 'UserInitiator' ? 'Presenter' : 'Attendee';
        addUserToRoom(user.communicationUserId, data.RoomId, role).then(() => {
          setPage('call');
        }).catch((err) => {
          console.error('Error adding user to room:', err);
          setPage('error');
        });
      } else {
        console.error('Invalid token response, navigating to error page.');
        setPage('error');
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching token response:', error);
      setPage('error');
    }
  }, [error]);

  const isMobileSession = useIsMobile();
  const isLandscapeSession = isLandscape();

  useEffect(() => {
    if (isMobileSession && isLandscapeSession) {
      console.log('ACS Calling sample: Mobile landscape view is experimental behavior');
    }
  }, [isMobileSession, isLandscapeSession]);

  const supportedBrowser = !isOnIphoneAndNotSafari();
  if (!supportedBrowser) {
    return <UnsupportedBrowserPage />;
  }

  if (isLoading) {
    return <Spinner label={'Loading...'} ariaLive="assertive" labelPosition="top" />;
  }

  if (error || page === 'error') {
    return (
      <CallError
        title="Error fetching token or credentials"
        reason="There was an issue fetching the necessary data. Please try again later."
        rejoinHandler={() => setPage('loading')}
        homeHandler={navigateToHomePage}
      />
    );
  }

  switch (page) {
    case 'home':
      return (
        <HomeScreen
          joiningExistingCall={
            !!getGroupIdFromUrl() ||
            !!getTeamsLinkFromUrl() ||
            !!getMeetingIdFromUrl() ||
            !!getRoomIdFromCookie()
          }
          startCallHandler={function (
            callDetails: {
              displayName: string;
              callLocator?: CallAdapterLocator | TeamsMeetingLinkLocator | RoomLocator | TeamsMeetingIdLocator;
              option?: CallOption;
              role?: string;
              teamsToken?: string;
              teamsId?: string;
              outboundTeamsUsers?: string[];
            }
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      );

    case 'call':
      if (!data || !displayName || !callLocator) {
        document.title = `credentials - ${WEB_APP_TITLE}`;
        return <Spinner label={'Getting user credentials from server'} ariaLive="assertive" labelPosition="top" />;
      }

      return (
        <CallScreen
          token={data.AcsUserToken}
          userId={{ communicationUserId: data.AcsUserIdentity }}
          displayName={displayName}
          callLocator={callLocator}
          targetCallees={targetCallees}
        />
      );

    case 'loading':
      return <Spinner label={'Loading...'} ariaLive="assertive" labelPosition="top" />;

    default:
      console.error('Invalid page state:', page);
      document.title = `error - ${WEB_APP_TITLE}`;
      return <>Invalid page</>;
  }
};

export default App;
