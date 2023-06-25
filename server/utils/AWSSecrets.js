import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export default class AWSSecrets {
  async getSecret(name) {
    const client = new SecretsManagerClient({
      region: 'ap-northeast-2', // Replace with your desired AWS region
    });

    try {
      const response = await client.send(
        new GetSecretValueCommand({
          SecretId: name,
          VersionStage: 'AWSCURRENT',
        }),
      );

      if (response.SecretString) {
        const secret = JSON.parse(response.SecretString);
        return secret;
      } else {
        throw new Error('Secret value is not available.');
      }
    } catch (error) {
      throw new Error(`Error retrieving secrets: ${error.message}`);
    }
  }
}
//npm install