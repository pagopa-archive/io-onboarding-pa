import "./LoadingPage.css";

import React, { useContext } from "react";
import { Trans } from "react-i18next";
import { Button, Col, Media, Progress, Row } from "reactstrap";

import { LoadingPageContext } from "../../context/loading-page-context";

/**
 * Progress bar (visible in pages shown to wait for an operation to be completed)
 */
export const LoadingPageProgressBar = () => {
  return (
    <Row className="justify-content-center pt-5">
      <Col sm="3">
        <Progress
          className="progress-indeterminate bg-transparent border-light"
          color="white"
        />
      </Col>
    </Row>
  );
};

/**
 * Button (visible in pages shown to inform user and prompt for a confirmation)
 */
export const LoadingPageButton = () => {
  const loadingPageContext = useContext(LoadingPageContext);

  return (
    <Row className="justify-content-center bg-dark bg-transparent pt-4 mt-4">
      <Col sm="6">
        <Button
          color="primary"
          onClick={loadingPageContext.loadingPage.buttonFunction}
        >
          {loadingPageContext.loadingPage.buttonText}
        </Button>
      </Col>
    </Row>
  );
};

/**
 * Loading and informative page for users
 */
export const LoadingPage = () => {
  const loadingPageContext = useContext(LoadingPageContext);

  return (
    <div className="LoadingPage h-100">
      <div className="container-fluid d-flex h-100 flex-column custom-background-container overflow-auto">
        <Row className="justify-content-center pt-5 mt-5 pb-3 mb-3">
          <Col sm="6">
            <Media
              object={true}
              src={loadingPageContext.loadingPage.image}
              alt="loading-page-image"
              height="110"
            />
          </Col>
        </Row>
        <Row className="justify-content-center pt-4 mt-4">
          <Col sm="6">
            <h3 className="text-white mb-4 mt-3">
              {loadingPageContext.loadingPage.title}
            </h3>
          </Col>
        </Row>
        <Row className="justify-content-center pt-4 pb-5">
          <Col sm="5">
            <p className="text-white">
              <Trans i18nKey="multiline">
                {loadingPageContext.loadingPage.text}
              </Trans>
            </p>
          </Col>
        </Row>
        {loadingPageContext.loadingPage.isLoadingBarVisible ? (
          <LoadingPageProgressBar />
        ) : null}
        {loadingPageContext.loadingPage.isButtonVisible ? (
          <LoadingPageButton />
        ) : null}
      </div>
    </div>
  );
};
