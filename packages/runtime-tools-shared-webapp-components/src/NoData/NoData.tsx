/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState } from "react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateFooter,
} from "@patternfly/react-core/dist/js/components/EmptyState";
import { Button } from "@patternfly/react-core/dist/js/components/Button";

import { PageSection } from "@patternfly/react-core/dist/js/components/Page";
import { Bullseye } from "@patternfly/react-core/dist/js/layouts/Bullseye";
import { SearchIcon } from "@patternfly/react-icons/dist/js/icons/search-icon";
import { Redirect } from "react-router";
import { OUIAProps, componentOuiaProps } from "@kie-tools/runtime-tools-components/dist/ouiaTools";

export interface IOwnProps {
  defaultPath: string;
  defaultButton: string;
  location: any;
}

export const NoData: React.FC<IOwnProps & OUIAProps> = ({ ouiaId, ouiaSafe, ...props }) => {
  let prevPath;
  if (props.location.state !== undefined) {
    prevPath = props.location.state.prev;
  } else {
    prevPath = props.defaultPath;
  }

  const tempPath = prevPath.split("/");
  prevPath = tempPath.filter((item: string) => item);

  const [isRedirect, setIsredirect] = useState(false);
  const redirectHandler = () => {
    setIsredirect(true);
  };
  return (
    <>
      {isRedirect && <Redirect to={`/${prevPath[0]}`} />}
      <PageSection isFilled={true} {...componentOuiaProps(ouiaId, "no-data", ouiaSafe ? ouiaSafe : !isRedirect)}>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateHeader
              titleText={<>{props.location.state ? props.location.state.title : "No matches"}</>}
              icon={<EmptyStateIcon icon={SearchIcon} />}
              headingLevel="h1"
            />
            <EmptyStateBody>
              {props.location.state ? props.location.state.description : "No data to display"}
            </EmptyStateBody>
            <EmptyStateFooter>
              <Button variant="primary" onClick={redirectHandler} data-testid="redirect-button">
                {props.location.state ? props.location.state.buttonText : props.defaultButton}
              </Button>
            </EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      </PageSection>
    </>
  );
};
