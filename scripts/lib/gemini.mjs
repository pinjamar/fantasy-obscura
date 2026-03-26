/**
 * scripts/lib/gemini.mjs
 *
 * Thin wrapper around @google-cloud/vertexai that exposes the same
 * model.generateContent() / result.response.text() interface used by all
 * scripts — so switching from the Gemini Developer API to Vertex AI
 * (which draws from the $300 Google Cloud free-trial credit) requires
 * only a one-line import change per script.
 *
 * Required env vars (.env):
 *   GOOGLE_CLOUD_PROJECT          — your GCP project ID
 *   GOOGLE_APPLICATION_CREDENTIALS — path to service account JSON key file
 *   GOOGLE_CLOUD_LOCATION          — (optional) defaults to us-central1
 */

import { VertexAI } from '@google-cloud/vertexai';
import { config } from 'dotenv';

config();

if (!process.env.GOOGLE_CLOUD_PROJECT) {
  console.error('❌  Missing GOOGLE_CLOUD_PROJECT in .env');
  process.exit(1);
}

const vertexAI = new VertexAI({
  project:  process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION ?? 'us-central1',
});

/**
 * Returns an object with the same generateContent() / response.text()
 * interface as @google/generative-ai, so all existing scripts work unchanged.
 *
 * @param {string} modelId — defaults to 'gemini-2.5-flash'
 */
export function getGeminiModel(modelId = 'gemini-2.5-flash') {
  const inner = vertexAI.getGenerativeModel({ model: modelId });

  return {
    async generateContent(promptOrRequest) {
      const result = await inner.generateContent(promptOrRequest);
      const text =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      return {
        response: {
          text: () => text,
        },
      };
    },
  };
}
