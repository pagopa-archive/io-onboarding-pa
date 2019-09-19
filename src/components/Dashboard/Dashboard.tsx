import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Button, Col, Row } from "reactstrap";
import { TokenContext } from "../../context/token-context";

/**
 * Component for delegate dashboard
 */
export const Dashboard = withRouter(props => {
  const tokenContext = useContext(TokenContext);

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

  tokenContext.setToken(getCookie("sessionToken"));

  console.log("setToken", tokenContext.token);

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
