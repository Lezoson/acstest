// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GroupCallLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { CallAdapterLocator, CallComposite, CallCompositeOptions, CommonCallAdapter, CustomCallControlButtonCallback } from '@azure/communication-react';
import { Spinner } from '@fluentui/react';
import React, { useEffect, useMemo } from 'react';
import { useSwitchableFluentTheme } from '../theming/SwitchableFluentThemeProvider';
import { useIsMobile } from '../utils/useIsMobile';
import { isIOS } from '../utils/utils';
import { CallScreenProps } from './CallScreen';
export type CallCompositeContainerProps = CallScreenProps & { adapter?: CommonCallAdapter, userRole?: 'presenter' | 'participant' };

export const CallCompositeContainer = (props: CallCompositeContainerProps): JSX.Element => {
  const { adapter, userRole } = props;
  const { currentTheme, currentRtl } = useSwitchableFluentTheme();
  const isMobileSession = useIsMobile();
  const shouldHideScreenShare = isMobileSession || isIOS();
  // const onSurveySubmitted = (callId, surveyId, submittedSurvey, improvementSuggestions) => {
  //   // add your own logic for handling survey data here,
  //   //console log is a place holder and should be removed
  //   console.log('UserName',
  //     'call id is ',
  //     callId,
  //     'survey id is ',
  //     surveyId,
  //     'submitted survey data is',
  //     submittedSurvey,
  //     'improvement suggestions are',
  //     improvementSuggestions
  //   );
  //   return Promise.resolve();
  // };
  //   const generatePlaceHolderButton = (name: string): CustomCallControlButtonCallback => {
  //   return () => ({
  //     placement: 'primary',
  //     iconName: 'PeoplePaneAddPerson',
  //     strings: {
  //       label: name
  //     }
  //   });
  // };
  
  // const overflowCustomButtonsForInjection: CustomCallControlButtonCallback[] = [
  //   generatePlaceHolderButton('Invite People'),
  // ];
  const options: CallCompositeOptions = useMemo(
    () => ({
      callControls: {
        screenShareButton: false,
        raiseHandButton: false,
        endCallButton: {
          hangUpForEveryone: userRole === 'presenter' ? 'endCallOptions' : undefined,
        },
        // onFetchCustomButtonProps: overflowCustomButtonsForInjection
      },
      branding:{
        logo:{
          url:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMxNSAxMTkiIHdpZHRoPSIzMTUiIGhlaWdodD0iMTE5Ij48ZGVmcz48aW1hZ2UgIHdpZHRoPSIzMTUiIGhlaWdodD0iMTE5IiBpZD0iaW1nMSIgaHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFUc0FBQUIzQ0FNQUFBQkw3eGRXQUFBQUFYTlNSMElCMmNrc2Z3QUFBU0JRVEZSRi8vLy9BQUFBTW1LWE1tS1hNbUtYTW1LWE1tS1hNbUtYTW1LWE1tS1hNbUtYTW1LWE1tS1hNbUtYTW1LWFA1ak1QNWpNTW1LWFA1ak1QNWpNUDVqTVA1ak1QNWpNUDVqTVA1ak1QNWpNUDVqTVA1ak1QNWpNUDVqTVA1ak1NbUtYUDVqTU1tS1hPb1M0T1gyeU80YTZPb1M0T1gyeU9YMnlQSXUvTTJXYU5YQ2tPSHF1UFk3Q04zYXJQcFhKTkdxZk5HcWZOWENrUkpTOVVvaVdtWXBUVVltWVlIeHNhSFZXMTZSUFdZS0MvTE5NL0xOTWhJRlUvTE5NWlhkZHFaQlMvTE5NUXBiRlhuNTB6cUJQL0xOTVI1RzJZM2xsODY5Ti9MTk1sb2hUeFp4US9MTk1jWGxWL0xOTVZJZVJzcFJSL0xOTWUzMVZXNEI3MTZSUC9MTk1Wb1NLb0l4U3U1aFE2cXROaFp1Ty9MTk0vTE5NL0xOTS9MTk0vTE5NL0xOTXZ1citNUUFBQUdCMFVrNVRBQUJnZ1ArZjcxQXdFTisvanlCQUVJK3ZyeUMvTUo5QTcvOWczNERQVUhCd3o0Q0F2Ly8vdi8vLy8vLy8vLy9QY0VEL3p6RC8vLysvLy85QS82Ly8veUQvLy85dy8vLy96Ly8vWVArUC8vKy8vLy8vNy8vLy8vKy9uMURmTUJDQWQzTnc0d0FBRDhwSlJFRlVlSnp0blRsdkcwa1dnRi8xd2VZdGtaUW9reFF0ejlvR05wakZSaHRZTUtEQWdRSEJnSUtKeHRlUGszeEVFd2d3QkRod1lNRHdZSVBOOXBqZDhkald5TEpsM1lkRnNzayt0cXI2cXVxRG9xaUxuTllMcU81bVZSK2ZxdW9kOWFxSkFCQWNVeEF5amx2bGp5WW0rVURIWjRjRXBKM0I3UXlWOU1rT0NTQjB6dUoraGtuNlk0ZlJBWWp0czdpaElaSysyQ1YwV2l2dW5iWWZkb3BCMVlRZ3RzN2tsb1pHK21DWFJIWm5OY3l6dUtQaGtUN1lwVlY3UTJtY3dRME5rUnlmWGNicnFhbHZwMzlEUXlUSFpwZGpHcHNaYi9QWVlUZXkzMXY1cE03d1NqVFA0cGFHUmh4Mm8zdTlsUjg5WVBja05hcGNITVJoVjl6cHFYaU9Wdy94TnZIY1Bpc2h0SGwwOFJUdlM4VGJMM1BZbGJiSDFmMnljUVErd2E5U1l1MlhPZXl1bU90RndaVFJsMjZGT1VWQkpkYWQxbUZYNld3VlVpMjBCV1BHZG1UaFFMT0xkNmQxMk5YVXJTc2dycFpFSTluY2lpZ2JiSGJ4N3JRT3V6SmFyK2x0UVFKNVpXeHpzcGxjRFNsN05lUmc4dkNNYjNDQXhmVXJ4alpoYW5sS0JUTGlUU0R6YXhuVy9XVlRJVzBzenVheHl3NnIyVXBqYjZyVjNJZnhOa2hiQmNYVWVhMmJDM1g5WTJ3ZXUreEd3RXdoOUdVczBkNmNRTUpucUJwZ2dOUkJYdXVUUWtOT3RkL1A2VTRIVDF4MmRlMHdoYVJQTmQwVVRNRHN4Z1hVeUpqUThSU0hIT3I1NTNiUDZVNEhUOWc0U2xsQVgwWlMwTTYxakEyWWhPWldUUWQ5b3dCSmF2UXA0YVpjakswVWhsMSt2N3dPVTNwemF3b09ONHNKQUEyUUlLMldaRmdqaFlMR25TWHhIZkE4ZG1QSi9YMm9tS3E0V1RXYWV4VVR6SysxdG1sc1R5QllHMG1nZFQ2QzRrbDhCenlQWFUyWDl2ZXhoaERKTkVSakJQVG16cVNHemVXQ0FtdTQ4NkxkQ0NzNHZtNFowKzRrYk52aDVtYTBGRkhmbUpEYm1wWW1aQlJUV2g0WG9Sa1ZYNjkvUEwrN0hTeGh4cnZKVG5PL3FJaWZLbzNScG9pUGE0YXBnSmJFYmE4cGlwQ0s3SnI2K2QzdFlBbXJLekpmeHNURUh1NjNVa3ZSc1oweWtsWlRxMWV3Y2RKUW1tbGxPZW9Vc1ozeDRlZDZjTjlVbWdLMlI1YnI3WmFaQmtGc21qSm9DUU1VNldQVUtkSVJTdVFQTHdGMm5TMXM0alV5d2dGZ3l4aEV6VWdLeTdqdEtmS0hxRk5jc2lOLzYzdUtLSzlBM1ZpZDFBUlJSY2hzcGZDNGx6THhtSmQrSDNVS3drNkpvNUhIc2N2TG5jSXlUSDB6SmR4djlZMThqc3pBU2djcDRUQXRkR1duYUhHMGtQaytXMFBZUHE0YVppdW5nYnhTU2g3a05OVEUyeGpNK0c5UnA1QkIwanB4N0xnOHUzeitFN0h6UU4yWjBqOWh0OHhNN0dWMGdReDdhT1JkeEJrU1RTRy9LMTZ5ZytKMjVYQ2tqUXdTZWNMT0JDRGRUQnFtZ1V5SVpHY2FpcUUwNDJpbytQTlI4aW01QWVJR1RLcHFvWVdnb1lqWTBCdVRvOW1STER6UnZQcnhmRzUzb0NTUXl6T3BrWGd4N3JobWNpZlgzcGhBSUgwcUdaSUdFUWtyV0pzb2dvYmlPT1VUWUllcHRiZUpvWWNONU9MMm1JaWdpWTFrRUkyUlg4UHFFMi8yNm1vOE0vR0NPV1NWOWxiTk9CUVZqSERTTUw5VVVEdlZJUVpjNFg4aDFRVUZqM01wTFo3WnN5SDVkM2xJSVJWSjZoNkpmNm83bUNiV0ZVbTErTjlnYlVIQTFrdkNGRlNVUlBGcmVtRzVpNWFWQWpDRndTaUhlbllsbnhGYWNqYm9sRkYwSUludFpGdlE0cGQ4SEpyM1dURkpLRS9WVUFyYWVncUVGbXhYV3RWZi9IWHJYNmd6a1RWVXJDNHViUlJieXRMbmZCckVBeW0zWERXd2tUSnBITW93NWxNV1NLS2puSUJBRVdOb0dYZkpOeVlkRm5mY0lwS2hLWktKbjBUeFArejNnbVdXSkFVMUljV1NYQmQyWTBuaTB0YWdLU0FkOTF2VEZMZ0JMNm5UUnBkckdmSE5TT21TNTQ2TmxYd0tnYmdLWTBob0pjVHhmN3RmNVRScmVFTkNISFdFSTkzWENKUkpIR0Mxa0QvWWhtSnV2LzR2NnlnUzdZQ1RaRnFhTnFaeXhQcUtmTUVLNW1GdmZ4UCsrazk4UkVnZ1I2WEdIRjB2YTFOd2kwdTFFaUI4Uys0WXVUMnZpOFlkWGUvcmVvcENPMW45aGZHOU1xMFlwMU5RNlhmTk8xbCtmTG1PRWZwaXAyaXhUcGVsMGllN0pHclgxOWpnU1ZJdWZPSlBuSFVzNWx6VVNUck9DWElxazlNeXVkTVprcWhNSkx0OFVyWTJoR2JJZ2hYc2lMR0RYUzdNS1JQTUpOSEk0ZW1pUkt4Y1paUUtqSnIxNWFFWURjTFpGWE02bTkzVXlSN3dpeTZ5VGE3SFpxSWFDaGtSMDlFS1JjZDlYd2lOT0N2R0VMUzlNSFpGVWZRWHF5RDBEMllYbXlkTXVETnM3WUF0WXJzN3U2d2FzUVIzR0RMVFF0alZORjhIcm9nSUFmcTdkd0EzTzJiWnNiVmtSWkRiTElaa2VZWDh3ZDB5S2wrVXh1dnRoTWo2ZXNLWkRoRVNIWG9lZWZBYlhvQmRYcGI1RWhXRlBvdUkzcnFIK0daSFg1WmlCNlFZeWVxa04zSW1JRzJDWE1vWmJlQm1ncTlMZ1E3QmhLK2ZIWm5jWWNVbUI3SWh2bkdPNFlZV0dPMUM1bWNwVXk2ak5zQ081bjhIdWlkZHlERUU2K2w5N1B6b0poMGxtT3hBNHJWOUVFTmhVUkVpWWN0N0tCZ09RWUJkT0tVc09ka1FHTjQ4T3grNlB5TzNlZUhuU2IreXQwY1B1RGxGUWlSMGtwRjB5SDdZUVJaQmV3amNQWTVkVWViUWZZKzhsd2pnTVNqLzB0ckVUWkJyRkpIc3JtSnJXZTQ2M2lYSjRveUVPS1J6SFN5N2ZKNGJlYjVYdmVjdUVvcDJwMDNvdkJLOHR0THJhMmFDdXNKYTNwZEF5T3Z6R1JoOExXRUp5MjZjTStzcVdhYkpsTWpLcDhJUzNaWk1QcldkMVBMWUpUazF6WGU5SUx0dzA1Q05kQTJ3TU96cS9PcW1PdE4veDZsYlVYcEJkNjZ0OENNVXh5N3BXeUxWWGM5R2VtekRZQm96N01qY0JDTi8rOHJzWE5rZ24rVkY4b25wOExZWHg4Ni9VTFM3cm9BSVYzZzQxalI3N0FvS2U3ekNkcjFxZ3o2ZnhRN1Q0VzErc3I2eGYzYWt6amV5UXNIeGF6dTJRVGxFZmdXWjFtSGtGanNRVFZwdnI2aitSRDZ2cnZwVzhuQjYxdjlPZ1Y3WStVU3BFSGR1bVB5S0VqZkdjODNPR2NNc2RnTHlMWms5Z1gwWEx2UzFqa1BrVjB6d3plNDJNOFJQT1VGTnE4K21WZDlqUmJHanlJOWdSNjZhOXB0M3crYVRqWGNrdHFuOXhiV0t4ek1yenFibDBhWlZuN3NVMVpxQ0NIcjBLNGFOSFYyM0xRb3R5L1gvM29rSWpSOVV2QlpvT1dWcDFUY1UwU0JUeVBBVVBCNWdSejNYZ0VvZDFqZ0tkaUVrRUdkb0YreWtaRzd4b3VWWHBGVmZ6SVQ2L0lLVzRZL21yTWd2cHk0allsQzFiYWFxMHJiQ0QwT1FPQjhlYzc4ZE5xQmZlMDcvcEZYL2wxMGl3N3lORzJRWHRSaDhLSXpqY0haM1E1TGFxNXVXT3h0a1o3K3pOMFQ0dWJRUWRsRXhkMS9Gd1pSd2RyZENTbjczelBxYkxuLzBmMlZaWkVIeHo5aUVhSlh3dVo1Z0ZIb1FwVmQyVmNWR0Iya0lzVWNTaHV4blVOOFEvQjB5UjFZSytUVURHbEc1cW9MY0NsZ3RneW1oN0tZRER2cWYwQk5uVThoSHZFMkdpNkFjVDBzcWlUNHJYcWoweHE2Y1gzQzNzKzA0cnVFSmsxN1lWWGRmd2FVRXBRZDI1ZDNYY0NraGNpUzdhblBwZk85b2VPUW9kcVhDQWh3aGs1cndtZG10R21STkVFbFZYck1PZU5FdDZVQzA4bHBxdktGQ2x1dmlVb2IzdnJpYXpyd0FEWW9Ka05nc0s3NnM1Zjg2MFFocUIxa09uUzh6eEx1bUZTaGp6VytSTCtDMzlzbkpxWXZwZU5tMFBLM3ZaemZqYUlOcm4zdm9ydVJkUHQ2VDRPZWlMNnNOWTRldkxkQlE0REhaa1lrVUZ0WkoyU0hyamhoLzhmVFkyZlpkVCtUSWNtV2tiN2g3NDZKSm8vVWNPK3VLcVgwRjN6QXhvN0hQVFBaVis0dldmbGQyK1RUK1lGbWVsSjM5OGswbVZIT0s3SDc0RE5WRWIrU3drQmVxT0U0Y1dVcEZRODRjTzN1THpKMHovWnY1b2l1N21rN2VOZExlamloN2JIWUplNHRKWmpoRmRuUFp0ZXFSNDV3cmVEaHkzM2cwcGRvUEdjcU96TVY1VDkwcnV3blVOTG0yZlJ4MklWRU5sNHdYaUF3dHloL3NsZDNNOGF5U2t1eTJKbHRUUkxHREszYXpESHdSelE2UHArMXRQT1M1YmZ1RTdHalFzTDRDYkxUN0ZOa2RVenh0Z1o5S1huRzJ3dGhWaldPem8vOE8zTGE1aWlkZ1I2ZUVKUnFEY0lPRUY4Y085eXE3UjQyTFRndU1iSGR1OSs2Um5kM05DNHI1TmJ5c3hhNXVseTk1azJ4V2NwOVR5bEVNMUVDcGY2UVpDYTZaMGlzN2xMSjI2RC9xZE5nNTJzTFZGRkhzY0F2VjNOVHYzdGlWWkdyYk9iWlBzR3pJaTVmRGRJVURnVUl6VERvVDVhWmc5c3FPazlOaDUyZ0xyQ21jVWVtMDlDeDlIU1RaWUV6d0U3RWpCZ3BoUmtQV1RzckhCYkp6dEVYVmNMVmhsSDNIbTlGSHMzUHNSZFlFUHdrN2FxQ1F2a28zSERQbEl0bFpneEw3VEYzOUNuOFJpR1RINklpcTRmQU1ZeWZZMFVPYWt0Rmx2S082cEVac2daWlhzbWQyQ1pzVHRYSk9pWjNWNGp4TkVjRk8xZG1KRUk0ZGhpUjdrZnVTYkhNYVNiRlhzY2ZLRStqWnJDKzUxODV4dUVBOVN6M1VCcVJEbGFpN05aSXltNUhzUEYwTjFNMXI3dGtiN0ZYc0VpZGdGOGhaczh5VUMyVkh0QVdvREpzUWRoZ0U2NVg2MkJVVVR3WGovNFRWQ0xIeThiSnVPNHJucy9USnpwOGU2TXlzMDZKcCs1QVQ5ajh2ZHZqUjhRUHhmbE5BeitKUjBXdVlmblo0VDJwWjhDcjBiZnhFdkRFT21MR3ZQMytXSEtRQTZyWnlGVWdidE41SHp4VjFjSjBiTzVvMTZ0bHU0VFlLTm5BNzJ5RkZxSkNoVFpkMDNJdGtzSDg3Z3c5dmtlcTBZZU9LaWoxdWFkdkhZa2NqS003djVGaGhQT3JVWGl3NzhvTVhiSUF5bEYyZS9NeERTQkZMdktpZTg3TWpqS05zVjNCaWc0NlFodGc3T3hxNDg4SW5kUENqMllRWHpJNjg4ejNVQVBIRlVTTDhXU0pGa2Y1R1JpZTdZdzJicmwzc1NOV2dMUHRtUisxaEwyeG4vYXdFV2JaMXdlemlKMzIvTCtCU0x0bWRRQzdaOVM4eFp6ZDl2ZmVwaFlERW5OMHRaa1gxc2VXU1hmK1ZCNXZkVExXeGRlM0p0UEFHNEU1dC9oSGFnODRTd0wxbWVlOXdOTDhBNUl0WkdmVENBanc4MkJCS0l5YnVnZmdBL1F2dzZIT1diczRLeFQzSVBKc1ozWDBOMCtPNUExenpYbkVleVA2dGRMbVJsbkRwYWFHVS92d2FIdTRhOHFKOTJTUHZicURaell4OU5Zcks1dFdHOGd3ZTdDek50VVJJWmVaaGJsMDAzajVZZXdXMzY4OGZINnFHRHVXRmFiT2EyZDY2T1EvM3NMZW1GMmxxOUt6Y29lVWYvNXFmZUs5ZmYzSjNZaDUraE9jL05KY2V2YXVtRis1Y2VRcTNvRlE4MUJiaC9vZWIydTlUVDJHNmtoVG43Y3NlT1ZjNDBPd2U3eTBDL0NqUDR3ZStyLzcwOExjYkMzQi82eVhNYmVGMk9GdDQrdWpkOVNjWUJEeHFOSmVtVGR6NzdvbUx0QmZPdEgrMlRqRFRtV29zd21OZFdJQUg0anl0Z3Q3ZTIzMHpxNC90TE4zVlhzRXRUUHYraDU5aGJtUWU0TUdIdDlObTRyVjcyYU51YjZEWnpkRTR3TTE1VEUwN2VHRm5HTmtQK3FpaGZKVmV3aTJ5Y0FFZm1EWi90bGhiNlNCMEdKdE5nWmI5dG1peElKVitVSFlMVHdHZmJWMUw3WXB0WEpXUUpsV3RXdWxYMCtPTDNtV1B1cjJCWmtmYUVaVUhhNDNyVDZiTkc1WkJRZG5Canl0VE8wdEEyaDMrK3BYSHpodjk1NzY5b3FkdzJkM2J6ZUMyQm5jbmZyM3hlL3ZtK3pmZ3NyTk9pWWM5d3M2OTdCRXkwT3pJd0ROYXdCM3VUb084ck9BdWxPQVE4N0FlZEthTnh5d3l2STBlU3VrRmx4MCtzQ3ZVbjhQajVkZTNTeHMzeUdEbXNyT3E0TE9KYitEdVBsbUc3ckRENDkyN0cxOWZXdXljeTA1ZmU5YjE5Z2FhSFR6OFdNSUtFbmZRZmZxNUkxSzllYytnNlpSM3FVYkFhcFVxeUFQODBMUENDd0lRaU9hY3l6M0J0YmRHNFlWMW1GYWFTNU1xOUd5ek1zbWh4cVdzcXZjUGdhaldoN3N2dk12ZVNiM29lbmVEemE2TFBIeHZYai9hakRocGxhNHlyT3dlL3VhczBUckxLdDJGc3ZzL1RmZDI0V3g0ZTJjQUFBQUFTVVZPUks1Q1lJST0iLz48L2RlZnM+PHN0eWxlPjwvc3R5bGU+PHVzZSAgaHJlZj0iI2ltZzEiIHg9IjAiIHk9IjAiLz48L3N2Zz4="
        }
      },
     surveyOptions : {
    //  onSurveySubmitted:onSurveySubmitted
    disableSurvey:true
     },
      autoShowDtmfDialer: true,
    }),
    [shouldHideScreenShare]
  );
  
  // Dispose of the adapter in the window's before unload event.
  // This ensures the service knows the user intentionally left the call if the user
  // closed the browser tab during an active call.
  useEffect(() => {
    const disposeAdapter = (): void => adapter?.dispose();
    window.addEventListener('beforeunload', disposeAdapter);
    return () => window.removeEventListener('beforeunload', disposeAdapter);
  }, [adapter]);

  if (!adapter) {
    return <Spinner label={'Creating adapter'} ariaLive="assertive" labelPosition="top" />;
  }

  let callInvitationUrl: string | undefined = window.location.href;
  // Only show the call invitation url if the call is a group call or Teams call, do not show for Rooms, 1:1 or 1:N calls
  if (props.callLocator && !isGroupCallLocator(props.callLocator) && !isTeamsMeetingLinkLocator(props.callLocator)) {
    callInvitationUrl = undefined;
  }

  return (
    <CallComposite
      adapter={adapter}
      fluentTheme={currentTheme.theme}
      rtl={currentRtl}
      callInvitationUrl={callInvitationUrl}
      formFactor={isMobileSession ? 'mobile' : 'desktop'}
      options={options}
    />
  );
};

const isTeamsMeetingLinkLocator = (locator: CallAdapterLocator): locator is TeamsMeetingLinkLocator => {
  return 'meetingLink' in locator;
};

const isGroupCallLocator = (locator: CallAdapterLocator): locator is GroupCallLocator => {
  return 'groupId' in locator;
};
