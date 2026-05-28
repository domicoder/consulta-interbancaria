import { createApiKey } from "./apiKey.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const postCreateApiKey = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { metadata, plainApiKey } = await createApiKey({ name });

  res.status(201).json({
    success: true,
    message:
      "API Key created successfully. Save it now. It will not be shown again.",
    data: {
      apiKey: {
        id: metadata.id,
        name: metadata.name,
        keyPreview: metadata.keyPreview,
        createdAt: metadata.createdAt,
      },
      plainApiKey,
    },
  });
});
