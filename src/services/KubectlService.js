import execa from 'execa';
import moment from 'moment';

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

  async describeResource(resourceName, resourceType, namespace) {
    const args = [
      'get',
      resourceType,
      resourceName,
      `-n=${namespace}`,
      '-o=json',
    ];
    const result = await this._execute(args);
    return JSON.parse(result);
  }

  async getCurrentContext() {
    const args = ['config', 'current-context'];
    return this._execute(args);
  }

  async getNamespaceResources(namespaces, resources) {
    const jsonPaths = [
      '{.kind}',
      '{.metadata.name}',
      '{.spec.containers[0].image}',
      '{.status.phase}',
      '{.status.containerStatuses[0].restartCount}',
      '{.status.containerStatuses[0].state.running.startedAt}',
      '{.status.readyReplicas}',
      '{.status.availableReplicas}',
      '{.spec.minReplicas}',
      '{.spec.maxReplicas}',
      '{.status.currentReplicas}',
      '{.spec.targetCPUUtilizationPercentage}',
      '{.status.currentCPUUtilizationPercentage}',
    ];
    const argsArray = namespaces.map((namespace) => ({
      args: [
        'get',
        resources.join(','),
        `-n=${namespace}`,
        `-o=jsonpath='{range .items[*]}${jsonPaths.join(
          '{"\\t"}'
        )}{"\\n"}{end}'`,
      ],
      namespace,
    }));
    const results = await Promise.all(
      argsArray.map(async ({ args, namespace }) => {
        const resources = await this._execute(args);
        return { resources, namespace };
      })
    );

    return results.flatMap((singleResult) => {
      console.log({ singleResult });
      return singleResult.resources.split('\n').map((item) => {
        const formattedItem = item?.replace("'", '');
        const [
          kind,
          name,
          image,
          status,
          restartCount,
          startedAt,
          readyReplicas,
          availableReplicas,
          minReplicas,
          maxReplicas,
          currentReplicas,
          targetCPUUtilizationPercentage,
          currentCPUUtilizationPercentage,
        ] = formattedItem?.split('\t');
        const restartParsed = parseInt(restartCount);

        return {
          kind,
          name: name?.replace("'", ''),
          image,
          status,
          namespace: singleResult.namespace,
          restartCount: isNaN(restartParsed) ? 0 : restartParsed,
          startedAt: startedAt ? moment(startedAt).fromNow() : 'N/A',
          startedAtTimestamp: startedAt ? new Date(startedAt).getTime() : 0,
          readyReplicas,
          availableReplicas,
          minReplicas,
          maxReplicas,
          currentReplicas,
          targetCPUUtilizationPercentage,
          currentCPUUtilizationPercentage,
        };
      });
    });
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
    console.log({ resourcesArray });
    return this._getUsableResourceName(resourcesArray);
  }

  async getNamespaces() {
    const args = ['get', 'namespaces', '-o=json'];
    const results = await this._execute(args);
    const parsedResults = JSON.parse(results);
    return parsedResults.items.map((item) => item.metadata.name);
  }

  async deletePod(name, namespace) {
    const args = ['delete', 'pod', name, `-n=${namespace}`];

    return this._execute(args);
  }

  _getUsableResourceName(resources) {
    return Array.from(
      new Set(resources.map((resource) => resource.split('.')[0]))
    );
  }

  async _execute(args) {
    try {
      const { stdout } = await execa('kubectl', args);
      return stdout;
    } catch (error) {
      console.log(`KubectlService Failed: ${error.shortMessage}`);
      console.log(error);
    }
  }
}
export default KubectlService;
