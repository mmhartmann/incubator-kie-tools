/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect } from "react";

import { Card } from "@patternfly/react-core/dist/js/components/Card";
import { PageSection } from "@patternfly/react-core/dist/js/components/Page";
import TaskInboxContainer from "../../containers/TaskInboxContainer/TaskInboxContainer";
import TaskInboxSwitchUser from "./components/TaskInboxSwitchUser";
import { useDevUIAppContext } from "../../contexts/DevUIAppContext";
import "../../styles.css";
import {
  OUIAProps,
  componentOuiaProps,
  ouiaPageTypeAndObjectId,
} from "@kie-tools/runtime-tools-components/dist/ouiaTools";
import { PageTitle } from "@kie-tools/runtime-tools-components/dist/components/PageTitle";
import { Flex } from "@patternfly/react-core/dist/js/layouts/Flex";

const TaskInboxPage: React.FC<OUIAProps> = (ouiaId, ouiaSafe) => {
  const appContext = useDevUIAppContext();
  const user: string = appContext.getCurrentUser().id;
  useEffect(() => {
    return ouiaPageTypeAndObjectId("tasks-page");
  });

  const renderTaskInbox = (): JSX.Element => {
    return <TaskInboxContainer />;
  };

  return (
    <React.Fragment>
      <PageSection
        variant="light"
        {...componentOuiaProps("header" + (ouiaId ? "-" + ouiaId : ""), "tasks-page", ouiaSafe)}
      >
        <Flex alignItems={{ default: "alignItemsCenter" }}>
          <PageTitle title="Tasks" />
          {user.length > 0 && <TaskInboxSwitchUser user={user} />}
        </Flex>
      </PageSection>
      <PageSection {...componentOuiaProps("content" + (ouiaId ? "-" + ouiaId : ""), "tasks-page-section", ouiaSafe)}>
        <Card className="Dev-ui__card-size">{renderTaskInbox()}</Card>
      </PageSection>
    </React.Fragment>
  );
};

export default TaskInboxPage;
