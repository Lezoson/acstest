// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RoomCallLocator } from '@azure/communication-calling';
import Cookies from 'js-cookie';

/**
 * Retrieves the display name from the cookie.
 * @returns The display name, or undefined if not found.
 */
export const getDisplayNameFromCookie = (): string | undefined => {
  const displayName = Cookies.get('displayName');
  return displayName ?? undefined;
};

/**
 * Retrieves the host status from the cookie.
 * @returns The host status, or null if not found.
 */
export const getHostStatusFromCookie = (): string | null => {
  const isHost = Cookies.get('isHost');
  return isHost ?? null;
};

/**
 * Retrieves the room ID from the cookie and returns a RoomCallLocator object.
 * @returns A RoomCallLocator object, or undefined if not found.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRoomIdFromCookie = (): string | any => {
  const roomId = Cookies.get('roomId');
  return roomId ? { roomId } : undefined;
};

/**
 * Sets the room ID in the cookie and returns a RoomCallLocator object.
 * @param roomId The room ID to set.
 * @returns A RoomCallLocator object, or undefined if not set.
 */
export const setRoomIdInCookie = (
  roomId: string,
  DisplayName: string,
  participantType: string
): RoomCallLocator | undefined => {
  Cookies.set('roomId', roomId);
  Cookies.set('displayName', DisplayName);
  Cookies.set('participantType', participantType);
  return { roomId };
};

export const setTokenInCookie = (token: string): void => {
  Cookies.set('token', token);
};

export const setUserIdInCookie = (user: string): void => {
  Cookies.set('user', user);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTokenFromCookie = (): string | any => {
  const token = Cookies.get('token');
  return token ? { token } : undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserIdFromCookie = (): string | any => {
  const user = Cookies.get('user');
  return user ? { user } : undefined;
};
