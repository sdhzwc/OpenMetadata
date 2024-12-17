/*
 *  Copyright 2024 Collate.
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

const collaborationImg = 'https://dst-data-lake.oss-cn-beijing.aliyuncs.com/openmetadata/login-screen/data-collaboration.png';
const discoveryImg = 'https://dst-data-lake.oss-cn-beijing.aliyuncs.com/openmetadata/login-screen/data-discovery.png';
const governanceImg = 'https://dst-data-lake.oss-cn-beijing.aliyuncs.com/openmetadata/login-screen/data-governance.png';
const insightImg = 'https://dst-data-lake.oss-cn-beijing.aliyuncs.com/openmetadata/login-screen/data-insights.png';
const dataQualityImg = 'https://dst-data-lake.oss-cn-beijing.aliyuncs.com/openmetadata/login-screen/data-quality.png';

class LoginClassBase {
  public carouselImages() {
    return {
      dataDiscovery: discoveryImg,
      dataQuality: dataQualityImg,
      governance: governanceImg,
      dataInsightPlural: insightImg,
      dataCollaboration: collaborationImg,
    };
  }
}

const loginClassBase = new LoginClassBase();

export default loginClassBase;
export { LoginClassBase };
