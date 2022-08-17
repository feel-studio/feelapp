import {
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import createImageUrlBuilder from "@sanity/image-url";

import { config } from "./config";

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
// https://www.sanity.io/docs/image-url
export const getImgUrl = (source) =>
  createImageUrlBuilder(config).image(source);

// Live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Portable Text serialization
// Serializers passed to @sanity/block-content-to-react
// https://github.com/sanity-io/block-content-to-react
export const PortableText = (props) => (
  <PortableTextComponent components={{}} {...props} />
);

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
