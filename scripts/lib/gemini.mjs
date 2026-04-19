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
 * Returns an object with generateContent() / response.text() interface.
 *
 * @param {string}  modelId  — defaults to 'gemini-2.5-flash'
 * @param {boolean} thinking — enable extended thinking mode (Pro only)
 */
export function getGeminiModel(modelId = 'gemini-2.5-flash', thinking = false) {
  const generationConfig = thinking
    ? { thinkingConfig: { thinkingBudget: -1 } }  // -1 = dynamic (model decides)
    : undefined;

  const inner = vertexAI.getGenerativeModel({
    model: modelId,
    ...(generationConfig ? { generationConfig } : {}),
  });

  return {
    async generateContent(promptOrRequest) {
      const result = await inner.generateContent(promptOrRequest);
      const parts = result.response?.candidates?.[0]?.content?.parts ?? [];

      // With thinking enabled the response has thought parts (thought: true)
      // followed by the actual answer. We only want the non-thought parts.
      const answerParts = parts.filter((p) => !p.thought);
      const text = answerParts.map((p) => p.text ?? '').join('') ||
        parts.map((p) => p.text ?? '').join(''); // fallback: use all parts

      return {
        response: {
          text: () => text,
        },
      };
    },
  };
}
