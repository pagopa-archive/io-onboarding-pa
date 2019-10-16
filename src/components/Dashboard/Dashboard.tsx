import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Button, Col, Row } from "reactstrap";
import { TokenContext } from "../../context/token-context";
import { ICustomWindow } from "../../customTypes/CustomWindow";

/**
 * Component for delegate dashboard
 */
export const Dashboard = withRouter(props => {
  const tokenContext = useContext(TokenContext);

  /**
   * Create window with custom element _env_ for environment variables
   */
  const customWindow = window as ICustomWindow;

  /**
   * Given a cookie key `cookieName`, returns the value of
   * the cookie or empty string, if the key is not found.
   */
  function getCookie(cookieName: string): string {
    return (
      document.cookie
        .split(";")
        .map(c => c.trim())
        .filter(cookie => {
          return (
            cookie.substring(0, cookieName.length + 1) === `${cookieName}=`
          );
        })
        .map(cookie => {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        })[0] || ""
    );
  }

  /**
   * Set token in token context
   */
  useEffect(() => {
    /**
     * Set token in token context
     */
    tokenContext.setToken(getCookie("sessionToken"));
  }, []);

  useEffect(() => {
    if (tokenContext.token) {
      const url =
        customWindow._env_.IO_ONBOARDING_PA_API_HOST +
        ":" +
        customWindow._env_.IO_ONBOARDING_PA_API_PORT +
        "/profile";
      fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + tokenContext.token
          // 'Content-Type': 'application/json'
        },
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          // TODO: add code to manage get profile response, tracked with stories #169127957 and #168752398
          console.log(responseData);
        });
    }
  }, [tokenContext.token]);

  return (
    <div className="Dashboard">
      <Row>
        <Col className="text-center">
          <Button
            color="danger"
            onClick={() => {
              return props.history.push("sign-up/1");
            }}
          >
            DUMMY BUTTON REGISTRATION
          </Button>
        </Col>
      </Row>
    </div>
  );
});
