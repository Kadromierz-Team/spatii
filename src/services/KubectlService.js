import execa from 'execa';

class KubectlService {
  async getContexts() {
    const args = ['config', 'get-contexts', '--no-headers=true', '-o=name'];
    const results = await this._execute(args);
    return results.split('\n');
  }

  async changeContext(context) {
    const args = ['config', 'use-context', context];
    await this._execute(args);
  }

  async getCurrentContext() {
    const args = ['config', 'current-context'];
    return this._execute(args);
  }

  async getNamespaceResources(namespace, resource) {
    const args = ['get', resource, `-n=${namespace}`, '-o=json'];
    const results = await this._execute(args);
    const parsedResources = JSON.parse(results);
    return parsedResources.items;
  }

  async getContextResources() {
    const args = [
      'api-resources',
      '--namespaced=true',
      '--no-headers=true',
      '-o=name',
    ];
    const results = await this._execute(args);
    const resourcesArray = results.split('\n');
    return this._getUsableResourceName(resourcesArray);
  }

  async getNamespaces() {
    const args = ['get', 'namespaces', '-o=json'];
    const results = await this._execute(args);
    const parsedResults = JSON.parse(results);
    return parsedResults.items.map((item) => item.metadata.name);
  }

  _getUsableResourceName(resources) {
    return resources.map((resource) => resource.split('.')[0]);
  }

  async _execute(args) {
    try {
      const { stdout } = await execa('kubectl', args);
      return stdout;
    } catch (error) {
      console.log(`KubectlService Failed: ${error.shortMessage}`);
    }
  }
}
export default KubectlService;
