import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export default class AWSSecrets {
  constructor() {}

  async getJwtSecret() {
    const result = await this.getSecret('finaldb');
    return result.JWT_SECRET;
  }

  async getSecret(name) {
    const client = new SecretsManagerClient({
      region: 'ap-northeast-2', // Replace with your desired AWS region
    });

    try {
      const response = await client.send(
        new GetSecretValueCommand({
          SecretId: secretName,
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
