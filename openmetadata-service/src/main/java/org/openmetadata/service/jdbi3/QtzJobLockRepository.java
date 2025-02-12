/*
 *  Copyright 2021 Collate
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

package org.openmetadata.service.jdbi3;
import org.openmetadata.service.Entity;
import java.util.Date;

@Repository
public class QtzJobLockRepository {
  private final CollectionDAO.QtzJobLockDAO dao;

  public QtzJobLockRepository() {
    this.dao = Entity.getCollectionDAO().qtzJobLockDAO();
    Entity.setQtzJobLockRepository(this);
  }

  public Date selectByLockName(String lockName) {
    return dao.selectByLockName(lockName);
  }

  public void insert(String lockName, Date expireTime) {
    dao.insert(lockName, expireTime);
  }

  public void deleteByLockName(String lockName) {
    dao.deleteByLockName(lockName);
  }
}
