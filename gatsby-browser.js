/*
 *  Copyright 2025 Adobe All Rights Reserved.
 *  NOTICE:  All information contained herein is, and remains the property of Adobe and its suppliers, if any.
 *  The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws.
 *  Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
 */

const isBrowser = typeof window !== "undefined";

export const onClientEntry = () => {
  // set adobe analytics window object
  if (isBrowser) {
    window._satellite = window._satellite || {};
    window.alloy_all = window.alloy_all || {};
    window.alloy_all.data = window.alloy_all.data || {};
    window.alloy_all.data._adobe_corpnew = window.alloy_all.data._adobe_corpnew || {};
    window.alloy_all.data._adobe_corpnew.web = window.alloy_all.data._adobe_corpnew.web || {};
    window.alloy_all.data._adobe_corpnew.web.webPageDetails = window.alloy_all.data._adobe_corpnew.web.webPageDetails || {};
  }
};

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (isBrowser) {
    function watchAndFireAnalytics() {
      // eslint-disable-next-line no-undef
      if (typeof window._satellite !== 'undefined') {
        // eslint-disable-next-line no-undef
        _satellite.track('state',
          {
            xdm: {},
            data: {
              _adobe_corpnew: {
                web: {
                  webPageDetails: {
                    customPageName: location.href
                  }
                }
              }
            }
          }
        );

        clearInterval(intervalId);
      }
    }

    // watch if analytics is online then track page
    const intervalId = setInterval(watchAndFireAnalytics, 1000);
  }
}
