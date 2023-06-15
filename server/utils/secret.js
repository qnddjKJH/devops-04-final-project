// secretsManager.js

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const getSecrets = async (secretName) => {
  const client = new SecretsManagerClient({
    region: "ap-northeast-2", // Replace with your desired AWS region
  });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT",
      })
    );

    if (response.SecretString) {
      const secret = JSON.parse(response.SecretString);
      return secret;
    } else {
      throw new Error("Secret value is not available.");
    }
  } catch (error) {
    throw new Error(`Error retrieving secrets: ${error.message}`);
  }
};

module.exports = { getSecrets };