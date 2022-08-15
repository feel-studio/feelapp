import { Image, Video, Placeholder } from "./";

function Media(props) {
  const { media, ratio } = props;

  if (!media) return ratio ? <Placeholder {...props} /> : null;

  const { mediaType } = media;
  /*eslint-disable */
  return mediaType === "video" ? <Video {...props} /> : <Image {...props} />;
  /*eslint-enable */
}

export default Media;
