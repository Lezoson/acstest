// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const appSettings = require('../../appsettings.json');

export const getResourceConnectionString = (): string => {
  const resourceConnectionString = process.env['ACSConnectionString'] || appSettings.ACSConnectionString;

  if (!resourceConnectionString) {
    throw new Error('No ACS connection string provided');
  }

  return resourceConnectionString;
};
export const getAPIEndpoint = (): string => {
  const APIEndpoint = process.env['BaseUrl'] || appSettings.BaseUrl;

  if (!APIEndpoint) {
    throw new Error('No Api Endpoint URL');
  }

  return `${APIEndpoint}/api/AcsVideoConference/GetDetails`;
};

export const getEndpoint = (): string => {
  const uri = new URL(process.env['EndpointUrl'] || appSettings.EndpointUrl);
  return `${uri.protocol}//${uri.host}`;
};

export const getAdminUserId = (): string => {
  const adminUserId = process.env['AdminUserId'] || appSettings.AdminUserId;

  if (!adminUserId) {
    throw new Error('No ACS Admin UserId provided');
  }

  return adminUserId;
};
