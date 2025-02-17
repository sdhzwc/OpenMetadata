/*
 *  Copyright 2023 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import Icon from '@ant-design/icons/lib/components/Icon';
import { Button, Col, Row, Tabs } from 'antd';
import { AxiosError } from 'axios';
import { compare } from 'fast-json-patch';
import { isUndefined } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ReactComponent as IconPersona } from '../../../assets/svg/ic-personas.svg';
import DescriptionV1 from '../../../components/common/EntityDescription/DescriptionV1';
import ManageButton from '../../../components/common/EntityPageInfos/ManageButton/ManageButton';
import NoDataPlaceholder from '../../../components/common/ErrorWithPlaceholder/NoDataPlaceholder';
import Loader from '../../../components/common/Loader/Loader';
import TitleBreadcrumb from '../../../components/common/TitleBreadcrumb/TitleBreadcrumb.component';
import { UserSelectableList } from '../../../components/common/UserSelectableList/UserSelectableList.component';
import EntityHeaderTitle from '../../../components/Entity/EntityHeaderTitle/EntityHeaderTitle.component';
import { EntityName } from '../../../components/Modals/EntityNameModal/EntityNameModal.interface';
import PageLayoutV1 from '../../../components/PageLayoutV1/PageLayoutV1';
import { UsersTab } from '../../../components/Settings/Users/UsersTab/UsersTabs.component';
import {
  GlobalSettingOptions,
  GlobalSettingsMenuCategory,
} from '../../../constants/GlobalSettings.constants';
import { usePermissionProvider } from '../../../context/PermissionProvider/PermissionProvider';
import { ResourceEntity } from '../../../context/PermissionProvider/PermissionProvider.interface';
import { SIZE } from '../../../enums/common.enum';
import { EntityType } from '../../../enums/entity.enum';
import { Persona } from '../../../generated/entity/teams/persona';
import { useFqn } from '../../../hooks/useFqn';
import { getPersonaByName, updatePersona } from '../../../rest/PersonaAPI';
import { getEntityName } from '../../../utils/EntityUtils';
import { DEFAULT_ENTITY_PERMISSION } from '../../../utils/PermissionsUtils';
import { getSettingPath } from '../../../utils/RouterUtils';
import { showErrorToast } from '../../../utils/ToastUtils';

export const PersonaDetailsPage = () => {
  const { fqn } = useFqn();
  const history = useHistory();
  const [personaDetails, setPersonaDetails] = useState<Persona>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation();
  const [entityPermission, setEntityPermission] = useState(
    DEFAULT_ENTITY_PERMISSION
  );

  const { getEntityPermissionByFqn } = usePermissionProvider();

  const breadcrumb = useMemo(
    () => [
      {
        name: t('label.persona-plural'),
        url: getSettingPath(
          GlobalSettingsMenuCategory.MEMBERS,
          GlobalSettingOptions.PERSONA
        ),
      },
      {
        name: getEntityName(personaDetails),
        url: '',
      },
    ],
    [personaDetails]
  );

  useEffect(() => {
    getEntityPermissionByFqn(ResourceEntity.PERSONA, fqn).then(
      setEntityPermission
    );
  }, []);

  const fetchPersonaDetails = async () => {
    try {
      setIsLoading(true);
      const persona = await getPersonaByName(fqn);
      setPersonaDetails(persona);
    } catch (error) {
      showErrorToast(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fqn) {
      fetchPersonaDetails();
    }
  }, [fqn]);

  const handleDescriptionUpdate = async (description: string) => {
    if (!personaDetails) {
      return;
    }
    const updatedData = { ...personaDetails, description };
    const diff = compare(personaDetails, updatedData);

    try {
      const response = await updatePersona(personaDetails?.id, diff);
      setPersonaDetails(response);
    } catch (error) {
      showErrorToast(error as AxiosError);
    } finally {
      setIsEdit(false);
    }
  };

  const handleDisplayNameUpdate = async (data: EntityName) => {
    if (!personaDetails) {
      return;
    }
    const updatedData = { ...personaDetails, ...data };
    const diff = compare(personaDetails, updatedData);

    try {
      const response = await updatePersona(personaDetails?.id, diff);
      setPersonaDetails(response);
    } catch (error) {
      showErrorToast(error as AxiosError);
    } finally {
      setIsEdit(false);
    }
  };

  const handlePersonaUpdate = useCallback(
    async (data: Partial<Persona>) => {
      if (!personaDetails) {
        return;
      }
      const diff = compare(personaDetails, { ...personaDetails, ...data });

      try {
        const response = await updatePersona(personaDetails?.id, diff);
        setPersonaDetails(response);
      } catch (error) {
        showErrorToast(error as AxiosError);
      } finally {
        setIsEdit(false);
      }
    },
    [personaDetails]
  );

  const handleRemoveUser = useCallback(
    (userId: string) => {
      const updatedUsers = personaDetails?.users?.filter(
        (user) => user.id !== userId
      );

      handlePersonaUpdate({ users: updatedUsers });
    },
    [personaDetails]
  );

  const handleAfterDeleteAction = () => {
    history.push(
      getSettingPath(
        GlobalSettingsMenuCategory.MEMBERS,
        GlobalSettingOptions.PERSONA
      )
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isUndefined(personaDetails)) {
    return <NoDataPlaceholder size={SIZE.LARGE} />;
  }

  return (
    <PageLayoutV1 pageTitle={personaDetails.name}>
      <Row className="m-b-md page-container" gutter={[0, 16]}>
        <Col span={24}>
          <div className="d-flex justify-between items-start">
            <div className="w-full">
              <TitleBreadcrumb titleLinks={breadcrumb} />

              <EntityHeaderTitle
                className="m-t-xs"
                displayName={personaDetails.displayName}
                icon={
                  <Icon component={IconPersona} style={{ fontSize: '36px' }} />
                }
                name={personaDetails?.name}
                serviceName={personaDetails.name}
              />
            </div>
            <ManageButton
              afterDeleteAction={handleAfterDeleteAction}
              allowSoftDelete={false}
              canDelete={entityPermission.EditAll || entityPermission.Delete}
              deleted={false}
              displayName={getEntityName(personaDetails)}
              editDisplayNamePermission={
                entityPermission.EditAll || entityPermission.EditDescription
              }
              entityFQN={personaDetails.fullyQualifiedName}
              entityId={personaDetails.id}
              entityName={personaDetails.name}
              entityType={EntityType.PERSONA}
              onEditDisplayName={handleDisplayNameUpdate}
            />
          </div>
        </Col>
        <Col span={24}>
          <DescriptionV1
            hasEditAccess
            description={personaDetails.description}
            entityType={EntityType.PERSONA}
            isEdit={isEdit}
            showCommentsIcon={false}
            onCancel={() => setIsEdit(false)}
            onDescriptionEdit={() => setIsEdit(true)}
            onDescriptionUpdate={handleDescriptionUpdate}
          />
        </Col>
        <Col span={24}>
          <Tabs
            defaultActiveKey="users"
            items={[
              {
                label: t('label.users'),
                key: 'users',
                children: (
                  <UsersTab
                    users={personaDetails.users ?? []}
                    onRemoveUser={handleRemoveUser}
                  />
                ),
              },
            ]}
            tabBarExtraContent={
              <UserSelectableList
                hasPermission
                multiSelect
                selectedUsers={personaDetails.users ?? []}
                onUpdate={(users) => handlePersonaUpdate({ users })}>
                <Button
                  data-testid="add-persona-button"
                  size="small"
                  type="primary">
                  {t('label.add-entity', { entity: t('label.user') })}
                </Button>
              </UserSelectableList>
            }
          />
        </Col>
      </Row>
    </PageLayoutV1>
  );
};
